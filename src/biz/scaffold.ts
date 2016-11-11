import { BizNgModule } from './ng-module';

export abstract class BizScaffold<C> {

  // ========================================
  // constructor
  // ========================================

  public constructor(public config?: C) {}

  // ========================================
  // public methods
  // ========================================

  public abstract build(bizNgModule: BizNgModule): void;
}