import type { FC, ReactNode, CSSProperties } from 'react';
import RadioGroup from '../radio-group';
import type { RadioItem, StyleData, onStyleChange } from '../../utils/types';

interface RowProps {
  title?: string;
  children?: ReactNode;
  styleData?: StyleData | any;
  dataList?: Array<RadioItem>;
  styleKey: string;
  onStyleChange: onStyleChange;
  value?: string;
  contentStyle?: CSSProperties;
}

const RowSetter: FC<RowProps> = (props) => {
  const { title, dataList = [], styleKey, children, styleData, contentStyle = {} } = props;
  const hasValue = styleData && styleData[styleKey];

  return (
    <div className="flex flex-row items-center mb-2.5">
      {title && (
        <div
          className={`w-[60px] flex-row text-xs ${
            hasValue ? 'text-[#5584ff]' : 'text-black/60'
          }`}
        >
          {title}
        </div>
      )}

      <div
        className="flex flex-wrap flex-1 [&_.ant-radio-wrapper]:mr-0 [&_.ant-radio-wrapper]:flex [&_.ant-radio-wrapper]:flex-1 [&_.ant-radio-wrapper]:items-center [&_.ant-radio-wrapper]:justify-center"
        style={contentStyle}
      >
        {children ? (
          children
        ) : (
          <RadioGroup
            {...props}
            dataList={dataList}
            value={styleData ? styleData[styleKey] : null}
          />
        )}
      </div>
    </div>
  );
};

export default RowSetter;
