import type EventEmitter from 'eventemitter3';
import type { ComponentSpecInstance, MaterialPackage } from './material'
import type{ PageSchema } from './schema'
export interface ProjectSpec extends EventEmitter {
    getSchema(): PageSchema;
    setAssets(specs: MaterialPackage): void;
    setSchema(s: PageSchema): void;
    get assets(): Map<string, ComponentSpecInstance>
    DRAG_OVER: symbol;
    SCHEMA_UPDATED: symbol;
}

export interface ObservableProjectSpec {
    designer: DesignerSpec
    schema: PageSchema
}

export interface DesignerSpec {
    buildComponents(specs: MaterialPackage): void
}