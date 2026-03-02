import renderer from './renderer'
fetch('http://127.0.0.1:7242/ingest/a6039d83-698c-45e4-976d-1119cc4f42ed',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'packages/engine/src/builtin-simulator/index.ts:1',message:'builtin-simulator index.ts executing',data:{windowExists: !!window, hasRenderer: !!window.SimulatorRenderer},timestamp:Date.now()})}).catch(()=>{});
// #endregion

window.SimulatorRenderer = renderer

export default renderer