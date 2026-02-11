import { NodeSchema, SimulatorSpec, Point } from 'vitis-lowcode-types'
import { createElement } from 'react'
import { RendererMode } from 'vitis-lowcode-renderer'
import reactDomCollector, { DomNode } from './reactInstanceCollector'
import { EmptyComponent } from './emptyComponent/page'
import SimulatorRendererView from './view'
import observerData from './store'

import { createRoot } from 'react-dom/client'

import { getHost, deferUtil } from './utils'


class SimulatorRenderer implements SimulatorSpec {
    private isRan: boolean = false

    getClosestNodeIdByLocation = (point: Point): string | undefined => {
        // 第一步：找出包含 point 的全部 dom 节点
        const suitableContainer = new Map<string, DomNode>()
        for (const [id, domNode] of reactDomCollector.domNodeMap) {
            const rect = this.getNodeRect(id)
            if (!domNode || !rect) continue
            const { width, height, left, top } = rect
            if (left < point.clientX && top < point.clientY && width + left > point.clientX && height + top > point.clientY) {
                suitableContainer.set(id, domNode)
            }
        }
        // 第二步：找出离 point 最近的 dom 节点
        const minGap: {id: string| undefined; minArea: number} = {
            id: undefined,
            minArea: Infinity
        }
        for (const [id, domNode] of suitableContainer) {
            const { width, height } = domNode.rect
            if (width *  height  < minGap.minArea) {
                minGap.id = id;
                minGap.minArea = width *  height
            }
        }

        return minGap.id
    }

    getNodeRect = (nodeId: string): DOMRect | undefined => {
        return reactDomCollector.domNodeMap.get(nodeId)?.node.getBoundingClientRect()
    }

    getNodeIdByDOMElem = (elem: HTMLElement) => {
        return elem.getAttribute('data-node-id') || undefined
    }

    toggleLoading = (show: boolean) => {
        const loading = document.getElementById('loadingWarp')
        if (loading) {
            loading.style.display = show ? 'flex': 'none'
        }
    }

    rerender = async () => {
        const host = getHost()
        observerData.components = host?.project.designer.componentImplMap,
        observerData.schema = host?.project.schema
        await deferUtil.waitMounted()
    }

    run() {
        this.toggleLoading(false)
        if (this.isRan) {
            return
        }

        this.isRan = true

        document.documentElement.classList.add('h-full')
        document.body.classList.add('h-full', 'p-0', 'm-0')

        const container = document.createElement('div')
        container.id = 'simulatorRenderer'
        container.className = 'simulator-renderer h-full'
        document.body.appendChild(container)

        const root = createRoot(container)
        root.render(
            createElement(SimulatorRendererView, {
                rendererMode: RendererMode.design,
                onCompGetRef: (schema: NodeSchema, domElement: HTMLElement | null) => {
                    reactDomCollector.mount(schema.id!, domElement)
                },
                customEmptyElement: (schema: NodeSchema) => {
                    if (schema.containerType === 'Page') {
                        return <EmptyComponent text='将布局组件拖拽到这里'/>
                    } else if (schema.containerType === 'Layout') {
                        return <EmptyComponent text='拖入组件'/>
                    }
                },
            },null)
        )
    }
}

export default new SimulatorRenderer()