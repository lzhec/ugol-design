import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MyFlatComponent } from './my-flat/my-flat.component';
import { SelectFlatModalComponent } from './select-flat-modal/select-flat-modal.component';

const routes: Routes = [
  {
    path: '',
    component: MyFlatComponent,
  },
];
@NgModule({
  declarations: [MyFlatComponent, SelectFlatModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    DialogModule,
    OverlayPanelModule,
    ReactiveFormsModule,
  ],
})
export class MyFlatPageModule {}
