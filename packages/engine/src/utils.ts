import { JSFunction, PropValue, JSRunFunction } from 'vitis-lowcode-types'

let guid = Date.now();
export function uniqueId(prefix = '') {
  return `${prefix}${(guid++).toString(36).toLowerCase()}`;
}

export function transformStringToFunction(str: string) {
  return new Function(`"use strict"; return ${str}`)();
}

export function isJsFunction(value: PropValue): value is JSFunction {
  return !!value && (value as any).type === 'JSFunction'
}

export function isJsRunFunction(value: PropValue): value is JSRunFunction {
  return !!value && (value as any).type === 'JSRunFunction'
}
