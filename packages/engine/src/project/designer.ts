import { makeAutoObservable,  } from 'mobx';
import { DesignerSpec, MaterialPackage } from 'vitis-lowcode-types'

import ComponentSpec from './componentSpec'
import { Dragon, isDragDataNode } from './dragon'
import Host from './host'
import Detection from './detection';
import type Project from './index'
import Viewport from './viewport'
import { LocationEvent } from '../types'
import SettingTopEntry from '../setting/SettingTopEntry'
import { PageComponentsSpec } from '../defaultConfig/asset'
export default class Designer implements DesignerSpec {
    componentSpecMap: Map<string, ComponentSpec> = new Map()

    dragon = new Dragon(this)
    host: Host
    project: Project
    viewport: Viewport
    detection: Detection = new Detection(this)
    settingTopEntry?: SettingTopEntry

    constructor(project: Project) {
        makeAutoObservable(this, {
            dragon: false,
            project: false,
            viewport: false,
            host: false,
        });

        this.project = project
        this.host = new Host(project)
        this.viewport = new Viewport()
        this.componentSpecMap.set('Page', new ComponentSpec(PageComponentsSpec))
    }

    buildComponents = (specs: MaterialPackage) => {
        specs.components.forEach(spec => {
            this.componentSpecMap.set(spec.componentName, new ComponentSpec(spec))
        })
        
    }

    mountViewport = (element: HTMLElement | null) => {
        this.viewport.mount(element)
    }


    getDropContainer = (locateEvent: LocationEvent) => {
        let containerNode = this.host.getClosestNodeByLocation({clientX: locateEvent.clientX, clientY: locateEvent.clientY})
        const thisComponentSpec: ComponentSpec = isDragDataNode(locateEvent.dragObject) ? locateEvent.dragObject.data: locateEvent.dragObject.node.componentSpec
        while(containerNode) {
            if (containerNode.componentSpec.isCanInclude(thisComponentSpec)) {
                return containerNode
            } else {
                containerNode = containerNode.parent
            }
        }
    }

    getNodeRect = (nodeId: string) => {
        return this.host.getNodeRect(nodeId)
    }

    getInsertPointRect = () => {
        const dropLocation = this.dragon.dropLocation

        if (dropLocation) {
            const { containerNode, index } = dropLocation
            if (index === 0) {
                return this.getNodeRect(containerNode.id)
            } 
            // 插到容器的最后一个位置
            else if (index >= containerNode.childrenSize) {
                const lastChild = containerNode.lastChild
                const lastChildRect = lastChild ? this.getNodeRect(lastChild.id): undefined
                return lastChildRect ? new DOMRect(lastChildRect.x, lastChildRect.y + lastChildRect.height, lastChildRect.width, lastChildRect.height): undefined
            } else {
                const child = containerNode.getChildAtIndex(index)
                return child ? this.getNodeRect(child.id): undefined
            }
        }
    }

    selectNode = (nodeId?: string) => {
        this.project.documentModel.selectNode(nodeId)
        this.detection.computeSelectedPosition(nodeId)
        this.settingTopEntry = nodeId ? this.project.documentModel.getNode(nodeId)?.settingEntry: undefined
    }

    rerender = () => {
        return this.host.rerender()
    }
}
