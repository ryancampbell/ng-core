import { NgModule } from '@angular/core';

import { BizClient } from './client';
import { BizConfig } from './config';
import { BizNgModule } from './ng-module';
import { BizScaffold } from './scaffold';

export {
  BizClient,
  BizConfig,
  BizNgModule,
  BizScaffold
};

export class Biz {
  public ngModule(ngModule?: NgModule): BizNgModule {
    return new BizNgModule(ngModule);
  }

  public client(config?: BizConfig): BizClient {
    return new BizClient(config);
  }
}

export const biz: Biz = new Biz();