import { useState, useLayoutEffect, useEffect, useMemo, useCallback } from "react"
import MonacoEditor from 'vitis-lowcode-monaco-editor'
import { SnippetsOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import type { PageSchema, PluginContext } from 'vitis-lowcode-types'

const EDITOR_PADDING_OFFSET = 130;

export default function SchemaPane(props: PluginContext) {
    const { project } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [editorHeight, setEditorHeight] = useState(0);
    const [pageSchema, setPageSchema] = useState<PageSchema>();

    const updateHeight = useCallback(() => {
        setEditorHeight(document.body.clientHeight - EDITOR_PADDING_OFFSET);
    }, []);

    useLayoutEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [updateHeight]);

    useEffect(() => {
        const handleSchemaUpdate = () => {
            setPageSchema(project.getSchema());
        };

        handleSchemaUpdate();

        project.on(project.SCHEMA_UPDATED, handleSchemaUpdate);
        
        return () => {
            project.off(project.SCHEMA_UPDATED, handleSchemaUpdate);
        };
    }, [project]);

    const formattedSchema = useMemo(() => {
        if (!pageSchema) return '';
        try {
            return JSON.stringify(pageSchema, undefined, 2);
        } catch (error) {
            console.error('Failed to stringify schema:', error);
            return '{}';
        }
    }, [pageSchema]);

    const handleOpenChange = useCallback((visible: boolean) => {
        setIsOpen(visible);
    }, []);

    const editorOptions = useMemo(() => ({
        readOnly: true,
        height: `${editorHeight}px`,
        minimap: { enabled: false },
        automaticLayout: true,
    }), [editorHeight]);

    const popoverContent = (
        <div className="w-[450px] overflow-hidden">
            {isOpen && (
                <MonacoEditor 
                    key={editorHeight} 
                    language="json" 
                    value={formattedSchema} 
                    options={editorOptions}
                />
            )}
        </div>
    );

    return (
        <div>
            <Popover 
                trigger="click"
                placement="rightTop"
                content={popoverContent}
                onOpenChange={handleOpenChange}
                open={isOpen}
            >
                <SnippetsOutlined />
            </Popover>
        </div>
    );
}
