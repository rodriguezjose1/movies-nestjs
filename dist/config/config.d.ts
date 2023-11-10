export declare enum ConfigKey {
    App = "APP",
    Db = "DB"
}
export declare enum Environment {
    Local = "local",
    Development = "development",
    Staging = "staging",
    Production = "prod",
    Testing = "testing"
}
export declare const configurations: (((() => {
    env: string;
    port: number;
    jwtTokenSecret: string;
    jwtRefreshSecret: string;
    appName: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    env: string;
    port: number;
    jwtTokenSecret: string;
    jwtRefreshSecret: string;
    appName: string;
}>) | ((() => {
    mongoUri: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    mongoUri: string;
}>))[];
