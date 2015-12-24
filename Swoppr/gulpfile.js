/**
 * Created by jonah on 11/13/2015.
 */

var gulp = require("gulp"),
    csslint = require("gulp-csslint"),
    cssMinifier = require("gulp-minify-css"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    less = require("gulp-less"),
    notify = require("gulp-notify"),
    gutil = require('gulp-util'),
    jshint = require("gulp-jshint"),
    jsStylish = require("jshint-stylish"),
    uglify = require("gulp-uglify");

var customReporter = function(file) {
    gutil.log(gutil.colors.magenta(file.csslint.errorCount) + ' errors in ' +  gutil.colors.magenta(file.path));

    file.csslint.results.forEach(function(result) {
        gutil.log(gutil.colors.magenta('Lijn '+ (result.error.line) + ": ") + result.error.message);
    });
};

gulp.task("default", function() {
    var cssWatcher = gulp.watch('./public/less/**/*.less', ['css']);
    cssWatcher.on('change', function(event) {
        console.log(event.path + " changed");
    });

    var jsWatcher = gulp.watch(['./public/js/models/**/*',
                                './public/js/app.js',
                                './public/js/controllers/**/*.js',
                                './public/js/directives/**/*',
                                './public/js/factories/**/*',
                                './public/js/services/**/*'], ['js']
                                );
    jsWatcher.on('change', function(event) {
        console.log(event.path + " changed");
    });

    var backendJsWatcher = gulp.watch(['./bin/www',
                                './config/**/*.js',
                                './data/**/*.js',
                                './routes/**/*.js',
                                './sockets/**/*.js',
                                './app.js',
                                './gulpfile.js'], ['backendJs']
    );

    backendJsWatcher.on('change', function(event) {
        console.log(event.path + " changed");
    });
});

gulp.task("js",function (){
    gulp.src(['./public/js/models/**/*',
            './public/js/app.js',
            './public/js/controllers/**/*.js',
            './public/js/directives/**/*.js',
            './public/js/factories/**/*',
            './public/js/services/**/*'])
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        //.pipe(sourcemaps.init())
        .pipe(concat("app.min.js"))
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('.//public/js'))
        .pipe(notify({message: 'js built'}));
});

gulp.task("backendJs", function() {
    gulp.src(['./bin/www',
            './config/**/*.js',
            './data/**/*.js',
            './routes/**/*.js',
            './sockets/**/*.js',
            './app.js',
            './gulpfile.js'], ['backendJs'])
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(notify({message: 'backendJs built'}));
});

gulp.task("css", function() {
    gulp.src("./public/less/**/*.less")
        .pipe(less())
        .pipe(csslint({
            'box-sizing': false
        }))
        .pipe(sourcemaps.init())
        .pipe(csslint.reporter("junit-xml"))
        .pipe(csslint.reporter(customReporter))
        .pipe(csslint.reporter("fail"))
        //.pipe(cssMinifier())
        .pipe(concat("site.min.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css"))
        .pipe(notify({
            message: "css built"
        }));
});