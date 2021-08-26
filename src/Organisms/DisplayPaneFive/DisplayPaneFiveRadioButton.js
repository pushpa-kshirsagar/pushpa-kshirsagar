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
import PopUpTextSheet from '../../PopUpIcon/PopUpTextSheet';
import { Checkbox } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { label } from 'aws-amplify';

const DisplayPaneFiveRadioButton = (props) => {
  const dispatch = useDispatch();
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const { reviewMode, responseObject } = useSelector((state) => state.DisplayPaneThreeReducer);
  const optionLabel =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp;";
  const optionLabel1 =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_1'>choice</span>&nbsp;";
  const itemLabel = '<span>item</span>&nbsp';
  const itemLabelText =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const responseLabel =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const response = '<p><span>response</span></p> &nbsp ';
  const itemDescription =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseChoiceDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp; <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseChoiceDescription1 =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_1'>choice</span>&nbsp; <span class='iguru-header-badge1_1'>explanation</span>&nbsp;";
  const itemFrameworkOneResponseChoice =
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
  function StyledCheckbox(props) {
    const classes = useStyles();

    return (
      <CheckBox
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
  const handleClickLikert = (event, seq) => {
    console.log('ONCHANGE ', event.target.value);
    console.log('seq ', seq);
    setliketcorrect(event.target.value);
    let opArr = itemFrameworkOne.itemFrameworkOneSection;
    opArr.forEach((element) => {
      if (element.itemFrameworkOneSectionSequence === seq) {
        element.itemFrameworkOneSection.itemFrameworkOneResponseCorrect = event.target.value;
      }
    });
    dispatch({
      type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'itemFrameworkOneSection',
        value: opArr
      }
    });
  };
  const isHrSetup = false;
  // console.log('responseObject', responseObject);
  console.log('itemFrameworkOne', itemFrameworkOne);
  return (
    <>
      {/* for label */}
      {(itemFrameworkOne?.itemFrameworkOneLabel?.itemFrameworkOneLabel !== '' ||
        reviewMode === 'revise') && (
        <div className="innerpadding">
          <div
            className="label"
            style={{
              cursor: reviewMode === 'revise' ? 'pointer' : ''
            }}
            onClick={
              reviewMode === 'revise'
                ? () => {
                    dispatch({
                      type: SET_POPUP_VALUE,
                      payload: {
                        isPopUpValue: 'ITEM_LABEL_PRIMARY_POPUP',
                        popupMode: popupMode
                      }
                    });
                  }
                : null
            }
          >
            {ReactHTMLParser(
              itemFrameworkOne?.itemFrameworkOneLabel?.itemFrameworkOneLabel || itemLabelText
            )}
          </div>
        </div>
      )}

      <div className="innerpadding">
        {/* for media item */}
        {(itemFrameworkOne?.itemFrameworkOneMedia !== '' || reviewMode === 'revise') && (
          <div
            className="ex_container"
            style={{
              cursor: reviewMode === 'revise' ? 'pointer' : ''
            }}
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
            {ReactHTMLParser(itemFrameworkOne?.itemFrameworkOneMedia || itemLabel)}
          </div>
        )}
      </div>
      {/* item explanation */}
      {(itemFrameworkOne?.itemFrameworkOneExplanation?.itemFrameworkOneExplanation !== '' ||
        reviewMode === 'revise') && (
        <div className="innerpadding">
          <div
            className="ex_container"
            style={{
              cursor: reviewMode === 'revise' ? 'pointer' : ''
            }}
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
            {ReactHTMLParser(
              itemFrameworkOne?.itemFrameworkOneExplanation?.itemFrameworkOneExplanation ||
                itemDescription
            )}
          </div>
        </div>
      )}

      {/* for sub item  */}
      <div className="likartscale">
        {(itemType === 'Likert-Scale' || itemType === 'Master-Framework') && (
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
                      {ReactHTMLParser(
                        ob.itemFrameworkOneSection?.itemFrameworkOneMedia
                          ? ob.itemFrameworkOneSection?.itemFrameworkOneMedia
                          : '<span>item</span>-' + `${keys + 1}`
                      )}
                    </div>
                    <PopUpTextSheet
                      isActive={isPopUpValue === `LIKERT_ITEM_MEDIA_TEXT_${keys}`}
                      headerOne={'item'}
                      headerPanelColour={'genericOne'}
                      // headerOneBadgeOne={'media'}
                      headerOneBadgeTwo={''}
                      basicInfo={{}}
                      typeOfSetObject={''}
                      defaultSheetValue={ob.itemFrameworkOneSection?.itemFrameworkOneMedia || ''}
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
                      ob.itemFrameworkOneSection?.itemFrameworkOneResponseChoice.map((opt, key) => {
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
                              />
                              <div
                                className={'likert-choice-font'}
                                dangerouslySetInnerHTML={{
                                  __html: opt?.itemFrameworkOneResponseChoiceMedia || optionLabel1
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
                              ></div>
                              <div
                                className={'likert-choice-font'}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    opt?.itemFrameworkOneResponseChoiceExplanation
                                      .itemFrameworkOneResponseChoiceExplanation ||
                                    responseChoiceDescription1
                                }}
                                onClick={
                                  reviewMode === 'revise'
                                    ? () => {
                                        dispatch({
                                          type: SET_POPUP_VALUE,
                                          payload: {
                                            isPopUpValue: 'ITEM_RESPONSE_CHOICE_EXPLANATION_POPUP',
                                            popupMode: `LIKERT_RESPONSE_CHOICE_DESCRIPTION_${keys}_${key}`
                                          }
                                        });
                                      }
                                    : null
                                }
                              ></div>
                            </div>
                            <PopUpTextSheet
                              isActive={isPopUpValue === `OPTION_LIKRT_${keys}_${key}`}
                              headerOne={'response'}
                              headerPanelColour={'genericOne'}
                              headerOneBadgeOne={'choice'}
                              // headerOneBadgeTwo={`${key + 1}`}
                              basicInfo={{}}
                              typeOfSetObject={''}
                              defaultSheetValue={opt?.itemFrameworkOneResponseChoiceMedia || ''}
                              actualLableValue={'assessmentManuscriptSecondary'}
                              mode={'revise'}
                              onClickSave={(innerText) => {
                                let opArr = itemFrameworkOne.itemFrameworkOneSection;
                                // let temp =
                                //   opArr[keys].itemFrameworkOneSection
                                //     .itemFrameworkOneResponseChoice[key];
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
                            <PopUpTextSheet
                              isActive={
                                isPopUpValue === `LIKERT_RESPONSE_CHOICE_DESCRIPTION_${keys}_${key}`
                              }
                              headerOne={'response'}
                              headerPanelColour={'genericOne'}
                              headerOneBadgeOne={'choice'}
                              headerOneBadgeTwo={`explanation`}
                              basicInfo={{}}
                              typeOfSetObject={''}
                              defaultSheetValue={
                                opt.itemFrameworkOneResponseChoiceExplanation
                                  .itemFrameworkOneResponseChoiceExplanation
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
                                      ].itemFrameworkOneResponseChoiceExplanation.itemFrameworkOneResponseChoiceExplanation = innerText;
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
                      })}
                  </Fragment>
                </div>
              );
            })}
          </FormControl>
        )}
      </div>

      {/* for response label */}
      {(itemType === 'Response-Choice (Single-Select)' ||
        itemType === 'Master-Framework' ||
        itemType === 'False-True' ||
        itemType === 'Fill-in-the-Blank (Response-Choice)') &&
        (itemFrameworkOne?.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabel !== '' ||
          reviewMode === 'revise') && (
          <div className="innerpadding">
            <div
              className="ex_container"
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
              {ReactHTMLParser(
                itemFrameworkOne?.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabel ||
                  responseLabel
              )}
            </div>
          </div>
        )}

      {/* for response explanation */}
      {(itemType === 'Response-Choice (Single-Select)' ||
        itemType === 'Master-Framework' ||
        itemType === 'False-True' ||
        itemType === 'Response (Long)' ||
        itemType === 'Response (Short)' ||
        itemType === 'Fill-in-the-Blank (Response-Choice)') &&
        (itemFrameworkOne?.itemFrameworkOneResponseExplanation
          ?.itemFrameworkOneResponseExplanation !== '' ||
          reviewMode === 'revise') && (
          <div className="innerpadding">
            <div
              className="ex_container"
              style={{
                cursor: reviewMode === 'revise' ? 'pointer' : ''
              }}
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
              {ReactHTMLParser(
                itemFrameworkOne?.itemFrameworkOneResponseExplanation
                  ?.itemFrameworkOneResponseExplanation || responseDescription
              )}
            </div>
          </div>
        )}
      {/* for response */}
      {(itemType === 'Response (Long)' ||
        itemType === 'Response (Short)' ||
        itemType === 'Master-Framework') && (
        <div className="innerpadding">
          <div className="relabel">
            {(itemFrameworkOne?.itemFrameworkOneResponse !== '' || reviewMode === 'revise') && (
              // <p>
              <div
                className="ex_container"
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
                {ReactHTMLParser(itemFrameworkOne?.itemFrameworkOneResponse || response)}
              </div>
              // </p>
            )}
          </div>
        </div>
      )}

      {/* for response choice */}
      {(itemType === 'Response-Choice (Single-Select)' ||
        itemType === 'Master-Framework' ||
        itemType === 'False-True' ||
        itemType === 'Fill-in-the-Blank (Response-Choice)') && (
        <div className={'likartscale'}>
          {itemFrameworkOneResponseChoice.map((op, key) => {
            return (
              <div key={`op-${key}`}>
                <div className="option-container ex_container" key={`option-${key}`}>
                  <div style={{ paddingRight: '5px', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="radio"
                      name="option1"
                      value={`${op.itemFrameworkOneResponseChoice}`}
                      onChange={handleClick}
                      checked={
                        op.itemFrameworkOneResponseChoice ===
                        itemFrameworkOne.itemFrameworkOneResponseCorrect[0]
                      }
                      // control={<StyledRadio onChange={handleClick} />}
                    />
                  </div>

                  <div
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
                    dangerouslySetInnerHTML={{
                      __html: op?.itemFrameworkOneResponseChoiceMedia || optionLabel
                    }}
                  ></div>

                  <PopUpTextSheet
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
                    headerOneBadgeTwo={`explanation`}
                    basicInfo={{}}
                    typeOfSetObject={''}
                    defaultSheetValue={
                      op.itemFrameworkOneResponseChoiceExplanation
                        ?.itemFrameworkOneResponseChoiceExplanation
                    }
                    actualLableValue={'assessmentManuscriptSecondary'}
                    mode={'revise'}
                    onClickSave={(innerText) => {
                      let opArr = itemFrameworkOneResponseChoice;
                      opArr.forEach((element) => {
                        if (
                          element.itemFrameworkOneResponseChoice ===
                          op.itemFrameworkOneResponseChoice
                        ) {
                          element.itemFrameworkOneResponseChoiceExplanation.itemFrameworkOneResponseChoiceExplanation = innerText;
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
                  {(op.itemFrameworkOneResponseChoiceExplanation
                    ?.itemFrameworkOneResponseChoiceExplanation !== '' ||
                    reviewMode === 'revise') && (
                    <div
                      className="ex_container"
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
                      {ReactHTMLParser(
                        op.itemFrameworkOneResponseChoiceExplanation
                          ?.itemFrameworkOneResponseChoiceExplanation || responseChoiceDescription
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div>
        <div
          style={{
            height: '55px'
          }}
        ></div>
      </div>
    </>
  );
};

export default DisplayPaneFiveRadioButton;
