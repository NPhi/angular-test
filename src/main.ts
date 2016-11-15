import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode,TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import { getTranslationProviders } from './i18n-providers';

if (environment.production) {
  enableProdMode();
}

getTranslationProviders().then(providers => {
	const options = { providers };
	platformBrowserDynamic().bootstrapModule(AppModule,options);
});

