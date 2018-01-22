import { trigger, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

/**
 * 动画效果fadein
 */
export const fadeIn: AnimationTriggerMetadata = trigger('fadeIn', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate(600, style({ opacity: 1 }))
  ]),
  transition('* => void', [
    animate(600, style({ opacity: 0 }))
  ])
]);
