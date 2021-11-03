import React, { useEffect, useState } from 'react';
import CrossIcon from '@material-ui/icons/Clear';
import './DisplayPaneSix.css';
import DisplayPaneSixHeader from './DisplayPaneSixHeader';
import { useDispatch, useSelector } from 'react-redux';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import {
  POPUP_OPEN,
  SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
  SET_POPUP_STATE,
  SET_ASSESSEE_ASSESSMENT_COMMUNIQUE_STATE,
  SET_ASSESSEE_ASSESSMENT_MENUSCRIPT_STATE,
  SET_ASSESSEE_ASSESSMENT_SYNOPSIS_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_ASSESSEE_ASSESSMENT_SECTION_COMMUNIQUE_STATE,
  SET_ASSESSEE_ASSESSMENT_SECTION_MENUSCRIPT_STATE,
  SET_ASSESSEE_ASSESSMENT_SECTION_SYNOPSIS_STATE,
  SET_MIDDLEPANE_STATE
} from '../../actionType';
import { RES_START_POPUP_OPTION, ASSESSMENT_CLOSED_POPUP_OPTION } from '../../PopUpConfig';
import EditorTemplate from '../DisplayPaneFive/EditorTemplate';
import { callApiFunctionLastAttempted } from '../../Actions/GenericActions';

export const DisplayPaneSix = () => {
  const { isDisplayPaneSixShow } = useSelector((state) => state.AssessmentReducer);
  const {
    assesseeAssignmentAssessmentData,
    assesseeAssessmentStartData,
    isAssessmentStart,
    asssignmentStarted,
    currentSequenceIndex,
    currentAssessmentSectionSequenceIndex,
    assessmentsequenceObject,
    sectionMenuscript,
    sectionSynopsis,
    sectionCommunique,
    assessmentCommunique,
    assessmentMenuscript,
    assessmentSynopsis,
    assignmentsequenceObject,
    assignmentCommunique,
    assignmentManuscript,
    assignmentSynopsis
  } = useSelector((state) => state.AssesseeAssignmentAssessmentReducer);
  const { indexPointer, selectedAssociateInfo, relatedReviewListDistinctData } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { selectedTagStatus } = useSelector((state) => state.PopUpReducer);
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();
  const [currentSequenceValue, setCurrentSequenceValue] = useState('');
  const [headerValue, setHeader] = useState('');
  const [sequenceObject, setSequenceObject] = useState([]);
  const [currentSequenceIndexLocal, setCurrentSequenceIndexLocal] = useState(0);
  console.log('assignmentCommunique,assignmentManuscript,assignmentSynopsis');
  console.log(assignmentCommunique, assignmentManuscript, assignmentSynopsis);
  let communique = [];
  let menuscript = [];
  let synopsis = [];
  if (assessmentCommunique && assessmentCommunique.length > 0) {
    if (sectionCommunique && sectionCommunique.length > 0) {
      communique = [...assessmentCommunique, ...sectionCommunique];
    } else {
      communique = [...assessmentCommunique];
    }
  }
  if (assessmentMenuscript && assessmentMenuscript.length > 0) {
    if (sectionMenuscript && sectionMenuscript.length > 0) {
      menuscript = [...assessmentMenuscript, ...sectionMenuscript];
    } else {
      menuscript = [...assessmentMenuscript];
    }
  }
  if (assessmentSynopsis && assessmentSynopsis.length > 0) {
    if (sectionSynopsis && sectionSynopsis.length > 0) {
      synopsis = [...assessmentSynopsis, ...sectionSynopsis];
    }
    else {
      synopsis = [...assessmentSynopsis];
    }
  }

  useEffect(() => {
    console.log('asssignmentStarted print', asssignmentStarted);
    //setCurrentSequenceIndexLocal(currentSequenceIndex);
    //setInitialSequenceDetails();
    handleSequenceArrange();
  }, [assesseeAssignmentAssessmentData]);

  useEffect(() => {
    let assesseeAssignmentAssessmentItemLastAttempted = assesseeAssignmentAssessmentData?.assesseeAssignmentAssessmentItemLastAttempted;
    if (assessmentsequenceObject.length > 0) {
      let indexValue = assessmentsequenceObject.findIndex(obj => obj.originalValue === assesseeAssignmentAssessmentItemLastAttempted);
      console.log('lastAttempted Value', indexValue);
      dispatch({
        type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
        payload: { stateName: 'currentSequenceIndex', value: indexValue }
      })
    }
  }, [assessmentsequenceObject]);

  useEffect(() => {
    if (relatedReviewListDistinctData.length > 0) {
      let assignmentAdministrationSequence = relatedReviewListDistinctData[0]?.assignmentAdministrationSequence || [];
      let assignmentCommunique = relatedReviewListDistinctData[0]?.assignmentCommunique || [];
      let assignmentSynopsis = relatedReviewListDistinctData[0]?.assignmentSynopsis || [];
      let assignmentManuscript = relatedReviewListDistinctData[0]?.assignmentManuscript || [];
      let sequenceArr = [];
      let assignmentSynArr = [];
      let assignmentComArr = [];
      let assignmentManArr = [];
      if (assignmentAdministrationSequence.length > 0) {
        for (let i = 0; i < assignmentAdministrationSequence.length; i++) {
          let currentValue = assignmentAdministrationSequence[i];
          let lastIndexValue = parseInt(currentValue.substring(currentValue.length - 1));
          let matchValue = currentValue;
          matchValue = matchValue.substring(0, matchValue.length - 1);
          if (matchValue.trim() === 'assignment synopsis') {
            sequenceArr.push({ name: matchValue.trim(), value: assignmentSynopsis[lastIndexValue - 1], originalValue: currentValue })
            assignmentSynArr.push(assignmentSynopsis[lastIndexValue - 1]);
          } else if (matchValue.trim() === 'assignment communique') {
            assignmentComArr.push(assignmentCommunique[lastIndexValue - 1]);
            sequenceArr.push({ name: matchValue.trim(), value: assignmentCommunique[lastIndexValue - 1], originalValue: currentValue })
          } else if (matchValue.trim() === 'assignment manuscript') {
            assignmentManArr.push(assignmentManuscript[lastIndexValue - 1]);
            sequenceArr.push({ name: matchValue.trim(), value: assignmentManuscript[lastIndexValue - 1], originalValue: currentValue })
          }
        }
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'assignmentsequenceObject', value: sequenceArr }
        })
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'assignmentCommunique', value: assignmentComArr }
        })
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'assignmentManuscript', value: assignmentManArr }
        })
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'assignmentSynopsis', value: assignmentSynArr }
        })
      }

    }
  }, [relatedReviewListDistinctData])

  const handleSequenceArrange = () => {
    let assessmentAdministrationSequence = assesseeAssignmentAssessmentData?.informationFramework?.assessmentAdministrationSequence || [];
    let sequenceArr = [];
    let informationFramework = assesseeAssignmentAssessmentData?.informationFramework;
    for (let i = 0; i < assessmentAdministrationSequence.length; i++) {
      let currentValue = informationFramework?.assessmentAdministrationSequence[i];
      let lastIndexValue = parseInt(currentValue.substring(currentValue.length - 1));
      let matchValue = currentValue;
      matchValue = matchValue.substring(0, matchValue.length - 1);
      if (matchValue.trim() === 'assessment communiqué') {
        sequenceArr.push({ name: matchValue.trim(), value: informationFramework?.assessmentCommunique[lastIndexValue - 1], originalValue: currentValue });
        setSequenceObject(old => [...old, { name: matchValue.trim(), value: informationFramework?.assessmentCommunique[lastIndexValue - 1], originalValue: currentValue }])
      }
      else if (matchValue.trim() === 'assessment synopsis') {
        setSequenceObject(old => [...old, { name: matchValue.trim(), value: informationFramework?.assessmentSynopsis[lastIndexValue - 1], originalValue: currentValue }])
        sequenceArr.push({ name: matchValue.trim(), value: informationFramework?.assessmentSynopsis[lastIndexValue - 1], originalValue: currentValue });
      }
      else if (matchValue.trim() === 'assessment manuscript') {
        setSequenceObject(old => [...old, { name: matchValue.trim(), value: informationFramework?.assessmentManuscript[lastIndexValue - 1], originalValue: currentValue }])
        sequenceArr.push({ name: matchValue.trim(), value: informationFramework?.assessmentManuscript[lastIndexValue - 1], originalValue: currentValue });
      }
      else if (matchValue.trim() === 'assessment section') {
        let assessmentSection = informationFramework?.assessmentSection || [];
        let sectionObj = assessmentSection[lastIndexValue - 1];
        if (sectionObj?.assessmentSectionAdministrationSequence.length > 0) {
          for (let j = 0; j < sectionObj?.assessmentSectionAdministrationSequence.length; j++) {
            let currentSectionSequenceValue = sectionObj?.assessmentSectionAdministrationSequence[j];
            let lastIndexValue = parseInt(currentSectionSequenceValue.substring(currentSectionSequenceValue.length - 1));
            let matchValue = currentSectionSequenceValue;
            matchValue = matchValue.substring(0, matchValue.length - 1);
            if (matchValue.trim() === 'section communiqué') {
              setSequenceObject(old => [...old, { name: matchValue.trim(), value: sectionObj?.assessmentSectionCommunique[lastIndexValue - 1], originalValue: currentSectionSequenceValue }])
              sequenceArr.push({ name: matchValue.trim(), value: sectionObj?.assessmentSectionCommunique[lastIndexValue - 1], originalValue: currentSectionSequenceValue });
            }
            else if (matchValue.trim() === 'section synopsis') {
              setSequenceObject(old => [...old, { name: matchValue.trim(), value: sectionObj?.assessmentSectionSynopsis[lastIndexValue - 1], originalValue: currentSectionSequenceValue }])
              sequenceArr.push({ name: matchValue.trim(), value: sectionObj?.assessmentSectionSynopsis[lastIndexValue - 1], originalValue: currentSectionSequenceValue });
            }
            else if (matchValue.trim() === 'section manuscript') {
              setSequenceObject(old => [...old, { name: matchValue.trim(), value: sectionObj?.assessmentSectionManuscript[lastIndexValue - 1], originalValue: currentSectionSequenceValue }])
              sequenceArr.push({ name: matchValue.trim(), value: sectionObj?.assessmentSectionManuscript[lastIndexValue - 1], originalValue: currentSectionSequenceValue });
            }
          }
          setSequenceObject(old => [...old, { name: matchValue.trim(), value: sectionObj?.assessmentSectionItemDistinct, originalValue: currentValue }])
          sequenceArr.push({ name: matchValue.trim(), value: sectionObj?.assessmentSectionItemDistinct, originalValue: currentValue });
        } else {
          setSequenceObject(old => [...old, { name: matchValue.trim(), value: sectionObj?.assessmentSectionItemDistinct, originalValue: currentValue }])
          sequenceArr.push({ name: matchValue.trim(), value: sectionObj?.assessmentSectionItemDistinct, originalValue: currentValue });
        }
      }
    }
    console.log(sequenceArr);
    // dispatch({type:SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
    // payload:{'stateName':''}})
    //setSequenceObject(...sequenceArr);
    dispatch({
      type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
      payload: { stateName: 'assessmentsequenceObject', value: sequenceArr }
    })
  }
  const onClickFooter = (e) => {
    let clickedval = e.currentTarget.getAttribute('data-value');
    let tempArr = RES_START_POPUP_OPTION;
    if (isAssessmentStart === 'COMMUNIQUE') {
      if (clickedval === 'next') {
        if (indexPointer < communique.length - 1) {
          //setCurrentSequenceValue(communique[indexPointer]);
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer + 1 }
          });
        }
      }
      if (clickedval === 'previous') {
        if (indexPointer != 0) {
          //setCurrentSequenceValue(communique[indexPointer - 1]);
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer - 1 }
          });
        }
      }
      if (clickedval === 'close') {
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'isAssessmentStart', value: 'PROGRESS' }
        });
      }
    }
    if (isAssessmentStart === 'SYNOPSIS') {
      if (clickedval === 'next') {
        if (indexPointer < synopsis.length - 1) {
          //setCurrentSequenceValue(synopsis[indexPointer]);
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer + 1 }
          });
        }
      }
      if (clickedval === 'previous') {
        if (indexPointer != 0) {
          //setCurrentSequenceValue(synopsis[indexPointer - 1]);
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer - 1 }
          });
        }
      }
      if (clickedval === 'close') {
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'isAssessmentStart', value: 'PROGRESS' }
        });
      }
    }
    if (isAssessmentStart === 'MENUSCRIPT') {
      if (clickedval === 'next') {
        if (indexPointer < menuscript.length - 1) {
          setCurrentSequenceValue(menuscript[indexPointer]);
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer + 1 }
          });
        }
      }
      if (clickedval === 'previous') {
        if (indexPointer != 0) {
          setCurrentSequenceValue(menuscript[indexPointer - 1]);
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer - 1 }
          });
        }
      }
      if (clickedval === 'close') {
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'isAssessmentStart', value: 'PROGRESS' }
        });
      }
    }
    if (isAssessmentStart === 'ASSIGNMENTCOMMUNIQUE') {
      if (clickedval === 'next') {
        if (indexPointer < assignmentCommunique.length - 1) {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer + 1 }
          });
        }
      }
      if (clickedval === 'previous') {
        if (indexPointer != 0) {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer - 1 }
          });
        }
      }
      if (clickedval === 'close') {
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'isAssessmentStart', value: 'ReviewListResume' }
        });
      }

    }
    if (isAssessmentStart === 'ASSIGNMENTMENUSCRIPT') {
      if (clickedval === 'next') {
        if (indexPointer < assignmentManuscript.length - 1) {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer + 1 }
          });
        }
      }
      if (clickedval === 'previous') {
        if (indexPointer != 0) {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer - 1 }
          });
        }
      }
      if (clickedval === 'close') {
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'isAssessmentStart', value: 'ReviewListResume' }
        });
      }

    }
    if (isAssessmentStart === 'ASSIGNMENTSYNOPSIS') {
      if (clickedval === 'next') {
        if (indexPointer < assignmentSynopsis.length - 1) {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer + 1 }
          });
        }
      }
      if (clickedval === 'previous') {
        if (indexPointer != 0) {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer - 1 }
          });
        }
      }
      if (clickedval === 'close') {
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'isAssessmentStart', value: 'ReviewListResume' }
        });
      }

    }
    if (selectedTagStatus === 'UNSTARTED') {
      tempArr = [{ ...tempArr[0], disabled: true }, tempArr[1]];
    }
    if (isAssessmentStart === 'FINISH') {
      if (clickedval === 'close') {
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'assesseeAssessmentStartData', value: null }
        });
        dispatch({
          type: SET_POPUP_STATE,
          payload: {
            popupHeaderOne: 'assessment',
            popupHeaderOneBadgeOne: 'close',
            popupHeaderOneBadgeTwo: '',
            isPopUpValue: '',
            popupOpenType: 'primary',
            secondaryOptionCheckValue: 'assignment',
            popupContentArrValue: ASSESSMENT_CLOSED_POPUP_OPTION,
            selectedTagValue: e.currentTarget.getAttribute('assignmentid'),
            selectedTagStatus: 'status'
          }
        });
        dispatch({ type: POPUP_OPEN, payload: 'paneSevenPopup' });
      }
    }
    if (isAssessmentStart === 'START' || isAssessmentStart === 'STOP') {
      if (clickedval === 'next') {
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'currentSequenceIndex', value: currentSequenceIndex + 1 }
        })
        if (currentSequenceIndex < sequenceObject.length) {
          let currentValue = sequenceObject[currentSequenceIndex + 1]?.originalValue;
          let lastIndexValue = parseInt(currentValue.substring(currentValue.length - 1));
          if (sequenceObject[currentSequenceIndex + 1]?.name === 'assessment section') {
            let tempArr = RES_START_POPUP_OPTION;
            if (isAssessmentStart === 'START') {
              dispatch({
                type: SET_POPUP_STATE,
                payload: {
                  popupHeaderOne: 'assessment',
                  popupHeaderOneBadgeOne: '',
                  popupHeaderOneBadgeTwo: '',
                  isPopUpValue: '',
                  popupOpenType: 'primary',
                  popupContentArrValue: tempArr,
                  selectedTagStatus: selectedTagStatus,
                  selectedTagValue: lastIndexValue - 1
                }
              });
              dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
            } else {
              dispatch({
                type: SET_POPUP_STATE,
                payload: {
                  popupHeaderOne: 'assessment',
                  popupHeaderOneBadgeOne: '',
                  popupHeaderOneBadgeTwo: '',
                  isPopUpValue: '',
                  popupOpenType: 'primary',
                  popupContentArrValue: tempArr,
                  selectedTagStatus: selectedTagStatus,
                  selectedTagValue: lastIndexValue - 1
                }
              });
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
                payload: {
                  stateName: 'assesseeAssessmentStartData',
                  value: assesseeAssignmentAssessmentData?.informationFramework?.assessmentSection[lastIndexValue - 1]
                }
              })
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
                payload: { stateName: 'isAssessmentStart', value: 'PROGRESS' }
              });
            }
          }
        }
        if (currentSequenceIndex < sequenceObject.length) {
          if (sequenceObject[currentSequenceIndex]?.name === 'assessment section') {
          }
          if (sequenceObject[currentSequenceIndex]?.name === 'assessment communiqué') {
            dispatch({
              type: SET_ASSESSEE_ASSESSMENT_COMMUNIQUE_STATE,
              payload: sequenceObject[currentSequenceIndex]?.value
            })
          }
          if (sequenceObject[currentSequenceIndex]?.name === 'assessment synopsis') {
            dispatch({
              type: SET_ASSESSEE_ASSESSMENT_SYNOPSIS_STATE,
              payload: sequenceObject[currentSequenceIndex]?.value
            })
          }
          if (sequenceObject[currentSequenceIndex]?.name === 'assessment manuscript') {
            dispatch({
              type: SET_ASSESSEE_ASSESSMENT_MENUSCRIPT_STATE,
              payload: sequenceObject[currentSequenceIndex]?.value
            })
          }
          if (sequenceObject[currentSequenceIndex]?.name === 'section communiqué') {
            dispatch({
              type: SET_ASSESSEE_ASSESSMENT_SECTION_COMMUNIQUE_STATE,
              payload: sequenceObject[currentSequenceIndex]?.value
            })
          }
          if (sequenceObject[currentSequenceIndex]?.name === 'section synopsis') {
            dispatch({
              type: SET_ASSESSEE_ASSESSMENT_SECTION_SYNOPSIS_STATE,
              payload: sequenceObject[currentSequenceIndex]?.value
            })
          }
          if (sequenceObject[currentSequenceIndex]?.name === 'section manuscript') {
            dispatch({
              type: SET_ASSESSEE_ASSESSMENT_SECTION_MENUSCRIPT_STATE,
              payload: sequenceObject[currentSequenceIndex]?.value
            })
          }
          callApiFunctionLastAttempted(
            selectedAssociateInfo,
            assesseeAssignmentAssessmentData,
            dispatch,
            sequenceObject[currentSequenceIndex]?.originalValue
          )
        }
      }
      if (clickedval === 'previous') {
        if (currentSequenceIndex != 0) {
          dispatch({
            type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
            payload: { stateName: 'currentSequenceIndex', value: currentSequenceIndex - 1 }
          })
        }
      }
    }
    if (isAssessmentStart === 'ReviewListStart') {
      if (clickedval === 'next') {
        if (indexPointer < assignmentsequenceObject.length - 1) {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer + 1 }
          });
        } else {
          dispatch({
            type: SET_MIDDLEPANE_STATE,
            payload: {
              middlePaneHeader: 'assessments',
              middlePaneHeaderBadgeOne: 'active',
              middlePaneHeaderBadgeTwo: '',
              middlePaneHeaderBadgeThree: '',
              middlePaneHeaderBadgeFour: '',
              typeOfMiddlePaneList: 'assesseesAssginmentAssessmentReviewList',
              //scanCount: assessmentList[0].assesseeAssignmentAssessmentDistinct.length,
              showMiddlePaneState: true
            }
          });

          dispatch({
            type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
            payload: { stateName: 'isAssessmentStart', value: 'ReviewListResume' }
          });
        }
      }
      if (clickedval === 'previous') {
        if (indexPointer != 0) {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'indexPointer', value: indexPointer - 1 }
          });
        }
      }
    }
  };
  console.log('sequenceObject', assessmentsequenceObject);
  console.log('assesseeAssignmentAssessmentData', assesseeAssignmentAssessmentData);
  console.log('current isAssessmentStart value', isAssessmentStart);

  //let headerNew = assessmentsequenceObject[currentSequenceIndex]?.name;
  //console.log('current Value', headerNew);
  return (
    <>
      <div>
        <DisplayPaneSixHeader
          className=""
          headerOne={isAssessmentStart === 'ReviewListStart' ||
            isAssessmentStart === 'ASSIGNMENTCOMMUNIQUE' ||
            isAssessmentStart === 'ASSIGNMENTSYNOPSIS' ||
            isAssessmentStart === 'ASSIGNMENTMENUSCRIPT'
            ? 'assignment' : 'assessment'}
          //headerOneBadgeOne={headerValue}
          headerOneBadgeOne={isAssessmentStart === 'START' || isAssessmentStart === 'STOP' ?
            assessmentsequenceObject[currentSequenceIndex]?.name === 'assessment communiqué' ? 'communiqué' :
              assessmentsequenceObject[currentSequenceIndex]?.name === 'assessment manuscript' ? 'manuscript' :
                assessmentsequenceObject[currentSequenceIndex]?.name === 'assessment synopsis' ? 'synopsis' :
                  assessmentsequenceObject[currentSequenceIndex]?.name === 'section communiqué' ? 'section' :
                    assessmentsequenceObject[currentSequenceIndex]?.name === 'section manuscript' ? 'section' :
                      assessmentsequenceObject[currentSequenceIndex]?.name === 'section synopsis' ? 'section' : ''
            :
            isAssessmentStart === 'COMMUNIQUE' ? 'communique' :
              isAssessmentStart === 'SYNOPSIS' ? 'synopsis' :
                isAssessmentStart === 'MENUSCRIPT' ? 'menuscript'
                  : ''}
          headerOneBadgeTwo={
            assessmentsequenceObject[currentSequenceIndex]?.name === 'section communiqué' ? 'communiqué' :
              assessmentsequenceObject[currentSequenceIndex]?.name === 'section manuscript' ? 'menuscript' :
                assessmentsequenceObject[currentSequenceIndex]?.name === 'section synopsis' ? 'synopsis' : ''
          }
          headerPanelColour="blue"
        />
      </div>
      <div className="containerPadding">
        {isDisplayPaneSixShow && (
          <>
            <div className="containerPadding">
            </div>
            <div className="containerPadding">
              <div
                style={{
                  padding: '2.5px 5px',
                  alignItems: 'center',
                  height: 'calc(100vh - 190px)',
                  overflow: 'overlay'
                }}
              >{isAssessmentStart === 'ReviewListStart' ? (
                <DisplayPaneSixAssignment assignmentsequenceObject={assignmentsequenceObject.length > 0 ? assignmentsequenceObject[indexPointer].value : []} />
              ) : (
                <EditorTemplate
                  label={'itemLabel'}
                  jsonData={
                    isAssessmentStart === 'START' || isAssessmentStart === 'STOP' ?
                      assessmentsequenceObject && assessmentsequenceObject[currentSequenceIndex]?.value
                      // currentSequenceValue === '' ?
                      // assessmentsequenceObject[currentSequenceIndex]?.name !== 'assessment section' ?
                      //   assessmentsequenceObject[currentSequenceIndex]?.value : '' : '' 
                      :
                      isAssessmentStart === 'SYNOPSIS' ? synopsis[indexPointer] :
                        isAssessmentStart === 'COMMUNIQUE' ? communique[indexPointer] :
                          isAssessmentStart === 'MENUSCRIPT' ? menuscript[indexPointer] :
                            isAssessmentStart === 'ASSIGNMENTSYNOPSIS' ? assignmentSynopsis[indexPointer] :
                              isAssessmentStart === 'ASSIGNMENTCOMMUNIQUE' ? assignmentCommunique[indexPointer] :
                                isAssessmentStart === 'ASSIGNMENTMENUSCRIPT' ? assignmentManuscript[indexPointer] :

                                  ''
                  }
                />
              )}

                {/* <EditorTemplate
                //   label={'itemLabel'}
                //   jsonData={initialValue
                //     //currentSequenceValue
                //     // isAssessmentStart === 'START'
                //     //   ? assesseeAssignmentAssessmentData.informationFramework
                //     //     .assessmentCommunique[0]
                //     //   : isAssessmentStart === 'FINISH'
                //     //     ? assesseeAssignmentAssessmentData.informationFramework
                //     //       .assessmentCommunique[0]
                //     //     : isAssessmentStart === 'MANUSCRIPT'
                //     //       ? assesseeAssignmentAssessmentData.informationFramework
                //     //         .assessmentManuscript[0]
                //     //       : ''
                //   }
                // /> */}
              </div>
            </div>

            {
              isAssessmentStart === 'COMMUNIQUE' || isAssessmentStart === 'SYNOPSIS' || isAssessmentStart === 'MENUSCRIPT' ||
                isAssessmentStart === 'ASSIGNMENTCOMMUNIQUE' || isAssessmentStart === 'ASSIGNMENTSYNOPSIS' || isAssessmentStart === 'ASSIGNMENTMENUSCRIPT'
                ? (
                  <FooterIconTwo
                    FilterModeEnable={false}
                    FilterMode={FilterMode}
                    onClick={onClickFooter}
                    backColour={'displayPaneLeft'}
                    primaryIcon={[]}
                    secondaryIcon={[
                      {
                        label: 'previous', onClick: onClickFooter, Icon: ArrowLeft,
                        // disabled: 'true'
                      },
                      { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
                      { label: 'close', onClick: onClickFooter, Icon: CrossIcon }
                    ]}
                  />

                ) : (
                  <FooterIconTwo
                    FilterModeEnable={false}
                    FilterMode={FilterMode}
                    onClick={onClickFooter}
                    backColour={'displayPaneLeft'}
                    primaryIcon={[]}
                    secondaryIcon={[
                      {
                        label: 'previous', onClick: onClickFooter, Icon: ArrowLeft,
                        // disabled: 'true'
                      },
                      { label: 'next', onClick: onClickFooter, Icon: ArrowRight },

                    ]}
                  />

                )

            }


            {isAssessmentStart === 'START' || isAssessmentStart === 'MANUSCRIPT' ? (
              <div>

              </div>
              // <FooterIconTwo
              //   FilterModeEnable={false}
              //   FilterMode={FilterMode}
              //   onClick={onClickFooter}
              //   backColour={'displayPaneLeft'}
              //   primaryIcon={[]}
              //   secondaryIcon={[
              //     { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft, disabled: 'true' },
              //     { label: 'next', onClick: onClickFooter, Icon: ArrowRight }
              //   ]}
              // />
            ) : isAssessmentStart === 'FINISH' ? (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickFooter}
                backColour={'displayPaneLeft'}
                primaryIcon={[{ label: 'close', onClick: onClickFooter, Icon: CrossIcon }]}
                secondaryIcon={[]}
              />) :
              // ) : asssignmentStarted === 'PROGRESS' ? (
              //   <FooterIconOne/>
              // ) :
              null}
            {/* <DisplayPaneSixFooter /> */}

          </>
        )}
      </div>
    </>
  );
};

export const DisplayPaneSixAssignment = (props) => {
  const { assignmentsequenceObject } = props;
  return (
    <>
      <EditorTemplate
        label={'itemLabel'}
        jsonData={assignmentsequenceObject && assignmentsequenceObject || ''}
      />
    </>
  )
}

export default DisplayPaneSix;
