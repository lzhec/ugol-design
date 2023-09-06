import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appLazyProgress]',
})
export class LazyProgressDirective {
  constructor(public template: TemplateRef<any>) {}
}
