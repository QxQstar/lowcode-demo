import { useRef, useEffect } from 'react';
import type { StyleData, onStyleChange } from '../../utils/types';
import { removeUnit, handleInputChange, handleInputKeyDown } from '../../utils';

interface LayoutBoxProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: 'px';
}

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
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const val = removeUnit(styleData[styleKey]);
      const text = val !== undefined ? String(val) : '';
      if (ref.current.innerText !== text) {
        ref.current.innerText = text;
      }
    }
  }, [styleData, styleKey]);

  return (
    <div
      ref={ref}
      contentEditable
      className={`${className} outline-none`}
      onInput={(e) =>
        handleInputChange(
          styleKey,
          (e.currentTarget as HTMLDivElement).innerText,
          onStyleChange,
          unit
        )
      }
      onKeyDown={(e) =>
        handleInputKeyDown(e.key, styleKey, styleData, onStyleChange, unit)
      }
      suppressContentEditableWarning
    />
  );
};

export default (props: LayoutBoxProps) => {
  const { onStyleChange, unit = 'px', styleData } = props;

  return (
    <div className="relative w-full h-[150px]">
      {/* Top Margin */}
      <div className="absolute top-0 left-0 right-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-t-[#bfd4fb]">
        <BoxInput
          className="absolute left-0 right-0 -top-[20px] !h-[20px] bg-transparent w-full text-center leading-[20px] p-0 border-none shadow-none focus:shadow-none"
          styleKey="marginTop"
          styleData={styleData}
          onStyleChange={onStyleChange}
          unit={unit}
        />
      </div>
      {/* Right Margin */}
      <div className="absolute top-[5px] bottom-[5px] right-0 w-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[20px] border-r-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-r-[#bfd4fb]">
        <BoxInput
          className="absolute w-[20px] m-auto bg-transparent top-0 bottom-0 h-[20px] leading-[20px] text-center p-0 border-none shadow-none focus:shadow-none"
          styleKey="marginRight"
          styleData={styleData}
          onStyleChange={onStyleChange}
          unit={unit}
        />
      </div>
      {/* Bottom Margin */}
      <div className="absolute bottom-0 left-0 right-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-b-[#bfd4fb]">
        <span className="float-left -ml-[10px] scale-75 transform-origin-left text-xs">MARGIN</span>
        <BoxInput
          className="absolute left-0 right-0 -bottom-[20px] bg-transparent text-center leading-[20px] h-[20px] p-0 border-none shadow-none focus:shadow-none"
          styleKey="marginBottom"
          styleData={styleData}
          onStyleChange={onStyleChange}
          unit={unit}
        />
      </div>
      {/* Left Margin */}
      <div className="absolute top-[5px] bottom-[5px] left-0 w-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[20px] border-l-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-l-[#bfd4fb]">
        <BoxInput
          className="absolute top-0 bottom-0 m-auto -left-[20px] w-[30px] h-[20px] leading-[20px] p-0 text-center bg-transparent border-none shadow-none focus:shadow-none"
          styleKey="marginLeft"
          styleData={styleData}
          onStyleChange={onStyleChange}
          unit={unit}
        />
      </div>

      {/* Top Padding */}
      <div className="absolute top-[25px] left-[25px] right-[25px] h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-t-[#bfd4fb]">
        <BoxInput
          className="absolute left-0 right-0 -top-[20px] bg-transparent w-full text-center leading-[20px] h-[20px] p-0 border-none shadow-none focus:shadow-none"
          styleKey="paddingTop"
          styleData={styleData}
          onStyleChange={onStyleChange}
          unit={unit}
        />
      </div>
      {/* Right Padding */}
      <div className="absolute top-[30px] bottom-[30px] right-[25px] w-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[20px] border-r-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-r-[#bfd4fb]">
        <BoxInput
          className="absolute top-0 bottom-0 -right-[25px] w-[30px] m-auto bg-transparent h-[20px] leading-[20px] text-center px-[5px] border-none shadow-none focus:shadow-none"
          styleKey="paddingRight"
          styleData={styleData}
          onStyleChange={onStyleChange}
          unit={unit}
        />
      </div>
      {/* Bottom Padding */}
      <div className="absolute bottom-[25px] left-[25px] right-[25px] h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-b-[#bfd4fb]">
        <span className="float-left -ml-[10px] scale-75 transform-origin-left text-xs">PADDING</span>
        <BoxInput
          className="absolute left-0 right-0 -bottom-[20px] h-[20px] bg-transparent w-full text-center leading-[20px] p-0 border-none shadow-none focus:shadow-none"
          styleKey="paddingBottom"
          styleData={styleData}
          onStyleChange={onStyleChange}
          unit={unit}
        />
      </div>
      {/* Left Padding */}
      <div className="absolute top-[30px] bottom-[30px] left-[25px] w-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[20px] border-l-[#d6e4ff] transition-all duration-300 ease-in-out hover:border-l-[#bfd4fb]">
        <BoxInput
          className="absolute top-0 bottom-0 m-auto -left-[25px] w-[30px] h-[20px] leading-[20px] text-center px-[5px] bg-transparent border-none shadow-none focus:shadow-none"
          styleKey="paddingLeft"
          styleData={styleData}
          onStyleChange={onStyleChange}
          unit={unit}
        />
      </div>
    </div>
  );
};
