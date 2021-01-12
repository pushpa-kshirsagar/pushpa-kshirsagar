import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InputField.css';
import { FormControl, Input, InputLabel } from '@material-ui/core';

export const InputField = (props) => {
  const { inputLabel, inputType = 'text' } = props;
  const [name, setName] = useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="popup-form-box">
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor="component-simple" style={{ fontSize: '1.6rem' }}>{inputLabel}</InputLabel>
        <Input type={inputType} id={inputLabel} value={name} onChange={handleChange} />
      </FormControl>
    </div>
  );
};

InputField.propTypes = {
  inputLabel: PropTypes.string,
  inputType: PropTypes.oneOf(['text', 'password']),
};

export default InputField;
