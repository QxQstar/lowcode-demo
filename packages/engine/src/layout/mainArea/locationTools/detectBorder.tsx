import React, { useMemo } from 'react'

interface Props {
    type: 'solid' | 'dashed'
    position?: DOMRect
    show: boolean
}

export default function DetectBorder(props: Props) {
    const { type, position, show } = props

    const style = useMemo<React.CSSProperties>(() => {
        if (position && show) {
            return {
                borderStyle: type,
                left: position.left,
                width: position.width,
                height: position.height,
                top: position.top,
                display: 'block'
            }
        }
        return { display: 'none' }
    }, [show, position, type])

    return <div className='absolute border-none border-[#1890ff] z-1 pointer-events-none border-2' style={style}/>
}
