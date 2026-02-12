import { useState } from "react"
import type { LifeCycles } from 'vitis-lowcode-types'
import type { PluginContext } from 'vitis-lowcode-types'
import cn from 'classnames'
import { Popover, Button, Popconfirm } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import MonacoEditor from 'vitis-lowcode-monaco-editor'

const LIFECYCLE_CONFIG: Array<{ key: keyof LifeCycles; label: string }> = [
    { key: 'load', label: '应用加载之后' },
    { key: 'beforeunload', label: '应用卸载之前' },
    { key: 'unload', label: '应用卸载之后' },
    { key: 'visibilitychange', label: '应用可见性变化时' },
]

export default function LifeCyclesPane(props: PluginContext) {
    const [active, setActive] = useState<boolean>(false);
    const [lifeCycles, setLifeCycles] = useState<LifeCycles>(() => {
        return props.project.getLifeCycles()
    });

    const onOpenChange = (open: boolean) => {
        setActive(open)
        if (open) {
            setLifeCycles(props.project.getLifeCycles())
        }
    }

    const onCodeChange = (name: keyof LifeCycles) => (value: string) => {
        props.project.updateLifeCycles(name, {
            type: 'JSFunction',
            value
        })
        
        setLifeCycles(prev => ({
            ...prev,
            [name]: {
                type: 'JSFunction',
                value
            }
        }))
    }

    const onAddLifeCycle = (name: keyof LifeCycles) => () => {
        const defaultValue = `function on${name.charAt(0).toUpperCase() + name.slice(1)}() {\n  // TODO: Add your code here\n}`;
        const newLifeCycles = {
            ...lifeCycles,
            [name]: {
                type: 'JSFunction',
                value: defaultValue
            }
        };
        setLifeCycles(newLifeCycles);
        props.project.updateLifeCycles(name, {
            type: 'JSFunction',
            value: defaultValue
        });
    }

    const onDeleteLifeCycle = (name: keyof LifeCycles) => () => {
        const newLifeCycles = { ...lifeCycles };
        delete newLifeCycles[name];
        setLifeCycles(newLifeCycles);
        props.project.updateLifeCycles(name, undefined);
    }

    const renderLifecycleEditor = (item: { key: keyof LifeCycles; label: string }) => {
        const lifecycle = lifeCycles[item.key];
        const hasLifecycle = lifecycle !== undefined;

        return (
            <div key={item.key} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700 select-none">{item.label}</span>
                    <div className="space-x-2">
                        {!hasLifecycle ? (
                            <Button 
                                type="dashed" 
                                size="small" 
                                onClick={onAddLifeCycle(item.key)}
                                icon={<FormOutlined />}
                            >
                                添加
                            </Button>
                        ) : (
                            <Popconfirm
                                title="确定要删除吗？"
                                onConfirm={onDeleteLifeCycle(item.key)}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button 
                                    type="text" 
                                    danger
                                    size="small" 
                                    icon={<DeleteOutlined />}
                                />
                            </Popconfirm>
                        )}
                    </div>
                </div>
                {hasLifecycle ? (
                    <div className="border border-gray-200 rounded overflow-hidden shadow-sm" style={{ height: 200 }}>
                        <MonacoEditor 
                            value={lifecycle.value} 
                            language="javascript" 
                            onBlur={onCodeChange(item.key)} 
                            options={{
                                minimap: { enabled: false },
                                lineNumbers: 'off',
                                scrollBeyondLastLine: false,
                                tabSize: 2,
                            }}
                        />
                    </div>
                ) : (
                    <div className="text-gray-400 text-xs italic py-3 bg-gray-50 text-center rounded border border-dashed border-gray-200">
                        暂未配置
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className='lifeCycles-pane'>
            <Popover 
                trigger="click"
                placement="rightTop"
                content={
                    <div className='w-[450px] overflow-y-auto overflow-x-hidden pr-2' style={{ maxHeight: 'calc(100vh - 150px)' }}>
                        {LIFECYCLE_CONFIG.map(renderLifecycleEditor)}
                    </div>
                }
                onOpenChange={onOpenChange}
                open={active}
            >
                <FormOutlined className={cn('text-black/26 text-[22px] cursor-pointer hover:text-blue-500 transition-colors', { 'text-blue-500': active })}/>
            </Popover>
        </div>
    )
}