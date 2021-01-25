import React from 'react';
import PropTypes from 'prop-types';
import './InputField.css';
import { Input, InputLabel, FormControl, FormHelperText } from '@material-ui/core';

export const InputField = (props) => {
  const { id, label, type = 'text', errorMsg = '', onClick, value } = props;
  return (
    <div className="popup-form-box">
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor={id} style={{ fontSize: '1.6rem' }}>
          {label}
        </InputLabel>
        <Input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onClick}
          autoComplete="off"
          className={'inputFields'}
        />
      </FormControl>
      <FormHelperText className={['helperText', 'helptextmargin'].join(' ')}>
        <span>{errorMsg}</span>
      </FormHelperText>
    </div>
  );
};

InputField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password'])
};

export default InputField;
