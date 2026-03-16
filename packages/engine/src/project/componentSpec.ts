import { ComponentSpecRaw, NodeSchema, ComponentSpecInstance } from 'vitis-lowcode-types'
import { FieldConfig } from '../types'

export default class ComponentSpec implements ComponentSpecInstance{
    configure: FieldConfig[] = [];
    rawData: ComponentSpecRaw
    extraProps: NodeSchema['extraProps']

    constructor(componentSpecRaw: ComponentSpecRaw) {
        this.rawData = componentSpecRaw
    }

    get parentWhitelist() {
        return this.rawData.advanced?.nestingRule?.parentWhitelist
    }

    get childWhitelist() {
        return this.rawData.advanced?.nestingRule?.childWhitelist
    }

    get componentName() {
        return this.rawData.componentName
    }

    get group() {
        return this.rawData.group || 'base'
    }

    get packageName() {
        return this.rawData.packageName
    }

    get unableDel() {
        return this.rawData.advanced?.component?.containerType === 'Page'
    }

    get unableCopy() {
        return this.rawData.advanced?.component?.containerType === 'Page'
    }

    get unableMove() {
        return this.rawData.advanced?.component?.containerType === 'Page'
    }

    get enableSelected() {
        return this.rawData.advanced?.component?.containerType !== 'Page'
    }

    get title() {
        return this.rawData.title
    }

    get snippets() {
        return this.rawData.snippets;
    }

    get isContainer() {
        return this.rawData.advanced?.component?.isContainer
    }

    get containerType() {
        return this.rawData.advanced?.component?.containerType
    }

    isCanInclude(componentSpec: ComponentSpec) {
        if (this.childWhitelist?.length === 0 && componentSpec.parentWhitelist?.length === 0) {
            return false
        }
        
        const notMatchChild = this.childWhitelist?.every((item: string) => {
            // 使用模糊匹配
            if (item.includes('*')) {
                item = item.replace(/\*/g,'.')
                const reg = new RegExp(item, 'i')
                return !reg.test(componentSpec.componentName)
            } else {
                return item !== componentSpec.componentName
            }
        })

        const notMatchParent = componentSpec.parentWhitelist?.every((item: string) => {
            // 使用模糊匹配
            if (item.includes('*')) {
                item = item.replace(/\*/g,'.')
                const reg = new RegExp(item, '')
                return !reg.test(this.componentName)
            } else {
                return item !== this.componentName
            }
        })

        if (notMatchChild || notMatchParent) {
            return false
        }

        return true
    }
}