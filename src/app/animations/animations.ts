import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export let fade = trigger('fade', [
  state('void', style({ opacity: 0, right: 500 })),
  transition(':enter, :leave', [animate(700)]),
]);

export let isover = trigger('isover', [
  state(
    'isover',
    style({
      opacity: 0.65,
      width: 104,
      height: 42,
    })
  ),
  transition('notover<=>isover', [animate(100)]),
]);
export let isover2 = trigger('isover2', [
  state(
    'isover',
    style({
      opacity: 1,
      width: 376,
      right: 5,
      height: 40,
    })
  ),
  transition('notover<=>isover', [animate(100)]),
]);

export let isoveropacity = trigger('isoveropacity', [
  state(
    'isover',
    style({
      opacity: 0.6,
    })
  ),
  transition('notover<=>isover', [animate(100)]),
]);
