import React, { Fragment, useEffect, useState } from 'react';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import NavigatorIcon from '@material-ui/icons/OpenWith';
import './DisplayPaneSeven.css';
import '../DisplayPaneFive/DisplayPaneFive.css';
import '../../Molecules/ReviewList/ReviewList.css';
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
import { setAssesseeAssessmentItemSaveResCall } from '../../Actions/ActionAssesseeAssessment';
import DisplayPaneFiveAssessment from '../DisplayPaneFive/DisplayPaneFiveAssessment';

export const DisplayPaneSeven = () => {
  const [isQuestionFlaged, setIsQuestionFlaged] = useState([]);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [currentQuestionChoice, setcurrentQuestionChoice] = useState(0);
  const [itemTimeStart, setItemTimeStart] = useState(0);
  const [currentSectionIndex, setcurrentSectionIndex] = useState(0);
  const [itemTimeId, setItemTimeId] = useState('');
  const [isShowReviewIcon, setisShowReviewIcon] = useState(true);
  const { isDisplayPaneSixShow } = useSelector((state) => state.AssessmentReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);

  const dispatch = useDispatch();
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { assesseeAssessmentStartData, currentSequenceIndex, assesseeAssignmentAssessmentData, menuscript, synopsis, communique } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
  const {
  selectedTagValue
  } = useSelector((state) => state.PopUpReducer);
  console.log('selectedTagValue',selectedTagValue);
  console.log('menuscript,synopsis,communiqué');
  console.log(menuscript, synopsis, communique);
  console.log('pane sevenassesseeAssessmentStartData');
  console.log(assesseeAssessmentStartData);
  const time = new Date();
  const [timer, setTimer] = useState(time);
  const timerFinished = () => {
    let tempArr = ASSESSMENT_FINISH_POPUP_OPTION;
    tempArr = [tempArr[0], { ...tempArr[1], disabled: true }];
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assessment',
        popupHeaderOneBadgeOne: 'time-out',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: tempArr
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'paneSevenPopup' });
    dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneSix' });
  };
  const onClickFooter = (e) => {
    debugger;
    let clickedval = e.currentTarget.getAttribute('data-value');
    let item =
      assesseeAssessmentStartData?.assessmentSectionItemDistinct[currentQuestionIndex];
    console.log('item', item);
    let itemId = item?.itemId
    let itemFlaged = item?.assesseeAssignmentAssessmentItemFlagged;
    // let id = assesseeAssessmentStartData?.assessmentSection[0].assessmentSectionItemDistinct[currentQuestionIndex].id;
    //console.log('currentQuestionIndex', currentQuestionIndex);
    console.log('itemId', itemId);
    let assesseeId = assesseeAssessmentStartData.assesseeId;
    if (clickedval === 'previous') {
      let prevIndex = currentQuestionIndex - 1;
      let responseInLocal = JSON.parse(localStorage.getItem('navigationItem')) || [];
      if (currentQuestionIndex !== 0) {
        setcurrentQuestionIndex(prevIndex);
        let itemData =
          assesseeAssessmentStartData?.assessmentSectionItemDistinct[prevIndex];
        let item = responseInLocal.filter(function (ii) {
          return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
        });
        console.log('item', item);
        if (item.length > 0)
          setcurrentQuestionChoice(item[0].assesseeAssignmentAssessmentItemResponseChoiceSelected);
      } else {
        // let prevSec = currentSectionIndex - 1;
        // if (currentSectionIndex != 0) {
        //   setcurrentSectionIndex(prevSec);
        //   setcurrentQuestionIndex(
        //     assesseeAssessmentStartData?.assessmentSection[prevSec]
        //       ?.assessmentSectionItemDistinct.length - 1
        //   );
        //   let itemData =
        //     assesseeAssessmentStartData?.assessmentSection[prevSec].assessmentSectionItemDistinct[
        //     assesseeAssessmentStartData?.assessmentSection[prevSec]
        //       ?.assessmentSectionItemDistinct.length - 1
        //     ];
        //   let item = responseInLocal.filter(function (ii) {
        //     return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
        //   });
        //   console.log('item', item);
        //   if (item.length > 0)
        //     setcurrentQuestionChoice(item[0].assesseeAssignmentAssessmentItemResponseChoiceSelected);
        // }
      }
    }
    if (clickedval === 'first') {
      let responseInLocal = JSON.parse(localStorage.getItem('navigationItem')) || [];
      if (currentQuestionIndex !== 0) {
        setcurrentQuestionIndex(0);
        let itemData =
          assesseeAssessmentStartData.assessmentSectionItemDistinct[0];
        let item = responseInLocal.filter(function (ii) {
          return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
        });
        if (item.length > 0)
          setcurrentQuestionChoice(item[0].assesseeAssignmentAssessmentItemResponseChoiceSelected);
      } else {
        // if (currentSectionIndex !== 0) {
        //   setcurrentSectionIndex(currentSectionIndex - 1);
        //   setcurrentQuestionIndex(0);
        //   let itemData =
        //     assesseeAssessmentStartData.assessmentSection[currentSectionIndex - 1].assessmentSectionItemDistinct[0];
        //   let item = responseInLocal.filter(function (ii) {
        //     return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
        //   });
        //   if (item.length > 0)
        //     setcurrentQuestionChoice(item[0].assesseeAssignmentAssessmentItemResponseChoiceSelected);
        // }
      }
    }
    if (clickedval === 'last') {
      let responseInLocal = JSON.parse(localStorage.getItem('navigationItem')) || [];
      if (currentQuestionIndex < assesseeAssessmentStartData.assessmentSectionItemDistinct.length - 1) {
        let lastIndex =
          assesseeAssessmentStartData.assessmentSectionItemDistinct.length - 1;
        setcurrentQuestionIndex(lastIndex);
        let itemData =
          assesseeAssessmentStartData.assessmentSectionItemDistinct[lastIndex];
        let item = responseInLocal.filter(function (ii) {
          return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
        });
        if (item.length > 0)
          setcurrentQuestionChoice(
            item[lastIndex].assesseeAssignmentAssessmentItemResponseChoiceSelected
          );
      }
      // } else {
      //   if (currentSectionIndex < assesseeAssessmentStartData.assessmentSection.length - 1) {
      //     setcurrentSectionIndex(currentSectionIndex + 1);
      //     let lastIndex =
      //       assesseeAssessmentStartData.assessmentSection[currentSectionIndex + 1].assessmentSectionItemDistinct.length - 1;
      //     setcurrentQuestionIndex(lastIndex);
      //     //let responseInLocal = JSON.parse(localStorage.getItem('navigationItem')) || [];
      //     let itemData =
      //       assesseeAssessmentStartData.assessmentSection[currentSectionIndex + 1].assessmentSectionItemDistinct[lastIndex];
      //     let item = responseInLocal.filter(function (ii) {
      //       return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
      //     });
      //     if (item.length > 0)
      //       setcurrentQuestionChoice(
      //         item[lastIndex].assesseeAssignmentAssessmentItemResponseChoiceSelected
      //       );
      //   }
      // }
    }
    if (clickedval === 'next') {
      if (
        currentQuestionIndex <
        assesseeAssessmentStartData?.assessmentSectionItemDistinct.length - 1
      ) {
        setcurrentQuestionIndex(currentQuestionIndex + 1);
        //setcurrentQuestionChoice(null);
        //setItemTimeStart(new Date().getTime());
      } else {
        if (selectedTagValue < assesseeAssignmentAssessmentData?.informationFramework?.assessmentSection.length - 1) {
          dispatch({
            type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
            payload: { stateName: 'currentSequenceIndex', value: currentSequenceIndex + 1 }
          })
          dispatch({
            type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
            payload: { stateName: 'isAssessmentStart', value: 'STOP' }
          })
           
          dispatch({
            type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
            payload: { stateName: 'assesseeAssessmentStartData', value: null }
          })
        }
        else {
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
        // if (currentSectionIndex < assesseeAssessmentStartData.assessmentSection.length - 1) {
        //   setcurrentSectionIndex(currentSectionIndex + 1);
        //   setcurrentQuestionIndex(0);
        //   setcurrentQuestionChoice(0);
        // } 
      }
    }
    if (currentQuestionChoice !== 0 || itemFlaged) {
      setAssesseeAssessmentItemSaveResCall(
        selectedAssociateInfo,
        dispatch,
        assesseeAssessmentStartData,
        itemId,
        assesseeId,
        currentQuestionChoice,
        itemTimeStart,
        itemFlaged
      );
      setcurrentQuestionChoice(0);
      setItemTimeStart(new Date().getTime());
    }
    // dispatch({ type: NAVIGATOR_MODE });
    setisShowReviewIcon(true);
  };
  const onClickReview = () => {
    setisShowReviewIcon(false);
  };
  useEffect(() => {
    debugger;
    setItemTimeStart(new Date().getTime());

    const sec = assesseeAssessmentStartData?.assessmentSectionTime / 1000;
    //const sec = assesseeAssessmentStartData?.assessmentSection[currentSectionIndex]?.assessmentSectionTime / 1000;

    //const sec = assesseeAssessmentStartData?.assessmentTime / 1000;
    let tt = new Date();
    tt.setSeconds(tt.getSeconds() + sec);
    setTimer(tt);
    setcurrentQuestionIndex(0);
  }, [assesseeAssessmentStartData]);
  const primaryIcon = [{ label: 'navigator', onClick: onClickReview, Icon: NavigatorIcon }];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  const handleRadioButton = (e) => {
    console.log(e.target.value);
    setcurrentQuestionChoice(e.target.value);
  };
  const flagQuestion = (itemId) => {
    debugger;
    const isSelected = isQuestionFlaged.includes(itemId);
    let flaggedArr = isQuestionFlaged;
    let currentQuestion = assesseeAssessmentStartData?.assessmentSectionItemDistinct[
      currentQuestionIndex
    ];
    // if (isSelected) {
    //   setIsQuestionFlaged(isQuestionFlaged.filter(selectedId => selectedId !== itemId));
    //   currentQuestion['assesseeAssignmentAssessmentItemFlagged'] = false;
    // } else {
    //   currentQuestion['assesseeAssignmentAssessmentItemFlagged'] = true;
    //   flaggedArr.push(itemId);
    //   setIsQuestionFlaged([...flaggedArr]);
    // }

    if (currentQuestion?.assesseeAssignmentAssessmentItemFlagged) {
      currentQuestion.assesseeAssignmentAssessmentItemFlagged = false;
      setIsQuestionFlaged(isQuestionFlaged.filter(selectedId => selectedId !== itemId));
    } else {
      currentQuestion.assesseeAssignmentAssessmentItemFlagged = true;
      flaggedArr.push(itemId);
      setIsQuestionFlaged([...flaggedArr]);
    }
    assesseeAssessmentStartData.assessmentSectionItemDistinct[
      currentQuestionIndex
    ] = currentQuestion;
    // //setIsQuestionFlaged((state) => !state);
  };
  let itemObect =
    assesseeAssessmentStartData?.assessmentSectionItemDistinct[currentQuestionIndex];
  console.log('itemObect', itemObect);
  // let itemObect =
  //   assesseeAssessmentStartData?.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct[
  //   currentQuestionIndex
  //   ];
  //console.log('itemObect', itemObect);
  return (
    <>
      <div>
        <HeaderCard
          displayPane="itemPreview"
          className=""
          //displayPane="five"
          headerOne={assesseeAssessmentStartData ? 'assessment' : null}
          headerOneBadgeOne=""
          headerPanelColour="green"
        />
      </div>
      {
        assesseeAssessmentStartData && (
          <>
            <DisplayPaneFiveAssessment
              headerOne={'assessment'}
              informationFramework={assesseeAssessmentStartData}
              currentItemIndex={currentQuestionIndex}
              currentSectionIndex={currentSectionIndex}
              itemObect={itemObect}
              timerFinished={timerFinished}
              timer={timer}
              handleRadioButton={handleRadioButton}
              currentQuestionChoice={currentQuestionChoice}
              flagQuestion={flagQuestion}
              assessmentDescription={assesseeAssignmentAssessmentData?.assessmentDescription}
              assessmentName={assesseeAssignmentAssessmentData?.assessmentName}
            />
            <FooterIconTwo
              className={isDisplayPaneSixShow ? 'widthDisplayPaneFive' : 'fullWidth'}
              FilterModeEnable={isShowReviewIcon}
              FilterMode={FilterMode}
              //onClick={onClickFooter}
              onClick={onClickReview}
              primaryIcon={primaryIcon}
              secondaryIcon={secondaryIcon}
              isAssessmentPreviewShow={true}
            />
          </>
        )}
      <PopUpAssessmentNavigator
        isActive={isPopUpValue === 'NavigatorPOPUP'}
        itemData={assesseeAssessmentStartData?.assessmentSectionItemDistinct}
      />
    </>
  );
};

export default DisplayPaneSeven;
