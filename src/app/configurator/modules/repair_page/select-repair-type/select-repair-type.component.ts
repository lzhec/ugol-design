import { Input, Output, Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-repair-type',
  templateUrl: './select-repair-type.component.html',
  styleUrls: ['./select-repair-type.component.scss'],
})
export class SelectRepairTypeComponent {
  public selectStatus: boolean = false;

  @Input() caption: string = '';
  @Input() typeAction: number = 0;
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  select() {
    this.selectStatus = !this.selectStatus;
    this.dataChanged.emit({
      msg: 'Message from ChildExample',
      typeAction: this.typeAction,
    });
  }
}
