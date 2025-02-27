import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home',
    loadComponent: async () => {
      const m = await import('./home/home.component');
      return m.HomeComponent;}},
  { path: 'list',
    loadComponent: async () => {
      const m = await import('./components/user-list/user-list.component');
      return m.UserListComponent;}},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
