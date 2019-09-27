/*
    This file is part of web3i.js.

    web3i.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3i.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3i.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file eth.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @author Fabian Vogelsteller <fabian@ethdev.com>
 * @date 2015
 */

"use strict";

var formatters = require('../formatters');
var utils = require('../../utils/utils');
var Method = require('../method');
var Property = require('../property');
var c = require('../../utils/config');
var Contract = require('../contract');
var watches = require('./watches');
var Filter = require('../filter');
var IsSyncing = require('../syncing');
var namereg = require('../namereg');
var Iban = require('../iban');
var transfer = require('../transfer');

var blockCall = function(args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? "inb_getBlockByHash" : "inb_getBlockByNumber";
};

var transactionFromBlockCall = function(args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'inb_getTransactionByBlockHashAndIndex' : 'inb_getTransactionByBlockNumberAndIndex';
};

var uncleCall = function(args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'inb_getUncleByBlockHashAndIndex' : 'inb_getUncleByBlockNumberAndIndex';
};

var getBlockTransactionCountCall = function(args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'inb_getBlockTransactionCountByHash' : 'inb_getBlockTransactionCountByNumber';
};

var uncleCountCall = function(args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'inb_getUncleCountByBlockHash' : 'inb_getUncleCountByBlockNumber';
};

function Inb(web3i) {
    this._requestManager = web3i._requestManager;

    var self = this;

    methods().forEach(function(method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });

    properties().forEach(function(p) {
        p.attachToObject(self);
        p.setRequestManager(self._requestManager);
    });


    this.iban = Iban;
    this.sendIBANTransaction = transfer.bind(null, this);
}

Object.defineProperty(Inb.prototype, 'defaultBlock', {
    get: function() {
        return c.defaultBlock;
    },
    set: function(val) {
        c.defaultBlock = val;
        return val;
    }
});

Object.defineProperty(Inb.prototype, 'defaultAccount', {
    get: function() {
        return c.defaultAccount;
    },
    set: function(val) {
        c.defaultAccount = val;
        return val;
    }
});

var methods = function() {
    //1 Resource by zc
    var getRes = new Method({
        name: 'getRes',
        call: 'inb_getRes',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: formatters.outputBigNumberFormatterToNumber
    });
    //2 inb by ghy begin
    var getUsedRes = new Method({
        name: 'getUsedRes',
        call: 'inb_getUsedRes',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: formatters.outputBigNumberFormatterToNumber
    });
    //3 inb by ghy end
    var getMortgage = new Method({
        name: 'getMortgage',
        call: 'inb_getMortgage',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: formatters.outputBigNumberFormatterToNumber
    });
    //4 method minerReward by zpq
    var minerReward = new Method({
        name: 'minerReward',
        call: 'inb_minerReward',
        params: 0
    });
    //5 method GetLiquidity by zpq
    var getLiquidity = new Method({
        name: 'getLiquidity',
        call: 'inb_getLiquidity',
        params: 0
    });
    // 6 method getCandidateNodesInfo
    var getCandidateNodesInfo = new Method({
        name: 'getCandidateNodesInfo',
        call: 'inb_getCandidateNodesInfo',
        params: 0
    });
    //7 method getSuperNodesInfo
    var getSuperNodesInfo = new Method({
        name: 'getSuperNodesInfo',
        call: 'inb_getSuperNodesInfo',
        params: 0
    });
    //8 method getAccountInfo 
    var getAccountInfo = new Method({
        name: 'getAccountInfo',
        call: 'inb_getAccountInfo',
        params: 1,
        inputFormatter: [formatters.inputAddressFormatter]
    });
    // 9 Method GetLightTokenByAddress by ssh
    var getLightTokenByAddress = new Method({
            name: 'getLightTokenByAddress',
            call: 'inb_getLightTokenByAddress',
            params: 1,
            inputFormatter: [formatters.inputAddressFormatter]
        })
        //10 Method getSigners by ssh
    var getSigners = new Method({
            name: 'getSigners',
            call: 'inb_getSigners',
            params: 1,
            inputFormatter: [formatters.inputBlockNumber]

        })
        //11 Method getSignersAtHash by ssh
    var getSignersAtHash = new Method({
            name: 'getSignersAtHash',
            call: 'inb_getSignersAtHash',
            params: 1,
            inputFormatter: [formatters.TxHashString]
        })
        // 12 Method GetLightTokenAccountByAccountAddress by ssh
    var getLightTokenAccountByAccountAddress = new Method({
            name: 'getLightTokenAccountByAccountAddress',
            call: 'inb_getLightTokenAccountByAccountAddress',
            params: 1,
            inputFormatter: [formatters.inputAddressFormatter]
        })
        //13 Method GetLightTokenBalanceByAddress by ssh
    var getLightTokenBalanceByAddress = new Method({
            name: 'getLightTokenBalanceByAddress',
            call: 'inb_getLightTokenBalanceByAddress',
            params: 2,
            inputFormatter: [formatters.inputAddressFormatter, formatters.inputAddressFormatter]
        })
        //14 Method signPaymentTransaction by tx 未调试(类似 sendRawTransaction)
    var signPaymentTransaction = new Method({
        name: 'signPaymentTransaction',
        call: 'inb_signPaymentTransaction',
        params: 1,
        inputFormatter: [null]
    })
    var getBalance = new Method({
        name: 'getBalance',
        call: 'inb_getBalance',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: formatters.outputBigNumberFormatter
    });

    var getStorageAt = new Method({
        name: 'getStorageAt',
        call: 'inb_getStorageAt',
        params: 3,
        inputFormatter: [null, utils.toHex, formatters.inputDefaultBlockNumberFormatter]
    });

    var getCode = new Method({
        name: 'getCode',
        call: 'inb_getCode',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter]
    });

    var getBlock = new Method({
        name: 'getBlock',
        call: blockCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, function(val) { return !!val; }],
        outputFormatter: formatters.outputBlockFormatter
    });

    var getUncle = new Method({
        name: 'getUncle',
        call: uncleCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
        outputFormatter: formatters.outputBlockFormatter,

    });

    var getCompilers = new Method({
        name: 'getCompilers',
        call: 'inb_getCompilers',
        params: 0
    });

    var getBlockTransactionCount = new Method({
        name: 'getBlockTransactionCount',
        call: getBlockTransactionCountCall,
        params: 1,
        inputFormatter: [formatters.inputBlockNumberFormatter],
        outputFormatter: utils.toDecimal
    });

    var getBlockUncleCount = new Method({
        name: 'getBlockUncleCount',
        call: uncleCountCall,
        params: 1,
        inputFormatter: [formatters.inputBlockNumberFormatter],
        outputFormatter: utils.toDecimal
    });

    var getTransaction = new Method({
        name: 'getTransaction',
        call: 'inb_getTransactionByHash',
        params: 1,
        outputFormatter: formatters.outputTransactionFormatter
    });

    var getTransactionFromBlock = new Method({
        name: 'getTransactionFromBlock',
        call: transactionFromBlockCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
        outputFormatter: formatters.outputTransactionFormatter
    });

    var getTransactionReceipt = new Method({
        name: 'getTransactionReceipt',
        call: 'inb_getTransactionReceipt',
        params: 1,
        outputFormatter: formatters.outputTransactionReceiptFormatter
    });

    var getTransactionCount = new Method({
        name: 'getTransactionCount',
        call: 'inb_getTransactionCount',
        params: 2,
        inputFormatter: [null, formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: utils.toDecimal
    });

    var sendRawTransaction = new Method({
        name: 'sendRawTransaction',
        call: 'inb_sendRawTransaction',
        params: 1,
        inputFormatter: [null]
    });

    var sendTransaction = new Method({
        name: 'sendTransaction',
        call: 'inb_sendTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

    var signTransaction = new Method({
        name: 'signTransaction',
        call: 'inb_signTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

    var sign = new Method({
        name: 'sign',
        call: 'inb_sign',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, null]
    });

    var call = new Method({
        name: 'call',
        call: 'inb_call',
        params: 2,
        inputFormatter: [formatters.inputCallFormatter, formatters.inputDefaultBlockNumberFormatter]
    });

    var estimateGas = new Method({
        name: 'estimateGas',
        call: 'inb_estimateGas',
        params: 1,
        inputFormatter: [formatters.inputCallFormatter],
        outputFormatter: utils.toDecimal
    });

    var compileSolidity = new Method({
        name: 'compile.solidity',
        call: 'inb_compileSolidity',
        params: 1
    });

    var compileLLL = new Method({
        name: 'compile.lll',
        call: 'inb_compileLLL',
        params: 1
    });

    var compileSerpent = new Method({
        name: 'compile.serpent',
        call: 'inb_compileSerpent',
        params: 1
    });

    var submitWork = new Method({
        name: 'submitWork',
        call: 'inb_submitWork',
        params: 3
    });

    var getWork = new Method({
        name: 'getWork',
        call: 'inb_getWork',
        params: 0
    });

    return [
        //Resource by zc
        getRes,
        //inb by ghy begin
        getUsedRes,
        //inb by ghy end
        getMortgage,
        //by zpq
        minerReward,
        //4 -ghy
        getLiquidity,
        //5 -ghy
        getCandidateNodesInfo,
        //6 -ghy
        getSuperNodesInfo,
        //7 -ghy
        getAccountInfo,
        //8 -ssh
        getLightTokenByAddress,
        //9 -ssh
        getSigners,
        //10 -ssh
        getSignersAtHash,
        // 11 -ssh
        getLightTokenAccountByAccountAddress,
        //12 -ssh
        getLightTokenBalanceByAddress,
        //13 -tx
        signPaymentTransaction,
        getBalance,
        getStorageAt,
        getCode,
        getBlock,
        getUncle,
        getCompilers,
        getBlockTransactionCount,
        getBlockUncleCount,
        getTransaction,
        getTransactionFromBlock,
        getTransactionReceipt,
        getTransactionCount,
        call,
        estimateGas,
        sendRawTransaction,
        signTransaction,
        sendTransaction,
        sign,
        compileSolidity,
        compileLLL,
        compileSerpent,
        submitWork,
        getWork
    ];
};


var properties = function() {
    return [
        new Property({
            name: 'coinbase',
            getter: 'inb_coinbase'
        }),
        new Property({
            name: 'mining',
            getter: 'inb_mining'
        }),
        new Property({
            name: 'hashrate',
            getter: 'inb_hashrate',
            outputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'syncing',
            getter: 'inb_syncing',
            outputFormatter: formatters.outputSyncingFormatter
        }),
        new Property({
            name: 'gasPrice',
            getter: 'inb_gasPrice',
            outputFormatter: formatters.outputBigNumberFormatter
        }),
        new Property({
            name: 'accounts',
            getter: 'inb_accounts'
        }),
        new Property({
            name: 'blockNumber',
            getter: 'inb_blockNumber',
            outputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'protocolVersion',
            getter: 'inb_protocolVersion'
        })
    ];
};

Inb.prototype.contract = function(abi) {
    var factory = new Contract(this, abi);
    return factory;
};

Inb.prototype.filter = function(options, callback, filterCreationErrorCallback) {
    return new Filter(options, 'inb', this._requestManager, watches.inb(), formatters.outputLogFormatter, callback, filterCreationErrorCallback);
};

Inb.prototype.namereg = function() {
    return this.contract(namereg.global.abi).at(namereg.global.address);
};

Inb.prototype.icapNamereg = function() {
    return this.contract(namereg.icap.abi).at(namereg.icap.address);
};

Inb.prototype.isSyncing = function(callback) {
    return new IsSyncing(this._requestManager, callback);
};

module.exports = Inb;