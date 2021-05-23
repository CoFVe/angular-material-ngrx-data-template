import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth-callback',
    loadChildren: () => import('./views/auth-callback/auth-callback.module').then(m => m.AuthCallbackModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: 'signin-oidc',
    loadChildren: () => import('./views/login/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: 'error',
    loadChildren: () => import('./views/server-error/server-error.module').then(m => m.ServerErrorModule)
  },
  {
    path: 'access-denied',
    loadChildren: () => import('./views/access-denied/access-denied.module').then(m => m.AccessDeniedModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./views/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
