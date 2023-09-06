import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from './let.directive';
import { VarDirective } from './var.directive';
import { ResizeObserverDirective } from './resize-observer.directive';

@NgModule({
  declarations: [LetDirective, VarDirective, ResizeObserverDirective],
  exports: [LetDirective, VarDirective, ResizeObserverDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
