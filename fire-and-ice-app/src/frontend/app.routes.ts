import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then((c) => c.RegisterComponent),
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'books',
        loadComponent: () =>
          import('./features/books/pages/books/books.component').then((c) => c.BooksComponent),
      },
      // {
      //   path: 'characters',
      //   loadComponent: () =>
      //     import('./core/dashboard/pages/characters/characters.component').then(
      //       (c) => c.CharactersComponent,
      //     ),
      // },
      {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
