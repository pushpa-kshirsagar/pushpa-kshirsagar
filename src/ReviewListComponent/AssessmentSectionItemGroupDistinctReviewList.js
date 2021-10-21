import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import Card from '../Molecules/Card/Card';
import CrossIcon from '@material-ui/icons/Clear';
import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const AssessmentSectionItemGroupDistinctReviewList = (props) => {
  const dispatch = useDispatch();
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const {
    middlePaneSelectedValue,
    reviewListDistinctData,
    relatedReviewListDistinctData,
    selectedTagsArray,
    isSelectActive,
    unselectedTagsArray,
    typeOfMiddlePaneList
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterMode } = useSelector((state) => state.FilterReducer);

  const onClickRevise = () => {
    console.log('ON CLICK REVISE ICON');
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    console.log('ON CLICK cancel ICON');
    setIsShowReviseIcon(true);
  };
  const onClickReviseFinish = () => {
    console.log('ON CLICK finish ICON', selectedTagsArray, unselectedTagsArray);
    setIsShowReviseIcon(true);
    if (typeOfMiddlePaneList !== '') {
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'items',
          middlePaneHeaderBadgeOne: 'group',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'itemsGroupDistinctReviewList',
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
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const listDistinctData = relatedReviewListDistinctData[0];
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
        listDistinctData.itemGroup.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={item.id}
                isSelectedReviewList={middlePaneSelectedValue === item.id}
                status={item.informationEngagement.itemGroupStatus}
                actualStatus={item.informationEngagement.itemGroupStatus}
                textOne={item.informationBasic.itemGroupName}
                textTwo={item.informationBasic.itemGroupDescription}
                isTooltipActive={false}
                // onClickEvent={openListPopup}
                isSelectActive={isSelectActive}
                isSelected={selectedTagsArray.includes(item.id)}
                onClickCheckBox={(event) => {
                  onClickCheckBoxSelection(selectedTagsArray, unselectedTagsArray, event, dispatch);
                }}
              />
            </div>
          );
        })}
      {FilterMode === 'assessmentSectionItemGroupRevise' && (
        <FooterIconTwo
          FilterModeEnable={isShowReviseIcon}
          FilterMode={FilterMode}
          onClick={onClickRevise}
          primaryIcon={revisePrimaryIcon}
          secondaryIcon={reviseSecondaryIcons}
        />
      )}
    </div>
  );
};
export default AssessmentSectionItemGroupDistinctReviewList;
