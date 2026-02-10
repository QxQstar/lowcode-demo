import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Breadcrumb, Tabs } from 'antd';
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

    const renderBreadcrumb = () => {
        const items: {label: string; key: string}[] = []
        let node = props.designer?.settingTopEntry?.owner
        while (node) {
            items.push({
                label: node.title,
                key: node.id
            })
            node = node.parent
        }

        return (
            <Breadcrumb>
                <Breadcrumb.Item menu={{ items }}>组件</Breadcrumb.Item>
            </Breadcrumb>
        )
    }

    const settingEntry = props.designer?.settingTopEntry
    if (!settingEntry) {
        return <div className='absolute top-0 right-0 bottom-0 w-[300px] p-[10px] z-[1] overflow-auto'>请在画布上选中节点</div>
    }
    if (!settingEntry.fields.length) {
        return <div className='absolute top-0 right-0 bottom-0 w-[300px] p-[10px] z-[1] overflow-auto'>该组件暂无配置</div>
    }
    const items = settingEntry.fields.map(filed => {
        return {
            label: filed.title,
            key: filed.id,
            children: <SettingPanel target={filed} key={filed.id}/>
        }
    })

    return (
    <div className='absolute top-0 right-0 bottom-0 w-[300px] p-[10px] z-[1] overflow-auto'>
        {renderBreadcrumb()}
        <Tabs
            size="small"
            items={items}
            activeKey={activeTab} 
            onChange={onChangeTab}
        />
    </div>
    )
})

export default RightArea
