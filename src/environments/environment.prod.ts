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
    apiUrl: 'http://api-ne-llaqta.azurewebsites.net', // O la URL de tu APIM Gateway cuando esté lista
    useSubscriptionKey: true, // Flag para pruebas
    subscriptionKey: '5e4b845b-7965-48ba-88be-6be0d93373c8', // Tu clave temporal de la URL
    // O si ya tienes una clave de APIM para pruebas:
    // apiUrl: 'https://tu-apim-instance.azure-api.net/llaqta-notifications',
    // subscriptionKey: 'TU_CLAVE_DE_SUSCRIPCION_DE_APIM',
    subscriptionKeyHeader: 'Ocp-Apim-Subscription-Key' // Para APIM
    // O si es una clave personalizada en tu API Java:
    // subscriptionKeyHeader: 'X-API-Key'
  },
};
