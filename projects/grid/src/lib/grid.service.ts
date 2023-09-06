import { Injectable } from '@angular/core';
import { TilePadding } from './grid.types';

@Injectable()
export class GridService {
  constructor() {}

  public toNumber(value: string): number {
    return value ? parseInt(value, 10) : null;
  }

  public toTilePadding(value: string): TilePadding {
    if (value) {
      const paddingParts = value.split(' ');

      switch (true) {
        case paddingParts.length === 1: {
          const padding = this.toNumber(value);

          return {
            top: padding,
            right: padding,
            bottom: padding,
            left: padding,
          };
        }

        case paddingParts.length === 2: {
          const paddingTopBottom = this.toNumber(paddingParts[0]);
          const paddingLeftRight = this.toNumber(paddingParts[1]);

          return {
            top: paddingTopBottom,
            right: paddingLeftRight,
            bottom: paddingTopBottom,
            left: paddingLeftRight,
          };
        }

        case paddingParts.length === 3: {
          const paddingTop = this.toNumber(paddingParts[0]);
          const paddingRight = this.toNumber(paddingParts[1]);
          const paddingBottom = this.toNumber(paddingParts[2]);

          return {
            top: paddingTop,
            right: paddingRight,
            bottom: paddingBottom,
            left: 0,
          };
        }

        case paddingParts.length === 4: {
          const paddingTop = this.toNumber(paddingParts[0]);
          const paddingRight = this.toNumber(paddingParts[1]);
          const paddingBottom = this.toNumber(paddingParts[2]);
          const paddingLeft = this.toNumber(paddingParts[3]);

          return {
            top: paddingTop,
            right: paddingRight,
            bottom: paddingBottom,
            left: paddingLeft,
          };
        }
      }
    }

    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
  }
}
