import React, { useRef, useState } from 'react';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneFive.css';
import { useDispatch, useSelector } from 'react-redux';
import Manuscript from '@material-ui/icons/Description';
import ReactCKEditor from 'react-ckeditor-component';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import JoditEditor from 'jodit-react';
import ReactHTMLParser from 'react-html-parser';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  table,
  textStyle,
  image,
  video,
  link,
  audio
  // codeView,
  // preview
} from 'suneditor/src/plugins';
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
import { DialogContent, Divider, IconButton, Input } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import PopUpTextSheet from '../../PopUpIcon/PopUpTextSheet';
import PopupHeader from '../../Molecules/PopUp/PopUpHeader';
import Popup from '../../Molecules/PopUp/PopUp';
import JsonRenderComponent from '../../Actions/JsonRenderComponent';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import PopUpDropList from '../../PopUpInformation/PopUpDropList';

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
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpOpen } = useSelector((state) => state.PopUpReducer);
  const onClickFooter = (e) => {
    // dispatch({ type: NAVIGATOR_MODE });
  };

  const primaryIcon = [];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  const optionLabel =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_0'>option</span>&nbsp; <span class='iguru-header-badge1_0'>media</span>";
  const itemLabel = "<span>item</span>&nbsp <span class='iguru-header-badge1_0'>media</span>";
  const [questionOptionList, setQuestionOptionList] = useState([
    {
      id: 'option-1',
      value: optionLabel
    },
    { id: 'option-2', value: optionLabel },
    { id: 'option-3', value: optionLabel },
    { id: 'option-4', value: optionLabel }
  ]);
  const [innerContent, setInnerContent] = useState(itemLabel);
  const [isPreviewMode, setPreviewMode] = useState(false);
  const [optionPopupValue, setOptionPopupValue] = useState('');
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const addOption = () => {
    setQuestionOptionList([
      ...questionOptionList,
      { id: `option-${questionOptionList.length + 1}`, value: optionLabel }
    ]);
  };
  const itemPopupOption = [
    {
      data: 'description',
      dataValue: 'description',
      dataKey: 'descriptionAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'label',
      dataValue: 'label',
      dataKey: 'labelAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'revise',
      dataValue: 'revise',
      dataKey: 'reviseAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'score',
      dataValue: 'score',
      dataKey: 'scoreAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'weightage',
      dataValue: 'weightage',
      dataKey: 'weightageAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    }
  ];
  const itemMediaPopupOption = [
    {
      data: 'blank',
      dataValue: 'blank',
      dataKey: 'blankAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'description',
      dataValue: 'description',
      dataKey: 'descriptionAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'difficulty',
      dataValue: 'difficulty',
      dataKey: 'difficultyAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'group',
      dataValue: 'group',
      dataKey: 'groupAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'label',
      dataValue: 'label',
      dataKey: 'labelAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'polarity',
      dataValue: 'polarity',
      dataKey: 'polarityAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'revise',
      dataValue: 'revise',
      dataKey: 'reviseAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'score',
      dataValue: 'score',
      dataKey: 'scoreAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'sequence',
      dataValue: 'sequence',
      dataKey: 'sequenceAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'time',
      dataValue: 'time',
      dataKey: 'timeAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'type',
      dataValue: 'type',
      dataKey: 'typeAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    },
    {
      data: 'word',
      dataValue: 'word',
      dataKey: 'wordAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
    }
  ];

  const onChangeTextSheet = (event, editor) => {
    console.log('EDITOR===>', event);
    setInnerContent(editor.getData());
  };
  const handleChange = (content) => {
    console.log('EDITOR===>', content);
    setInnerContent(content);
  };
  const removeOption = () => {
    if (questionOptionList.length > 2) {
      let arr = questionOptionList;
      let newArr = arr.slice(0, -1);
      setQuestionOptionList(newArr);
    }
  };
  const setSecondaryOptionValue = (e) => {
    //TODO: set secondary option in assessments
  };

  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    console.log(targetValue);
    if (targetValue === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_DESCRIPTION_MEDIA_TEXT',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'label') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_LABEL_MEDIA_TEXT',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'revise' && popupMode !== '') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: popupMode,
          popupMode: ''
        }
      });
    }
    if (targetValue === 'score') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_OPTION_SCORE_POPUP',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'weightage') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_OPTION_WEIGHTAGE_POPUP',
          popupMode: ''
        }
      });
    }
  };
  const ChangeItemOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    console.log(targetValue);
    if (targetValue === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_DESCRIPTION_MEDIA_TEXT',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'label') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_LABEL_MEDIA_TEXT',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'revise') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_MEDIA_TEXT',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'score') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_OPTION_SCORE_POPUP',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'blank') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_BLANK_POPUP',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'difficulty') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_DIFFICULTY_POPUP',
          popupMode: ''
        }
      });
    }
    if (targetValue === 'difficulty') {
    }
    if (targetValue === 'group') {
    }
    if (targetValue === 'polarity') {
    }
    if (targetValue === 'sequence') {
    }
    if (targetValue === 'time') {
    }
    if (targetValue === 'type') {
    }
    if (targetValue === 'word') {
    }
  };

  const BackHandlerEvent = (e) => {};
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
              {/* <IconButton
                onClick={async () => {
                  setPreviewMode((st) => !st);
                  console.log('PREVIEW');
                }}
                className="MuiIconButton-root-1602"
              >
                <Manuscript className={''} />
              </IconButton> */}
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
          {/* <Label className="" text={'media'} fontSize="1.6rem" colour="rgba(0, 0, 0, 0.87)" /> */}
          <div>
            {/* {isPreviewMode ? ( */}
            <div
              style={{
                padding: '2.5px 5px',
                alignItems: 'center',
                //  height: 'calc(100vh - 190px)',
                overflow: 'overlay'
                // display: 'flex'
              }}
              onClick={() => {
                dispatch({
                  type: SET_POPUP_VALUE,
                  payload: {
                    isPopUpValue: 'ITEM_PRIMARY_POPUP',
                    popupMode: popupMode
                  }
                });
              }}
              // dangerouslySetInnerHTML={{ __html: innerContent }}
            >
              {ReactHTMLParser(innerContent)}
            </div>
            {/* ) : (
              <SunEditor
                setOptions={{
                  showPathLabel: false,
                  minHeight: '50vh',
                  maxHeight: '50vh',
                  placeholder: 'Enter your text here!!!',
                  plugins: [
                    align,
                    font,
                    fontColor,
                    fontSize,
                    formatBlock,
                    hiliteColor,
                    horizontalRule,
                    lineHeight,
                    list,
                    table,
                    textStyle,
                    image,
                    video,
                    link,
                    audio
                  ],
                  buttonList: [
                    ['undo', 'redo'],
                    ['font', 'fontSize', 'formatBlock'],
                    ['bold', 'underline', 'italic', 'strike'],
                    ['fontColor', 'hiliteColor'],
                    ['removeFormat', 'codeView', 'preview'],
                    '/', // Line break
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                    ['table', 'link', 'image', 'video', 'audio']
                  ],
                  // formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                  font: ['Arial', 'Calibri', 'Times New Roman']
                }}
                setContents={innerContent}
                onChange={handleChange}
              />
            )} */}
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
                          // dispatch({
                          //   type: SET_POPUP_VALUE,
                          //   payload: {
                          //     isPopUpValue: `OPTION_${key}`,
                          //     popupMode: ''
                          //   }
                          // });
                          dispatch({
                            type: SET_POPUP_VALUE,
                            payload: {
                              isPopUpValue: 'ITEM_OPTION_PRIMARY_POPUP',
                              popupMode: `OPTION_${key}`
                            }
                          });
                        }}
                        dangerouslySetInnerHTML={{
                          __html: op.value
                        }}
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
      <Popup isActive={isPopUpValue === 'ITEM_OPTION_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'items'}
          headerOneBadgeOne={''}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            currentPopUpOption={itemPopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      <Popup isActive={isPopUpValue === 'ITEM_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'items'}
          headerOneBadgeOne={'media'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeItemOptionPopup}
            currentPopUpOption={itemMediaPopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      <PopUpTextSheet
        isActive={isPopUpValue === `ITEM_MEDIA_TEXT`}
        headerOne={'item'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'media'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={innerContent}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          setInnerContent(innerText);
        }}
      />
      <PopUpTextSheet
        isActive={isPopUpValue === `ITEM_LABEL_MEDIA_TEXT`}
        headerOne={'item'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'label'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={''}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {}}
      />
      <PopUpTextSheet
        isActive={isPopUpValue === `ITEM_DESCRIPTION_MEDIA_TEXT`}
        headerOne={'item'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'description'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={''}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {}}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ITEM_OPTION_SCORE_POPUP'}
        label={'score'}
        headerPanelColour={'genericOne'}
        inputHeader={''}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        type={'number'}
        headerOne={'item'}
        headerOneBadgeOne={'score'}
        isRequired={false}
        actualLableValue={''}
        basicInfo={{}}
        typeOfSetObject={''}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={'revise'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ITEM_OPTION_WEIGHTAGE_POPUP'}
        label={'weightage'}
        headerPanelColour={'genericOne'}
        inputHeader={''}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        type={'number'}
        headerOne={'item'}
        headerOneBadgeOne={'weightage'}
        isRequired={false}
        actualLableValue={''}
        basicInfo={{}}
        typeOfSetObject={''}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={'revise'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ITEM_BLANK_POPUP'}
        label={'blank'}
        headerPanelColour={'genericOne'}
        inputHeader={''}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        type={'number'}
        headerOne={'item'}
        headerOneBadgeOne={'blank'}
        isRequired={false}
        actualLableValue={''}
        basicInfo={{}}
        typeOfSetObject={''}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={'revise'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEM_DIFFICULTY_POPUP'}
        tag={'assesseeGender'}
        label={'difficulty'}
        listSelect={[
          { id: 'Low', name: 'Female' },
          { id: 'Medium', name: 'Medium' },
          { id: 'High', name: 'High' }
        ]}
        mappingValue={'id'}
        labelval={'difficulty'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={''}
        isRequired={true}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        basicInfo={{}}
        typeOfSetObject={''}
      />
      <FooterIconTwo
        className={'widthDisplayPaneFive'}
        FilterModeEnable={false}
        FilterMode={FilterMode}
        onClick={onClickFooter}
        primaryIcon={primaryIcon}
        secondaryIcon={secondaryIcon}
      />
    </>
  );
};

export default DisplayPaneFive;
