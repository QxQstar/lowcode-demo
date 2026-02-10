import React from 'react'
import { observer } from 'mobx-react-lite'
import { WidgetSpec } from 'vitis-lowcode-types'

interface Props {
    topLeftAreaItems: WidgetSpec[];
    topRightAreaItems: WidgetSpec[];
    topCenterAreaItems: WidgetSpec[];
}

const TopBar: React.FC<Props> = observer((props) => {
    return (
    <div className='h-[50px] flex w-full justify-around px-[10px] bg-white border-b border-slate-200 shrink-0 grow-0'>
        <div className='flex flex-1 items-center px-[10px] gap-[10px]'>{props.topLeftAreaItems.map((item, index) => <div className='' key={index}>{item.content}</div>)}</div>
        <div className='flex flex-1 items-center px-[10px] justify-center gap-[10px]'>{props.topCenterAreaItems.map((item, index) => <div className='' key={index}>{item.content}</div>)}</div>
        <div className='flex flex-1 items-center px-[10px] justify-end gap-[10px]'>{props.topRightAreaItems.map((item, index) => <div className='' key={index}>{item.content}</div>)}</div>
    </div>
    )
})

export default TopBar
