import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSOCIATE_POPUP_CLOSE,
  FILTERMODE_ENABLE,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_STATE
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';

import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
import {
  ASSESSEE_ASSIGNMENT_REVIEW_LIST_POPUP_OPTION,
  ASSESSEE_ASSIGNMENT_TRIPLE_POPUP_OPTION,
  RES_START_POPUP_OPTION
} from '../PopUpConfig';
import { getAssesseeSelfAssignmentList } from '../Actions/GenericActions';
const AssesseeDistinctAssignmentDistinctReviewList = (props) => {
  const dispatch = useDispatch();
  const { secondaryOptionCheckValue } = useSelector((state) => state.AssesseeCreateReducer);
  const {
    numberPage,
    scanCount,
    reviewListDistinctData,
    reviewListReqObj,
    middlePaneSelectedValue,
    isSelectActive,
    selectedTagsArray,
    unselectedTagsArray,
    selectedAssociateInfo,
    middlePaneHeaderBadgeOne
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    document.getElementById('middleComponentId').addEventListener('scroll', handleScroll);
  }, []);
  const handleScroll = (event) => {
    var targetPt = event.target;
    if (
      Math.ceil(targetPt.scrollHeight - targetPt.scrollTop) !== targetPt.clientHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
    console.log(isFetching);
  };
  const fetchData = async () => {
    if (reviewListDistinctData.length < scanCount) {
      let obj = {
        ...reviewListReqObj,
        numberPage: numberPage
      };
      dispatch({
        type: GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
        payload: {
          request: obj,
          BadgeOne: 'distinct',
          BadgeTwo: secondaryOptionCheckValue
        }
      });
      dispatch({ type: SET_PAGE_COUNT, payload: numberPage + 1 });
    }
  };
  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };
  const siftApiCall = (siftKey) => {
    // let requestObect = makeAssesseeGroupObj(selectedAssociateInfo, siftKey, 0, countPage);
    // dispatch({ type: LOADER_START });
    // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
    // dispatch({
    //   type: GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
    //   payload: {
    //     request: requestObect,
    //     BadgeOne: middlePaneHeaderBadgeOne,
    //     BadgeTwo: middlePaneHeaderBadgeTwo === 'distinct' ? middlePaneHeaderBadgeTwo : siftKey,
    //     BadgeThree: middlePaneHeaderBadgeTwo === 'distinct' ? siftKey : middlePaneHeaderBadgeThree,
    //     isMiddlePaneList: true
    //   }
    // });
    getAssesseeSelfAssignmentList(
      selectedAssociateInfo,
      0,
      [siftKey.toUpperCase()],
      dispatch,
      middlePaneHeaderBadgeOne,
      siftKey
    );
    dispatch({ type: ASSOCIATE_POPUP_CLOSE });
    document.getElementById('middleComponentId').scrollTop = '0px';
  };
  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    if (
      siftValue === 'suspended' ||
      siftValue === 'terminated' ||
      siftValue === 'started' ||
      siftValue === 'unstarted' ||
      siftValue === 'aborted' ||
      siftValue === 'finished' ||
      siftValue === 'unfinished'
    )
      siftApiCall(siftValue);
    dispatch({ type: FILTERMODE_ENABLE });
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'sift', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIconOne = [
    { label: 'started', onClick: onClickFooter, Icon: FilterList },
    { label: 'unstarted', onClick: onClickFooter, Icon: FilterList }
  ];
  const secondaryIconTwo = [
    { label: 'aborted', onClick: onClickFooter, Icon: FilterList },
    { label: 'finished', onClick: onClickFooter, Icon: FilterList },
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList },
    { label: 'unfinished', onClick: onClickFooter, Icon: FilterList }
  ];
  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'relatedReviewListDistinctData', value: [] }
    });
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assignment',
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
  const startAssignment = (e) => {
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
        popupHeaderOne: 'assignment',
        popupHeaderOneBadgeOne: '',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: tempArr,
        selectedTagValue: e.currentTarget.getAttribute('assignmentid'),
        selectedTagStatus: e.currentTarget.getAttribute('status')
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });

    // assignmentStart(e.currentTarget.getAttribute('index'));
    // setAssessmentList(reviewListDistinctData[e.currentTarget.getAttribute('index')]);
  };
  console.log(reviewListDistinctData);
  return (
    <div>
      {reviewListDistinctData &&
        reviewListDistinctData.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={item.assignmentId}
                isSelectedReviewList={middlePaneSelectedValue === item.assignmentId}
                status={item.assesseeAssignmentStatus}
                actualStatus={item.assesseeAssignmentStatus}
                textOne={item.assesseeAssignmentName}
                textTwo={item.assesseeAssignmentDescription}
                isTooltipActive={false}
                onClickEvent={openListPopup}
                isSelectActive={isSelectActive}
                isSelected={selectedTagsArray.includes(item.assignmentId)}
                isDelivery={true}
                onClickArrow={item.assesseeAssignmentStatus === 'FINISHED' ? null : startAssignment}
                onClickCheckBox={(event) => {
                  onClickCheckBoxSelection(selectedTagsArray, unselectedTagsArray, event, dispatch);
                }}
              />
            </div>
          );
        })}
      {(FilterMode === 'assesseeAssignmentDistinctinactive' ||
        FilterMode === 'assesseeAssignmentDistinctactive') && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={
            FilterMode === 'assesseeAssignmentDistinctactive' ? secondaryIconOne : secondaryIconTwo
          }
        />
      )}
    </div>
  );
};
export default AssesseeDistinctAssignmentDistinctReviewList;
