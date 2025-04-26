import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_CARD_CONFIG } from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withDisabledInitialNavigation, withEnabledBlockingInitialNavigation, withHashLocation, withInMemoryScrolling } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  BrowserUtils,
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { appInitializerProviders } from '@core';
import { environment } from '@env/environment';
import { provideMomentDatetimeAdapter } from '@ng-matero/extensions-moment-adapter';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaginatorI18nService } from '@shared';
import { NgxPermissionsModule } from 'ngx-permissions';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { FormlyConfigModule } from './formly-config';

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.msalConfig.auth.authority,
      knownAuthorities: environment.msalConfig.auth.knownAuthorities,
      redirectUri: environment.msalConfig.auth.redirectUri,
      postLogoutRedirectUri: environment.msalConfig.auth.postLogoutRedirectUri,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowPlatformBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Warning || LogLevel.Error,
        // logLevel: LogLevel.Error,
        // logLevel: LogLevel.Warning,
        piiLoggingEnabled: false,
      },
    },
  });
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(
    environment.apiConfig.uri,
    environment.apiConfig.scopes
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.apiConfig.scopes],
    },
    loginFailedRoute: '/login-failed',
  };
}

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

const initialNavigationEnabled = (
  (!BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()) ||
  window.location.href.includes('/logout')
);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      withComponentInputBinding(),
      withHashLocation(),
      initialNavigationEnabled ? withEnabledBlockingInitialNavigation() : withDisabledInitialNavigation(),
    ),
    provideAnimationsAsync(),
    provideToastr(),
    provideHttpClient(
      //withInterceptorsFromDi()
    ),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    importProvidersFrom(
      NgxPermissionsModule.forRoot(),
      FormlyConfigModule.forRoot(),
      // 👇 ❌ This is only used for demo purpose, remove it in the realworld application
      // InMemoryWebApiModule.forRoot(InMemDataService, {
      //   dataEncapsulation: false,
      //   passThruUnknownUrl: true,
      // }),
      MsalModule
    ),
    // { provide: BASE_URL, useValue: environment.baseUrl },
    //httpInterceptorProviders,
    appInitializerProviders,
    {
      provide: MatPaginatorIntl,
      useFactory: (paginatorI18nSrv: PaginatorI18nService) => paginatorI18nSrv.getPaginatorIntl(),
      deps: [PaginatorI18nService],
    },
    {
      provide: MAT_DATE_LOCALE,
      useFactory: () => navigator.language, // <= This will be overrided by runtime setting
    }, {
      provide: MAT_CARD_CONFIG,
      useValue: {
        appearance: 'outlined',
      },
    },
    provideMomentDateAdapter({
      parse: {
        dateInput: 'YYYY-MM-DD',
      },
      display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY MMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY MMM',
      },

    }),
    provideMomentDatetimeAdapter({
      parse: {
        dateInput: 'YYYY-MM-DD',
        yearInput: 'YYYY',
        monthInput: 'MMMM',
        datetimeInput: 'YYYY-MM-DD HH:mm',
        timeInput: 'HH:mm',
      },
      display: {
        dateInput: 'YYYY-MM-DD',
        yearInput: 'YYYY',
        monthInput: 'MMMM',
        datetimeInput: 'YYYY-MM-DD HH:mm',
        timeInput: 'HH:mm',
        monthYearLabel: 'YYYY MMMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
        popupHeaderDateLabel: 'MMM DD, ddd',
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    }, {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    }, {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,

  ],
};


