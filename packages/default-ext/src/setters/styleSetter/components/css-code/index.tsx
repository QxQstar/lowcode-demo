import { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import type { StyleData } from '../../utils/types';
import { parseToCssCode, parseToStyleData } from '../../utils';
import MonacoEditor from 'vitis-lowcode-monaco-editor'

interface CodeProps {
  visible: boolean;
  styleData: StyleData | any;
  onStyleDataChange: (val: any) => void;
  changeCssCodeVisiable: {
    (visable: boolean): void;
  };
}

const CssCode: React.FC<CodeProps> = (props) => {
  const [cssCode, setCssCode] = useState('');

  const { visible, styleData, onStyleDataChange, changeCssCodeVisiable } = props;

  useEffect(() => {
    const newCssCode = parseToCssCode(styleData);
    setCssCode(newCssCode);
  }, []);

  useEffect(() => {
    const newCssCode = parseToCssCode(styleData);
    setCssCode(newCssCode);
  }, [styleData]);

  const updateCode = (newCode: string) => {
    setCssCode(newCode);
    let newStyleData = parseToStyleData(newCode);
    // 检查是否和原来的styleData完全相同
    newStyleData && onStyleDataChange(newStyleData);
  };

  return (
    <Drawer
      width={360}
      visible={visible}
      mask={false}
      title="css源码编辑"
      onClose={() => {
        changeCssCodeVisiable(true);
      }}
    >
      <MonacoEditor
        value={cssCode}
        language="css"
        onChange={(newCode: string) => updateCode(newCode)}
      />
    </Drawer>
  );
};

export default CssCode;
