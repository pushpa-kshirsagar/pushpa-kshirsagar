import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import {
  makeAssesseeGroupObj,
  makeAssesseeReviewListRequestObject,
  makeAssessmentGroupObj,
  makeAssessmentReviewListRequestObject,
  makeCultureProfileGroupObj,
  makeCultureProfileObj,
  makeJobProfileGroupObj,
  makeJobProfileObj
} from '../../Actions/GenericActions';
import Manuscript from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import {
  FILTERMODE,
  GET_ALLOCATE_ASSESSEE,
  GET_ALLOCATE_ASSESSEE_GROUP,
  GET_ALLOCATE_ASSESSMENT,
  GET_ALLOCATE_ASSESSMENT_GROUP,
  GET_ALLOCATE_CULTURE,
  GET_ALLOCATE_CULTURE_GROUP,
  GET_ALLOCATE_JOB,
  GET_ALLOCATE_JOB_GROUP,
  GET_ASSIGNMENTDISTINCT_ASSESSEES_REVIEWLIST_SAGA,
  GET_ASSIGNMENTDISTINCT_ASSESSMENT_REVIEWLIST_SAGA,
  GET_ASSIGNMENTDISTINCT_CULTURE_PROFILE_REVIEWLIST_SAGA,
  GET_ASSIGNMENTDISTINCT_JOB_PROFILE_REVIEWLIST_SAGA,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PANE_THREE_PREVIEW_MODE,
  SET_POPUP_VALUE,
  SET_REQUEST_OBJECT
} from '../../actionType';

const DisplayPaneThreeSectionTwoAssignment = () => {
  const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const {
    headerOneBadgeTwo,
    reviewMode,
    relatedReviewListPaneThree,
    responseObject,
    assignmentRelatedReviewListPaneThree
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo, countPage } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationFramework } = responseObject;
  useEffect(() => {
    // setListExpand('');
  }, [assignmentRelatedReviewListPaneThree]);
  let assessee = assignmentRelatedReviewListPaneThree?.assessee || [];

  let assesseeArray = [];
  assessee.forEach((ob) => {
    const { id, informationBasic } = ob;
    assesseeArray.push({
      id,
      textOne: `${informationBasic.assesseeNamePrefix} ${informationBasic.assesseeNameFirst} ${informationBasic.assesseeNameOther} ${informationBasic.assesseeNameLast} ${informationBasic.assesseeNameSuffix}`,
      textTwo: informationBasic.assesseeAlias || 'No Information',
      status: ''
    });
  });
  let assessment = assignmentRelatedReviewListPaneThree?.assessment || [];

  let assessmentArray = [];
  assessment.forEach((ob) => {
    const { id, informationBasic } = ob;
    assessmentArray.push({
      id,
      textOne: informationBasic.assessmentName,
      textTwo: informationBasic.assessmentDescription || 'No Information',
      status: ''
    });
  });

  let cultureProfile = assignmentRelatedReviewListPaneThree?.cultureProfile || [];
  let cultureProfileArray = [];
  cultureProfile.forEach((ob) => {
    const { id, informationBasic } = ob;
    cultureProfileArray.push({
      id,
      textOne: informationBasic.cultureProfileName,
      textTwo: informationBasic.cultureProfileDescription || 'No Information',
      status: ''
    });
  });

  let jobProfile = assignmentRelatedReviewListPaneThree?.jobProfile || [];
  let jobProfileArray = [];
  jobProfile.forEach((ob) => {
    const { id, informationBasic } = ob;
    jobProfileArray.push({
      id,
      textOne: informationBasic.jobProfileName,
      textTwo: informationBasic.jobProfileDescription || 'No Information',
      status: ''
    });
  });

  const frameworkList = [
    {
      id: 'administration',
      labelTextOneOne: 'administration',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'proctor',
          textOne: informationFramework?.assignmentAdministrationRepeat ? 'Yes' : 'No'
        },
        {
          labelTextOneOneBadge: 'repeat',
          textOne: informationFramework?.assignmentAdministrationRepeat ? 'Yes' : 'No'
        },
        {
          labelTextOneOneBadge: 'reset',
          textOne: informationFramework?.assignmentAdministrationReset ? 'Yes' : 'No'
        },
        {
          labelTextOneOneBadge: 'sequence',
          textOne: informationFramework?.assignmentAdministrationSequence ? 'Yes' : 'No'
        },
        {
          labelTextOneOneBadge: 'shuffle',
          textOne: informationFramework?.assignmentAdministrationShuffle ? 'Yes' : 'No'
        },
        {
          labelTextOneOneBadge: 'supervise',
          textOne: informationFramework?.assignmentAdministrationSupervise ? 'Yes' : 'No'
        },
        {
          labelTextOneOneBadge: 'template',
          textOne: informationFramework?.assignmentAdministrationTemplate ? 'Yes' : 'No'
        },
        {
          labelTextOneOneBadge: 'version',
          textOne: informationFramework?.assignmentAdministrationVersion ? 'Yes' : 'No'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
      // IconOne: Manuscript
    },
    {
      id: 'a1',
      labelTextOneOne: 'assessees',
      isListCard: true,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: assesseeArray
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'norm',
          textOne: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a3',
      labelTextOneOne: 'assessments',
      isListCard: true,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: assessmentArray
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a1',
      labelTextOneOne: 'communiqué',
      labelTextOneOneBadges: [],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: reviewMode === 'revise' ? AddIcon : Manuscript,
      isAddIcon: reviewMode === 'revise' ? true : false
    },
    {
      id: 'CP-001',
      labelTextOneOne: 'culture profiles',
      isListCard: true,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: cultureProfileArray
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'JP-001',
      labelTextOneOne: 'job profiles',
      isListCard: true,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: jobProfileArray
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'preview-assignment',
      labelTextOneOne: 'preview',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: null,
      isReviewLink: true
    },
    {
      id: 'a4',
      labelTextOneOne: 'report',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'synopsis',
      labelTextOneOne: 'synopsis',
      labelTextOneOneBadges: [],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: reviewMode === 'revise' ? AddIcon : Manuscript,
      isAddIcon: reviewMode === 'revise' ? true : false
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
  const onclickReviewFramework = (e, badge) => {
    console.log(e);
    if (typeof e === 'object') {
      const headerOne = e.currentTarget.getAttribute('data-value');
      const badgeOne = e.currentTarget.getAttribute('data-key');
      if (headerOne === 'preview') {
        // dispatch({ type: SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE, payload: true });
        // dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
      }
    }
    if (reviewMode === 'review') {
      if (e === 'communiqué' && badge !== '') {
        dispatch({
          type: SET_PANE_THREE_PREVIEW_MODE,
          payload: {
            isPreviewShow: true,
            previewHeaderOne: 'assignment',
            previewHeaderOneBadgeOne: 'communiqué',
            previewHeaderOneBadgeTwo: badge,
            previewHeaderOneBadgeThree: '',
            previewInnerHTML: informationFramework?.assignmentCommunique[badge - 1] || ''
          }
        });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      }
      if (e === 'synopsis' && badge !== '') {
        dispatch({
          type: SET_PANE_THREE_PREVIEW_MODE,
          payload: {
            isPreviewShow: true,
            previewHeaderOne: 'assignment',
            previewHeaderOneBadgeOne: 'synopsis',
            previewHeaderOneBadgeTwo: badge,
            previewHeaderOneBadgeThree: '',
            previewInnerHTML: informationFramework?.assignmentSynopsis[badge - 1] || ''
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
            isPopUpValue: 'COMMUNIQUE_TEXTSHEET_POPUP',
            popupMode: 'ASSIGNMENTCREATE'
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
            isPopUpValue: 'SYNOPSIS_TEXTSHEET_POPUP',
            popupMode: 'ASSIGNMENTCREATE'
          }
        });
      }
    }
  };
  const onclickReviseFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('labelName', labelName);
    console.log('selectedBadgeName', selectedBadgeName);
    if (labelName === 'assessees' && selectedBadgeName === 'distinct') {
      let requestObect = makeAssesseeReviewListRequestObject(
        selectedAssociateInfo,
        'active',
        0,
        countPage
      );
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingAssesseeId = informationFramework?.assignmentAssesseeDistinct || [];
      // let tempArr = relatedReviewListPaneThree[0]?.assessee || [];
      // existingAssesseeId = tempArr.map((val) => {
      //   return val.id;
      // });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctAssesseeRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSESSEE,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'assignmentDistinctAssesseeReviewList'
        }
      });
    }
    if (labelName === 'assessees' && selectedBadgeName === 'group') {
      let requestObect = makeAssesseeGroupObj(selectedAssociateInfo, 'active', 0, countPage);

      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingAssesseeId = [];
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctAssesseeGroupRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSESSEE_GROUP,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'assignmentDistinctAssesseeGroupReviewList'
        }
      });
    }
    if (labelName === 'assessments' && selectedBadgeName === 'distinct') {
      let requestObect = makeAssessmentReviewListRequestObject(
        selectedAssociateInfo,
        'active',
        0,
        countPage
      );
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      // let existingAssesseeId = informationFramework?.assignmentAssessment || [];
      let existingAssessmentId = informationFramework?.assignmentAssessmentDistinct.map(
        (ob) => ob.assessmentId
      );
      console.log('existingAssessmentId', existingAssessmentId);
      // let tempArr = relatedReviewListPaneThree[0]?.assessment || [];
      // existingAssessmentId = tempArr.map((val) => {
      //   return val.id;
      // });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctAssessmentRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSESSMENT,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssessmentId: existingAssessmentId,
          typeOfMiddlePaneList: 'assignmentDistinctAssessmentReviewList'
        }
      });
    }
    if (labelName === 'assessments' && selectedBadgeName === 'group') {
      let requestObect = makeAssessmentGroupObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingAssessmentId = []
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctAssessmentGroupRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSESSMENT_GROUP,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssessmentId: existingAssessmentId,
          typeOfMiddlePaneList: 'assignmentDistinctAssessmentGroupReviewList'
        }
      });
    }
    if (labelName === 'culture profiles' && selectedBadgeName === 'distinct') {
      let requestObect = makeCultureProfileObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingCultureProfileId = informationFramework?.assignmentCultureProfileDistinct || [];
      // let tempArr = relatedReviewListPaneThree[0]?.cultureProfile || [];
      // existingCultureProfileId = tempArr.map((val) => {
      //   return val.id;
      // });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctCultureProfileRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_CULTURE,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingCultureProfileId: existingCultureProfileId,
          typeOfMiddlePaneList: 'assignmentDistinctCultureProfileReviewList'
        }
      });
    }
    if (labelName === 'culture profiles' && selectedBadgeName === 'group') {
      let requestObect = makeCultureProfileGroupObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingCultureProfileId = [];
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctCultureProfileGroupRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ALLOCATE_CULTURE_GROUP,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingCultureProfileId: existingCultureProfileId,
          typeOfMiddlePaneList: 'assignmentDistinctCultureProfileGroupReviewList'
        }
      });
    }
    if (labelName === 'job profiles' && selectedBadgeName === 'distinct') {
      let requestObect = makeJobProfileObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingJobProfileId = informationFramework?.assignmentJobProfileDistinct || [];
      // let tempArr = relatedReviewListPaneThree[0]?.cultureProfile || [];
      // existingJobProfileId = tempArr.map((val) => {
      //   return val.id;
      // });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctJobProfileRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_JOB,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingJobProfileId: existingJobProfileId,
          typeOfMiddlePaneList: 'assignmentDistinctJobProfileReviewList'
        }
      });
    }
    if (labelName === 'job profiles' && selectedBadgeName === 'group') {
      let requestObect = makeJobProfileGroupObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingJobProfileId = [];
      // let tempArr = relatedReviewListPaneThree[0]?.cultureProfile || [];
      // existingJobProfileId = tempArr.map((val) => {
      //   return val.id;
      // });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctJobProfileGroupRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_JOB_GROUP,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingJobProfileId: existingJobProfileId,
          typeOfMiddlePaneList: 'assignmentDistinctJobProfileGroupReviewList'
        }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'proctor') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINPROCTORPOPUP', popupMode: 'ASSIGNMENTCREATE' }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'proctor') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINPROCTORPOPUP', popupMode: 'ASSIGNMENTCREATE' }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'repeat') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINREPEATPOPUP', popupMode: 'ASSIGNMENTCREATE' }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'reset') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINRESETPOPUP', popupMode: 'ASSIGNMENTCREATE' }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'shuffle') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINSHUFFLEPOPUP', popupMode: 'ASSIGNMENTCREATE' }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'supervise') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINSUPERVISEPOPUP', popupMode: 'ASSIGNMENTCREATE' }
      });
    }
    if (labelName === 'administration' && selectedBadgeName === 'version') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ADMINVERSONPOPUP', popupMode: 'ASSIGNMENTCREATE' }
      });
    }
  };

  const getRelatedReviewList = (labelTextOneOne, labelTextOneOneBadge) => {
    console.log('Selected tag Object', labelTextOneOne, labelTextOneOneBadge);
    if (labelTextOneOne === 'assessees' && labelTextOneOneBadge === 'distinct') {
      if (!assignmentRelatedReviewListPaneThree.assessee) {
        dispatch({ type: LOADER_START });
        let relatedReqObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assignmentId:
            responseObject?.informationEngagement?.assignmentTag?.assignmentTagPrimary || '',
          numberPage: 0,
          countPage: countPage,
          searchCondition: 'AND',
          filter: true,
          search: [
            {
              condition: 'or',
              searchBy: [
                {
                  dataType: 'string',
                  conditionColumn: 'informationEngagement.assesseeStatus',
                  conditionValue: {
                    condition: 'eq',
                    value: {
                      from: 'ACTIVE'
                    }
                  }
                }
              ]
            }
          ]
        };
        dispatch({
          type: GET_ASSIGNMENTDISTINCT_ASSESSEES_REVIEWLIST_SAGA,
          payload: {
            request: relatedReqObj,
            HeaderOne: 'assignments',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
    }
    if (labelTextOneOne === 'assessments' && labelTextOneOneBadge === 'distinct') {
      if (!assignmentRelatedReviewListPaneThree.assessment) {
        dispatch({ type: LOADER_START });
        let relatedReqObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assignmentId:
            responseObject?.informationEngagement?.assignmentTag?.assignmentTagPrimary || '',
          numberPage: 0,
          countPage: countPage,
          searchCondition: 'AND',
          filter: true,
          search: [
            {
              condition: 'or',
              searchBy: [
                {
                  dataType: 'string',
                  conditionColumn: 'informationEngagement.assessmentStatus',
                  conditionValue: {
                    condition: 'eq',
                    value: {
                      from: 'ACTIVE'
                    }
                  }
                }
              ]
            }
          ]
        };
        dispatch({
          type: GET_ASSIGNMENTDISTINCT_ASSESSMENT_REVIEWLIST_SAGA,
          payload: {
            request: relatedReqObj,
            HeaderOne: 'assignments',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
    }
    if (labelTextOneOne === 'culture profiles' && labelTextOneOneBadge === 'distinct') {
      if (!assignmentRelatedReviewListPaneThree.cultureProfile) {
        dispatch({ type: LOADER_START });
        let relatedReqObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assignmentId:
            responseObject?.informationEngagement?.assignmentTag?.assignmentTagPrimary || '',
          numberPage: 0,
          countPage: countPage,
          searchCondition: 'AND',
          filter: true,
          search: [
            {
              condition: 'or',
              searchBy: [
                {
                  dataType: 'string',
                  conditionColumn: 'informationEngagement.cultureProfileStatus',
                  conditionValue: {
                    condition: 'eq',
                    value: {
                      from: 'ACTIVE'
                    }
                  }
                }
              ]
            }
          ]
        };
        dispatch({
          type: GET_ASSIGNMENTDISTINCT_CULTURE_PROFILE_REVIEWLIST_SAGA,
          payload: {
            request: relatedReqObj,
            HeaderOne: 'assignments',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
    }
    if (labelTextOneOne === 'job profiles' && labelTextOneOneBadge === 'distinct') {
      if (!assignmentRelatedReviewListPaneThree.jobProfile) {
        dispatch({ type: LOADER_START });
        let relatedReqObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assignmentId:
            responseObject?.informationEngagement?.assignmentTag?.assignmentTagPrimary || '',
          numberPage: 0,
          countPage: countPage,
          searchCondition: 'AND',
          filter: true,
          search: [
            {
              condition: 'or',
              searchBy: [
                {
                  dataType: 'string',
                  conditionColumn: 'informationEngagement.jobProfileStatus',
                  conditionValue: {
                    condition: 'eq',
                    value: {
                      from: 'ACTIVE'
                    }
                  }
                }
              ]
            }
          ]
        };
        dispatch({
          type: GET_ASSIGNMENTDISTINCT_JOB_PROFILE_REVIEWLIST_SAGA,
          payload: {
            request: relatedReqObj,
            HeaderOne: 'assignments',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
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
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="framework"
              isDisplayCardExpanded={listExpand === 'framework'}
              setListExpand={setListExpand}
              list={frameworkList}
              mode={reviewMode}
              onClickRevise={onclickReviseFramework}
              onClickReview={onclickReviewFramework}
              getReviewList={getRelatedReviewList}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="framework+"
              isDisplayCardExpanded={listExpand === 'framework+'}
              setListExpand={setListExpand}
              list={frameworkPlusAll}
              mode={reviewMode}
            />
          </div>
        </>
      ) : (
        <>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {frameworkList.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <DisplayPanelAccordianReviewListOne
                        onClickRevise={onclickReviseFramework}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                        getReviewList={getRelatedReviewList}
                      />
                    ) : (
                      <DisplayPanelAccordianInformation
                        onClickRevise={onclickReviseFramework}
                        accordianObject={ob}
                        mode={reviewMode}
                        getReviewList={getRelatedReviewList}
                      />
                    )}
                  </div>
                );
              })}
            </Paper>
          </div>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {frameworkPlusAll.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <DisplayPanelAccordianReviewListOne
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <DisplayPanelAccordianInformation accordianObject={ob} mode={reviewMode} />
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

export default DisplayPaneThreeSectionTwoAssignment;
