export default {
  "componentName": "Text",
  "packageName": "vitis-lowcode-materials",
  "title": "文本",
  "version": "1.1.0",
  "props": [
    {
      "name": "delete",
      "setter": {"name": "BoolSetter"},
      "description": "删除线样式",
    },
    {
      "name": "copyable",
      "setter": {"name": "BoolSetter"},
      "description": "可拷贝",
    },
    {
      "name": "disabled",
      "setter": {"name": "BoolSetter"},
      "description": "禁用",
    },
    {
      "name": "editable",
      "setter": {"name": "BoolSetter"},
      "description": "可编辑",
    },
    {
      "name": "ellipsis",
      "setter": {"name": "BoolSetter"},
      "description": "自动溢出省略",
    },
  ],
  "group": "base",
  "advanced": {
    "supports": {
      "styles": true,
      "validation": false,
      "linkage": false,
      "events": []
    },
    "component": {
      "isFormControl": false
    }
  },
  snippets: [
    {
    title: '文本',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-text-1.png',
    schema: {
      componentName: 'Text',
      props: {
        children: 'text',
      },
    },
  },
  {
    title: '可复制文本',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-text-2.png',
    schema: {
      componentName: 'Text',
      props: {
        copyable: true,
        children: 'text',
      },
    },
  },
  {
    title: '可编辑文本',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-text-3.png',
    schema: {
      componentName: 'Text',
      props: {
        editable: true,
        children: 'text',
      },
      children: []
    },
  },
  ]
}