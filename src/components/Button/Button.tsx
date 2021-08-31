import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import cn from 'classnames';

import './Button.scss';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: 's' | 'm' | 'l';
  view?: 'default' | 'clear';
}

const prefixCls = 'Button';

export const Button: FC<ButtonProps> = props => {
  const { className, children, size = 's', view = 'default', type = 'button', ...other } = props;
  return (
    <button
      className={(cn(className, prefixCls, `${prefixCls}_size_${size}`, `${prefixCls}_view_${view}`))}
      type={type}
      {...other}
    >
      {children}
    </button>
  );
};
