import LayoutBox from './layoutBox';
import { Collapse } from 'antd';
import Number from '../../components/number';
import type { StyleData, onStyleChange } from '../../utils/types';
const Panel = Collapse.Panel;

interface LayoutProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
}

export default (props: LayoutProps) => {
  const { onStyleChange, styleData } = props;
  return (
    <Collapse defaultActiveKey={['0']} size='small' className='mt-3!'>
      <Panel header="布局" className="" key="0">
        <LayoutBox styleData={styleData} onStyleChange={onStyleChange} />
        <div className="flex flex-row items-center mt-2">
          <span className="w-[50px] mr-2.5">宽度</span>
          <Number
            style={{ marginRight: '10px', width: '100%' }}
            min={0}
            styleKey="width"
            {...props}
            useComputedStyle={true}
          />
        </div>
        <div className="flex flex-row items-center mt-2">
          <span className="w-[50px] mr-2.5">高度</span>
          <Number
            styleKey="height"
            min={0}
            {...props}
            style={{ width: '100%' }}
            useComputedStyle={true}
          />
        </div>
      </Panel>
    </Collapse>
  );
};
