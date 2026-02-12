import type { Dragon as InnerDragon } from '../project/dragon'
import { DragonSpec } from 'vitis-lowcode-types'
import { DragObjectType } from '../types'

export default class Dragon implements DragonSpec{
    private readonly innerDragon: InnerDragon

    constructor(innerDragon: InnerDragon) {
        this.innerDragon = innerDragon
    }

    onNodeDataDragStart = (componentName: string) => {
        if (this.innerDragon.designer.componentSpecMap.has(componentName)) {
            this.innerDragon.onDragStart({
                type: DragObjectType.NodeData,
                data: this.innerDragon.designer.componentSpecMap.get(componentName)!
            })
        }
        
    }
}