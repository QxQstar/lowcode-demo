import React from 'react'
import { WidgetSpec } from 'vitis-lowcode-types'
import { observer } from 'mobx-react-lite'

interface Props {
    items: WidgetSpec[]
}

const ToolBarArea: React.FC<Props> = observer((props) => {
    if (props.items.length) {
        return (
        <div className='h-[50px] border-b border-[rgba(0,0,0,0.06)] px-[20px] flex items-center justify-center gap-[8px]'>
            {props.items.map((item, index) => <div className='' key={index}>{item.content}</div>)}
        </div>
        )
    } else {
        return null
    }
})

export default ToolBarArea
