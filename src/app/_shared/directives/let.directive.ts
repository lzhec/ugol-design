import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
  ngLet: T;
}

@Directive({
  selector: '[ngLet]',
})
export class LetDirective<T> {
  private context: LetContext<T> = { ngLet: null };

  @Input()
  public set ngLet(value: T) {
    this.context.ngLet = value;
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<LetContext<T>>
  ) {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  static ngTemplateContextGuard<T>(
    dir: LetDirective<T>,
    ctx: unknown
  ): ctx is LetContext<T> {
    return true;
  }
}
