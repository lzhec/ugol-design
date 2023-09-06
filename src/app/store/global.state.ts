import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import {
  LEFT_MENU_STATE_KEY,
  LeftMenuStateModel,
} from './common-state/left-menu-state/left-menu.model';
import { LeftMenuState } from './common-state/left-menu-state/left-menu.state';

export interface CommonModel {
  [LEFT_MENU_STATE_KEY]: LeftMenuStateModel;
}

export const COMMON_STATE_FEATURE_KEY = 'commonState';

@State<CommonModel>({
  name: COMMON_STATE_FEATURE_KEY,
  children: [LeftMenuState],
})
@Injectable()
export class CommonState {}
