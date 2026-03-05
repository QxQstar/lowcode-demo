import { ComponentSpecRaw, NodeSchema, SetterConfig, ComponentSpecInstance } from 'vitis-lowcode-types'
import { FieldConfig, FieldGroupConfig, FieldSingleConfig } from '../types'

export default class ComponentSpec implements ComponentSpecInstance{
    configure: FieldConfig[] = [];
    rawData: ComponentSpecRaw
    extraProps: NodeSchema['extraProps']

    constructor(componentSpecRaw: ComponentSpecRaw) {
        this.rawData = componentSpecRaw
        this.parseRawData()
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

    private parseRawData = () => {
        this.genConfigure()
        this.initExtraProps()
    }

    private initExtraProps = () => {
        // 将取值路径、name 和 id 放在 extraProps 中
        this.extraProps = {
            id: {
                type: 'JSRunFunction',
                value: "node => node.id"
            }
        }

        if (this.rawData.advanced?.component?.containerType !== 'Page') {
            this.extraProps.pathToVal = ''
        }

        if (this.rawData.advanced?.component?.isFormControl) {
            this.extraProps.name = ''
        }
    }

    private genConfigure = () => {
        this.configure.push(this.getPropsConfig())
        const supports = this.rawData.advanced?.supports
        if (supports?.styles) {
            this.configure.push({
                type: 'group',
                title: '样式',
                name: 'style',
                fields: [
                    {
                        type: 'field',
                        name: 'style',
                        setters: [{ name: 'StyleSetter' }] as FieldSingleConfig['setters']
                    }
                ]
            })
        }

    }

    private getPropsConfig = (): FieldGroupConfig => {
        const getSettersName = (setterConfig: SetterConfig | SetterConfig[]) => {
            if (!Array.isArray(setterConfig)) {
                setterConfig = [setterConfig]
            }

            return setterConfig.map(config => ({
                name: config.isUseSelf ? this.rawData.packageName + '/' + config.name : config.name,
                props: config.props
            }))
        }

        const getExtraPropsConfig = () => {
            const extraPropsConfig: FieldSingleConfig[] = []
            extraPropsConfig.push({
                type: 'field',
                title: 'ID',
                name: 'id',
                isExtra: true,
                setters: [{ 
                    name: 'TextSetter', 
                    props: {
                        style: {
                            color: '#999'
                        }
                    }
                 }] as FieldSingleConfig['setters']
            })

            if (this.rawData.advanced?.component?.containerType !== 'Page') {
                extraPropsConfig.push({
                    type: 'field',
                    title: '取值路径',
                    name: 'pathToVal',
                    isExtra: true,
                    setters: [{ 
                        name: 'StringSetter',
                     }] as FieldSingleConfig['setters']
                })
            }

            if (this.rawData.advanced?.component?.isFormControl) {
                extraPropsConfig.push({
                    type: 'field',
                    title: 'name',
                    name: 'name',
                    isExtra: true,
                    setters: [{ 
                        name: 'StringSetter',
                     }] as FieldSingleConfig['setters']
                })
            }

            return extraPropsConfig
        }

        return {
            type: 'group',
            title: '属性',
            name: 'props',
            fields: [
                ...getExtraPropsConfig(),
                ...this.rawData.props.filter(prop => prop.name !== 'style').map(prop => ({
                    type: 'field' as 'field',
                    name: prop.name,
                    title: prop.description || prop.name,
                    setters: getSettersName(prop.setter),
                }))
            ]
        }
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