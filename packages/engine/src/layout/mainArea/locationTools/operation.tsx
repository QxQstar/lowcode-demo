import { useCallback, useRef, useLayoutEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import type Node from "../../../node";
import type DocumentModel from '../../../project/documentModel';
import type Designer from '../../../project/designer';
import { DragObjectType } from "../../../types";

const TOOLBAR_CONTAINER_CLASS = "absolute bg-[#1890ff] text-white px-2 py-1 z-2 rounded-[2px] space-x-2 flex items-center -translate-x-full";
const ICON_CLASS = "text-[16px] cursor-pointer hover:text-gray-200 transition-colors";

interface Props {
    selectedNodePosition: DOMRect;
    currentNode: Node;
    documentModel: DocumentModel;
    designer: Designer;
}

export default observer(function Operation(props: Props) {
    const { currentNode, selectedNodePosition, documentModel, designer } = props;
    const [size, setSize] = useState({width: 0, height: 0});
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(()=> {
        if (ref.current) {
            const { height, width } = ref.current.getBoundingClientRect();
            setSize({height, width})
        } 
    }, [])

    // 删除操作
    const handleDelete = useCallback(() => {
        if (currentNode?.id) {
            documentModel.delNode(currentNode.id);
            designer.selectNode(undefined);
        }
    }, [currentNode, documentModel, designer]);

    // 复制操作
    const handleCopy = useCallback(() => {
        const node = documentModel.copyNode(currentNode);
        // 插入到当前节点之后
        currentNode.parent?.insertAfter(node, currentNode);
    }, [currentNode, documentModel]);

    const canDelete = currentNode.componentSpec?.unableDel !== true;
    const canCopy = currentNode.componentSpec?.unableCopy !== true;
    const canDrag = currentNode.componentSpec?.unableMove !== true;

    const handleDragStart = useCallback((e: React.DragEvent) => {
        e.stopPropagation();
        
        designer.dragon.onDragStart({
            type: DragObjectType.Node,
            node: currentNode
        });

        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
        }
    }, [currentNode, designer]);

    return (
        <div 
            className={TOOLBAR_CONTAINER_CLASS}
            style={{
                left: selectedNodePosition.right,
                top: selectedNodePosition.top - size.height < 0 ? selectedNodePosition.top + selectedNodePosition.height + 2: selectedNodePosition.top - size.height - 2
            }}
            ref={ref}
        >
            {canDrag && (
                <DragOutlined
                    className={`${ICON_CLASS} cursor-move`}
                    draggable={true}
                    onDragStart={handleDragStart}
                    title="拖拽"
                />
            )}

            {canDelete && (
                <DeleteOutlined 
                    className={ICON_CLASS} 
                    onClick={handleDelete} 
                    title="删除"
                />
            )}
            
            {canCopy && (
                <CopyOutlined 
                    className={ICON_CLASS} 
                    onClick={handleCopy} 
                    title="复制"
                />
            )}
        </div>
    );
});
