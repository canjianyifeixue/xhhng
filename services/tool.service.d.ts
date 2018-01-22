export declare class ToolService {
    /**
     * params:
     * - before: object
     * - after: object
     *
     * 筛选出值不相等的属性，返回一个新对象
     */
    filterField(before: {
        [key: string]: any;
    }, after: {
        [key: string]: any;
    }): object;
    encodeString(str: string): string;
    decodeString(str: string): string;
}
