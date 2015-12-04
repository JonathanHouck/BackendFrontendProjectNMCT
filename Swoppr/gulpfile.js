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

    var jsWatcher = gulp.watch(['./public/js/scroll-animate/**/*.js',
                                './public/js/app.js',
                                './public/js/controllers/**/*.js',
                                './public/js/controllers/**/*.js',
                                './public/js/directives/**/*',
                                './public/js/factories/**/*',
                                './public/js/services/**/*',
                                './public/js/models/**/*'], ['js']
                                );
    jsWatcher.on('change', function(event) {
        console.log(event.path + " changed");
    });
});

gulp.task("js",function (){
    gulp.src(['./public/js/scroll-animate/**/*.js',
            './public/js/app.js',
            './public/js/controllers/**/*.js',
            './public/js/directives/**/*.js',
            './public/js/factories/**/*',
            './public/js/services/**/*',
            './public/js/models/**/*'])
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        //.pipe(sourcemaps.init())
        .pipe(concat("app.min.js"))
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('.//public/js'))
        .pipe(notify({message: 'js built'}));
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
        }))
});
