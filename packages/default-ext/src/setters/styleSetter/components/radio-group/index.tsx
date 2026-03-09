import { Radio, Popover, type RadioChangeEvent } from 'antd';
import type { FC } from 'react';
import type { RadioItem, onStyleChange } from '../../utils/types';
import Icon from '../icon';

const { Group: RadioGroup } = Radio;

interface RadioProps {
  dataList: Array<RadioItem>;
  styleKey: string;
  onStyleChange: onStyleChange;
  value?: string;
}

const RadioSetter: FC<RadioProps> = ({ dataList, styleKey, onStyleChange, value }) => {
  const handleRadioChange = (e: RadioChangeEvent) => {
    onStyleChange([
      {
        styleKey,
        value: e.target.value,
      },
    ]);
  };

  return (
    <div className="whitespace-nowrap flex flex-wrap flex-1">
      <RadioGroup
        value={value}
        optionType="button"
        onChange={handleRadioChange}
        className="flex flex-1 w-full"
        size='small'
      >
        {dataList?.map((item: RadioItem) => (
          <Popover
            key={item.value}
            content={item.tips}
            trigger="hover"
            placement="top"
          >
            <Radio
              value={item.value}
              className="flex-1 text-center flex items-center justify-center"
            >
              {item.icon ? <Icon type={item.icon} size="small" /> : item.title}
            </Radio>
          </Popover>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioSetter;
