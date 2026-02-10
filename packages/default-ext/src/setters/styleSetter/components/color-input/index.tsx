import type { ChangeEvent, FC } from 'react';
import { Input, Popover } from 'antd';
import type { StyleData, onStyleChange } from '../../utils/types';
import { SketchPicker } from 'react-color';

interface ColorInputProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  inputWidth?: string;
}

const ColorSetter: FC<ColorInputProps> = (props) => {
  const { styleKey, styleData, onStyleChange, inputWidth = '108px' } = props;

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value
    if (color == '') {
      onStyleChange([
        {
          styleKey,
          value: undefined,
        },
      ]);
    }
  };

  const handleChange = (color: any) => {
    const { rgb, hex } = color;
    const { r, g, b, a } = rgb;
    if (a === 1) {
      onStyleChange([
        {
          styleKey,
          value: hex,
        },
      ]);
    } else {
      onStyleChange([
        {
          styleKey,
          value: `rgba(${r},${g},${b},${a})`,
        },
      ]);
    }
  };

  return (
    <Popover
      placement="topRight"
      style={{ padding: 0 }}
      trigger="click"
      content={<SketchPicker width="250px" color={styleData[styleKey]} onChange={handleChange} />}
    >
      <Input
        className=""
        style={{ width: inputWidth }}
        allowClear={true}
        addonBefore={<div className="w-4 h-4 border border-[#999] ml-[5px] rounded-[3px]" style={{ backgroundColor: styleData[styleKey] }} />}
        onChange={inputChange}
        value={styleData[styleKey]}
      />
      
    </Popover>
  );
};

export default ColorSetter;
