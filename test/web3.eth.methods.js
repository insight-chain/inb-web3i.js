var chai = require('chai');
var assert = chai.assert;
var web3i = require('../index.js');
var web3i = new web3i();
var u = require('./helpers/test.utils.js');

describe('web3i.eth', function() {
    describe('methods', function() {
        u.methodExists(web3i.eth, 'getBalance');
        u.methodExists(web3i.eth, 'getStorageAt');
        u.methodExists(web3i.eth, 'getTransactionCount');
        u.methodExists(web3i.eth, 'getCode');
        u.methodExists(web3i.eth, 'sendTransaction');
        u.methodExists(web3i.eth, 'call');
        u.methodExists(web3i.eth, 'getBlock');
        u.methodExists(web3i.eth, 'getTransaction');
        u.methodExists(web3i.eth, 'getUncle');
        u.methodExists(web3i.eth, 'getCompilers');
        u.methodExists(web3i.eth.compile, 'lll');
        u.methodExists(web3i.eth.compile, 'solidity');
        u.methodExists(web3i.eth.compile, 'serpent');
        u.methodExists(web3i.eth, 'getBlockTransactionCount');
        u.methodExists(web3i.eth, 'getBlockUncleCount');
        u.methodExists(web3i.eth, 'filter');
        u.methodExists(web3i.eth, 'contract');

        u.propertyExists(web3i.eth, 'coinbase');
        u.propertyExists(web3i.eth, 'mining');
        u.propertyExists(web3i.eth, 'gasPrice');
        u.propertyExists(web3i.eth, 'accounts');
        u.propertyExists(web3i.eth, 'defaultBlock');
        u.propertyExists(web3i.eth, 'blockNumber');
        u.propertyExists(web3i.eth, 'protocolVersion');
    });
});