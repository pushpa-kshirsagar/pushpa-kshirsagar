import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './SelectField.css';
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText
} from '@material-ui/core';

export const SelectField = (props) => {
  const { tag, label, listSelect = [], errorMsg, onChange, value, mappingValue } = props;
  return (
    <Fragment>
      <FormControl className={'selectFormText'}>
        <InputLabel htmlFor={tag} style={{ marginBottom: 0, fontSize: '1.6rem' }}>
          {label}
        </InputLabel>
        <Select id={tag} name={tag} value={value} onChange={onChange} className={'selectFontAlign'}>
          {listSelect.map((option, index) =>
            option === 'divider' ? (
              <Divider light />
            ) : (
              <MenuItem key={`${tag}-${index}`}  value={option[mappingValue]} className={'selectMenu'}>
                {option.name}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
      <FormHelperText className={['helperText', 'helptextmargin'].join(' ')}>
        {errorMsg}
      </FormHelperText>
    </Fragment>
  );
};

SelectField.propTypes = {
  tag: PropTypes.string,
  label: PropTypes.string,
  listSelect: PropTypes.array
};

export default SelectField;
