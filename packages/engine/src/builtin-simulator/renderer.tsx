import { SimulatorSpec, Point } from 'vitis-lowcode-types'
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
                host={this.host}
            />
        )
    }
}

export default new SimulatorRenderer()