import type { SettersSpec } from './setter'
import type { SkeletonSpec } from './skeleton'

export interface  PluginConfig{
    init(): void;
    destroy?(): void;
}

export interface PluginConfigCreator {
    (ctx: PluginContext, options: any): PluginConfig;
    pluginName: string;
}

export interface PluginManagerSpec {
    register(pluginConfigCreator: PluginConfigCreator , options?: any): Promise<void>;
    delete(pluginName: string): Promise<boolean> 
    has(pluginName: string): boolean
    get(pluginName: string): LowCodePlugin | undefined
    getAll(): Map<string, LowCodePlugin>
}

export interface PluginContext{
    skeleton: SkeletonSpec;
    plugins: PluginManagerSpec;
    setters: SettersSpec;
}

export interface LowCodePlugin {
    pluginName:  string;
    config: PluginConfig;
    options: any
}