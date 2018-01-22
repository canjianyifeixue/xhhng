import { NativeDateAdapter } from '@angular/material';
export declare class MhDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: object): string;
    parse(value: any): Date | null;
}
