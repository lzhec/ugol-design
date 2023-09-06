import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyOutletComponent } from './lazy-outlet/lazy-outlet.component';
import { OutletDirective } from './outlet/outlet.directive';
import { LazyProgressDirective } from './lazy-progress/lazy-progress.directive';
import { LazyErrorDirective } from './lazy-error/lazy-error.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LazyOutletComponent,
    OutletDirective,
    LazyProgressDirective,
    LazyErrorDirective,
  ],
  exports: [
    LazyOutletComponent,
    OutletDirective,
    LazyProgressDirective,
    LazyErrorDirective,
  ],
})
export class CoreModule {}
