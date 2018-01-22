"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/**
 * 动画效果fadein
 */
exports.fadeIn = animations_1.trigger('fadeIn', [
    animations_1.transition('void => *', [
        animations_1.style({ opacity: 0 }),
        animations_1.animate(600, animations_1.style({ opacity: 1 }))
    ]),
    animations_1.transition('* => void', [
        animations_1.animate(600, animations_1.style({ opacity: 0 }))
    ])
]);
