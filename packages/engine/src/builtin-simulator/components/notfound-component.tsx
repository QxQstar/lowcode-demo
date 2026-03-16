import { NodeSchema } from 'vitis-lowcode-types';

export function NotfoundComponent(props: NodeSchema) {
    return <div>没有找到${props.componentName}</div>
}
