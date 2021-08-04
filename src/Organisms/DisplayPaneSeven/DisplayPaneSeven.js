import React, { Fragment, useEffect, useState } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneSeven.css';
import { useDispatch, useSelector } from 'react-redux';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import PopUpAssessmentNavigator from '../../PopUpInformation/PopUpAssessmentNavigator';
import {
  POPUP_OPEN,
  SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_STATE
} from '../../actionType';
import { ASSESSMENT_FINISH_POPUP_OPTION } from '../../PopUpConfig';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
export const DisplayPaneSeven = () => {
  const [isQuestionFlaged, setIsQuestionFlaged] = useState(false);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [currentQuestionChoice, setcurrentQuestionChoice] = useState(0);
  const { isDisplayPaneSixShow } = useSelector((state) => state.AssessmentReducer);
  const flagQuestion = () => {
    setIsQuestionFlaged((state) => !state);
  };
  const dispatch = useDispatch();
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { assesseeAssessmentStartData } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
  const onClickFooter = (e) => {
    let clickedval = e.currentTarget.getAttribute('data-value');
    if (clickedval === 'next') {
      if (currentQuestionIndex < assesseeAssessmentStartData.assessmentItem.length - 1) {
        setcurrentQuestionIndex(currentQuestionIndex + 1);
        setcurrentQuestionChoice(null);
      } else {
        dispatch({
          type: SET_POPUP_STATE,
          payload: {
            popupHeaderOne: 'assessment',
            popupHeaderOneBadgeOne: 'close',
            popupHeaderOneBadgeTwo: '',
            isPopUpValue: '',
            popupOpenType: 'primary',
            secondaryOptionCheckValue: 'assignment',
            popupContentArrValue: ASSESSMENT_FINISH_POPUP_OPTION,
            selectedTagValue: e.currentTarget.getAttribute('assignmentid'),
            selectedTagStatus: 'status'
          }
        });
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'assesseeAssessmentStartData', value: null }
        });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneSix' });
        dispatch({ type: POPUP_OPEN, payload: 'paneSevenPopup' });
        setcurrentQuestionIndex(-1);
      }
    }
    // dispatch({ type: NAVIGATOR_MODE });
  };
  useEffect(() => {
    // setcurrentQuestionIndex(1);
  }, [assesseeAssessmentStartData]);
  const primaryIcon = [];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  const handleRadioButton = (e) =>{
    console.log(e.target.value);
    setcurrentQuestionChoice(e.target.value)
  }
  console.log('currentQuestionIndex', currentQuestionIndex);
  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="five"
          headerOne={assesseeAssessmentStartData?.assessmentName}
          headerOneBadgeOne=""
          headerPanelColour="green"
        />
      </div>
      <div className="containerPadding displayPaneFive-main-container">
        {assesseeAssessmentStartData && (
          <Fragment>
            <div className="containerPadding sticky-header">
              <div style={{ height: '50px', padding: '0 5px', display: 'flex' }}>
                <div style={{ flex: '2' }} className="flex-center">
                  <span style={{ fontWeight: 'bold' }}>
                    {currentQuestionIndex +
                      1 +
                      '/' +
                      assesseeAssessmentStartData.assessmentItem.length}{' '}
                  </span>
                </div>
                <div style={{ flex: '1' }} className="flex-center">
                  <span style={{ fontWeight: 'bold' }}>
                    {' '}
                    {
                      assesseeAssessmentStartData.assessmentItem[currentQuestionIndex]
                        .itemFrameworkOneScore
                    }{' '}
                  </span>
                </div>
                <div style={{ flex: '1' }} className="flex-center">
                  <IconButton>
                    <RefreshIcon style={{ width: '20px', height: '20px', color: 'black' }} />
                  </IconButton>
                </div>
                <div style={{ flex: '1' }} className="flex-center"></div>
                <div style={{ flex: '1' }} className="flex-center">
                  <IconButton onClick={flagQuestion} className={'assessmentFlagButton'}>
                    {isQuestionFlaged ? (
                      <i className="fa fa-flag" style={{ color: '#ff6464' }}></i>
                    ) : (
                      <i className="far fa-flag"></i>
                    )}
                  </IconButton>
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
              <Fragment>
                {currentQuestionIndex !== -1 && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        assesseeAssessmentStartData.assessmentItem[currentQuestionIndex]
                          .itemFrameworkOneMedia
                    }}
                  ></div>
                )}
              </Fragment>

              <div>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={currentQuestionChoice}
                  onChange={handleRadioButton}
                >
                  {assesseeAssessmentStartData.assessmentItem[
                    currentQuestionIndex
                  ].itemFrameworkOneResponseChoice.map((item) => {
                    return (
                      <Fragment>
                        <FormControlLabel
                          value={item.itemFrameworkOneResponseChoice}
                          control={<Radio />}
                          label={
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.itemFrameworkOneResponseChoiceMedia
                              }}
                            />
                          }
                        />
                      </Fragment>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          </Fragment>
        )}
        <FooterIconTwo
          className={isDisplayPaneSixShow ? 'widthDisplayPaneFive' : 'fullWidth'}
          FilterModeEnable={false}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
        <PopUpAssessmentNavigator isActive={isPopUpValue === 'NavigatorPOPUP'} />
      </div>
    </>
  );
};

export default DisplayPaneSeven;
