import { makeAutoObservable } from 'mobx'
import Designer from './designer';
import DocumentModel from './documentModel'
import { PageSchema, ObservableProjectSpec, LifeCycles, JSFunction, Interceptors } from 'vitis-lowcode-types'

const defaultPageSchema: PageSchema = {
    componentName: 'Page',
    packageName: 'Page',
    containerType: 'Page',
    isContainer: true,
    children: [],
    props: {
        style: ''
    },
    extraProps: {
        id: {
            type: 'JSRunFunction',
            value: 'node => node.id'
        },
    },
}

export default class Project  implements ObservableProjectSpec{
    readonly designer: Designer
    readonly documentModel: DocumentModel

    get schema() {
        return this.documentModel.schema as PageSchema
    }

    get componentsMap() {
        return {}
    }

    constructor(schema: PageSchema = defaultPageSchema) {
        makeAutoObservable(this, {
            designer: false,
            documentModel: false
        })
        this.designer = new Designer(this)
        this.documentModel = new DocumentModel(this,schema)
        this.designer.init()
    }

    setSchema(schema: PageSchema) {
        this.documentModel.open(schema)
    }
}