import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment as defaultEnvironment } from '@/environments/environment';
import { setEnv } from '@app/services/config.service';

if (defaultEnvironment.production) {
  enableProdMode();
}

const currentEnv = {
  ...defaultEnvironment,
  loggerConfig: { ...defaultEnvironment.loggerConfig }
};
setEnv(currentEnv);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
