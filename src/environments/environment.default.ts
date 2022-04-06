import { NgxLoggerLevel } from "ngx-logger";
import { OidcClientSettings } from "oidc-client";

// environment.defaults.ts
export const environment = {
  local: false,
  production: false,
  staging: false,
  loggerConfig: { level: NgxLoggerLevel.TRACE, serverLogLevel: NgxLoggerLevel.OFF },
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
  serviceUrl: 'http://localhost:3000',
  apiVersion: '1.0-beta',
  pageSize: 5
} as any;
