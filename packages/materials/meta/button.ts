import button1 from './button-1.png'
import button2 from './button-2.png'
import button3 from './button-3.png'
import button4 from './button-4.png'
import button5 from './button-5.png'
import button6 from './button-6.png'

export default {
  "componentName": "Button",
  "packageName": "vitis-lowcode-materials",
  "title": "按钮",
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
    title: '主按钮',
    iconUrl: button1,
    schema: {
      componentName: 'Button',
      props: {
        type: 'primary',
        children: '主按钮',
      },
    },
    children: []
  },
  {
    title: '次按钮',
    iconUrl: button2,
    schema: {
      componentName: 'Button',
      props: {
        type: 'default',
        children: '次按钮',
      },
      children: []
    },
  },
  {
    title: '危险按钮',
    iconUrl: button3,
    schema: {
      componentName: 'Button',
      props: {
        type: 'danger',
        children: '危险按钮',
      },
      children: []
    },
  },
  {
    title: '文字按钮',
    iconUrl: button4,
    schema: {
      componentName: 'Button',
      props: {
        type: 'text',
        children: '文字按钮',
      },
      children: []
    },
  },
  {
    title: '虚框按钮',
    iconUrl: button5,
    schema: {
      componentName: 'Button',
      props: {
        type: 'dashed',
        children: '虚框按钮',
      },
      children: []
    },
  },
  {
    title: '链接按钮',
    iconUrl: button6,
    schema: {
      componentName: 'Button',
      props: {
        type: 'link',
        children: '链接按钮',
      },
      children: []
    },
  },
  ]
}