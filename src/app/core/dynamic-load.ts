import {
  Type,
  ViewContainerRef,
  ComponentRef,
  Injector,
  ɵcreateInjector as createInjector,
} from '@angular/core';
import { LazyBundle, LazyBundleData, LazyBundleFactory } from './core.types';

export function createDynamicComponent(
  componentType: Type<any>,
  host: ViewContainerRef,
  index?: number,
  injector?: Injector,
  detectChanges: boolean = true,
): ComponentRef<any> {
  const componentRef = host.createComponent(componentType, { index, injector });

  if (detectChanges) {
    componentRef.changeDetectorRef.detectChanges();
  }

  return componentRef;
}

export function removeDynamicComponent(
  componentRef: ComponentRef<any>,
  host: ViewContainerRef,
): void {
  const viewIndex = host.indexOf(componentRef.hostView);
  if (viewIndex !== -1) {
    host.remove(viewIndex);
    componentRef.changeDetectorRef.detach();
  } else {
    throw new Error('Представление не найдено в данном ViewContainerRef');
  }
}

export async function loadLazyComponent(
  bundleFactory: LazyBundleFactory,
  parentInjector: Injector,
): Promise<LazyBundleData> {
  const bundle: LazyBundle = await bundleFactory();

  const injector = createInjector(bundle.default.module, parentInjector);

  return Promise.resolve({
    component: bundle.default.component,
    injector,
  } as LazyBundleData);
}
