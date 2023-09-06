import { Component, ChangeDetectionStrategy, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, takeUntil } from 'rxjs/operators';
import { BaseObject } from '@shared/base/base-object';
import { LazyComponent } from '@modules/core/core.types';
import {
  DialogConfig,
  DialogData,
  DIALOG_CONFIG,
  DIALOG_DATA,
} from '../dialog.types';

export interface LazyDialogOutletData {
  lazyComponent: LazyComponent;
  data: any;
  dialogConfig: DialogConfig;
}

@Component({
  selector: 'app-lazy-dialog-outlet',
  templateUrl: './lazy-dialog-outlet.component.html',
  styleUrls: ['./lazy-dialog-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyDialogOutletComponent extends BaseObject {
  public lazyComponent: LazyComponent;
  private dialogData: DialogData;

  constructor(
    private injector: Injector,
    private readonly dialogRef: MatDialogRef<LazyDialogOutletComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly dialogOutletData: LazyDialogOutletData,
  ) {
    super();

    this.dialogData = new DialogData(this.dialogOutletData.data);
    this.dialogData.close = (result) => this.dialogRef.close(result);
    this.dialogData.beforeClosed$ = this.dialogRef.beforeClosed().pipe(
      map(() => null),
      takeUntil(this.destroy$),
    );

    this.lazyComponent = {
      ...this.dialogOutletData.lazyComponent,
      injector: Injector.create({
        parent: this.dialogOutletData.lazyComponent.injector || this.injector,
        providers: [
          {
            provide: DIALOG_DATA,
            useValue: this.dialogData,
          },
          {
            provide: DIALOG_CONFIG,
            useValue: this.dialogOutletData.dialogConfig,
          },
        ],
      }),
    };
  }
}
