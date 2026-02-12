import type { PluginContext } from 'vitis-lowcode-types'
import Pane from './component'

function LifeCyclesPane(ctx: PluginContext) {
    return {
        init() {
            ctx.skeleton.add({
                type: 'panelDock',
                name: "LifeCyclesPane",
                content: Pane,
                area: "left",
                pluginContext: ctx
            })
        }
    }
}

LifeCyclesPane.pluginName = 'defaultLifeCyclesPane'

export default LifeCyclesPane