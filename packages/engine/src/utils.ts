import { JSFunction, NpmInfo, PropValue, JSRunFunction } from 'vitis-lowcode-types'

let guid = Date.now();
export function uniqueId(prefix = '') {
  return `${prefix}${(guid++).toString(36).toLowerCase()}`;
}

export function getComponentSpecUrl(info: NpmInfo) {
  return `https://unpkg.com/${info.npm}@${info.version}/asset/index.json`
}

export function getBaseAssets() {
  return {
    js: [
      'https://g.alicdn.com/code/lib/react/17.0.2/umd/react.development.js',
      'https://g.alicdn.com/code/lib/react-dom/17.0.2/umd/react-dom.development.js',
      'http://localhost:5555/js/simulator-renderer.js'
    ],
    css: ['http://localhost:5555/css/simulator-renderer.css']
  }
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
