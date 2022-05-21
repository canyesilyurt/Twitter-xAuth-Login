# cy-tw-xauth-proxy

Authenticate Twitter account using XAuth.

## Installation

```
$ npm install cy-tw-xauth-proxy
```

## Usage

```js
const { xauth } = require('cy-tw-xauth-proxy');

xauth({
  screenName: 'SCREEN_NAME',
  password: 'PASSWORD',
  consumerKey: 'CjulERsDeqhhjSme66ECg',
  consumerSecret: 'IQWdVyqFxghAtURHGeGiWAsmCAGmdW3WmbEx6Hck', 
  proxyAddress: 'socks5://45.155.125.200:9866' // only socks5 proxy
    }).then((cyxauth) => {
      console.log(cyxauth.oauth_token);
      console.log(cyxauth.oauth_token_secret);
    }).catch((err) => {
      console.log(err);
    });
```

## License

[Can Yesilyurt](https://canyesilyurt.com)
