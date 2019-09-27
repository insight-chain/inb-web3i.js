var chai = require('chai');
var assert = chai.assert;
var web3i = require('../index.js');
var web3i = new web3i();
var u = require('./helpers/test.utils.js');

describe('web3i.shh', function() {
    describe('methods', function() {
        u.methodExists(web3i.shh, 'version');
        u.methodExists(web3i.shh, 'info');
        u.methodExists(web3i.shh, 'setMaxMessageSize');
        u.methodExists(web3i.shh, 'setMinPoW');
        u.methodExists(web3i.shh, 'markTrustedPeer');
        u.methodExists(web3i.shh, 'newKeyPair');
        u.methodExists(web3i.shh, 'addPrivateKey');
        u.methodExists(web3i.shh, 'deleteKeyPair');
        u.methodExists(web3i.shh, 'hasKeyPair');
        u.methodExists(web3i.shh, 'getPublicKey');
        u.methodExists(web3i.shh, 'getPrivateKey');
        u.methodExists(web3i.shh, 'newSymKey');
        u.methodExists(web3i.shh, 'addSymKey');
        u.methodExists(web3i.shh, 'generateSymKeyFromPassword');
        u.methodExists(web3i.shh, 'hasSymKey');
        u.methodExists(web3i.shh, 'getSymKey');
        u.methodExists(web3i.shh, 'deleteSymKey');
        u.methodExists(web3i.shh, 'newMessageFilter');
        u.methodExists(web3i.shh, 'post');

    });
});