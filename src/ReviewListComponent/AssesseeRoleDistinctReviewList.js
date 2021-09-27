import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSOCIATE_POPUP_CLOSE,
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  FILTERMODE_ENABLE,
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
import { makeAssesseeRoleObj } from '../Actions/GenericActions';
import {
  ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION,
  GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
} from '../PopUpConfig';
import { assesseeRole, onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
const AssesseeRoleDistinctReviewList = (props) => {
  const dispatch = useDispatch();
  const { secondaryOptionCheckValue } = useSelector((state) => state.AssesseeCreateReducer);
  const { cardValue } = useSelector((state) => state.PopUpReducer);
  const {
    numberPage,
    scanCount,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    middlePaneHeaderBadgeThree,
    reviewListDistinctData,
    reviewListReqObj,
    middlePaneSelectedValue,
    middlePaneHeader,
    selectedAssociateInfo,
    countPage,
    isSelectActive,
    unselectedTagsArray,
    selectedTagsArray
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
        type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
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
        let requestObect = makeAssesseeRoleObj(selectedAssociateInfo, siftKey, 0, countPage);
    dispatch({ type: LOADER_START });
    dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
    dispatch({
      type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
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
    let popupContentArrValue = ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION.map((obj) =>
      obj.data === 'assessees'
        ? { ...obj, data: middlePaneHeader, dataValue: middlePaneHeader }
        : obj
    );
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: middlePaneHeader,
        popupHeaderOneBadgeOne: 'role',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue:
          cardValue === 'Card'
            ? GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
            : popupContentArrValue,
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
            : popupContentArrValue
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
  };
  // console.log(reviewListDistinctData);
  // console.log('selectedAssociateInfo', selectedAssociateInfo);
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
                // dataValue={item.informationAllocation.assesseeRoleGroup}
                isSelectedReviewList={middlePaneSelectedValue === item.id}
                // status={associateSeftId === item.associateId ? 'bespoke' : 'generic'}
                //status={item.informationEngagement.assesseeRoleStatus}
                status={FilterMode === 'assesseeRoleDistinctactive' ? item.informationSetup?.assesseeRoleClassification?.assesseeRoleClassificationPrimary:
                item.informationEngagement.assesseeRoleStatus}
                shared={item.assesseeRoleShared ? 'SHARED' : 'UNSHARED'}
                actualStatus={item.informationEngagement.assesseeRoleStatus}
                textOne={assesseeRole(item.informationBasic.assesseeRoleName)}
                textTwo={item.informationBasic.assesseeRoleDescription}
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
      {FilterMode === 'assesseeRoleDistinctinactive' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
      {FilterMode === 'assesseeRoleDistinctactive' && (
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
export default AssesseeRoleDistinctReviewList;
