export interface ExporterValue {
    name: string;
    value: string;
    compiledValue: string;
  }
  
  export interface ExporterVariable {
    name: string;
    value: string;
    compiledValue?: string;
    mapValue?: ExporterValue[];
  }
  