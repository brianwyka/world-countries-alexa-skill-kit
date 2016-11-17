'use strict';

/**
 * App ID for the skill
 */
var APP_ID = undefined;

// Include required depedencies
var AlexaSkill = require('./AlexaSkill'),
    intentHelper = require('./intentHelper'),
    eventHelper = require('./eventHelper');

/**
 * WorldCountries is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var WorldCountries = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
WorldCountries.prototype = Object.create(AlexaSkill.prototype);
WorldCountries.prototype.constructor = WorldCountries;


// Register the event and intent handlers
eventHelper.registerHandlers(WorldCountries.prototype.eventHandlers);
intentHelper.registerHandlers(WorldCountries.prototype.intentHandlers);

module.exports = WorldCountries;