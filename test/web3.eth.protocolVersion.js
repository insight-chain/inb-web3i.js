var chai = require('chai');
var assert = chai.assert;
var web3i = require('../index');
var web3i = new web3i();
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'protocolVersion';

var tests = [{
    result: ['1234'],
    call: 'eth_' + method
}];

describe('eth.protocolVersion', function() {
    describe(method, function() {
        tests.forEach(function(test, index) {
            it('property test: ' + index, function() {

                // given
                var provider = new FakeHttpProvider();
                web3i.setProvider(provider);
                provider.injectResult(test.result);
                provider.injectValidation(function(payload) {
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, test.call);
                    assert.deepEqual(payload.params, []);
                });

                // when
                var result = web3i.eth[method];

                // then
                assert.deepEqual(test.result, result);
            });
        });
    });
});