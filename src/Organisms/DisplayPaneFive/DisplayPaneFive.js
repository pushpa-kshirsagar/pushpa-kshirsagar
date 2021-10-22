import React, { useEffect, useState } from 'react';
import './DisplayPaneFive.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOADER_START,
  NAVIGATOR_MODE,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  SET_MOBILE_PANE_STATE,
  SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE,
  SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
  ASSESSMENT_INFO_PREVIEW_SAGA,
  SET_PANE_THREE_ASSESSMENT_SECTION_PREVIEW_MODE,
  SET_ASSESSMENT_SECTION_DYNAMIC_FRAMEWORK_STATE
} from '../../actionType';
import '../../Molecules/ReviewList/ReviewList.css';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import NavigatorIcon from '@material-ui/icons/OpenWith';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DisplayPaneFiveItem from '../../Organisms/DisplayPaneFive/DisplayPaneFiveItem';
import DisplayPaneFiveAssessment from '../../Organisms/DisplayPaneFive/DisplayPaneFiveAssessment';
import { setItemTypeConfigState } from '../../Actions/GenericActions';
export const DisplayPaneFive = () => {
  const dispatch = useDispatch();
  const [currentItemIndex, setcurrentItemIndex] = useState(0);
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const [currentSectionIndex, setcurrentSectionIndex] = useState(0);
  const {
    typeOfMiddlePaneList,
    selectedAssociateInfo,
    reviewListDistinctData,
    reviewListReqObj,
    numberPage,
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    scanCount
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const {
    headerOne,
    headerOneBadgeOne,
    isAssessmentPreviewShow = false,
    isItemPreviewShow = false,
    reviewMode,
    createMode,
    headerOneBadgeTwo,
    responseObject,
    isAssessmentSectionShow = false
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { informationFramework, isDisplayPaneSixShow } = useSelector(
    (state) => state.AssessmentReducer
  );
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const { FilterMode, navigatorIcon } = useSelector((state) => state.FilterReducer);
  const { sectionInformation } = useSelector((state) => state.SectionCreateReducer);
  console.log('sectionInformationReducerObejct', sectionInformation);
  const closePreview = () => {
    if (isAssessmentSectionShow) {
      dispatch({ type: SET_PANE_THREE_ASSESSMENT_SECTION_PREVIEW_MODE, payload: false });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    } else if (isAssessmentPreviewShow) {
      dispatch({ type: SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE, payload: false });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    }
  };
  const onClickFooter = (e) => {
    let clickedval = e.currentTarget.getAttribute('data-value');
    dispatch({ type: NAVIGATOR_MODE });
    if (isAssessmentPreviewShow) {
      if (clickedval === 'previous') {
        let prevIndex = currentItemIndex - 1;
        if (currentItemIndex !== 0) {
          setcurrentItemIndex(prevIndex);
          setItemTypeConfigState(
            responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
              ?.assessmentSectionItemDistinct[prevIndex].itemFrameworkOne.itemFrameworkOneType,
            dispatch
          );
          dispatch({
            type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
            payload: {
              stateName: 'assessmentSectionItemDistinctRevise',
              value:
                responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
                  ?.assessmentSectionItemDistinct[prevIndex]
            }
          });
        } else {
          if (currentSectionIndex !== 0) {
            setcurrentSectionIndex(currentSectionIndex - 1);
            setcurrentItemIndex(
              responseObject?.informationFramework?.assessmentSection[currentSectionIndex - 1]
                ?.assessmentSectionItemDistinct.length - 1
            );
            setItemTypeConfigState(
              responseObject?.informationFramework?.assessmentSection[currentSectionIndex - 1]
                ?.assessmentSectionItemDistinct[
                responseObject?.informationFramework?.assessmentSection[currentSectionIndex - 1]
                  ?.assessmentSectionItemDistinct.length - 1
              ].itemFrameworkOne.itemFrameworkOneType,
              dispatch
            );
            dispatch({
              type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
              payload: {
                stateName: 'assessmentSectionItemDistinctRevise',
                value:
                  responseObject?.informationFramework?.assessmentSection[currentSectionIndex - 1]
                    ?.assessmentSectionItemDistinct[
                    responseObject?.informationFramework?.assessmentSection[currentSectionIndex - 1]
                      ?.assessmentSectionItemDistinct.length - 1
                  ]
              }
            });
          }
          // if (currentSectionIndex === informationFramework?.assessmentSection.length - 1) {
          //   setcurrentSectionIndex(currentSectionIndex - 1);
          //   setcurrentItemIndex(informationFramework.assessmentSection[currentSectionIndex - 1]?.assessmentSectionItemDistinct.length - 1);
          //   //informationFramework.assessmentSection[currentSectionIndex]?.assessmentSectionItemDistinct.length - 1
          // }
        }
      }
      if (clickedval === 'first') {
        if (currentItemIndex !== 0) {
          setcurrentSectionIndex(currentSectionIndex);
          setcurrentItemIndex(0);
          setItemTypeConfigState(
            responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
              ?.assessmentSectionItemDistinct[0].itemFrameworkOne.itemFrameworkOneType,
            dispatch
          );
          dispatch({
            type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
            payload: {
              stateName: 'assessmentSectionItemDistinctRevise',
              value:
                responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
                  ?.assessmentSectionItemDistinct[0]
            }
          });
        } else {
          if (currentSectionIndex !== 0) {
            setcurrentSectionIndex(currentSectionIndex - 1);
            setcurrentItemIndex(0);
            setItemTypeConfigState(
              responseObject?.informationFramework?.assessmentSection[currentSectionIndex - 1]
                ?.assessmentSectionItemDistinct[0].itemFrameworkOne.itemFrameworkOneType,
              dispatch
            );
            dispatch({
              type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
              payload: {
                stateName: 'assessmentSectionItemDistinctRevise',
                value:
                  responseObject?.informationFramework?.assessmentSection[currentSectionIndex - 1]
                    ?.assessmentSectionItemDistinct[0]
              }
            });
          }
        }
      }
      if (clickedval === 'next') {
        if (
          currentItemIndex <
          responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
            ?.assessmentSectionItemDistinct.length -
            1
        ) {
          setcurrentItemIndex(currentItemIndex + 1);
          setItemTypeConfigState(
            responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
              ?.assessmentSectionItemDistinct[currentItemIndex + 1].itemFrameworkOne
              .itemFrameworkOneType,
            dispatch
          );

          dispatch({
            type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
            payload: {
              stateName: 'assessmentSectionItemDistinctRevise',
              value:
                responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
                  ?.assessmentSectionItemDistinct[currentItemIndex + 1]
            }
          });
        } else {
          if (
            currentSectionIndex <
            responseObject?.informationFramework?.assessmentSection.length - 1
          ) {
            setcurrentSectionIndex(currentSectionIndex + 1);
            setcurrentItemIndex(0);
            dispatch({
              type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
              payload: {
                stateName: 'assessmentSectionItemDistinctRevise',
                value:
                  responseObject?.informationFramework?.assessmentSection[currentSectionIndex + 1]
                    ?.assessmentSectionItemDistinct[0]
              }
            });
          }
        }
      }
      if (clickedval === 'last') {
        if (
          currentItemIndex <
          responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
            ?.assessmentSectionItemDistinct.length -
            1
        ) {
          let lastIndex =
            responseObject?.informationFramework.assessmentSection[currentSectionIndex]
              ?.assessmentSectionItemDistinct.length - 1;
          setcurrentItemIndex(lastIndex);
          setItemTypeConfigState(
            responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
              ?.assessmentSectionItemDistinct[lastIndex].itemFrameworkOne.itemFrameworkOneType,
            dispatch
          );
          dispatch({
            type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
            payload: {
              stateName: 'assessmentSectionItemDistinctRevise',
              value:
                responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
                  ?.assessmentSectionItemDistinct[lastIndex]
            }
          });
        } else {
          if (
            currentSectionIndex <
            responseObject?.informationFramework?.assessmentSection.length - 1
          ) {
            setcurrentSectionIndex(currentSectionIndex + 1);
            let lastIndex =
              responseObject?.informationFramework.assessmentSection[currentSectionIndex + 1]
                ?.assessmentSectionItemDistinct.length - 1;
            setcurrentItemIndex(lastIndex);
            setItemTypeConfigState(
              responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
                ?.assessmentSectionItemDistinct[lastIndex].itemFrameworkOne.itemFrameworkOneType,
              dispatch
            );
            dispatch({
              type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
              payload: {
                stateName: 'assessmentSectionItemDistinctRevise',
                value:
                  responseObject?.informationFramework?.assessmentSection[currentSectionIndex + 1]
                    ?.assessmentSectionItemDistinct[lastIndex]
              }
            });
          }
        }
      }
    } else if (isAssessmentSectionShow) {
      if (clickedval === 'first') {
        setcurrentItemIndex(0);
        setItemTypeConfigState(
          responseObject?.assessmentSectionItemDistinct[0]?.itemFrameworkOne.itemFrameworkOneType,
          dispatch
        );
        dispatch({
          type: SET_ASSESSMENT_SECTION_DYNAMIC_FRAMEWORK_STATE,
          payload: {
            stateName: 'assessmentSectionItemDistinctReviseObject',
            value: responseObject?.assessmentSectionItemDistinct[0]
          }
        });
      }
      if (clickedval === 'previous') {
        let prevIndex = currentItemIndex - 1;
        if (currentItemIndex != 0) {
          setcurrentItemIndex(prevIndex);
          setItemTypeConfigState(
            responseObject?.assessmentSectionItemDistinct[prevIndex]?.itemFrameworkOne
              .itemFrameworkOneType,
            dispatch
          );
          dispatch({
            type: SET_ASSESSMENT_SECTION_DYNAMIC_FRAMEWORK_STATE,
            payload: {
              stateName: 'assessmentSectionItemDistinctReviseObject',
              value: responseObject?.assessmentSectionItemDistinct[prevIndex]
            }
          });
        }
      }
      if (clickedval === 'next') {
        if (currentItemIndex < responseObject.assessmentSectionItemDistinct.length - 1) {
          setcurrentItemIndex(currentItemIndex + 1);
          setItemTypeConfigState(
            responseObject?.assessmentSectionItemDistinct[currentItemIndex + 1]?.itemFrameworkOne
              .itemFrameworkOneType,
            dispatch
          );
          dispatch({
            type: SET_ASSESSMENT_SECTION_DYNAMIC_FRAMEWORK_STATE,
            payload: {
              stateName: 'assessmentSectionItemDistinctReviseObject',
              value: responseObject?.assessmentSectionItemDistinct[currentItemIndex + 1]
            }
          });
        }
      }
      if (clickedval === 'last') {
        if (currentItemIndex < responseObject.assessmentSectionItemDistinct.length - 1) {
          let lastIndex = responseObject.assessmentSectionItemDistinct.length - 1;
          setcurrentItemIndex(lastIndex);
          setItemTypeConfigState(
            responseObject?.assessmentSectionItemDistinct[lastIndex]?.itemFrameworkOne
              .itemFrameworkOneType,
            dispatch
          );
          dispatch({
            type: SET_ASSESSMENT_SECTION_DYNAMIC_FRAMEWORK_STATE,
            payload: {
              stateName: 'assessmentSectionItemDistinctReviseObject',
              value: responseObject?.assessmentSectionItemDistinct[lastIndex]
            }
          });
        }
      }
    } else {
    }
  };
  const onClickReviseFinish = () => {
    setIsShowReviseIcon(true);
    if (isAssessmentSectionShow) {
      //dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: 'review' });
      let itemDistinctReviseObj = sectionInformation?.assessmentSectionItemFrameworkOneDistinct;
      itemDistinctReviseObj[currentItemIndex].itemFrameworkOne =
        sectionInformation?.assessmentSectionItemDistinctReviseObject?.itemFrameworkOne;
      dispatch({
        type: SET_ASSESSMENT_SECTION_DYNAMIC_FRAMEWORK_STATE,
        payload: {
          stateName: 'assessmentSectionItemFrameworkOneDistinct',
          value: itemDistinctReviseObj
        }
      });
    } else {
      dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: 'review' });
      //const { informationFramework } = informationFramework;
      const { id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assessment: {
          id: id,
          informationFramework: {
            assessmentSection: [
              {
                sectionIndex: currentSectionIndex,
                assessmentSectionItemFrameworkOneDistinct: [
                  informationFramework?.assessmentSectionItemDistinctRevise
                ]
              }
            ]
          }
        }
      };
      console.log('ASSESSMENT REVISE ===', reqBody);
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSESSMENT_INFO_PREVIEW_SAGA,
        payload: {
          secondaryOptionCheckValue: headerOneBadgeTwo,
          headerOne: 'assessment',
          reqBody,
          createMode
        }
      });
    }
  };
  const onClickRevise = () => {
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    //setResponseToReducerObj(JSON.parse(originResponseObj), dispatch);
    setIsShowReviseIcon(true);
    dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: 'review' });
  };
  const revisePrimaryIcon = [{ label: 'revise', onClick: onClickRevise, Icon: ReviseIcon }];
  const reviseSecondaryIcons = [
    { label: 'cancel', onClick: onClickReviseCancel, Icon: ClearIcon },
    { label: 'finish', onClick: onClickReviseFinish, Icon: Check }
  ];
  const primaryIcon = [{ label: 'navigator', onClick: onClickFooter, Icon: NavigatorIcon }];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  //let itemObect = informationFramework?.informationFramework?.itemFrameworkOne?.assessmentItem[currentItemIndex];
  //  let itemObect =informationFramework?.assessmentSection[0]?.assessmentSectionItemDistinct[currentItemIndex].itemFrameworkOne;
  //informationFramework?.assessmentItem[currentItemIndex].informationFramework?.itemFrameworkOne;
  //console.log("itemObect", itemObect);
  //const itemInformation=informationFramework?.assessmentSection[currentItemIndex]?.assessmentSectionItemDistinct[currentItemIndex]

  var itemObect = isAssessmentSectionShow
    ? responseObject?.assessmentSectionItemDistinct[currentItemIndex]?.itemFrameworkOne
    : isAssessmentPreviewShow
    ? responseObject?.informationFramework?.assessmentSection[currentSectionIndex]
        ?.assessmentSectionItemDistinct[currentItemIndex]?.itemFrameworkOne
    : '';
  console.log('itemObect', itemObect);

  return (
    <>
      <div>
        {isAssessmentPreviewShow ? (
          <>
            <DisplayPaneFiveAssessment
              headerOne={headerOne}
              closePreview={closePreview}
              informationFramework={responseObject?.informationFramework}
              currentItemIndex={currentItemIndex}
              currentSectionIndex={currentSectionIndex}
              itemObect={itemObect}
            />
            {reviewMode === 'revise' ? (
              <FooterIconTwo
                className={'widthDisplayPaneFive'}
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
                isAssessmentPreviewShow={isAssessmentPreviewShow}
              />
            ) : (
              <FooterIconTwo
                className={isDisplayPaneSixShow ? 'widthDisplayPaneFive' : 'fullWidth'}
                FilterModeEnable={navigatorIcon}
                FilterMode={FilterMode}
                onClick={onClickFooter}
                primaryIcon={primaryIcon}
                secondaryIcon={secondaryIcon}
                isAssessmentPreviewShow={isAssessmentPreviewShow}
              />
            )}
          </>
        ) : isAssessmentSectionShow ? (
          <>
            <DisplayPaneFiveAssessment
              headerOne={headerOne}
              closePreview={closePreview}
              informationFramework={responseObject}
              currentItemIndex={currentItemIndex}
              currentSectionIndex={currentSectionIndex}
              itemObect={itemObect}
            />
            {reviewMode === 'revise' ? (
              <FooterIconTwo
                className={'widthDisplayPaneFive'}
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
                isAssessmentPreviewShow={true}
              />
            ) : (
              <FooterIconTwo
                className={isDisplayPaneSixShow ? 'widthDisplayPaneFive' : 'fullWidth'}
                FilterModeEnable={navigatorIcon}
                FilterMode={FilterMode}
                onClick={onClickFooter}
                primaryIcon={primaryIcon}
                secondaryIcon={secondaryIcon}
                isAssessmentPreviewShow={true}
              />
            )}
          </>
        ) : isItemPreviewShow ? (
          <DisplayPaneFiveItem />
        ) : null}
      </div>
    </>
  );
};

export default DisplayPaneFive;
