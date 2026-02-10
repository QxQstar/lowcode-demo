import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { Popover } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import type { DragonSpec } from 'vitis-lowcode-types'

interface ComponentItem {
    componentName: string;
    iconUrl: string;
    packageName: string;
    title: string;
}

const ComponentsPane: React.FC = () => {
    const [active, setActive] = useState(false);
    const [layoutComponents, setLayoutComponents] = useState<ComponentItem[]>([]);
    const [baseComponents, setBaseComponents] = useState<ComponentItem[]>([]);
    const [subjoinComponents, setSubjoinComponents] = useState<ComponentItem[]>([]);
    const [templates, setTemplates] = useState<ComponentItem[]>([]);
    const [height, setHeight] = useState(300);

    const onOpenChange = () => {
        setActive((prev) => !prev);
    }

    const updateAsset = () => {
        if (window.VitisLowCodeEngine) {
            const componentSpecRawMap = window.VitisLowCodeEngine.material.getAll()
            const layoutComponents: ComponentItem[] = []
            const subjoinComponents: ComponentItem[] = []
            const baseComponents: ComponentItem[] = []
            const templates: ComponentItem[] = []
            for(const [_,componentSpecRaw] of componentSpecRawMap) {
                const seg: ComponentItem = {
                    componentName: componentSpecRaw.componentName,
                    iconUrl: componentSpecRaw.iconUrl,
                    packageName: componentSpecRaw.packageName,
                    title: componentSpecRaw.title
                }
                if (componentSpecRaw.group === 'layout') {
                    layoutComponents.push(seg)
                } else if (componentSpecRaw.group === 'base') {
                    baseComponents.push(seg)
                } else if (componentSpecRaw.group === 'subjoin') {
                    subjoinComponents.push(seg)
                } else if (componentSpecRaw.group === 'template') {
                    templates.push(seg)
                }
            }

            setLayoutComponents(layoutComponents);
            setSubjoinComponents(subjoinComponents);
            setBaseComponents(baseComponents);
            setTemplates(templates);
        }
    }

    const onDragOver = () => {
        setActive(false);
    }

    useEffect(() => {
        updateAsset()
       
        if (window.VitisLowCodeEngine) {
            window.VitisLowCodeEngine.material.on(window.VitisLowCodeEngine.ASSET_UPDATED, updateAsset)
            window.VitisLowCodeEngine.project.on(window.VitisLowCodeEngine.DRAG_OVER, onDragOver)
        }

        setHeight(document.body.clientHeight - 130)

        return () => {
            if (window.VitisLowCodeEngine) {
                window.VitisLowCodeEngine.material.off(window.VitisLowCodeEngine.ASSET_UPDATED, updateAsset)
                window.VitisLowCodeEngine.project.off(window.VitisLowCodeEngine.DRAG_OVER, onDragOver)
            }
        }
    }, []);

    const onDragStart = ( packageName: string) => {
        if (window.VitisLowCodeEngine) {
            const dragon = window.VitisLowCodeEngine.dragon as DragonSpec
            dragon.onNodeDataDragStart(packageName)
        }
    }

    const renderComponentGroup = (title: string, components: ComponentItem[]) => {
        if (!components.length) {
            return null
        } else {
            return (
                <div className='components-group'>
                    <div className='text-sm font-bold'>{title}</div>
                    <div className='flex flex-wrap gap-2 text-center mt-2.5'>
                        {components.map(item => 
                        <div 
                            className='cursor-pointer border border-black/6 rounded-sm w-[100px]' 
                            draggable={true} 
                            key={item.packageName}
                            onDragStart={() => onDragStart(item.packageName)}
                        >
                            <img src={item.iconUrl} draggable={false} className='w-full'/>
                            <div className='text-sm mt-2.5 text-[#666]'>{item.title}</div>
                        </div>)
                        }
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='components-pane'>
            <Popover 
                trigger="click"
                placement="rightTop"
                content={<div className='w-[450px] overflow-auto' style={{height: height + 'px'}}>
                {renderComponentGroup('模板', templates)}
                {renderComponentGroup('布局组件', layoutComponents)}
                {renderComponentGroup('基础组件', baseComponents)}
                {renderComponentGroup('高级组件', subjoinComponents)}
                </div>}
                onOpenChange={onOpenChange}
                open={active}
            >
                <AppstoreOutlined className={cn('text-black/26 text-2xl cursor-pointer hover:text-inherit', { 'text-inherit': active })}/>
            </Popover>
        </div>
    )
}

export default ComponentsPane
