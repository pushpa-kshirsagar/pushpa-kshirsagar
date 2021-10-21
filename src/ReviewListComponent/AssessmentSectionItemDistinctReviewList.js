import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  FILTERMODE_ENABLE,
  POPUP_OPEN,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_STATE,
  SET_SECTION_REDUCER_STATE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { ASSOCIATE_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import Card from '../Molecules/Card/Card';
import CrossIcon from '@material-ui/icons/Clear';
import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
import { assesseeStatus } from '../Actions/StatusAction';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { getItemGroupItemDistinctApiCall } from '../Actions/ItemModuleAction';

const AssessmentSectionItemDistinctReviewList = (props) => {
  const dispatch = useDispatch();
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const { countPage } = useSelector((state) => state.AssesseeCreateReducer);
  const {
    middlePaneSelectedValue,
    reviewListDistinctData,
    selectedAssociateInfo,
    relatedReviewListDistinctData,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    selectedTagsArray,
    isSelectActive,
    unselectedTagsArray,
    typeOfMiddlePaneList
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const {sectionInformation}=useSelector((state) => state.SectionCreateReducer);

  const onClickRevise = () => {
    console.log('ON CLICK REVISE ICON');
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    console.log('ON CLICK cancel ICON');
    setIsShowReviseIcon(true);
  };
  const onClickReviseFinish = () => {
    console.log('ON CLICK finish ICON', selectedTagsArray, unselectedTagsArray,reviewListDistinctData);
    setIsShowReviseIcon(true);
    let middlepaneName=relatedReviewListDistinctData[0].typeOfMiddlePaneList;
    if(middlepaneName==='assessmentSectionItemDistinctReviewList'){
      let existingItemId = sectionInformation.assessmentSectionItemDistinct.map((val) => {
        return val.itemId;
      });
      let unique1 = existingItemId.filter((o) => selectedTagsArray.indexOf(o) === -1);
      let unique2 = selectedTagsArray.filter((o) => existingItemId.indexOf(o) === -1);
      const unique = unique1.concat(unique2);

      console.log('unique1',unique);
      sectionInformation.assessmentSectionItemDistinct=[...existingItemId,...unique];
      dispatch({
        type:SET_SECTION_REDUCER_STATE,
        payload:sectionInformation
      })
    }else if(middlepaneName==='assessmentSectionTrialDistinctReviewList'){
      let existingItemId = sectionInformation.assessmentSectionItemTrial.map((val) => {
        return val.itemId;
      });
      let unique1 = existingItemId.filter((o) => selectedTagsArray.indexOf(o) === -1);
      let unique2 = selectedTagsArray.filter((o) => existingItemId.indexOf(o) === -1);
      const unique = unique1.concat(unique2);
      console.log('unique1',unique);
      sectionInformation.assessmentSectionItemTrial=[...existingItemId,...unique];
      dispatch({
        type:SET_SECTION_REDUCER_STATE,
        payload:sectionInformation
      })
    }
    if (typeOfMiddlePaneList !== '') {
      // dispatch({
      //   type: SET_MIDDLEPANE_STATE,
      //   payload: {
      //     middlePaneHeader: 'items',
      //     middlePaneHeaderBadgeOne: 'group',
      //     middlePaneHeaderBadgeTwo: 'active',
      //     middlePaneHeaderBadgeThree: '',
      //     middlePaneHeaderBadgeFour: '',
      //     typeOfMiddlePaneList: 'itemsGroupDistinctReviewList',
      //     scanCount: reviewListDistinctData.length,
      //     showMiddlePaneState: true
      //   }
      // });
      // dispatch({
      //   type: SET_MIDDLEPANE_STATE,
      //   payload: {
      //     middlePaneHeader: 'assessments',
      //     middlePaneHeaderBadgeOne: 'sections',
      //     middlePaneHeaderBadgeTwo: 'active',
      //     middlePaneHeaderBadgeThree: '',
      //     middlePaneHeaderBadgeFour: '',
      //     typeOfMiddlePaneList: 'assessmentDistinctReviewList',
      //     scanCount: reviewListDistinctData.length,
      //     showMiddlePaneState: true
      //   }
      // });
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
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: '' }
      });
    }
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'isSelectActive', value: '' }
    });
    dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    dispatch({ type: SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST, payload: selectedTagsArray });
    dispatch({
      type: SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
      payload: unselectedTagsArray
    });
  };
  const revisePrimaryIcon = [{ label: 'revise', onClick: onClickRevise, Icon: ReviseIcon }];

  const reviseSecondaryIcons = [
    { label: 'cancel', onClick: onClickReviseCancel, Icon: ClearIcon },
    { label: 'finish', onClick: onClickReviseFinish, Icon: Check }
  ];

  const closeRelatedList = () => {
    // dispatch({
    //   type: SET_MIDDLEPANE_STATE,
    //   payload: {
    //     middlePaneHeader: 'assessments',
    //     middlePaneHeaderBadgeOne: 'sections',
    //     middlePaneHeaderBadgeTwo: 'active',
    //     middlePaneHeaderBadgeThree: '',
    //     middlePaneHeaderBadgeFour: '',
    //     typeOfMiddlePaneList: 'assessmentsectionsReviewList',
    //     scanCount: reviewListDistinctData.length,
    //     showMiddlePaneState: true
    //   }
    // });
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

  const siftApiCall = (siftKey) => {
    getItemGroupItemDistinctApiCall(
      selectedAssociateInfo,
      siftKey,
      countPage,
      dispatch,
      middlePaneHeaderBadgeOne,
      listDistinctData.id,
      '',
      false
    );
    document.getElementById('middleComponentId').scrollTop = '0px';
  };
  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    if (siftValue === 'suspended' || siftValue === 'terminated') siftApiCall(siftValue);
    dispatch({ type: FILTERMODE_ENABLE });
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'sift', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList }
  ];

  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'item',
        popupHeaderOneBadgeOne: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: ASSOCIATE_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag'),
        selectedTagStatus: e.currentTarget.getAttribute('status')
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: ASSOCIATE_REVIEW_LIST_POPUP_OPTION
      }
    });
  };
  console.log('listDistinctData', listDistinctData);
  return (
    <div>
      {listDistinctData && (
        <Card
          textOneOne={listDistinctData.assessmentSectionName}
          textTwoOne={listDistinctData.assessmentSectionDescription}
          IconOne={CrossIcon}
          isIcon={true}
          labelTwoTwo={'section'}
          onClickIconOne={closeRelatedList}
          isAlliance
          relatedCardFixed={true}
          className={'iguru-iconboxSVG'}
        />
      )}
      {listDistinctData &&
        listDistinctData.item.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={item.id}
                isSelectedReviewList={middlePaneSelectedValue === item.id}
                status={item.informationEngagement.itemStatus}
                actualStatus={item.informationEngagement.itemStatus}
                textOne={item.informationBasic.itemName}
                textTwo={item.informationBasic.itemDescription}
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
      {FilterMode === 'assessmentSectionItemRevise' && (
        <FooterIconTwo
          FilterModeEnable={isShowReviseIcon}
          FilterMode={FilterMode}
          onClick={onClickRevise}
          primaryIcon={revisePrimaryIcon}
          secondaryIcon={reviseSecondaryIcons}
        />
      )}
      {FilterMode === 'itemGroupItemDistinctinactive' && (
        <FooterIconTwo
          FilterModeEnable={isShowReviseIcon}
          FilterMode={FilterMode}
          onClick={onClickRevise}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
    </div>
  );
};
export default AssessmentSectionItemDistinctReviewList;
