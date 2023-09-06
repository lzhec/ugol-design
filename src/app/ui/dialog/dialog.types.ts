import { InjectionToken } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { EMPTY, Observable, Subject } from 'rxjs';

export const DIALOG_DATA = new InjectionToken<DialogData>('DIALOG_DATA');
export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('DIALOG_CONFIG');

export class DialogData<D = any, R = any> {
  public data: D;
  public close: (result?: R) => void;
  public beforeClosed$: Observable<void> = EMPTY;

  constructor(data: D) {
    this.data = data;
    this.close = () => {};
  }
}

export interface DialogResult<R = any> {
  opened$: Subject<void>;
  closed$: Subject<R>;
}

export interface DialogConfig
  extends Pick<
    MatDialogConfig,
    | 'width'
    | 'minWidth'
    | 'maxWidth'
    | 'height'
    | 'minHeight'
    | 'maxHeight'
    | 'panelClass'
    | 'backdropClass'
    | 'autoFocus'
    | 'position'
    | 'disableClose'
    | 'scrollStrategy'
  > {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}

