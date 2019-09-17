/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file web3.js
 * @authors:
 *   Jeffrey Wilcke <jeff@ethdev.com>
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 *   Gav Wood <g@ethdev.com>
 * @date 2014
 */

var RequestManager = require('./web3/requestmanager');
var Iban = require('./web3/iban');
var Inb = require('./web3/methods/eth');
var DB = require('./web3/methods/db');
var Shh = require('./web3/methods/shh');
var Net = require('./web3/methods/net');
var Personal = require('./web3/methods/personal');
var Swarm = require('./web3/methods/swarm');
var Settings = require('./web3/settings');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var extend = require('./web3/extend');
var Batch = require('./web3/batch');
var Property = require('./web3/property');
var HttpProvider = require('./web3/httpprovider');
var IpcProvider = require('./web3/ipcprovider');
var BigNumber = require('bignumber.js');



function IWeb3(provider) {
    this._requestManager = new RequestManager(provider);
    this.currentProvider = provider;
    this.inb = new Inb(this);
    this.db = new DB(this);
    this.shh = new Shh(this);
    this.net = new Net(this);
    this.personal = new Personal(this);
    this.bzz = new Swarm(this);
    this.settings = new Settings();
    this.version = {
        api: version.version
    };
    this.providers = {
        HttpProvider: HttpProvider,
        IpcProvider: IpcProvider
    };
    this._extend = extend(this);
    this._extend({
        properties: properties()
    });
}

// expose providers on the class
IWeb3.providers = {
    HttpProvider: HttpProvider,
    IpcProvider: IpcProvider
};

IWeb3.prototype.setProvider = function(provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

IWeb3.prototype.reset = function(keepIsSyncing) {
    this._requestManager.reset(keepIsSyncing);
    this.settings = new Settings();
};

IWeb3.prototype.BigNumber = BigNumber;
IWeb3.prototype.toHex = utils.toHex;
IWeb3.prototype.toAscii = utils.toAscii;
IWeb3.prototype.toUtf8 = utils.toUtf8;
IWeb3.prototype.fromAscii = utils.fromAscii;
IWeb3.prototype.fromUtf8 = utils.fromUtf8;
IWeb3.prototype.toDecimal = utils.toDecimal;
IWeb3.prototype.fromDecimal = utils.fromDecimal;
IWeb3.prototype.toBigNumber = utils.toBigNumber;
IWeb3.prototype.toWei = utils.toWei;
IWeb3.prototype.fromWei = utils.fromWei;
IWeb3.prototype.isAddress = utils.isAddress;
IWeb3.prototype.isChecksumAddress = utils.isChecksumAddress;
IWeb3.prototype.toChecksumAddress = utils.toChecksumAddress;
IWeb3.prototype.isIBAN = utils.isIBAN;
IWeb3.prototype.padLeft = utils.padLeft;
IWeb3.prototype.padRight = utils.padRight;


IWeb3.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

/**
 * Transforms direct icap to address
 */
IWeb3.prototype.fromICAP = function(icap) {
    var iban = new Iban(icap);
    return iban.address();
};

var properties = function() {
    return [
        new Property({
            name: 'version.node',
            getter: 'iweb3_clientVersion'
        }),
        new Property({
            name: 'version.network',
            getter: 'net_version',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.ethereum',
            getter: 'inb_protocolVersion',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.whisper',
            getter: 'shh_version',
            inputFormatter: utils.toDecimal
        })
    ];
};

IWeb3.prototype.isConnected = function() {
    return (this.currentProvider && this.currentProvider.isConnected());
};

IWeb3.prototype.createBatch = function() {
    return new Batch(this);
};

module.exports = IWeb3;