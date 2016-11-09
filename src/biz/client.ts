import { enableProdMode } from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal';

import { BizConfig } from './config';

export class BizClient {

  // ========================================
  // constructor
  // ========================================

  public constructor(private config: BizConfig) {}

  // ========================================
  // public methods
  // ========================================

  public bootstrap(appModule?: any): BizClient {
    if (!appModule) {
      appModule = this.config.apps['root'];
    }

    if (process.env.ENV === 'production') {
      enableProdMode();
    }

    const platformRef = platformUniversalDynamic();

    document.addEventListener('DOMContentLoaded', () => {
      platformRef.bootstrapModule(appModule);
    });

    return this;
  }
}