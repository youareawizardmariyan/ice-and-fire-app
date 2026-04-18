import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/auth/pages/login/login').then((c) => c.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/pages/register/register').then((c) => c.Register),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
