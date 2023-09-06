import { Coordinate } from '@shared/types/coordinate';
import { Rect } from '@shared/types/rect';

export function coordInsideRect(coord: Coordinate, rect: Rect): boolean {
  if (
    coord.x >= rect.left &&
    coord.x <= rect.right &&
    coord.y >= rect.top &&
    coord.y <= rect.bottom
  ) {
    return true;
  } else {
    return false;
  }
}

export function rectInsideViewPort(testRect: Rect): boolean {
  let result = false;
  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;

  if (
    testRect.left >= 0 &&
    testRect.right <= vpWidth &&
    testRect.top >= 0 &&
    testRect.bottom <= vpHeight
  ) {
    result = true;
  }

  return result;
}

export function rectInsideOtherRect(testRect: Rect, otherRect: Rect): boolean {
  let result = false;

  if (
    testRect.left >= otherRect.left &&
    testRect.right <= otherRect.right &&
    testRect.top >= otherRect.top &&
    testRect.bottom <= otherRect.bottom
  ) {
    result = true;
  }

  return result;
}

export function getElementRect(element: HTMLElement): Rect {
  const rect = element.getBoundingClientRect();
  const resultRect: Rect = {
    left: rect.left,
    right: rect.right,
    top: rect.top,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
  };

  return resultRect;
}

