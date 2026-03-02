import { observer } from 'mobx-react-lite'
import { Renderer, IRendererProps } from 'vitis-lowcode-renderer'
import {loader} from './loader';

export default observer((props: Omit<IRendererProps ,'components'>) => {
    return <Renderer {...props} components={loader.components}/>
});
