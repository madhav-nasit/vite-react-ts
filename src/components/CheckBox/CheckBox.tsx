import React from 'react';
import '../RadioButton/Style.css';

interface CheckBoxProps {
  value: string[];
  options: string[];
  title?: string;
  onChange?: (value: string[]) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ value, options, title, onChange }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.value;
    const isChecked = event.target.checked;
    const tempVal = [...value];
    if (isChecked) {
      tempVal.push(fieldName);
    } else {
      const index = tempVal.indexOf(fieldName);
      tempVal.splice(index, 1);
    }
    if (!!onChange) onChange(tempVal);
  };
  return (
    <div>
      {!!title && <label>{title}</label>}
      <div className='radio-group'>
        {options.map((option, index) => (
          <div key={index}>
            <input
              checked={value?.includes(option) ?? false}
              type='checkbox'
              id={option.toLowerCase()}
              name={option.toLowerCase()}
              value={option}
              onChange={handleOnChange}
            />
            <label htmlFor={option.toLowerCase()}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
