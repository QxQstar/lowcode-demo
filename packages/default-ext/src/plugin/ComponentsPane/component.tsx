import { useState, useEffect, useMemo, useCallback } from 'react'
import cn from 'classnames'
import { Popover } from 'antd';
import { SlackOutlined } from '@ant-design/icons';
import type { PluginContext, ComponentSpecInstance, NodeSchema } from 'vitis-lowcode-types'

// 常量定义：面板高度计算的偏移量和最小值
const PANEL_OFFSET_HEIGHT = 130;
const MIN_PANEL_HEIGHT = 200;

// 类型定义
type GroupKey = 'layout' | 'base' | 'subjoin';

interface GroupConfigItem {
    key: GroupKey;
    title: string;
}

// 组件分组配置
const GROUP_CONFIG: readonly GroupConfigItem[] = [
    { key: 'layout', title: '布局组件' },
    { key: 'base', title: '基础组件' },
    { key: 'subjoin', title: '高级组件' },
] as const;

interface ComponentGroupProps {
    title: string;
    components: ComponentSpecInstance[];
    onDragStart: (schema: NodeSchema) => void;
}

/**
 * 单个组件分组渲染组件
 * 负责渲染该分组下的所有组件片段(snippets)
 */
const ComponentGroup = ({ title, components, onDragStart }: ComponentGroupProps) => {
    // 扁平化获取所有 snippets，并过滤掉无效项
    const snippets = useMemo(() => {
        return components?.flatMap(item => item.snippets).filter(Boolean) || [];
    }, [components]);

    if (!snippets.length) {
        return null;
    }

    return (
        <div className='components-group mb-6'>
            <div className='text-sm font-bold text-gray-800 mb-3 pl-1'>{title}</div>
            <div className='flex flex-wrap gap-3'>
                {snippets.map(item => (
                    <div
                        key={item.title}
                        className='cursor-grab active:cursor-grabbing border border-gray-200 hover:border-blue-400 hover:shadow-sm rounded bg-white w-[100px] py-3 px-2 transition-all duration-200 flex flex-col items-center'
                        draggable={true}
                        onDragStart={() => onDragStart(item.schema)}
                    >
                        <img 
                            src={item.iconUrl} 
                            draggable={false} 
                            className='w-14 object-contain mb-4 select-none pointer-events-none' 
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

/**
 * 组件面板内容组件
 * 独立出来以分离关注点
 */
interface ComponentPanelContentProps {
    height: number;
    groupedComponents: Record<string, ComponentSpecInstance[]>;
    onDragStart: (schema: NodeSchema) => void;
}

const ComponentPanelContent = ({ height, groupedComponents, onDragStart }: ComponentPanelContentProps) => {
    return (
        <div 
            className='w-[460px] overflow-y-auto px-2 pb-4 scrollbar-thin scrollbar-thumb-gray-300' 
            style={{ height }}
        >
            {GROUP_CONFIG.map(group => (
                <ComponentGroup
                    key={group.key}
                    title={group.title}
                    components={groupedComponents[group.key]}
                    onDragStart={onDragStart}
                />
            ))}
        </div>
    );
};

const ComponentsPane = (props: PluginContext) => {
    const { project, dragon } = props;
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [panelHeight, setPanelHeight] = useState(300);

    // 监听窗口大小变化，动态调整面板高度
    useEffect(() => {
        const updateHeight = () => {
            // 动态计算高度，确保不小于最小值
            const newHeight = Math.max(MIN_PANEL_HEIGHT, document.body.clientHeight - PANEL_OFFSET_HEIGHT);
            setPanelHeight(newHeight);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const handleDragOver = useCallback(() => {
        setIsPanelOpen(false);
    }, []);

    // 监听设计器内的拖拽事件，开始拖拽时自动关闭面板
    useEffect(() => {
        if (!project) return;
        
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
        };

        if (!project?.assets) return groups;

        for (const instance of project.assets.values()) {
            // 确保 group 存在且在我们的配置中，否则可能需要放入默认分组或忽略
            // 这里假设 instance.group 是可靠的，或者我们只关心已知分组
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
                open={isPanelOpen}
                onOpenChange={setIsPanelOpen}
                content={
                    <ComponentPanelContent 
                        height={panelHeight}
                        groupedComponents={groupedComponents}
                        onDragStart={dragon.onNodeDataDragStart}
                    />
                }
            >
                <div 
                    className={cn(
                        'flex items-center justify-center h-8 rounded transition-colors duration-200 cursor-pointer',
                        isPanelOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    )}
                >
                    <SlackOutlined className="text-xl"/>
                </div>
            </Popover>
        </div>
    )
}

export default ComponentsPane
