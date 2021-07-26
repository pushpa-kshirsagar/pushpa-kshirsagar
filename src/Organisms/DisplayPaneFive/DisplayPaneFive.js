import React, { useState } from 'react';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneFive.css';
import { useDispatch, useSelector } from 'react-redux';
import Manuscript from '@material-ui/icons/Description';
import ReactCKEditor from 'react-ckeditor-component';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SET_PANE_THREE_ITEM_PREVIEW_MODE, SET_POPUP_VALUE } from '../../actionType';
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
import PopUpTextSheet from '../../PopUpIcon/PopUpTextSheet';

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
    { id: 'option-1', value: 'Option' },
    { id: 'option-2', value: 'Option' },
    { id: 'option-3', value: 'Option' },
    { id: 'option-4', value: 'Option' }
  ]);
  const [innerContent, setInnerContent] = useState('');
  const [isPreviewMode, setPreviewMode] = useState(false);
  const [optionPopupValue, setOptionPopupValue] = useState('');
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);

  const addOption = () => {
    setQuestionOptionList([
      ...questionOptionList,
      { id: `option-${questionOptionList.length + 1}`, value: 'Option' }
    ]);
  };
  const onChangeTextSheet = (evt) => {
    setInnerContent(evt.editor.getData());
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
            <div style={{ flex: '1' }} className="flex-center">
              <IconButton
                onClick={async () => {
                  setPreviewMode((st) => !st);
                  // if (isPreviewMode) {
                  //   const requestOptions = {
                  //     method: 'POST',
                  //     headers: new Headers({
                  //       Authorization: localStorage.getItem('token')
                  //     }),
                  //     body: JSON.stringify({ file: innerContent })
                  //   };
                  //   const response = await fetch('https://5z33kqknpl.execute-api.ap-south-1.amazonaws.com/dev/file-upload-n', requestOptions);
                  //   const json = await response.json();
                  //   console.log(json);
                  // }
                  console.log('PREVIEW');
                }}
                className="MuiIconButton-root-1602"
              >
                <Manuscript className={''} />
              </IconButton>
            </div>
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
        </div>
        <div
          className="containerPadding"
          style={{ height: 'calc(100vh - 200px)', overflow: 'overlay' }}
        >
          <div>
            {isPreviewMode ? (
              <div
                style={{
                  padding: '2.5px 5px',
                  alignItems: 'center',
                  //  height: 'calc(100vh - 190px)',
                  overflow: 'overlay'
                  // display: 'flex'
                }}
                dangerouslySetInnerHTML={{ __html: innerContent }}
              ></div>
            ) : (
              <ReactCKEditor
                activeClass="editor"
                content={innerContent}
                // onInit={(editor) => {
                //   editor.ui.view.editable.element.parentElement.insertBefore(
                //     editor.ui.view.toolbar.element,
                //     editor.ui.view.editable.element
                //   );
                // }}
                events={{
                  // blur: this.onBlur,
                  // afterPaste: this.afterPaste,
                  change: onChangeTextSheet
                }}
                contentEditable="true"
                config={{
                  isReadOnly: false,
                  mediaEmbed: true
                }}
              />
              // <TextareaAutosize
              //   className={'text-area'}
              //   maxRows={4}
              //   aria-label="maximum height"
              //   placeholder="Enter your question and select single answer from list"
              //   defaultValue=""
              // />
            )}
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
          <FormControl component="fieldset">
            <div className={['containerPadding'].join(' ')}>
              <RadioGroup defaultValue="" aria-label="Options" name="customized-radios">
                {questionOptionList.map((op, key) => {
                  return (
                    <div className="option-container" key={`${op.value}-${key}`}>
                      <FormControlLabel
                        className={'radio-button'}
                        value={`${op.value} ${key + 1}`}
                        control={<StyledRadio />}
                        label=""
                      />
                      <div
                        style={{
                          padding: '2.5px 5px',
                          alignItems: 'center',
                          //  height: 'calc(100vh - 190px)',
                          overflow: 'overlay'
                          // display: 'flex'
                        }}
                        onClick={() => {
                          // setOptionPopupValue(`OPTION_${key}`);
                          dispatch({
                            type: SET_POPUP_VALUE,
                            payload: {
                              isPopUpValue: `OPTION_${key}`,
                              popupMode: ''
                            }
                          });
                        }}
                        dangerouslySetInnerHTML={{ __html: op.value }}
                      ></div>
                      {/* <Input
                        type={'text'}
                        id={op.id}
                        name={op.id}
                        autoComplete="off"
                        placeholder={op.id}
                        className={['option-input'].join(' ')}
                      /> */}
                      <PopUpTextSheet
                        isActive={isPopUpValue === `OPTION_${key}`}
                        headerOne={'item'}
                        headerPanelColour={'genericOne'}
                        headerOneBadgeOne={'option'}
                        headerOneBadgeTwo={`${key + 1}`}
                        basicInfo={{}}
                        typeOfSetObject={''}
                        defaultSheetValue={op.value}
                        actualLableValue={'assessmentManuscriptSecondary'}
                        mode={'revise'}
                        onClickSave={(innerText) => {
                          setQuestionOptionList((opArr) => {
                            opArr.forEach((element) => {
                              if (element.id === op.id) {
                                element.value = innerText;
                              }
                            });
                            return opArr;
                          });
                        }}
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
