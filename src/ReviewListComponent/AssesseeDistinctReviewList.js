import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSESSEE_INFO_CREATE,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  FILTERMODE_ENABLE,
  GET_ASSESSEE_INFO_SAGA,
  LOADER_START,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_STATE,
  SET_REQUEST_OBJECT
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIconTwo/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { makeAssesseeReviewListRequestObject } from '../Actions/GenericActions';
import { assesseeStatus } from '../Actions/StatusAction';
import { REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import PopUpMiddlePaneList from '../PopUpDisplayPanel/PopUpMiddlePaneList';
const AssesseeDistinctReviewList = (props) => {
  const { popupAllClose } = props;
  const dispatch = useDispatch();
  const { secondaryOptionCheckValue } = useSelector((state) => state.AssesseeCreateReducer);
  const {
    numberPage,
    scanCount,
    countPage,
    middlePaneHeaderBadgeOne,
    reviewListDistinctData,
    reviewListReqObj,
    middlePaneSelectedValue
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpValue, selectedTagValue } = useSelector((state) => state.PopUpReducer);
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
        type: ASSESSEE_REVIEW_DISTINCT_SAGA,
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
    let requestObect = makeAssesseeReviewListRequestObject(siftKey, 0, countPage);
    dispatch({ type: SET_PAGE_COUNT, payload: 1 });
    dispatch({ type: LOADER_START });
    dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
    dispatch({
      type: ASSESSEE_REVIEW_DISTINCT_SAGA,
      payload: {
        request: requestObect,
        BadgeOne: 'distinct',
        BadgeTwo: siftKey
      }
    });
    dispatch({ type: ASSESSEE_INFO_CREATE });
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
    { label: 'disapproved', onClick: onClickFooter, Icon: FilterList },
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList },
    { label: 'unapproved', onClick: onClickFooter, Icon: FilterList },
    { label: 'unconfirmed', onClick: onClickFooter, Icon: FilterList }
  ];
  const openAssesseeListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assessee',
        popupHeaderOneBadgeOne: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag')
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
  };
  const openAssesseeRightPaneInformation = (secondaryOptionCheckValue) => {
    console.log(selectedTagValue);
    dispatch({ type: LOADER_START });
    dispatch({
      type: GET_ASSESSEE_INFO_SAGA,
      payload: {
        secondaryOptionCheckValue,
        reqBody: {
          assesseeId: '0123456',
          associateId: '0654321',
          filter: 'true',
          searchCondition: 'AND',
          search: [
            {
              condition: 'and',
              searchBy: [
                {
                  dataType: 'string',
                  conditionColumn: 'id',
                  conditionValue: {
                    condition: 'eq',
                    value: {
                      from: selectedTagValue ? selectedTagValue : '6054a4d6cb14fb2075aeec87'
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    });
    dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'middlePaneSelectedValue', value: selectedTagValue }
    });
    popupAllClose();
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
                tag={
                  item.informationEngagement.assesseeTag
                    ? item.informationEngagement.assesseeTag.assesseeTagPrimary
                    : item
                }
                status={assesseeStatus(
                  middlePaneHeaderBadgeOne,
                  item.informationEngagement.assesseeStatus
                )}
                isSelectedReviewList={
                  middlePaneSelectedValue ===
                  item.informationEngagement.assesseeTag?.assesseeTagPrimary
                    ? true
                    : false
                }
                textOne={
                  item.informationBasic.assesseeNameFirst +
                  ' ' +
                  item.informationBasic.assesseeNameOther +
                  ' ' +
                  item.informationBasic.assesseeNameLast +
                  ' ' +
                  item.informationBasic.assesseeNameSuffix
                }
                textTwo={item.informationBasic.assesseeAlias}
                isTooltipActive={false}
                onClickEvent={openAssesseeListPopup}
              />
            </div>
          );
        })}
      {FilterMode === 'assesseeDistinctinactive' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
      <PopUpMiddlePaneList
        isActive={isPopUpValue === 'middlePaneListPopup'}
        onClickInformation={openAssesseeRightPaneInformation}
      />
    </div>
  );
};
export default AssesseeDistinctReviewList;
