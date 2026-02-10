import { createElement, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import type SettingField from '../../setting/SettingField'
import { setters } from "../../shell"

interface Props {
    field: SettingField
}

function getSetter(setterName: string) {
    const setter = setters.getSetter(setterName)
    return setter ? setter.view : undefined
}

export default observer(function SettingFieldView(props: Props) {
    const { field } = props
    const [index, setIndex] = useState<number>(0)
    
    const setter = field.setters ? getSetter(field.setters[index].name): undefined
    const val = field.getValue()
    const multiSetter = !!field.setters?.length && field.setters.length > 1
    const onChangeMenu = ({key}: {key: string}) => {
        const newIndex = field.setters!.findIndex(item => item.name === key)
        setIndex(newIndex)
        field.setValue(field.setters![newIndex].props?.defaultValue)
    }

    return (
        <div className='mb-[10px] flex items-start'>
            {field.title && <div className='grow-0 shrink-0 mr-[8px]'>{field.title}</div>}
            <div className='flex-1'>
                {
                 setter ? createElement(setter,{
                    ...field.setters![0].props,
                    field,
                    value: val !== undefined ? val: field.setters![index].props?.defaultValue,
                    onChange: field.setValue,
                    key: field.id,
                 }) : <div className='text-[#999]'>无可用的设置器</div>
                }
            </div>
            {multiSetter && 
            <Dropdown
            placement="topRight"
            menu={{
                items: field.setters.map(item => ({key: item.name, label: item.name})),
                onClick: onChangeMenu,
                activeKey: field.setters[index].name
            }}>
                <div className='grow-0 shrink-0 ml-[8px] cursor-pointer bg-[#1890ff] text-white px-[2px] rounded-[2px]'>
                    <EllipsisOutlined />
                </div>
            </Dropdown>
            }
        </div>
    )
})
