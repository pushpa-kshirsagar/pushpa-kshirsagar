import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FILTERMODE,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_STATE,
  SET_ASSIGNMENT_RELATED_LIST
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { ASSOCIATE_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import Card from '../Molecules/Card/Card';
import CrossIcon from '@material-ui/icons/Clear';
import { onClickCheckBoxOneListSelection } from '../Actions/AssesseeModuleAction';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const AssignmentDistinctAssessmentGroupReviewList = (props) => {
  const dispatch = useDispatch();
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const {
    middlePaneSelectedValue,
    reviewListDistinctData,
    relatedReviewListDistinctData,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    typeOfMiddlePaneList,
    selectedTagsArray,
    unselectedTagsArray,
    isSelectActive
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterMode } = useSelector((state) => state.FilterReducer);

  {
    /** no need for pagination 
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
        type: GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
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
    // console.log(reviewListDistinctData);
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };
  */
  }
  const onClickRevise = () => {
    console.log('ON CLICK REVISE ICON');
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    console.log('ON CLICK cancel ICON');
    dispatch({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'assignments',
        middlePaneHeaderBadgeOne: middlePaneHeaderBadgeOne,
        middlePaneHeaderBadgeTwo: middlePaneHeaderBadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'assignmentDistinctReviewList',
        scanCount: reviewListDistinctData.length,
        showMiddlePaneState: true
      }
    });
    setIsShowReviseIcon(true);
  };
  const onClickReviseFinish = () => {
    console.log('ON CLICK finish ICON', selectedTagsArray, unselectedTagsArray);
    setIsShowReviseIcon(true);
    if (typeOfMiddlePaneList !== '') {
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'assignments',
          middlePaneHeaderBadgeOne: middlePaneHeaderBadgeOne,
          middlePaneHeaderBadgeTwo: middlePaneHeaderBadgeTwo,
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assignmentDistinctReviewList',
          scanCount: reviewListDistinctData.length,
          showMiddlePaneState: true
        }
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: '' }
      });
    }

    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'isSelectActive', value: '' }
    });
    dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    dispatch({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentAssessmentGroupList', value: selectedTagsArray }
    });
  };
  const revisePrimaryIcon = [{ label: 'revise', onClick: onClickRevise, Icon: ReviseIcon }];

  const reviseSecondaryIcons = [
    { label: 'cancel', onClick: onClickReviseCancel, Icon: ClearIcon },
    { label: 'finish', onClick: onClickReviseFinish, Icon: Check }
  ];

  const closeRelatedList = () => {
    dispatch({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'assignments',
        middlePaneHeaderBadgeOne: middlePaneHeaderBadgeOne,
        middlePaneHeaderBadgeTwo: middlePaneHeaderBadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'assignmentDistinctReviewList',
        scanCount: reviewListDistinctData.length,
        showMiddlePaneState: true
      }
    });
  };
  const listDistinctData = relatedReviewListDistinctData[0];

  /* for middle pane */

  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assessment',
        popupHeaderOneBadgeOne: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: ASSOCIATE_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag'),
        selectedTagStatus: e.currentTarget.getAttribute('status')
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: ASSOCIATE_REVIEW_LIST_POPUP_OPTION
      }
    });
  };
  return (
    <div>
      {listDistinctData && (
        <Card
          textOneOne={listDistinctData.assignmentName}
          textTwoOne={listDistinctData.assignmentDescription}
          IconOne={CrossIcon}
          isIcon={true}
          labelTwoTwo={'distinct'}
          onClickIconOne={closeRelatedList}
          isAlliance
          relatedCardFixed={true}
          className={'iguru-iconboxSVG'}
        />
      )}
      {listDistinctData &&
        listDistinctData.assessmentGroup.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={item.id}
                isSelectedReviewList={middlePaneSelectedValue === item.id}
                status={item.informationEngagement.assessmentGroupStatus}
                actualStatus={item.informationEngagement.assessmentGroupStatus}
                textOne={item.informationBasic.assessmentGroupName}
                textTwo={item.informationBasic.assessmentGroupDescription}
                isTooltipActive={false}
                onClickEvent={openListPopup}
                isSelectActive={isSelectActive}
                isSelected={selectedTagsArray.includes(item.id)}
                onClickCheckBox={(event) => {
                  onClickCheckBoxOneListSelection(selectedTagsArray, event, dispatch);
                }}
              />
            </div>
          );
        })}
      {FilterMode === 'assignmentDistinctAssessmentGroupRevise' && (
        <FooterIconTwo
          FilterModeEnable={isShowReviseIcon}
          FilterMode={FilterMode}
          onClick={onClickRevise}
          primaryIcon={revisePrimaryIcon}
          secondaryIcon={reviseSecondaryIcons}
        />
      )}
    </div>
  );
};
export default AssignmentDistinctAssessmentGroupReviewList;
