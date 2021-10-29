import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import Manuscript from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import { convertSecondsToHMmSs, getEvaluationStr, makeItemObj } from '../../Actions/GenericActions';
import {
  FILTERMODE,
  GET_ALLOCATE_ITEM,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PANE_THREE_PREVIEW_MODE,
  SET_POPUP_VALUE,
  SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE,
  SET_ASSESSMENT_SINGLE_STATE
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

  let communiqueArr = [];
  informationFramework?.assessmentCommunique.map((comm, index) => {
    // communiqueArr.push({ labelTextOneOneBadge: convertNumberToName(index + 1), textOne: '' });
    communiqueArr.push({ labelTextOneOneBadge: index + 1, textOne: '' });
  });
  let manuscriptArr = [];
  informationFramework?.assessmentManuscript.map((comm, index) => {
    // manuscriptArr.push({ labelTextOneOneBadge: convertNumberToName(index + 1), textOne: '' });
    manuscriptArr.push({ labelTextOneOneBadge: index + 1, textOne: '' });
  });
  let synopsisArr = [];
  informationFramework?.assessmentSynopsis.map((comm, index) => {
    // synopsisArr.push({ labelTextOneOneBadge: convertNumberToName(index + 1), textOne: '' });
    synopsisArr.push({ labelTextOneOneBadge: index + 1, textOne: '' });
  });
  let sectionArr = [];
  informationFramework?.assessmentSection.map((comm, index) => {
    // sectionArr.push({ labelTextOneOneBadge: convertNumberToName(index + 1), textOne: '' });
    sectionArr.push({ labelTextOneOneBadge: index + 1, textOne: '' });
  });
  let adminSequenseArr = [];
  informationFramework?.assessmentCommunique.map((comm, ind) => {
    adminSequenseArr.push(`assessment communiqué ${ind + 1}`);
  });
  informationFramework?.assessmentManuscript.map((com, ind) => {
    adminSequenseArr.push(`assessment manuscript ${ind + 1}`);
  });
  informationFramework?.assessmentSynopsis.map((com, ind) => {
    adminSequenseArr.push(`assessment synopsis ${ind + 1}`);
  });
  let clusterObj = [];
  if (informationFramework) {
    clusterObj = informationFramework?.assessmentCluster || [];
  }
  let clusterArray = [];
  clusterObj.forEach((ob) => {
    clusterArray.push({
      textOne: ob?.assessmentClusterOneName || '',
      textTwo: ob?.assessmentClusterOneDescription,
      status: ob?.clusterQuestionCount || 0
    });
  });
  let scaleObj = [];
  if (informationFramework) {
    scaleObj = informationFramework?.assessmentScale || [];
  }
  let scaleArray = [];
  scaleObj.forEach((ob) => {
    scaleArray.push({
      textOne: ob?.assessmentScaleOneName || '',
      textTwo: ob?.assessmentScaleOneDescription || '',
      status: ob?.clusterQuestionCount || 0
    });
  });
  const frameworkAll = [
    {
      id: 'administration',
      labelTextOneOne: 'administration',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'proctor',
          textOne: informationFramework?.assessmentAdministrationProctor ? 'Yes' : 'No'
        },
        {
          labelTextOneOneBadge: 'sequence',
          textOne: informationFramework?.assessmentAdministrationSequence || ''
        },
        {
          labelTextOneOneBadge: 'supervise',
          textOne: informationFramework?.assessmentAdministrationSupervise ? 'Yes' : 'No'
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
      id: 'a1',
      labelTextOneOne: 'cluster',
      labelTextOneOneBadgeOne: 'distinct',
      labelTextOneOneBadgeTwo: 'polarity',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: clusterArray
        },
        {
          labelTextOneOneBadge: 'polarity',
          innerList: [
            {
              id: 'associate1',
              textOne: 'positive',
              textTwo: '',
              status: '20'
            },
            {
              id: 'associate1',
              textOne: 'negative',
              textTwo: '',
              status: '20'
            }
          ]
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'communiqué',
      labelTextOneOneBadges: communiqueArr,
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: reviewMode === 'revise' ? AddIcon : Manuscript,
      isAddIcon: reviewMode === 'revise' ? true : false
    },
    {
      id: 'evaluation-assessment',
      labelTextOneOne: 'evaluation',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'model',
          textOne: getEvaluationStr(informationFramework?.assessmentEvaluation) || 'No Information'
        },
        {
          labelTextOneOneBadge: '+',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a4',
      labelTextOneOne: 'items',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'template',
          textOne: informationFramework?.assessmentItemFrameworkOneTemplate || 'No Information'
        },
        {
          labelTextOneOneBadge: 'total',
          textOne: informationFramework?.assessmentItemTotal || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'm1',
      labelTextOneOne: 'manuscript',
      labelTextOneOneBadges: manuscriptArr,
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: reviewMode === 'revise' ? AddIcon : Manuscript,
      isAddIcon: reviewMode === 'revise' ? true : false
    },
    {
      id: 'preview-assessment',
      labelTextOneOne: 'preview',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: null,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'scale',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: scaleArray
        },
        {
          labelTextOneOneBadge: '',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'score',
      labelTextOneOne: 'score',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'extremum',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'maximum',
              innerLabelBadgeList:
                informationFramework?.assessmentScoreExtremum?.assessmentScoreExtremumMaximum ||
                'No Information'
            },
            {
              labelTextTwoBadge: 'minimum',
              innerLabelBadgeList:
                informationFramework?.assessmentScoreExtremum?.assessmentScoreExtremumMinimum ||
                'No Information'
            }
          ]
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'a5',
      labelTextOneOne: 'section',
      isListCard: false,
      labelTextOneOneBadges: sectionArr,
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'synopsis',
      labelTextOneOne: 'synopsis',
      labelTextOneOneBadges: synopsisArr,
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: reviewMode === 'revise' ? AddIcon : Manuscript,
      isAddIcon: reviewMode === 'revise' ? true : false
    },
    {
      id: 'a6',
      labelTextOneOne: 'time',
      isListCard: false,
      textOneOne: convertSecondsToHMmSs(informationFramework?.assessmentTime) || 'No Information',
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

  const onClickReview = (e, badge) => {
    // console.log(e);
    // console.log(badge);
    if (typeof e === 'object') {
      const headerOne = e.currentTarget.getAttribute('data-value');
      const badgeOne = e.currentTarget.getAttribute('data-key');
      {
        /*
      if (headerOne === 'communiqué' && badgeOne === 'primary') {
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
      }*/
      }
      if (headerOne === 'preview') {
        dispatch({ type: SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE, payload: true });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
      }
    }
    if (reviewMode === 'review') {
      if (e === 'communiqué' && badge !== '') {
        dispatch({
          type: SET_PANE_THREE_PREVIEW_MODE,
          payload: {
            isPreviewShow: true,
            previewHeaderOne: 'assessment',
            previewHeaderOneBadgeOne: 'communiqué',
            previewHeaderOneBadgeTwo: badge,
            previewHeaderOneBadgeThree: '',
            previewInnerHTML: informationFramework?.assessmentCommunique[badge - 1] || ''
          }
        });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      }
      if (e === 'manuscript' && badge !== '') {
        dispatch({
          type: SET_PANE_THREE_PREVIEW_MODE,
          payload: {
            isPreviewShow: true,
            previewHeaderOne: 'assessment',
            previewHeaderOneBadgeOne: 'manuscript',
            previewHeaderOneBadgeTwo: badge,
            previewHeaderOneBadgeThree: '',
            previewInnerHTML: informationFramework?.assessmentManuscript[badge - 1] || ''
          }
        });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      }
      if (e === 'synopsis' && badge !== '') {
        dispatch({
          type: SET_PANE_THREE_PREVIEW_MODE,
          payload: {
            isPreviewShow: true,
            previewHeaderOne: 'assessment',
            previewHeaderOneBadgeOne: 'synopsis',
            previewHeaderOneBadgeTwo: badge,
            previewHeaderOneBadgeThree: '',
            previewInnerHTML: informationFramework?.assessmentSynopsis[badge - 1] || ''
          }
        });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      }
    }
    if (reviewMode === 'revise') {
      if (e === 'communiqué' && badge === '') {
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'indexPointer', value: 0 }
        });
        dispatch({
          type: SET_POPUP_VALUE,
          payload: {
            isPopUpValue: 'ASSESSMENT_COMMUNIQUE_PRIMARY_TEXTSHEET_POPUP',
            popupMode: 'ASSESSMENTCREATE'
          }
        });
      }

      if (e === 'manuscript' && badge === '') {
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'indexPointer', value: 0 }
        });
        dispatch({
          type: SET_POPUP_VALUE,
          payload: {
            isPopUpValue: 'ASSESSMENT_MANUSCRIPT_PRIMARY_TEXTSHEET_POPUP',
            popupMode: 'ASSESSMENTCREATE'
          }
        });
      }
      if (e === 'synopsis' && badge === '') {
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'indexPointer', value: 0 }
        });
        dispatch({
          type: SET_POPUP_VALUE,
          payload: {
            isPopUpValue: 'ASSESSMENT_SYNOPSIS_TEXTSHEET_POPUP',
            popupMode: 'ASSESSMENTCREATE'
          }
        });
      }
    }
  };
  const reviseFramework = (e, selectedBadgeArray) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    let badgeName = '';
    if (selectedBadgeArray) {
      if (selectedBadgeArray.length > 0) {
        selectedBadgeArray.forEach((element) => {
          badgeName = badgeName + element.labelTextTwoBadge;
        });
      }
    }
    console.log(badgeName);
    console.log(labelName + '  ' + selectedBadgeName);
    if (labelName === 'communiqué' && selectedBadgeName !== '') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'indexPointer', value: parseInt(selectedBadgeName) }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ASSESSMENT_COMMUNIQUE_PRIMARY_TEXTSHEET_POPUP',
          popupMode: 'ASSESSMENTCREATE'
        }
      });
    }
    if (labelName === 'manuscript' && selectedBadgeName !== '') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'indexPointer', value: parseInt(selectedBadgeName) }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ASSESSMENT_MANUSCRIPT_PRIMARY_TEXTSHEET_POPUP',
          popupMode: 'ASSESSMENTCREATE'
        }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'proctor') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINPROCTORPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'supervise') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINSUPERVISEPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'template') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINTEMPLATEPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'sequence') {
      dispatch({
        type: SET_ASSESSMENT_SINGLE_STATE,
        payload: { stateName: 'assessmentAdminSequence', value: adminSequenseArr }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINSEWUENCEPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'version') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINVERSIONPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'score' && badgeName === 'extremum' && selectedBadgeName === 'maximum') {
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
    if (labelName === 'evaluation' && selectedBadgeName === 'model') {
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
    if (labelName === 'preview') {
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
