export function ContainerPlaceholder(props: {componentName: string}) {
  if (props.componentName === 'Page') {
    return (
      <div className="w-full h-full flex justify-center pt-30! text-l text-slate-500">将组件拖到这里</div>
    )
  } else {
    return <div className="w-full h-15 text-center border-dotted! border! border-slate-500! text-slate-500 flex items-center justify-center bg-slate-50">将组件拖到这里</div>
  }
}
