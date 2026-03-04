import { ReactNode } from "react";

export function Page (props: {children: ReactNode, style: any}) {
  const {children, style, ...rest} = props;

  return <div {...rest} style={style || {}} className="w-full h-full">{children}</div>
}