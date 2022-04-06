// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environment as defaultEnvironment } from './environment.default';
import { NgxLoggerLevel } from 'ngx-logger';
import { OidcClientSettings, Profile, User } from 'oidc-client';

export const environment = {
  ...defaultEnvironment,
  local: true,
  oidcConfig: {
    ...defaultEnvironment.oidcConfig
  } as OidcClientSettings,
  loggerConfig: { level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.OFF },
  serviceUrl: 'http://localhost:3000',
  testUsers: [
    {
      id_token: "user_id_token_string",
      access_token: "user_access_token_string",
      expired: false,
      profile: {
        email: "admin.user@email.com",
        sub: "admin_user_id",
        name: "Admin User_name",
        given_name: "Admin_Given_Name",
        family_name: "Admin_Family_Name",
        nickname: "admin_user_nickname",
        roles: 'Administrator',
        iss: '',
        aud: '',
        exp: 0,
        iat: new Date().getTime()
      } as Profile
    },
    {
      id_token: "reader_user_id_token_string",
      access_token: "reader_user_access_token_string",
      expired: false,
      profile: {
        email: "reader.user@email.com",
        sub: "reader_user_id",
        name: "Reader User_name",
        given_name: "Reader_Given_Name",
        family_name: "Reader_Family_Name",
        nickname: "reader_user_nickname",
        roles: 'Reader',
        iss: '',
        aud: '',
        exp: 0,
        iat: new Date().getTime()
      } as Profile
    }
  ] as User[]
} as any;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
