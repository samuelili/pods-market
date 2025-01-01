import { BaseHTMLAttributes, PropsWithRef } from 'react';

import styles from './Card.module.css';
import {twMerge} from "tailwind-merge";

export type CardProps = PropsWithRef<
  BaseHTMLAttributes<HTMLDivElement> & {
    hover?: boolean;
  }
>;

const Card = ({ hover, className, ...props }: CardProps) => {
  return (
    <div
      className={twMerge(styles.Card, className)}
      data-hover={hover ? true : undefined}
      {...props}
    />
  );
};

export default Card;
