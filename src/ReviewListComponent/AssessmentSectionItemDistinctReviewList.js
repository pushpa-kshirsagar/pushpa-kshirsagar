import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  FILTERMODE_ENABLE,
  LOADER_START,
  LOADER_STOP,
  POPUP_OPEN,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST,
  SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_STATE,
  SET_RELATED_REQUEST_OBJECT,
  SET_SECTION_REDUCER_STATE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST,
  SET_VERSION_REDUCER_STATE
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
    typeOfMiddlePaneList,
    assessmentResponseObject,
    relatedReviewListReqObj
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const { sectionInformation } = useSelector((state) => state.SectionCreateReducer);
  const { versionInformation } = useSelector((state) => state.VersionCreateReducer);

  const setPrevList = () => {
    dispatch({ type: LOADER_START });
    let array =
      assessmentResponseObject?.informationFramework?.assessmentSection[0].assessmentVersion || [];
    // let array = assessmentResponseObject?.informationFramework?.assessmentSection || [];
    let reviseResponseObj = {
      countTotal: array.length || 0,
      responseObject: [
        {
          // sections: array || [],
          versions: array || [],
          assessmentName: assessmentResponseObject?.informationBasic.assessmentName,
          assessmentDescription: assessmentResponseObject?.informationBasic.assessmentDescription,
          assessmentStatus: assessmentResponseObject?.informationEngagement.assessmentStatus,
          id: assessmentResponseObject?.id
        }
      ]
    };
    setTimeout(function () {
      dispatch({
        type: SET_RELATED_REQUEST_OBJECT,
        payload: relatedReviewListReqObj
      });
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'assessments',
          middlePaneHeaderBadgeOne: 'version',
          middlePaneHeaderBadgeTwo: 'distinct',
          middlePaneHeaderBadgeThree: 'active',
          middlePaneHeaderBadgeFour: '',
          // typeOfMiddlePaneList: 'assessmentsectionsReviewList',
          typeOfMiddlePaneList: 'assessmentversionsReviewList',
          scanCount: reviseResponseObj.countTotal,
          showMiddlePaneState: true
        }
      });
      dispatch({
        type: RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: reviseResponseObj.responseObject
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: '' }
      });
    }, 2000);
    dispatch({ type: LOADER_STOP });
  };
  const onClickRevise = () => {
    console.log('ON CLICK REVISE ICON');
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    setPrevList();
    setIsShowReviseIcon(true);
  };
  const onClickReviseFinish = () => {
    console.log(
      'ON CLICK finish ICON',
      selectedTagsArray,
      unselectedTagsArray,
      reviewListDistinctData
    );
    setIsShowReviseIcon(true);
    let middlepaneName = typeOfMiddlePaneList;
    if (middlepaneName === 'assessmentSectionItemDistinctReviewList') {
      // sectionInformation.assessmentSectionItemDistinct = selectedTagsArray;
      // dispatch({
      //   type: SET_SECTION_REDUCER_STATE,
      //   payload: sectionInformation
      // });
      console.log('selectedTagsArray',selectedTagsArray);
      versionInformation.assessmentVersionItemDistinct = selectedTagsArray;
      dispatch({
        type: SET_VERSION_REDUCER_STATE,
        payload: versionInformation
      });
    } else if (middlepaneName === 'assessmentSectionTrialDistinctReviewList') {
      sectionInformation.assessmentSectionItemTrial = selectedTagsArray;
      dispatch({
        type: SET_SECTION_REDUCER_STATE,
        payload: sectionInformation
      });
    }
    if (typeOfMiddlePaneList !== '') {
      setPrevList();
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
    setPrevList();
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
          labelTwoTwo={'version'}
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
                tag={item?.id || item?.itemId}
                isSelectedReviewList={middlePaneSelectedValue === item?.id}
                status={item.informationEngagement?.itemStatus || 'published'}
                actualStatus={item.informationEngagement?.itemStatus}
                textOne={item.informationBasic?.itemName}
                textTwo={item.informationBasic?.itemDescription}
                isTooltipActive={false}
                onClickEvent={openListPopup}
                isSelectActive={isSelectActive}
                isSelected={selectedTagsArray.includes(item?.id || item?.itemId)}
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
