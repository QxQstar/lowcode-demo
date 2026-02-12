import { useState, useEffect, useMemo, useCallback } from 'react'
import cn from 'classnames'
import { Popover } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import type { PluginContext, ComponentSpecInstance } from 'vitis-lowcode-types'

// 组件分组配置
const GROUP_CONFIG = [
    { key: 'template', title: '模板' },
    { key: 'layout', title: '布局组件' },
    { key: 'base', title: '基础组件' },
    { key: 'subjoin', title: '高级组件' },
] as const;

interface ComponentGroupProps {
    title: string;
    components: ComponentSpecInstance[];
    onDragStart: (componentName: string) => void;
}

// 提取子组件以提升性能和可读性
const ComponentGroup = ({ title, components, onDragStart }: ComponentGroupProps) => {
    if (!components.length) {
        return null;
    }

    return (
        <div className='components-group mb-6'>
            <div className='text-sm font-bold text-gray-800 mb-3 pl-1'>{title}</div>
            <div className='flex flex-wrap gap-3'>
                {components.map(item => (
                    <div
                        key={item.componentName}
                        className='cursor-grab active:cursor-grabbing border border-gray-200 hover:border-blue-400 hover:shadow-sm rounded bg-white w-[100px] py-3 px-2 transition-all duration-200 flex flex-col items-center'
                        draggable={true}
                        onDragStart={() => onDragStart(item.componentName)}
                    >
                        <img 
                            src={item.iconUrl} 
                            draggable={false} 
                            className='w-8 h-8 object-contain mb-2 select-none pointer-events-none' 
                            alt={item.title}
                        />
                        <div className='text-xs text-gray-600 truncate w-full text-center' title={item.title}>
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const ComponentsPane = (props: PluginContext) => {
    const { project, dragon } = props;
    const [active, setActive] = useState(false);
    const [panelHeight, setPanelHeight] = useState(300);

    // 监听窗口大小变化，动态调整面板高度
    useEffect(() => {
        const updateHeight = () => {
            // 保持原有的布局计算逻辑 (document.body.clientHeight - 130)
            // 130 可能是顶部导航栏和底部状态栏的总高度
            setPanelHeight(Math.max(200, document.body.clientHeight - 130));
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const handleDragStart = useCallback((componentName: string) => {
        dragon.onNodeDataDragStart(componentName);
    }, [dragon]);

    const handleDragOver = useCallback(() => {
        setActive(false);
    }, []);

    // 监听设计器内的拖拽事件，开始拖拽时自动关闭面板
    useEffect(() => {
        project.on(project.DRAG_OVER, handleDragOver);
        return () => {
            project.off(project.DRAG_OVER, handleDragOver);
        }
    }, [project, handleDragOver]);

    // 使用 useMemo 对组件进行分组，避免每次渲染都重新计算
    const groupedComponents = useMemo(() => {
        const groups: Record<string, ComponentSpecInstance[]> = {
            layout: [],
            base: [],
            subjoin: [],
            template: []
        };

        // project.assets 是 Map<string, ComponentSpecInstance>
        for (const instance of project.assets.values()) {
            if (instance.group && groups[instance.group]) {
                groups[instance.group].push(instance);
            }
        }
        return groups;
    }, [project.assets]);

    return (
        <div className='components-pane'>
            <Popover
                trigger="click"
                placement="rightTop"
                open={active}
                onOpenChange={setActive}
                content={
                    <div 
                        className='w-[460px] overflow-y-auto px-2 pb-4 scrollbar-thin scrollbar-thumb-gray-300' 
                        style={{ height: panelHeight }}
                    >
                        {GROUP_CONFIG.map(group => (
                            <ComponentGroup
                                key={group.key}
                                title={group.title}
                                components={groupedComponents[group.key]}
                                onDragStart={handleDragStart}
                            />
                        ))}
                    </div>
                }
            >
                <div 
                    className={cn(
                        'flex items-center justify-center w-8 h-8 rounded transition-colors duration-200 cursor-pointer',
                        active ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    )}
                >
                    <AppstoreOutlined className="text-xl" />
                </div>
            </Popover>
        </div>
    )
}

export default ComponentsPane
