import { LEFT_MENU_STATE_KEY } from './left-menu.model';
import { leftPanelData } from '@shared/types/left-panel';

export class LoadLeftMenuData {
  static readonly type = `[${LEFT_MENU_STATE_KEY}]  load`;
}

export class LoadLeftMenuDataSuccess {
  static readonly type = `[${LEFT_MENU_STATE_KEY}]  load success`;
  constructor(public response: leftPanelData) {}
}

export class LoadLeftMenuDataError {
  static readonly type = `[${LEFT_MENU_STATE_KEY}]  load error`;
}
