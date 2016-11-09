import { BizNgModule } from './ng-module';

export abstract class BizScaffold<C> {
  //public moduleMetadata: BizModuleMetadata;

  //public scaffoldMetadata: BizModuleMetadata;

  public constructor(public metadataConfig?: C) {}

  /*public init(moduleMetadata: BizModuleMetadata):void {
    // Apply defaults from scaffold config to new scaffold instance config
    if (this.scaffoldMetadata.defaults) {
      _.defaults(this.moduleMetadata, _.cloneDeep(this.scaffoldMetadata.defaults));
    }
  }
  public preConfig(): void {}
  public postConfig(): void {}*/

  public build(bizNgModule: BizNgModule): void {

  }
}