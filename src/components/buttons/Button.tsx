import { BaseHTMLAttributes } from 'react';

import styles from './Button.module.css';

export type BaseButtonProps = {
  selected?: boolean;
};

export type ButtonProps = BaseHTMLAttributes<HTMLButtonElement> &
  BaseButtonProps;

const Button = ({ selected, className, ...props }: ButtonProps) => {
  return (
    <button
      data-selected={selected}
      className={styles.Button + ' ' + className}
      {...props}
    />
  );
};

export default Button;
