import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  initialLeftMenuStore,
  LEFT_MENU_STATE_KEY,
  LeftMenuStateModel,
} from './left-menu.model';
import * as stateAction from './left-menu.action';
import { ApiService } from '@api/api.service';

@State<LeftMenuStateModel>({
  name: LEFT_MENU_STATE_KEY,
  defaults: initialLeftMenuStore,
})
@Injectable()
export class LeftMenuState {
  constructor(private apiService: ApiService) {}
  @Selector()
  public static getLefPanelInfo(state: LeftMenuStateModel): LeftMenuStateModel {
    return state;
  }

  @Action(stateAction.LoadLeftMenuData)
  public loadLeftMenuData(ctx: StateContext<LeftMenuStateModel>) {
    return this.apiService.getLeftPanelData().pipe(
      tap((response) => {
        ctx.dispatch(new stateAction.LoadLeftMenuDataSuccess(response));
      })
    );
  }

  @Action(stateAction.LoadLeftMenuDataSuccess)
  public loadLeftMenuDataSuccess(
    ctx: StateContext<LeftMenuStateModel>,
    { response }: stateAction.LoadLeftMenuDataSuccess
  ): void {
    ctx.patchState({
      options: response.options,
      calculate: response.calculate,
      apartment: response.apartment,
    });
  }
}
