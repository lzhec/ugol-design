import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appLazyError]',
})
export class LazyErrorDirective {
  constructor(public template: TemplateRef<any>) {}
}
