import { makeAutoObservable } from 'mobx'
import { SetterConfig } from 'vitis-lowcode-types'
import type Node from '../node'
import SettingField from './SettingField';

export default class SettingTopEntry {
    readonly owner: Node
    fields: SettingField[] = []

    constructor(owner: Node) {
        makeAutoObservable(this, {
            owner: false
        })
        this.owner = owner
        this.setupFields()
    }

    private getSettersName(setterConfig: SetterConfig | SetterConfig[]) {
        if (!Array.isArray(setterConfig)) {
            setterConfig = [setterConfig]
        }

        return setterConfig.map(config => ({
            name: config.name,
            props: config.props
        }))
    }

    private setupFields(){
        this.fields.push(new SettingField(this, {
            type: 'group',
            title: '属性',
            name: 'props',
            fields: this.owner.componentSpec?.rawData.props.filter(prop => prop.name !== 'style').map(prop => ({
                type: 'field',
                name: prop.name,
                title: prop.description || prop.name,
                setters: this.getSettersName(prop.setter),
            }))
            
        }));
        this.fields.push(new SettingField(this,{
            type: 'group',
            title: '样式',
            name: 'style',
            fields: [
                {
                    type: 'field',
                    name: 'style',
                    setters: [{ name: 'StyleSetter' }]
                }
            ]
        }))
    }

    getProp(propName: string) {
        return this.owner.getProp(propName)
    }

    getExtraProp(propName: string) {
        return this.owner.getExtraProp(propName)
    }
}