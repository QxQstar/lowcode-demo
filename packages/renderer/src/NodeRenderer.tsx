import { useContext, FunctionComponent, ReactNode, createElement } from 'react';
import { NodeSchema } from 'vitis-lowcode-types';
import { RendererContext } from './context';

interface NodeRendererProps {
    schema: NodeSchema;
}

const NodeRenderer: FunctionComponent<NodeRendererProps> = ({ schema }) => {
    const context = useContext(RendererContext);

    if (!context) {
        throw new Error('NodeRenderer must be used within a RendererContext.Provider');
    }

    const { components, notfoundComponent, customCreateElement } = context;
    const { componentName, props, children, id } = schema;

    const Component = components.get(componentName) || notfoundComponent;
    
    if (Component === notfoundComponent) {
        return createElement(
            Component,
            { ...schema, key: id, 'data-node-id': id } as any,
        );
    } else {
        // Render children recursively
        const renderedChildren: ReactNode[] = (children || []).map((childSchema) => (
            <NodeRenderer key={childSchema.id} schema={childSchema} />
        ));
        console.log(componentName, renderedChildren)
        return customCreateElement(
            Component,
            { ...props, key: id, 'data-node-id': id } as any,
            ...renderedChildren
        );
    }
    
};

export default NodeRenderer;
