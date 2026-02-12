import type { PluginContext } from 'vitis-lowcode-types'
import Pane from './component'

function ComponentsPane(ctx: PluginContext) {
    return {
        init() {
            ctx.skeleton.add({
                type: "panelDock",
                name: "ComponentsPane",
                content: Pane,
                area: "left",
                pluginContext: ctx
            })
        }
    }
}

ComponentsPane.pluginName = 'defaultComponentsPanePlugin'

export default ComponentsPane