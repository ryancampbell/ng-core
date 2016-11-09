import * as _ from 'lodash';

import 'angular2-universal-polyfills';

import { ModuleWithProviders, NgModuleFactory, NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { Route, Routes, RouterModule, Resolve, ResolveData, Data, LoadChildren } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { UniversalModule } from 'angular2-universal';

import { BizContainerComponent } from './components/biz-container.component';

import { BizScaffold } from './scaffold';

const defaultImports: any[] = [
  UniversalModule,
  FormsModule,
  RouterModule,
  MaterialModule.forRoot()
];

const defaultDeclarations: any[] = [
  BizContainerComponent
];

const defaultExports: any[] = [
  BizContainerComponent
];

const defaultProviders: any[] = [

];

/**
 * 
 */
export class BizNgModule {

  // ========================================
  // private properties
  // ========================================

  private _component: any;

  private _containers: any = {};

  private _data: any = {};

  private _ngModule: NgModule;

  private _root: boolean = false;

  private _route: Route;

  private _scaffold: BizScaffold<any>;

  // ========================================
  // constructor
  // ========================================

  public constructor(ngModule?: NgModule) {
    this.ngModule(ngModule);
  }

  // ========================================
  // public methods
  // ========================================

  public ngModule(ngModule?: NgModule): BizNgModule {
    this._ngModule = ngModule || {};

    return this;
  }

  public component(component: any): BizNgModule {
    this._component = component;

    return this;
  }

  public containers(containers: any): BizNgModule {
    _.assign(this._containers, containers);

    return this;
  }

  public data(data: any): BizNgModule {
    _.assign(this._data, data);

    return this;
  }

  public root(): BizNgModule {
    this._root = true;

    return this;
  }

  public route(route: Route): BizNgModule {
    this._route = route;

    return this;
  }

  public scaffold(scaffold: BizScaffold<any>): BizNgModule {
    this._scaffold = scaffold;

    return this;
  }

  public build(): NgModule {
    this.buildDefaults();
    this.buildScaffold();
    this.buildRoot();        
    this.buildContainers();
    this.buildComponent();
    this.buildRoute();

    console.log(this._ngModule);

    return this._ngModule;
  }

  // ========================================
  // private methods
  // ========================================

  private buildDefaults(): void {
    let m: NgModule = this._ngModule;

    this._data = this._data || {};
    m.imports = (m.imports || []).concat(defaultImports);
    m.declarations = m.declarations || [];
    m.exports = m.exports || [];
    m.providers = m.providers || [];
  }

  private buildRoot(): void {
    let m: NgModule = this._ngModule;

    if (this._root) {
      m.declarations = m.declarations.concat(defaultDeclarations);
      m.exports = m.exports.concat(defaultExports);
      m.providers = m.providers.concat(defaultProviders);

      if (this._component) {
        m.bootstrap = [this._component];
      }

      this._route = {
        path: '',
        pathMatch: 'full'
      };
    }
  }

  /**
   * 
   */
  private buildScaffold(): void {
    let m: NgModule = this._ngModule;

    if (this._scaffold) {
      this._scaffold.build(this);
    }
  }

  /**
   * 
   */
  private buildContainers(): void {
    let m: NgModule = this._ngModule;

    if (this._containers) {
      this._data['bizContainers'] = this._containers;

      let containerComponents = Object.keys(this._containers).map((key: any) => {
        return this._containers[key];
      });

      m.exports = (m.exports || []).concat(containerComponents);
      m.declarations = (m.declarations || []).concat(containerComponents);
    }
  }

  /**
   * 
   */
  private buildRoute(): void {
    let m: NgModule = this._ngModule;
    let r: Route = this._route;

    if (r) {
      let newRoute: Route = {
        data: {}
      };
      
      if (r.path || r.path == "") newRoute.path = r.path;
      if (r.pathMatch) newRoute.pathMatch = r.pathMatch;
      if (r.component) newRoute.component = r.component;
      if (r.outlet) newRoute.outlet = r.outlet;
      if (r.canActivate) newRoute.canActivate = r.canActivate;
      if (r.canActivateChild) newRoute.canActivateChild = r.canActivateChild;
      if (r.canDeactivate) newRoute.canDeactivate = r.canDeactivate;
      if (r.canLoad) newRoute.canLoad = r.canLoad;
      if (r.data) _.assign(newRoute.data, r.data);
      if (this._data) _.assign(newRoute.data, this._data);
      if (r.resolve) newRoute.resolve = r.resolve;
      if (r.children) newRoute.children = r.children;
      if (r.loadChildren) newRoute.loadChildren = r.loadChildren;
      if (r.redirectTo) newRoute.redirectTo = r.redirectTo;

      if (newRoute.outlet) {
        delete newRoute['redirectTo'];
      }

      if (newRoute.redirectTo) {
        delete newRoute['component'];
      }

      let routes: Routes = [newRoute];
      let routingProviders: any[] = newRoute.resolve ? Object.keys(newRoute.resolve).map((k) => {
        return newRoute.resolve[k]
      }) : [];
      let routing: ModuleWithProviders = this._root ? RouterModule.forRoot(routes) : RouterModule.forChild(routes);

      m.imports = m.imports.concat([routing]);
      m.providers = m.providers.concat([routingProviders]);
    }
  }

  /**
   * 
   */
  private buildComponent(): void {
    let m: NgModule = this._ngModule;

    if (this._component) {
      m.declarations = m.declarations.concat([this._component]);
      m.exports = m.exports.concat([this._component]);

      if (this._route) {
        this._route.component = this._component;
      }
    }
  }
}