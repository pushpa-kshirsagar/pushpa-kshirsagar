import React, { useState } from 'react';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneFive.css';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SET_PANE_THREE_ITEM_PREVIEW_MODE } from '../../actionType';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import InputFeild from '../../Atoms/InputField/InputField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Label from '../../Atoms/Label/Label';
import clsx from 'clsx';
import { Divider, IconButton, Input } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5'
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)'
    }
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""'
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3'
    }
  }
});
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export const DisplayPaneFive = () => {
  const dispatch = useDispatch();
  const closePreview = () => {
    dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: false });
  };
  const [questionOptionList, setQuestionOptionList] = useState([
    { name: 'Option' },
    { name: 'Option' },
    { name: 'Option' },
    { name: 'Option' }
  ]);

  const addOption = () => {
    setQuestionOptionList([...questionOptionList, { name: 'Option' }]);
  };

  const removeOption = () => {
    if (questionOptionList.length > 2) {
      let arr = questionOptionList;
      let newArr = arr.slice(0, -1);
      setQuestionOptionList(newArr);
    }
  };

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane=""
          headerOne=""
          headerOneBadgeOne=""
          headerPanelColour="blue"
        />
      </div>
      <div className="containerPadding">
        <div className="containerPadding sticky-header">
          <div style={{ height: '50px', padding: '0 5px', display: 'flex' }}>
            <div style={{ flex: '2' }} className="flex-center">
              <p onClick={removeOption} className={'icon-button-option'}>
                -
              </p>
              <span style={{ fontWeight: 'bold', margin: '0 5px 0 5px' }}>
                {' '}
                {questionOptionList.length}{' '}
              </span>
              <p onClick={addOption} className={'icon-button-option'}>
                +
              </p>
            </div>
            <div style={{ flex: '1' }} className="flex-center">
              <span style={{ fontWeight: 'bold' }}> </span>
            </div>
            <div style={{ flex: '1' }} className="flex-center">
              <div className={'backArrow'}>
                <IconButton onClick={closePreview} className="MuiIconButton-root-1602">
                  <Clear className={''} />
                </IconButton>
              </div>
            </div>
            <div style={{ flex: '1' }} className="flex-center"></div>
            <div style={{ flex: '1' }} className="flex-center">
              {/* <IconButton onClick={flagQuestion} className={'assessmentFlagButton'}>
                {isQuestionFlaged ? (
                  <i className="fa fa-flag" style={{ color: '#ff6464' }}></i>
                ) : (
                  <i className="far fa-flag"></i>
                )}
              </IconButton> */}
            </div>
          </div>
          <hr
            style={{
              height: '1px',
              margin: '0',
              border: 'none',
              flexShrink: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.12)'
            }}
          />
          <div>
            <TextareaAutosize
              className={'text-area'}
              maxRows={4}
              aria-label="maximum height"
              placeholder="Enter your question and select single answer from list"
              defaultValue=""
            />
          </div>
          <hr
            style={{
              height: '1px',
              margin: '0',
              border: 'none',
              flexShrink: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.12)'
            }}
          />
        </div>
        <div className="containerPadding">
          <FormControl component="fieldset">
            <div className={['containerPadding'].join(' ')}>
              <RadioGroup defaultValue="" aria-label="Options" name="customized-radios">
                {questionOptionList.map((op, key) => {
                  return (
                    <div className="option-container" key={`${op.name}-${key}`}>
                      <FormControlLabel
                        className={'radio-button'}
                        value={`${op.name} ${key + 1}`}
                        control={<StyledRadio />}
                        label=""
                      />
                      <Input
                        type={'text'}
                        id={`${op.name}-${key + 1}`}
                        name={`${op.name}-${key + 1}`}
                        autoComplete="off"
                        placeholder={`${op.name}-${key + 1}`}
                        className={['option-input'].join(' ')}
                      />
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default DisplayPaneFive;
