import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/auth/auth.guard';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { LoginPageModule } from './views/login/login-page.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> DashboardModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth-callback',
    loadChildren: () => import('./views/auth-callback/auth-callback.module').then(m => m.AuthCallbackModule)
  },
  {
    path: 'login',
    loadChildren: () => LoginPageModule,
  },
  {
    path: 'signin-oidc',
    loadChildren: () => LoginPageModule,
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
