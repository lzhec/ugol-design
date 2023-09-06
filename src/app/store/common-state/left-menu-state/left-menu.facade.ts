import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Selector, Store } from '@ngxs/store';
import * as stateAction from './left-menu.action';
import { LeftMenuState } from './left-menu.state';
import { LeftMenuStateModel } from './left-menu.model';

@Injectable()
export class LeftMenuFacade {
  @Select(LeftMenuState.getLefPanelInfo)
  public leftPanelInfo$: Observable<LeftMenuStateModel>;
  constructor(private store: Store) {}

  public loadLeftPanelInfo() {
    this.store.dispatch(new stateAction.LoadLeftMenuData());
  }
}
