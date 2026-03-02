import type {CSSProperties, ReactNode} from 'react';

interface Props {
     style?: CSSProperties;
     children: ReactNode;
     className?: string;
}

export function Column(props: Props) {
    const {className, style, children, ...reset} = props
    return <div className={className} style={style} {...reset}>{children}</div>
}
