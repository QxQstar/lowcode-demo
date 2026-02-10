import { useState, useEffect } from 'react';
import Row from '../../components/row';
import Icon from '../../components/icon';
import Number from '../../components/number';
import ColorInput from '../../components/color-input';
import type { StyleData, onStyleChange } from '../../utils/types';
import { Collapse, Slider, Select } from 'antd';
import fontConfig from './config.json';
import { addUnit, removeUnit } from '../../utils';

const Option = Select.Option;
const Panel = Collapse.Panel;

const BORDER_MAX = 30;

const BorderDirectionMap = {
  borderLeft: 'borderLeft',
  borderRight: 'borderRight',
  borderTop: 'borderTop',
  borderBottom: 'borderBottom',
  border: 'border',
};

interface fontProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: string;
}
export default (props: fontProps) => {
  const { styleData, onStyleChange, unit } = props;
  const { borderType } = fontConfig;
  const [selBorderType, setSelBorderType] = useState<string>();
  const [borderDirection, setBorderDirection] = useState<string | null>(null);

  useEffect(() => {
    if (!borderDirection) {
      for (let key in styleData) {
        for (let borderDirectionKey in BorderDirectionMap) {
          if (key.indexOf(borderDirectionKey) >= 0) {
            setBorderDirection(borderDirectionKey);
            return;
          }
        }
      }
    }
  }, [styleData]);

  const onChangeBorderType = (styleDataList: Array<StyleData>) => {
    if (styleDataList) {
      setSelBorderType(styleDataList[0].value as string);
    }
  };

  const onRangeChange = (styleKey: string, value: number, unit?: string) => {
    onStyleChange([
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
    ]);
  };

  const onIconClick = (styleKey: string) => {
    setBorderDirection(styleKey);
  };

  const onBorderTypeChange = (styleKey: string, value: string) => {
    onStyleChange([
      {
        styleKey,
        value,
      },
    ]);
  };

  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header="边框" className="" key="0">
        <Row
          title={borderType.title}
          dataList={borderType.dataList}
          styleKey={'borderType'}
          {...props}
          onStyleChange={onChangeBorderType}
          value={selBorderType}
        />

        {selBorderType == 'fixedBorder' && (
          <Row title={' '} styleKey="borderRadius" {...props}>
            <div className="flex flex-row flex-1">
              <Slider
                max={BORDER_MAX}
                value={removeUnit(styleData.borderRadius)}
                onChange={(val) => onRangeChange('borderRadius', val, unit)}
              />

              <Number
                styleKey="borderRadius"
                style={{ minWidth: '60px', marginLeft: '5px' }}
                {...props}
                max={BORDER_MAX}
              />
            </div>
          </Row>
        )}

        {selBorderType == 'partBorder' && (
          <>
            <Row
              title={' '}
              styleKey="borderRadius"
              {...props}
              contentStyle={{ justifyContent: 'space-between' }}
            >
              <div className="flex flex-row items-center">
                <Icon type="icon-radius-upleft" className="mr-0.5" />
                <Number
                  max={BORDER_MAX}
                  min={0}
                  styleKey="borderTopLeftRadius"
                  {...props}
                  style={{ width: '60px' }}
                />
              </div>
              <div className="flex flex-row items-center">
                <Icon type="icon-radius-upright" className="mr-0.5" />
                <Number
                  max={BORDER_MAX}
                  styleKey="borderTopRightRadius"
                  {...props}
                  style={{ width: '60px' }}
                />
              </div>
            </Row>
            <Row
              title={' '}
              styleKey="borderRadius"
              {...props}
              contentStyle={{ justifyContent: 'space-between' }}
            >
              <div className="flex flex-row items-center">
                <Icon type="icon-radius-bottomleft" className="mr-0.5" />
                <Number
                  max={BORDER_MAX}
                  styleKey="borderBottomLeftRadius"
                  {...props}
                  style={{ width: '60px' }}
                />
              </div>
              <div className="flex flex-row items-center">
                <Icon type="icon-radius-bottomright" className="mr-0.5" />
                <Number
                  max={BORDER_MAX}
                  styleKey="borderBottomRightRadius"
                  {...props}
                  style={{ width: '60px' }}
                />
              </div>
            </Row>
          </>
        )}

        <Row title={'边框'} styleKey="borderRadius" {...props}>
          <div className="flex flex-row items-center flex-1 justify-between">
            <div className="border-icon-container">
              <div className="ml-5">
                <div
                  className={
                    borderDirection === BorderDirectionMap.borderTop
                      ? 'text-[#5584ff] cursor-pointer'
                      : 'cursor-pointer'
                  }
                  onClick={() => onIconClick('borderTop')}
                >
                  <Icon type="icon--shangbiankuang" />
                </div>
              </div>
              <div className="flex flex-row">
                <div
                  className={
                    borderDirection === BorderDirectionMap.borderLeft
                      ? 'text-[#5584ff] cursor-pointer'
                      : 'cursor-pointer'
                  }
                  onClick={() => onIconClick('borderLeft')}
                >
                  <Icon type="icon--zuobiankuang" />
                </div>

                <div
                  className={
                    borderDirection === BorderDirectionMap.border
                      ? 'text-[#5584ff] cursor-pointer'
                      : 'cursor-pointer'
                  }
                  onClick={() => onIconClick('border')}
                >
                  <Icon type="icon--quanbubiankuang" />
                </div>
                <div
                  className={
                    borderDirection === BorderDirectionMap.borderRight
                      ? 'text-[#5584ff] cursor-pointer'
                      : 'cursor-pointer'
                  }
                  onClick={() => onIconClick('borderRight')}
                >
                  <Icon type="icon--youbiankuang" />
                </div>
              </div>
              <div className="ml-5">
                <div
                  className={
                    borderDirection === BorderDirectionMap.borderBottom
                      ? 'text-[#5584ff] cursor-pointer'
                      : 'cursor-pointer'
                  }
                  onClick={() => onIconClick('borderBottom')}
                >
                  <Icon type="icon--xiabiankuang" />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[108px] h-[104px]">
              {borderDirection && (
                <>
                  <Number
                    min={0}
                    max={30}
                    className="w-[108px] mb-2.5"
                    styleKey={borderDirection + 'Width'}
                    {...props}
                  />
                  <ColorInput styleKey={borderDirection + 'Color'} {...props} />
                  <Select
                    allowClear
                    style={{ marginTop: '10px' }}
                    value={styleData[borderDirection + 'Style']}
                    onChange={(value) => {
                      onBorderTypeChange(borderDirection + 'Style', value);
                    }}
                  >
                    <Option value="solid">solid</Option>
                    <Option value="dashed">dashed</Option>
                    <Option value="dotted">dotted</Option>
                  </Select>
                </>
              )}
            </div>
          </div>
        </Row>
      </Panel>
    </Collapse>
  );
};
