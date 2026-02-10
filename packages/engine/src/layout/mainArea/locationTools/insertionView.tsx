import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { observableProject } from '../../..//shell'

export default observer(function InsertionView() {
    const [style, setStyle] = useState<React.CSSProperties>({})
    useEffect(() => {
        const insertRect = observableProject.designer.getInsertPointRect()
        if (!insertRect) {
            setStyle({})
        } else {
            const { width, left, top } = insertRect
            setStyle({
                borderTopStyle: 'solid',
                width,
                left,
                top
            })
        }
    }, [observableProject.designer.dragon.dropLocation])
    return (
        <div className='absolute border-none border-[hsl(155,92%,41%)] h-0 border-[2px] z-[1]' style={style}></div>
    )
})
