import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  FILTERMODE_ENABLE,
  POPUP_OPEN,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_STATE,
  SET_ASSIGNMENT_RELATED_LIST
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { ASSOCIATE_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import Card from '../Molecules/Card/Card';
import CrossIcon from '@material-ui/icons/Clear';
import {
  getAssesseeGroupAssesseeDistinctApiCall,
  onClickCheckBoxOneListSelection,
  onClickCheckBoxSelection
} from '../Actions/AssesseeModuleAction';
import { assesseeStatus } from '../Actions/StatusAction';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const AssignmentDistinctAssesseeDistinctReviewList = (props) => {
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
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
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
      payload: { listName: 'assignmentAssesseeList', value: selectedTagsArray }
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
        middlePaneHeaderBadgeOne: 'distinct',
        middlePaneHeaderBadgeTwo: 'active',
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'assignmentDistinctReviewList',
        scanCount: reviewListDistinctData.length,
        showMiddlePaneState: true
      }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const listDistinctData = relatedReviewListDistinctData[0];

  const siftApiCall = (siftKey) => {
    getAssesseeGroupAssesseeDistinctApiCall(
      selectedAssociateInfo,
      siftKey,
      countPage,
      dispatch,
      middlePaneHeaderBadgeOne,
      listDistinctData.id
    );
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
    { label: 'aborted', onClick: onClickFooter, Icon: FilterList },
    { label: 'finished', onClick: onClickFooter, Icon: FilterList },
    { label: 'started', onClick: onClickFooter, Icon: FilterList },
    { label: 'unfinished', onClick: onClickFooter, Icon: FilterList },
    { label: 'unstarted', onClick: onClickFooter, Icon: FilterList }
  ];

  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assessee',
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
        listDistinctData.assessee.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={item.informationEngagement.assesseeTag?.assesseeTagPrimary}
                isSelectedReviewList={middlePaneSelectedValue === item.id}
                status={assesseeStatus(
                  middlePaneHeaderBadgeTwo,
                  item.informationEngagement.assesseeStatus
                )}
                actualStatus={item.informationEngagement.assesseeStatus}
                textOne={
                  item.informationBasic.assesseeNameFirst +
                  ' ' +
                  item.informationBasic.assesseeNameLast
                }
                textTwo={item.informationBasic.assesseeAlias}
                isTooltipActive={false}
                onClickEvent={openListPopup}
                isSelectActive={isSelectActive}
                isSelected={selectedTagsArray.includes(
                  item.informationEngagement.assesseeTag?.assesseeTagPrimary
                )}
                onClickCheckBox={(event) => {
                  onClickCheckBoxOneListSelection(selectedTagsArray, event, dispatch);
                }}
              />
            </div>
          );
        })}
      {FilterMode === 'assignmentDistinctAssesseeRevise' && (
        <FooterIconTwo
          FilterModeEnable={isShowReviseIcon}
          FilterMode={FilterMode}
          onClick={onClickRevise}
          primaryIcon={revisePrimaryIcon}
          secondaryIcon={reviseSecondaryIcons}
        />
      )}
      {FilterMode === 'assignmentDistinctAssesseeDistinctactive' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
    </div>
  );
};
export default AssignmentDistinctAssesseeDistinctReviewList;
