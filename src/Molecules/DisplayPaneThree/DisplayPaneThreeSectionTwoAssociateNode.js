import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import {
  FILTERMODE,
  GET_ALLOCATE_ASSESSEE,
  GET_ALLOCATE_ASSESSMENT,
  GET_ALLOCATE_ASSIGNMENT,
  GET_ALLOCATE_ASSOCIATE,
  GET_ALLOCATE_CULTURE,
  GET_ALLOCATE_ITEM,
  GET_ALLOCATE_JOB,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import DisplayPanelAccordianReviewListTwo from '../Accordian/DisplayPanelAccordianReviewListTwo';
import {
  makeAssesseeReviewListRequestObject,
  makeAssessmentReviewListRequestObject,
  makeAssignmentReviewListRequestObject,
  makeAssociateNodeObj,
  makeCultureProfileObj,
  makeInternalNodeObj,
  makeItemObj,
  makeJobProfileObj
} from '../../Actions/GenericActions';
import { getAssesseeNodeAssesseeDistinctApiCall } from '../../Actions/AssesseeModuleAction';

const DisplayPaneThreeSectionTwoAssociateNode = () => {
  // const [listExpand, setListExpand] = useState('');
  const {
    reviewMode,
    relatedReviewListPaneThree = [],
    selectedModule,
    responseObject
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const dispatch = useDispatch();
  const { informationFramework } = responseObject;
  let ascendantAll = [];
  let ascendantPrimary = [];
  let ascendantSecondary = [];
  if (informationFramework && informationFramework.associateNodeAscendant) {
    if (
      informationFramework.associateNodeAscendant.associateNodeAscendantAll &&
      informationFramework.associateNodeAscendant.associateNodeAscendantAll.length > 0
    ) {
      informationFramework.associateNodeAscendant.associateNodeAscendantAll.forEach((ob) => {
        ascendantAll.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateNodeName || '',
          textTwo: ob?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      });
    }
    if (informationFramework.associateNodeAscendant.associateNodeAscendantPrimary) {
      let p1 = informationFramework.associateNodeAscendant.associateNodeAscendantPrimary;
      if (Array.isArray(p1)) {
        ascendantPrimary.push({
          id: p1[0].id,
          textOne: p1[0]?.informationBasic?.associateNodeName || '',
          textTwo: p1[0]?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
        ascendantPrimary.push(p1[0]);
      } else {
        ascendantPrimary.push({
          id: p1.id,
          textOne: p1?.informationBasic?.associateNodeName || '',
          textTwo: p1?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      }
      // console.log('primary ======>', ascendantPrimary);
      // informationFramework.associateNodeAscendant.associateNodeAscendantPrimary.forEach((ob) => {
      //   ascendantPrimary.push({
      //     id: ob.id,
      //     textOne: ob?.informationBasic?.associateNodeName || '',
      //     textTwo: ob?.informationBasic?.associateNodeDescription || '',
      //     status: ''
      //   });
      // });
    }
    if (
      informationFramework.associateNodeAscendant.associateNodeAscendantSecondary &&
      informationFramework.associateNodeAscendant.associateNodeAscendantSecondary.length > 0
    ) {
      informationFramework.associateNodeAscendant.associateNodeAscendantSecondary.forEach((ob) => {
        ascendantSecondary.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateNodeName || '',
          textTwo: ob?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      });
    }
  }
  let descendantAll = [];
  let descendantPrimary = [];
  let descendantSecondary = [];
  if (informationFramework && informationFramework.associateNodeDescendant) {
    if (
      informationFramework.associateNodeDescendant.associateNodeDescendantAll &&
      informationFramework.associateNodeDescendant.associateNodeDescendantAll.length > 0
    ) {
      informationFramework.associateNodeDescendant.associateNodeDescendantAll.forEach((ob) => {
        descendantAll.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateNodeName || '',
          textTwo: ob?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      });
    }
    if (
      informationFramework.associateNodeDescendant.associateNodeDescendantPrimary &&
      typeof informationFramework.associateNodeDescendant.associateNodeDescendantPrimary !==
        'string' &&
      informationFramework.associateNodeDescendant.associateNodeDescendantPrimary.length > 0
    ) {
      informationFramework.associateNodeDescendant.associateNodeDescendantPrimary.forEach((ob) => {
        descendantPrimary.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateNodeName || '',
          textTwo: ob?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      });
    }
    if (
      informationFramework.associateNodeDescendant.associateNodeDescendantSecondary &&
      informationFramework.associateNodeDescendant.associateNodeDescendantSecondary.length > 0
    ) {
      informationFramework.associateNodeDescendant.associateNodeDescendantSecondary.forEach(
        (ob) => {
          descendantSecondary.push({
            id: ob.id,
            textOne: ob?.informationBasic?.associateNodeName || '',
            textTwo: ob?.informationBasic?.associateNodeDescription || '',
            status: ''
          });
        }
      );
    }
  }
  let assessee = [];
  if (selectedModule === 'assessees' && relatedReviewListPaneThree) {
    assessee = relatedReviewListPaneThree[0]?.assessee || [];
  }
  let assessment = [];
  if (selectedModule === 'assessments' && relatedReviewListPaneThree) {
    assessment = relatedReviewListPaneThree?.assessment || [];
  }
  let assignment = [];
  if (selectedModule === 'assignments' && relatedReviewListPaneThree) {
    assignment = relatedReviewListPaneThree?.assignment || [];
  }
  let item = [];
  if (selectedModule === 'items' && relatedReviewListPaneThree) {
    item = relatedReviewListPaneThree?.item || [];
  }
  let cultureProfile = [];
  if (selectedModule === 'culture profiles' && relatedReviewListPaneThree) {
    cultureProfile = relatedReviewListPaneThree?.cultureProfile || [];
  }
  let jobProfile = [];
  if (selectedModule === 'job profiles' && relatedReviewListPaneThree) {
    jobProfile = relatedReviewListPaneThree?.jobProfile || [];
  }
  let associate = [];
  if (selectedModule === 'associates' && relatedReviewListPaneThree) {
    associate = relatedReviewListPaneThree[0]?.associate || [];
  }

  const assesseeNodeList = [];
  assessee.forEach((ob) => {
    const { id, informationBasic } = ob;
    assesseeNodeList.push({
      id,
      textOne: `${informationBasic.assesseeNamePrefix} ${informationBasic.assesseeNameFirst} ${informationBasic.assesseeNameOther} ${informationBasic.assesseeNameLast} ${informationBasic.assesseeNameSuffix}`,
      textTwo: informationBasic.assesseeAlias || 'No Information',
      status: ''
    });
  });

  const assessmentNodeList = [];
  assessment.forEach((ob) => {
    const { id, informationBasic } = ob;
    assessmentNodeList.push({
      id,
      textOne: informationBasic.assessmentName,
      textTwo: informationBasic.assessmentDescription || 'No Information',
      status: ''
    });
  });
  const assignmentNodeList = [];
  assignment.forEach((ob) => {
    const { id, informationBasic } = ob;
    assignmentNodeList.push({
      id,
      textOne: informationBasic.assignmentName,
      textTwo: informationBasic.assignmentDescription || 'No Information',
      status: ''
    });
  });
  const itemNodeList = [];
  item.forEach((ob) => {
    const { id, informationBasic } = ob;
    itemNodeList.push({
      id,
      textOne: informationBasic.itemName,
      textTwo: informationBasic.itemDescription || 'No Information',
      status: ''
    });
  });
  const cultureProfileNodeList = [];
  cultureProfile.forEach((ob) => {
    const { id, informationBasic } = ob;
    cultureProfileNodeList.push({
      id,
      textOne: informationBasic.cultureProfileName,
      textTwo: informationBasic.cultureProfileDescription || 'No Information',
      status: ''
    });
  });
  const jobProfileNodeList = [];
  jobProfile.forEach((ob) => {
    const { id, informationBasic } = ob;
    jobProfileNodeList.push({
      id,
      textOne: informationBasic.jobProfileName,
      textTwo: informationBasic.jobProfileDescription || 'No Information',
      status: ''
    });
  });
  const associateNodeList = [];
  associate.forEach((ob) => {
    const { id, informationBasic } = ob;
    associateNodeList.push({
      id,
      textOne: informationBasic.associateName,
      textTwo: informationBasic.associateDescription || 'No Information',
      status: ''
    });
  });

  const allModuleList = [
    {
      id: 'a1-01',
      labelTextOneOne: 'assessees',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a2-02',
      labelTextOneOne: 'assessments',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a3-03',
      labelTextOneOne: 'assignments',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a4-04',
      labelTextOneOne: 'associates',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a5-05',
      labelTextOneOne: 'iGuru analytic',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    // {
    //   id: 'a6-06',
    //   labelTextOneOne: 'interviews',
    //   labelTextOneOneBadgeOne: '',
    //   labelTextOneOneBadgeTwo: '',
    //   labelTextOneOneBadgeThree: '',
    //   labelTextOneOneBadgeFour: '',
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
    //   innerInfo: 'No Information',
    //   isListCard: true,
    //   isReviewLink: true
    // },
    {
      id: 'a7-07',
      labelTextOneOne: 'items',
      labelTextOneOneBadgeOne: 'group',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];
  const assesseeModuleList = [
    {
      id: 'a1',
      labelTextOneOne: 'assessees',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: assesseeNodeList
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];
  const assessmentModuleList = [
    {
      id: 'a3',
      labelTextOneOne: 'assessments',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: assessmentNodeList
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];
  const assignmentModuleList = [
    {
      id: 'a5',
      labelTextOneOne: 'assignments',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: assignmentNodeList
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];
  const itemModuleList = [
    {
      id: 'a5',
      labelTextOneOne: 'items',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: itemNodeList
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];
  const cultureProfileModuleList = [
    {
      id: 'a5',
      labelTextOneOne: 'culture profiles',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: cultureProfileNodeList
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];
  const jobProfileModuleList = [
    {
      id: 'a5',
      labelTextOneOne: 'job profiles',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: jobProfileNodeList
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];
  const associateModuleList = [
    {
      id: 'a5',
      labelTextOneOne: 'associates',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: associateNodeList
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];

  let list = allModuleList;
  if (selectedModule === 'assessees') {
    list = assesseeModuleList;
  }
  if (selectedModule === 'assessments') {
    list = assessmentModuleList;
  }
  if (selectedModule === 'assignments') {
    list = assignmentModuleList;
  }
  if (selectedModule === 'items') {
    list = itemModuleList;
  }
  if (selectedModule === 'culture profiles') {
    list = cultureProfileModuleList;
  }
  if (selectedModule === 'job profiles') {
    list = jobProfileModuleList;
  }
  if (selectedModule === 'associates') {
    list = associateModuleList;
  }

  const reviseNode = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');

    console.log(labelName, '+++++', selectedBadgeName, '+++++', innerSelectedBadgeName);
    if (labelName === 'assessees' && selectedBadgeName === 'distinct') {
      let requestObect = makeAssesseeReviewListRequestObject(
        selectedAssociateInfo,
        'active',
        0,
        countPage
      );
      let revisedRoleObject = {
        id: responseObject.id,
        associateNodeName: responseObject.informationBasic.associateNodeName,
        associateNodeDescription: responseObject.informationBasic.associateNodeDescription,
        associateNodeStatus: responseObject.informationEngagement.associateNodeStatus
      };
      let existingAssesseeId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree[0]?.assessee &&
        relatedReviewListPaneThree[0].assessee.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeNodeAssesseeRevise' }
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
          revisedGroupObject: revisedRoleObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'assesseesNodeAssesseeReviewList'
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
      let revisedRoleObject = {
        id: responseObject.id,
        associateNodeName: responseObject.informationBasic.associateNodeName,
        associateNodeDescription: responseObject.informationBasic.associateNodeDescription,
        associateNodeStatus: responseObject.informationEngagement.associateNodeStatus
      };
      let existingAssessmentId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree?.assessment &&
        relatedReviewListPaneThree.assessment.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assessmentNodeAssessmentRevise' }
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
          revisedGroupObject: revisedRoleObject,
          existingAssesseeId: existingAssessmentId,
          typeOfMiddlePaneList: 'assessmentNodeAssessmentReviewList'
        }
      });
    }
    if (labelName === 'assignments' && selectedBadgeName === 'distinct') {
      let requestObect = makeAssignmentReviewListRequestObject(
        selectedAssociateInfo,
        'active',
        0,
        countPage
      );
      let revisedRoleObject = {
        id: responseObject.id,
        associateNodeName: responseObject.informationBasic.associateNodeName,
        associateNodeDescription: responseObject.informationBasic.associateNodeDescription,
        associateNodeStatus: responseObject.informationEngagement.associateNodeStatus
      };
      let existingAssignmentId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree?.assignment &&
        relatedReviewListPaneThree.assignment.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentNodeAssignmentRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSIGNMENT,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedRoleObject,
          existingAssignmentId: existingAssignmentId,
          typeOfMiddlePaneList: 'assignmentNodeAssignmentReviewList'
        }
      });
    }
    if (labelName === 'items' && selectedBadgeName === 'distinct') {
      let requestObect = makeItemObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedRoleObject = {
        id: responseObject.id,
        associateNodeName: responseObject.informationBasic.associateNodeName,
        associateNodeDescription: responseObject.informationBasic.associateNodeDescription,
        associateNodeStatus: responseObject.informationEngagement.associateNodeStatus
      };
      let existingItemId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree?.item &&
        relatedReviewListPaneThree.item.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'itemNodeItemRevise' }
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
          revisedGroupObject: revisedRoleObject,
          existingItemId: existingItemId,
          typeOfMiddlePaneList: 'itemNodeItemReviewList'
        }
      });
    }
    if (labelName === 'culture profiles' && selectedBadgeName === 'distinct') {
      let requestObect = makeCultureProfileObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedRoleObject = {
        id: responseObject.id,
        associateNodeName: responseObject.informationBasic.associateNodeName,
        associateNodeDescription: responseObject.informationBasic.associateNodeDescription,
        associateNodeStatus: responseObject.informationEngagement.associateNodeStatus
      };
      let existingCultureProfileId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree?.cultureProfile &&
        relatedReviewListPaneThree.cultureProfile.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'cultureProfileNodeCultureProfileRevise' }
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
          revisedGroupObject: revisedRoleObject,
          existingCultureProfileId: existingCultureProfileId,
          typeOfMiddlePaneList: 'cultureProfileNodeCultureProfileReviewList'
        }
      });
    }
    if (labelName === 'job profiles' && selectedBadgeName === 'distinct') {
      let requestObect = makeJobProfileObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedRoleObject = {
        id: responseObject.id,
        associateNodeName: responseObject.informationBasic.associateNodeName,
        associateNodeDescription: responseObject.informationBasic.associateNodeDescription,
        associateNodeStatus: responseObject.informationEngagement.associateNodeStatus
      };
      let existingJobProfileId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree?.jobProfile &&
        relatedReviewListPaneThree.jobProfile.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'jobProfileNodeJobProfileRevise' }
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
          revisedGroupObject: revisedRoleObject,
          existingJobProfileId: existingJobProfileId,
          typeOfMiddlePaneList: 'jobProfileNodeJobProfileReviewList'
        }
      });
    }
    if (labelName === 'associates' && selectedBadgeName === 'distinct') {
      let requestObect = makeAssociateNodeObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        associateNodeName: responseObject.informationBasic.associateNodeName,
        associateNodeDescription: responseObject.informationBasic.associateNodeDescription,
        associateNodeStatus: responseObject.informationEngagement.associateNodeStatus
      };
      let existingAssesseeId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree[0].associate.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'associateNodeAssociateRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSOCIATE,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'nodeAssociatesReviewList'
        }
      });
    }
  };
  const reviewNode = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
    console.log(labelName, '+++++', selectedBadgeName, '+++++', innerSelectedBadgeName);
    if (labelName === 'assessees' && selectedBadgeName === 'distinct') {
      console.log('IN ASSSESSEE ');
      getAssesseeNodeAssesseeDistinctApiCall(
        selectedAssociateInfo,
        'active',
        countPage,
        dispatch,
        'distinct',
        responseObject.id,
        '',
        false,
        'assessees'
      );
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeNodeAssesseeRevise' }
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
      <>
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            {list.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <>
                      {ob.isMultiList ? (
                        <DisplayPanelAccordianReviewListTwo
                          onClickReview={reviewNode}
                          onClickRevise={reviseNode}
                          accordianObject={ob}
                          mode={reviewMode}
                        />
                      ) : (
                        <DisplayPanelAccordianReviewListOne
                          onClickReview={reviewNode}
                          onClickRevise={reviseNode}
                          className=""
                          accordianObject={ob}
                          mode={reviewMode}
                        />
                      )}
                    </>
                  ) : (
                    <DisplayPanelAccordianInformation
                      onClickReview={reviewNode}
                      onClickRevise={reviseNode}
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
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionTwoAssociateNode;
