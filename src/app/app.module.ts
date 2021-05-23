import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from '@app/stores/entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UncaughtExceptionHandler } from './handlers/uncaught-exception.handler';
import { LoggerService } from '@services/logger.service';
import { MessageService } from 'primeng/api';
import { environment } from '@environment';
import { LoggerModule } from 'ngx-logger';
import { reducers } from './reducers/app.reducers';
import { metaReducers } from './reducers/app-meta.reducers';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from '@ngx-pwa/local-storage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpApiTokenInterceptorModule } from './interceptors/http-api-token-interceptor.module';
import { HttpApiVersionInterceptorModule } from './interceptors/http-api-version-interceptor.module';
import { HttpErrorInterceptorModule } from './interceptors/http-error-interceptor.module';
import { HttpResultPaginationInterceptorModule } from './interceptors/http-result-pagination-interceptor.module';
import { OidcUserStoreModule } from '@stores/oidc-user-store.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DepartmentStoreModule } from './stores/department-store.module';
import { LoadingSpinnerService } from './components/loading-spinner/loading-spinner.service';
import { LoadingSpinnerModule } from './components/loading-spinner/loading-spinner.module';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    LoggerModule.forRoot(environment.loggerConfig),
    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: (http: HttpClient) => { return new TranslateHttpLoader(http, "./assets/i18n/", ".json"); }, deps: [HttpClient], }, }),
    StorageModule.forRoot({ IDBNoWrap: true }),
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      },
      initialState: {
        router: {
          state: {
            url: window.location.pathname,
            params: {},
            queryParams: {}
          },
          navigationId: 0
        }
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
    HttpResultPaginationInterceptorModule.forRoot(),
    HttpErrorInterceptorModule.forRoot(),
    HttpApiVersionInterceptorModule.forRoot(),
    HttpApiTokenInterceptorModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    MatProgressSpinnerModule,
    OidcUserStoreModule,
    MatDialogModule,
    DepartmentStoreModule,
    LoadingSpinnerModule
  ],
  providers: [
    LoadingSpinnerService,
    MessageService,
    { provide: ErrorHandler, useClass: UncaughtExceptionHandler, deps: [LoggerService, MessageService] }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class AppModule { }
