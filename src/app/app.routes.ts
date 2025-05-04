import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./authComponent/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'auth/signup',
    loadComponent: () =>
      import('./authComponent/signup/signup.component').then((m) => m.SignupComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent)
  }
  
];
