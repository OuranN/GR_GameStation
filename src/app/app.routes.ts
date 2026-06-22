import { Routes } from '@angular/router';
import { AdminAuth } from './pages/auth/admin-auth/admin-auth';
import { Admin } from './pages/admin/admin';
import { Home } from './pages/home/home';
import { AuthGuard } from './services/AuthService/AuthGuard/auth-guard';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch: 'full',
  },
  {
    path:'home',
    component:Home,
    title: 'GR Group'
  },
  {
    path: 'adminAuth',
    component:AdminAuth,
    title: 'Autenticação Admin'
  },
  {
    path:'admin',
    component:Admin,
    title: 'Admin',
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    component:Home
  }
];
