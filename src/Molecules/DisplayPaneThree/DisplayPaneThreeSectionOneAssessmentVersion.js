import React from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import {
  FILTERMODE,
  GET_ALLOCATE_ITEM_GROUP,
  LOADER_START,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PANE_THREE_ASSESSMENT_VERSION_PREVIEW_MODE
} from '../../actionType';
import { makeItemGroupObj } from '../../Actions/GenericActions';
import DisplayPanelAccordianReviewListTwo from '../Accordian/DisplayPanelAccordianReviewListTwo';

const DisplayPaneThreeSectionOneAssessmentVersion = () => {
  const dispatch = useDispatch();
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedTagValue } = useSelector((state) => state.PopUpReducer);
  const { assessmentResponseObject } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { selectedAssociateInfo, relatedReviewListDistinctData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  let sectionArr = [];
  assessmentResponseObject?.informationFramework?.assessmentSection.map((comm, index) => {
    sectionArr.push({
      labelTextOneOneBadge: index + 1,
      innerLabelBadgeList: [
        {
          labelTextTwoBadge: 'item',
          innerList: []
        },
        {
          labelTextTwoBadge: 'preview',
          innerList: []
        }
      ]
    });
  });
  let sectionPreviewArr = [];
  assessmentResponseObject?.informationFramework?.assessmentSection.map((comm, index) => {
    sectionPreviewArr.push({
      labelTextTwoBadge: index + 1,
      innerLabelBadgeList: []
    });
  });
  const frameworkAll = [
    {
      id: 'preview-section',
      labelTextOneOne: 'preview',
      labelTextOneOneBadges: [
        { labelTextOneOneBadge: 'sections', innerLabelBadgeList: sectionPreviewArr }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null,
      isMultiList: true,
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a4',
      labelTextOneOne: 'section',
      labelTextOneOneBadges: sectionArr,
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null,
      isMultiList: true,
      isListCard: true,
      isReviewLink: true
    }
  ];
  const reviseFramework = (e, selectedBadgeArray) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
    console.log('selectedBadgeName', selectedBadgeName);
    console.log('innerSelectedBadgeName', innerSelectedBadgeName);
    if (labelName === 'section' && selectedBadgeName !== '' && innerSelectedBadgeName === 'group') {
      let requestObect = makeItemGroupObj(selectedAssociateInfo, 'active', -1, -1);
      let revisedGroupObject = {
        id: relatedReviewListDistinctData[0].id,
        assessmentSectionName: responseObject.assessmentSectionName,
        assessmentSectionDescription: responseObject.assessmentSectionDescription
      };
      let existingItemId = [];
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assessmentSectionItemGroupRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ALLOCATE_ITEM_GROUP,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingItemId: existingItemId,
          typeOfMiddlePaneList: 'assessmentSectionItemGroupDistinctReviewList'
        }
      });
    }
    if (labelName === 'section' && selectedBadgeName !== '' && innerSelectedBadgeName === 'item') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'assessmentSelecedSection', value: selectedBadgeName - 1 }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'assessmentSelecedVersion', value: selectedTagValue }
      });
      let revisedGroupObject = {
        id: assessmentResponseObject.id,
        assessmentSectionName: responseObject.assessmentVersionName,
        assessmentSectionDescription: responseObject.assessmentVersionDescription,
        item: assessmentResponseObject?.informationFramework?.assessmentItemDistinct
      };

      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      let selectedSecSection =
        assessmentResponseObject?.informationFramework?.assessmentSection[selectedBadgeName - 1];
      let selectedVersion = selectedSecSection.assessmentVersion[selectedTagValue];
      let existingItemId =
        selectedVersion?.assessmentVersionItemDistinct &&
        selectedVersion?.assessmentVersionItemDistinct?.map((val) => {
          return val.itemTagPrimary;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assessmentSectionItemRevise' }
      });
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'items',
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assessmentSectionItemDistinctReviewList',
          scanCount: assessmentResponseObject.informationFramework?.assessmentItemDistinct.length,
          showMiddlePaneState: true,
          isSelectActive: 'multiple',
          selectedTagsArray: existingItemId
        }
      });
      dispatch({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [revisedGroupObject] });
    }
    if (
      labelName === 'preview' &&
      selectedBadgeName === 'sections' &&
      innerSelectedBadgeName !== ''
    ) {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'assessmentSelecedSection', value: innerSelectedBadgeName - 1 }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'assessmentSelecedVersion', value: selectedTagValue }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'assessmentSelecedSectionVersionData',
          value:
            assessmentResponseObject.informationFramework.assessmentSection[
              innerSelectedBadgeName - 1
            ].assessmentVersion[selectedTagValue]
        }
      });
      setTimeout(function () {
        dispatch({ type: SET_PANE_THREE_ASSESSMENT_VERSION_PREVIEW_MODE, payload: true });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
      }, 1000);
    }
    if (
      labelName === 'section' &&
      selectedBadgeName !== '' &&
      innerSelectedBadgeName === 'preview'
    ) {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'assessmentSelecedSection', value: selectedBadgeName - 1 }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'assessmentSelecedVersion', value: selectedTagValue }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'assessmentSelecedSectionVersionData',
          value:
            assessmentResponseObject.informationFramework.assessmentSection[selectedBadgeName - 1]
              .assessmentVersion[selectedTagValue]
        }
      });
      setTimeout(function () {
        dispatch({ type: SET_PANE_THREE_ASSESSMENT_VERSION_PREVIEW_MODE, payload: true });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
      }, 1000);
    }
  };

  const onClickReview = (e, badge) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
    if (labelName === 'section' && selectedBadgeName !== '' && innerSelectedBadgeName === 'item') {
      let selectedSecSection =
        assessmentResponseObject?.informationFramework?.assessmentSection[selectedBadgeName - 1];
      let selectedVersion = selectedSecSection.assessmentVersion[selectedTagValue];
      console.log('selectedVersion', selectedVersion);

      let reviseResponseObj = {
        countTotal: selectedVersion?.assessmentVersionItemDistinct.length || 0,
        responseObject: [
          {
            item: selectedVersion?.assessmentVersionItemDistinct || [],
            id: relatedReviewListDistinctData[0].id,
            assessmentSectionName: selectedVersion.assessmentVersionName,
            assessmentSectionDescription: selectedVersion.assessmentVersionDescription
          }
        ]
      };
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({
        type: RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: reviseResponseObj.responseObject
      });
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'item',
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assessmentSectionItemDistinctReviewList',
          middlePaneSelectedValue: '',
          scanCount: reviseResponseObj && reviseResponseObj.countTotal,
          showMiddlePaneState: true
        }
      });
    }
    if (
      labelName === 'preview' &&
      selectedBadgeName === 'sections' &&
      innerSelectedBadgeName !== ''
    ) {
      let reviseResponseObj = {
        countTotal: responseObject?.assessmentVersionItemDistinct.length || 0,
        responseObject: [
          {
            item: responseObject?.assessmentVersionItemDistinct || [],
            id: relatedReviewListDistinctData[0].id,
            assessmentSectionName: responseObject.assessmentVersionName,
            assessmentSectionDescription: responseObject.assessmentVersionDescription
          }
        ]
      };
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({
        type: RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: reviseResponseObj.responseObject
      });
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'item',
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assessmentSectionItemDistinctReviewList',
          middlePaneSelectedValue: '',
          scanCount: reviseResponseObj && reviseResponseObj.countTotal,
          showMiddlePaneState: true
        }
      });
    }
    if (
      labelName === 'section' &&
      selectedBadgeName !== '' &&
      innerSelectedBadgeName === 'preview'
    ) {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'assessmentSelecedSection', value: selectedBadgeName - 1 }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'assessmentSelecedVersion', value: selectedTagValue }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'assessmentSelecedSectionVersionData',
          value:
            assessmentResponseObject.informationFramework.assessmentSection[selectedBadgeName - 1]
              .assessmentVersion[selectedTagValue]
        }
      });
      setTimeout(function () {
        dispatch({ type: SET_PANE_THREE_ASSESSMENT_VERSION_PREVIEW_MODE, payload: true });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
      }, 1000);
    }
    if (
      labelName === 'preview' &&
      innerSelectedBadgeName !== '' &&
      selectedBadgeName === 'sections'
    ) {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'assessmentSelecedSection', value: innerSelectedBadgeName - 1 }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'assessmentSelecedVersion', value: selectedTagValue }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'assessmentSelecedSectionVersionData',
          value:
            assessmentResponseObject.informationFramework.assessmentSection[
              innerSelectedBadgeName - 1
            ].assessmentVersion[selectedTagValue]
        }
      });
      setTimeout(function () {
        dispatch({ type: SET_PANE_THREE_ASSESSMENT_VERSION_PREVIEW_MODE, payload: true });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
      }, 1000);
    }
    // if (labelName === 'preview') {
    //   dispatch({ type: SET_PANE_THREE_ASSESSMENT_VERSION_PREVIEW_MODE, payload: true });
    //   dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
    // }
  };
  return (
    <div
      style={{
        height: 'calc(100vh - 355px)',
        overflow: 'overlay'
      }}
    >
      <>
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            {frameworkAll.map((ob) => {
              return (
                <div key={ob.id}>
                  {/* {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                      onClickReview={onClickReview}
                      onClickRevise={reviseFramework}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      accordianObject={ob}
                      mode={reviewMode}
                      onClickReview={onClickReview}
                      onClickRevise={reviseFramework}
                    />
                  )} */}
                  {ob.isListCard ? (
                    <>
                      {ob.isMultiList ? (
                        <DisplayPanelAccordianReviewListTwo
                          onClickReview={onClickReview}
                          onClickRevise={reviseFramework}
                          accordianObject={ob}
                          mode={reviewMode}
                        />
                      ) : (
                        <DisplayPanelAccordianReviewListOne
                          className=""
                          accordianObject={ob}
                          mode={reviewMode}
                          onClickReview={onClickReview}
                          onClickRevise={reviseFramework}
                        />
                      )}
                    </>
                  ) : (
                    <DisplayPanelAccordianInformation
                      accordianObject={ob}
                      mode={reviewMode}
                      onClickReview={onClickReview}
                      onClickRevise={reviseFramework}
                    />
                  )}
                </div>
              );
            })}
          </Paper>
        </div>
      </>
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionOneAssessmentVersion;
