import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSOCIATE_POPUP_CLOSE,
  ASSOCIATE_REVIEW_DISTINCT_SAGA,
  FILTERMODE_ENABLE,
  GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
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
import { makeAssessmentTypeObj } from '../Actions/GenericActions';
import {
  ASSESSMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION,
  GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
} from '../PopUpConfig';
import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
const AssessmentTypeReviewList = (props) => {
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
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    middlePaneHeaderBadgeThree,
    isSelectActive,
    selectedTagsArray,
    unselectedTagsArray
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const { cardValue } = useSelector((state) => state.PopUpReducer);
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
        type: GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
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
    let requestObect = makeAssessmentTypeObj(selectedAssociateInfo, siftKey, 0, countPage);
    dispatch({ type: LOADER_START });
    dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
    dispatch({
      type: GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
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
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'sift', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList }
  ];
  const secondaryOneIcon = [
    { label: 'bespoke', onClick: onClickFooter, Icon: FilterList },
    { label: 'generic', onClick: onClickFooter, Icon: FilterList }
  ];
  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assessments',
        popupHeaderOneBadgeOne: 'type',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue:
          cardValue === 'Card'
            ? GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
            : ASSESSMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag'),
        selectedTagStatus: e.currentTarget.getAttribute('status'),
        selectedTagGroupId: e.currentTarget.getAttribute('data-value'),
        selectedTagShared: e.currentTarget.getAttribute('data-shared')
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value:
          cardValue === 'Card'
            ? GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
            : ASSESSMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
  };
  const associateSeftId =
    selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary;

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
                // status={item.informationEngagement.assessmentTypeStatus}
                textOne={item.informationBasic.assessmentTypeName}
                textTwo={item.informationBasic.assessmentTypeDescription}
                //status={associateSeftId === item.associateId ? 'bespoke' : 'generic'}
                status={FilterMode === 'assessmentsTypeDistinctactive'?
                item.informationSetup?.assessmentTypeClassification?.assessmentTypeClassificationPrimary:
                item.informationEngagement.assessmentTypeStatus}
                actualStatus={item.informationEngagement.assessmentTypeStatus}
                shared={item.assessmentTypeShared ? 'SHARED' : 'UNSHARED'}
                dataValue={item.informationAllocation?.assessmentTypeGroup}
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
      {FilterMode === 'assessmentsTypeDistinctinactive' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
      {FilterMode === 'assessmentsTypeDistinctactive' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryOneIcon}
        />
      )}
    </div>
  );
};
export default AssessmentTypeReviewList;
