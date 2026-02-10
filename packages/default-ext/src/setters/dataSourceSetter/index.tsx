import React from 'react'
import type { SetterCommonProps,JSDataSource, JSFunction } from 'vitis-lowcode-types'
import { Input } from 'antd';
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import MonacoEditorModel from '../_commpents/MonacoEditorModel'


export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: JSDataSource | undefined;
    onChange?: (val?: JSDataSource) => void;
}


function DataSourceSetter(props: Props) {
    const dataSourceVal = (props.value?.value || {
        url: '',
        method: 'GET'
    })
    const url = dataSourceVal.url
    const method = dataSourceVal.method
    const requestHandlerVal = dataSourceVal.requestHandler?.value || ''
    const responseHandlerVal = dataSourceVal.responseHandler?.value || ''

    const onChange = (key: keyof JSDataSource['value'], val:string | JSFunction) => {
        if(props.onChange) {
            props.onChange({
                type: 'DataSource',
                value: {
                    ...dataSourceVal,
                    [key]: val
                }
            })
        }
    }

    const onChangeUrl = (e:React.ChangeEvent<HTMLInputElement>) => {
        onChange('url',e.target.value)
    }

    const onChangeMethod = (e:RadioChangeEvent) => {
        onChange('method',e.target.value)
    }

    const onChangeHandler = (key: 'requestHandler' | 'responseHandler',value: string) => {
        onChange(key, {
            type: 'JSFunction',
            value
        })
    }

    return (
        <div>
            <div className='flex mb-2.5'>
                <span className='flex-1 text-red-500'>这里的配置将发送网络请求</span>
            </div>
            <div className='flex mb-2.5'>
                <span className='mr-1.5 text-[#333] text-sm'>
                    URL
                    <span className='text-red-500 text-xs p-0.5'>*</span>
                </span>
                <span className='flex-1'>
                    <Input size="small" value={url} onChange={onChangeUrl}/>
                </span>
            </div>

            <div className='flex mb-2.5'>
                <span className='mr-1.5 text-[#333] text-sm'>
                    请求方式
                    <span className='text-red-500 text-xs p-0.5'>*</span>
                </span>
                <span className='flex-1'>
                    <Radio.Group  size="small" value={method} onChange={onChangeMethod}>
                        <Radio value='GET' key='GET'>GET</Radio>
                        <Radio value='POST' key='POST'>POST</Radio>
                    </Radio.Group>
                </span>
            </div>
            <div className='flex mb-2.5'>
                <span className='mr-1.5 text-[#333] text-sm'>请求处理器</span>
                <span className='flex-1'>
                    <MonacoEditorModel 
                        language="javascript" 
                        isUnfold={false} 
                        title='请求处理器' 
                        value={requestHandlerVal} 
                        onChange={(v: string) => onChangeHandler('requestHandler',v)}
                    />
                </span>
            </div>
            
            <div className='flex mb-2.5'>
                <span className='mr-1.5 text-[#333] text-sm'>响应处理器</span>
                <span className='flex-1'>
                    <MonacoEditorModel 
                        language="javascript" 
                        isUnfold={false} 
                        title='响应处理器' 
                        value={responseHandlerVal} 
                        onChange={(v: string) => onChangeHandler('responseHandler',v)}
                    />
                </span>
            </div>
        </div>
    )
}

export default {
    view: DataSourceSetter,
    name: "DataSourceSetter"
}