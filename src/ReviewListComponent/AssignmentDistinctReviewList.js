import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSOCIATE_POPUP_CLOSE,
  FILTERMODE,
  FILTERMODE_ENABLE,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  LOADER_START,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_STATE,
  ASSESSEE_ALLOCATE_ASSIGNMENT_SAGA,
  ASSESSMENT_ALLOCATE_ASSIGNMENT_SAGA,
  JOBPROFILE_ALLOCATE_ASSIGNMENT_SAGA,
  CULTUREPROFILE_ALLOCATE_ASSIGNMENT_SAGA
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { ASSIGNMENT_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import { assignmentsDistinctApiCall } from '../Actions/AssignmentModuleAction';
import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
const AssignmentDistinctReviewList = (props) => {
  const dispatch = useDispatch();
  const { secondaryOptionCheckValue, countPage } = useSelector(
    (state) => state.AssesseeCreateReducer
  );
  const {
    numberPage,
    scanCount,
    reviewListDistinctData,
    reviewListReqObj,
    middlePaneSelectedValue,
    selectedAssociateInfo,
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
    console.log(reviewListDistinctData);
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };
  const siftApiCall = (siftKey) => {
    assignmentsDistinctApiCall(selectedAssociateInfo, siftKey, countPage, dispatch, 'distinct');
    dispatch({ type: ASSOCIATE_POPUP_CLOSE });
    document.getElementById('middleComponentId').scrollTop = '0px';
  };
  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    dispatch({ type: FILTERMODE_ENABLE });
    if (siftValue === 'suspended' || siftValue === 'terminated' || siftValue === 'unpublished')
      siftApiCall(siftValue);
    if (siftValue === 'finish') {
      console.log('allocateStr', allocateStr);
      let distinctAllocateStr =
        allocateStr === 'assesseesgroups'
          ? 'assesseeGroup'
          : allocateStr === 'assesseesdistinct'
          ? 'assesseeDistinct'
          : allocateStr === 'assessmentsdistinct'
          ? 'assessmentDistinct'
          : allocateStr === 'assessmentsgroups'
          ? 'assessmentGroup'
          : allocateStr === 'culture profilesdistinct'
          ? 'cultureProfileDistinct'
          : allocateStr === 'culture profilesgroups'
          ? 'cultureProfileGroup'
          : allocateStr === 'job profilesdistinct'
          ? 'jobProfileDistinct'
          : allocateStr === 'job profilesgroups'
          ? 'jobProfileGroup'
          : '';
      if (distinctAllocateStr !== '' && selectedTagsArray.length !== 0) {
        if (distinctAllocateStr === 'assesseeGroup' || distinctAllocateStr === 'assesseeDistinct') {
          let request = {
            assesseeId: selectedAssociateInfo?.assesseeId,
            associateId:
              selectedAssociateInfo?.associate?.informationEngagement.associateTag
                .associateTagPrimary,
            assesseeDistinctAllocate: {
              [distinctAllocateStr]: allocatedTagsArray
            },
            assesseeDistinctAllocateInformation: {
              assignment: selectedTagsArray
            }
          };
          dispatch({ type: LOADER_START });
          dispatch({ type: ASSESSEE_ALLOCATE_ASSIGNMENT_SAGA, payload: { request: request } });
        }
        if (
          distinctAllocateStr === 'assessmentDistinct' ||
          distinctAllocateStr === 'assessmentGroup'
        ) {
          let request = {
            assesseeId: selectedAssociateInfo?.assesseeId,
            associateId:
              selectedAssociateInfo?.associate?.informationEngagement.associateTag
                .associateTagPrimary,
            assessmentDistinctAllocate: {
              [distinctAllocateStr]: allocatedTagsArray
            },
            assessmentDistinctAllocateInformation: {
              assignment: selectedTagsArray
            }
          };
          dispatch({ type: LOADER_START });
          dispatch({ type: ASSESSMENT_ALLOCATE_ASSIGNMENT_SAGA, payload: { request: request } });
        }
        if (
          distinctAllocateStr === 'cultureProfileDistinct' ||
          distinctAllocateStr === 'cultureProfileGroup'
        ) {
          let request = {
            assesseeId: selectedAssociateInfo?.assesseeId,
            associateId:
              selectedAssociateInfo?.associate?.informationEngagement.associateTag
                .associateTagPrimary,
            cultureProfileDistinctAllocate: {
              [distinctAllocateStr]: allocatedTagsArray
            },
            cultureProfileDistinctAllocateInformation: {
              assignment: selectedTagsArray
            }
          };
          dispatch({ type: LOADER_START });
          dispatch({
            type: CULTUREPROFILE_ALLOCATE_ASSIGNMENT_SAGA,
            payload: { request: request }
          });
        }
        if (
          distinctAllocateStr === 'jobProfileDistinct' ||
          distinctAllocateStr === 'jobProfileGroup'
        ) {
          let request = {
            assesseeId: selectedAssociateInfo?.assesseeId,
            associateId:
              selectedAssociateInfo?.associate?.informationEngagement.associateTag
                .associateTagPrimary,
            jobProfileDistinctAllocate: {
              [distinctAllocateStr]: allocatedTagsArray
            },
            jobProfileDistinctAllocateInformation: {
              assignment: selectedTagsArray
            }
          };
          dispatch({ type: LOADER_START });
          dispatch({
            type: JOBPROFILE_ALLOCATE_ASSIGNMENT_SAGA,
            payload: { request: request }
          });
        }
      }
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
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList },
    { label: 'unpublished', onClick: onClickFooter, Icon: FilterList }
  ];
  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    let tempArr =[];
    let stats = e.currentTarget.getAttribute('status');
    ASSIGNMENT_REVIEW_LIST_POPUP_OPTION.map((element) => {
      if (stats === 'PUBLISHED' && element.data === 'revise')
        tempArr.push({ ...element, disabled: true });
      else tempArr.push(element);
    });
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assignment',
        popupHeaderOneBadgeOne: '',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: tempArr,
        selectedTagValue: e.currentTarget.getAttribute('tag'),
        selectedTagStatus: e.currentTarget.getAttribute('status')
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: tempArr
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
  };
  return (
    <div>
      {reviewListDistinctData &&
        reviewListDistinctData.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={item.id}
                isSelectedReviewList={middlePaneSelectedValue === item.id}
                status={item.informationEngagement.assignmentStatus}
                actualStatus={item.informationEngagement.assignmentStatus}
                textOne={item.informationBasic.assignmentName}
                textTwo={item.informationBasic.assignmentDescription}
                isTooltipActive={false}
                onClickEvent={openListPopup}
                isSelectActive={isSelectActive}
                isSelected={selectedTagsArray.includes(item.id)}
                onClickCheckBox={(event) => {
                  onClickCheckBoxSelection(selectedTagsArray, unselectedTagsArray, event, dispatch);
                }}
              />
            </div>
          );
        })}
      {(FilterMode === 'assignmentsDistinctinactive' ||
        FilterMode === 'assignmentsDistinctsuspended' ||
        FilterMode === 'assignmentsDistinctunpublished' ||
        FilterMode === 'assignmentsDistinctterminated') && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}

      {FilterMode === 'allocateToAssignment' && (
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
export default AssignmentDistinctReviewList;
