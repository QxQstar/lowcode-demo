import { observer } from 'mobx-react-lite'
import { Renderer, IRendererProps } from 'vitis-lowcode-renderer'
import { useEffect } from 'react'
import observerData from './store'
import { deferUtil } from './utils'
import {loader} from './loader';

export default observer((props: Omit<IRendererProps ,'components' | 'schema'>) => {
    useEffect(() => {
        deferUtil.resolvedRender()
    }, [observerData.schema])
    return <Renderer {...props} components={loader.components} {...observerData}/>
});
