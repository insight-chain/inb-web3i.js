var chai = require('chai');
var assert = chai.assert;
var web3ii = require('../../index');

var FakeHttpProvider = require('./FakeHttpProvider');
var clone = function(object) { return JSON.parse(JSON.stringify(object)); };

var runTests = function(obj, method, tests) {

    var testName = obj ? 'web3ii.' + obj : 'webi';

    describe(testName, function() {
        describe(method, function() {
            tests.forEach(function(test, index) {
                it('sync test: ' + index, function() {

                    // given
                    var provider = new FakeHttpProvider();
                    var web3ii = new web3ii(provider);
                    provider.injectResult(test.result);
                    provider.injectValidation(function(payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, test.call);
                        assert.deepEqual(payload.params, test.formattedArgs);
                    });

                    var args = clone(test.args)

                    // when
                    if (obj) {
                        var result = web3ii[obj][method].apply(web3ii[obj], args);
                    } else {
                        var result = web3ii[method].apply(web3ii, args);
                    }
                    // when
                    //var result = (obj)
                    //? web3ii[obj][method].apply(null, test.args.slice(0))
                    //: web3ii[method].apply(null, test.args.slice(0));

                    // then 
                    assert.deepEqual(test.formattedResult, result);
                });

                it('async test: ' + index, function(done) {

                    // given
                    var provider = new FakeHttpProvider();
                    var web3ii = new web3ii(provider);
                    provider.injectResult(test.result);
                    provider.injectValidation(function(payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, test.call);
                        assert.deepEqual(payload.params, test.formattedArgs);
                    });

                    var args = clone(test.args);

                    // add callback
                    args.push(function(err, result) {
                        assert.deepEqual(test.formattedResult, result);
                        done();
                    });

                    // when
                    if (obj) {
                        web3i[obj][method].apply(web3i[obj], args);
                    } else {
                        web3i[method].apply(web3i, args);
                    }
                });
            });
        });
    });

};

module.exports = {
    runTests: runTests
}