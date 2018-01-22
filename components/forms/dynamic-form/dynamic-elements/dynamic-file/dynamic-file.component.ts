import { Component, forwardRef, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { MhDynamicLoaderService } from '../../dynamic-loader.service';
import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const FILE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MhDynamicFileComponent),
  multi: true,
};

@Component({
  selector: 'mh-dynamic-file',
  templateUrl: './dynamic-file.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FILE_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class MhDynamicFileComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

  public control: FormControl;

  public label = '';

  public config: any;

  public required: boolean;

  public multiple: boolean;

  public maxlength: any = undefined;

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v === null) {
      this._value = null;
    } else if (typeof v === 'string') {
      this.dynamicLoaderService.loadFiles(v)
        //   .flatMap(_ => this.httpService.download(_.path, _.name, false))
        .subscribe((_: any) => {
          // const file = new File([_.blob], _.name)
          this._value = _;
          this.onChange(_);
        });

    } else if (v instanceof File || v instanceof FileList || Array.isArray(v)) {
      this._value = v;
      this.onChange(v);
    }
  }

  constructor(
    @Inject('notify') private notificationService: any,
    private dynamicLoaderService: MhDynamicLoaderService,
  ) {
    super();
  }

  public select(files: FileList | File): void {
    if (this.maxlength) {
      if (files instanceof FileList) {
        let err = false;
        for (let i = 0; i < files.length; i++) {
          const file = files.item(i);
          if (file.size > this.maxlength) {
            err = true;
            break;
          }
        }
        if (err) {
          this.notificationService.error('文件太大！');
          this.control.setValue(null);
        }
      } else if (files instanceof File) {
        if (files.size > this.maxlength) {
          this.notificationService.error('文件太大！');
          this.control.setValue(null);
        }
      }
    }
  }

  public preview(path: string) {
    this.dynamicLoaderService.download(path).subscribe();
  }

  // clearEvent(): void {
  //   this.files = null;
  // };
}
