var chai = require('chai');
var assert = chai.assert;
var FakeHttpProvider = require('./helpers/FakeHttpProvider');
var web3i = require('../lib/web3i');
var web3i = new web3i();


var tests = [{
    properties: [new web3i._extend.Property({
        name: 'gasPrice',
        getter: 'eth_gasPrice',
        outputFormatter: web3i._extend.formatters.outputBigNumberFormatter
    })]
}, {
    methods: [new web3i._extend.Method({
        name: 'getBalance',
        call: 'eth_getBalance',
        params: 2,
        inputFormatter: [web3i._extend.utils.toAddress, web3i._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: web3i._extend.formatters.outputBigNumberFormatter
    })]
}, {
    property: 'admin',
    properties: [new web3i._extend.Property({
        name: 'gasPrice',
        getter: 'eth_gasPrice',
        outputFormatter: web3i._extend.formatters.outputBigNumberFormatter
    })],
    methods: [new web3i._extend.Method({
        name: 'getBalance',
        call: 'eth_getBalance',
        params: 2,
        inputFormatter: [web3i._extend.utils.toAddress, web3i._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: web3i._extend.formatters.outputBigNumberFormatter
    })]
}];

describe('web3i', function() {
    describe('_extend', function() {
        tests.forEach(function(test, index) {
            it('test no: ' + index, function() {
                web3i._extend(test);


                if (test.properties)
                    test.properties.forEach(function(property) {

                        var provider = new FakeHttpProvider();
                        web3i.setProvider(provider);
                        provider.injectResult('');
                        provider.injectValidation(function(payload) {
                            assert.equal(payload.jsonrpc, '2.0');
                            assert.equal(payload.method, property.getter);
                        });

                        if (test.property) {
                            assert.isObject(web3i[test.property][property.name]);
                            assert.isFunction(web3i[test.property]['get' + property.name.charAt(0).toUpperCase() + property.name.slice(1)]);
                        } else {
                            assert.isObject(web3i[property.name]);
                            assert.isFunction(web3i['get' + property.name.charAt(0).toUpperCase() + property.name.slice(1)]);
                        }
                    });

                if (test.methods)
                    test.methods.forEach(function(property) {
                        if (test.property)
                            assert.isFunction(web3i[test.property][property.name]);
                        else
                            assert.isFunction(web3i[property.name]);
                    });

            });
        });
    });
});