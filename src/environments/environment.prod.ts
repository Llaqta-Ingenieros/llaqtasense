export const environment = {
  production: true,
  baseUrl: '',
  useHash: false,
  msalConfig: {
    auth: {
      clientId: 'a042dd72-1833-4245-9f5c-8ee1289586b5',
      authority: 'https://llaqtab2c.b2clogin.com/llaqtab2c.onmicrosoft.com/B2C_1_signupsignin',
      redirectUri: 'https://llaqtasense.azurewebsites.net/auth',
      postLogoutRedirectUri: 'https://llaqtasense.azurewebsites.net/logout',
      knownAuthorities: ['llaqtab2c.b2clogin.com'],
    },
  },
  apiConfig: {
    uri: 'https://graph.microsoft.com/v1.0/me',
    scopes: [
      'openid',
      'offline_access',
      // puedes incluir este si tu API está lista:
      // 'https://llaqtab2c.onmicrosoft.com/llaqtasense-api/data.read',
    ],
  },
};
