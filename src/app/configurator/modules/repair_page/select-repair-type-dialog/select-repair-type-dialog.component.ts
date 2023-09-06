import { Component } from '@angular/core';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-select-repair-type-dialog',
  templateUrl: 'select-repair-type-dialog.component.html',
  styleUrls: ['./select-repair-type-dialog.component.scss'],
  standalone: true,
})
export class SelectRepairTypeDialog {
  constructor() {}
}
