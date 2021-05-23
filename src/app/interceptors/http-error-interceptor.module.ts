import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';

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
export class HttpErrorInterceptorModule {

  public static forRoot(): ModuleWithProviders<HttpErrorInterceptorModule> {
      return {
        ngModule: HttpErrorInterceptorModule,
          providers: [
              { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
          ]
      };
  }

  public static forChild(): ModuleWithProviders<HttpErrorInterceptorModule> {
    return {
      ngModule: HttpErrorInterceptorModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
        ]
    };
  }

}
