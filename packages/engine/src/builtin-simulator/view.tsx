import { observer } from 'mobx-react-lite'
import { createElement } from 'react'
import { Renderer } from 'vitis-lowcode-renderer'
import { FunctionComponent, ComponentClass, ReactNode, Attributes } from 'react'
import { PageSchema, HostSpec } from 'vitis-lowcode-types'
import {loader} from './loader';
import { NotfoundComponent } from './components/notfound-component'
import { ContainerPlaceholder } from './components/container-placeholder'

export default observer((props: {schema: PageSchema, host: HostSpec}) => {
    const { host } = props;
    function customCreateElement<P extends {}>(type: FunctionComponent<P> | ComponentClass<P> | string, props?: Attributes & P | null, ...children: ReactNode[]) {
        const nodeId = props ? (props as any)['data-node-id']: undefined
        const node = nodeId?host.getNodeById(nodeId):undefined
        
        if (!node) return createElement(type, props, ...children);
        if (node.isContainer && children.filter(Boolean).length === 0) {
            return createElement(type, props, createElement(ContainerPlaceholder, {componentName: node.componentName}))
        }

        return createElement(type, props, ...children);
    }
    return <Renderer 
    {...props} 
    components={loader.components} 
    customCreateElement={customCreateElement} 
    notfoundComponent={NotfoundComponent}/>
});
