import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSESSMENT_ALLOCATE_ASSIGNMENT_SAGA,
  ASSESSMENT_REVIEW_DISTINCT_SAGA,
  ASSOCIATE_POPUP_CLOSE,
  FILTERMODE,
  FILTERMODE_ENABLE,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  LOADER_START,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_STATE,
  SET_REQUEST_OBJECT
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { makeAssessmentReviewListRequestObject } from '../Actions/GenericActions';
import { ASSESSMENT_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
const AssessmentDistinctReviewList = (props) => {
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
    selectedTagsArray,
    unselectedTagsArray,
    isSelectActive,
    allocatedTagsArray
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
        type: ASSESSMENT_REVIEW_DISTINCT_SAGA,
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
    let requestObect = makeAssessmentReviewListRequestObject(
      selectedAssociateInfo,
      siftKey,
      0,
      countPage
    );
    dispatch({ type: LOADER_START });
    dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
    dispatch({
      type: ASSESSMENT_REVIEW_DISTINCT_SAGA,
      payload: {
        request: requestObect,
        BadgeOne: 'distinct',
        BadgeTwo: siftKey
      }
    });
    dispatch({ type: ASSOCIATE_POPUP_CLOSE });

    document.getElementById('middleComponentId').scrollTop = '0px';
  };
  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    if (siftValue === 'suspended' || siftValue === 'terminated' || siftValue === 'unpublished')
      siftApiCall(siftValue);
    if (siftValue === 'finish') {
      if (FilterMode === 'allocateToAssessment') {
        let request = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assessmentDistinctAllocate: {
            assessmentDistinct: selectedTagsArray
          },
          assessmentDistinctAllocateInformation: {
            assignment: allocatedTagsArray
          }
        };
        dispatch({ type: LOADER_START });
        dispatch({ type: ASSESSMENT_ALLOCATE_ASSIGNMENT_SAGA, payload: { request: request } });
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
    dispatch({ type: FILTERMODE_ENABLE });
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
    let tempArr = [];
    let stats = e.currentTarget.getAttribute('status');
    ASSESSMENT_REVIEW_LIST_POPUP_OPTION.map((element) => {
      if (stats === 'PUBLISHED' && element.data === 'revise')
        tempArr.push({ ...element, disabled: true });
      else tempArr.push(element);
    });
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assessment',
        popupHeaderOneBadgeOne: '',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: tempArr,
        selectedTagValue: e.currentTarget.getAttribute('tag'),
        selectedTagStatus: stats
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: ASSESSMENT_REVIEW_LIST_POPUP_OPTION
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
                status={item.informationEngagement.assessmentStatus}
                actualStatus={item.informationEngagement.assessmentStatus}
                textOne={item.informationBasic.assessmentName}
                textTwo={item.informationBasic.assessmentDescription}
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
      {FilterMode === 'assessmentsDistinctinactive' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
      {FilterMode === 'allocateToAssessment' && (
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
export default AssessmentDistinctReviewList;
