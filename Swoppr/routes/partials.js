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

    router.get('/rentProduct/:id?', isLoggedIn, function(req, res) {
        res.render("partials/rentProduct");
    });

    router.get('/placeArticle',isLoggedIn, function(req, res) {
        res.render("partials/placeArticle");
    });

    router.post('/logout', function(req, res) {
        req.logout();
        res.json({ redirect: '/login' });
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
        if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.surname) {
            return res.json({ error: 'Fill in all fields' });
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

     router.get('/profile', isLoggedIn, function(req, res) {
         res.render("partials/profile", {
            user : req.user
         });
     });

    // google login

    // send to google to do the authentication
    router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    router.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));

    // send to google to do the authentication
    router.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    // the callback after google has authorized the user
    router.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));

    router.get('/unlink/google', function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    router.get('/chat/:id?', function(req, res) {
        res.render("partials/chat");
    });

    router.get('/ServiceTester', function(req, res) {
        res.render("partials/ServiceTester");
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