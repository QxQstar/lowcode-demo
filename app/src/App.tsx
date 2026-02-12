import { useRef, useEffect } from 'react'
import { init, setAssets } from 'vitis-lowcode-engine'
import meta from 'vitis-lowcode-materials/meta'

setAssets(meta)

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
