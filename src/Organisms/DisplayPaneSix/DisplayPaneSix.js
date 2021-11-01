import React, { useEffect, useState } from 'react';
import CrossIcon from '@material-ui/icons/Clear';
import './DisplayPaneSix.css';
import Card from '../../Molecules/Card/Card';
import DisplayPaneSixFooter from './DisplayPaneSixFooter';
import DisplayPaneSixHeader from './DisplayPaneSixHeader';
import { useDispatch, useSelector } from 'react-redux';
import { assesseeRole } from '../../Actions/AssesseeModuleAction';
import { Keyboard, Description, InsertDriveFile, BusinessCenter, IndeterminateCheckBox } from '@material-ui/icons';
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
  SET_DISPLAY_TWO_SINGLE_STATE
} from '../../actionType';
import { RES_START_POPUP_OPTION, ASSESSMENT_CLOSED_POPUP_OPTION } from '../../PopUpConfig';
import EditorTemplate from '../DisplayPaneFive/EditorTemplate';
import FooterIconOne from '../../Molecules/FooterIcon/FooterIconOne';


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
    synopsis, communique, menuscript

  } = useSelector((state) => state.AssesseeAssignmentAssessmentReducer);
  const { indexPointer
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { selectedTagStatus } = useSelector((state) => state.PopUpReducer);
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();
  const [currentSequenceValue, setCurrentSequenceValue] = useState('');
  const [headerValue, setHeader] = useState('');
  const [sequenceObject, setSequenceObject] = useState([]);
  const [currentSequenceIndexLocal, setCurrentSequenceIndexLocal] = useState(0);

  useEffect(() => {
    debugger;
    console.log('asssignmentStarted print', asssignmentStarted);
    //setCurrentSequenceIndexLocal(currentSequenceIndex);
    //setInitialSequenceDetails();
    handleSequenceArrange();
  }, [assesseeAssignmentAssessmentData]);

  // useEffect(() => {
  //   setNextSequenceValues('');
  // }, [currentSequenceIndex])
  //working code


  // useEffect(() => {
  //   debugger;
  //   setNextSequenceValues();
  // }, [currentSequenceIndex])
  // const setSequence = () => {
  //   debugger;
  //   let assessmentAdministrationSequence = assesseeAssignmentAssessmentData?.informationFramework?.assessmentAdministrationSequence || [];
  //   let setSequenceObject = [];
  //   // if (assessmentAdministrationSequence.length > 0) {
  //   //   setSequenceObject.push(...assessmentAdministrationSequence);
  //   //   //setSequenceObject(setSequenceObject)
  //   // }
  //   let informationFramework = assesseeAssignmentAssessmentData?.informationFramework;
  //   for (let i = 0; i < assessmentAdministrationSequence.length; i++) {
  //     let currentValue = informationFramework?.assessmentAdministrationSequence[i];
  //     let lastIndexValue = parseInt(currentValue.substring(currentValue.length - 1));
  //     let matchValue = currentValue;
  //     matchValue = matchValue.substring(0, matchValue.length - 1);
  //     if (matchValue.trim() === 'assessment section') {
  //       let assessmentSection = informationFramework?.assessmentSection || [];
  //       let sectionObj = assessmentSection[lastIndexValue - 1];
  //       if (sectionObj?.assessmentSectionAdministrationSequence.length > 0) {
  //         for (let j = 0; j < sectionObj?.assessmentSectionAdministrationSequence.length; j++) {
  //           let currentSectionSequenceValue = sectionObj?.assessmentSectionAdministrationSequence[j];
  //           setSequenceObject.push(currentSectionSequenceValue);
  //         }
  //         setSequenceObject.push(sectionObj?.assessmentSectionItemDistinct);
  //       } else {
  //         setSequenceObject.push(sectionObj?.assessmentSectionItemDistinct)
  //       }
  //     } else {
  //       setSequenceObject.push(currentValue);
  //     }
  //   }
  //   console.log(setSequenceObject);
  //   setSequenceObject(setSequenceObject);
  // }

  const handleSequenceArrange = () => {
    debugger;
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

  const setNextSequenceValues = (value) => {
    debugger;
    let sequenceObject = assessmentsequenceObject;
    if (isAssessmentStart === 'COMMUNIQUE') {
      if (indexPointer < communique.length) {
        setCurrentSequenceValue(communique[indexPointer]);
      }
    }
    if (isAssessmentStart === 'MENUSCRIPT') {
      if (indexPointer < menuscript.length) {
        setCurrentSequenceValue(menuscript[indexPointer]);
      }
    }
    if (isAssessmentStart === 'SYNOPSIS') {
      if (indexPointer < synopsis.length) {
        setCurrentSequenceValue(synopsis[indexPointer]);
      }
    }
    if (isAssessmentStart === 'START' || isAssessmentStart === 'STOP') {
      if (sequenceObject.length > 0) {
        if (currentSequenceIndex < sequenceObject.length) {
          let currentValue = sequenceObject[currentSequenceIndex]?.originalValue;
          let lastIndexValue = parseInt(currentValue.substring(currentValue.length - 1));
          if (sequenceObject[currentSequenceIndex]?.name === 'assessment section') {
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
                  selectedTagValue: lastIndexValue
                }
              });
              dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
            } else {
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
                payload: {
                  stateName: 'assesseeAssessmentStartData',
                  value: assesseeAssignmentAssessmentData?.informationFramework
                }
              })
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
                payload: { stateName: 'isAssessmentStart', value: 'PROGRESS' }
              });
            }
          } else {
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
                type: SET_ASSESSEE_ASSESSMENT_COMMUNIQUE_STATE,
                payload: sequenceObject[currentSequenceIndex]?.value
              })
            }
            if (sequenceObject[currentSequenceIndex]?.name === 'section synopsis') {
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_SYNOPSIS_STATE,
                payload: sequenceObject[currentSequenceIndex]?.value
              })
            }
            if (sequenceObject[currentSequenceIndex]?.name === 'section manuscript') {
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_MENUSCRIPT_STATE,
                payload: sequenceObject[currentSequenceIndex]?.value
              })
            }
          }
        }
      }
    }

  }
  const onClickFooter = (e) => {
    debugger;
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
    if (selectedTagStatus === 'UNSTARTED') {
      tempArr = [{ ...tempArr[0], disabled: true }, tempArr[1]];
    }
    // if (clickedval === 'next') {

    //   console.log('assesseeAssessmentStartData', assesseeAssessmentStartData);
    //   if (
    //     assesseeAssignmentAssessmentData.informationFramework.assessmentManuscript
    //       .assessmentManuscriptPrimary &&
    //     isAssessmentStart !== 'MANUSCRIPT'
    //   ) {
    //     dispatch({
    //       type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
    //       payload: { stateName: 'isAssessmentStart', value: 'MANUSCRIPT' }
    //     });
    //   } else {
    //     // dispatch({
    //     //   type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
    //     //   payload: { stateName: 'isAssessmentStart', value: '' }
    //     // });
    //     dispatch({
    //       type: SET_POPUP_STATE,
    //       payload: {
    //         popupHeaderOne: 'assessment',
    //         popupHeaderOneBadgeOne: '',
    //         popupHeaderOneBadgeTwo: '',
    //         isPopUpValue: '',
    //         popupOpenType: 'primary',
    //         popupContentArrValue: tempArr,
    //         selectedTagValue: e.currentTarget.getAttribute('assignmentid'),
    //         selectedTagStatus: selectedTagStatus
    //       }
    //     });
    //     dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
    //   }
    // }
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
                  selectedTagValue: lastIndexValue
                }
              });
              dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
            } else {
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
                payload: {
                  stateName: 'assesseeAssessmentStartData',
                  value: assesseeAssignmentAssessmentData?.informationFramework
                }
              })
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
                payload: { stateName: 'isAssessmentStart', value: 'PROGRESS' }
              });
            }
          } else {
            if (sequenceObject[currentSequenceIndex + 1]?.name === 'assessment communiqué') {
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_COMMUNIQUE_STATE,
                payload: sequenceObject[currentSequenceIndex + 1]?.value
              })
            }
            if (sequenceObject[currentSequenceIndex + 1]?.name === 'assessment synopsis') {
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_SYNOPSIS_STATE,
                payload: sequenceObject[currentSequenceIndex + 1]?.value
              })
            }
            if (sequenceObject[currentSequenceIndex + 1]?.name === 'assessment manuscript') {
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_MENUSCRIPT_STATE,
                payload: sequenceObject[currentSequenceIndex + 1]?.value
              })
            }
            if (sequenceObject[currentSequenceIndex + 1]?.name === 'section communiqué') {
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_COMMUNIQUE_STATE,
                payload: sequenceObject[currentSequenceIndex + 1]?.value
              })
            }
            if (sequenceObject[currentSequenceIndex + 1]?.name === 'section synopsis') {
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_SYNOPSIS_STATE,
                payload: sequenceObject[currentSequenceIndex + 1]?.value
              })
            }
            if (sequenceObject[currentSequenceIndex + 1]?.name === 'section manuscript') {
              dispatch({
                type: SET_ASSESSEE_ASSESSMENT_MENUSCRIPT_STATE,
                payload: sequenceObject[currentSequenceIndex + 1]?.value
              })
            }
          }
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
  };
  console.log('sequenceObject', assessmentsequenceObject);
  console.log('assesseeAssignmentAssessmentData', assesseeAssignmentAssessmentData);
  console.log('current isAssessmentStart value', isAssessmentStart);


  //let initialValue = assessmentsequenceObject[currentSequenceIndex]?.name !== 'assessment section' ? assessmentsequenceObject[currentSequenceIndex]?.value : '';
  //console.log('current Value', initialValue);
  let headerNew = assessmentsequenceObject[currentSequenceIndex]?.name;
  console.log('current Value', headerNew);
  return (
    <>
      <div>
        <DisplayPaneSixHeader
          className=""
          headerOne={'assessment'}
          //headerOneBadgeOne={isAssessmentStart === 'MANUSCRIPT' ? 'manuscript' : 'communiqué'}
          //headerOneBadgeOne={headerValue}
          headerOneBadgeOne={isAssessmentStart === 'START' || isAssessmentStart === 'STOP' ? assessmentsequenceObject[currentSequenceIndex]?.name :
            isAssessmentStart === 'COMMUNIQUE' ? 'communique' :
              isAssessmentStart === 'SYNOPSIS' ? 'synopsis' :
                isAssessmentStart === 'MENUSCRIPT' ? 'menuscript'
                  : ''}
          headerOneBadgeTwo={''}
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
              >
                <EditorTemplate
                  label={'itemLabel'}
                  jsonData={
                    isAssessmentStart === 'START' || isAssessmentStart === 'STOP' ?
                      assessmentsequenceObject[currentSequenceIndex]?.value
                      // currentSequenceValue === '' ?
                      // assessmentsequenceObject[currentSequenceIndex]?.name !== 'assessment section' ?
                      //   assessmentsequenceObject[currentSequenceIndex]?.value : '' : '' 
                      :
                      isAssessmentStart === 'SYNOPSIS' ? synopsis[indexPointer] :
                        isAssessmentStart === 'COMMUNIQUE' ? communique[indexPointer] :
                          isAssessmentStart === 'MENUSCRIPT' ? menuscript[indexPointer]
                            : ''
                  }
                />
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
              isAssessmentStart === 'COMMUNIQUE' || isAssessmentStart === 'SYNOPSIS' || isAssessmentStart === 'MENUSCRIPT' ? (
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

export default DisplayPaneSix;
