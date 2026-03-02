import { NodeSchema, SimulatorSpec, Point } from 'vitis-lowcode-types'
import { RendererMode } from 'vitis-lowcode-renderer'
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
        const el = document.elementFromPoint(point.clientX, point.clientY);
        if (!el) return undefined;
        const node = el.closest('[data-node-id]');
        if (node) {
            return node.getAttribute('data-node-id') || undefined
        }

        return undefined;
    }

    getNodeRect = (nodeId: string): DOMRect | undefined => {
        const node =  document.querySelector(`[data-node-id=${nodeId}]`)
        if (node) {
            return node.getBoundingClientRect();
        }
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