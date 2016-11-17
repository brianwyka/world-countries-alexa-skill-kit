'use strict';

// Include required dependencies
var restCountries = require('./restCountries'),
    helper = require('./helper'),
    responseHelper = require('./responseHelper');

/**
 * Intent helper for WorldCountries
 */
var intentHelper = (function () {
    
    /**
     * Get the region from the intent slot
     * @param intent - the intent
     * @param response - the intent response
     * @return the state from the intent or null if no region provided
     */
    var _getRegion = function (intent, response) {
        if (intent.slots.Region && intent.slots.Region.value) {
            return intent.slots.Region.value.toLowerCase();
        }
        responseHelper.handleNoRegion(response);
        return null;
    };

    /**
     * Find out which countries are in a particular region
     * @param intent - the intent
     * @param session - the intent session
     * @param response - the response to add welcome to
     */
    var _whatCountriesInRegionIntent = function (intent, session, response) {
        var region = _getRegion(intent, response);
        if (region) {
            restCountries.getCountries(region, function (countries) {
                responseHelper.handleWhatCountriesInRegion(region, countries, response);
            });
        }
    };

    /**
     * Find out how many countries are in a particular region
     * @param intent - the intent
     * @param session - the intent session
     * @param response - the response to add welcome to
     */
    var _howManyCountriesInRegionIntent = function (intent, session, response) {
        var region = _getRegion(intent, response);
        if (region) {
            restCountries.getCountries(region, function (countries) {
                responseHelper.handleHowManyCountriesInRegion(region, countries, response);
            });
        }
    };

    /**
     * Find out about a particular region
     * @param intent - the intent
     * @param session - the intent session
     * @param response - the response to add welcome to
     */
    var _regionOnlyIntent = function (intent, session, response) {
        var region = _getRegion(intent, response);
        if (region) {
            restCountries.getCountries(region, function (countries) {
                responseHelper.handleRegionOnly(region, countries, response);
            });
        }
    };
    
    /**
     * Register intent handlers
     * @param intentHandlers - the WorldCountries intent handlers
     */
    var registerHandlers = function (intentHandlers) {
        intentHandlers["WhatCountriesInRegionIntent"] = _whatCountriesInRegionIntent;
        intentHandlers["HowManyCountriesInRegionIntent"] = _howManyCountriesInRegionIntent;
        intentHandlers["RegionOnlyIntent"] = _regionOnlyIntent;
        intentHandlers["AMAZON.HelpIntent"] = function (intent, session, response) {
            responseHelper.handleHelp(response);
        };
        intentHandlers["AMAZON.StopIntent"] = function (intent, session, response) {
            responseHelper.handleExit(response);
        };
        intentHandlers["AMAZON.CancelIntent"] = function (intent, session, response) {
            responseHelper.handleExit(response);
        };
    };
    
    // Expose public functions
    return {
        registerHandlers: registerHandlers
    };
    
}) ();

module.exports = intentHelper;
