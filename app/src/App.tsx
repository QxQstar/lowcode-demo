import { useRef, useEffect } from 'react'
import { init } from 'vitis-lowcode-engine'

function App() {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (box.current) {
      init(box.current);
    }
  }, []);

  return (
   <div ref={box} className='h-full w-full'/>
  )
}

export default App
