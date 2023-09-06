import {
  ComponentRef,
  Directive,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { BaseObject } from '@shared/base/base-object';
import {
  createDynamicComponent,
  removeDynamicComponent,
} from '../dynamic-load';

@Directive({
  selector: '[appOutlet]',
})
export class OutletDirective extends BaseObject {
  private componentInstance: any = null;
  private componentRef: ComponentRef<any> = null;

  public get component(): any {
    return this.componentInstance;
  }

  public get nativeElement(): HTMLElement {
    return this.componentRef?.location?.nativeElement as HTMLElement;
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {
    super();

    this.destroy$.subscribe(() => this.removeComponent());
  }

  public createComponent(
    componentType: Type<any>,
    injector?: Injector,
    detectChanges: boolean = true
  ): void {
    if (!componentType) {
      throw new Error('componentType не должна быть пустой.');
    }

    this.componentRef = createDynamicComponent(
      componentType,
      this.viewContainerRef,
      null,
      injector || this.injector,
      detectChanges
    );

    this.componentInstance = this.componentRef.instance;
  }

  public removeComponent(): void {
    if (this.componentRef) {
      removeDynamicComponent(this.componentRef, this.viewContainerRef);
      this.componentRef = null;
    }
  }

  public detectChanges(): void {
    this.componentRef?.changeDetectorRef?.detectChanges();
  }
}
