import type { SetterCommonProps } from 'vitis-lowcode-types'
import { Switch } from 'antd'

export interface Props extends SetterCommonProps {
    // 在这里写设置器特有的props
    value: boolean
}


function BoolSetter(props: Props) {
    const onChange = (checked: boolean) => {
        if (props.onChange) {
            props.onChange(checked)
        }
    }

    return (
        <Switch 
            checked={props.value} 
            onChange={onChange}
            checkedChildren="是"
            unCheckedChildren="否"
            size="small"
        />
    )
}

export default {
    view: BoolSetter,
    name: "BoolSetter"
}