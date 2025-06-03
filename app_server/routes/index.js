var express = require('express');
var router = express.Router();

// Import controllers
const ctrlMain = require('../controllers/main');
const ctrlTravel = require('../controllers/travel');
const ctrlRooms = require('../controllers/rooms');
const ctrlNews = require('../controllers/news');
const ctrlMeals = require('../controllers/meals');
const ctrlContact = require('../controllers/contact');
const ctrlAbout = require('../controllers/about');

/* GET home page. */
router.get('/', ctrlMain.index);

/* GET travel page */
router.get('/travel', ctrlTravel.travel);

/* GET rooms page */
router.get('/rooms', ctrlRooms.rooms);

/* GET news page */
router.get('/news', ctrlNews.news);

/* GET meals page */
router.get('/meals', ctrlMeals.meals);

/* GET contact page */
router.get('/contact', ctrlContact.contact);

/* GET about page */
router.get('/about', ctrlAbout.about);

module.exports = router;
