import { FunctionComponent } from 'react';
import { RendererProps } from './types';
import { RendererContext } from './context';
import NodeRenderer from './NodeRenderer';

const Renderer: FunctionComponent<RendererProps> = ({
    schema,
    components,
    notfoundComponent,
    customCreateElement,
}) => {
    return (
        <RendererContext.Provider
            value={{
                components,
                notfoundComponent,
                customCreateElement,
            }}
        >
            <NodeRenderer schema={schema} />
        </RendererContext.Provider>
    );
};

export default Renderer;
