import React, { useState, useRef, useLayoutEffect } from "react";
import { observer } from 'mobx-react-lite'
import { observableProject } from '../../../shell'
import { UnorderedListOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons'
import { Popover } from 'antd';
import type Node from "../../../node";

const ComponentTreeOutLook = (props: {node?: Node | null; level: number}) => {
    if (props.node) {
        return (
            <>
                <div style={{marginRight: props.level * 8 + 'px', }} className="text-white text-[10px] bg-[#1890ff] px-[2px] cursor-pointer">{props.node.title}</div>
                {<ComponentTreeOutLook node={props.node.parent} level={props.level + 1}/>}
            </>
        )
    } 

    return null
}

export default observer(function Operation() {
    const [style, setStyle] = useState<React.CSSProperties>({})
    const rootRef = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        const rect = observableProject.designer.detection.selectedNodePosition
        if (rect && observableProject.documentModel.currentNode) {
            setStyle({
                left: rect.right - (rootRef.current?.clientWidth || 0),
                top: rect.top,
                visibility: 'visible'
            })
        } else {
            setStyle({})
        }
    
    }, [observableProject.designer.detection.selectedNodePosition, observableProject.documentModel.currentNode])

    const onDel = () => {
        observableProject.documentModel.delNode(observableProject.documentModel.selectedNodeId!)
        observableProject.designer.selectNode(undefined)
    }

    const onCopy = () => {
        const currentNode = observableProject.documentModel.currentNode!
        const node = observableProject.documentModel.copyNode(currentNode);
        currentNode.parent?.insertAfter(node, currentNode)
    }

    return (
        <div className="absolute invisible bg-[#1890ff] text-white px-[8px] z-[2] rounded-[2px] space-x-[8px]" style={style} ref={rootRef}>
            {observableProject.documentModel.currentNode && 
            <Popover 
                placement="bottomRight"
                trigger="hover"
                showArrow={false}
                content={<ComponentTreeOutLook node={observableProject.documentModel.currentNode} level={0}/>}
                overlayClassName="!py-[2px] !px-0 !bg-transparent [&_.ant-popover-inner-content]:p-0 [&_.ant-popover-inner-content]:bg-transparent"
            >
                <UnorderedListOutlined className="text-[16px] cursor-pointer"/>
            </Popover>
            }
            {observableProject.documentModel.currentNode?.componentSpec.unableDel === false && <DeleteOutlined className="text-[16px] cursor-pointer" onClick={onDel}/>}
            {observableProject.documentModel.currentNode?.componentSpec.unableCopy === false && <CopyOutlined className="text-[16px] cursor-pointer" onClick={onCopy}/>}
        </div>
    )
})
