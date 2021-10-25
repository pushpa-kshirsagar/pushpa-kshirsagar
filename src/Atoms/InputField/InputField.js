import React from 'react';
import PropTypes from 'prop-types';
import './InputField.css';
import { Input, InputLabel, FormControl, FormHelperText } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

export const InputField = (props) => {
  const {
    id,
    label,
    type = 'text',
    errorMsg = '',
    onClick,
    value,
    labelBadgeOne,
    isRequired = true,
    autoFocus = false,
    classNames = '',
    isErrorMsg = true,
    currencySymbol = '',
    issetTime = false
  } = props;
  return (
    <div className="popup-form-box">
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor={id} style={{ fontSize: '1.6rem' }}>
          {label} &nbsp;
          {labelBadgeOne ? <span className={'labelheaderBadge'}>{labelBadgeOne}</span> : null}
        </InputLabel>

        {currencySymbol === '' ?
          (
            <Input
              type={type}
              id={id}
              name={id}
              value={issetTime ? value === 0 ? "01:00:00" : value : value}
              onChange={onClick}
              autoComplete="off"
              autoFocus={autoFocus}
              className={['inputFields', classNames].join(' ')}
            />
          ) : (
            <Input
              type={type}
              id={id}
              name={id}
              value={value}
              onChange={onClick}
              autoComplete="off"
              autoFocus={autoFocus}
              className={['inputFields', classNames].join(' ')}
              startAdornment={
                <InputAdornment
                  style={{ paddingRight: '5px' }}
                  className={'inputFieldsAdorment'}
                  position="start"
                >
                  {currencySymbol}
                </InputAdornment>
              }
            />
          )}

        {/* {currencySymbol !== '' ? (
          <Input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onClick}
            autoComplete="off"
            autoFocus={autoFocus}
            className={['inputFields', classNames].join(' ')}
            startAdornment={
              <InputAdornment
                style={{ paddingRight: '5px' }}
                className={'inputFieldsAdorment'}
                position="start"
              >
                {currencySymbol}
              </InputAdornment>
            }
          />
        ) :
          time ? (
            <Input
              type={type}
              id={id}
              name={id}
              value={value === 0 ? "00:00:00" : ''}
              onChange={onClick}
              autoComplete="off"
              autoFocus={autoFocus}
              className={['inputFields', classNames].join(' ')}
            //inputComponent={TextMaskCustom}
            />
          ) : (
            <Input
              type={type}
              id={id}
              name={id}
              value={value}
              onChange={onClick}
              autoComplete="off"
              autoFocus={autoFocus}
              className={['inputFields', classNames].join(' ')}
            />
          )} */}
        {/*         
        {currencySymbol === '' ? (
          <Input
            type={type}
            id={id}
            name={id}
            value={"00:00:00"}
            onChange={onClick}
            autoComplete="off"
            autoFocus={autoFocus}
            className={['inputFields', classNames].join(' ')}
          />
        ) : 
        time ? (
          <Input
          type={type}
          id={id}
          name={id}
          value={"07:00:00"}
          onChange={onClick}
          autoComplete="off"
          autoFocus={autoFocus}
          className={['inputFields', classNames].join(' ')}
          //inputComponent={TextMaskCustom}
        />
        ):
          (
            <Input
              type={type}
              id={id}
              name={id}
              value={value}
              onChange={onClick}
              autoComplete="off"
              autoFocus={autoFocus}
              className={['inputFields', classNames].join(' ')}
              startAdornment={
                <InputAdornment
                  style={{ paddingRight: '5px' }}
                  className={'inputFieldsAdorment'}
                  position="start"
                >
                  {currencySymbol}
                </InputAdornment>
              }
            />
          )} */}
      </FormControl>
      {isRequired && (
        <FormHelperText
          className={[isErrorMsg ? 'helperText' : 'helperTextDefault', 'helptextmargin'].join(' ')}
        >
          <span>{errorMsg}</span>
        </FormHelperText>
      )}
    </div>
  );
};

InputField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'datetime-local', 'date'])
};

export default InputField;
