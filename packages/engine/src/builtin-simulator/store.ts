import { observable } from 'mobx'
import { IRendererProps } from 'vitis-lowcode-renderer'
import { getHost } from './utils'

const host = getHost()

export default observable<Pick<IRendererProps ,'schema'>>({
    schema: host?.project?.schema
})