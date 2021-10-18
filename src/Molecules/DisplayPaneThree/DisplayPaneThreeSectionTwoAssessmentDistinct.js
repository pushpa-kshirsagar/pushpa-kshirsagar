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
  SET_POPUP_VALUE,
  SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE
} from '../../actionType';

const DisplayPaneThreeSectionTwoAssessment = () => {
  const [listExpand, setListExpand] = useState('');
  const { headerOneBadgeTwo, reviewMode, responseObject, relatedReviewListPaneThree } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const {
    selectedAssociateInfo,
    countPage,
    reviewListDistinctData,
    typeOfMiddlePaneList
  } = useSelector((state) => state.DisplayPaneTwoReducer);
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
      id: 'administration',
      labelTextOneOne: 'administration',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'proctor',
          textOne: informationFramework?.assessmentAdministrationProctor?'Yes':'No'
        },
        {
          labelTextOneOneBadge: 'repeat',
          textOne: informationFramework?.assessmentAdministrationRepeat?'Yes':'No'
        },
        {
          labelTextOneOneBadge: 'reset',
          textOne: informationFramework?.assessmentAdministrationReset?'Yes':'No'
        },
        {
          labelTextOneOneBadge: 'shuffle',
          textOne: informationFramework?.assessmentAdministrationShuffle?'Yes':'No'
        },
        {
          labelTextOneOneBadge: 'supervise',
          textOne: informationFramework?.assessmentAdministrationSupervise?'Yes':'No'
        },
        {
          labelTextOneOneBadge: 'template',
          textOne: informationFramework?.assessmentAdministrationTemplate
        },
        {
          labelTextOneOneBadge: 'version',
          textOne: informationFramework?.assessmentAdministrationVersion
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
      // IconOne: Manuscript
    },
    {
      id: 'aid',
      labelTextOneOne: 'aid',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'calculator',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: informationFramework?.assessmentAid?.assessmentAidCalculatorPermission?'Permitted':'Unpermitted'
            },
            {
              labelTextTwoBadge: 'type',
              innerLabelBadgeList: informationFramework?.assessmentAid?.assessmentAidCalculatorType||'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'spredsheet',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: informationFramework?.assessmentAid?.assessmentAidSpreadsheetPermission?'Permitted':'Unpermitted'
            },
            {
              labelTextTwoBadge: 'type',
              innerLabelBadgeList: informationFramework?.assessmentAid?.assessmentAidSpreadsheetType||'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'textsheet',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: informationFramework?.assessmentAid?.assessmentAidTextsheetPermission?'Permitted':'Unpermitted'
            },
            {
              labelTextTwoBadge: 'type',
              innerLabelBadgeList: informationFramework?.assessmentAid?.assessmentAidTextsheetType||'No Information'
            }
          ]
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
      // IconOne: Manuscript
    },
    {
      id:'cluster',
      labelTextOneOne:'cluster',
      labelTextOneOneBadges:[
        {
          labelTextOneOneBadge:'distinct',
          textOne:''
        }
      ]
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
      id: 'evaluation-assessment',
      labelTextOneOne: 'evaluation',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'model',
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
      id: 'a4',
      labelTextOneOne: 'items',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          textOne: informationFramework?.assessmentItemDistinct
        },
        {
          labelTextOneOneBadge: 'group',
          textOne: informationFramework?.assessmentItemDistinct
        },
        {
          labelTextOneOneBadge: 'label',
          textOne: informationFramework?.assessmentItemFrameworkOneLabel
        },
        {
          labelTextOneOneBadge: 'navigation',
          textOne: 'No Information'
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
          textOne: informationFramework?.assessmentManuscript?.assessmentManuscriptPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationFramework?.assessmentManuscript?.assessmentManuscriptSecondary
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
      IconOne: null,
      isReviewLink: true,
    },
    {
      id: 'response',
      labelTextOneOne: 'response',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'label',
          textOne: informationFramework?.assessmentItemFrameworkOneResponseLabel ||'No Information'
        },
        {
          labelTextOneOneBadge: 'revise',
          textOne: informationFramework?.assessmentItemFrameworkOneResponseRevise?'Yes':'No'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
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
          textOne: informationFramework?.assessmentSection
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
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a6-template',
      labelTextOneOne: 'template',
      isListCard: false,
      innerAssociateList: [],
      IconOne: null
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
        },
        {
          labelTextOneOneBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      labelTextOneOneBadgeTwo: '',
      innerAssociateList: [],
      innerInfo: '',
      IconOne: null
    }
  ];

  const onClickReview = (e) => {
    const headerOne = e.currentTarget.getAttribute('data-value');
    const badgeOne = e.currentTarget.getAttribute('data-key');
    
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
    if(headerOne==='preview'){
      dispatch({ type: SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE, payload: true });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
    }
  };
  const reviseFramework = (e,selectedBadgeArray) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');

    //console.log(selectedBadgeArray);
    let badgeName='';if(selectedBadgeArray){
      if (selectedBadgeArray.length > 0) {
        selectedBadgeArray.forEach((element) => {
          badgeName = badgeName + element.labelTextTwoBadge;
        });
      }
    }    
    console.log(badgeName);
    console.log(labelName + '  ' + selectedBadgeName);
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
    if (labelName === 'evaluation' && selectedBadgeName==='model') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'EVALUATIONPOPUP', popupMode: 'ASSESSMENTCREATE' }
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
    if (labelName === 'items' && selectedBadgeName === 'navigation') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAVIGATIONPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'response' && selectedBadgeName === 'revision') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'REVISIONPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (badgeName === 'calculator' && selectedBadgeName === 'permission') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'AID_CAL_POPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (badgeName === 'calculator' && selectedBadgeName === 'type') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'AID_CALCULATOR_TYPE_POPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }    
    if (badgeName === 'spredsheet' && selectedBadgeName === 'permission') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'AID_SHEET_POPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }     
    if (badgeName === 'spredsheet' && selectedBadgeName === 'type') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'AID_SPREADSHEET_TYPE_POPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }    
    if (badgeName === 'textsheet' && selectedBadgeName === 'permission') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'AID_TEXT_POPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (badgeName === 'textsheet' && selectedBadgeName === 'type') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'AID_TEXTSHEET_TYPE_POPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if(labelName==='preview'){
      dispatch({ type: SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE, payload: true });
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
          {typeOfMiddlePaneList !== 'assessmentDistinctReviewList' && (
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
          )}
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
