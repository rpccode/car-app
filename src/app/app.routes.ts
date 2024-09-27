import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/Auth.Guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/login/login.page').then(m => m.LoginPage), // Ruta para la página de login
  },
  {
    path: 'folder',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',

  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '', // Redirige a la bandeja de entrada si la ruta no coincide
  },
];
