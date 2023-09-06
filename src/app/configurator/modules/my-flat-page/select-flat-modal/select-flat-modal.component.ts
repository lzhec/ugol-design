import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'configurator-select-flat-modal',
  templateUrl: './select-flat-modal.component.html',
  styleUrls: ['./select-flat-modal.component.scss'],
})
export class SelectFlatModalComponent {
  constructor(private dialogRef: MatDialogRef<any>) {}

  onClose() {
    this.dialogRef.close();
  }
}
