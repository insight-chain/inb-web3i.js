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
 * @file web3i.js
 * @authors:
 *   Jeffrey Wilcke <jeff@ethdev.com>
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 *   Gav Wood <g@ethdev.com>
 * @date 2019
 */

var RequestManager = require('./web3i/requestmanager');
var Iban = require('./web3i/iban');
var Inb = require('./web3i/methods/eth');
var DB = require('./web3i/methods/db');
var Shh = require('./web3i/methods/shh');
var Net = require('./web3i/methods/net');
var Personal = require('./web3i/methods/personal');
var Swarm = require('./web3i/methods/swarm');
var Settings = require('./web3i/settings');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var extend = require('./web3i/extend');
var Batch = require('./web3i/batch');
var Property = require('./web3i/property');
var HttpProvider = require('./web3i/httpprovider');
var IpcProvider = require('./web3i/ipcprovider');
var BigNumber = require('bignumber.js');



function Web3I(provider) {
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
Web3I.providers = {
    HttpProvider: HttpProvider,
    IpcProvider: IpcProvider
};

Web3I.prototype.setProvider = function(provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

Web3I.prototype.reset = function(keepIsSyncing) {
    this._requestManager.reset(keepIsSyncing);
    this.settings = new Settings();
};

Web3I.prototype.BigNumber = BigNumber;
Web3I.prototype.toHex = utils.toHex;
Web3I.prototype.toAscii = utils.toAscii;
Web3I.prototype.toUtf8 = utils.toUtf8;
Web3I.prototype.fromAscii = utils.fromAscii;
Web3I.prototype.fromUtf8 = utils.fromUtf8;
Web3I.prototype.toDecimal = utils.toDecimal;
Web3I.prototype.fromDecimal = utils.fromDecimal;
Web3I.prototype.toBigNumber = utils.toBigNumber;
Web3I.prototype.toWei = utils.toWei;
Web3I.prototype.fromWei = utils.fromWei;
Web3I.prototype.isAddress = utils.isAddress;
Web3I.prototype.isChecksumAddress = utils.isChecksumAddress;
Web3I.prototype.toChecksumAddress = utils.toChecksumAddress;
Web3I.prototype.isIBAN = utils.isIBAN;
Web3I.prototype.padLeft = utils.padLeft;
Web3I.prototype.padRight = utils.padRight;


Web3I.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

/**
 * Transforms direct icap to address
 */
Web3I.prototype.fromICAP = function(icap) {
    var iban = new Iban(icap);
    return iban.address();
};

var properties = function() {
    return [
        new Property({
            name: 'version.node',
            getter: 'Web3I_clientVersion'
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

Web3I.prototype.isConnected = function() {
    return (this.currentProvider && this.currentProvider.isConnected());
};

Web3I.prototype.createBatch = function() {
    return new Batch(this);
};

module.exports = Web3I;