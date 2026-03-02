import { NodeSchema, SimulatorSpec, Point } from 'vitis-lowcode-types'
import { RendererMode } from 'vitis-lowcode-renderer'
import reactDomCollector, { DomNode } from './reactInstanceCollector'
import { EmptyComponent } from './emptyComponent/page'
import SimulatorRendererView from './view'
import { HostSpec } from 'vitis-lowcode-types'
import { loader } from './loader'

import { createRoot } from 'react-dom/client'


class SimulatorRenderer implements SimulatorSpec {
    host: HostSpec
    setupHost(host: HostSpec) {
        this.host = host
    }

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

    get schema() {
        return this.host?.project.schema;
    }

    toggleLoading = (show: boolean) => {
        const loading = document.getElementById('loadingWarp')
        if (loading) {
            loading.style.display = show ? 'flex': 'none'
        }
    }

    async loadAssets(urls: string[]) {
        this.toggleLoading(true);
        await loader.loadAssets(urls)
        this.toggleLoading(false)
    }

    rerender() {
        const container = document.getElementById('app')!;

        const root = createRoot(container)
        root.render(
            <SimulatorRendererView
                schema={this.schema}
                rendererMode={RendererMode.design}
                onCompGetRef={(schema: NodeSchema, domElement: HTMLElement | null) => {
                    reactDomCollector.mount(schema.id!, domElement)
                }}
                customEmptyElement={(schema: NodeSchema) => {
                    if (schema.containerType === 'Page') {
                        return <EmptyComponent text='将布局组件拖拽到这里'/>
                    } else if (schema.containerType === 'Layout') {
                        return <EmptyComponent text='拖入组件'/>
                    }
                }}
            />
        )
    }
}

export default new SimulatorRenderer()