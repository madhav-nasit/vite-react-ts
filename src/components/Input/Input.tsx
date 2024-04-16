import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './Style.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  icon?: IconProp;
  type?: string;
  required?: boolean;
  label?: string;
  error?: string;
}

/**
 * Input component renders an input element with optional label, icon, and error message.
 * @param {InputProps} props - Props for the Input component.
 */
export const Input = (props: InputProps) => {
  const { type = 'text', id, label, icon, error, required, ...rest } = props;

  return (
    <div>
      {!!label && (
        <label className={required ? 'required' : ''} htmlFor={id}>
          {label}
        </label>
      )}
      <div className='input-container'>
        {!!icon && (
          <div className='input-icon'>
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        <input
          type={type}
          id={id}
          placeholder={label}
          required={required}
          className={!!error ? 'error-input' : ''}
          {...rest}
        />
        {!!error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  );
};
