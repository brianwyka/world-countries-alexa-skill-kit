'use strict';

// Include required https library
var https = require('https');

/**
 * Rest Countries API
 */
var restCountries = (function () {
    
    var _API_HOST = "restcountries.eu",
        _API_PORT = 443,
        _API_PATH = "/rest/v1";
    
    /**
     * Format the region for the API call
     * @param region - the region
     * @return the formatted region
     */
    var _formatRegion = function (region) {
        region = region.toLowerCase();
        region = region.replace("north ", "northern ");
        region = region.replace("south ", "southern ");
        region = region.replace("southeast ", "south-eastern ");
        region = region.replace("south east ", "south-eastern ");
        region = region.replace("east ", "eastern ");
        region = region.replace("west ", "western ");
        region = encodeURI(region);
        return region;
    };
    
    /**
     * Invoke the REST API
     * @param region
     * @param callback - the callback function
     * @param retry - whether or not to retry
     */
    var _invokeApi = function (region, callback, retry) {
        var apiOptions = {
            hostname: _API_HOST,
            port: _API_PORT,
            path: _API_PATH + (retry ? "/region/" : "/subregion/") + _formatRegion(region)
        };
        https.get(apiOptions, function (response) {
            var responseBody = '', 
                countries = [];
            response.on('data', function (data) {
                responseBody += data;
            });
            response.on('end', function () {
                countries = JSON.parse(responseBody);
                if (retry && (response.statusCode == 404)) {
                    _invokeApi(region, callback, false);
                } else {
                    callback(countries);   
                }
            });
        }).on('error', function (e) {
            console.log("Error retrieving countries from API for region [" + region + "]: ", e);
            callback([]);
        });
    };

    /**
     * Get the array of countries based on a region
     * @param region - the region to find countries in
     * @param callback - the function to execute as callback
     */
    var getCountries = function (region, callback) {
        _invokeApi(region, callback, true);
    };
    
    // Expose public functions
    return {
        getCountries: getCountries
    };
    
}) ();

module.exports = restCountries;