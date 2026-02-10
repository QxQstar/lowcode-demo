import React from 'react'
import { observer } from 'mobx-react-lite'
import { WidgetSpec } from 'vitis-lowcode-types'

interface Props {
    items: WidgetSpec[]
}

const BottomBar: React.FC<Props> = observer((props) => {
    if (props.items.length) {
        return (
        <div className='absolute left-0 right-0 bottom-0 h-[50px] flex justify-center items-center gap-[10px]'>
            {props.items.map((item, index) => <div className='' key={index}>{item.content}</div>)}
        </div>
        )
    } else {
        return null
    }
})

export default BottomBar
