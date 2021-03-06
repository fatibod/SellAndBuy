const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

const passport = require('passport');

const pool = require('../database');


router.get('/registro',(req, res) => {
    res.render('usuario/registro');
});

router.post('/registro', passport.authenticate('local.registro', {
    successRedirect: '/login',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('usuario/login');
});

router.post('/login', (req, res, next)=>{
    passport.authenticate('local.login', {
        successRedirect : '/login',
        failureRedirect: '/registro',
        failureFlash: true
    })(req, res, next)
});

router.get('/home', isLoggedIn, (req, res) => {
    res.render('home');
});

router.get('salir', isLoggedIn,(req, res) =>{
    req.logOut();
    res.redirect('/login');
});

router.get('/perfilVende', isLoggedIn, (req, res) => {
    res.render('usuario/perfilVende');
});

module.exports = router;