import { Input } from 'antd';
import type { StyleData, onStyleChange } from '../../utils/types';
import positionConfig from './config.json';
import Row from '../../components/row';
import { addUnit, removeUnit } from '../../utils';

const KEY_ARROW_DOWN = 'ArrowDown';
const KEY_ARROW_UP = 'ArrowUp';

interface positionBoxProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: 'px';
}

export default (props: positionBoxProps) => {
  const { onStyleChange, styleData, unit = 'px' } = props;
  const { positionTemplete } = positionConfig;
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

  const onPositionTempleteChange = (styleDataList: Array<StyleData>) => {
    // 解析模板的值
    styleDataList.map((item) => {
      if (item.value == 'topLeft') {
        onStyleChange([
          {
            styleKey: 'top',
            value: 0,
          },
          {
            styleKey: 'left',
            value: 0,
          },
          {
            styleKey: 'bottom',
            value: undefined,
          },
          {
            styleKey: 'right',
            value: undefined,
          },
        ]);
      } else if (item.value === 'topRight') {
        onStyleChange([
          {
            styleKey: 'top',
            value: 0,
          },
          {
            styleKey: 'left',
            value: undefined,
          },
          {
            styleKey: 'bottom',
            value: undefined,
          },
          {
            styleKey: 'right',
            value: 0,
          },
        ]);
      } else if (item.value === 'bottomLeft') {
        onStyleChange([
          {
            styleKey: 'top',
            value: undefined,
          },
          {
            styleKey: 'left',
            value: 0,
          },
          {
            styleKey: 'bottom',
            value: 0,
          },
          {
            styleKey: 'right',
            value: undefined,
          },
        ]);
      } else if (item.value === 'bottomRight') {
        onStyleChange([
          {
            styleKey: 'top',
            value: undefined,
          },
          {
            styleKey: 'left',
            value: undefined,
          },
          {
            styleKey: 'bottom',
            value: 0,
          },
          {
            styleKey: 'right',
            value: 0,
          },
        ]);
      }
      return item;
    });
  };

  return (
    <div>
      {styleData['position'] && styleData['position'] === 'absolute' && (
        <Row
          dataList={positionTemplete.dataList}
          onStyleChange={onPositionTempleteChange}
          styleKey={'positionTemplete'}
        />
      )}

      <div className="relative w-full h-[150px] mb-2.5">
        <div className="absolute top-0 left-0 right-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[30px] border-t-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-t-[#bfd4fb]">
          <Input
            className="absolute left-0 right-0 -top-[30px] !h-[30px] bg-transparent w-full text-center leading-[30px] p-0 border-none shadow-none focus:shadow-none"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['top'])}
            onChange={(event) => onInputChange('top', event.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'top')}
          />
        </div>
        <div className="absolute top-[5px] bottom-[5px] right-0 w-0 border-t-[30px] border-t-transparent border-b-[30px] border-b-transparent border-r-[30px] border-r-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-r-[#bfd4fb]">
          <Input
            className="absolute top-0 bottom-0 -right-[30px] !w-[30px] m-auto bg-transparent text-center leading-[30px] p-0 border-none shadow-none focus:shadow-none"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['right'])}
            onChange={(event) => onInputChange('right', event.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'right')}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-bottom-[30px] border-b-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-b-[#bfd4fb]">
          <Input
            className="absolute left-0 right-0 -bottom-[30px] !h-[30px] bg-transparent w-full text-center leading-[30px] p-0 border-none shadow-none focus:shadow-none"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['bottom'])}
            onChange={(event) => onInputChange('bottom', event.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'bottom')}
          />
        </div>
        <div className="absolute top-[5px] bottom-[5px] left-0 w-0 border-t-[30px] border-t-transparent border-b-[30px] border-b-transparent border-l-[30px] border-l-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-l-[#bfd4fb]">
          <Input
            className="absolute top-0 bottom-0 -left-[30px] !w-[30px] m-auto bg-transparent text-center leading-[30px] p-0 border-none shadow-none focus:shadow-none"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['left'])}
            onChange={(event) => onInputChange('left', event.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'left')}
          />
        </div>
      </div>
    </div>
  );
};
