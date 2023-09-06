import { Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { LazyComponent } from '../core/core.types';
import { DialogOutletComponent, DialogOutletData } from './dialog-outlet/dialog-outlet.component';
import { DialogConfig, DialogResult } from './dialog.types';
import {
  LazyDialogOutletComponent,
  LazyDialogOutletData,
} from './lazy-dialog-outlet/lazy-dialog-outlet.component';
import { AppScrollStrategy } from '@shared/config/scroll-strategy';

export const RIGHT_SIDE_DIALOG_CONFIG: DialogConfig = {
  width: '930px',
  maxWidth: '100vw',
  height: '100vh',
  position: {
    top: '0',
    right: '0',
    bottom: '0',
  },
  autoFocus: false,
  panelClass: 'app-right-side-dialog',
  backdropClass: 'app-dialog-backdrop',
};

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly rightSideDialogConfig: DialogConfig = RIGHT_SIDE_DIALOG_CONFIG;

  constructor(private dialog: MatDialog) {}

  public open<D = any, R = any>(
    dialogComponent: Type<any>,
    data?: D,
    dialogConfig?: DialogConfig,
    viewContainerRef?: ViewContainerRef,
    injector?: Injector,
  ): DialogResult<R> {
    const opened$ = new Subject<void>();
    const closed$ = new Subject<R>();

    const setDialogConfig: DialogConfig = dialogConfig ? dialogConfig : this.rightSideDialogConfig;

    const dialog = this.dialog.open<DialogOutletComponent, DialogOutletData, R>(
      DialogOutletComponent,
      {
        ...setDialogConfig,
        closeOnNavigation: true,
        scrollStrategy: new AppScrollStrategy(),
        viewContainerRef,
        injector,
        data: {
          component: dialogComponent,
          data,
          dialogConfig: setDialogConfig,
          injector: injector,
        },
      },
    );

    dialog.afterOpened().subscribe(() => {
      opened$.next();
      opened$.complete();
    });
    dialog.afterClosed().subscribe((result) => {
      closed$.next(result);
      closed$.complete();
    });

    return { closed$, opened$ };
  }

  public openLazy<D = any, R = any>(
    lazyDialogComponent: LazyComponent,
    data?: D,
    dialogConfig?: DialogConfig,
    viewContainerRef?: ViewContainerRef,
  ): DialogResult<R> {
    const opened$ = new Subject<void>();
    const closed$ = new Subject<R>();

    const setDialogConfig: DialogConfig = dialogConfig ? dialogConfig : this.rightSideDialogConfig;

    const dialog = this.dialog.open<LazyDialogOutletComponent, LazyDialogOutletData, R>(
      LazyDialogOutletComponent,
      {
        ...setDialogConfig,
        closeOnNavigation: true,
        scrollStrategy: new AppScrollStrategy(),
        viewContainerRef,
        data: {
          lazyComponent: lazyDialogComponent,
          data,
          dialogConfig: setDialogConfig,
        },
      },
    );

    dialog.afterOpened().subscribe(() => {
      opened$.next();
      opened$.complete();
    });
    dialog.afterClosed().subscribe((result) => {
      closed$.next(result);
      closed$.complete();
    });

    return { closed$, opened$ };
  }
}
