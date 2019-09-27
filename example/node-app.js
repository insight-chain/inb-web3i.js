#!/usr/bin/env node

var Web3i = require('../index.js');
var web3i = new Web3i();

web3i.setProvider(new Web3i.providers.HttpProvider('http://localhost:8545'));

var coinbase = web3i.eth.coinbase;
console.log(coinbase);

var balance = web3i.eth.getBalance(coinbase);
console.log(balance.toString(10));