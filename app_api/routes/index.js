const express = require('express');
const router = express.Router();

// Import controller to route
const tripsController = require('../controllers/trips');

// GET Method routes tripsList
router
    .route('/trips')
    .get(tripsController.tripsList); 

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;