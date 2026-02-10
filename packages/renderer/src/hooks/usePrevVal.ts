import { useEffect, useRef, useState } from 'react'

export default function usePrevVal<T>(status: T) {
    const ref = useRef<T | undefined>(undefined)
    const [prevVal, setPrevVal] = useState<T | undefined>(undefined)
    useEffect(() => {
        setPrevVal(ref.current)
        ref.current = status
    }, [status])

    return prevVal
}