import * as _ from 'lodash';

import { ModuleWithProviders, NgModuleFactory, NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { Route, Routes, RouterModule, Resolve, ResolveData, Data, LoadChildren } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { MdButtonModule } from '@angular2-material/button';
import { MdButtonToggleModule } from '@angular2-material/button-toggle';
import { MdCardModule } from '@angular2-material/card';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdCoreModule } from '@angular2-material/core';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdMenuModule } from '@angular2-material/menu';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdRadioModule } from '@angular2-material/radio';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdSliderModule } from '@angular2-material/slider';
import { MdSlideToggleModule } from '@angular2-material/slide-toggle';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdTooltipModule } from '@angular2-material/tooltip';

import { BizContainerComponent } from './shared/biz-container.component';

const defaultImports: any[] = [
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule,
  
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdCoreModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressCircleModule,
  MdRadioModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
];

const defaultDeclarations: any[] = [
  BizContainerComponent
];

const defaultExports: any[] = [
  BizContainerComponent
];

const defaultProviders: any[] = [

];

export function bizModule(metadata: BizModuleMetadata): BizModuleMetadata {
  if (metadata.scaffold) {
    if (!metadata.path) { metadata.path = metadata.scaffold.path; }
  }
  
  let isRoot: boolean = metadata.path == '' || !metadata.path;
  
  metadata.data = metadata.data || {};
  metadata.imports = (metadata.imports || []).concat(defaultImports);
  metadata.declarations = metadata.declarations || [];
  metadata.exports = metadata.exports || [];
  metadata.providers = metadata.providers || [];

  if (isRoot) {
    metadata.declarations = metadata.declarations.concat(defaultDeclarations);
    metadata.exports = metadata.exports.concat(defaultExports);
    metadata.providers = metadata.providers.concat(defaultProviders);
  }

  if (metadata.scaffold) {
    if (!metadata.bootstrap) { metadata.bootstrap = metadata.scaffold.bootstrap; }
    if (!metadata.component) { metadata.component = metadata.scaffold.component; }
    if (!metadata.pathMatch) { metadata.pathMatch = metadata.scaffold.pathMatch; }
    if (!metadata.redirectTo) { metadata.redirectTo = metadata.scaffold.redirectTo; }
    if (!metadata.containers) { metadata.containers = metadata.scaffold.containers; }

    metadata.imports = metadata.imports.concat(metadata.scaffold.imports || []);
    metadata.declarations = metadata.declarations.concat(metadata.scaffold.declarations || []);
    metadata.exports = metadata.exports.concat(metadata.scaffold.exports || []);
    metadata.providers = metadata.providers.concat(metadata.scaffold.providers || []);
  }

  let routes: Routes = [buildRoute(metadata)];
  let routingProviders: any[] = metadata.resolve ? Object.keys(metadata.resolve).map((k) => { return metadata.resolve[k] }) : [];

  if (metadata.containers) {
    metadata.data['bizContainers'] = metadata.containers;

    let containerComponents = Object.keys(metadata.containers).map((key: any) => { return metadata.containers[key]; });

    metadata.exports = (metadata.exports || []).concat(containerComponents);
    metadata.declarations = (metadata.declarations || []).concat(containerComponents);
  }

  let routing: ModuleWithProviders = isRoot ? RouterModule.forRoot(routes) : RouterModule.forChild(routes);

  metadata.imports = metadata.imports.concat([routing]);
  metadata.providers = metadata.providers.concat([routingProviders]);

  if (metadata.component) {
    metadata.declarations = metadata.declarations.concat([metadata.component]);
    metadata.exports = metadata.exports.concat([metadata.component]);
  }

  return metadata;
}

export function buildRoute(route: Route): Route {
  let newRoute: Route = {};
  
  if (route.path || route.path == "") newRoute.path = route.path;
  if (route.pathMatch) newRoute.pathMatch = route.pathMatch;
  if (route.component) newRoute.component = route.component;
  if (route.outlet) newRoute.outlet = route.outlet;
  if (route.canActivate) newRoute.canActivate = route.canActivate;
  if (route.canActivateChild) newRoute.canActivateChild = route.canActivateChild;
  if (route.canDeactivate) newRoute.canDeactivate = route.canDeactivate;
  if (route.canLoad) newRoute.canLoad = route.canLoad;
  if (route.data) newRoute.data = route.data;
  if (route.resolve) newRoute.resolve = route.resolve;
  if (route.children) newRoute.children = route.children;
  if (route.loadChildren) newRoute.loadChildren = route.loadChildren;
  if (route.redirectTo) newRoute.redirectTo = route.redirectTo;

  if (newRoute.outlet) {
    delete newRoute['redirectTo'];
  }

  if (newRoute.redirectTo) {
    delete newRoute['component'];
  }

  return newRoute;
}

export function BizScaffold(metadata: BizScaffoldMetadata): Function {
  return function(moduleClass) {
    return NgModule(metadata)(moduleClass);
  }
}

export interface BizModuleMetadata extends NgModule, Route {
  scaffold?: BizScaffoldMetadata;
  containers?: any;
}

export interface BizViewMetadata extends BizResolvesMetadata {

}

export interface BizContainerMetadata extends BizResolvesMetadata {

}

export interface BizComponentMetadata {

}

export interface BizModalMetadata extends BizModuleMetadata {

}

export interface BizScaffoldMetadata extends NgModule, Route {
  containers?: any;
}

export interface BizResolvesMetadata {
  resolve: any;
}