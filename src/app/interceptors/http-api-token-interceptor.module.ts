import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpApiTokenInterceptor } from './http-api-token.interceptor';
import { AuthService } from '@app/auth/auth.service';

@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})

// Consider registering providers using a forRoot() method
// when the module exports components, directives or pipes that require sharing the same providers instances.
// Consider registering providers also using a forChild() method
// when they requires new providers instances or different providers in child modules.
export class HttpApiTokenInterceptorModule {

  /**
   * Use in AppModule: new instance of SumService.
   */
  public static forRoot(): ModuleWithProviders<HttpApiTokenInterceptorModule> {

        return {
          ngModule: HttpApiTokenInterceptorModule,
          providers: [
            { provide: HTTP_INTERCEPTORS, useClass: HttpApiTokenInterceptor, multi: true, deps: [AuthService] }
            ]
        };
    }

  /**
   * Use in features modules with lazy loading: new instance of SumService.
   */
  public static forChild(): ModuleWithProviders<HttpApiTokenInterceptorModule> {
    return {
      ngModule: HttpApiTokenInterceptorModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpApiTokenInterceptor, multi: true, deps: [AuthService] }
        ]
    };
  }

}
