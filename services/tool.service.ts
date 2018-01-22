import { Injectable } from '@angular/core';

@Injectable()
export class ToolService {
  /**
   * params:
   * - before: object
   * - after: object
   *
   * 筛选出值不相等的属性，返回一个新对象
   */
  public filterField(before: { [key: string]: any }, after: { [key: string]: any }): object {
    const result: { [key: string]: any } = {};
    for (const field of Object.keys(after)) {
      if (typeof after[field] === 'object' && after[field] !== []) {
        result[field] = after[field];
      } else if (after[field] !== before[field] && after[field] !== null) {
        result[field] = after[field];
      }
    }
    return result;
  }

  public encodeString(str: string): string {
    return str;
  }

  public decodeString(str: string): string {
    return '';
  }
}
