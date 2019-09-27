var chai = require('chai');
var assert = chai.assert;
var web3i = require('../index');
var web3i = new web3i();
var FakeHttpProvider2 = require('./helpers/FakeHttpProvider2');

describe('web3i.eth.sendIBANTransaction', function() {
    it('should send transaction', function() {

        var iban = 'XE81ETHXREGGAVOFYORK';
        var address = '0x1234567890123456789012345678901234500000';
        var exAddress = '0x1234567890123456789012345678901234567890'

        var provider = new FakeHttpProvider2();
        web3i.setProvider(provider);
        web3i.reset();

        provider.injectResultList([{
            result: exAddress
        }, {
            result: ''
        }]);

        var step = 0;
        provider.injectValidation(function(payload) {
            if (step === 0) {
                step++;
                assert.equal(payload.method, 'eth_call');
                assert.deepEqual(payload.params, [{
                    data: "0x3b3b57de5852454700000000000000000000000000000000000000000000000000000000",
                    to: web3i.eth.icapNamereg().address
                }, "latest"]);

                return;
            }
            assert.equal(payload.method, 'eth_sendTransaction');
            assert.deepEqual(payload.params, [{
                data: '0xb214faa54741564f46594f524b0000000000000000000000000000000000000000000000',
                from: address,
                to: exAddress,
                value: payload.params[0].value // don't check this
            }]);
        });

        web3i.eth.sendIBANTransaction(address, iban, 10000);

    });
});