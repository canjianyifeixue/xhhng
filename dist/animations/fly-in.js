"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/**
 * 动画flyin效果
 */
exports.flyIn = animations_1.trigger('flyIn', [
    animations_1.state('in', animations_1.style({ transform: 'translateX(0)' })),
    animations_1.transition('void => *', [
        animations_1.animate(300, animations_1.keyframes([
            animations_1.style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
            animations_1.style({ opacity: 1, transform: 'translateX(50%)', offset: 0.5 }),
            animations_1.style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
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
