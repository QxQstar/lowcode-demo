export default {
  "componentName": "Row",
  "packageName": "vitis-lowcode-materials",
  "title": "行",
  "iconUrl": "https://unpkg.com/vitis-lowcode-row@latest/img/icon.png",
  "description": "这是一个行组件",
  "docUrl": "https://unpkg.com/vitis-lowcode-row@1.0.0/docs/index.html",
  "version": "1.1.0",
  "props": [],
  "group": "layout",
  "advanced": {
    "nestingRule": {
      "parentWhitelist": [
        "Page"
      ],
      "childWhitelist": ["Column"]
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
  }
}