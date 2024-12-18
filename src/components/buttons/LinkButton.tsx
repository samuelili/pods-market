import styles from './Button.module.css';
import { BaseButtonProps } from '@/components/buttons/Button.tsx';
import { Link, LinkProps, useMatchRoute } from '@tanstack/react-router';
import { AnchorHTMLAttributes } from 'react';

export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps &
  BaseButtonProps & {
  fuzzy?: boolean;
};

const LinkButton = ({ to, selected, fuzzy = true, className, ...props }: LinkButtonProps) => {
  const matchRoute = useMatchRoute();

  return (
    <Link
      to={to}
      data-selected={selected ?? matchRoute({ to, fuzzy }) !== false}
      className={styles.Button + ' ' + className}
      {...props}
    />
  );
};

export default LinkButton;
