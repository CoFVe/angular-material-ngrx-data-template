import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UncaughtExceptionHandler } from './common/handlers/uncaught-exception.handler';
import { environment } from '@environment';
import { LoggerModule } from 'ngx-logger';
import { AuthModule } from './auth/common/modules/auth.module';
import { StorageModule } from '@ngx-pwa/local-storage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpApiTokenInterceptorModule } from './auth/common/interceptors/http-api-token-interceptor.module';
import { HttpApiVersionInterceptorModule } from './common/interceptors/http-api-version-interceptor.module';
import { HttpErrorInterceptorModule } from './common/interceptors/http-error-interceptor.module';
import { HttpResultPaginationInterceptorModule } from './common/interceptors/http-result-pagination-interceptor.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmationDialogComponent } from './common/components/confirmation-dialog/confirmation-dialog.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LoadingSpinnerModule } from './common/components/loading-spinner/loading-spinner.module';
import { LoadingSpinnerService } from './common/components/loading-spinner/loading-spinner.service';
import { NotificationService } from './common/components/notification-message/notification.service';
import { LoggerService } from './common/services/logger.service';
import { reducers } from './common/store/reducers/app.reducers';
import { metaReducers } from './common/store/reducers/app-meta.reducers';
import { OidcUserModule } from './auth/user/modules/oidc-user.module';
import { DepartmentModule } from './departments/modules/department.module';
import { PeopleModule } from './people/views/people-page/people.module';
import { NgrxStoreModule } from './common/modules/ngrx-store.module';

@NgModule({
  declarations: [
    AppComponent
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
    HttpResultPaginationInterceptorModule.forRoot(),
    HttpErrorInterceptorModule.forRoot(),
    HttpApiVersionInterceptorModule.forRoot(),
    HttpApiTokenInterceptorModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    NgrxStoreModule,
    LoadingSpinnerModule,
    OidcUserModule,
    DepartmentModule,
    PeopleModule
  ],
  providers: [
    LoadingSpinnerService,
    NotificationService,
    { provide: ErrorHandler, useClass: UncaughtExceptionHandler, deps: [LoggerService, NotificationService] }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class AppModule { }
