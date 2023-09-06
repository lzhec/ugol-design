import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-button, button[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-button',
  },
})
export class ButtonComponent {
  @Input()
  @HostBinding('attr.disabled')
  public disabled: boolean = false;

  @Input()
  public type:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'success-blue'
    | 'warning' = 'primary';

  @HostBinding('class')
  public get _classModifiers(): { [className: string]: boolean } {
    return {
      ...this.typeModifier,
      ...this.sizeModifier,
    };
  }

  constructor(
    @Attribute('size') public size: 'default' | 'large',

    public el: ElementRef<HTMLElement>
  ) {
    this.size = this.size || 'default';
  }

  private get typeModifier(): { [className: string]: boolean } {
    let modifier = null;

    switch (this.type) {
      case 'primary':
        modifier = 'app-button--primary';
        break;

      case 'secondary':
        modifier = 'app-button--secondary';
        break;

      case 'danger':
        modifier = 'app-button--danger';
        break;

      case 'success':
        modifier = 'app-button--success';
        break;

      case 'success-blue':
        modifier = 'app-button--success-blue';
        break;

      case 'warning':
        modifier = 'app-button--warning';
        break;
    }

    return { [modifier]: true };
  }

  private get sizeModifier(): { [className: string]: boolean } {
    let modifier = null;
    switch (this.size) {
      case 'default':
        modifier = 'app-button--default';
        break;

      case 'large':
        modifier = 'app-button--large';
        break;
    }

    return { [modifier]: true };
  }
}

