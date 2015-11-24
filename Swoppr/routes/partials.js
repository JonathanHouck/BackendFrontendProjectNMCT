/**
 * Created by jonah on 11/15/2015.
 */

module.exports = function(passport) {

    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res) {
        res.render('index', { title: 'Swoppr' });
    });

    router.get('/index', function(req, res) {
        res.render("partials/index");
    });

    router.get('/toRent', isLoggedIn, function(req, res) {
        res.render("partials/toRent");
    });

    router.get('/placeArticle', function(req, res) {
        res.render("partials/placeArticle");
    });

    router.get('/logout', function(req, res) {
       res.render("partials/logout");
    });

    router.post('/logout', function(req, res) {
        req.logout();
        res.json({ redirect: '/logout' });
    });

    router.get('/login', function(req, res) {
        res.render("partials/login");
    });

    router.post('/login', function(req, res) {
         if (!req.body.email || !req.body.password) {
             return res.json({ error: 'Email and Password required' });
         }
         passport.authenticate('local-login', function(err, user, info) {
             if (err) {
                 return res.json(err);
             }
             if (user.error) {
                 return res.json({ error: user.error });
             }
             req.logIn(user, function(err) {
                 if (err) {
                     return res.json(err);
                 }
                 return res.json({ redirect: '/profile' });
             });
         })(req, res);
    });

    router.get('/register', function(req, res) {
        res.render("partials/register");
    });

    router.post('/register', function(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.json({ error: 'Email and Password required' });
        }
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                return res.json(err);
            }
            if (user.error) {
                return res.json({ error: user.error });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.json(err);
                }
                return res.json({ redirect: '/profile' });
            });
        })(req, res);
    });

     router.get('/profile', function(req, res) {
         res.render("partials/profile", {
            user : req.user
         });
     });

    return router;
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/partials/login');
    }
}