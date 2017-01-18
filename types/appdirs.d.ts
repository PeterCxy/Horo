declare module "appdirs" {
    export function siteConfigDir(appname?: string, appauthor?: string, version?: string, multipath?: boolean): string;
    export function siteDataDir(appname?: string, appauthor?: string, version?: string, multipath?: boolean): string;
    export function userCacheDir(appname?: string, appauthor?: string, version?: string): string;
    export function userConfigDir(appname?: string, appauthor?: string, version?: string, roaming?: boolean): string;
    export function userDataDir(appname?: string, appauthor?: string, version?: string, roaming?: boolean): string;
    export function userLogDir(appname?: string, appauthor?: string, version?: string): string;
}