import React, { ChangeEventHandler } from 'react';
import './Style.css';

interface RadioButtonProps {
  value: string;
  options: string[];
  title?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

/**
 * RadioButton component renders a group of radio buttons.
 * @param {RadioButtonProps} props - Props for the RadioButton component.
 */
export const RadioButton: React.FC<RadioButtonProps> = ({ value, options, title, onChange }) => {
  return (
    <div>
      {!!title && <label className='required'>{title}</label>}
      <div className='radio-group'>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type='radio'
              id={option.toLowerCase()}
              name={option.toLowerCase()}
              value={option}
              onChange={onChange}
              checked={value == option}
            />
            <label htmlFor={option.toLowerCase()}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
