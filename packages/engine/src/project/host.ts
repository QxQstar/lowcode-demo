import { project, material, setters } from "../shell"
import { DRAG_OVER } from '../eventType'
import type Project from "./index"
import { HostSpec, SimulatorSpec, ComponentSpecRaw, Point } from 'vitis-lowcode-types'
import { getComponentImplUrl, getComponentSetterMap, getComponentImplFromWin } from '../utils'
import { isDragDataNode } from './dragon'
import { DragObjectType } from "../types"

export default class Host implements HostSpec {
    frameDocument?: Document | null
    frameWindow?: Window | null
    readonly project: Project
    private renderer?: SimulatorSpec

    constructor(project: Project) {
        this.project = project

    }

    onAssetUpdated = async (additionalPackageNames: string[]) => {
        const materialMap = new Map<string, ComponentSpecRaw>()
        additionalPackageNames.forEach(name => {
            if (material.has(name)) {
                materialMap.set(name, material.get(name)!)
            }
        })
        const assetBundles = this.getSimulatorComponentAssets(materialMap);
        await Promise.allSettled(assetBundles.map(asset => {
            return new Promise<void>((res, rej) => {
                if (this.frameDocument) {
                    const script = this.frameDocument.createElement('script')
                    script.onload = () => {
                        script.onload = null
                        script.onerror = null
                        res()
                    }
                    script.onerror = () => {
                        script.onload = null
                        script.onerror = null
                        rej()
                    }
                    this.frameDocument.body.append(script)
                    script.src = asset.url
                } else {
                    res() 
                }
            })
        }))

        this.registerComponentSetters(assetBundles)
        this.collectComponentImpl(assetBundles)
        this.rerender()
    }

    mountContentFrame = async (frame: HTMLIFrameElement | null) => {
        if (!frame) {
            return 
        }

        this.frameDocument = frame.contentDocument
        this.frameWindow = frame.contentWindow
        

        frame.addEventListener('load', () => {
            this.frameWindow!.LCSimulatorHost = this

             const renderer = this.frameWindow!.SimulatorRenderer
            if (renderer) {
                this.renderer = renderer
                this.setupEvent()
                this.renderer?.rerender()
                this.renderer?.run()
            }
        })
        

        
    }

    private setupEvent = () => {
        this.frameDocument?.addEventListener('dragover', (e: DragEvent) => {
            e.preventDefault()
            project.emit(DRAG_OVER)
            this.project.designer.dragon.onDragOver(e)
        })

        this.frameDocument?.addEventListener('dragstart', (e: DragEvent) => {
            const node = this.getNodeByDOMElem(e.target as HTMLElement)
            if (node) {
                this.project.designer.dragon.onDragStart({
                    type: DragObjectType.Node,
                    node
                })
            }
        })

        this.frameDocument?.addEventListener('mousemove', (e: MouseEvent) => {
            const node = this.project.designer.host.getClosestNodeByLocation(e)
            this.project.documentModel.hoverNode(node?.id)
            this.project.designer.detection.computeHoveredPosition(node?.id)
            
        })

        this.frameDocument?.addEventListener('mouseleave', (_: MouseEvent) => {
            this.project.designer.detection.computeHoveredPosition()
        }, false)


        this.frameDocument?.addEventListener('drop', async (e: DragEvent) => {
            const {dragObject, dropLocation} = this.project.designer.dragon
            if (dragObject && dropLocation) {
                if (isDragDataNode(dragObject)) {
                    let schema = dragObject.data.schema
                    console.log(schema,'schema')
                    if (!Array.isArray(schema)) {
                        schema = [schema]
                    }
                    let start = dropLocation.index
                    let lastNodeId: string | undefined
                    schema.forEach(item => {
                        const node = this.project.documentModel.createNode(item, dropLocation.containerNode)
                        dropLocation.containerNode.inertChildAtIndex(node, start)
                        start ++
                        lastNodeId = node.id
                    })
                    if (lastNodeId) {
                        await this.rerender()
                        this.project.designer.selectNode(lastNodeId)
                    }
                   
                } else {
                    dragObject.node.parent?.delChild(dragObject.node)
                    dropLocation.containerNode.inertChildAtIndex(dragObject.node, dropLocation.index)
                    await this.rerender()
                    this.project.designer.selectNode(dragObject.node.id)
                }
            }
            this.project.designer.dragon.onDragEnd(e)
        })

        this.frameDocument?.addEventListener('mouseup', (e: MouseEvent) => {
            const nodeId = this.getClosestNodeByLocation(e)?.id
            this.project.designer.selectNode(nodeId)
        })
    }

    private getNodeByDOMElem = (domElem: HTMLElement | null) => {
        if (domElem) {
            const noId = this.renderer?.getNodeIdByDOMElem(domElem)

            return noId ? this.project.documentModel.getNode(noId): undefined
        }
    }

    private getSimulatorComponentAssets = (assetMap: Map<string, ComponentSpecRaw>) => {
        const result: {packageName: string, componentName: string, url: string}[] = []

        for (const [, spec] of assetMap) {
            // 模板没有组件实现，只有组件规格
            if (spec.group !== 'template') {
                result.push({
                    packageName: spec.packageName,
                    componentName: spec.componentName,
                    url: getComponentImplUrl({npm: spec.packageName, version: spec.version})
                })
            }
        }

        return result
    }

    /**
     * 注册组件包自带的设置器
     */
    private registerComponentSetters = (assetBundles: {packageName: string, componentName: string, url: string}[]) => {
        assetBundles.forEach(bundle => {
            const innerSetterMap = getComponentSetterMap(this.frameWindow!, bundle)
            for (const key of Object.keys(innerSetterMap)) {
                setters.register({
                    name: `${bundle.packageName}/${key}`,
                    view: innerSetterMap[key],
                })
            }
        })
    }

    /**
     * 收集低代码组件的实现
     * @param assetBundles 
     */
    private collectComponentImpl = (assetBundles: {packageName: string, componentName: string, url: string}[]) => {
        const componentMap = new Map()

        assetBundles.forEach(bundle => {
            const impl = getComponentImplFromWin(this.frameWindow!, bundle)
            if (impl) {
                componentMap.set(bundle.componentName, impl)
            }
        })

        this.project.designer.addComponentsImpl(componentMap)
    }

    getClosestNodeByLocation = (point: Point) => {
        const id = this.renderer?.getClosestNodeIdByLocation(point)
        return id ? this.project.documentModel.getNode(id): undefined
    }

    getNodeRect = (nodeId: string) => {
        return this.renderer?.getNodeRect(nodeId)
    }

    rerender = async () => {
        await this.renderer?.rerender()
    }
}