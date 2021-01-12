import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SelectField.css';
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export const SelectField = (props) => {
  const { selectId, selectLabel, selectOption = [] } = props;
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <FormControl style={{ width: '100%' }}>
        <InputLabel
          htmlFor="ig-select-prefix"
          style={{ marginBottom: 0 }}
        >
          {selectLabel}
        </InputLabel>
        <Select
          id={selectId}
          value={selectedOption}
          onChange={handleChange}
          style={{ fontSize: 'unset' }}
        >
          {selectOption.map((option, index) =>
            option === 'divider' ? (
              <Divider light />
            ) : (
              <MenuItem key={`${selectId}-${index}`} value={option} style={{ fontSize: '1.6rem' }}>
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
  selectId: PropTypes.string,
  selectLabel: PropTypes.string,
  selectOption: PropTypes.array,
};

export default SelectField;
