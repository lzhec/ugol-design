import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-dialog-subheader',
  templateUrl: './dialog-subheader.component.html',
  styleUrls: ['./dialog-subheader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-dialog-subheader',
  },
})
export class DialogSubHeaderComponent {
  constructor() {}
}
