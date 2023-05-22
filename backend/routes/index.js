const express = require('express');

const router = express.Router();

// get the home page
router.get('/', (req, res) => {
    res.locals.filter = null;
    res.render('home');
});

// get the index page
router.get('/index', (req, res) => {
    res.locals.filter = null;
    res.render('index');
});

module.exports = router;