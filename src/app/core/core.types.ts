import { Injector, Type } from '@angular/core';

export type LazyBundleFactory<T = any> = () => T;

export interface LazyBundle {
  default: {
    module: any;
    component: Type<any>;
  };
}

export interface LazyBundleData {
  component: Type<any>;
  injector: Injector;
}

export interface LazyComponent {
  /** фабрика возвращает лэйзи бандл с компонентом и модулем */
  factory: LazyBundleFactory;

  /** инжектор с данными для компонента */
  injector?: Injector;
}
