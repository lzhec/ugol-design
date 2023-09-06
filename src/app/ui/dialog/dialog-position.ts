import { DialogPosition } from '@angular/material/dialog';
import {
  getElementRect,
  rectInsideViewPort,
} from '@shared/helpers/coordinate.helper';
import { Rect } from '@shared/types/rect';

export interface AppDialogOptions {
  dialogWidth: number;
  dialogHeight: number;
}

export function getDialogPosition(
  clickedElement: HTMLElement,
  positionType: 'right' | 'left',
  options?: AppDialogOptions
): DialogPosition {
  const elementRect = getElementRect(clickedElement);

  const position: DialogPosition = {};

  switch (positionType) {
    case 'right': {
      if (options && options.dialogWidth && options.dialogHeight) {
        const tryBottomRect = {} as Rect;

        tryBottomRect.left = elementRect.right - options.dialogWidth;
        tryBottomRect.right = elementRect.right;
        tryBottomRect.top = elementRect.bottom;
        tryBottomRect.bottom = elementRect.bottom + options.dialogHeight;

        if (rectInsideViewPort(tryBottomRect)) {
          position.top = `${elementRect.bottom}px`;
          position.right = `${window.innerWidth - elementRect.right}px`;
          break;
        }

        const tryTopRect = {} as Rect;

        tryTopRect.left = elementRect.right - options.dialogWidth;
        tryTopRect.right = elementRect.right;
        tryTopRect.top = elementRect.top - options.dialogHeight;
        tryTopRect.bottom = elementRect.top;

        if (rectInsideViewPort(tryTopRect)) {
          position.top = `${tryTopRect.top}px`;
          position.right = `${window.innerWidth - elementRect.right}px`;
          break;
        }
      } else {
        position.top = `${elementRect.bottom}px`;
        position.right = `${window.innerWidth - elementRect.right}px`;
      }

      break;
    }

    case 'left': {
      if (options && options.dialogWidth && options.dialogHeight) {
        const tryBottomRect = {} as Rect;

        tryBottomRect.left = elementRect.left;
        tryBottomRect.right = elementRect.left + options.dialogWidth;
        tryBottomRect.top = elementRect.bottom;
        tryBottomRect.bottom = elementRect.bottom + options.dialogHeight;

        if (rectInsideViewPort(tryBottomRect)) {
          position.top = `${elementRect.bottom}px`;
          position.left = `${elementRect.left}px`;
          break;
        }

        const tryTopRect = {} as Rect;

        tryTopRect.left = elementRect.left;
        tryTopRect.right = elementRect.left + options.dialogWidth;
        tryTopRect.top = elementRect.top - options.dialogHeight;
        tryTopRect.bottom = elementRect.top;

        if (rectInsideViewPort(tryTopRect)) {
          position.top = `${tryTopRect.top}px`;
          position.left = `${elementRect.left}px`;
          break;
        }
      } else {
        position.top = `${elementRect.bottom}px`;
        position.left = `${elementRect.left}px`;
      }
      break;
    }
  }

  return position;
}

