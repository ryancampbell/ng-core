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

export function bizModule(metadata: BizModuleMetadata): BizModuleMetadata {
  let isRoot: boolean = metadata.path === '';
  let routes: Routes = [];
  let routingProviders: any[] = metadata.resolve ? Object.keys(metadata.resolve).map((k) => { return metadata.resolve[k] }) : [];

  if (metadata.outlets) {
    routes.concat(metadata.outlets.map((outlet: any) => {
      console.log('outlet');
      console.log(outlet);

      return buildRoute(_.assign(_.clone(metadata), { 
        outlet: "" // TODO: Get outlet name
      }));
    }));
  } else {
    routes.push(buildRoute(metadata));
  }

  let routing: ModuleWithProviders = isRoot ? RouterModule.forRoot(routes) : RouterModule.forChild(routes);

  metadata.imports = (metadata.imports || []).concat([routing]).concat(defaultImports);
  metadata.declarations = (metadata.declarations || []).concat([metadata.component]);
  metadata.exports = (metadata.exports || []).concat([metadata.component]);
  metadata.providers = (metadata.providers || []).concat([routingProviders]);

  return metadata;
  /*return function(moduleClass) {
    return NgModule(metadata)(moduleClass);
  }*/
}

export function buildRoute(route: Route): Route {
  let newRoute: Route = _.pick(route, [
    'path',
    'pathMatch',
    'component',
    'redirectTo',
    'outlet',
    'canActivate',
    'canActivateChild',
    'canDeactivate',
    'canLoad',
    'data',
    'resolve',
    'children',
    'loadChildren'
  ]);

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

export function BizOutlet(metadata: BizOutletMetadata): Function {
  return function (componentClass) {
    return Component(metadata.component)(componentClass);
  }
}

export interface BizOutletMetadata {
  name: string,
  component: Component
}

export interface BizModuleMetadata extends NgModule, Route {
  outlets?: any[];
}

export interface BizViewMetadata extends BizResolvesMetadata {

}

export interface BizContainerMetadata extends BizResolvesMetadata {

}

export interface BizComponentMetadata {

}

export interface BizModalMetadata extends BizModuleMetadata {

}

export interface BizScaffoldMetadata extends BizModuleMetadata {
  outlets: any[];
}

export interface BizResolvesMetadata {
  resolve: any;
}