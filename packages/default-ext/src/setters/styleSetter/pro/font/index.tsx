import Row from '../../components/row';
import Number from '../../components/number';
import type { StyleData, onStyleChange } from '../../utils/types';
import { Collapse, Select, Slider } from 'antd';
import ColorInput from '../../components/color-input';
import fontConfig from './config.json';
import { addUnit, isEmptyValue } from '../../utils';

const Panel = Collapse.Panel;

interface FontProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: string;
}

export default (props: FontProps) => {
  const { styleData, onStyleChange } = props;
  const { fontWeight, textAlign } = fontConfig;

  const onNumberChange = (styleKey: string, value?: number, unit?: string) => {
    onStyleChange([
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
    ]);
  };

  const opacityValue = !isEmptyValue(styleData.opacity) ? Math.floor(styleData.opacity * 100) : 0;

  return (
    <Collapse defaultActiveKey={['0']} size='small' className='mt-3!'>
      <Panel header="文字" className="" key="0">
        <div className="flex flex-row mb-2.5">
          <div className="flex flex-row items-center">
            <span className="w-[50px] mr-2.5">字号</span>
            <Number
              max={100}
              min={0}
              styleKey="fontSize"
              {...props}
              style={{ marginRight: '10px', width: '100%' }}
              useComputedStyle={true}
            />
          </div>
          <div className="flex flex-row items-center">
            <span className="w-[50px] mr-2.5">行高</span>
            <Number
              min={0}
              styleKey="lineHeight"
              {...props}
              style={{ width: '100%' }}
              useComputedStyle={true}
            />
          </div>
        </div>

        <Row title={'字重'} styleData={styleData} styleKey="" onStyleChange={() => {}}>
          <Select
            options={fontWeight.dataList}
            style={{ width: '100%' }}
            value={styleData.fontWeight}
            allowClear={true}
            size='small'
            onChange={(val) => onStyleChange([{ styleKey: 'fontWeight', value: val }])}
          />
        </Row>

        <Row title={'文字颜色'} styleKey="" {...props}>
          <ColorInput styleKey={'color'} {...props} inputWidth="100%" />
        </Row>

        <Row
          title={textAlign.title}
          dataList={textAlign.dataList}
          styleKey="textAlign"
          {...props}
        />

        <Row title={'不透明度'} styleKey="opacity" {...props}>
          <div className="flex flex-row flex-1">
            <Slider
              style={{ marginRight: '7px', width: '150px' }}
              value={opacityValue}
              step={1}
              onChange={(val) => onNumberChange('opacity', val / 100)}
            />
          </div>
        </Row>
      </Panel>
    </Collapse>
  );
};
