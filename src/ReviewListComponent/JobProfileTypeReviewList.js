import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSOCIATE_POPUP_CLOSE,
  FILTERMODE_ENABLE,
  GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
  LOADER_START,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_STATE,
  SET_REQUEST_OBJECT,
  GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import {
  ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION,
  GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
} from '../PopUpConfig';
import { getJobProfileGroupApiCall, getJobProfileTypeApiCall } from '../Actions/ActionJobProfile';
import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
import {makeJobProfileTypeObj} from '../Actions/GenericActions';
const JobProfileTypeReviewList = (props) => {
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
    middlePaneHeader,
    isSelectActive,
    selectedTagsArray,
    unselectedTagsArray,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    middlePaneHeaderBadgeThree
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpValue, selectedTagValue, cardValue } = useSelector((state) => state.PopUpReducer);
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
        type: GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
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
    getJobProfileTypeApiCall(selectedAssociateInfo, siftKey, countPage, dispatch, 'types');
    dispatch({ type: ASSOCIATE_POPUP_CLOSE });
    document.getElementById('middleComponentId').scrollTop = '0px';
  };

  const siftApiFilterCall = (siftKey) => {
    let requestObj = makeJobProfileTypeObj(
      selectedAssociateInfo,
      siftKey,
      0,
      countPage
    );
    dispatch({ type: LOADER_START });
    dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
    dispatch({ type: SET_PAGE_COUNT, payload: 0 });

    dispatch({
      type: GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
      payload: {
        middlePaneHeader: middlePaneHeader,
        request: requestObj,
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
    dispatch({ type: FILTERMODE_ENABLE });
    if (siftValue === 'suspended' || siftValue === 'terminated') siftApiCall(siftValue);
    if (siftValue === 'bespoke' || siftValue === 'generic') siftApiFilterCall(siftValue);

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
    let reviseHeader = middlePaneHeader;
    let optArr = [];
    let popupContentArrValue = ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION.map((obj) =>
      obj.data === 'assessees' ? { ...obj, data: middlePaneHeader, dataValue: reviseHeader } : obj
    );
    optArr = popupContentArrValue;
    let tempArr = [];
    let classification = e.currentTarget.getAttribute('data-shared');
   
    optArr.map((element)=>{
      if (classification === 'Bespoke' && element.data === 'share')
        tempArr.push({ ...element, disabled: true });
      else tempArr.push(element);
    })
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: middlePaneHeader,
        popupHeaderOneBadgeOne: 'type',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue:
          cardValue === 'Card' ? GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION : tempArr,//optArr,
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
        value: cardValue === 'Card' ? GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION : tempArr//optArr
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
  };
  console.log('FilterMode', FilterMode);
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
                textOne={item.informationBasic.jobProfileTypeName}
                textTwo={item.informationBasic.jobProfileTypeDescription}
                //status={item.informationEngagement.jobProfileTypeStatus}
                status={FilterMode === 'jobProfileTypeDistinctactive'?
                item.informationSetup?.jobProfileTypeClassification?.jobProfileTypeClassificationPrimary:
                item.informationEngagement.jobProfileTypeStatus}
                // status={associateSeftId === item.associateId ? 'bespoke' : 'generic'}
                actualStatus={item.informationEngagement.jobProfileTypeStatus}
                //shared={item.jobProfileTypeShared ? 'SHARED' : 'UNSHARED'}
                isTooltipActive={false}
                // dataValue={item.informationAllocation.jobProfileTypeGroup}
                onClickEvent={openListPopup}
                isSelectActive={isSelectActive}
                isSelected={selectedTagsArray.includes(item.id)}
                onClickCheckBox={(event) => {
                  onClickCheckBoxSelection(selectedTagsArray, unselectedTagsArray, event, dispatch);
                }}
                isShared={item?.jobProfileTypeShared}
                shared={item.informationSetup?.jobProfileTypeClassification?.jobProfileTypeClassificationPrimary}
              />
            </div>
          );
        })}
      {(FilterMode === 'jobProfileTypeDistinctinactive' ||
        FilterMode === 'jobProfileTypeDistinctsuspended' ||
        FilterMode === 'jobProfileTypeDistinctterminated') && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
      {FilterMode === 'jobProfileTypeDistinctactive' && (
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
export default JobProfileTypeReviewList;
