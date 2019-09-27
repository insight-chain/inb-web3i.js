# Migration 0.13.0 -> 0.14.0

web3i.js version 0.14.0 supports [multiple instances of web3i](https://github.com/ethereum/web3i.js/issues/297) object.
To migrate to this version, please follow the guide:

```diff
-var web3i = require('web3i');
+var web3i = require('web3i');
+var web3i = new web3i();
```


# Ethereum JavaScript API

[![Join the chat at https://gitter.im/ethereum/web3i.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ethereum/web3i.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is the Ethereum compatible [JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API)
which implements the [Generic JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) spec. It's available on npm as a node module, for bower and component as an embeddable js and as a meteor.js package.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url] [![dev dependency status][dep-dev-image]][dep-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Stories in Ready][waffle-image]][waffle-url]

<!-- [![browser support](https://ci.testling.com/ethereum/ethereum.js.png)](https://ci.testling.com/ethereum/ethereum.js) -->

You need to run a local Ethereum node to use this library.

[Documentation](https://github.com/ethereum/wiki/wiki/JavaScript-API)

## Installation

### Node.js

```bash
npm install web3i
```

### Yarn

```bash
yarn add web3i
```

### Meteor.js

```bash
meteor add ethereum:web3i
```

### As Browser module
Bower

```bash
bower install web3i
```

Component

```bash
component install ethereum/web3i.js
```

* Include `web3i.min.js` in your html file. (not required for the meteor package)

## Usage
Use the `web3i` object directly from global namespace:

```js
console.log(web3i); // {eth: .., shh: ...} // it's here!
```

Set a provider (HttpProvider)

```js
if (typeof web3i !== 'undefined') {
  web3i = new web3i(web3i.currentProvider);
} else {
  // set the provider you want from web3i.providers
  web3i = new web3i(new web3i.providers.HttpProvider("http://localhost:8545"));
}
```

Set a provider (HttpProvider using [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication))

```js
web3i.setProvider(new web3i.providers.HttpProvider('http://host.url', 0, BasicAuthUsername, BasicAuthPassword));
```

There you go, now you can use it:

```js
var coinbase = web3i.eth.coinbase;
var balance = web3i.eth.getBalance(coinbase);
```

You can find more examples in [`example`](https://github.com/ethereum/web3i.js/tree/master/example) directory.


## Contribute!

### Requirements

* Node.js
* npm

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

### Building (gulp)

```bash
npm run-script build
```


### Testing (mocha)

```bash
npm test
```

### Community
 - [Gitter](https://gitter.im/ethereum/web3i.js?source=orgpage)
 - [Forum](https://forum.ethereum.org/categories/ethereum-js)


### Other implementations
 - Python [web3i.py](https://github.com/ethereum/web3i.py)
 - Haskell [hs-web3i](https://github.com/airalab/hs-web3i)
 - Java [web3ij](https://github.com/web3ij/web3ij)
 - Scala [web3ij-scala](https://github.com/mslinn/web3ij-scala)
 - Purescript [purescript-web3i](https://github.com/f-o-a-m/purescript-web3i)
 - PHP [web3i.php](https://github.com/sc0Vu/web3i.php)


[npm-image]: https://badge.fury.io/js/web3i.svg
[npm-url]: https://npmjs.org/package/web3i
[travis-image]: https://travis-ci.org/ethereum/web3i.js.svg
[travis-url]: https://travis-ci.org/ethereum/web3i.js
[dep-image]: https://david-dm.org/ethereum/web3i.js.svg
[dep-url]: https://david-dm.org/ethereum/web3i.js
[dep-dev-image]: https://david-dm.org/ethereum/web3i.js/dev-status.svg
[dep-dev-url]: https://david-dm.org/ethereum/web3i.js#info=devDependencies
[coveralls-image]: https://coveralls.io/repos/ethereum/web3i.js/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/ethereum/web3i.js?branch=master
[waffle-image]: https://badge.waffle.io/ethereum/web3i.js.svg?label=ready&title=Ready
[waffle-url]: https://waffle.io/ethereum/web3i.js
