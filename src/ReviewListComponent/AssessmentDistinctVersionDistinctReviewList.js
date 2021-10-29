import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLEAR_DISPLAY_PANE_THREE,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_STATE
} from '../actionType';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { SECTION_SCALE_CLUSTER_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import Card from '../Molecules/Card/Card';
import CrossIcon from '@material-ui/icons/Clear';
import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';

const AssessmentDistinctVersionDistinctReviewList = (props) => {
  const dispatch = useDispatch();
  const {
    reviewListDistinctData,
    relatedReviewListDistinctData,
    selectedTagsArray,
    isSelectActive,
    unselectedTagsArray,
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  // {
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
  // }
  const closeRelatedList = () => {
    dispatch({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'assessments',
        middlePaneHeaderBadgeOne: 'distinct',
        middlePaneHeaderBadgeTwo: 'active',
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'assessmentDistinctReviewList',
        scanCount: reviewListDistinctData.length,
        showMiddlePaneState: true
      }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const listDistinctData = relatedReviewListDistinctData[0];
  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'version',
        popupHeaderOneBadgeOne: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: SECTION_SCALE_CLUSTER_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag'),
        selectedTagStatus: e.currentTarget.getAttribute('status')
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: SECTION_SCALE_CLUSTER_REVIEW_LIST_POPUP_OPTION
      }
    });
  };
  console.log('relatedReviewListDistinctData',relatedReviewListDistinctData);
  return (
    <div>
      {listDistinctData && (
        <Card
          textOneOne={listDistinctData.assessmentName}
          textTwoOne={listDistinctData.assessmentDescription}
          IconOne={CrossIcon}
          isIcon={true}
          labelTwoTwo={'assessment'}
          onClickIconOne={closeRelatedList}
          isAlliance
          relatedCardFixed={true}
          className={'iguru-iconboxSVG'}
        />
      )}
      {listDistinctData &&
        listDistinctData.versions.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={index}
                // isSelectedReviewList={middlePaneSelectedValue === item.id}
                status={''}
                // actualStatus={item.informationEngagement.itemStatus}
                textOne={item.assessmentVersionName}
                textTwo={item.assessmentVersionDescription}
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
    </div>
  );
};
export default AssessmentDistinctVersionDistinctReviewList;
