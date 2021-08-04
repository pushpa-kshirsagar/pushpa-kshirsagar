import React from 'react';
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

const DisplayPaneFiveRadioButton = (props) => {
  const dispatch = useDispatch();
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const optionLabel =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp;";
  const itemLabel = '<span>item</span>&nbsp';
  const itemLabelText =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const responseLabel =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const itemDescription =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseChoiceDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp; <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const itemFrameworkOneResponseChoice =
    itemInformation?.informationFramework?.itemFrameworkOne?.itemFrameworkOneResponseChoice || [];
  const itemFrameworkOne = itemInformation?.informationFramework?.itemFrameworkOne;
  const { setSelectedChoiceObject } = props;

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
  const isHrSetup = false;

  return (
    <>
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
        <div className={'containerPadding'}>
          <RadioGroup
            value={itemFrameworkOne?.itemFrameworkOneResponseCorrect[0] || ''}
            // onChange={(event) => {}}
            defaultValue=""
            aria-label="Options"
            name="option1"
            className={isHrSetup ? 'containerPadding hr-setup' : ''}
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
                      labelPlacement="bottom"
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
                      headerOneBadgeOne={'choice'}
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
                      headerOneBadgeTwo={`explanation`}
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
                        op.itemFrameworkOneResponseChoiceExplanation || responseChoiceDescription
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
    </>
  );
};

export default DisplayPaneFiveRadioButton;
