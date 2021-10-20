import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneFive.css';
import PopupHeader from '../../Molecules/PopUp/PopUpHeader';
import Popup from '../../Molecules/PopUp/PopUp';
import JsonRenderComponent from '../../Actions/JsonRenderComponent';
import { DialogContent, FormControl } from '@material-ui/core';
import PopUpItemFramework from '../../PopUpInformation/PopUpItemFramework';
import ReactHTMLParser from 'react-html-parser';
import {
  SET_POPUP_VALUE,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  POPUP_CLOSE,
  SET_ASSESSMENT_REVISE_DYNAMIC_SINGLE_STATE,
  SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE
} from '../../actionType';

import { InputLabel, Paper, IconButton } from '@material-ui/core';
import EditorTemplate from './EditorTemplate';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import { useTimer } from 'react-timer-hook';
import PopUpItemConfig from '../../PopUpInformation/PopUpItemConfig';

const AssessmentTimer = ({ expiryTimestamp, timerFinished }) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: timerFinished
    // onExpire: () => {
    //   console.warn('onExpire called');
    // }
  });
  return (
    <div>
      <span>{hours < 10 ? '0' + hours : hours}</span>:
      <span>{minutes < 10 ? '0' + minutes : minutes}</span>:
      <span>{seconds < 10 ? '0' + seconds : seconds}</span>
    </div>
  );
};
const AssessmentHeader = (props) => {
  return (
    <Fragment>
      <Paper className={''}>
        <div className="containerPadding sticky-header">
          <div style={{ height: '49px', padding: '0 5px', display: 'flex' }} className={''}>
            <div style={{ display: 'inline-block', flex: '4' }}>
              <div
                className={[
                  'midPaneInformation',
                  props.assessmentDesc !== '' ? null : 'aliasmiddle'
                ].join(' ')}
              >
                {props.assessmentName}
              </div>
              <div className={['midPaneLabel', 'textOverflow'].join(' ')}>
                {props.assessmentDesc}
              </div>
            </div>
            <div style={{ display: 'inline-block', flex: '4' }}>
              <div
                className={[
                  'midPaneInformation',
                  props.assessmentSectionDescription !== '' ? null : 'aliasmiddle'
                ].join(' ')}
              >
                {props.assessmentSectionName}
              </div>
              <div className={['midPaneLabel', 'textOverflow'].join(' ')}>
                {props.assessmentSectionDescription}
              </div>
            </div>
            <div
              style={{ flex: '1', display: 'flex', alignItems: 'center' }}
              className="flex-center"
            >
              <span
                className={['unitFlex', 'assessmenetStatusText', 'AssesseeNotifyStatus'].join(' ')}
                style={{ textAlign: 'center' }}
              >
                <InputLabel
                  className={['iconsFooterLabelDefault1', 'AssesseeNotifyStatusLabel'].join(' ')}
                >
                  {/* {1 + "/" + 2} */}
                  {props.currentQuestion + '/' + props.totalQuestion}
                </InputLabel>
              </span>
            </div>
            <div
              style={{ flex: '1', display: 'flex', alignItems: 'center' }}
              className="flex-center"
            >
              {props.score}
            </div>
            <div
              style={{ flex: '1', display: 'flex', alignItems: 'center' }}
              className="flex-center"
            >
              {props.timer && (
                <span style={{}}>
                  <AssessmentTimer
                    expiryTimestamp={props.timer}
                    key={props.timer}
                    timerFinished={props.timerFinished}
                  />
                </span>
              )}
            </div>
            <div
              style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              className="flex-center"
            >
              <IconButton onClick={props.onClickFlag} className={'assessmentFlagButton'}>
                {props.isQuestionFlaged ? (
                  <i className="fa fa-flag" style={{ color: '#ff6464' }}></i>
                ) : (
                  <i className="far fa-flag"></i>
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
      <hr className={'assessmentHeaderHr'} />
    </Fragment>
  );
};

export const DisplayPaneFiveAssessment = (props) => {
  const {
    headerOne,
    closePreview,
    data,
    typeMode = true,
    informationFramework,
    currentItemIndex,
    flagQuestion,
    isQuestionFlaged,
    currentSectionIndex,
    itemObect
  } = props;
  const dispatch = useDispatch();
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const { informationBasic } = useSelector((state) => state.AssessmentReducer);
  const {
    isAssessmentPreviewShow = false,   
    isAssessmentSectionShow=false
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const [selectedChoiceObject, setSelectedChoiceObject] = useState('');
  const [subQuestionId, setSubQuestionId] = useState('');
  console.log('assessmentinformationFramework', informationFramework);
  const responseText = '<p><span>response</span></p>';
  const assessmentScale=informationFramework?.assessmentScale||[];
  
  const BackHandlerEvent = (e) => {};
  const setSecondaryOptionValue = (e) => {
    //TODO: set secondary option in item
    console.log();
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
      disabled: true
    }
  ];
  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    // setSubQuestionId(e.currentTarget.getAttribute('subquestionid'))
    setSubQuestionId(popupMode.split('_'));
    if (targetValue === 'configure') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'SUB_ITEM_FRAMEWORK_POPUP',
          popupMode: ''
        }
      });
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
    if (targetValue === 'review') {
      dispatch({
        type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
        payload: 'review'
      });
      dispatch({ type: POPUP_CLOSE });
    }
  };
  const itemPrimaryTriplePopupOption = [
    {
      data: 'configure',
      dataValue: 'configure',
      dataKey: 'configureAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: true
      // responseObject?.informationEngagement?.itemStatus === 'PUBLISHED' || reviewMode === 'review'
      //   ? true
      //   : false
    },
    {
      data: 'review',
      dataValue: 'review',
      dataKey: 'reviewAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
      //disabled: reviewMode === 'review'? true:false
    },
    {
      data: 'revise',
      dataValue: 'revise',
      dataKey: 'reviseAPICall',
      optionClass: 'optionPrimary',
      divider: '',
      disabled: false
      // responseObject?.informationEngagement?.itemStatus === 'PUBLISHED' || reviewMode === 'revise'
      //   ? true
      //   : false
    }
  ];
  const ChangeResponsePopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'configure') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'RESPONSE_CONFIGURE_POPUP',
          popupMode: ''
        }
      });
    }
  };
  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="itemPreview"
          showClearIcon
          headerOne={headerOne}
          headerOneBadgeOne={''}
          headerOneBadgeTwo="preview"
          headerPanelColour="blue"
          onClickClearInfo={closePreview}
        />
      </div>
      <div className="containerPadding">
        <AssessmentHeader
          qnumber={currentItemIndex + 1}
          //totalQuestion={20}
          score={1}
          assessmentName={informationBasic?.assessmentName || ''}
          assessmentDesc={informationBasic?.assessmentDescription || ''}
          onClickFlag={null}
          isQuestionFlaged={false}
          timerFinished={''}
          timer={'timer'}
          totalQuestion={isAssessmentSectionShow?
            informationFramework?.assessmentSectionItemDistinct.length:informationFramework?.assessmentSection[currentSectionIndex]?.assessmentSectionItemDistinct.length          }
          currentQuestion={currentItemIndex + 1}
          assessmentSectionName={isAssessmentSectionShow?informationFramework?.assessmentSectionName:informationFramework?.assessmentSection[currentSectionIndex].assessmentSectionName||''}
          assessmentSectionDescription={isAssessmentSectionShow?informationFramework?.assessmentSectionDescription:
            informationFramework?.assessmentSection[currentSectionIndex].assessmentSectionDescription||''
          }
        />

        <div className="" style={{ height: 'calc(100vh - 200px)', overflow: 'overlay' }}>
          {/* item label */}
          {itemObect?.itemFrameworkOneLabel?.itemFrameworkOneLabelMedia && (
            <div className={'innerpadding'}>
              <div className={['ex_container', 'ig-label'].join(' ')}>
                <EditorTemplate
                  label={'itemFrameworkOneLabel'}
                  jsonData={itemObect?.itemFrameworkOneLabel?.itemFrameworkOneLabelMedia}
                />
              </div>
            </div>
          )}

          {/* Passage */}

          {itemObect?.itemFrameworkOnePassage?.itemFrameworkOnePassageMedia && (
            <div className={'innerpadding'}>
              <div className={['ex_container', 'ig-itemGeneric'].join(' ')}>
                <EditorTemplate
                  jsonData={itemObect?.itemFrameworkOnePassage?.itemFrameworkOnePassageMedia}
                  label={'passage'}
                />
              </div>
            </div>
          )}

          {/* item */}
          {(itemObect?.itemFrameworkOneMedia || reviewMode === 'revise') && (
            <div
              className={'innerpadding'}
              style={{ cursor: reviewMode === 'revise' ? 'pointer' : '' }}
              onClick={
                reviewMode === 'revise'
                  ? () => {
                      dispatch({
                        type: SET_POPUP_VALUE,
                        payload: {
                          isPopUpValue: 'ITEM_PRIMARY_POPUP',
                          popupMode: popupMode
                        }
                      });
                    }
                  : null
              }
            >
              {itemObect?.itemFrameworkOneMedia !== '' && (
                <div className={['ex_container', 'ig-itemGeneric'].join(' ')}>
                  <div>
                    <EditorTemplate
                      label={'itemFrameworkOneMedia'}
                      jsonData={itemObect?.itemFrameworkOneMedia}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* item explanation */}
          {itemObect?.itemFrameworkOneExplanation?.itemFrameworkOneExplanationMedia && (
            <div className={'innerpadding'}>
              <div className={['ex_container', 'ig-explanation'].join(' ')}>
                <EditorTemplate
                  label={'itemFrameworkOneExplanation'}
                  jsonData={
                    itemObect?.itemFrameworkOneExplanation?.itemFrameworkOneExplanationMedia
                  }
                />
              </div>
            </div>
          )}

          {/* for sub item  */}
          {(itemObect?.itemFrameworkOneType === '61090cace50cf61d5eb440c9' ||
            itemObect?.itemFrameworkOneType === '61161713f24e1fb765208e23') && (
            <div className="likartscale">
              <FormControl component="fieldset" style={{ width: '100%' }}>
                {assessmentScale.length > 0 && (
                  <div className="likart">
                    <div class="item"></div>

                    {assessmentScale.map((ob, key) => {
                      return (
                        <div className={'likert_choice-sclae'} style={{ fontSize: '1.2rem' }}>
                          {/* {ob.assessmentScaleOneName} */}
                          <div style={{ display: 'inline-block' }}>
                            <div
                              className={[
                                'midPaneInformationScale',
                                ob.assessmentScaleOneDescription !== '' ? null : 'aliasmiddle'
                              ].join(' ')}
                            >
                              {ob.assessmentScaleOneName}
                            </div>
                            <div className={['midPaneLabelScale', 'textOverflow'].join(' ')}>
                              {ob.assessmentScaleOneDescription}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {itemObect?.itemFrameworkOneSection.map((ob, keys) => {
                  return (
                    <Fragment>
                      {(ob.itemFrameworkOneSection?.itemFrameworkOneMedia ||
                        reviewMode === 'revise') && (
                        <div className="likart">
                          <Fragment>
                            <div style={{ flex: '3' }}>
                              <div
                                className={['item'].join(' ')}
                                subQuestionId={ob.itemFrameworkOneSectionSequence}
                                style={{
                                  cursor: reviewMode === 'revise' ? 'pointer' : ''
                                }}
                                onClick={
                                  reviewMode === 'revise'
                                    ? () => {
                                        dispatch({
                                          type: SET_POPUP_VALUE,
                                          payload: {
                                            isPopUpValue: 'SUB_ITEM_PRIMARY_POPUP',
                                            popupMode: `LIKERT_ITEM_MEDIA_TEXT_${keys}`
                                          }
                                        });
                                      }
                                    : null
                                }
                              >
                                {/* {ob?.itemFrameworkOneSection?.itemFrameworkOneMedia || ( */}
                                <EditorTemplate
                                  label={'sub item'}
                                  jsonData={ob.itemFrameworkOneSection?.itemFrameworkOneMedia}
                                />
                                {/* )} */}
                              </div>
                              <div>
                                {ob.itemFrameworkOneSection?.itemFrameworkOneExplanation
                                  ?.itemFrameworkOneExplanationMedia && (
                                  <div>
                                    <div className={['ig-explanation '].join(' ')}>
                                      <EditorTemplate
                                        jsonData={
                                          ob.itemFrameworkOneSection?.itemFrameworkOneExplanation
                                            ?.itemFrameworkOneExplanationMedia
                                        }
                                        label={'itemFrameworkOneExplanationMedia'}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            {ob.itemFrameworkOneSection?.itemFrameworkOneResponseChoice.map(
                              (opt, key) => {
                                return (
                                  <>
                                    <div
                                      key={`op-${key}`}
                                      className={'likert_choice-sclae'}
                                      style={{ display: 'inline-table' }}
                                    >
                                      <input
                                        type="radio"
                                        name={`option1-${ob.itemFrameworkOneSectionSequence}`}
                                        value={`${keys}-${key}`}
                                        // onChange={handleClick}
                                        style={{
                                          cursor: reviewMode === 'revise' ? 'pointer' : ''
                                        }}
                                      />
                                      <div
                                        className={'likert-choice-font'}
                                        style={{
                                          cursor: reviewMode === 'revise' ? 'pointer' : ''
                                        }}
                                      >
                                        {/* {opt.itemFrameworkOneResponseChoiceMedia || ( */}
                                        <EditorTemplate
                                          label={'subitemchoice'}
                                          jsonData={opt.itemFrameworkOneResponseChoiceMedia}
                                        />
                                        {/* )} */}
                                      </div>
                                      <div
                                        className={['likert-choice-font', 'ig-explanation'].join(
                                          ' '
                                        )}
                                        style={{
                                          cursor: reviewMode === 'revise' ? 'pointer' : ''
                                        }}
                                      >
                                        {/* {opt.itemFrameworkOneResponseChoiceExplanation
                                          ?.itemFrameworkOneResponseChoiceExplanationMedia || ( */}
                                        <EditorTemplate
                                          jsonData={
                                            opt.itemFrameworkOneResponseChoiceExplanation
                                              ?.itemFrameworkOneResponseChoiceExplanationMedia
                                          }
                                        />
                                        {/* )} */}
                                      </div>
                                    </div>
                                  </>
                                );
                              }
                            )}
                          </Fragment>
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </FormControl>
            </div>
          )}

          {/* response label */}
          {itemObect?.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabelMedia && (
            <div className={'innerpadding'}>
              <div className={['ex_container', 'ig-label'].join(' ')}>
                <EditorTemplate
                  label={'itemFrameworkOneResponseLabel'}
                  jsonData={
                    itemObect?.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabelMedia
                  }
                />
              </div>
            </div>
          )}

          {/* response */}
          {
            <div className={'innerpadding'}>
              <div
                className={'ex_container'}
                style={{
                  cursor: reviewMode === 'revise' ? 'pointer' : ''
                }}
                onClick={
                  reviewMode === 'revise'
                    ? () => {
                        dispatch({
                          type: SET_POPUP_VALUE,
                          payload: {
                            isPopUpValue: 'RESPONSE_PRIMARY_POPUP',
                            popupMode: 'RESPONSE_SECONDARY_POPUP'
                          }
                        });
                      }
                    : null
                }
              >
                {ReactHTMLParser(responseText)}
              </div>
            </div>
          }

          {/* responce explanation */}
          {itemObect?.itemFrameworkOneResponseExplanation
            ?.itemFrameworkOneResponseExplanationMedia && (
            <div className={'innerpadding'}>
              <div className={['ex_container', 'ig-explanation '].join(' ')}>
                <EditorTemplate
                  jsonData={
                    itemObect?.itemFrameworkOneResponseExplanation
                      ?.itemFrameworkOneResponseExplanationMedia
                  }
                  label={'itemFrameworkOneResponseExplanationMedia'}
                />
              </div>
            </div>
          )}

          {/* response choices */}
          {itemObect?.itemFrameworkOneResponseChoice.map((op, key) => {
            return (
              <Fragment>
                {op.itemFrameworkOneResponseChoiceMedia !== '' && (
                  <div key={`op-${key}`} className={'innerpadding'}>
                    <div className="option-container ex_container" key={`option-${key}`}>
                      <div
                        style={{
                          paddingRight: '5px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <input
                          type="radio"
                          name="option1"
                          style={{ cursor: 'pointer' }}
                          value={`${op.itemFrameworkOneResponseChoiceNumber}`}
                          //onChange={handleRadioButton}
                          checked={
                            op.itemFrameworkOneResponseChoiceNumber ===
                            itemObect.itemFrameworkOneResponseCorrect[0]
                          }
                        />
                      </div>

                      <div
                        className={['ig-itemGeneric '].join(' ')}
                        style={{
                          paddingLeft: '5px',
                          cursor: reviewMode === 'revise' ? 'pointer' : ''
                        }}
                        onClick={
                          reviewMode === 'revise'
                            ? () => {
                                dispatch({
                                  type: SET_POPUP_VALUE,
                                  payload: {
                                    isPopUpValue: 'ITEM_OPTION_PRIMARY_POPUP',
                                    popupMode: `OPTION_${key}`
                                  }
                                });
                                setSelectedChoiceObject(op);
                              }
                            : null
                        }
                      >
                        <EditorTemplate
                          jsonData={op.itemFrameworkOneResponseChoiceMedia}
                          label={'itemFrameworkOneResponseChoiceMedia'}
                        />
                      </div>
                    </div>

                    <div>
                      {op.itemFrameworkOneResponseChoiceExplanation
                        ?.itemFrameworkOneResponseChoiceExplanationMedia && (
                        <div style={{ paddingLeft: '25px', display: 'inline-block' }}>
                          <div className={['ex_container', 'ig-explanation '].join(' ')}>
                            <EditorTemplate
                              jsonData={
                                op.itemFrameworkOneResponseChoiceExplanation
                                  ?.itemFrameworkOneResponseChoiceExplanationMedia
                              }
                              label={'itemFrameworkOneResponseChoiceExplanationMedia'}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}

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
          headerOne={'item'}
          headerOneBadgeOne={''}
          onClick={BackHandlerEvent}
          mode={'revise'}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeTripleDotOptionPopup}
            currentPopUpOption={itemPrimaryTriplePopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      <Popup
        isActive={
          isPopUpValue === 'ITEM_PRIMARY_POPUP' || isPopUpValue === 'SUB_ITEM_PRIMARY_POPUP'
        }
      >
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'item'}
          headerOneBadgeOne={''}
          onClick={BackHandlerEvent}
          mode={'revise'}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={
              isPopUpValue === 'SUB_ITEM_PRIMARY_POPUP' ? ChangeOptionPopup : ChangeItemOptionPopup
            }
            currentPopUpOption={itemPrimaryPopupOption}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>

      <PopUpItemFramework
        isActive={isPopUpValue === 'ITEM_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={'configuration'}
        nextPopUpValue={''}
        // inputHeader={'item'}
        // primaryheader={'configuration'}
        isItemFramework={true}
        mode={'revise'}
        itemFrameworkOne={itemObect}
        itemFrameworkOneResponseChoice={itemObect?.itemFrameworkOneResponseChoice}
      />
      <Popup isActive={isPopUpValue === 'ITEM_OPTION_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'response'}
          headerOneBadgeOne={'choice'}
          onClick={BackHandlerEvent}
          mode={'revise'}
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
      <PopUpItemFramework
        isActive={isPopUpValue === 'SUB_ITEM_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'configuration'}
        choiceOb={selectedChoiceObject}
        inputHeader={''}
        primaryheader={''}
        primaryheaderTwo={''}
        nextPopUpValue={''}
        mode={'revise'}
        subQuestionId={
          data?.itemFrameworkOneTypeNameReference === 'Likert-Scale' &&
          parseInt(subQuestionId[3]) + 1
        }
        itemFrameworkOneResponseChoice={itemObect?.itemFrameworkOneResponseChoice || []}
        itemFrameworkOne={itemObect}
      />
      <Popup isActive={isPopUpValue === 'RESPONSE_PRIMARY_POPUP'}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'response'}
          headerOneBadgeOne={''}
          onClick={BackHandlerEvent}
          mode={'revise'}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeResponsePopup}
            currentPopUpOption={[
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
                disabled: true
              }
            ]}
            secondaryOptionCheckValue={''}
          />
        </DialogContent>
      </Popup>
      <PopUpItemConfig
        isActive={isPopUpValue === 'RESPONSE_CONFIGURE_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'response'}
        headerOneBadgeOne={''}
        nextPopUpValue={''}
        inputHeader={''}
        primaryheader={'configuration'}
        isItemFramework={false}
        mode={reviewMode}
        itemFrameworkOne={itemObect}
        // itemSelectedTypeName = {handleCallback}
      />
    </>
  );
};
export default DisplayPaneFiveAssessment;
