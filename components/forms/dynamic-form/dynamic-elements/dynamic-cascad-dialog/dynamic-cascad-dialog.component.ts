import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const CASCAD_DIALOG_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicCascadDialogComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-cascad-dialog',
  templateUrl: './dynamic-cascad-dialog.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CASCAD_DIALOG_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MhDynamicCascadDialogComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

}
