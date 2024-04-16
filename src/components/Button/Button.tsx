import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

/**
 * Button component renders a button element with specified title.
 * @param {ButtonProps} props - Props for the Button component.
 */
export const Button: FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <button type='button' {...rest}>
      {title}
    </button>
  );
};
