import { BizNgModule } from './ng-module';

export class BizScaffold<C> {

  // ========================================
  // constructor
  // ========================================

  public constructor(public config?: C) {}

  // ========================================
  // public methods
  // ========================================

  public build(bizNgModule: BizNgModule): void {}
}