var chai = require('chai');
var assert = chai.assert;
var Web3i = require('../index');
var web3i = new Web3i();
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'hashrate';

var tests = [{
    result: '0x788a8',
    formattedResult: 493736,
    call: 'eth_' + method
}];

describe('web3i.eth', function() {
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
                var result = web3.eth[method];

                // then
                assert.strictEqual(test.formattedResult, result);

                // clear the validation
                provider.injectValidation(function() {});
                web3i.reset();
            });
        });
    });
});