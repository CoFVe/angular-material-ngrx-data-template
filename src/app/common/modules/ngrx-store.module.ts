import { EntityDataModule } from "@ngrx/data";
import { EffectsModule } from "@ngrx/effects";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { storeDevToolsModule } from "./store-devtools.module";
import { storeRuntimeChecksModule } from "./store-runtimechecks.module";
import { NgModule } from '@angular/core';
import { reducers } from "@/app/common/store/reducers/app.reducers";
import { metaReducers } from "@/app/common/store/reducers/app-meta.reducers";

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: storeRuntimeChecksModule,
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
    storeDevToolsModule,
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    })
  ],
  exports: []
})
export class NgrxStoreModule { }
