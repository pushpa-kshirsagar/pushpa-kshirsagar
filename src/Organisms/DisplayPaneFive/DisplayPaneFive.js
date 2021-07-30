import React, { useState } from 'react';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneFive.css';
import { useDispatch, useSelector } from 'react-redux';
import ReactHTMLParser from 'react-html-parser';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SET_PANE_THREE_ITEM_PREVIEW_MODE, SET_POPUP_VALUE } from '../../actionType';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import { DialogContent } from '@material-ui/core';
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
import PopUpItemFramework from '../../PopUpInformation/PopUpItemFramework';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

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
  const { reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpOpen } = useSelector((state) => state.PopUpReducer);
  const onClickFooter = (e) => {
    // dispatch({ type: NAVIGATOR_MODE });
  };

  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);

  const primaryIcon = [];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  const onClickRevise = () => {
    console.log('ON CLICK REVISE ICON');
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    console.log('ON CLICK cancel ICON');
    setIsShowReviseIcon(true);
  };
  const onClickReviseFinish = () => {
    console.log('ON CLICK finish ICON');
    setIsShowReviseIcon(true);
    dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: false });
  };
  const revisePrimaryIcon = [{ label: 'revise', onClick: onClickRevise, Icon: ReviseIcon }];

  const reviseSecondaryIcons = [
    { label: 'cancel', onClick: onClickReviseCancel, Icon: ClearIcon },
    { label: 'finish', onClick: onClickReviseFinish, Icon: Check }
  ];

  const optionLabel =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp;";
  const itemLabel = '<span>item</span>&nbsp';
  const itemLabelText =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const responseLabel =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const itemDescription =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>description</span>&nbsp;";
  const responseDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>description</span>&nbsp;";
  const responseChoiceDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp; <span class='iguru-header-badge1_0'>description</span>&nbsp;";
  const [questionOptionList, setQuestionOptionList] = useState([
    {
      id: 'option-1',
      value: optionLabel,
      choiceDescription: responseChoiceDescription
    },
    { id: 'option-2', value: optionLabel, choiceDescription: responseChoiceDescription },
    { id: 'option-3', value: optionLabel, choiceDescription: responseChoiceDescription },
    { id: 'option-4', value: optionLabel, choiceDescription: responseChoiceDescription }
  ]);
  const [innerContent, setInnerContent] = useState(itemLabel);
  const [labelText, setLabelText] = useState(itemLabelText);
  const [responselabelText, setResponseLabelText] = useState(responseLabel);
  const [itemDescriptionText, setItemDescriptionText] = useState(itemDescription);
  const [responseDescriptionText, setResponseDescriptionText] = useState(responseDescription);
  // const [responseChoiceDescriptionText, setResponseChoiceDescriptionText] = useState(
  //   responseChoiceDescription
  // );
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
  const itemPrimaryPopupOption = [
    {
      data: 'configure',
      dataValue: 'configure',
      dataKey: 'configureAPICall',
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
    if (targetValue === 'configure') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_CHOICE_FRAMEWORK_POPUP',
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
  };
  const ChangeTripleDotOptionPopup = (e) => {};
  const ChangeItemOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    console.log(targetValue);
    if (targetValue === 'configure') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ITEM_FRAMEWORK_POPUP',
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
  };

  const BackHandlerEvent = (e) => {};

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="itemPreview"
          showClearIcon
          headerOne="item"
          headerOneBadgeOne="information"
          headerOneBadgeTwo="media"
          headerPanelColour="blue"
          onClickClearInfo={closePreview}
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
              {/* <div className={'backArrow'}>
                <IconButton onClick={closePreview} className="MuiIconButton-root-1602">
                  <Clear className={''} />
                </IconButton>
              </div> */}
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
          <div>
            <div
              style={{
                padding: '2.5px 5px',
                alignItems: 'center',
                overflow: 'overlay',
                color: 'rgba(0, 0, 0, 0.87)'
              }}
              onClick={() => {
                dispatch({
                  type: SET_POPUP_VALUE,
                  payload: {
                    isPopUpValue: 'ITEM_LABEL_MEDIA_TEXT',
                    popupMode: popupMode
                  }
                });
              }}
            >
              {ReactHTMLParser(labelText)}
            </div>
            <div
              style={{
                padding: '2.5px 5px',
                alignItems: 'center',
                overflow: 'overlay',
                color: 'rgba(0, 0, 0, 0.87)'
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
            >
              {ReactHTMLParser(innerContent)}
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
            <div
              style={{
                padding: '2.5px 5px',
                alignItems: 'center',
                overflow: 'overlay',
                color: 'rgba(0, 0, 0, 0.87)'
              }}
              onClick={() => {
                dispatch({
                  type: SET_POPUP_VALUE,
                  payload: {
                    isPopUpValue: 'ITEM_DESCRIPTION_MEDIA_TEXT',
                    popupMode: popupMode
                  }
                });
              }}
            >
              {ReactHTMLParser(itemDescriptionText)}
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
            <div
              style={{
                padding: '2.5px 5px',
                alignItems: 'center',
                overflow: 'overlay',
                color: 'rgba(0, 0, 0, 0.87)'
              }}
              onClick={() => {
                dispatch({
                  type: SET_POPUP_VALUE,
                  payload: {
                    isPopUpValue: 'RESPONSE_LABEL_MEDIA_TEXT',
                    popupMode: popupMode
                  }
                });
              }}
            >
              {ReactHTMLParser(responselabelText)}
            </div>
          </div>
          <FormControl component="fieldset">
            <div className={['containerPadding'].join(' ')}>
              <RadioGroup defaultValue="" aria-label="Options" name="customized-radios">
                {questionOptionList.map((op, key) => {
                  return (
                    <>
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
                            overflow: 'overlay',
                            color: 'rgba(0, 0, 0, 0.87)'
                          }}
                          onClick={() => {
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
                        <PopUpTextSheet
                          isActive={isPopUpValue === `RESPONSE_CHOICE_DESCRIPTION_${key}`}
                          headerOne={'response'}
                          headerPanelColour={'genericOne'}
                          headerOneBadgeOne={'choice'}
                          headerOneBadgeTwo={`description`}
                          basicInfo={{}}
                          typeOfSetObject={''}
                          defaultSheetValue={op.choiceDescription}
                          actualLableValue={'assessmentManuscriptSecondary'}
                          mode={'revise'}
                          onClickSave={(innerText) => {
                            setQuestionOptionList((opArr) => {
                              opArr.forEach((element) => {
                                if (element.id === op.id) {
                                  element.choiceDescription = innerText;
                                }
                              });
                              return opArr;
                            });
                          }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            padding: '2.5px 5px',
                            alignItems: 'center',
                            overflow: 'overlay',
                            margin: '0 0 0 12px',
                            color: 'rgba(0, 0, 0, 0.87)'
                          }}
                          onClick={() => {
                            dispatch({
                              type: SET_POPUP_VALUE,
                              payload: {
                                isPopUpValue: `RESPONSE_CHOICE_DESCRIPTION_${key}`,
                                popupMode: `OPTION_${key}`
                              }
                            });
                          }}
                        >
                          {ReactHTMLParser(op.choiceDescription)}
                        </div>
                      </div>
                    </>
                  );
                })}
              </RadioGroup>
            </div>
          </FormControl>
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
            <div
              style={{
                padding: '2.5px 5px',
                alignItems: 'center',
                overflow: 'overlay',
                margin: '0 0 0 12px',
                color: 'rgba(0, 0, 0, 0.87)'
              }}
              onClick={() => {
                dispatch({
                  type: SET_POPUP_VALUE,
                  payload: {
                    isPopUpValue: 'RESPONSE_DESCRIPTION_TEXT',
                    popupMode: ``
                  }
                });
              }}
            >
              {ReactHTMLParser(responseDescriptionText)}
            </div>
          </div>
        </div>
      </div>
      <Popup isActive={isPopUpValue === 'ITEM_TRIPLE_DOT_PRIMARY_POPUP'}>
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
            ChangeOptionPopup={ChangeTripleDotOptionPopup}
            currentPopUpOption={itemPrimaryPopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>

      <Popup isActive={isPopUpValue === 'ITEM_OPTION_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'response'}
          headerOneBadgeOne={'choice'}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            currentPopUpOption={itemPrimaryPopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>

      <Popup isActive={isPopUpValue === 'ITEM_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'item'}
          headerOneBadgeOne={''}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeItemOptionPopup}
            currentPopUpOption={itemPrimaryPopupOption}
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
        defaultSheetValue={labelText}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          setLabelText(innerText);
        }}
      />
      <PopUpTextSheet
        isActive={isPopUpValue === `RESPONSE_LABEL_MEDIA_TEXT`}
        headerOne={'response'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'label'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={responselabelText}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          setResponseLabelText(innerText);
        }}
      />
      <PopUpTextSheet
        isActive={isPopUpValue === `ITEM_DESCRIPTION_MEDIA_TEXT`}
        headerOne={'item'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'description'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={itemDescriptionText}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          setItemDescriptionText(innerText);
        }}
      />
      <PopUpTextSheet
        isActive={isPopUpValue === `RESPONSE_DESCRIPTION_TEXT`}
        headerOne={'response'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'description'}
        headerOneBadgeTwo={''}
        basicInfo={{}}
        typeOfSetObject={''}
        defaultSheetValue={responseDescriptionText}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          setResponseDescriptionText(innerText);
        }}
      />

      <PopUpItemFramework
        isActive={isPopUpValue === 'ITEM_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={''}
        inputHeader={'item'}
        primaryheader={'framework'}
        isItemFramework={true}
        mode={'revise'}
      />

      <PopUpItemFramework
        isActive={isPopUpValue === 'ITEM_CHOICE_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={'information'}
        inputHeader={'response'}
        primaryheader={'choice'}
        nextPopUpValue={''}
        mode={'revise'}
      />
      {reviewMode === 'revise' ? (
        <FooterIconTwo
          className={'widthDisplayPaneFive'}
          FilterModeEnable={isShowReviseIcon}
          FilterMode={FilterMode}
          onClick={onClickRevise}
          primaryIcon={revisePrimaryIcon}
          secondaryIcon={reviseSecondaryIcons}
        />
      ) : (
        <FooterIconTwo
          className={'widthDisplayPaneFive'}
          FilterModeEnable={false}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
    </>
  );
};

export default DisplayPaneFive;
