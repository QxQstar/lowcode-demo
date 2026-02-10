import RadioGroup from '../radio-group';
import type { RadioItem, StyleData, onStyleChange } from '../../utils/types';

interface rowProps {
  title?: string;
  children?: any;
  // 如果不传styleData的话，radiogroup就变成非受控组件
  styleData?: StyleData | any;
  dataList?: Array<RadioItem>;
  styleKey: string;
  onStyleChange: onStyleChange;
  value?: string;
  contentStyle?: any;
}

export default (props: rowProps) => {
  const { title, dataList = [], styleKey, children, styleData, contentStyle = {} } = props;

  return (
    <div className="flex flex-row items-center mb-2.5">
      {title && (
        <div
          className={
            styleData[styleKey]
              ? 'w-[60px] flex-row text-[#5584ff] text-xs'
              : 'w-[60px] flex-row text-black/60 text-xs'
          }
        >
          {title}
        </div>
      )}

      <div className="flex flex-wrap flex-1 [&_.ant-radio-wrapper]:mr-0 [&_.ant-radio-wrapper]:flex [&_.ant-radio-wrapper]:flex-1 [&_.ant-radio-wrapper]:items-center [&_.ant-radio-wrapper]:justify-center" style={contentStyle}>
        {children ? (
          children
        ) : (
          <RadioGroup
            {...props}
            dataList={dataList}
            value={styleData ? styleData[styleKey] : null}
          ></RadioGroup>
        )}
      </div>
    </div>
  );
};
