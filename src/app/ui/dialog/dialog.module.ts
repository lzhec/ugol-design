import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonsModule } from '@modules/button/button.module';
import { SvgModule } from '@modules/svg/svg.module';
import { DialogComponent } from '@modules/dialog/dialog/dialog.component';
import { DialogHeaderComponent } from '@modules/dialog/dialog-header/dialog-header.component';
import { DialogSubHeaderComponent } from '@modules/dialog/dialog-subheader/dialog-subheader.component';
import { DialogFooterComponent } from '@modules/dialog/dialog-footer/dialog-footer.component';
import { DialogOutletComponent } from '@modules/dialog/dialog-outlet/dialog-outlet.component';
import { LazyDialogOutletComponent } from '@modules/dialog/lazy-dialog-outlet/lazy-dialog-outlet.component';
import { DirectivesModule } from '@shared/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    SvgModule,
    MatDialogModule,
    ButtonsModule,
    DirectivesModule,
  ],
  declarations: [
    DialogComponent,
    DialogHeaderComponent,
    DialogSubHeaderComponent,
    DialogFooterComponent,
    DialogOutletComponent,
    LazyDialogOutletComponent,
  ],
  exports: [
    DialogComponent,
    DialogHeaderComponent,
    DialogSubHeaderComponent,
    DialogFooterComponent,
  ],
})
export class DialogModule {}

