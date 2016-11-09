import { Component, ComponentFactory, ComponentRef, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import { Router, ActivatedRouteSnapshot, UrlSegment, RouterState, NavigationEnd } from '@angular/router';

@Component({
  selector: 'biz-container',
  template: '<div #dynamicTarget></div>'
})
export class BizContainerComponent {

  @Input()
  public name: string;

  @ViewChild('dynamicTarget', { read: ViewContainerRef })
  private dynamicTarget: any;

  private componentFactory: ComponentFactory<any>;

  private componentReference: ComponentRef<any>;

  public constructor(private resolver: ComponentFactoryResolver, private router: Router) {}

  public ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.destroyComponent();

        let container: any = this.findContainer(this.router.routerState.snapshot.root);

        if (container) {
          this.componentFactory = this.resolver.resolveComponentFactory(container);
          this.createComponent();
        }
      }
    });
  }

  private findContainer(snapshot: ActivatedRouteSnapshot): any {
    for (let i = 0; i < snapshot.children.length; i++) {
      let childContainer = this.findContainer(snapshot.children[i]);

      if (childContainer) {
        return childContainer;
      }
    }

    if (snapshot.data['bizContainers'] && snapshot.data['bizContainers'][this.name]) {
      return snapshot.data['bizContainers'][this.name];
    }

    return null;
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private resetComponent(): void {
    this.destroyComponent();
    this.createComponent();
  }

  private createComponent(): void {
    if (this.componentFactory) {
      this.componentReference = this.dynamicTarget.createComponent(this.componentFactory);;
    }
  }

  private destroyComponent(): void {
    if (this.componentReference) {
      this.componentReference.destroy();
      this.componentReference = null;
    }
  }
}