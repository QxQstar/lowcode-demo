import type { Dragon as InnerDragon } from '../project/dragon'
import { DragonSpec, NodeSchema } from 'vitis-lowcode-types'
import { DragObjectType } from '../types'

export default class Dragon implements DragonSpec{
    private readonly innerDragon: InnerDragon

    constructor(innerDragon: InnerDragon) {
        this.innerDragon = innerDragon
    }

    onNodeDataDragStart = (schema: NodeSchema) => {
        this.innerDragon.onDragStart({
            type: DragObjectType.NodeData,
            data: schema
        })
    }
}