import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SelectField.css';
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export const SelectField = (props) => {
  const { tag, label, textList = [] } = props;
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor="ig-select-prefix" style={{ marginBottom: 0, fontSize: '1.6rem' }}>
          {label}
        </InputLabel>
        <Select
          id={tag}
          value={selectedOption}
          onChange={handleChange}
          style={{ fontSize: 'unset' }}
        >
          {textList.map((option, index) =>
            option === 'divider' ? (
              <Divider light />
            ) : (
              <MenuItem key={`${tag}-${index}`} value={option} style={{ fontSize: '1.6rem' }}>
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
  tag: PropTypes.string,
  label: PropTypes.string,
  textList: PropTypes.array
};

export default SelectField;
