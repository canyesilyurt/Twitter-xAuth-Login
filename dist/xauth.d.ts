export declare type XauthConfig = {
    consumerKey: string;
    consumerSecret: string;
    screenName: string;
    password: string;
};
export declare type XauthResult = {
    oauth_token: string;
    oauth_token_secret: string;
    screen_name: string;
    user_id: string;
    x_auth_expires: string;
};
export declare class XauthError extends Error {
}
export declare function xauth(config: XauthConfig): Promise<XauthResult>;
