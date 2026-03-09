import { createFromIconfontCN } from '@ant-design/icons';
import type { CSSProperties, FC } from 'react';

const ICON_URL = '//at.alicdn.com/t/font_2761185_gdpwg9vnz7.js';

const CustomIcon = createFromIconfontCN({
  scriptUrl: ICON_URL,
});

interface IconProps {
  type: string;
  size?: number | 'small' | 'xxs' | 'xs' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl' | 'inherit';
  className?: string;
  style?: CSSProperties;
}

const Icon: FC<IconProps> = ({ type, size, className = '', style = {} }) => {
  return (
    <CustomIcon
      type={type}
      className={className}
      style={style}
      // @ts-ignore
      size={size}
    />
  );
};

export default Icon;
