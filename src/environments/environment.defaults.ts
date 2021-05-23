import { NgxLoggerLevel } from "ngx-logger";

// environment.defaults.ts
export const environment = {
  lab: false,
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
  },
  serviceUrl: '/api',
  apiVersion: '1.0-beta'
}
