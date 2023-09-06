import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SvgComponent } from './svg.component';
import { SvgService } from './svg.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [SvgComponent],
  exports: [SvgComponent],
  providers: [SvgService],
})
export class SvgModule {}
