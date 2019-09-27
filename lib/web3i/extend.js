var formatters = require('./formatters');
var utils = require('./../utils/utils');
var Method = require('./method');
var Property = require('./property');

// TODO: refactor, so the input params are not altered.
// it's necessary to make same 'extension' work with multiple providers
var extend = function(web3i) {
    /* jshint maxcomplexity:5 */
    var ex = function(extension) {

        var extendedObject;
        if (extension.property) {
            if (!web3i[extension.property]) {
                web3i[extension.property] = {};
            }
            extendedObject = web3i[extension.property];
        } else {
            extendedObject = web3i;
        }

        if (extension.methods) {
            extension.methods.forEach(function(method) {
                method.attachToObject(extendedObject);
                method.setRequestManager(web3i._requestManager);
            });
        }

        if (extension.properties) {
            extension.properties.forEach(function(property) {
                property.attachToObject(extendedObject);
                property.setRequestManager(web3i._requestManager);
            });
        }
    };

    ex.formatters = formatters;
    ex.utils = utils;
    ex.Method = Method;
    ex.Property = Property;

    return ex;
};



module.exports = extend;