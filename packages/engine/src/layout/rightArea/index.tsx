import React, { useState, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Tabs } from 'antd';
import type Designer  from '../../project/designer'
import SettingPanel from './settingPanel';

interface Props {
    designer?: Designer
}

const RightArea: React.FC<Props> = observer((props) => {
    const [activeTab, setActiveTab] = useState<string | undefined>()

    useEffect(() => {
        const settingEntry = props.designer?.settingTopEntry
        if (settingEntry && settingEntry.fields.length) {
            setActiveTab(settingEntry.fields[0].id)
        }
    }, [props.designer?.settingTopEntry])

    const onChangeTab = (activeTab: string) => {
        setActiveTab(activeTab)
    }
    const componentsPath = useMemo(() => {
        let node = props.designer?.settingTopEntry?.owner
        const path: string[] = [];
        while (node) {
            path.push(node.title || node.componentName)
            node = node.parent
        }
        return path.join(' > ')
    }, [props.designer?.settingTopEntry?.owner]);

    const settingEntry = props.designer?.settingTopEntry
    if (!settingEntry) {
        return <div className='absolute top-0 right-0 bottom-0 w-[300px] text-center z-1 overflow-auto pt-10 text-slate-500 text-sm'>请在画布上选中节点</div>
    }
    if (!settingEntry.fields.length) {
        return <div className='absolute top-0 right-0 bottom-0 w-[300px] text-center pt-10 z-1 overflow-auto text-slate-500 text-sm'>该组件暂无配置</div>
    }
    const items = settingEntry.fields.map(filed => {
        return {
            label: filed.title,
            key: filed.id,
            children: <SettingPanel target={filed} key={filed.id}/>
        }
    })

    return (
    <div className='absolute top-0 right-0 bottom-0 w-[300px] z-1 overflow-auto text-slate-500 text-sm'>
        <div className='border-b border-slate-200 px-3 py-2'>{componentsPath}</div>
        <div className='px-3'>
            <Tabs
                size="small"
                items={items}
                activeKey={activeTab} 
                onChange={onChangeTab}
            />
        </div>
    </div>
    )
})

export default RightArea
