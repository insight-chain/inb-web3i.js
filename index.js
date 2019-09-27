var Web3I = require('./lib/web3i');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.Web3I === 'undefined') {
    window.Web3I = Web3I;
}

module.exports = Web3I;