import type { ChangeEvent, FC } from 'react';
import { Input, Popover } from 'antd';
import { SketchPicker, type ColorResult } from 'react-color';
import type { StyleData, onStyleChange } from '../../utils/types';

interface ColorInputProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  inputWidth?: string;
}

const ColorSetter: FC<ColorInputProps> = (props) => {
  const { styleKey, styleData, onStyleChange, inputWidth = '108px' } = props;
  const value = styleData[styleKey];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    if (color === '') {
      onStyleChange([
        {
          styleKey,
          value: undefined,
        },
      ]);
    }
  };

  const handleColorChange = (color: ColorResult) => {
    const { rgb, hex } = color;
    const { r, g, b, a } = rgb;
    const newValue = a === 1 ? hex : `rgba(${r},${g},${b},${a})`;

    onStyleChange([
      {
        styleKey,
        value: newValue,
      },
    ]);
  };

  const renderColorPreview = () => (
    <div
      className="w-4 h-4 border border-[#999] ml-[5px] rounded-[3px]"
      style={{ backgroundColor: value }}
    />
  );

  return (
    <Popover
      placement="topRight"
      overlayInnerStyle={{ padding: 0 }}
      trigger="click"
      content={
        <SketchPicker
          width="250px"
          color={value}
          onChange={handleColorChange}
        />
      }
    >
      <Input
        style={{ width: inputWidth }}
        allowClear
        prefix={renderColorPreview()}
        onChange={handleInputChange}
        value={value}
         size='small'
      />
    </Popover>
  );
};

export default ColorSetter;
