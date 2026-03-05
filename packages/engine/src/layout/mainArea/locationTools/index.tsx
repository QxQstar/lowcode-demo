import InsertionView from './insertionView'
import DetectBorder from './detectBorder'
import Operation from './operation'
import { observer } from 'mobx-react-lite'
import { observableProject } from '../../../shell'

/**
 * 负责渲染设计器中的辅助工具，如选中框、悬停框、插入点指示器和操作栏
 */
export default observer(function LocationTools() {
    const { designer, documentModel } = observableProject
    const { detection } = designer
    const { hoveredNodePosition, selectedNodePosition } = detection
    const { selectedNodeId, hoveredNodeId, currentNode } = documentModel
    
    const showHoverBorder = !!hoveredNodeId && hoveredNodeId !== selectedNodeId
    const showSelectBorder = !!selectedNodeId

    return (
        <>
            <InsertionView designer={designer}/>
            
            {/* 悬停节点的虚线框 */}
            <DetectBorder 
                type="dashed" 
                position={hoveredNodePosition} 
                show={showHoverBorder}
            />
            
            {/* 选中节点的实线框 */}
            <DetectBorder 
                type="solid" 
                position={selectedNodePosition} 
                show={showSelectBorder}
            />
            
            {/* 选中节点的操作栏（删除、复制等） */}
            {currentNode && selectedNodePosition && (
                <Operation
                    selectedNodePosition={selectedNodePosition} 
                    currentNode={currentNode} 
                    documentModel={documentModel}
                    designer={designer}
                />
            )}
        </>
    )
})
