import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Optional,
  Inject,
  HostBinding,
  Input,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseObject } from '@shared/base/base-object';
import { DialogOutletComponent } from '../dialog-outlet/dialog-outlet.component';
import {
  DialogConfig,
  DIALOG_CONFIG,
} from '../dialog.types';
import { DialogComponent } from '../dialog/dialog.component';
import { LazyDialogOutletComponent } from '../lazy-dialog-outlet/lazy-dialog-outlet.component';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-dialog-header app-bg-block-main',
  },
})
export class DialogHeaderComponent extends BaseObject {
  @Input()
  @HostBinding('style.height')
  @HostBinding('style.min-height')
  public height: string;

  constructor(
    @Optional()
    private dialogRef: MatDialogRef<
      DialogOutletComponent | LazyDialogOutletComponent
    >,
    @Optional()
    @Inject(DIALOG_CONFIG)
    public dialogConfig: DialogConfig,
    public dialog: DialogComponent,
  ) {
    super();
  }

  public _onCloseClick(): void {
    this.dialog.dialogData.close();
  }
}
