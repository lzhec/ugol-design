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

interface FontData {
  paramName: string;
  paramValue: string;
}

interface Variable {
  type: 'variable' | 'map';
  name?: string;
  value?: string;
  mapName?: string;
  mapValues?: FontData[];
}

interface FontsSchematicOptions {
  project: string;
  name: string;
  outPath: string;
}

export function generateFonts(options: FontsSchematicOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularConfig = tree.read('angular.json');

    if (!angularConfig) {
      throw new SchematicsException('angular.json not found');
    }

    const variables: Variable[] = [];

    const exporterOptions = {
      inputFiles: ['./src/styles/typography/_font-variables.scss'],
      includePaths: ['./src/styles/typography'],
    };

    const asObject = exporter(exporterOptions).getStructured();

    (asObject.variables as ExporterVariable[]).forEach((variable) => {
      if (variable.name) {
        if (variable.mapValue) {
          variables.push({
            type: 'map',
            mapName: variable.name,
            mapValues: variable.mapValue.map((mapValue) => {
              const result: FontData = {
                paramName: mapValue.name,
                paramValue: mapValue.compiledValue,
              };

              return result;
            }),
          });
        } else {
          variables.push({
            type: 'variable',
            name: variable.name,
            value: variable.compiledValue,
          });
        }
      }
    });

    const outPath = `${options.outPath}/generated-${options.name}`;

    rimraf.sync(outPath);

    const source = apply(url('../../../schematics/fonts/templates'), [
      template({
        ...strings,
        name: options.name,
        variables,
      }),
      move(outPath),
    ]);

    return chain([mergeWith(source)])(tree, context);
  };
}
