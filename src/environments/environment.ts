// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: '',
  useHash: false,
  msalConfig: {
    auth: {
      clientId: 'a042dd72-1833-4245-9f5c-8ee1289586b5',
      authority: 'https://llaqtab2c.b2clogin.com/llaqtab2c.onmicrosoft.com/B2C_1_signupsignin',
      redirectUri: 'http://localhost:4200/auth',
      postLogoutRedirectUri: 'http://localhost:4200/logout',
      knownAuthorities: ['llaqtab2c.b2clogin.com'],
    },
  },
  apiConfig: {
    uri: 'https://graph.microsoft.com/v1.0/me',
    scopes: [
      'openid',
      'offline_access',
      // 'https://graph.microsoft.com/User.Read'
      //'https://llaqtab2c.onmicrosoft.com/llaqtasense-api/data.read',
    ],
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
