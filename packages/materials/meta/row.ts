export default {
  "componentName": "Row",
  "packageName": "vitis-lowcode-materials",
  "title": "行",
  "version": "1.1.0",
  "props": [],
  "group": "layout",
  "advanced": {
    "nestingRule": {
      "parentWhitelist": [
        "Page"
      ],
      "childWhitelist": ["Col"]
    },
    "supports": {
      "styles": true,
      "validation": false,
      "linkage": false,
      "events": []
    },
    "component": {
      "isContainer": true,
      "containerType": "Layout",
      "isFormControl": false
    }
  },
  snippets: [
    {
      title: "两栏",
      iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/1-1.png',
      schema: {
        componentName: "Row",
        packageName: "vitis-lowcode-materials",
        props: {
          warp: true,
          align: "middle",
          justify: "space-between"
        },
        children:[
          {
            componentName: "Col",
            packageName: "vitis-lowcode-materials",
            props: {
              span: 12
            },
            children: []
          },
          {
            componentName: "Col",
            packageName: "vitis-lowcode-materials",
            props: {
              span: 12
            },
            children: []
          }
        ]
      }
    },
    {
    title: '三栏',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/1-1-1.png',
    schema: {
      componentName: 'Row',
      props: {},
      children: [
        {
          componentName: 'Col',
          props: {
            span: 8,
          },
        },
        {
          componentName: 'Col',
          props: {
            span: 8,
          },
        },
        {
          componentName: 'Col',
          props: {
            span: 8,
          },
        },
      ],
    },
  },
  {
    title: '四栏',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/1-1-1-1.png',
    schema: {
      componentName: 'Row',
      props: {},
      children: [
        {
          componentName: 'Col',
          props: {
            span: 6,
          },
        },
        {
          componentName: 'Col',
          props: {
            span: 6,
          },
        },
        {
          componentName: 'Col',
          props: {
            span: 6,
          },
        },
        {
          componentName: 'Col',
          props: {
            span: 6,
          },
        },
      ],
    },
  },
  {
    title: '1:3',
    iconUrl: 'https://alifd.alicdn.com/fusion-cool/icons/icon-antd/1-3.png',
    schema: {
      componentName: 'Row',
      props: {},
      children: [
        {
          componentName: 'Col',
          props: {
            span: 6,
          },
        },
        {
          componentName: 'Col',
          props: {
            span: 18,
          },
        },
      ],
    },
  }
  ]
}