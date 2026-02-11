import type {CSSProperties, ReactNode} from 'react';

interface Props {
     style?: CSSProperties;
     children?: ReactNode;
     className?: string;
}

export function Row(props: Props) {
    return <div className={props.className} style={props.style}>{props.children}</div>
}
