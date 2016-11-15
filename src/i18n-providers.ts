import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import trans from './locale/messages.fr';

export async function getTranslationProviders(): Promise<any> {
  // Get the locale id from the global
  const locale = document['locale'] as string;
  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];
  // No locale or U.S. English: no translation providers
  if (!locale || locale === 'en-US') {
    return Promise.resolve(noProviders);
  }
  // Ex: 'locale/messages.fr.xlf`
  const translationFile = `./locale/messages.${locale}.ts`;

  return  [
      { provide: TRANSLATIONS, useValue: trans },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale }
    ]
}


