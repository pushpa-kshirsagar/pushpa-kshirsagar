import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSOCIATE_POPUP_CLOSE,
  GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
  FILTERMODE_ENABLE,
  LOADER_START,
  POPUP_OPEN,
  SET_PAGE_COUNT,
  SET_POPUP_STATE,
  SET_REQUEST_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  FILTERMODE,
  ASSIGNMENT_ALLOCATE_SAGA
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { makeAssignmentGroupObj } from '../Actions/GenericActions';
import {
  ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION,
  GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
} from '../PopUpConfig';
import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const AssignmentGroupReviewList = (props) => {
  const dispatch = useDispatch();
  const { secondaryOptionCheckValue, countPage } = useSelector(
    (state) => state.AssesseeCreateReducer
  );
  const { cardValue } = useSelector((state) => state.PopUpReducer);
  const {
    numberPage,
    scanCount,
    reviewListDistinctData,
    reviewListReqObj,
    middlePaneSelectedValue,
    selectedAssociateInfo,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    middlePaneHeaderBadgeThree,
    isSelectActive,
    selectedTagsArray,
    unselectedTagsArray,
    allocatedTagsArray,
    allocateStr
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
        type: GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
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
    console.log(reviewListDistinctData);
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };
  const siftApiCall = (siftKey) => {
    let requestObect = makeAssignmentGroupObj(selectedAssociateInfo, siftKey, 0, countPage);
    dispatch({ type: LOADER_START });
    dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
    dispatch({
      type: GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
      payload: {
        request: requestObect,
        BadgeOne: middlePaneHeaderBadgeOne,
        BadgeTwo: middlePaneHeaderBadgeTwo === 'distinct' ? middlePaneHeaderBadgeTwo : siftKey,
        BadgeThree: middlePaneHeaderBadgeTwo === 'distinct' ? siftKey : middlePaneHeaderBadgeThree,
        isMiddlePaneList: true
      }
    });
    dispatch({ type: ASSOCIATE_POPUP_CLOSE });
    document.getElementById('middleComponentId').scrollTop = '0px';
  };
  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    if (siftValue === 'suspended' || siftValue === 'terminated') siftApiCall(siftValue);
    if (siftValue === 'bespoke' || siftValue === 'generic') siftApiCall(siftValue);

    dispatch({ type: FILTERMODE_ENABLE });
    if (siftValue === 'finish') {
      console.log('allocateStr', allocateStr);
      let strall = allocateStr === 'assignmentsdistinct' ? 'assignmentDistinct' : '';
      // if (strall !== '' && selectedTagsArray.length !== 0) {
      // if (strall === 'assignmentDistinct') {
      let request = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assignmentDistinctAllocate: allocatedTagsArray,
        assignmentDistinctAllocateInformation: {
          assignmentGroup: selectedTagsArray
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({ type: ASSIGNMENT_ALLOCATE_SAGA, payload: { request: request } });
      //   }
      // }
    }
    if (siftValue === 'cancle') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'isSelectActive', value: '' }
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: '' }
      });
    }
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'sift', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList }
  ];
  const secondaryOneIcon = [
    { label: 'bespoke', onClick: onClickFooter, Icon: FilterList },
    { label: 'generic', onClick: onClickFooter, Icon: FilterList },
    { label: 'shared', onClick: onClickFooter, Icon: FilterList },
    { label: 'unshared', onClick: onClickFooter, Icon: FilterList }
  ];
  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    let tempArr = [];
    let classification = e.currentTarget.getAttribute('data-shared');
    ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION.map((element)=>{
      if (classification === 'Bespoke' && element.data === 'share')
        tempArr.push({ ...element, disabled: true });
      else tempArr.push(element);
    })
   
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assignments',
        popupHeaderOneBadgeOne: 'group',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue:
          cardValue === 'Card'
            ? GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
            :tempArr, //ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag'),
        selectedTagStatus: e.currentTarget.getAttribute('status')
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value:
          cardValue === 'Card'
            ? GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
            : tempArr,//ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
  };
  console.log('isSelectActive',isSelectActive);
  return (
    <div>
      {reviewListDistinctData &&
        reviewListDistinctData.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={item?.id}
                isSelectedReviewList={middlePaneSelectedValue === item?.id}
                //status={item.informationEngagement.assignmentGroupStatus}
                status={
                  FilterMode === 'assignmentsGroupDistinctactive'
                    ? item.informationSetup?.assignmentGroupClassification
                        ?.assignmentGroupClassificationPrimary
                    : item.informationEngagement.assignmentGroupStatus
                }
                actualStatus={item.informationEngagement.assignmentGroupStatus}
                textOne={item.informationBasic.assignmentGroupName}
                textTwo={item.informationBasic.assignmentGroupDescription}
                isTooltipActive={false}
                onClickEvent={openListPopup}
                isSelectActive={isSelectActive}
                isSelected={selectedTagsArray.includes(item.id)}
                onClickCheckBox={(event) => {
                  onClickCheckBoxSelection(selectedTagsArray, unselectedTagsArray, event, dispatch);
                }}
                isShared={item?.assignmentGroupShared}						
                //shared={item.assignmentGroupShared ? 'SHARED' : 'UNSHARED'}
                shared={item.informationSetup?.assignmentGroupClassification?.assignmentGroupClassificationPrimary}
              />
            </div>
          );
        })}
      {FilterMode === 'assignmentsGroupDistinctinactive' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
      {FilterMode === 'assignmentsGroupDistinctactive' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryOneIcon}
        />
      )}
      {FilterMode === 'assignmentAllocateToGroup' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={[{ label: 'allocate', onClick: onClickFooter, Icon: ReviseIcon }]}
          secondaryIcon={[
            { label: 'cancle', onClick: onClickFooter, Icon: ClearIcon },
            { label: 'finish', onClick: onClickFooter, Icon: Check }
          ]}
        />
      )}
    </div>
  );
};
export default AssignmentGroupReviewList;
