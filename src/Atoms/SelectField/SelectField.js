import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SelectField.css';
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export const SelectField = (props) => {
  const { inputFieldTag, inputFieldLabel, inputFieldList = [] } = props;
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor="ig-select-prefix" style={{ marginBottom: 0, fontSize: '1.6rem' }}>
          {inputFieldLabel}
        </InputLabel>
        <Select
          id={inputFieldTag}
          value={selectedOption}
          onChange={handleChange}
          style={{ fontSize: 'unset' }}
        >
          {inputFieldList.map((option, index) =>
            option === 'divider' ? (
              <Divider light />
            ) : (
              <MenuItem
                key={`${inputFieldTag}-${index}`}
                value={option}
                style={{ fontSize: '1.6rem' }}
              >
                {option}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </div>
  );
};

SelectField.propTypes = {
  inputFieldTag: PropTypes.string,
  inputFieldLabel: PropTypes.string,
  inputFieldList: PropTypes.array
};

export default SelectField;
