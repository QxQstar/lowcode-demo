import { useContext } from "react";
import { LayoutSchema } from 'vitis-lowcode-types'
import useDataSource from '../hooks/useDataSource'
import BaseComponentRenderer from './baseComponentRenderer'
import { PropsContext, ContainerDataContext, GlobalDataContext } from '../context'
import useHidden from '../hooks/useHidden'
import { RendererMode } from '../types'
import { generateAttrs } from '../generateAttr'

interface Props {
    schema: LayoutSchema
}

function Content(props: Props) {
    const { components, customEmptyElement, rendererMode} = useContext(PropsContext)
    const containerData = useContext(ContainerDataContext)
    const Component = components.get(props.schema.componentName)
    if (!Component) { return <div>未知的布局组件</div> }
    const { dataSource, pathToVal } = props.schema.extraProps
    const { data, loading } = useDataSource(dataSource, pathToVal, containerData.data)
    const attrs = generateAttrs(props.schema.props)

    return (
        <ContainerDataContext.Provider 
            value={{
                data,
                dataLoading: loading
            }}
        >
            <Component 
                {...attrs}
                data-node-id={props.schema.id}
            >
                {!props.schema.children.length ?
                customEmptyElement && rendererMode === RendererMode.design ? customEmptyElement(props.schema): null
                :
                props.schema.children.map(child => <BaseComponentRenderer schema={child} key={child.id}/>)
                }
            </Component>
        </ContainerDataContext.Provider>
    )
}

export default function LayoutComponent(props: Props) {
    const { rendererMode } = useContext(PropsContext)
    const { formData, pageData } = useContext(GlobalDataContext)
    const containerData = useContext(ContainerDataContext)

    const isHidden = useHidden({pageData, formData, containerData: containerData.data}, props.schema.extraProps.isHidden)

    if (isHidden) {
        if (rendererMode === RendererMode.design) {
            return <div className="opacity-10 flex-1">布局容器下的组件被隐藏了</div>
        } else {
            <Content {...props} schema={{...props.schema, children: []}}/>
        }
    }

    return <Content {...props}/>
}