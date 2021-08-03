import React, { useState } from 'react';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneFive.css';
import { useDispatch, useSelector } from 'react-redux';
import ReactHTMLParser from 'react-html-parser';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  ITEM_INFO_REVISE_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_PANE_THREE_ITEM_PREVIEW_MODE,
  SET_POPUP_VALUE
} from '../../actionType';
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
  const { headerOneBadgeTwo, responseObject, reviewMode, createMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
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
  const itemFrameworkOneResponseChoice =
    itemInformation?.informationFramework?.itemFrameworkOne?.itemFrameworkOneResponseChoice || [];
  const itemFrameworkOne = itemInformation?.informationFramework?.itemFrameworkOne;
  const [selectedChoiceObject, setSelectedChoiceObject] = useState('');

  // const [responseChoiceDescriptionText, setResponseChoiceDescriptionText] = useState(
  //   responseChoiceDescription
  // );
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const addOption = () => {
    dispatch({
      type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'itemFrameworkOneResponseChoice',
        value: [
          ...itemFrameworkOneResponseChoice,
          {
            id: `${itemFrameworkOneResponseChoice.length + 1}`,
            itemFrameworkOneResponseChoiceColumnMatch: '',
            itemFrameworkOneResponseChoiceExplanation: responseChoiceDescription,
            itemFrameworkOneResponseChoiceMedia: optionLabel,
            itemFrameworkOneResponseChoiceWeightage: '',
            itemFrameworkOneResponseChoiceScore: ''
          }
        ]
      }
    });
  };

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

  const onClickReviseFinish = () => {
    setIsShowReviseIcon(true);
    const { informationBasic, informationAllocation, informationFramework } = itemInformation;
    const { id } = responseObject;
    const reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId: id,
      item: {
        id,
        informationBasic,
        informationAllocation,
        informationFramework
      }
    };
    dispatch({ type: LOADER_START });
    dispatch({
      type: ITEM_INFO_REVISE_SAGA,
      payload: {
        secondaryOptionCheckValue: headerOneBadgeTwo,
        headerOne: 'item',
        reqBody,
        createMode
      }
    });
    // dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: false });
  };
  const onClickRevise = () => {
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    setIsShowReviseIcon(true);
  };

  const revisePrimaryIcon = [{ label: 'revise', onClick: onClickRevise, Icon: ReviseIcon }];

  const reviseSecondaryIcons = [
    { label: 'cancel', onClick: onClickReviseCancel, Icon: ClearIcon },
    { label: 'finish', onClick: onClickReviseFinish, Icon: Check }
  ];

  const removeOption = () => {
    if (itemFrameworkOneResponseChoice.length > 2) {
      let arr = itemFrameworkOneResponseChoice;
      let newArr = arr.slice(0, -1);
      // setQuestionOptionList(newArr);
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseChoice',
          value: newArr
        }
      });
    }
  };

  const setSecondaryOptionValue = (e) => {
    //TODO: set secondary option in item
  };

  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
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

  const ChangeTripleDotOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'revise') {
      dispatch({
        type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
        payload: 'revise'
      });
      dispatch({ type: POPUP_CLOSE });
    }
  };

  const ChangeItemOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
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
  const handleClick = (event) => {
    console.log('ONCHANGE ', event.target.value);
    if (itemFrameworkOne.itemFrameworkOneResponseCorrect[0] == event.target.value) {
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseCorrect',
          value: []
        }
      });
    } else {
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseCorrect',
          value: [event.target.value]
        }
      });
    }
  };

  console.log('ITEM INFO', itemInformation);

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
                {itemFrameworkOneResponseChoice.length}{' '}
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
              {ReactHTMLParser(itemFrameworkOne?.itemFrameworkOneLabel || itemLabelText)}
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
              {ReactHTMLParser(itemFrameworkOne?.itemFrameworkOneMedia || itemLabel)}
            </div>
          </div>
          {/* <hr
            style={{
              height: '1px',
              margin: '0',
              border: 'none',
              flexShrink: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.12)'
            }}
          /> */}
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
              {ReactHTMLParser(itemFrameworkOne?.itemFrameworkOneExplanation || itemDescription)}
            </div>
          </div>
          {/* <hr
            style={{
              height: '1px',
              margin: '0',
              border: 'none',
              flexShrink: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.12)'
            }}
          /> */}
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
              {ReactHTMLParser(itemFrameworkOne?.itemFrameworkOneResponseLabel || responseLabel)}
            </div>
          </div>
          <FormControl component="fieldset">
            <div className={['containerPadding'].join(' ')}>
              <RadioGroup
                value={itemFrameworkOne?.itemFrameworkOneResponseCorrect[0] || ''}
                // onChange={(event) => {}}
                defaultValue=""
                aria-label="Options"
                name="option1"
                // name="customized-radios"
              >
                {itemFrameworkOneResponseChoice.map((op, key) => {
                  return (
                    <div key={`op-${key}`}>
                      <div className="option-container" key={`option-${key}`}>
                        <FormControlLabel
                          key={`radio-${key}`}
                          className={'radio-button'}
                          value={`${op.itemFrameworkOneResponseChoice}`}
                          control={<StyledRadio onClick={handleClick} />}
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
                            setSelectedChoiceObject(op);
                          }}
                          dangerouslySetInnerHTML={{
                            __html: op?.itemFrameworkOneResponseChoiceMedia || optionLabel
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
                          defaultSheetValue={op?.itemFrameworkOneResponseChoiceMedia || ''}
                          actualLableValue={'assessmentManuscriptSecondary'}
                          mode={'revise'}
                          onClickSave={(innerText) => {
                            let opArr = itemFrameworkOneResponseChoice;
                            // setQuestionOptionList((opArr) => {
                            opArr.forEach((element) => {
                              if (
                                element.itemFrameworkOneResponseChoice ===
                                op.itemFrameworkOneResponseChoice
                              ) {
                                element.itemFrameworkOneResponseChoiceMedia = innerText;
                              }
                            });
                            dispatch({
                              type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
                              payload: {
                                stateName: 'itemFrameworkOneResponseChoice',
                                value: opArr
                              }
                            });
                            // });
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
                          defaultSheetValue={op.itemFrameworkOneResponseChoiceExplanation}
                          actualLableValue={'assessmentManuscriptSecondary'}
                          mode={'revise'}
                          onClickSave={(innerText) => {
                            let opArr = itemFrameworkOneResponseChoice;
                            opArr.forEach((element) => {
                              if (
                                element.itemFrameworkOneResponseChoice ===
                                op.itemFrameworkOneResponseChoice
                              ) {
                                element.itemFrameworkOneResponseChoiceExplanation = innerText;
                              }
                            });
                            dispatch({
                              type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
                              payload: {
                                stateName: 'itemFrameworkOneResponseChoice',
                                value: opArr
                              }
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
                                popupMode: ''
                              }
                            });
                          }}
                        >
                          {ReactHTMLParser(
                            op.itemFrameworkOneResponseChoiceExplanation ||
                              responseChoiceDescription
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </FormControl>
          {/* <hr
            style={{
              height: '1px',
              margin: '0',
              border: 'none',
              flexShrink: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.12)'
            }}
          /> */}
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
              {ReactHTMLParser(
                itemFrameworkOne?.itemFrameworkOneResponseExplanation || responseDescription
              )}
            </div>
          </div>
          <div>
            <div
              style={{
                height: '55px'
              }}
            ></div>
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
        defaultSheetValue={itemFrameworkOne?.itemFrameworkOneMedia || ''}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          // setInnerContent(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneMedia',
              value: innerText
            }
          });
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
        defaultSheetValue={itemFrameworkOne?.itemFrameworkOneLabel || ''}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          // setLabelText(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneLabel',
              value: innerText
            }
          });
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
        defaultSheetValue={itemInformation?.itemFrameworkOneResponseLabel || ''}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          // setResponseLabelText(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneResponseLabel',
              value: innerText
            }
          });
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
        defaultSheetValue={itemInformation?.itemFrameworkOneExplanation || ''}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          // setItemDescriptionText(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneExplanation',
              value: innerText
            }
          });
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
        defaultSheetValue={itemInformation?.itemFrameworkOneResponseExplanation || ''}
        actualLableValue={''}
        mode={'revise'}
        onClickSave={(innerText) => {
          // setResponseDescriptionText(innerText);
          dispatch({
            type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneResponseExplanation',
              value: innerText
            }
          });
        }}
      />

      <PopUpItemFramework
        isActive={isPopUpValue === 'ITEM_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={''}
        inputHeader={'item'}
        primaryheader={'configuration'}
        isItemFramework={true}
        mode={'revise'}
      />

      <PopUpItemFramework
        isActive={isPopUpValue === 'ITEM_CHOICE_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={'information'}
        choiceOb={selectedChoiceObject}
        inputHeader={'response'}
        primaryheader={'choice'}
        primaryheaderTwo={'configuration'}
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
