# Twitter xAuth Login w/Proxy for Node.JS

Authenticate Twitter account using XAuth.

## Installation

```
$ npm install cy-twitter-xauth
```

## Usage

```js
const { xauth } = require('cy-twitter-xauth');
// Only sock5 support
xauth({
  screenName: 'SCREEN_NAME',
  password: 'PASSWORD',
  consumerKey: 'CjulERsDeqhhjSme66ECg',
  consumerSecret: 'IQWdVyqFxghAtURHGeGiWAsmCAGmdW3WmbEx6Hck', 
  proxyAddress: '45.155.125.200',
  proxyPort: '9866',
  proxyAuthUser: 'username',
  proxyAuthPass: 'password'
    }).then((cyxauth) => {
      console.log(cyxauth.oauth_token);
      console.log(cyxauth.oauth_token_secret);
    }).catch((err) => {
      console.log(err);
    });
```

## License

[Can Yesilyurt](https://canyesilyurt.com) & [cy4udev](https://cy4u.dev) 
