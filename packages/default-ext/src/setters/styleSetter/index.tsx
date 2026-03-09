import * as React from 'react';
import type { SetterCommonProps } from 'vitis-lowcode-types'
import Layout from './pro/layout';
import Font from './pro/font';
import Border from './pro/border';
import Background from './pro/background';
import Position from './pro/position';
import type { StyleData } from './utils/types';

interface StyleSetterProps extends SetterCommonProps {
  value: React.CSSProperties | undefined;
  unit?: string;
  placeholderScale?: number;
}

const StyleSetter: React.FC<StyleSetterProps> = (props) => {
  const { value, onChange, unit = 'px', placeholderScale = 1 } = props;
  const [styleData, setStyleData] = React.useState<React.CSSProperties>({});

  // 监听 value 变化，同步更新内部状态
  React.useEffect(() => {
    if (value) {
      setStyleData(value);
    }
  }, [value]);

  const handleStyleChange = (changes: StyleData[]) => {
    const newStyleData = { ...styleData };

    changes?.forEach(({ styleKey, value }) => {
      if (value == null) {
        delete (newStyleData as any)[styleKey];
      } else {
        (newStyleData as any)[styleKey] = value;
      }
    });

    setStyleData(newStyleData);
    onChange?.(newStyleData);
  };

  const commonProps = {
    ...props,
    unit,
    placeholderScale,
    styleData,
    onStyleChange: handleStyleChange,
  };

  return (
    <div className="style-setter-container">
      <Layout {...commonProps} />
      <Font {...commonProps} />
      <Background {...commonProps} />
      <Position {...commonProps} />
      <Border {...commonProps} />
    </div>
  );
};

export default {
  view: StyleSetter,
  name: "StyleSetter"
}
