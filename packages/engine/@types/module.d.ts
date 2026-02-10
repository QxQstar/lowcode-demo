declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*?build=canvas' {
  const src: string
  export default src
}

declare interface Window {
  LCSimulatorHost: any
  SimulatorRenderer: any
}
