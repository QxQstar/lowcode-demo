import React from 'react'
import { WidgetSpec } from 'vitis-lowcode-types'
import { observer } from 'mobx-react-lite'

interface Props {
    items: WidgetSpec[]
}

const LeftArea: React.FC<Props> = observer((props) => {
    if (props.items.length) {
        return (
        <div className='absolute left-0 top-0 bottom-0 z-[1] w-[50px] bg-white border-r border-slate-200 text-center text-[#1890ff] pt-[20px] space-y-[8px]'>
            {props.items.map((item, index) => <div className='' key={index}>{item.content}</div>)}
        </div>
        )
    } else {
        return null
    }
})

export default LeftArea
