import { LoggerConfig, NgxLoggerLevel } from "ngx-logger";
import { OidcClientSettings } from "oidc-client";

// environment.defaults.ts
export const environment = {
  lab: false,
  production: false,
  staging: false,
  loggerConfig: { level: NgxLoggerLevel.TRACE, serverLogLevel: NgxLoggerLevel.OFF } as LoggerConfig,
  oidcConfig: {
    validateAuthority: true,
    storeAuthStateInCookie: false,
    navigateToLoginRequestUrl: true,
    popUp: true,
    piiLoggingEnabled: true,
    response_type: "id_token token",
    loadUserInfo: false,
    automaticSilentRenew: true
  } as OidcClientSettings,
  serviceUrl: '/api',
  apiVersion: '1.0-beta'
} as any;
