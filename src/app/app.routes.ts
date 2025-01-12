import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '@components/auth-layout/auth-layout.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { LayoutComponent } from '@components/layout/layout.component';
import { LoginComponent } from '@components/session/login/login.component';
import { RegisterComponent } from '@components/session/register/register.component';
import { authGuard } from '@core';
// import { Error403Component } from './routes/sessions/403.component';
// import { Error404Component } from './routes/sessions/404.component';
// import { Error500Component } from './routes/sessions/500.component';
// import { LoginComponent } from './routes/sessions/login/login.component';
// import { RegisterComponent } from './routes/sessions/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      // { path: '403', component: Error403Component },
      // { path: '404', component: Error404Component },
      // { path: '500', component: Error500Component },
      // {
      //   path: 'design',
      //   loadChildren: () => import('./routes/design/design.routes').then(m => m.routes),
      // },
      // {
      //   path: 'material',
      //   loadChildren: () => import('./routes/material/material.routes').then(m => m.routes),
      // },
      // {
      //   path: 'media',
      //   loadChildren: () => import('./routes/media/media.routes').then(m => m.routes),
      // },
      // {
      //   path: 'forms',
      //   loadChildren: () => import('./routes/forms/forms.routes').then(m => m.routes),
      // },
      // {
      //   path: 'tables',
      //   loadChildren: () => import('./routes/tables/tables.routes').then(m => m.routes),
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('./routes/profile/profile.routes').then(m => m.routes),
      // },
      // {
      //   path: 'permissions',
      //   loadChildren: () => import('./routes/permissions/permissions.routes').then(m => m.routes),
      // },
      // {
      //   path: 'utilities',
      //   loadChildren: () => import('./routes/utilities/utilities.routes').then(m => m.routes),
      // },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
