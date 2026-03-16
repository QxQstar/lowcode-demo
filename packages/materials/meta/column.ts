export default {
  "componentName": "Col",
  "packageName": "vitis-lowcode-materials",
  "title": "列",
  "version": "1.1.0",
  "props": [
    {
      "name": "span",
      "setter": {
        "name": "NumberSetter",
        "props": {
          "min": 0,
          "max": 24
        }
      },
      "description": "占位格数",
    },
    {
      "name": "pull",
      "setter": {
        "name": "NumberSetter",
        "props": {
          "min": 0,
          "max": 24
        }
      },
      "description": "左偏移",
    },
    {
      "name": "push",
      "setter": {
        "name": "NumberSetter",
        "props": {
          "min": 0,
          "max": 24
        }
      },
      "description": "右偏移",
    }
  ],
  "group": "layout",
  "advanced": {
    "nestingRule": {
      "parentWhitelist": [
        "Row"
      ]
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
  snippets: []
}