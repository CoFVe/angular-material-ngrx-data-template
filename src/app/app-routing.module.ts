import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@/app/common/guard/auth.guard';
import { LoginPageModule } from './auth/login/views/login-page/login-page.module';
import { DashboardModule } from './dashboard/views/dashboard-page/dashboard.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> DashboardModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth-callback',
    loadChildren: () => import('./auth/login/views/auth-callback/auth-callback.module').then(m => m.AuthCallbackModule)
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
    loadChildren: () => import('./error-pages/views/server-error/server-error.module').then(m => m.ServerErrorModule)
  },
  {
    path: 'access-denied',
    loadChildren: () => import('./error-pages/views/access-denied/access-denied.module').then(m => m.AccessDeniedModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./error-pages/views/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
