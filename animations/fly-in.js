/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";
/**
 * 动画flyin效果
 */
export var /** @type {?} */ flyIn = trigger('flyIn', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
        animate(300, keyframes([
            style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(50%)', offset: 0.5 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
    ])
    // transition('* => void', [
    //   animate(300, keyframes([
    //     style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
    //     style({ opacity: 1, transform: 'translateX(50%)', offset: 0.5 }),
    //     style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
    //   ]))
    // ])
]);
