import {
  leftPanelApartment,
  leftPanelCalculate,
  leftPanelOptions,
} from '@shared/types/left-panel';

export const LEFT_MENU_STATE_KEY = 'leftMenuState';

export interface LeftMenuStateModel {
  options: leftPanelOptions | null;
  apartment: leftPanelApartment | null;
  calculate: leftPanelCalculate | null;
}

export const initialLeftMenuStore: LeftMenuStateModel = {
  options: null,
  apartment: null,
  calculate: null,
};
