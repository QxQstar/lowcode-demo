import React from 'react'
import { observer } from 'mobx-react-lite'
import type Designer from '../../../project/designer'

interface Props {
    designer: Designer
}

export default observer(function InsertionView(props: Props) {
    const { designer } = props
    
    // 确保依赖被追踪
    void designer.dragon.dropLocation;

    const insertRect = designer.getInsertPointRect()
    
    const style: React.CSSProperties = insertRect ? {
        borderTopStyle: 'solid',
        width: insertRect.width,
        left: insertRect.left,
        top: insertRect.top,
        display: 'block'
    } : { display: 'none' }

    return (
        <div 
            className='absolute border-none border-[hsl(155,92%,41%)] h-0 border-2 z-1 pointer-events-none' 
            style={style}
        />
    )
})
