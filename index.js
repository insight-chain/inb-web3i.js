var IWeb3 = require('./lib/web3');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.IWeb3 === 'undefined') {
    window.IWeb3 = IWeb3;
}

module.exports = IWeb3;