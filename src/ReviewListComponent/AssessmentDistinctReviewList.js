import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSESSMENT_REVIEW_DISTINCT_SAGA,
  ASSOCIATE_POPUP_CLOSE,
  FILTERMODE_ENABLE,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  LOADER_START,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_STATE,
  SET_REQUEST_OBJECT
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIconTwo/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { makeAssessmentReviewListRequestObject } from '../Actions/GenericActions';
import { ASSESSMENT_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
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
    middlePaneSelectedValue
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
    let requestObect = makeAssessmentReviewListRequestObject(siftKey, 0, countPage);
    dispatch({ type: SET_PAGE_COUNT, payload: 1 });
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
    dispatch({ type: FILTERMODE_ENABLE });
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'sift', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList },
    { label: 'unpublished', onClick: onClickFooter, Icon: FilterList }
  ];
  console.log(FilterMode);

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
        popupContentArrValue: ASSESSMENT_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag')
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
                textOne={item.informationBasic.assessmentName}
                textTwo={item.informationBasic.assessmentDescription}
                isTooltipActive={false}
                onClickEvent={openListPopup}
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
    </div>
  );
};
export default AssessmentDistinctReviewList;
