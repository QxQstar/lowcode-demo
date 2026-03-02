import React from 'react'
import type Skeleton from '../skeleton'
import type Project from '../project'
import TopBar from './topBar'
import BottomBar from './bottomBar'
import MainArea from './mainArea'
import LeftArea from './leftArea'
import RightArea from './rightArea'
import ToolBarArea from './toolBar'

interface Props {
    skeleton: Skeleton
    project: Project
}

const Workbench: React.FC<Props> = (props) => {
    return (
        <div className='flex h-full w-full flex-col relative'>
            <TopBar 
                topLeftAreaItems={props.skeleton.topLeftArea.items}
                topRightAreaItems={props.skeleton.topRightArea.items}
                topCenterAreaItems={props.skeleton.topCenterArea.items}
            />
            <div className='relative flex-1'>
                <LeftArea items={props.skeleton.leftArea.items}/>
                <div className='flex flex-col border-r border-[rgba(0,0,0,0.06)] ml-[50px] mr-[300px] h-full'>
                    <ToolBarArea items={props.skeleton.toolbarArea.items}/>
                    <MainArea componentSpecMap={props.project.designer.componentSpecMap}/>
                </div>
                <RightArea designer={props.project.designer}/>
            </div>
            <BottomBar items={props.skeleton.bottomArea.items}/>
        </div>
    )
}

export default Workbench
