import { ControlValueAccessor } from '@angular/forms';

const noop: any = () => {
    // empty method
};

export abstract class AbstractControlValueAccessor implements ControlValueAccessor {

    /**
     * Implemented as part of ControlValueAccessor.
     */
    protected _value: any = undefined;

    // get/set accessor (needed for ControlValueAccessor)
    get value(): any { return this._value; }
    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    /**
     * Implemented as part of ControlValueAccessor.
     */
    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public onChange = (_: any) => noop;
    public onTouched = () => noop;
}
