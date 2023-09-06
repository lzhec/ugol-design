export interface paramsForGettingApartments {
  roomsCntForFilter: number[];
  areaTotalFrom?: number;
  areaTotalTo?: number;
  panningIds?: string[];
}

export interface leftPanelOptions {
  repair_type: string;
  count_options: number;
}

export interface leftPanelApartment {
  jk_name: string;
  area_total: number;
  type_apart: string;
}

export interface leftPanelCalculate {
  total: number;
  works: number;
  materials: number;
  materialTotal: number;
  materialsFinishing: number;
}
export interface leftPanelData {
  options: leftPanelOptions;
  apartment: leftPanelApartment;
  calculate: leftPanelCalculate;
}
