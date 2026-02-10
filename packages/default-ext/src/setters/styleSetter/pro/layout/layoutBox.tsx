import { Input } from 'antd';
import type { StyleData, onStyleChange } from '../../utils/types';
import { addUnit, removeUnit } from '../../utils';

const KEY_ARROW_DOWN = 'ArrowDown';
const KEY_ARROW_UP = 'ArrowUp';

interface layoutBoxProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: 'px';
}

export default (props: layoutBoxProps) => {
  const { onStyleChange, unit = 'px', styleData } = props;
  const onInputChange = (styleKey: string, value: string) => {
    if (value != '') {
      // 判断是否是数字
      if (!isNaN(parseInt(value))) {
        onStyleChange([
          {
            styleKey,
            value: addUnit(value, unit),
          },
        ]);
      }
    } else {
      onStyleChange([
        {
          styleKey,
          value: undefined,
        },
      ]);
    }
  };

  const onInputKeyDown = (key: string, styleKey: string) => {
    const { onStyleChange, unit = 'px', styleData } = props;
    const value = styleData[styleKey] || 0;
    if (key == KEY_ARROW_DOWN) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(parseInt(value) - 1, unit),
        },
      ]);
    } else if (key == KEY_ARROW_UP) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(parseInt(value) + 1, unit),
        },
      ]);
    }
  };

  return (
    <div className="relative w-full h-[150px]">
      <div className="absolute top-0 left-0 right-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-t-[#bfd4fb]">
        <Input
          className="absolute left-0 right-0 -top-[20px] !h-[20px] bg-transparent w-full text-center leading-[20px] p-0 border-none shadow-none focus:shadow-none"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['marginTop'])}
          onChange={(event) => onInputChange('marginTop', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'marginTop')}
        ></Input>
      </div>
      <div className="absolute top-[5px] bottom-[5px] right-0 w-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[20px] border-r-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-r-[#bfd4fb]">
        <Input
          className="absolute w-[20px] m-auto bg-transparent top-0 bottom-0 h-[20px] leading-[20px] text-center p-0 border-none shadow-none focus:shadow-none"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['marginRight'])}
          onChange={(event) => onInputChange('marginRight', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'marginRight')}
        ></Input>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-b-[#bfd4fb]">
        <span className="float-left -ml-[10px] scale-75 transform-origin-left text-xs">MARGIN</span>
        <Input
          className="absolute left-0 right-0 -bottom-[20px] bg-transparent text-center leading-[20px] h-[20px] p-0 border-none shadow-none focus:shadow-none"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['marginBottom'])}
          onChange={(event) => onInputChange('marginBottom', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'marginBottom')}
        ></Input>
      </div>
      <div className="absolute top-[5px] bottom-[5px] left-0 w-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[20px] border-l-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-l-[#bfd4fb]">
        <Input
          className="absolute top-0 bottom-0 m-auto -left-[20px] w-[30px] h-[20px] leading-[20px] p-0 text-center bg-transparent border-none shadow-none focus:shadow-none"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['marginLeft'])}
          onChange={(event) => onInputChange('marginLeft', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'marginLeft')}
        ></Input>
      </div>
      <div className="absolute top-[25px] left-[25px] right-[25px] h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-t-[#bfd4fb]">
        <Input
          className="absolute left-0 right-0 -top-[20px] bg-transparent w-full text-center leading-[20px] h-[20px] p-0 border-none shadow-none focus:shadow-none"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['paddingTop'])}
          onChange={(event) => onInputChange('paddingTop', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'paddingTop')}
        ></Input>
      </div>
      <div className="absolute top-[30px] bottom-[30px] right-[25px] w-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[20px] border-r-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-r-[#bfd4fb]">
        <Input
          className="absolute top-0 bottom-0 -right-[25px] w-[30px] m-auto bg-transparent h-[20px] leading-[20px] text-center px-[5px] border-none shadow-none focus:shadow-none"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['paddingRight'])}
          onChange={(event) => onInputChange('paddingRight', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'paddingRight')}
        ></Input>
      </div>
      <div className="absolute bottom-[25px] left-[25px] right-[25px] h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-b-[#bfd4fb]">
        <span className="float-left -ml-[10px] scale-75 transform-origin-left text-xs">PADDING</span>
        <Input
          className="absolute left-0 right-0 -bottom-[20px] h-[20px] bg-transparent w-full text-center leading-[20px] p-0 border-none shadow-none focus:shadow-none"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['paddingBottom'])}
          onChange={(event) => onInputChange('paddingBottom', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'paddingBottom')}
        ></Input>
      </div>
      <div className="absolute top-[30px] bottom-[30px] left-[25px] w-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[20px] border-l-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-l-[#bfd4fb]">
        <Input
          className="absolute top-0 bottom-0 m-auto -left-[25px] w-[30px] h-[20px] leading-[20px] text-center px-[5px] bg-transparent border-none shadow-none focus:shadow-none"
          placeholder="0"
          maxLength={3}
          value={removeUnit(styleData['paddingLeft'])}
          onChange={(event) => onInputChange('paddingLeft', event.target.value)}
          onKeyDown={(e) => onInputKeyDown(e.key, 'paddingLeft')}
        ></Input>
      </div>
    </div>
  );
};
