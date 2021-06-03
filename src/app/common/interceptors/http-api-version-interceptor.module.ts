import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpApiVersionInterceptor } from './http-api-version.interceptor';

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
export class HttpApiVersionInterceptorModule {

  /**
   * Use in AppModule: new instance of SumService.
   */
  public static forRoot(): ModuleWithProviders<HttpApiVersionInterceptorModule> {
        
        return {
          ngModule: HttpApiVersionInterceptorModule,
          providers: [
            { provide: HTTP_INTERCEPTORS, useClass: HttpApiVersionInterceptor, multi: true }
            ]
        };
    }

  /**
   * Use in features modules with lazy loading: new instance of SumService.
   */
  public static forChild(): ModuleWithProviders<HttpApiVersionInterceptorModule> {
    return {
      ngModule: HttpApiVersionInterceptorModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpApiVersionInterceptor, multi: true }
        ]
    };
  }

}
