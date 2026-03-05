import { useRef, useEffect } from 'react'
import { init, setAssets, plugins } from 'vitis-lowcode-engine'
import type { PluginContext } from 'vitis-lowcode-types';
import meta from 'vitis-lowcode-materials/meta'

//@ts-expect-error
setAssets(meta)

function Logo(ctx: PluginContext) {
  return {
    init() {
      ctx.skeleton.add({
          type: 'widget',
          name: "Logo",
          content: () => <div>LowCode</div>,
          area: "topLeft",
          pluginContext: ctx
      })
    }
  }
}

Logo.pluginName = "Logo"


plugins.register(Logo)

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
