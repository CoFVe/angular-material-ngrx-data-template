import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const storeDevToolsModule = [
    StoreDevtoolsModule.instrument({
        maxAge: 25
    })
];
