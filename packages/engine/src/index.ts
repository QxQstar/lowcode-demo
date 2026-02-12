import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { defaultPlugins, defaultSetters } from 'vitis-lowcode-default-ext'
import { PageSchema, ComponentSpecRaw } from 'vitis-lowcode-types'

import { plugins, setters, project } from './shell'
import Root from './root'


export { setters, skeleton, plugins, project, dragon } from './shell'

(async function () {
    defaultPlugins.forEach(defaultPlugin => {
        plugins.register(defaultPlugin)
    })

    setters.register(defaultSetters)

})()

export interface EngineOptions {
    pageSchema?: PageSchema
}

export function init(container?: HTMLElement) {
    if (!container) {
        container = document.createElement('div')
        container.id = 'vitis-engine'
        document.body.appendChild(container)
    }
    
    createRoot(container).render(createElement(Root))
}

export function setAssets(assets: ComponentSpecRaw[]) {
    project.setAssets(assets);
}