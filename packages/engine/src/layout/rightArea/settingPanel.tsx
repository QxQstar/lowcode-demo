import type SettingField from '../../setting/SettingField'
import SettingFieldView from './settingFieldView'

interface Props {
    target: SettingField
}

export default function SettingPanel(props: Props) {
    return (
        <div className=''>
            {props.target.fields.map(field => {
                return <SettingFieldView field={field} key={field.id}/>
            })}
        </div>
    )
}
