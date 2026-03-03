import { ComponentSpecRaw } from 'vitis-lowcode-types'

export const PageComponentsSpec: ComponentSpecRaw = {
    componentName: 'Page',
    packageName: 'Page',
    title: '页面',
    version: '0.0.1',
    props: [],
    group: 'base',
    snippets: [],
    advanced: {
        supports: {
            styles: true,
        },
        component: {
            isContainer: true,
            containerType: 'Page',
            isFormControl: false
        }
    }
}