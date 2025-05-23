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
  {
    path: 'admin',
    loadChildren: () => import('../app/routes/admin/admin.route').then(m => m.ADMIN_ROUTES),
    data: { title: 'Administración', titleI18n: 'admin_section' }, // Para el menú o breadcrumbs
  },
  { path: '**', redirectTo: 'dashboard' },
];
