import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'app-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-dialog-footer app-bg-block-main',
  },
})
export class DialogFooterComponent {
  @Input()
  @HostBinding('style.height')
  @HostBinding('style.min-height')
  public height: string;

  constructor() {}
}
