import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE_ENABLE,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_STATE
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import {
  ASSESSEE_ASSIGNMENT_REVIEW_LIST_POPUP_OPTION,
  ASSESSEE_ASSIGNMENT_TRIPLE_POPUP_OPTION,
  RES_START_POPUP_OPTION
} from '../PopUpConfig';
import Card from '../Molecules/Card/Card';
import CrossIcon from '@material-ui/icons/Clear';

const AssesseeDistinctAssessmentDistinctReviewList = (props) => {
  const dispatch = useDispatch();
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const { countPage } = useSelector((state) => state.AssesseeCreateReducer);
  const {
    middlePaneSelectedValue,
    reviewListDistinctData,
    selectedAssociateInfo,
    relatedReviewListDistinctData,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    typeOfMiddlePaneList,
    selectedTagsArray,
    unselectedTagsArray,
    isSelectActive
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);

  const closeRelatedList = () => {
    dispatch({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'assignments',
        middlePaneHeaderBadgeOne: 'active',
        middlePaneHeaderBadgeTwo: '',
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'assesseeAssignmentDistinctReviewList',
        scanCount: reviewListDistinctData.length,
        showMiddlePaneState: true
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'relatedReviewListDistinctData', value: [] }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const listDistinctData = relatedReviewListDistinctData[0];

  const siftApiCall = (siftKey) => {
    document.getElementById('middleComponentId').scrollTop = '0px';
  };
  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    if (
      siftValue === 'suspended' ||
      siftValue === 'terminated' ||
      siftValue === 'disapproved' ||
      siftValue === 'unapproved' ||
      siftValue === 'unconfirmed'
    )
      siftApiCall(siftValue);
    dispatch({ type: FILTERMODE_ENABLE });
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'sift', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'disapproved', onClick: onClickFooter, Icon: FilterList },
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList },
    { label: 'unapproved', onClick: onClickFooter, Icon: FilterList },
    { label: 'unconfirmed', onClick: onClickFooter, Icon: FilterList }
  ];

  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assessment',
        popupHeaderOneBadgeOne: '',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: ASSESSEE_ASSIGNMENT_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag'),
        selectedTagStatus: e.currentTarget.getAttribute('status')
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: ASSESSEE_ASSIGNMENT_TRIPLE_POPUP_OPTION
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
  };
  const startAssessment = (e) => {
    let status = e.currentTarget.getAttribute('actualstatus');
    let tempArr = RES_START_POPUP_OPTION;
    if (status === 'UNSTARTED') {
      tempArr = [{ ...tempArr[0], disabled: true }, tempArr[1]];
    } else {
      tempArr = [tempArr[0], { ...tempArr[1], disabled: true }];
    }
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assessment',
        popupHeaderOneBadgeOne: '',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: tempArr,
        selectedTagValue: e.currentTarget.getAttribute('assignmentid'),
        selectedTagStatus: status
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });

    // assignmentStart(e.currentTarget.getAttribute('index'));
    // setAssessmentList(reviewListDistinctData[e.currentTarget.getAttribute('index')]);
  };
  console.log('listDistinctData', listDistinctData);
  return (
    <div key={listDistinctData}>
      {listDistinctData && (
        <div className="containerPadding">
          <Card
            isIcon
            IconOne={CrossIcon}
            textOneOne={listDistinctData.assesseeAssignmentName}
            textTwoOne={listDistinctData.assesseeAssignmentDescription}
            labelTwoTwo={'assignment'}
            isIcon
            isAlliance
            onClickIconOne={closeRelatedList}
          />
        </div>
        // <Card
        //   textOneOne={listDistinctData.assesseeAssignmentName}
        //   textTwoOne={listDistinctData.assesseeAssignmentDescription}
        //   IconOne={CrossIcon}
        //   isIcon={true}
        //   labelTwoTwo={'assignment'}
        //   onClickIconOne={closeRelatedList}
        //   isAlliance
        //   relatedCardFixed={true}
        //   className={'iguru-iconboxSVG'}
        // />
      )}
      {listDistinctData &&
        listDistinctData.assesseeAssignmentAssessmentDistinct.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={item.assesseeAssignmentAssessmentId}
                isSelectedReviewList={
                  middlePaneSelectedValue === item.assesseeAssignmentAssessmentId
                }
                status={item.assesseeAssignmentAssessmentStatus}
                actualStatus={item.assesseeAssignmentAssessmentStatus}
                textOne={item.assesseeAssignmentAssessmentName}
                textTwo={item.assesseeAssignmentAssessmentDescription}
                isTooltipActive={false}
                onClickEvent={openListPopup}
                isSelectActive={isSelectActive}
                isSelected={selectedTagsArray.includes(item.assesseeAssignmentAssessmentId)}
                isDelivery={true}
                onClickArrow={
                  item.assesseeAssignmentAssessmentStatus === 'FINISHED' ? null : startAssessment
                }
              />
            </div>
          );
        })}
    </div>
  );
};
export default AssesseeDistinctAssessmentDistinctReviewList;
