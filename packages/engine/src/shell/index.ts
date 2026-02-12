import InnerSetters from '../setters'
import Setters from './setters'
import InnerPluginManger from '../plugins'
import PluginManager from './plugins'
import InnerSkeleton from '../skeleton'
import Skeleton from './skeleton'
import InnerProject from '../project'
import Project from './project'
import Dragon from './dragon'

export const observableSkeleton = new InnerSkeleton()
export const observableProject = new InnerProject()

export const setters = new Setters(new InnerSetters())
export const plugins = new PluginManager(new InnerPluginManger())
export const skeleton = new Skeleton(observableSkeleton)
export const project = new Project(observableProject)
export const dragon = new Dragon(observableProject.designer.dragon)
