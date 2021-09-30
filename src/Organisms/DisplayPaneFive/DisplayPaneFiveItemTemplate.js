import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE, SET_POPUP_VALUE } from '../../actionType';
import Radio from '@material-ui/core/Radio';
import ReactHTMLParser from 'react-html-parser';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import EditorJs from 'react-editor-js';
import PopUpTextSheet from '../../PopUpIcon/PopUpTextSheet';
import { Checkbox } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { label } from 'aws-amplify';
import EditorTemplate from './EditorTemplate';
import PopUpTextEditor from '../../PopUpIcon/PopUpTextEditor';

const DisplayPaneFiveItemTemplate = (props) => {
  const dispatch = useDispatch();
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const optionLabel =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp;";
  const optionLabel1 =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_1'>choice</span>&nbsp;";
  const itemLabelText =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const itemText = '<span>item</span>&nbsp';
  const passageText = '<span>passage</span>&nbsp';
  const itemExplanationText =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseLabelText =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const responseText = '<p><span>response</span></p>';
  const responseExplanationText =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>explanation</span>";
  const responseChoiceDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp; <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseChoiceDescription1 =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_1'>choice</span>&nbsp; <span class='iguru-header-badge1_1'>explanation</span>&nbsp;";
  const numberOfNoOptions =
    itemInformation?.informationFramework?.itemFrameworkOne?.itemFrameworkOneResponseChoice || [];
  const itemFrameworkOne = itemInformation?.informationFramework?.itemFrameworkOne;
  const itemFrameworkOneSection = itemFrameworkOne.itemFrameworkOneSection;
  const { setSelectedChoiceObject, itemType } = props;
  // const [subItemList, setSubItemList] = useState(['item-1', 'item-2', 'item-3']);
  const [scaleList, setScaleList] = useState(['scale-1', 'scale-2', 'scale-3']);
  const [liketcorrect, setliketcorrect] = useState('');
  const [lab, setLabel] = useState(true);
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

  const handleClick = (event) => {
    console.log('ONCHANGE ', event.target.value);
    if (itemFrameworkOne.itemFrameworkOneResponseCorrect[0] === event.target.value) {
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
  const isHrSetup = false;
  // console.log('responseObject', responseObject);
  console.log('itemFrameworkOne', itemFrameworkOne);
  console.log('numberOfNoOptions', numberOfNoOptions);
  return (
    <div>
      {/* Item Label */}
      <div className={'innerpadding'}>
        {(itemFrameworkOne?.itemFrameworkOneLabel?.itemFrameworkOneLabelMedia ||
          reviewMode === 'revise') && (
          <div
            className={['ex_container', 'ig-label'].join(' ')}
            style={{ cursor: reviewMode === 'revise' && 'pointer' }}
            onClick={
              reviewMode === 'revise'
                ? () => {
                    dispatch({
                      type: SET_POPUP_VALUE,
                      payload: {
                        isPopUpValue: 'ITEM_LABEL_PRIMARY_POPUP',
                        popupMode: 'OPEN_ITEM_LABEL_POPUP'
                      }
                    });
                  }
                : null
            }
          >
            {(!itemFrameworkOne?.itemFrameworkOneLabel?.itemFrameworkOneLabelMedia &&
              reviewMode === 'revise' &&
              ReactHTMLParser(itemLabelText)) || (
              <EditorTemplate
                label={'itemLabel'}
                jsonData={itemFrameworkOne?.itemFrameworkOneLabel?.itemFrameworkOneLabelMedia}
              />
            )}
          </div>
        )}
      </div>
      {/* Passage */}
      {(itemType === 'Comprehension' || itemType === 'Template') && (
        <div className={'innerpadding'}>
          <div
            className={['ex_container', 'ig-itemGeneric'].join(' ')}
            style={{ cursor: reviewMode === 'revise' && 'pointer' }}
            onClick={
              reviewMode === 'revise'
                ? () => {
                    dispatch({
                      type: SET_POPUP_VALUE,
                      payload: {
                        isPopUpValue: 'PASSAGE_PRIMARY_POPUP',
                        popupMode: popupMode
                      }
                    });
                  }
                : null
            }
          >
            {(!itemFrameworkOne?.itemFrameworkOnePassage?.itemFrameworkOnePassageMedia &&
              reviewMode === 'revise' &&
              ReactHTMLParser(passageText)) || (
              <EditorTemplate
                jsonData={itemFrameworkOne?.itemFrameworkOnePassage?.itemFrameworkOnePassageMedia}
                label={'passage'}
              />
            )}
          </div>
        </div>
      )}
      {/* Item */}
      {(itemFrameworkOne?.itemFrameworkOneMedia || reviewMode === 'revise') && (
        <div className={'innerpadding'}>
          <div
            className={['ex_container', 'ig-itemGeneric'].join(' ')}
            style={{ cursor: reviewMode === 'revise' && 'pointer' }}
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
            {(!itemFrameworkOne?.itemFrameworkOneMedia &&
              reviewMode === 'revise' &&
              ReactHTMLParser(itemText)) || (
              // <EditorJs data={itemFrameworkOne?.itemFrameworkOneMedia} readOnly={true} />
              <EditorTemplate label={'item'} jsonData={itemFrameworkOne?.itemFrameworkOneMedia} />
            )}
          </div>
        </div>
      )}
      {/* for sub item  */}
      {(itemType === 'Likert-Scale' || itemType === 'Template') && (
        <div className="likartscale">
          <FormControl component="fieldset" style={{ width: '100%' }}>
            <div className="likart">
              <div class="item"></div>

              {itemFrameworkOne?.itemFrameworkOneScale.map((ob, key) => {
                return (
                  <div className={'likert_choice-sclae'} style={{ fontSize: '1.2rem' }}>
                    {ob.itemFrameworkOneScaleLabel}
                  </div>
                );
              })}
            </div>

            {itemFrameworkOneSection.map((ob, keys) => {
              return (
                <Fragment>
                  {(ob.itemFrameworkOneSection?.itemFrameworkOneMedia ||
                    reviewMode === 'revise') && (
                    <div className="likart">
                      <Fragment>
                        <div
                          className="item"
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
                          {(!ob.itemFrameworkOneSection?.itemFrameworkOneMedia &&
                            reviewMode === 'revise' &&
                            ReactHTMLParser('<span>item</span>-' + `${keys + 1}`)) || (
                            <EditorTemplate
                              label={'sub item'}
                              jsonData={ob.itemFrameworkOneSection?.itemFrameworkOneMedia}
                            />
                          )}
                        </div>
                        <PopUpTextEditor
                          isActive={isPopUpValue === `LIKERT_ITEM_MEDIA_TEXT_${keys}`}
                          headerOne={'item'}
                          headerPanelColour={'genericOne'}
                          // headerOneBadgeOne={'media'}
                          headerOneBadgeTwo={''}
                          basicInfo={{}}
                          typeOfSetObject={''}
                          defaultSheetValue={
                            ob.itemFrameworkOneSection?.itemFrameworkOneMedia || ''
                          }
                          actualLableValue={''}
                          mode={'revise'}
                          onClickSave={(innerText) => {
                            // setInnerContent(innerText);
                            let opArr = itemFrameworkOne.itemFrameworkOneSection;
                            opArr.forEach((element) => {
                              if (
                                element.itemFrameworkOneSectionSequence ===
                                ob.itemFrameworkOneSectionSequence
                              ) {
                                element.itemFrameworkOneSection.itemFrameworkOneMedia = innerText;
                              }
                            });
                            dispatch({
                              type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
                              payload: {
                                stateName: 'itemFrameworkOneSection',
                                value: opArr
                              }
                            });
                          }}
                        />
                        {ob.itemFrameworkOneSection?.itemFrameworkOneResponseChoice &&
                          ob.itemFrameworkOneSection?.itemFrameworkOneResponseChoice.map(
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
                                      onClick={
                                        reviewMode === 'revise'
                                          ? () => {
                                              dispatch({
                                                type: SET_POPUP_VALUE,
                                                payload: {
                                                  isPopUpValue: 'ITEM_OPTION_PRIMARY_POPUP',
                                                  popupMode: `OPTION_LIKRT_${keys}_${key}`
                                                }
                                              });
                                              setSelectedChoiceObject(opt);
                                            }
                                          : null
                                      }
                                    >
                                      {(!opt.itemFrameworkOneResponseChoiceMedia &&
                                        reviewMode === 'revise' &&
                                        ReactHTMLParser(optionLabel1)) || (
                                        <EditorTemplate
                                          label={'subitemchoice'}
                                          jsonData={opt.itemFrameworkOneResponseChoiceMedia}
                                        />
                                      )}
                                    </div>
                                    <div
                                      className={['likert-choice-font', 'ig-explanation'].join(' ')}
                                      style={{
                                        cursor: reviewMode === 'revise' ? 'pointer' : ''
                                      }}
                                      onClick={
                                        reviewMode === 'revise'
                                          ? () => {
                                              dispatch({
                                                type: SET_POPUP_VALUE,
                                                payload: {
                                                  isPopUpValue:
                                                    'ITEM_RESPONSE_CHOICE_EXPLANATION_POPUP',
                                                  popupMode: `LIKERT_RESPONSE_CHOICE_DESCRIPTION_${keys}_${key}`
                                                }
                                              });
                                            }
                                          : null
                                      }
                                    >
                                      {(!opt.itemFrameworkOneResponseChoiceExplanation
                                        ?.itemFrameworkOneResponseChoiceExplanationMedia &&
                                        reviewMode === 'revise' &&
                                        ReactHTMLParser(responseChoiceDescription1)) || (
                                        <EditorTemplate
                                          jsonData={
                                            opt.itemFrameworkOneResponseChoiceExplanation
                                              ?.itemFrameworkOneResponseChoiceExplanationMedia
                                          }
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <PopUpTextEditor
                                    isActive={isPopUpValue === `OPTION_LIKRT_${keys}_${key}`}
                                    headerOne={'response'}
                                    headerPanelColour={'genericOne'}
                                    headerOneBadgeOne={'choice'}
                                    // headerOneBadgeTwo={`${key + 1}`}
                                    basicInfo={{}}
                                    typeOfSetObject={''}
                                    defaultSheetValue={
                                      opt?.itemFrameworkOneResponseChoiceMedia || ''
                                    }
                                    actualLableValue={'assessmentManuscriptSecondary'}
                                    mode={'revise'}
                                    onClickSave={(innerText) => {
                                      let opArr = itemFrameworkOne.itemFrameworkOneSection;
                                      opArr.forEach((element, index) => {
                                        if (index === keys) {
                                          element.itemFrameworkOneSection.itemFrameworkOneResponseChoice[
                                            key
                                          ].itemFrameworkOneResponseChoiceMedia = innerText;
                                        }
                                      });
                                      // temp.itemFrameworkOneResponseChoiceMedia = innerText;
                                      dispatch({
                                        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
                                        payload: {
                                          stateName: 'itemFrameworkOneSection',
                                          value: opArr
                                        }
                                      });
                                    }}
                                  />
                                  <PopUpTextEditor
                                    isActive={
                                      isPopUpValue ===
                                      `LIKERT_RESPONSE_CHOICE_DESCRIPTION_${keys}_${key}`
                                    }
                                    headerOne={'response'}
                                    headerPanelColour={'genericOne'}
                                    headerOneBadgeOne={'choice'}
                                    headerOneBadgeTwo={`explanation`}
                                    basicInfo={{}}
                                    typeOfSetObject={''}
                                    defaultSheetValue={
                                      opt.itemFrameworkOneResponseChoiceExplanation
                                        .itemFrameworkOneResponseChoiceExplanationMedia
                                    }
                                    actualLableValue={'assessmentManuscriptSecondary'}
                                    mode={'revise'}
                                    onClickSave={(innerText) => {
                                      let opArr = itemFrameworkOne.itemFrameworkOneSection;
                                      opArr.forEach((element, index) => {
                                        if (
                                          element.itemFrameworkOneSection
                                            .itemFrameworkOneSectionSequence ===
                                          opt.itemFrameworkOneSectionSequence
                                        ) {
                                          if (index === keys) {
                                            element.itemFrameworkOneSection.itemFrameworkOneResponseChoice[
                                              key
                                            ].itemFrameworkOneResponseChoiceExplanation.itemFrameworkOneResponseChoiceExplanationMedia = innerText;
                                          }
                                        }
                                      });
                                      dispatch({
                                        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
                                        payload: {
                                          stateName: 'itemFrameworkOneSection',
                                          value: opArr
                                        }
                                      });
                                    }}
                                  />
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

      {/* Item explanation */}
      {(itemFrameworkOne?.itemFrameworkOneExplanation?.itemFrameworkOneExplanationMedia ||
        reviewMode === 'revise') && (
        <div className={'innerpadding'}>
          <div
            className={['ex_container', 'ig-explanation'].join(' ')}
            style={{ cursor: reviewMode === 'revise' && 'pointer' }}
            onClick={
              reviewMode === 'revise'
                ? () => {
                    dispatch({
                      type: SET_POPUP_VALUE,
                      payload: {
                        isPopUpValue: 'ITEM_EXPLANATION_PRIMARY_POPUP',
                        popupMode: popupMode
                      }
                    });
                  }
                : null
            }
          >
            {(!itemFrameworkOne?.itemFrameworkOneExplanation?.itemFrameworkOneExplanationMedia &&
              reviewMode === 'revise' &&
              ReactHTMLParser(itemExplanationText)) || (
              <EditorTemplate
                jsonData={
                  itemFrameworkOne?.itemFrameworkOneExplanation?.itemFrameworkOneExplanationMedia
                }
                label={'itemFrameworkOneExplanationMedia'}
              />
            )}
          </div>
        </div>
      )}
      {/* response label */}
      {(itemFrameworkOne?.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabelMedia ||
        reviewMode === 'revise') && (
        <div className={'innerpadding'}>
          <div
            className={['ex_container', 'ig-label'].join(' ')}
            style={{
              cursor: reviewMode === 'revise' ? 'pointer' : ''
            }}
            onClick={
              reviewMode === 'revise'
                ? () => {
                    dispatch({
                      type: SET_POPUP_VALUE,
                      payload: {
                        isPopUpValue: 'ITEM_CHOICE_LABEL_PRIMARY_POPUP',
                        popupMode: popupMode
                      }
                    });
                  }
                : null
            }
          >
            {(!itemFrameworkOne?.itemFrameworkOneResponseLabel
              ?.itemFrameworkOneResponseLabelMedia &&
              reviewMode === 'revise' &&
              ReactHTMLParser(responseLabelText)) || (
              <EditorTemplate
                jsonData={
                  itemFrameworkOne?.itemFrameworkOneResponseLabel
                    ?.itemFrameworkOneResponseLabelMedia
                }
                label={'itemFrameworkOneResponseLabelMedia'}
              />
            )}
          </div>
        </div>
      )}

      {/* response */}
      {(itemType === 'Response (Long)' ||
        itemType === 'Response (Short)' ||
        itemType === 'Template') && (
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
      )}
      {/* for response choice */}
      {(itemType === 'Response-Choice (Single-Select)' ||
        itemType === 'Template' ||
        itemType === 'False-True' ||
        itemType === 'Fill-in-the-Blank (Response-Choice)') && (
        <div className={'likartscale'}>
          {numberOfNoOptions.map((op, key) => {
            return (
              <Fragment>
                {(op.itemFrameworkOneResponseChoiceMedia || reviewMode === 'revise') && (
                  <div key={`op-${key}`} className={'innerpadding'}>
                    <div className="option-container ex_container" key={`option-${key}`}>
                      <div
                        style={{
                          paddingRight: '5px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <input
                          type="radio"
                          name="option1"
                          value={`${op.itemFrameworkOneResponseChoiceNumber}`}
                          onChange={handleClick}
                          checked={
                            op.itemFrameworkOneResponseChoiceNumber ===
                            itemFrameworkOne.itemFrameworkOneResponseCorrect[0]
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
                        {(!op.itemFrameworkOneResponseChoiceMedia &&
                          reviewMode === 'revise' &&
                          ReactHTMLParser(optionLabel)) || (
                          <EditorTemplate
                            jsonData={op.itemFrameworkOneResponseChoiceMedia}
                            label={'itemFrameworkOneResponseChoiceMedia'}
                          />
                        )}
                      </div>

                      <PopUpTextEditor
                        isActive={isPopUpValue === `OPTION_${key}`}
                        headerOne={'response'}
                        headerPanelColour={'genericOne'}
                        headerOneBadgeOne={'choice'}
                        // headerOneBadgeTwo={`${key + 1}`}
                        basicInfo={{}}
                        typeOfSetObject={''}
                        defaultSheetValue={op?.itemFrameworkOneResponseChoiceMedia || ''}
                        actualLableValue={'assessmentManuscriptSecondary'}
                        mode={'revise'}
                        onClickSave={(innerText) => {
                          let opArr = numberOfNoOptions;
                          // setQuestionOptionList((opArr) => {
                          opArr.forEach((element) => {
                            if (
                              element.itemFrameworkOneResponseChoiceNumber ===
                              op.itemFrameworkOneResponseChoiceNumber
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

                      <PopUpTextEditor
                        isActive={isPopUpValue === `RESPONSE_CHOICE_DESCRIPTION_${key}`}
                        headerOne={'response'}
                        headerPanelColour={'genericOne'}
                        headerOneBadgeOne={'choice'}
                        headerOneBadgeTwo={`explanation`}
                        basicInfo={{}}
                        typeOfSetObject={''}
                        defaultSheetValue={
                          op.itemFrameworkOneResponseChoiceExplanation
                            ?.itemFrameworkOneResponseChoiceExplanationMedia
                        }
                        actualLableValue={'assessmentManuscriptSecondary'}
                        mode={'revise'}
                        onClickSave={(innerText) => {
                          let opArr = numberOfNoOptions;
                          opArr.forEach((element) => {
                            if (
                              element.itemFrameworkOneResponseChoiceNumber ===
                              op.itemFrameworkOneResponseChoiceNumber
                            ) {
                              element.itemFrameworkOneResponseChoiceExplanation.itemFrameworkOneResponseChoiceExplanationMedia = innerText;
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

                    <div style={{ paddingLeft: '25px',display:'inline-block' }}>
                      {(op.itemFrameworkOneResponseChoiceExplanation
                        ?.itemFrameworkOneResponseChoiceExplanationMedia ||
                        reviewMode === 'revise') && (
                        <div
                          className={['ex_container', 'ig-explanation '].join(' ')}
                          style={{
                            cursor: reviewMode === 'revise' ? 'pointer' : ''
                          }}
                          onClick={
                            reviewMode === 'revise'
                              ? () => {
                                  dispatch({
                                    type: SET_POPUP_VALUE,
                                    payload: {
                                      isPopUpValue: 'ITEM_RESPONSE_CHOICE_EXPLANATION_POPUP',
                                      popupMode: `RESPONSE_CHOICE_DESCRIPTION_${key}`
                                    }
                                  });
                                }
                              : null
                          }
                        >
                          {(!op.itemFrameworkOneResponseChoiceExplanation
                            ?.itemFrameworkOneResponseChoiceExplanationMedia &&
                            reviewMode === 'revise' &&
                            ReactHTMLParser(responseChoiceDescription)) || (
                            <EditorTemplate
                              jsonData={
                                op.itemFrameworkOneResponseChoiceExplanation
                                  ?.itemFrameworkOneResponseChoiceExplanationMedia
                              }
                              label={'itemFrameworkOneResponseChoiceExplanationMedia'}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      )}
      {/* response explanation */}
      {(itemType === 'Response-Choice (Single-Select)' ||
        itemType === 'Template' ||
        itemType === 'False-True' ||
        itemType === 'Response (Long)' ||
        itemType === 'Response (Short)' ||
        itemType === 'Fill-in-the-Blank (Response-Choice)') && (
        <Fragment>
          {(itemFrameworkOne?.itemFrameworkOneResponseExplanation
            ?.itemFrameworkOneResponseExplanationMedia ||
            reviewMode === 'revise') && (
            <div className={'innerpadding'}>
              <div
                className={['ex_container', 'ig-explanation '].join(' ')}
                style={{ cursor: reviewMode === 'revise' && 'pointer' }}
                onClick={
                  reviewMode === 'revise'
                    ? () => {
                        dispatch({
                          type: SET_POPUP_VALUE,
                          payload: {
                            isPopUpValue: 'RESPONSE_EXPLANATION_POPUP',
                            popupMode: 'RESPONSE_DESCRIPTION_TEXT'
                          }
                        });
                      }
                    : null
                }
              >
                {(!itemFrameworkOne?.itemFrameworkOneResponseExplanation
                  ?.itemFrameworkOneResponseExplanationMedia &&
                  reviewMode === 'revise' &&
                  ReactHTMLParser(responseExplanationText)) || (
                  <EditorTemplate
                    jsonData={
                      itemFrameworkOne?.itemFrameworkOneResponseExplanation
                        ?.itemFrameworkOneResponseExplanationMedia
                    }
                    label={'itemFrameworkOneResponseExplanationMedia'}
                  />
                )}
              </div>
            </div>
          )}
        </Fragment>
      )}
      <div>
        <div
          style={{
            height: '55px'
          }}
        ></div>
      </div>
    </div>
  );
};

export default DisplayPaneFiveItemTemplate;
