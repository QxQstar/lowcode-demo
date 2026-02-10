import { useEffect } from 'react'
import { PageSchema } from 'vitis-lowcode-types'
import { transformStringToFunction } from '../utils'

export default function useLifeCycles(lifeCycles: PageSchema['lifeCycles']) {
    useEffect(() => {
        let onbeforeunload = (_e: Event) => {}
        let onload = (_e: Event) => {}
        let onunload = (_e: Event) => {}
        let onvisibilitychange = (_e: Event) => {}

        if (lifeCycles.beforeunload && lifeCycles.beforeunload.value) {
            const func = transformStringToFunction(lifeCycles.beforeunload.value)
            
            if (typeof func === 'function') {
                onbeforeunload = (_e: Event) => {
                    try {
                        func(_e)
                    } catch (error) {
                        console.log(error)
                    }
                }
                window.addEventListener('beforeunload', onbeforeunload, false)
            }
        }

        if (lifeCycles.load && lifeCycles.load.value) {
            const func = transformStringToFunction(lifeCycles.load.value)
            
            if (typeof func === 'function') {
                onload = (_e: Event) => {
                    try {
                        func(_e)
                    } catch (error) {
                        console.log(error)
                    }
                }
                window.addEventListener('load', onload, false)
            }
        }

        if (lifeCycles.unload && lifeCycles.unload.value) {
            const func = transformStringToFunction(lifeCycles.unload.value)
            
            if (typeof func === 'function') {
                onunload = (_e: Event) => {
                    try {
                        func(_e)
                    } catch (error) {
                        console.log(error)
                    }
                }
                window.addEventListener('unload', onunload, false)
            }
        }

        if (lifeCycles.visibilitychange && lifeCycles.visibilitychange.value) {
            const func = transformStringToFunction(lifeCycles.visibilitychange.value)
            
            if (typeof func === 'function') {
                onvisibilitychange = (_e: Event) => {
                    try {
                        func(_e)
                    } catch (error) {
                        console.log(error)
                    }
                }
                document.addEventListener('visibilitychange', onvisibilitychange, false)
            }
        }

        return () => {
            document.removeEventListener('visibilitychange', onvisibilitychange, false)
            window.removeEventListener('unload', onunload, false)
            window.removeEventListener('load', onload, false)
            window.removeEventListener('beforeunload', onbeforeunload, false)
        }
    },[lifeCycles.beforeunload, lifeCycles.load, lifeCycles.unload, lifeCycles.visibilitychange])
}