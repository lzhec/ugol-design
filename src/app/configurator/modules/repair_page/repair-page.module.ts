import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RepairPageComponent } from './repair-page.component';
import { SelectRepairTypeComponent } from './select-repair-type/select-repair-type.component';
import { SelectRepairTypeDialog } from './select-repair-type-dialog/select-repair-type-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: RepairPageComponent,
  },
];
@NgModule({
  declarations: [RepairPageComponent, SelectRepairTypeComponent],
  imports: [
    SelectRepairTypeDialog,
    CommonModule,
    RouterModule.forChild(routes),
    DialogModule,
    FormsModule,
    MatButtonModule,
    OverlayPanelModule,
    ReactiveFormsModule,
  ],
})
export class RepairPageModule {}
