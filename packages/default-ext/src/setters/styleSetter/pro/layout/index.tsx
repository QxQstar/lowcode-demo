import LayoutBox from './layoutBox';
import { Collapse } from 'antd';
import Number from '../../components/number';
import type { StyleData, onStyleChange } from '../../utils/types';
const Panel = Collapse.Panel;

interface layoutProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
}

export default (props: layoutProps) => {

  // const onExpand = (expandedKeys: Array<any>) => {
  //   getVariableValue;
  // };

  const { onStyleChange, styleData } = props;
  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header="布局" className="" key="0">
        {/* <Row title={display.title} dataList={display.dataList} styleKey="display" {...props}></Row> */}

        {/* {styleData['display'] === 'flex' && (
          <>
            <Row
              title={flexDirection.title}
              dataList={flexDirection.dataList}
              styleKey="flexDirection"
              {...props}
            />
            <Row
              title={justifyContent.title}
              dataList={justifyContent.dataList}
              styleKey="justifyContent"
              {...props}
            />
            <Row
              title={alignItems.title}
              dataList={alignItems.dataList}
              styleKey="alignItems"
              {...props}
            />
            <Row
              title={flexWrap.title}
              dataList={flexWrap.dataList}
              styleKey="flexWrap"
              {...props}
            />
          </>
        )} */}

        <LayoutBox styleData={styleData} onStyleChange={onStyleChange} />

        <div className="flex flex-row mt-2.5">
          <div className="flex flex-row items-center">
            <span className="w-[50px] mr-2.5">宽度</span>
            <Number
              style={{ marginRight: '10px', width: '100%' }}
              min={0}
              styleKey="width"
              {...props}
              useComputedStyle={true}
            />
          </div>
          <div className="flex flex-row items-center">
            <span className="w-[50px] mr-2.5">高度</span>
            <Number
              styleKey="height"
              min={0}
              {...props}
              style={{ width: '100%' }}
              useComputedStyle={true}
            />
          </div>
        </div>
      </Panel>
    </Collapse>
  );
};
