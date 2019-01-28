import { IGlobalConfig, ILocalConfig } from "../interfaces";
/**
 * detectAngular
 * Checks if a project is angular or not by finding angular.json or angular-cli.json at its root
 * */
export declare function detectAngular(): Promise<any>;
export declare function getLocalConfig(): any;
export declare function updateLocalConfig(newLocalConfigData: ILocalConfig): Promise<any>;
export declare function getGlobalConfig(): any;
export declare function updateGlobalConfig(newGlobalConfigData: IGlobalConfig): Promise<any>;
