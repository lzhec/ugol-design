import { trigger, transition, style, animate, keyframes } from '@angular/animations';

export const contentAnimation = trigger('contentAnimation', [
  transition(':enter', [style({ opacity: 0 }), animate('400ms ease-in', style({ opacity: 1 }))]),
]);

export const listItemAnimation = trigger('listItemAnimation', [
  transition(':enter', [style({ opacity: 0 }), animate('100ms ease-in', style({ opacity: 1 }))]),
]);

export const inputAnimation = trigger('inputAnimation', [
  transition(':enter', [style({ opacity: 0 }), animate('200ms ease-in', style({ opacity: 1 }))]),
]);

export const tooltipEnterAnimation = [style({ opacity: 0 }), animate(200, style({ opacity: 1 }))];

export const tooltipAnimation = trigger('tooltipAnimation', [
  transition(':enter', [style({ opacity: 0 }), animate(200, style({ opacity: 1 }))]),
  transition(':leave', [animate(200, style({ opacity: 0 }))]),
]);

export const dropDownAnimation = trigger('dropDownAnimation', [
  transition(
    'void => enter-dropdown',
    animate(
      '120ms cubic-bezier(0, 0, 0.2, 1)',
      keyframes([
        style({ opacity: 0, transform: 'scale(1, 0.8)' }),
        style({ opacity: 1, transform: 'scale(1, 1)' }),
      ]),
    ),
  ),
  transition(
    'void => enter-dialog',
    animate(
      '150ms cubic-bezier(0, 0, 0.2, 1)',
      keyframes([
        style({ opacity: 0, transform: 'scale(0.7)' }),
        style({ transform: 'none', opacity: 1 }),
      ]),
    ),
  ),
  transition('* => void', animate('100ms linear', style({ opacity: 0 }))),
]);
