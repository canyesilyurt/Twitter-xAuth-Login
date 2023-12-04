"use strict";
var { SocksProxyAgent } = require('socks-proxy-agent')
var rp = require('request-promise')
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xauth = exports.XauthError = void 0;
var crypto_1 = __importDefault(require("crypto"));
var https_1 = __importDefault(require("https"));
var oauth_1_0a_1 = __importDefault(require("oauth-1.0a"));
var query_string_1 = __importDefault(require("query-string"));
var SIGNATURE_METHOD = 'HMAC-SHA1';
var OAUTH_VERSION = '1.0a';
var XauthError = /** @class */ (function (_super) {
    __extends(XauthError, _super);
    function XauthError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return XauthError;
}(Error));
exports.XauthError = XauthError;

function xauth(config) {
    var proxy = config.proxyAddress;
   
    const info = {
        hostname: config.proxyAddress,  // set hostname of your socks proxy
        port: config.proxyPort,
        protocol: 'socks5',
        auth: config.proxyAuthUser + ':' + config.proxyAuthPass,
    };
    var agent = new SocksProxyAgent(info);

    //var agent = new SocksProxyAgent(proxy);
    var oauth = new oauth_1_0a_1.default({
        consumer: {
            key: config.consumerKey,
            secret: config.consumerSecret,
        },
        signature_method: SIGNATURE_METHOD,
        hash_function: function (baseString) {
            return crypto_1.default
                .createHmac('sha1', encodeURIComponent(config.consumerSecret) + "&")
                .update(baseString)
                .digest('base64');
        },
    });
    var timestamp = Math.floor(Date.now() / 1000);
    var options = {
        url: 'https://api.twitter.com/oauth/access_token',
        method: 'POST',
        data: {
            x_auth_mode: 'client_auth',
            x_auth_password: config.password,
            x_auth_username: config.screenName,
        },
    };
    var data = {
        oauth_consumer_key: config.consumerKey,
        oauth_nonce: timestamp.toString(),
        oauth_signature_method: SIGNATURE_METHOD,
        oauth_timestamp: timestamp,
        oauth_version: OAUTH_VERSION,
    };
    return new Promise(function (resolve, reject) {
        var req = https_1.default.request({
            method: 'POST',
            host: 'api.twitter.com',
            path: '/oauth/access_token',
            agent: agent,
            headers: __assign({ 'content-type': 'application/x-www-form-urlencoded' }, oauth.toHeader(__assign(__assign({}, data), { oauth_signature: oauth.getSignature(options, config.consumerSecret, data) }))),
        }, function (cyxauth) {
            cyxauth.on('data', function (data) {
                if (cyxauth.statusCode !== 200) {
                    var err = data.toString().replace(/<.+?>/g, '');
                    reject(new XauthError(cyxauth.statusCode + ": " + err));
                    return;
                }
                var result = query_string_1.default.parse(data.toString());
                resolve(result);
            });
        });
        rp(req).then((responce) => {
            //console.log(responce)
            //console.log('Proxy connected!')
        }).catch((err) => {
            //console.log(err)
            //console.log('Proxy connection failed!');
        })
        req.write(query_string_1.default.stringify(data));
        req.end();
    });
}
exports.xauth = xauth;
