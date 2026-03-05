import { ElementType, FunctionComponent, ComponentClass, ReactNode, ReactElement, Attributes } from 'react';
import { PageSchema, NodeSchema } from 'vitis-lowcode-types';

export interface RendererProps extends RendererContextType{
    schema: PageSchema;
}

export interface RendererContextType {
    components: Map<string, ElementType>;
    notfoundComponent: FunctionComponent<NodeSchema>;
    customCreateElement: <P extends {}>(
        type: FunctionComponent<P> | ComponentClass<P> | string,
        props?: Attributes & P | null,
        ...children: ReactNode[]
    ) => ReactElement<P>;
}
