import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InputField.css';
import { FormControl, Input, InputLabel } from '@material-ui/core';

export const InputField = (props) => {
  const { inputFieldLabel, inputFieldType = 'text' } = props;
  const [name, setName] = useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="popup-form-box">
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor="component-simple" style={{ fontSize: '1.6rem' }}>
          {inputFieldLabel}
        </InputLabel>
        <Input type={inputFieldType} id={inputFieldLabel} value={name} onChange={handleChange} />
      </FormControl>
    </div>
  );
};

InputField.propTypes = {
  inputFieldLabel: PropTypes.string,
  inputFieldType: PropTypes.oneOf(['text', 'password'])
};

export default InputField;
