import React from 'react';
import { isMobile } from 'react-device-detect';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  FILTERMODE,
  GET_ALLOCATE_ITEM,
  GET_ALLOCATE_ITEM_GROUP,
  LOADER_START,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_ASSESSMENT_SINGLE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE,
  SET_PANE_THREE_ASSESSMENT_SECTION_PREVIEW_MODE,
  SET_PANE_THREE_ASSESSMENT_VERSION_PREVIEW_MODE,
  SET_PANE_THREE_PREVIEW_MODE,
  SET_POPUP_VALUE
} from '../../actionType';
import { convertSecondsToHMmSs, makeItemGroupObj, makeItemObj } from '../../Actions/GenericActions';
import DisplayPanelAccordianReviewListTwo from '../Accordian/DisplayPanelAccordianReviewListTwo';

const DisplayPaneThreeSectionOneAssessmentVersion = () => {
  const dispatch = useDispatch();
  const { responseObject, reviewMode, relatedReviewListPaneThree } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
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
          labelTextTwoBadge: 'group',
          innerList: []
        }
      ]
    });
  });
  const frameworkAll = [
    // {
    //   id: 'a4',
    //   labelTextOneOne: 'items',
    //   isListCard: true,
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: 'distinct',
    //       innerList: []
    //     },
    //     {
    //       labelTextOneOneBadge: 'group',
    //       innerList: []
    //     }
    //   ],
    //   innerAssociateList: [],
    //   innerInfo: 'No Information',
    //   IconOne: null
    // },
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
    },
    {
      id: 'preview-section',
      labelTextOneOne: 'preview',
      innerAssociateList: [],
      innerInfo: '',
      isListCard: false,
      IconOne: null,
      isReviewLink: true
    }
  ];
  const reviseFramework = (e, selectedBadgeArray) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
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
      let requestObect = makeItemObj(selectedAssociateInfo, 'active', -1, -1);
      let revisedGroupObject = {
        id: relatedReviewListDistinctData[0].id,
        assessmentSectionName: responseObject.assessmentVersionName,
        assessmentSectionDescription: responseObject.assessmentVersionDescription,
        typeOfMiddlePaneList: 'assessmentSectionItemDistinctReviewList'
      };
      // let existingItemId = [];
      let existingItemId =
        responseObject?.assessmentVersionItemDistinct &&
        responseObject?.assessmentVersionItemDistinct?.map((val) => {
          return val.itemId;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assessmentSectionItemRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ALLOCATE_ITEM,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingItemId: existingItemId,
          typeOfMiddlePaneList: 'assessmentSectionItemDistinctReviewList'
        }
      });
    }
    if (labelName === 'preview') {
      dispatch({ type: SET_PANE_THREE_ASSESSMENT_VERSION_PREVIEW_MODE, payload: true });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
    }
  };

  const onClickReview = (e, badge) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
    if (labelName === 'section' && selectedBadgeName !== '' && innerSelectedBadgeName === 'item') {
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
    if (labelName === 'section' && selectedBadgeName !== '' && innerSelectedBadgeName === 'group') {
      let reviseResponseObj = {
        countTotal: 0,
        responseObject: [
          {
            itemGroup: [],
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
          middlePaneHeaderBadgeOne: 'group',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assessmentSectionItemGroupDistinctReviewList',
          middlePaneSelectedValue: '',
          scanCount: reviseResponseObj && reviseResponseObj.countTotal,
          showMiddlePaneState: true
        }
      });
    }
    if (labelName === 'preview') {
      dispatch({ type: SET_PANE_THREE_ASSESSMENT_VERSION_PREVIEW_MODE, payload: true });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
    }
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
