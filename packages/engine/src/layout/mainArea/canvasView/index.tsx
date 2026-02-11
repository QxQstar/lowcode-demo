import { useEffect, useState, useCallback } from 'react'
import { observableProject as project} from '../../../shell'
import { initCanvas } from './canvas-template'

const CanvasView = () => {
    const [canvasHtml, setCanvasHtml] =useState('')
    useEffect(() => {
        const importMap = {
            imports: {
                "react": "https://esm.sh/react@19.2.0",
                "react-dom": "https://esm.sh/react-dom@19.2.0",
                "react-dom/client": "https://esm.sh/react-dom@19.2.0/client",
                "react/jsx-runtime": "https://esm.sh/react@19.2.0/jsx-runtime",
                // FIXME: Hardcoded URL, should be configurable or dynamic
                "vitis-lowcode-renderer": "http://localhost:3000/index.es.js"
            }
        }

        const importStyles: string[] = [];
        const importScripts: string[] = ['https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'];

        setCanvasHtml(initCanvas(importMap, importStyles, importScripts).html);
    }, [])

    const handleIframeRef = useCallback((frame: HTMLIFrameElement | null) => {
        project.designer.host.mountContentFrame(frame)
    }, [])

    return (
        <div className='h-full relative z-[2]' ref={project.designer.mountViewport}>
            <iframe
                srcDoc={canvasHtml}
                className="border-none h-full w-full"
                ref={handleIframeRef}
            />
        </div>
    )
}

export default CanvasView
