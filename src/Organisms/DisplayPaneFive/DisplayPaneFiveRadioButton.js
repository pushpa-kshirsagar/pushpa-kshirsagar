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
  const response = '<span>response</span> &nbsp ';
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
  const { setSelectedChoiceObject, itemType } = props;
  // const [subItemList, setSubItemList] = useState(['item-1', 'item-2', 'item-3']);
  const [scaleList, setScaleList] = useState(['scale-1', 'scale-2', 'scale-3']);
  const [liketcorrect, setliketcorrect] = useState('');
  const [lab ,setLabel] = useState(true)
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
  console.log('responseObject', responseObject);
  console.log('itemFrameworkOne', itemFrameworkOne);
  return (
    <>
      <div>
        {/* for label */}
        {(itemFrameworkOne?.itemFrameworkOneLabel?.itemFrameworkOneLabel !== '' ||
          reviewMode === 'revise') && (
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
        )}
      </div>
      <div>
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
      <div>
        {(itemFrameworkOne?.itemFrameworkOneExplanation?.itemFrameworkOneExplanation !== '' ||
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
        )}
      </div>

      {/* for response label */}
      <div>
        {(itemFrameworkOne?.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabel !== '' ||
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
        )}
      </div>

      {/* for response */}
      {(itemType === 'Response (Long)' ||
        itemType === 'Response (Short)' ||
        itemType === 'Master-Framework') && (
        <div>
          {(itemFrameworkOne?.itemFrameworkOneResponse !== '' || reviewMode === 'revise') && (
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
          )}
        </div>
      )}

      {/* for response choice
      {(itemType === 'Response-Choice (Single-Select)' ||
        itemType === 'Master-Framework' ||
        itemType === 'False-True' ||
        itemType === 'Fill-in-the-Blank (Response-Choice)') && (

        <div className={'containerPadding'}>
          <FormControl component="fieldset">
            <RadioGroup
              value={itemFrameworkOne?.itemFrameworkOneResponseCorrect[0] || ''}
              defaultValue=""
              aria-label="Options"
              name="option1"
              className={isHrSetup ? 'containerPadding hr-setup' : ''}
            >
              {itemFrameworkOneResponseChoice.map((op, key) => {
                return (
                  <div key={`op-${key}`}>
                    
                    <div className="option-container" key={`option-${key}`}>

                      <div className="item1">
                        <FormControlLabel
                          key={`radio-${key}`}
                          className={'radio-button'}
                          value={`${op.itemFrameworkOneResponseChoice}`}
                          control={<StyledRadio onClick={handleClick} />}
                          label=""
                          labelPlacement="bottom"
                        />
                      </div>

                      <div
                        className="item"
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
                      <div
                        className="respexplain"
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
                    </div>

                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
      )} */}

      {/* for response choice */}
      {(itemType === 'Response-Choice (Single-Select)' ||
        itemType === 'Master-Framework' ||
        itemType === 'False-True' ||
        itemType === 'Fill-in-the-Blank (Response-Choice)') && (

        <div className={'likartscale'}>
          
              {itemFrameworkOneResponseChoice.map((op, key) => {
                return (
                  <div key={`op-${key}`}>
                    
                    <div className="option-container" key={`option-${key}`}>

                      <div className="item1">
                        <input type="radio" name="option1" value={`${op.itemFrameworkOneResponseChoice}`} control={<StyledRadio onClick={handleClick} />} />
                      </div>

                      <div
                        className="item"
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
                    </div>

                  </div>
                );
              })}
            
        </div>
      )}

      {/* for response explanation */}
      <div>
        {(itemFrameworkOne?.itemFrameworkOneResponseExplanation
          ?.itemFrameworkOneResponseExplanation !== '' ||
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
        )}
      </div>


      
    <div className="likartscale">
      {(itemType === 'Likert-Scale' || itemType === 'Master-Framework') && (
        <FormControl component="fieldset" style={{ width: '100%' }}>
          
          <div className="likart">

            <div class="item"></div>

            {itemFrameworkOne?.itemFrameworkOneScale.map((ob, key) => {
              return <div className={'likert_choice-sclae'} style={{fontSize : '1.2rem'}}>{ob.itemFrameworkOneScaleLabel}</div>;
            })}
      
          </div>


            {itemFrameworkOne?.itemFrameworkOneSection.map((ob, keys) => {
              console.log({ob})
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
                                  popupMode: `ITEM_MEDIA_TEXT_${keys}`
                                }
                              });
                            }
                          : null
                      }
                    >
                      {ReactHTMLParser(
                        ob.itemFrameworkOneSection?.itemFrameworkOneMedia
                          ? ob.itemFrameworkOneSection?.itemFrameworkOneMedia
                          : '<span>item</span>&nbsp;' + keys
                      )}
                    </div>
                  
                    {itemFrameworkOneResponseChoice.map((op, key) => {
                    
                      return (
                        <>
                        <div key={`op-${key}`} className={'likert_choice-sclae'}>
                          <input type="radio" name={`option1-${ob.itemFrameworkOneSectionSequence}`} value={`${keys}-${key}`}/>  
                        </div>

                        <PopUpTextSheet
                        isActive={isPopUpValue === `ITEM_MEDIA_TEXT_${keys}`}
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
                          console.log('opArr', opArr);
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
                        <PopUpTextSheet
                        isActive={isPopUpValue === `OPTION_${keys}`}
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
                        isActive={isPopUpValue === `RESPONSE_CHOICE_DESCRIPTION_${keys}`}
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
