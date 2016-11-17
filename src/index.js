'use strict';

// Include WorldCountries
var WorldCountries = require("./worldCountries");

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the WorldCountries skill.
    var worldCountries = new WorldCountries();
    worldCountries.execute(event, context);
};