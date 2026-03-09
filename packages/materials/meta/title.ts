export default {
  "componentName": "Title",
  "packageName": "vitis-lowcode-materials",
  "title": "标题",
  "version": "1.1.0",
  "props": [],
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