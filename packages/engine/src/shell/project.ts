import { EventEmitter } from 'eventemitter3';
import type InterProject from '../project';
import { ProjectSpec, LifeCycles, JSFunction, Interceptors, PageSchema, MaterialPackage } from 'vitis-lowcode-types'

export default class Project extends EventEmitter implements ProjectSpec {
    private readonly project: InterProject
    SCHEMA_UPDATED = Symbol('SCHEMA_UPDATED')
    DRAG_OVER = Symbol('DRAG_OVER')
    constructor(project: InterProject) {
        super()
        this.project = project
    }

    updateLifeCycles = (name: keyof LifeCycles, value?: JSFunction) => {
        this.project.updateLifeCycles(name, value)
    }

    getLifeCycles = () => {
        return this.project.getLifeCycles()
    }

    updateInterceptors = (name: keyof Interceptors, value?: JSFunction) => {
        this.project.updateInterceptors(name, value)
    }

    getInterceptors(): Interceptors | undefined {
        return this.project.getInterceptors()
    }

    getSchema() {
        return this.project.schema
    }

    setAssets(specs: MaterialPackage) {
        this.project.designer.buildComponents(specs);
    }

    setSchema(s: PageSchema) {
        this.project.setSchema(s)
    }

    get assets() {
        return this.project.designer.componentSpecMap
    }
}