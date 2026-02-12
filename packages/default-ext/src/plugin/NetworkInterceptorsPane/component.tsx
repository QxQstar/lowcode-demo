import { useState, useMemo, useCallback } from "react"
import type { Interceptors, PluginContext } from 'vitis-lowcode-types'
import cn from 'classnames'
import { Popover, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import MonacoEditor from 'vitis-lowcode-monaco-editor'

const INTERCEPTOR_CONFIG = {
    request: {
        title: '请求拦截器',
        commit: `
        /**
           * axios 请求拦截器
           * @param config: AxiosRequestConfig
           * @returns: AxiosRequestConfig
        */
        `,
        body: `
        function requestInterceptor(config) {
            const token = localStorage.getItem('token')
            if (token) {
                if (!config.headers) {
                    config.headers = {}
                }
                config.headers.authorization = token;
            }
            return config;
        }
        `
    },
    response: {
        title: '响应拦截器',
        commit: `
        /**
            * axios 响应拦截器
            * @param responseData: AxiosResponse['data']
            * @returns: thenable | non-thenable
        */
        `,
        body: `
        function responseInterceptor(responseData){ 
            if (responseData.code !== '0') {
                return Promise.reject(responseData.msg)
            } else {
                if (responseData.data.token) {
                    localStorage.setItem('token', responseData.data.token)
                }
                return responseData.data
            }
        }
        `
    }
} as const;

export default function NetworkInterceptorsPane(props: PluginContext) {
    const { project } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [interceptors, setInterceptors] = useState<Interceptors | undefined>(() => {
        return project.getInterceptors()
    });

    const handleOpenChange = (visible: boolean) => {
        setIsOpen(visible);
        if (visible) {
            setInterceptors(project.getInterceptors());
        }
    }

    const handleUpdateInterceptor = useCallback((name: keyof Interceptors, value: string) => {
        const newInterceptor = {
            type: 'JSFunction' as const,
            value
        };

        project.updateInterceptors(name, newInterceptor);
        
        setInterceptors(prev => ({
            ...prev,
            [name]: newInterceptor
        }));
    }, [project]);

    const handleAddInterceptor = (name: keyof Interceptors) => () => {
        const config = INTERCEPTOR_CONFIG[name as keyof typeof INTERCEPTOR_CONFIG];
        const value = `
        ${config.commit}
        ${config.body}
        `;
        handleUpdateInterceptor(name, value);
    } 

    const handleEditorBlur = (name: keyof Interceptors) => (value: string) => {
        handleUpdateInterceptor(name, value);
    }

    const renderEditor = (name: keyof Interceptors) => {
        const config = INTERCEPTOR_CONFIG[name as keyof typeof INTERCEPTOR_CONFIG];
        const hasInterceptor = interceptors?.[name] !== undefined;

        return (
            <div className="mb-4 last:mb-0">
                <div className="mb-2 font-medium">{config.title}</div>
                {hasInterceptor ? (
                    <MonacoEditor 
                        value={interceptors![name]!.value} 
                        language="javascript" 
                        onBlur={handleEditorBlur(name)} 
                    />
                ) : (
                    <Button type="dashed" size="small" onClick={handleAddInterceptor(name)}>
                        添加
                    </Button>
                )}
            </div>
        );
    };

    const content = useMemo(() => (
        <div className='w-[450px] overflow-auto' style={{ height: 'calc(100vh - 130px)' }}>
            {renderEditor('request')}
            {renderEditor('response')}
        </div>
    ), [interceptors, handleUpdateInterceptor]);

    return (
        <div className='NetworkInterceptorsPane'>
            <Popover 
                trigger="click"
                placement="rightTop"
                content={content}
                onOpenChange={handleOpenChange}
                open={isOpen}
                destroyTooltipOnHide
            >
                <ClockCircleOutlined 
                    className={cn(
                        'text-black/26 text-[22px] cursor-pointer hover:text-inherit transition-colors', 
                        { 'text-inherit': isOpen }
                    )}
                />
            </Popover>
        </div>
    )
}