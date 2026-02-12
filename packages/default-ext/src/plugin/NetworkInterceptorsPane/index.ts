import type { PluginContext } from 'vitis-lowcode-types'
import Pane from './component'

function NetworkInterceptorsPane(ctx: PluginContext) {
    return {
        init() {
            ctx.skeleton.add({
                type: 'panelDock',
                name: "NetworkInterceptorsPane",
                content: Pane,
                area: "left",
                pluginContext: ctx
            })
        }
    }
}

NetworkInterceptorsPane.pluginName = 'defaultNetworkInterceptorsPane'

export default NetworkInterceptorsPane