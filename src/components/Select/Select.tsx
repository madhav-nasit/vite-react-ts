import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StateSelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  id: string;
  value: string;
  label: string;
  icon?: IconProp;
  required?: boolean;
  options: string[];
  error?: string;
}

export const Select = (props: StateSelectProps) => {
  const { id, value, label, icon, required = true, options = [], error, ...rest } = props;
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
        <select
          type='select'
          className={!!error ? 'errror-input' : ''}
          id={id}
          name={id}
          required={required}
          {...rest}
        >
          <option disabled selected={value === ''}>
            {label}
          </option>
          {options.map((option, index) => (
            <option key={index} selected={value === option}>
              {option}
            </option>
          ))}
        </select>
        {!!error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  );
};
