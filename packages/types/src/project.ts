import type EventEmitter from 'eventemitter3';
import type { ElementType } from 'react'
import type { ComponentSpecRaw } from './material'
import type{ PageSchema, LifeCycles, JSFunction, Interceptors } from './schema'

export interface ProjectSpec extends EventEmitter {
    updateLifeCycles(name: keyof LifeCycles, value: JSFunction): void
    getLifeCycles(): LifeCycles
    getInterceptors(): Interceptors | undefined
    updateInterceptors(name: keyof Interceptors, value: JSFunction): void
    getSchema(): PageSchema;
    setAssets(specs: ComponentSpecRaw[]): void;
    setSchema(s: PageSchema): void;
}

export interface ObservableProjectSpec {
    designer: DesignerSpec
    schema: PageSchema
}

export interface DesignerSpec {
    componentImplMap: Map<string, ElementType>;
    buildComponentsSpec(specs: ComponentSpecRaw[]): void
}