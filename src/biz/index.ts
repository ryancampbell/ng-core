import { NgModule } from '@angular/core';

import { BizConfig } from './config';
import { BizNgModule } from './ng-module';
import { BizScaffold } from './scaffold';

export {
  BizConfig,
  BizNgModule,
  BizScaffold
};

export class Biz {
  public ngModule(ngModule?: NgModule): BizNgModule {
    return new BizNgModule(ngModule);
  }
}

export const biz: Biz = new Biz();