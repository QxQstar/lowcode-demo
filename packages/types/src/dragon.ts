import type { NodeSchema } from "./schema";

export interface DragonSpec {
    onNodeDataDragStart: (schema: NodeSchema) => void
}