import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  Injector,
  Type,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, takeUntil } from 'rxjs/operators';
import { BaseObject } from '@shared/base/base-object';
import { OutletDirective } from '@modules/core/outlet/outlet.directive';
import {
  DialogConfig,
  DialogData,
  DIALOG_CONFIG,
  DIALOG_DATA,
} from '../dialog.types';

export interface DialogOutletData {
  component: Type<any>;
  data: any;
  dialogConfig: DialogConfig;
  injector?: Injector;
}

@Component({
  selector: 'app-dialog-outlet',
  templateUrl: './dialog-outlet.component.html',
  styleUrls: ['./dialog-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogOutletComponent extends BaseObject implements OnInit {
  private dialogData: DialogData;

  @ViewChild(OutletDirective, { static: true }) private outlet: OutletDirective;

  constructor(
    private injector: Injector,
    private readonly dialogRef: MatDialogRef<DialogOutletComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly dialogOutletData: DialogOutletData
  ) {
    super();

    this.dialogData = new DialogData(this.dialogOutletData.data);
    this.dialogData.close = (result) => this.dialogRef.close(result);
    this.dialogData.beforeClosed$ = this.dialogRef.beforeClosed().pipe(
      map(() => null),
      takeUntil(this.destroy$)
    );
  }

  public ngOnInit(): void {
    this.outlet.removeComponent();

    this.outlet.createComponent(
      this.dialogOutletData.component,
      Injector.create({
        parent: this.dialogOutletData.injector || this.injector,
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
      })
    );
  }
}
