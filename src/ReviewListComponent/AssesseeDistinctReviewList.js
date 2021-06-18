import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSESSEE_INFO_CREATE,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  FILTERMODE,
  FILTERMODE_ENABLE,
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
import { makeAssesseeReviewListRequestObject } from '../Actions/GenericActions';
import { assesseeStatus } from '../Actions/StatusAction';
import { ASSESSEE_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {
  onClickCheckBoxSelection,
  onClickFlagSelection,
  setFlagedArray
} from '../Actions/AssesseeModuleAction';
const AssesseeDistinctReviewList = (props) => {
  const { popupAllClose } = props;
  const dispatch = useDispatch();
  const { secondaryOptionCheckValue } = useSelector((state) => state.AssesseeCreateReducer);
  const {
    numberPage,
    scanCount,
    countPage,
    middlePaneHeader,
    middlePaneHeaderBadgeTwo,
    reviewListDistinctData,
    reviewListReqObj,
    middlePaneSelectedValue,
    typeOfMiddlePaneList,
    selectedAssociateInfo,
    isSelectActive,
    selectedTagsArray,
    unselectedTagsArray,
    selectedFlagedArray,
    unselectedFlagedArray,
    flagedValue
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
          HeaderOne: middlePaneHeader,
          BadgeOne: 'distinct',
          BadgeTwo: secondaryOptionCheckValue
        }
      });
      dispatch({ type: SET_PAGE_COUNT, payload: numberPage + 1 });
    }
  };
  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  useEffect(() => {
    setFlagedArray(reviewListDistinctData, 'assesseeFlag', dispatch);
  }, [reviewListDistinctData]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };
  const siftApiCall = (siftKey) => {
    let requestObect = makeAssesseeReviewListRequestObject(
      selectedAssociateInfo,
      siftKey,
      0,
      countPage
    );
    dispatch({ type: LOADER_START });
    dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
    dispatch({
      type: ASSESSEE_REVIEW_DISTINCT_SAGA,
      payload: {
        request: requestObect,
        HeaderOne: middlePaneHeader,
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
    ) {
      siftApiCall(siftValue);
      dispatch({ type: FILTERMODE_ENABLE });
    } else if (siftValue === 'flagCancel') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'flagedValue', value: '' }
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeDistinct' + middlePaneHeaderBadgeTwo }
      });
    } else if (siftValue === 'flagFinish') {
      console.log('api call for multiple flag assessee');
    } else {
      dispatch({ type: FILTERMODE_ENABLE });
    }
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'sift', onClick: onClickFooter, Icon: FilterList }];
  const flagPrimaryIcon = [{ label: 'flag', onClick: onClickFooter, Icon: FilterList }];
  const flagSecondaryIcon = [
    { label: 'cancel', dataValue: 'flagCancel', onClick: onClickFooter, Icon: ClearIcon },
    { label: 'finish', dataValue: 'flagFinish', onClick: onClickFooter, Icon: Check }
  ];
  const secondaryIcon = [
    { label: 'disapproved', onClick: onClickFooter, Icon: FilterList },
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList },
    { label: 'unapproved', onClick: onClickFooter, Icon: FilterList },
    { label: 'unconfirmed', onClick: onClickFooter, Icon: FilterList }
  ];
  const openAssesseeListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    let popupHeaderOne =
      typeOfMiddlePaneList === 'administratorsDistinctReviewList'
        ? 'administrator'
        : typeOfMiddlePaneList === 'managersDistinctReviewList'
        ? 'manager'
        : 'assessee';
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: popupHeaderOne,
        popupHeaderOneBadgeOne: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: ASSESSEE_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag'),
        selectedTagStatus: e.currentTarget.getAttribute('status'),
        isFlaged: e.currentTarget.getAttribute('data-flag') === 'true' ? true : false
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'middlePaneListPopupOptions', value: ASSESSEE_REVIEW_LIST_POPUP_OPTION }
    });
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
                  middlePaneHeaderBadgeTwo,
                  item.informationEngagement.assesseeStatus
                )}
                actualStatus={item.informationEngagement.assesseeStatus}
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
                isFlagActive={selectedFlagedArray.includes(
                  item.informationEngagement.assesseeTag?.assesseeTagPrimary
                )}
                flagedValue={flagedValue}
                isSelectActive={isSelectActive}
                isSelected={selectedTagsArray.includes(
                  item.informationEngagement.assesseeTag?.assesseeTagPrimary
                )}
                onClickCheckBox={(event) => {
                  onClickCheckBoxSelection(selectedTagsArray, unselectedTagsArray, event, dispatch);
                }}
                onClickAddFladed={(event) => {
                  onClickFlagSelection(selectedFlagedArray, unselectedFlagedArray, event, dispatch);
                }}
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
      {FilterMode === 'assesseeFlag' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={flagPrimaryIcon}
          secondaryIcon={flagSecondaryIcon}
        />
      )}
    </div>
  );
};
export default AssesseeDistinctReviewList;
