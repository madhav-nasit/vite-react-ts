import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button: FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <button type='button' {...rest}>
      {title}
    </button>
  );
};
