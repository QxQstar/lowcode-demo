import type { ElementType, ReactNode } from 'react'
import type { PluginContext } from './plugins';

export interface SkeletonSpec {
    add(config: WidgetConfig): WidgetSpec | undefined;
    remove(area: WidgetConfigArea, name: string): boolean
}

export interface WidgetConfig {
    type: 'panelDock' | 'panel' | 'widget'
    name: string;
    area: WidgetConfigArea;
    content: ElementType<any>;
    pluginContext: PluginContext;
}

export type WidgetConfigArea = 'left' | 'toolbar' | 'bottom' | 'topLeft' | 'topCenter' | 'topRight'

export interface WidgetSpec {
    readonly name: string;
    readonly content: ReactNode;
    visible: boolean;
    readonly config: WidgetConfig;

    show(): void;
    hide(): void;
    toggle(): void;
}