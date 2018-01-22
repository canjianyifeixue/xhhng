import { Observable } from 'rxjs/Observable';
export declare class CascadSelectService {
    private http;
    constructor(http: any);
    initSelection(data: any, selectedData: any, keyField: string): Observable<any>;
    loopSelection(selections: any[], key: any, keyField: string): any;
    initAsyncSelection(selectedData: any, data: any, selections: any, selectDepth: any, keyField: string, valueField: string): Observable<any>;
    loadAsyncSelection(arr: Array<Observable<any>>, selectedData: any, selections: any, selectDepth: any, keyField: string, valueField: string): Observable<any>;
    loadAsyncData(data: any, index: number, value?: string): Observable<any>;
}
