import { Routes } from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';

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
