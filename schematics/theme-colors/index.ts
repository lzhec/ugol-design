import {
  Rule,
  SchematicContext,
  Tree,
  url,
  apply,
  template,
  mergeWith,
  move,
  chain,
  SchematicsException,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { ExporterVariable } from '../types/sass-export.types';
const rimraf = require('rimraf');
const exporter = require('sass-export').exporter;
import * as Color from 'color';

interface ColorData {
  type: 'color' | 'box-shadow' | 'none';
  rgba?: string;
  hex?: string;
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  boxShadowParams?: string[];
}

interface ColorsMapValue {
  name: string;
  value: ColorData;
}

interface ColorsMapVariable {
  mapName: string;
  mapValues: ColorsMapValue[];
}

interface ThemeColorsSchematicOptions {
  project: string;
  name: string;
  outPath: string;
}

export function generateThemeColors(
  options: ThemeColorsSchematicOptions
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularConfig = tree.read('angular.json');

    if (!angularConfig) {
      throw new SchematicsException('angular.json not found');
    }

    const colorsMaps: ColorsMapVariable[] = [];

    const exporterOptions = {
      inputFiles: [
        './src/styles/theming/palettes/_dark.scss',
        './src/styles/theming/palettes/_light.scss',
      ],
      includePaths: ['./src/styles'],
    };

    const asObject = exporter(exporterOptions).getStructured();

    const convertStringColorToColorData = (colorStr: string): ColorData => {
      const color = Color(colorStr);

      const value: ColorData = {
        type: 'color',
        rgba: `rgba(${color.red()}, ${color.green()}, ${color.blue()}, ${color.alpha()})`,
        hex: color.hex(),
        r: color.red(),
        g: color.green(),
        b: color.blue(),
        a: color.alpha(),
      };

      return value;
    };

    (asObject.variables as ExporterVariable[]).forEach((variable) => {
      if (variable.name && variable.mapValue) {
        colorsMaps.push({
          mapName: variable.name,
          mapValues: variable.mapValue.map((mapValue) => {
            if (
              mapValue.name.startsWith('box-shadow') &&
              !mapValue.name.includes('color')
            ) {
              const boxShadowValues = mapValue.compiledValue.split(' ');
              const boxShadowParams = boxShadowValues.splice(0, 3);
              const boxShadowColorStr = boxShadowValues.join(' ');

              const value: ColorData =
                convertStringColorToColorData(boxShadowColorStr);
              value.type = 'box-shadow';
              value.boxShadowParams = boxShadowParams;

              const result: ColorsMapValue = {
                name: mapValue.name,
                value,
              };

              return result;
            } else {
              const value: ColorData = convertStringColorToColorData(
                mapValue.compiledValue
              );

              const result: ColorsMapValue = {
                name: mapValue.name,
                value,
              };

              return result;
            }
          }),
        });
      }
    });

    const outPath = `${options.outPath}/generated-${options.name}`;

    rimraf.sync(outPath);

    const source = apply(url('../../../schematics/theme-colors/templates'), [
      template({
        ...strings,
        name: options.name,
        colorsMaps,
      }),
      move(outPath),
    ]);

    return chain([mergeWith(source)])(tree, context);
  };
}
