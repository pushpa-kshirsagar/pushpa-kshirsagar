import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './SelectField.css';
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Input
} from '@material-ui/core';

export const SelectField = (props) => {
  const {
    tag,
    label,
    listSelect = [],
    errorMsg,
    onChange,
    value,
    mappingValue,
    dataValue = '',
    labelBadgeOne = '',
    isMultiSelect = false,
    name = 'name'
  } = props;
  console.log('value', value && value.toString());
  return (
    <Fragment>
      <FormControl className={'selectFormText'}>
        <InputLabel htmlFor={tag} style={{ marginBottom: 0, fontSize: '1.6rem' }}>
          {label} &nbsp;
          {labelBadgeOne ? <span className={'labelheaderBadge'}>{labelBadgeOne}</span> : null}
        </InputLabel>
        <Select
          id={tag}
          name={tag}
          value={value}
          onChange={onChange}
          data-value={dataValue}
          multiple={isMultiSelect}
          renderValue={isMultiSelect ? (selected) => selected.join(', ') : null}
          input={<Input />}
          className={'selectFontAlign'}
        >
          {mappingValue
            ? listSelect.map((option, index) =>
                option === 'divider' ? (
                  <Divider light />
                ) : (
                  <MenuItem
                    key={`${tag}-${index}`}
                    value={option[mappingValue]}
                    className={'selectMenu'}
                  >
                    {/* <div>{createNameWithBadge(option[name])}</div> */}
                    <div>{`${(option.name && option.name) || option[mappingValue]} ${
                      option.description ? `(${option.description})` : ''
                    }`}</div>
                  </MenuItem>
                )
              )
            : listSelect.map((option, index) => (
                <MenuItem key={`${tag}-${index}`} value={option} className={'selectMenu'}>
                  {option}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <FormHelperText className={['helperText', 'margin-left-right-5', 'helptextmargin'].join(' ')}>
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
