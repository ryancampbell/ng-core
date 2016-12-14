import { NgModule } from '@angular/core';

import { BizConfig } from './config';
import { BizNgModule } from './ng-module';
import { BizFraming } from './framing';

export {
  BizConfig,
  BizNgModule,
  BizFraming
};

export class Biz {
  static ngModule(ngModule?: NgModule): BizNgModule {
    return new BizNgModule(ngModule);
  }
}

export const biz = Biz;