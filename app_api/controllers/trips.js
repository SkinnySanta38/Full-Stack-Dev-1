 const mongoose = require('mongoose');
 const Trip = require('../models/travlr'); // Register model
 const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome , response must include HTML status code
// and JSON message to the requesting client 
const tripsList = async(req, res) => {
    const query = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show results of query on console
        //console.log(query);

    if(!query){ // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(query);
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requresting cliet
const tripsFindByCode = async(req, res) => {
    const query = await Model
        .find({'code' : req.params.tripCode }) // Returns single record from code
        .exec();

        // Uncomment the following line to show results of query on console
        console.log(query);

    if(!query){ // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(query);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
