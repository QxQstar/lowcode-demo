export default {
  "componentName": "Image",
  "packageName": "vitis-lowcode-materials",
  "title": "图片",
  "version": "1.1.0",
  "props": [
    {
      "name": "src",
      "setter": {
        "name": "StringSetter",
      },
      "description": "图片地址",
    },
    {
      "name": "preview",
      "setter": {
        "name": "BoolSetter",
      },
      "description": "支持预览",
    },
    {
      "name": "width",
      "setter": {
        "name": "NumberSetter",
      },
      "description": "宽度",
    },
    {
      "name": "height",
      "setter": {
        "name": "NumberSetter",
      },
      "description": "高度",
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
    title: '图片',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/image-1.png',
    schema: {
      componentName: 'Image',
      props: {
        src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        height: 120,
        width: 120,
        preview: false,
      },
      children: []
    },
  }
  ]
}