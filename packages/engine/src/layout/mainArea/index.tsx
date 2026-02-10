import React from 'react'
import { observer } from 'mobx-react-lite'
import { Spin } from 'antd';

import CanvasView from './canvasView'
import LocationTools from './locationTools'
import type ComponentSpec from '../../project/componentSpec'

interface Props {
    componentSpecMap: Map<string, ComponentSpec>
}

const MainArea: React.FC<Props> = observer((props) => {
    if (props.componentSpecMap.size < 1) {
        return <Spin size="large" tip="启动中..." className='!mt-[200px]'/>
    }
    return (
    <div className='relative flex-1 bg-[rgb(236,246,250)]'>
        <CanvasView />
        <LocationTools />
    </div>
    )
})

export default MainArea
