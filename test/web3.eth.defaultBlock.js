var chai = require('chai');
var assert = chai.assert;
var Web3i = require('../index');
var web3i = new Web3();

describe('web3i.eth', function() {
    describe('defaultBlock', function() {
        it('should check if defaultBlock is set to proper value', function() {
            assert.equal(web3i.eth.defaultBlock, 'latest');
        });
    });
});