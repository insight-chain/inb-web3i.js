var chai = require('chai');
var assert = chai.assert;
var Web3i = require('../index.js');
var web3i = new Web3i();
var u = require('./helpers/test.utils.js');

describe('web3i.net', function() {
    describe('methods', function() {
        u.propertyExists(web3i.net, 'listening');
        u.propertyExists(web3i.net, 'peerCount');
    });
});