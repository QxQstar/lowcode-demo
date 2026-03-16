export default {
  "componentName": "Row",
  "packageName": "vitis-lowcode-materials",
  "title": "行",
  "version": "1.1.0",
  "props": [
    {
      "name": "align",
      "setter": {
        "name": "SelectSetter",
        "props": {
          "options": [
            {"label": "上", "value": "top"},
            {"label": "中", "value": "middle"},
            {"label": "下", "value": "bottom"},
            {"label": "拉伸", "value": "stretch"}
          ]
        }
      },
      "description": "垂直对齐",
    },
    {
      "name": "gutter",
      "setter": {
        "name": "NumberSetter",
        "props": {
          "min": 0,
          "max": 24
        }
      },
      "description": "栅格间隔",
    },
    {
      "name": "justify",
      "description": "水平排列",
      "setter": {
        "name": "SelectSetter",
        "props": {
          "options": [
            {"label": "开始", "value": "start"},
            {"label": "结束", "value": "end"},
            {"label": "居中", "value": "center"},
            {"label": "等分", "value": "space-around"},
            {"label": "两端对其", "value": "space-between"}
          ]
        }
      },
    },
    {
      "name": "wrap",
      "description": "自动换行",
      "setter": {
        "name": "BoolSetter"
      }
    }
  ],
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