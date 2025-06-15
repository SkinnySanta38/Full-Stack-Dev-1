const express = require('express');
const router = express.Router();

// Import controller to route
const tripsController = require('../controllers/trips');

// Define routes for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripList
    .post(tripsController.tripsAddTrip); // POST method adds a trip 

// Defines routes by tripCode
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET method routes tripsFindByCode - requires parameter
    .put(tripsController.tripsUpdateTrip); // PUT method routes tripUpdateTrip - requires parameter

module.exports = router;