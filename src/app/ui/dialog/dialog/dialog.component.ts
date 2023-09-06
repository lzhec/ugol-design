import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  HostBinding,
  Optional,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dropDownAnimation } from '@shared/animations/animations';
import {
  DialogConfig,
  DialogData,
  DIALOG_CONFIG,
  DIALOG_DATA,
} from '../dialog.types';
import { BaseObject } from '@shared/base/base-object';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [dropDownAnimation],
  host: {
    class: 'app-dialog',
  },
})
export class DialogComponent extends BaseObject {
  @Input() public set showLoader(value: boolean) {
    this._showLoader$.next(value);
  }

  @HostBinding('style.height')
  public get height(): string {
    return this.dialogConfig?.height;
  }

  @HostBinding('style.min-height')
  public get minHeight(): string {
    return this.dialogConfig?.minHeight;
  }

  @HostBinding('style.max-height')
  public get maxHeight(): string {
    return this.dialogConfig?.maxHeight
      ? `calc(${this.dialogConfig.maxHeight} - 2px)`
      : null;
  }

  public _showLoader$ = new BehaviorSubject<boolean>(false);
  public _bodyHasScroll: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    @Inject(DIALOG_DATA)
    public dialogData: DialogData,
    @Optional()
    @Inject(DIALOG_CONFIG)
    public dialogConfig?: DialogConfig
  ) {
    super();
  }

  public _onHeightChange(el: HTMLElement): void {
    this._bodyHasScroll =
      el.parentElement.scrollHeight !== el.parentElement.clientHeight;
    this.cd.detectChanges();
  }
}
