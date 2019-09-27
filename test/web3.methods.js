var Web3i = require('../index.js');
var web3i = new Web3i();
var u = require('./helpers/test.utils.js');

describe('web3i', function() {
    describe('methods', function() {
        u.methodExists(web3i, 'sha3');
        u.methodExists(web3i, 'toAscii');
        u.methodExists(web3i, 'fromAscii');
        u.methodExists(web3i, 'toDecimal');
        u.methodExists(web3i, 'fromDecimal');
        u.methodExists(web3i, 'fromWei');
        u.methodExists(web3i, 'toWei');
        u.methodExists(web3i, 'toBigNumber');
        u.methodExists(web3i, 'isAddress');
        u.methodExists(web3i, 'setProvider');
        u.methodExists(web3i, 'reset');

        u.propertyExists(web3i, 'providers');
        u.propertyExists(web3i, 'eth');
        u.propertyExists(web3i, 'db');
        u.propertyExists(web3i, 'shh');
    });
});