import * as React from 'react';
import { useState, useEffect } from 'react';
import Row from '../../components/row';
import Icon from '../../components/icon';
import ColorInput from '../../components/color-input';
import type { StyleData, onStyleChange } from '../../utils/types';
import { Collapse, Input } from 'antd';
import borderConfig from './config.json';

const Panel = Collapse.Panel;

interface BackgroundProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: string;
}

export default (props: BackgroundProps) => {
  const { onStyleChange, styleData } = props;
  const { backgroundType } = borderConfig;
  const [bgType, setBgType] = useState<string>();

  const onBgTypeChange = (styleDataList: Array<StyleData>) => {
    if (styleDataList && styleDataList.length > 0) {
      setBgType(styleDataList[0].value as string);
    }
  };

  const formatBgImgUrl = (url: string) => {
    if (url && url !== '') {
      return `url(${url})`;
    }
    return undefined;
  };

  const backToBgImgUrl = (styleUrl: string) => {
    if (styleUrl) {
      const match = styleUrl.match(/url\((.*)\)/);
      return match ? match[1] : '';
    }
    return '';
  };

  const initData = () => {
    if (styleData.backgroundColor) {
      setBgType('backgroundColor');
    } else if (styleData.backgroundImage) {
      setBgType('backgroundImage');
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStyleChange([
      {
        styleKey: 'backgroundImage',
        value: formatBgImgUrl(event.target.value),
      },
    ]);
  };

  return (
    <Collapse defaultActiveKey={['0']} size='small' className='mt-3!'>
      <Panel header="背景" className="" key="0">
        <Row
          title={backgroundType.title}
          dataList={backgroundType.dataList}
          styleKey=""
          {...props}
          onStyleChange={onBgTypeChange}
          value={bgType}
        />

        {bgType === 'color' && (
          <Row title={' '} styleKey="" {...props}>
            <ColorInput styleKey={'backgroundColor'} {...props} inputWidth="100%" />
          </Row>
        )}

        {bgType === 'bgImg' && (
          <Row title={' '} styleKey="" {...props}>
            <Input
              prefix={<Icon type="icon-suffix-url" style={{ margin: 4 }} />}
              placeholder="输入图片url"
              style={{ width: '100%' }}
              value={backToBgImgUrl(styleData['backgroundImage'])}
              onChange={onInputChange}
              size='small'
            />
          </Row>
        )}
      </Panel>
    </Collapse>
  );
};
