import type { PluginContext } from 'vitis-lowcode-types'
import Pane from './component'

function SchemaPane(ctx: PluginContext) {
    return {
        init() {
            ctx.skeleton.add({
                type: 'panelDock',
                name: "SchemaPane",
                content: Pane,
                area: "left",
                pluginContext: ctx
            })
        }
    }
}

SchemaPane.pluginName = 'SchemaPane'

export default SchemaPane