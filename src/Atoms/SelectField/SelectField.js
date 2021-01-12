import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SelectField.css';
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export const SelectField = (props) => {
  const { id, label, options = [] } = props;
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <FormControl style={{ width: '100%' }}>
        <InputLabel
          htmlFor="ig-select-prefix"
          style={{ marginBottom: 0, fontSize: '1.6rem' }}
        >
          {label}
        </InputLabel>
        <Select
          id={id}
          value={selectedOption}
          onChange={handleChange}
          style={{ fontSize: 'unset' }}
        >
          {options.map((option, index) =>
            option === 'divider' ? (
              <Divider light />
            ) : (
              <MenuItem key={`${id}-${index}`} value={option} style={{ fontSize: '1.6rem' }}>
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
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
};

export default SelectField;
