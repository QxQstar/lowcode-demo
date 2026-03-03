import { project } from "../shell"
import type Project from "./index"
import { HostSpec, SimulatorSpec, Point } from 'vitis-lowcode-types'
import { isDragDataNode } from './dragon'
import { DragObjectType } from "../types"
import { reaction } from 'mobx'

export default class Host implements HostSpec {
    frameDocument?: Document | null
    frameWindow?: Window | null
    readonly project: Project
    private renderer?: SimulatorSpec
    cachedUnloadedAssets: string[] = []

    constructor(project: Project) {
        this.project = project
        reaction(() => this.project.schema, () => {
            this.rerender();
        })
    }

    mountContentFrame = async (frame: HTMLIFrameElement | null) => {
        if (!frame) {
            return 
        }

        frame.addEventListener('load', () => {
            this.frameDocument = frame.contentDocument
            this.frameWindow = frame.contentWindow

            this.frameWindow!.LCSimulatorHost = this

             const renderer = this.frameWindow!.SimulatorRenderer
            if (renderer) {
                this.renderer = renderer
                this.renderer?.setupHost(this);
                this.setupComponents([])
                this.setupEvent()
                this.renderer?.rerender()
            }
        })
    }

    private setupEvent = () => {
        this.frameDocument?.addEventListener('dragover', (e: DragEvent) => {
            e.preventDefault()
            project.emit(project.DRAG_OVER)
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
            e.preventDefault()
            e.stopPropagation()
            const {dragObject, dropLocation} = this.project.designer.dragon
            if (dragObject && dropLocation) {
                if (isDragDataNode(dragObject)) {
                    const node = this.project.documentModel.createNode(dragObject.data, dropLocation.containerNode)
                    dropLocation.containerNode.inertChildAtIndex(node, dropLocation.index)
                    this.project.designer.selectNode(node.id)
                } else {
                    dragObject.node.parent?.delChild(dragObject.node)
                    dropLocation.containerNode.inertChildAtIndex(dragObject.node, dropLocation.index)
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

    async setupComponents(url: string[]) {
        this.cachedUnloadedAssets.push(...url);
        if (!this.renderer || this.cachedUnloadedAssets.length === 0) {
            return;
        }
        await this.renderer?.loadAssets(this.cachedUnloadedAssets);
        this.cachedUnloadedAssets = [];
    }
}