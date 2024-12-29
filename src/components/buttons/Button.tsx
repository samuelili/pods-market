import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';
import { twMerge } from 'tailwind-merge';

export type BaseButtonProps = {
  selected?: boolean;
  large?: boolean;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  BaseButtonProps;

const Button = ({ selected, large, className, ...props }: ButtonProps) => {
  return (
    <button
      data-selected={selected}
      data-large={large}
      className={twMerge(styles.Button, className)}
      {...props}
    />
  );
};

export default Button;
