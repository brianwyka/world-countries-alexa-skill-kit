'use strict';

/**
 * Response helper for WorldCountries
 */
var responseHelper = (function () {
    
    /**
     * Get the sententence to return to the user
     * @param region - the region they provided
     * @param countries - the countries in the provided state
     * @param countriesOnly - whether or not to only list countries
     * @param countOnly - whether or not to only state number of countries in region
     * @return the speech output to the user
     */
    var _getCountriesSentence = function (region, countries, countriesOnly, countOnly) {
        var sentence = "";

        if (countries.length > 0) {

            var countriesCount = countries.length,
                countryNames = [],
                countriesString = "";

            for (var i=0; i<countriesCount; i++) {
                countryNames.push(countries[i].name);
            }
            countriesString = countryNames.join(", ");

            if (countriesCount >= 2) {
                var lastCommaIndex = countriesString.lastIndexOf(",");
                if (countriesCount == 2) {
                    countriesString = countriesString.substr(0, lastCommaIndex)
                                        + " and" + countriesString.substr(lastCommaIndex + 1);
                } else {
                    countriesString = countriesString.substr(0, lastCommaIndex)
                                        + ", and" + countriesString.substr(lastCommaIndex + 1);
                }
            }

            if (countriesOnly) {
                if (countriesCount == 1) {
                    sentence = countriesString + " is the only country in " + region + ".";
                } else {
                    sentence = "Here are the countries in " + region + " : " + countriesString + ".";
                }
            } else if (countOnly) {
                if (countriesCount == 1) {
                    sentence = "There is only one country in " + region + ".";
                } else {
                    sentence = "There are " + countriesCount + " countries in " + region;
                }
            } else {
                if (countriesCount == 1) {
                    sentence = "There is only one country in " + region + " : "
                             + countriesString + ".";
                } else {
                    sentence = "There are " + countriesCount + " countries in " + region + " : "
                             + countriesString + ".";
                }
            }

        } else {
            sentence = "Unfortunately, there are no countries in " + region + ".";
        }

        return sentence;
    };
    
    /**
     * Handle the welcome
     * @param response - the intent response
     */
    var handleWelcome = function (response) {
        var cardTitle = "World COuntries";
        var speechOutput = "Welcome to World Countries!  Which region would you like to find countries in?";
        var repromptOutput = "With World Countries, you can find countries in any region or subregion.";
        var cardOutput = "World Countries.  Which region do you want to find countries in?";
        response.askWithCard(speechOutput, repromptOutput, cardTitle, cardOutput);
    };
    
    /**
     * Handle the "WhatCountriesInRegion" response
     * @param region - the region
     * @param countries - the countries in the region
     * @param response - the intent response
     */
    var handleWhatCountriesInRegion = function (region, countries, response) {
        var cardTitle = "Your Countries";
        var speechOutput = _getCountriesSentence(region, countries, true, true);
        response.tellWithCard(speechOutput, cardTitle, speechOutput);
    };
    
    /**
     * Handle the "HowManyCountriesInRegion" response
     * @param region - the region
     * @param countries - the countries in the region
     * @param response - the intent response
     */
    var handleHowManyCountriesInRegion = function (region, countries, response) {
        var cardTitle = "Your Countries";
        var speechOutput = _getCountriesSentence(region, countries, false, true);
        response.tellWithCard(speechOutput, cardTitle, speechOutput);
    };
    
   /**
     * Handle the "RegionOnly" response
     * @param region - the region
     * @param countries - the countries in the region
     * @param response - the intent response
     */
    var handleRegionOnly = function (region, countries, response) {
        var cardTitle = "Your Countries";
        var speechOutput = _getCountriesSentence(region, countries, false, false);
        response.tellWithCard(speechOutput, cardTitle, speechOutput);
    };
    
    /**
     * Handle no region entered by user
     * @param response - the response to add error output to
     */
    var handleNoRegion = function (response) {
        var speechOutput = "Sorry, I didn't understand your question, please repeat.";
        var repromptOutput = "Which region do you want to find countries in?";
        response.ask(speechOutput, repromptOutput);
    };
    
    /**
     * Handle a help intent
     * @param response - the response to add welcome to
     */
    var handleHelp = function (response) {
        var helpQuestion = "You can say the region you want to find countries in, " 
                         + "or, you can say exit... What can I help you with?";
        response.ask(helpQuestion, "What can I help you with?");
    };
    
    /**
     * Handle exit request
     * @param response - the response to add error output to
     */
    var handleExit  = function (response) {
        response.tell("Thanks for using WorldCountries, goodbye");
    };
    
    // Expose public functions
    return {
        handleWelcome: handleWelcome,
        handleWhatCountriesInRegion: handleWhatCountriesInRegion,
        handleHowManyCountriesInRegion: handleHowManyCountriesInRegion,
        handleRegionOnly: handleRegionOnly,
        handleNoRegion: handleNoRegion,
        handleHelp: handleHelp,
        handleExit: handleExit
    };
    
}) ();

module.exports = responseHelper;