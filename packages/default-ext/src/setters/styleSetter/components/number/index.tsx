import { InputNumber } from 'antd';
import type { FC, CSSProperties } from 'react';
import type { StyleData, onStyleChange } from '../../utils/types';
import { addUnit, removeUnit, isEmptyValue } from '../../utils';

interface NumberProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: string;
  min?: number;
  max?: number;
  style?: CSSProperties;
  className?: string;
  field?: any;
  placeholderScale?: number;
  useComputedStyle?: boolean;
}

const NumberSetter: FC<NumberProps> = (props) => {
  const {
    styleData,
    styleKey,
    unit,
    onStyleChange,
    min,
    max,
    style = {},
    className = '',
  } = props;

  const handleNumberChange = (value: number | null) => {
    onStyleChange([
      {
        styleKey,
        value: unit && value !== null ? addUnit(value, unit) : value,
      },
    ]);
  };

  const currentValue = unit ? removeUnit(styleData[styleKey]) : styleData[styleKey];

  return (
    <InputNumber
      style={style}
      className={className}
      value={currentValue}
      min={isEmptyValue(min) ? Number.MIN_SAFE_INTEGER : min}
      max={isEmptyValue(max) ? Number.MAX_SAFE_INTEGER : max}
      onChange={handleNumberChange}
      suffix={unit}
      size='small'
    />
  );
};

export default NumberSetter;
