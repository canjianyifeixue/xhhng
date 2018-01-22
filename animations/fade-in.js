/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { trigger, style, transition, animate } from "@angular/animations";
/**
 * 动画效果fadein
 */
export var /** @type {?} */ fadeIn = trigger('fadeIn', [
    transition('void => *', [
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 }))
    ]),
    transition('* => void', [
        animate(600, style({ opacity: 0 }))
    ])
]);
