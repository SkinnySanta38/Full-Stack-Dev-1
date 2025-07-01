const express = require('express');
const router = express.Router();

// Enable JSON Web Tokens
const jwt = require('jsonwebtoken');

// Import controller to route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Method to authenticate JWT
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);

    if(authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);

    if(token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err){
            return res
                .sendStatus(401)
                .json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth param to decoded object
    });
    next(); // We need to continue or this will hang forever
}



// Routes to register user accounts
router
    .route('/register')
    .post(authController.register); // POST method routes register

// Defines routes to login to account
router
    .route('/login')
    .post(authController.login); // POST method routes login

// Define routes for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripList
    .post(authenticateJWT, tripsController.tripsAddTrip); // POST method adds a trip 

// Defines routes by tripCode
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET method routes tripsFindByCode - requires parameter
    .put(authenticateJWT, tripsController.tripsUpdateTrip); // PUT method routes tripUpdateTrip - requires parameter


module.exports = router;