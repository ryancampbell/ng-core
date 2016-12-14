import { BizNgModule } from './ng-module';

export class BizFraming<C> {

  // ========================================
  // constructor
  // ========================================

  public constructor(public config?: C) {}

  // ========================================
  // public methods
  // ========================================

  public build(bizNgModule: BizNgModule): void {}
}