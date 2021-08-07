import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import Manuscript from '@material-ui/icons/Description';
import { makeAssesseeReviewListRequestObject, makeItemObj } from '../../Actions/GenericActions';
import {
  FILTERMODE,
  GET_ALLOCATE_ITEM,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PANE_THREE_PREVIEW_MODE,
  SET_POPUP_VALUE
} from '../../actionType';

const DisplayPaneThreeSectionTwoAssessment = () => {
  const [listExpand, setListExpand] = useState('');
  const { headerOneBadgeTwo, reviewMode, responseObject, relatedReviewListPaneThree } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, countPage, reviewListDistinctData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const { informationFramework } = responseObject;
  const dispatch = useDispatch();
  const frameworkAll = [
    // {
    //   id: 'a1',
    //   labelTextOneOne: 'communiqué',
    //   isListCard: true,
    //   labelTextOneOneBadgeOne: 'primary',
    //   labelTextOneOneBadgeTwo: 'secondary',
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: 'primary',
    //       innerList:
    //         informationFramework?.assessmentCommunique?.assessmentCommuniquePrimary ||
    //         'No Information'
    //     },
    //     {
    //       labelTextOneOneBadge: 'secondary',
    //       innerList:
    //         informationFramework?.assessmentCommunique?.assessmentCommuniqueSecondary ||
    //         'No Information'
    //     }
    //   ],
    //   innerAssociateList: [],
    //   innerInfo: 'No Information',
    //   IconOne: null
    // },
    {
      id: 'aid',
      labelTextOneOne: 'aid',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'calculator',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'spredsheet',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'textsheet',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'administration',
      labelTextOneOne: 'administration',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'proctored',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'supervised',
          textOne: ''
        },
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a1',
      labelTextOneOne: 'communiqué',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a4',
      labelTextOneOne: 'items',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'header',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'navigation',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'practice',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'total',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    // {
    //   id: 'a1',
    //   labelTextOneOne: 'manuscript',
    //   isListCard: true,
    //   labelTextOneOneBadgeOne: '',
    //   labelTextOneOneBadgeTwo: '',
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: '',
    //       innerList: informationFramework?.assessmentManuscript || 'No Information'
    //     }
    //   ],
    //   innerAssociateList: [],
    //   innerInfo: 'No Information',
    //   IconOne: null
    // },
    {
      id: 'm1',
      labelTextOneOne: 'manuscript',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'preview-assessment',
      labelTextOneOne: 'preview',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: ''
        },
        {
          labelTextOneOneBadge: '',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: null
    },
    {
      id: 'response',
      labelTextOneOne: 'response',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'header',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'revision',
          textOne: ''
        },
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a4',
      labelTextOneOne: 'score',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'minimum',
          textOne: informationFramework?.assessmentScore?.assessmentScoreMinimum || ''
        },
        {
          labelTextOneOneBadge: 'maximum',
          textOne: informationFramework?.assessmentScore?.assessmentScoreMaximum || ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a5',
      labelTextOneOne: 'section',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '1',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'synopsis',
      labelTextOneOne: 'synopsis',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: ''
        },
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a6',
      labelTextOneOne: 'time',
      isListCard: false,
      textOneOne: informationFramework?.assessmentTime || 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    }
  ];
  const frameworkKey = [
    {
      id: 'a2',
      labelTextOneOne: 'item',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'total',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a4',
      labelTextOneOne: 'score',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'minimum',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'total',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a5',
      labelTextOneOne: 'section',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '1',
          textOne: ''
        },
        {
          labelTextOneOneBadge: '2',
          textOne: ''
        },
        {
          labelTextOneOneBadge: '3',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a6',
      labelTextOneOne: 'time',
      isListCard: false,
      textOneOne: 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    }
  ];
  const frameworkPlusAll = [
    {
      id: 'a2',
      labelTextOneOne: 'timeline',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'start',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne: 'No Information'
        }
      ],
      labelTextOneOneBadgeTwo: '',
      innerAssociateList: [],
      innerInfo: '',
      IconOne: null
    }
  ];

  const onClickReview = (headerOne, badgeOne) => {
    if (headerOne === 'communiqué' && badgeOne === 'primary') {
      dispatch({
        type: SET_PANE_THREE_PREVIEW_MODE,
        payload: {
          isPreviewShow: true,
          previewHeaderOne: 'assessment',
          previewHeaderOneBadgeOne: 'communiqué',
          previewHeaderOneBadgeTwo: 'primary',
          previewHeaderOneBadgeThree: '',
          previewInnerHTML:
            informationFramework?.assessmentCommunique?.assessmentCommuniquePrimary || ''
        }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
    }
    if (headerOne === 'communiqué' && badgeOne === 'secondary') {
      dispatch({
        type: SET_PANE_THREE_PREVIEW_MODE,
        payload: {
          isPreviewShow: true,
          previewHeaderOne: 'assessment',
          previewHeaderOneBadgeOne: 'communiqué',
          previewHeaderOneBadgeTwo: 'secondary',
          previewHeaderOneBadgeThree: '',
          previewInnerHTML:
            informationFramework?.assessmentCommunique?.assessmentCommuniqueSecondary || ''
        }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
    }
    if (headerOne === 'manuscript' && badgeOne === 'primary') {
      dispatch({
        type: SET_PANE_THREE_PREVIEW_MODE,
        payload: {
          isPreviewShow: true,
          previewHeaderOne: 'assessment',
          previewHeaderOneBadgeOne: 'manuscript',
          previewHeaderOneBadgeTwo: 'primary',
          previewHeaderOneBadgeThree: '',
          previewInnerHTML:
            informationFramework?.assessmentManuscript?.assessmentManuscriptPrimary || ''
        }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
    }
    if (headerOne === 'manuscript' && badgeOne === 'secondary') {
      dispatch({
        type: SET_PANE_THREE_PREVIEW_MODE,
        payload: {
          isPreviewShow: true,
          previewHeaderOne: 'assessment',
          previewHeaderOneBadgeOne: 'manuscript',
          previewHeaderOneBadgeTwo: 'secondary',
          previewHeaderOneBadgeThree: '',
          previewInnerHTML:
            informationFramework?.assessmentManuscript?.assessmentManuscriptSecondary || ''
        }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
    }
  };
  const reviseFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'communiqué' && selectedBadgeName === 'primary') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ASSESSMENT_COMMUNIQUE_PRIMARY_TEXTSHEET_POPUP',
          popupMode: 'ASSESSMENTCREATE'
        }
      });
    }
    if (labelName === 'communiqué' && selectedBadgeName === 'secondary') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ASSESSMENT_COMMUNIQUE_SECONDARY_TEXTSHEET_POPUP',
          popupMode: 'ASSESSMENTCREATE'
        }
      });
    }
    if (labelName === 'manuscript' && selectedBadgeName === 'primary') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ASSESSMENT_MANUSCRIPT_PRIMARY_TEXTSHEET_POPUP',
          popupMode: 'ASSESSMENTCREATE'
        }
      });
    }
    if (labelName === 'manuscript' && selectedBadgeName === 'secondary') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ASSESSMENT_MANUSCRIPT_SECONDARY_TEXTSHEET_POPUP',
          popupMode: 'ASSESSMENTCREATE'
        }
      });
    }
    if (labelName === 'score' && selectedBadgeName === 'maximum') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'SCOREMAXIMUMPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'score' && selectedBadgeName === 'minimum') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'SCOREMINIMUMPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'time') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'TIMEASSESSMENTPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'timeline' && selectedBadgeName === 'start') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'TIMELINESTARTPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'timeline' && selectedBadgeName === 'end') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'TIMELINEENDPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'items' && selectedBadgeName === 'distinct') {
      let requestObect = makeItemObj(selectedAssociateInfo, 'active', countPage, 0);
      let revisedGroupObject = {
        id: responseObject.id,
        assessmentName: responseObject.informationBasic.assessmentName,
        assessmentDescription: responseObject.informationBasic.assessmentDescription,
        assessmentStatus: responseObject.informationEngagement.assessmentStatus
      };
      console.log('relatedReviewListPaneThree', relatedReviewListPaneThree);
      let existingItemId = informationFramework?.assessmentItem || [];
      // relatedReviewListPaneThree &&
      // relatedReviewListPaneThree.item.map((val) => {
      //   return val.id;
      // });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assessmentItemRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ITEM,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingItemId: existingItemId,
          typeOfMiddlePaneList: 'assessmentItemReviewList'
        }
      });
    }
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 355px)',
        overflow: 'overlay'
      }}
    >
      {headerOneBadgeTwo === 'all' ? (
        <>
          <div className={'containerPadding'}>
            <AllocationAccordian
              headerOne="framework"
              isDisplayCardExpanded={listExpand === 'framework'}
              setListExpand={setListExpand}
              list={frameworkAll}
              mode={reviewMode}
              onClickRevise={reviseFramework}
              onClickReview={onClickReview}
            />
          </div>
          <div className={'containerPadding'}>
            <AllocationAccordian
              headerOne="framework+"
              isDisplayCardExpanded={listExpand === 'framework+'}
              setListExpand={setListExpand}
              list={frameworkPlusAll}
              mode={reviewMode}
              onClickRevise={reviseFramework}
            />
          </div>
        </>
      ) : (
        <>
          <div className={'containerPadding'}>
            <Paper className={'dossierContainerTop'}>
              {frameworkKey.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <DisplayPanelAccordianReviewListOne
                        onClickRevise={reviseFramework}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <DisplayPanelAccordianInformation
                        onClickRevise={reviseFramework}
                        accordianObject={ob}
                        mode={reviewMode}
                        onClickReview={onClickReview}
                      />
                    )}
                  </div>
                );
              })}
              {frameworkPlusAll.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <DisplayPanelAccordianReviewListOne
                        onClickRevise={reviseFramework}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <DisplayPanelAccordianInformation
                        onClickRevise={reviseFramework}
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    )}
                  </div>
                );
              })}
            </Paper>
          </div>
        </>
      )}
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionTwoAssessment;
