import React, { Fragment, useEffect, useState } from 'react';
import ReactHTMLParser from 'react-html-parser';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import HeaderCard from '../../Molecules/Header/HeaderCard';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setAssesseeAssessmentItemSaveResCall } from '../../Actions/ActionAssesseeAssessment';
import { useTimer } from 'react-timer-hook';
import { InputLabel, Paper } from '@material-ui/core';
import EditorTemplate from '../DisplayPaneFive/EditorTemplate';
import DisplayPaneFiveAssessment from '../DisplayPaneFive/DisplayPaneFiveAssessment';

// const AssessmentTimer = ({ expiryTimestamp, timerFinished }) => {
//   const { seconds, minutes, hours } = useTimer({
//     expiryTimestamp,
//     onExpire: timerFinished
//     // onExpire: () => {
//     //   console.warn('onExpire called');
//     // }
//   });
//   return (
//     <div>
//       <span>{hours < 10 ? '0' + hours : hours}</span>:
//       <span>{minutes < 10 ? '0' + minutes : minutes}</span>:
//       <span>{seconds < 10 ? '0' + seconds : seconds}</span>
//     </div>
//   );
// };
// const AssessmentHeader = (props) => {
//   return (
//     <Fragment>
//       <Paper className={'dossierContainerTop'}>
//         <div className="containerPadding sticky-header">
//           <div style={{ height: '49px', padding: '0 5px', display: 'flex' }} className={''}>
//             <div style={{ display: 'inline-block', flex: '2' }}>
//               <div
//                 className={[
//                   'midPaneInformation',
//                   props.assessmentDesc !== '' ? null : 'aliasmiddle'
//                 ].join(' ')}
//               >
//                 {props.assessmentName}
//               </div>
//               <div className={['midPaneLabel', 'textOverflow'].join(' ')}>
//                 {props.assessmentDesc}
//               </div>
//             </div>
//             <div
//               style={{ flex: '1', display: 'flex', alignItems: 'center' }}
//               className="flex-center"
//             >
//               <span
//                 className={['unitFlex', 'assessmenetStatusText', 'AssesseeNotifyStatus'].join(' ')}
//                 style={{ textAlign: 'center' }}
//               >
//                 <InputLabel
//                   className={['iconsFooterLabelDefault1', 'AssesseeNotifyStatusLabel'].join(' ')}
//                 >
//                   {1 + '/' + 2}
//                 </InputLabel>
//                 <InputLabel
//                   className={['iconsFooterLabelDefault1', 'AssesseeNotifyStatusLabel'].join(' ')}
//                 >
//                   {props.qnumber + '/' + props.totalQuestion}
//                 </InputLabel>
//               </span>
//             </div>
//             <div
//               style={{ flex: '1', display: 'flex', alignItems: 'center' }}
//               className="flex-center"
//             >
//               {props.score}
//             </div>
//             <div
//               style={{ flex: '1', display: 'flex', alignItems: 'center' }}
//               className="flex-center"
//             >
//               {props.timer && (
//                 <span style={{}}>
//                   <AssessmentTimer
//                     expiryTimestamp={props.timer}
//                     key={props.timer}
//                     timerFinished={props.timerFinished}
//                   />
//                 </span>
//               )}
//             </div>
//             <div
//               style={{ flex: '1', display: 'flex', alignItems: 'center' }}
//               className="flex-center"
//             >
//               <IconButton onClick={props.onClickFlag} className={'assessmentFlagButton'}>
//                 {props.isQuestionFlaged ? (
//                   <i className="fa fa-flag" style={{ color: '#ff6464' }}></i>
//                 ) : (
//                   <i className="far fa-flag"></i>
//                 )}
//               </IconButton>
//             </div>
//           </div>
//         </div>
//       </Paper>
//       <hr className={'assessmentHeaderHr'} />
//     </Fragment>
//   );
// };
export const DisplayPaneSeven = () => {
  const [isQuestionFlaged, setIsQuestionFlaged] = useState([]);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [currentQuestionChoice, setcurrentQuestionChoice] = useState(0);
  const [itemTimeStart, setItemTimeStart] = useState(0);
  const [currentSectionIndex, setcurrentSectionIndex] = useState(0);
  const [itemTimeId, setItemTimeId] = useState('');
  const { isDisplayPaneSixShow } = useSelector((state) => state.AssessmentReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);

  const dispatch = useDispatch();
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { assesseeAssessmentStartData } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
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
    let clickedval = e.currentTarget.getAttribute('data-value');
    let itemId =
      assesseeAssessmentStartData?.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct[
        currentQuestionIndex
      ].itemId;
    // let id = assesseeAssessmentStartData?.assessmentSection[0].assessmentSectionItemDistinct[currentQuestionIndex].id;
    console.log('currentQuestionIndex', currentQuestionIndex);
    console.log('itemId', itemId);
    let assesseeId = assesseeAssessmentStartData.assesseeId;
    if (clickedval === 'previous') {
      let prevIndex = currentQuestionIndex - 1;
      let responseInLocal = JSON.parse(localStorage.getItem('navigationItem')) || [];
      if (currentQuestionIndex !== 0) {
        setcurrentQuestionIndex(prevIndex);
        let itemData =
          assesseeAssessmentStartData?.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct[
          prevIndex
          ];
        let item = responseInLocal.filter(function (ii) {
          return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
        });
        console.log('item', item);
        if (item.length > 0)
          setcurrentQuestionChoice(item[0].assesseeAssignmentAssessmentItemResponseChoiceSelected);
      } else {
        let prevSec=currentSectionIndex - 1;
        if (currentSectionIndex != 0) {
          setcurrentSectionIndex(prevSec);
          setcurrentQuestionIndex(
            assesseeAssessmentStartData?.assessmentSection[prevSec]
              ?.assessmentSectionItemDistinct.length - 1
          );
          let itemData =
          assesseeAssessmentStartData?.assessmentSection[prevSec].assessmentSectionItemDistinct[
            assesseeAssessmentStartData?.assessmentSection[prevSec]
            ?.assessmentSectionItemDistinct.length - 1
          ];
        let item = responseInLocal.filter(function (ii) {
          return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
        });
        console.log('item', item);
        if (item.length > 0)
          setcurrentQuestionChoice(item[0].assesseeAssignmentAssessmentItemResponseChoiceSelected);
        }
      }
    }
    if (clickedval === 'first') {
      let responseInLocal = JSON.parse(localStorage.getItem('navigationItem')) || [];
      if (currentQuestionIndex !== 0) {
        setcurrentQuestionIndex(0);
        let itemData =
        assesseeAssessmentStartData.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct[0];
      let item = responseInLocal.filter(function (ii) {
        return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
      });
      if (item.length > 0)
        setcurrentQuestionChoice(item[0].assesseeAssignmentAssessmentItemResponseChoiceSelected);
      } else {
        if (currentSectionIndex !== 0) {
          setcurrentSectionIndex(currentSectionIndex - 1);
          setcurrentQuestionIndex(0);
          let itemData =
        assesseeAssessmentStartData.assessmentSection[currentSectionIndex - 1].assessmentSectionItemDistinct[0];
      let item = responseInLocal.filter(function (ii) {
        return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
      });
      if (item.length > 0)
        setcurrentQuestionChoice(item[0].assesseeAssignmentAssessmentItemResponseChoiceSelected);
        }
      }
      // if(currentQuestionChoice!==0){

      // }
      
      // setcurrentQuestionChoice(null);
    }
    if (clickedval === 'last') {
      let responseInLocal = JSON.parse(localStorage.getItem('navigationItem')) || [];
      if (currentQuestionIndex < assesseeAssessmentStartData.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct.length - 1) {
        let lastIndex =
          assesseeAssessmentStartData.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct.length - 1;
        setcurrentQuestionIndex(lastIndex);
        //let responseInLocal = JSON.parse(localStorage.getItem('navigationItem')) || [];
        let itemData =
          assesseeAssessmentStartData.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct[lastIndex];
        let item = responseInLocal.filter(function (ii) {
          return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
        });
        if (item.length > 0)
          setcurrentQuestionChoice(
            item[lastIndex].assesseeAssignmentAssessmentItemResponseChoiceSelected
          );
      } else {
        if (currentSectionIndex < assesseeAssessmentStartData.assessmentSection.length - 1) {
          setcurrentSectionIndex(currentSectionIndex + 1);
          let lastIndex =
            assesseeAssessmentStartData.assessmentSection[currentSectionIndex + 1].assessmentSectionItemDistinct.length - 1;
          setcurrentQuestionIndex(lastIndex);
          //let responseInLocal = JSON.parse(localStorage.getItem('navigationItem')) || [];
          let itemData =
            assesseeAssessmentStartData.assessmentSection[currentSectionIndex + 1].assessmentSectionItemDistinct[lastIndex];
          let item = responseInLocal.filter(function (ii) {
            return ii.assesseeAssignmentAssessmentItemId === itemData.itemId;
          });
          if (item.length > 0)
            setcurrentQuestionChoice(
              item[lastIndex].assesseeAssignmentAssessmentItemResponseChoiceSelected
            );
        }
      }
      // setcurrentQuestionChoice(null);
    }
    if (clickedval === 'next') {
      // setAssesseeAssessmentItemSaveResCall(
      //   selectedAssociateInfo,
      //   dispatch,
      //   assesseeAssessmentStartData,
      //   itemId,
      //   assesseeId,
      //   currentQuestionChoice,
      //   itemTimeStart
      // );
      if (
        currentQuestionIndex <
        assesseeAssessmentStartData.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct.length - 1
      ) {
        setcurrentQuestionIndex(currentQuestionIndex + 1);
        setcurrentQuestionChoice(null);
        //setItemTimeStart(new Date().getTime());
      } else {
        if (currentSectionIndex < assesseeAssessmentStartData.assessmentSection.length - 1) {
          setcurrentSectionIndex(currentSectionIndex + 1);
          setcurrentQuestionIndex(0);
          setcurrentQuestionChoice(0);
          //setItemTimeStart(new Date().getTime());
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
    }
    if (currentQuestionChoice !== 0) {
      setAssesseeAssessmentItemSaveResCall(
        selectedAssociateInfo,
        dispatch,
        assesseeAssessmentStartData,
        itemId,
        assesseeId,
        currentQuestionChoice,
        itemTimeStart
      );
      setcurrentQuestionChoice(0);
      setItemTimeStart(new Date().getTime());
    }
    // dispatch({ type: NAVIGATOR_MODE });
  };
  useEffect(() => {
    setItemTimeStart(new Date().getTime());
    //const sec = assesseeAssessmentStartData?.assessmentSection[0]?.assessmentTime / 1000;
    const sec = assesseeAssessmentStartData?.assessmentTime / 1000;
    let tt = new Date();
    tt.setSeconds(tt.getSeconds() + sec);
    setTimer(tt);
  }, [assesseeAssessmentStartData]);
  const primaryIcon = [];
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
    const isSelected=isQuestionFlaged.includes(itemId);
    let flaggedArr = isQuestionFlaged;
    let currentQuestion = assesseeAssessmentStartData?.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct[
      currentQuestionIndex
    ];
    if(isSelected){
      setIsQuestionFlaged(isQuestionFlaged.filter(selectedId=>selectedId!==itemId));
      currentQuestion['isFlagged'] = false;
    }else{
      currentQuestion['isFlagged']=true;
      flaggedArr.push(itemId);
    setIsQuestionFlaged([...flaggedArr]);
    }
    assesseeAssessmentStartData.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct[
      currentQuestionIndex
    ] = currentQuestion;    
    // flaggedArr.push(itemId);
    // //setIsQuestionFlaged((state) => !state);
    // setIsQuestionFlaged(flaggedArr);
  };

  console.log('currentQuestionIndex', currentQuestionIndex);
  let itemObect =
    assesseeAssessmentStartData?.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct[
    currentQuestionIndex
    ];
  console.log('itemObect', itemObect);
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
              isQuestionFlaged={isQuestionFlaged}
            />
            <FooterIconTwo
              className={isDisplayPaneSixShow ? 'widthDisplayPaneFive' : 'fullWidth'}
              FilterModeEnable={false}
              FilterMode={FilterMode}
              onClick={onClickFooter}
              primaryIcon={primaryIcon}
              secondaryIcon={secondaryIcon}
              isAssessmentPreviewShow={true}
            />
          </>
        )}
      <PopUpAssessmentNavigator
        isActive={isPopUpValue === 'NavigatorPOPUP'}
        itemData={assesseeAssessmentStartData?.assessmentSection[currentSectionIndex].assessmentSectionItemDistinct}
        isQuestionFlaged={isQuestionFlaged}
        defaultCheckVal='all'
      />
    </>
  );
};

export default DisplayPaneSeven;
