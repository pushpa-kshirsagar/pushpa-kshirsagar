import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSOCIATE_POPUP_CLOSE,
  ASSOCIATE_REVIEW_DISTINCT_SAGA,
  FILTERMODE_ENABLE,
  GET_ASSOCIATE_INFO_SAGA,
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
import { makeAssociateReviewListRequestObject } from '../Actions/GenericActions';
import { assesseeStatus } from '../Actions/StatusAction';
import { ASSOCIATE_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import PopUpMiddlePaneList from '../PopUpDisplayPanel/PopUpMiddlePaneList';
const AssociateDistinctReviewList = (props) => {
  const { popupAllClose } = props;
  const dispatch = useDispatch();
  const { secondaryOptionCheckValue } = useSelector((state) => state.AssociateCreateReducer);
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
  const {
    isPopUpValue,
    selectedTagValue,
    secondaryOptionCheckValue: popUpSecondaryOptionCheckValue
  } = useSelector((state) => state.PopUpReducer);
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
        type: ASSOCIATE_REVIEW_DISTINCT_SAGA,
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
    let requestObect = makeAssociateReviewListRequestObject(siftKey, 0, countPage);
    dispatch({ type: SET_PAGE_COUNT, payload: 1 });
    dispatch({ type: LOADER_START });
    dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
    dispatch({
      type: ASSOCIATE_REVIEW_DISTINCT_SAGA,
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
  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'associate',
        popupHeaderOneBadgeOne: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: ASSOCIATE_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag')
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: ASSOCIATE_REVIEW_LIST_POPUP_OPTION
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
  };
  const openAssociateRightPaneInformation = () => {
    console.log(selectedTagValue);
    dispatch({ type: LOADER_START });
    dispatch({
      type: GET_ASSOCIATE_INFO_SAGA,
      payload: {
        secondaryOptionCheckValue: popUpSecondaryOptionCheckValue,
        reqBody: {
          assesseeId: '0123456',
          associateId: '605091f81edc573048fb467a', //605255729d3c823d3964e0ec
          filter: true,
          search: [
            {
              condition: 'and',
              searchBy: [
                {
                  dataType: 'String',
                  conditionColumn: 'id',
                  conditionValue: {
                    condition: 'eq',
                    value: {
                      from: selectedTagValue
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'middlePaneSelectedValue', value: selectedTagValue }
    });
    dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
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
                  item.informationEngagement.associateTag
                    ? item.informationEngagement.associateTag.associateTagPrimary
                    : item
                }
                isSelectedReviewList={
                  middlePaneSelectedValue ===
                  item.informationEngagement.associateTag?.associateTagPrimary
                    ? true
                    : false
                }
                status={assesseeStatus(
                  middlePaneHeaderBadgeOne,
                  item.informationEngagement.associateStatus
                )}
                textOne={item.informationBasic.associateName}
                textTwo={item.informationBasic.associateDescription}
                isTooltipActive={false}
                onClickEvent={openListPopup}
              />
            </div>
          );
        })}
      {FilterMode === 'associateDistinctinactive' && (
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
        onClickInformation={openAssociateRightPaneInformation}
      />
    </div>
  );
};
export default AssociateDistinctReviewList;
