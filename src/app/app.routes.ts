import { Routes } from '@angular/router';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { AuthLayoutComponent } from '@components/auth-layout/auth-layout.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { LayoutComponent } from '@components/layout/layout.component';
import { LoginComponent } from '@components/session/login/login.component';
import { LogoutComponent } from '@components/session/logout/logout.component';

export const routes: Routes = [
  {

    path: '',
    component: LayoutComponent,
    canActivateChild: [MsalGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
    ],
  },
  {
    path: 'code',
    component: AuthLayoutComponent
  },
  {
    path: 'error',
    component: AuthLayoutComponent
  },
  {
    path: 'login-failed',
    component: LoginComponent,
  },
  {
  // Dedicated route for redirects
    path: 'auth',
    component: MsalRedirectComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  { path: '**', redirectTo: 'dashboard' },
];
