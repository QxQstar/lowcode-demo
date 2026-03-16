export default {
  "componentName": "Title",
  "packageName": "vitis-lowcode-materials",
  "title": "标题",
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
    {
      "name": "level",
      "setter": {
        "name": "SelectSetter",
        "props": {
          "options": [
            {"label": "一级", "value": 1},
            {"label": "二级", "value": 2},
            {"label": "三级", "value": 3},
            {"label": "四级", "value": 4},
            {"label": "五级", "value": 5}
          ]
        }
      },
      "description": "重要程度",
    }
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
    title: '一级标题',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-title-1.png',
    schema: {
      componentName: 'Title',
      props: {
        level: 1,
        children: '一级标题',
      },
      children: []
    },
  },
  {
    title: '二级标题',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-title-2.png',
    schema: {
      componentName: 'Title',
      props: {
        level: 2,
        children: '二级标题',
      },
      children: []
    },
  },
  {
    title: '三级标题',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-title-3.png',
    schema: {
      componentName: 'Title',
      props: {
        level: 3,
        children: '三级标题',
      },
      children: []
    },
  },
  {
    title: '四级标题',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/typography-title-4.png',
    schema: {
      componentName: 'Title',
      props: {
        level: 4,
        children: '四级标题',
      },
      children: []
    },
  },
  ]
}