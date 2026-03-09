import { Input } from 'antd';
import type { StyleData, onStyleChange } from '../../utils/types';
import positionConfig from './config.json';
import Row from '../../components/row';
import { removeUnit, handleInputChange, handleInputKeyDown } from '../../utils';

interface PositionBoxProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: 'px';
}

const POSITION_TEMPLATES: Record<string, Array<{ styleKey: string; value: number | undefined }>> = {
  topLeft: [
    { styleKey: 'top', value: 0 },
    { styleKey: 'left', value: 0 },
    { styleKey: 'bottom', value: undefined },
    { styleKey: 'right', value: undefined },
  ],
  topRight: [
    { styleKey: 'top', value: 0 },
    { styleKey: 'left', value: undefined },
    { styleKey: 'bottom', value: undefined },
    { styleKey: 'right', value: 0 },
  ],
  bottomLeft: [
    { styleKey: 'top', value: undefined },
    { styleKey: 'left', value: 0 },
    { styleKey: 'bottom', value: 0 },
    { styleKey: 'right', value: undefined },
  ],
  bottomRight: [
    { styleKey: 'top', value: undefined },
    { styleKey: 'left', value: undefined },
    { styleKey: 'bottom', value: 0 },
    { styleKey: 'right', value: 0 },
  ],
};

const BoxInput = ({
  className,
  styleKey,
  styleData,
  onStyleChange,
  unit = 'px',
}: {
  className: string;
  styleKey: string;
  styleData: any;
  onStyleChange: any;
  unit?: string;
}) => (
  <Input
    className={className}
    placeholder="auto"
    maxLength={4}
    size='small'
    value={removeUnit(styleData[styleKey])}
    onChange={(event) => handleInputChange(styleKey, event.target.value, onStyleChange, unit)}
    onKeyDown={(e) => handleInputKeyDown(e.key, styleKey, styleData, onStyleChange, unit)}
  />
);

export default (props: PositionBoxProps) => {
  const { onStyleChange, styleData, unit = 'px' } = props;
  const { positionTemplate } = positionConfig;

  const onPositionTemplateChange = (styleDataList: Array<StyleData>) => {
    styleDataList.forEach((item) => {
      const template = POSITION_TEMPLATES[item.value as string];
      if (template) {
        onStyleChange(template);
      }
    });
  };

  return (
    <div>
      {styleData['position'] && styleData['position'] === 'absolute' && (
        <Row
          dataList={positionTemplate.dataList}
          onStyleChange={onPositionTemplateChange}
          styleKey={'positionTemplate'}
        />
      )}

      <div className="relative w-full h-[150px] mb-2.5">
        {/* Top */}
        <div className="absolute top-0 left-0 right-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[30px] border-t-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-t-[#bfd4fb]">
          <BoxInput
            className="absolute left-0 right-0 -top-[30px] !h-[30px] bg-transparent w-full text-center leading-[30px] p-0 border-none shadow-none focus:shadow-none"
            styleKey="top"
            styleData={styleData}
            onStyleChange={onStyleChange}
            unit={unit}
          />
        </div>
        {/* Right */}
        <div className="absolute top-[5px] bottom-[5px] right-0 w-0 border-t-[30px] border-t-transparent border-b-[30px] border-b-transparent border-r-[30px] border-r-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-r-[#bfd4fb]">
          <BoxInput
            className="absolute top-0 bottom-0 -right-[30px] !w-[30px] m-auto bg-transparent text-center leading-[30px] p-0 border-none shadow-none focus:shadow-none"
            styleKey="right"
            styleData={styleData}
            onStyleChange={onStyleChange}
            unit={unit}
          />
        </div>
        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[30px] border-b-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-b-[#bfd4fb]">
          <BoxInput
            className="absolute left-0 right-0 -bottom-[30px] !h-[30px] bg-transparent w-full text-center leading-[30px] p-0 border-none shadow-none focus:shadow-none"
            styleKey="bottom"
            styleData={styleData}
            onStyleChange={onStyleChange}
            unit={unit}
          />
        </div>
        {/* Left */}
        <div className="absolute top-[5px] bottom-[5px] left-0 w-0 border-t-[30px] border-t-transparent border-b-[30px] border-b-transparent border-l-[30px] border-l-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-l-[#bfd4fb]">
          <BoxInput
            className="absolute top-0 bottom-0 -left-[30px] !w-[30px] m-auto bg-transparent text-center leading-[30px] p-0 border-none shadow-none focus:shadow-none"
            styleKey="left"
            styleData={styleData}
            onStyleChange={onStyleChange}
            unit={unit}
          />
        </div>
      </div>
    </div>
  );
};
