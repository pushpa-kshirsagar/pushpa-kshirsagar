import React, { useEffect, useState } from 'react';
import NavigatorIcon from '@material-ui/icons/OpenWith';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import BasicCard from '../../Molecules/DisplayPanelInformationBasic/DisplayPanelInformationBasic';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import Sections from '../../Molecules/Section/Section';
import { useDispatch, useSelector } from 'react-redux';
import CircleIcon from '../../Molecules/IconButton/IconButton';

import {
  ASSESSEE_INFO_CREATE,
  ASSESSEE_INFO_REVISE_SAGA,
  ASSESSEE_SIGN_ON,
  ASSOCIATE_INFO_REVISE_SAGA,
  ASSOCIATE_SIGN_ON,
  ASSOCIATE_ASSESSEESETUP_REVISE_SAGA,
  CLEAR_ASSESSMENT_INFO,
  CLEAR_ASSIGNMENT_INFO,
  CLEAR_DISPLAY_PANE_THREE,
  LOADER_START,
  NAVIGATOR_MODE,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE,
  ASSESSEE_GROUP_INFO_REVISE_SAGA,
  ASSESSEE_ROLE_INFO_REVISE_SAGA,
  ASSOCIATE_GROUP_REVISE_INFO_SAGA,
  ASSOCIATE_ROLE_REVISE_INFO_SAGA,
  ASSESSEE_NODE_INFO_REVISE_SAGA,
  CLEAR_GROUP_REDUCER_STATE,
  CLEAR_ROLE_REDUCER_STATE,
  CLEAR_NODE_REDUCER_STATE,
  CLEAR_TYPE_REDUCER_STATE,
  ASSESSMENT_INFO_REVISE_SAGA,
  ASSIGNMENT_INFO_REVISE_SAGA,
  ASSESSEE_TYPE_INFO_REVISE_SAGA,
  ASSOCIATE_TYPE_INFO_REVISE_SAGA,
  CLEAR_ITEM_REDUCER_STATE,
  ITEM_INFO_REVISE_SAGA,
  ASSESSMENT_TYPE_REVISE_INFO_SAGA,
  ASSIGNMENT_TYPE_REVISE_INFO_SAGA,
  ASSESSMENT_GROUP_REVISE_INFO_SAGA,
  ASSIGNMENT_GROUP_REVISE_INFO_SAGA,
  ITEM_GROUP_REVISE_INFO_SAGA,
  ITEM_TYPE_REVISE_INFO_SAGA,
  CLEAR_CULTURE_REDUCER_STATE,
  CULTURE_PROFILE_INFO_REVISE_SAGA,
  CULTURE_GROUP_REVISE_INFO_SAGA,
  CULTURE_TYPE_REVISE_INFO_SAGA,
  JOB_TYPE_REVISE_INFO_SAGA,
  JOB_GROUP_REVISE_INFO_SAGA,
  JOB_PROFILE_INFO_REVISE_SAGA,
  GET_ASSESSEENODE_ASSESSEE_REVIEW_LIST,
  GET_NODE_ASSESSMENTS_REVIEW_LIST_SAGA,
  GET_NODE_ASSIGNMENTS_REVIEW_LIST_SAGA,
  GET_NODE_ASSOCIATE_REVIEW_LIST,
  GET_NODE_ITEMS_REVIEW_LIST_SAGA,
  GET_CULTURE_NODE_CULTURE_REVIEW_LIST_SAGA,
  GET_JOB_NODE_JOB_REVIEW_LIST_SAGA,
  LOADER_STOP,
  ASSOCIATE_ASSOCIATESETUP_REVISE_SAGA,
  ASSOCIATE_ASSOCIATENODE_SETUP_REVISE_SAGA,
  ASSOCIATE_ASSESSMENTSETUP_REVISE_SAGA,
  ASSOCIATE_ITEMSETUP_REVISE_SAGA,
  ASSOCIATE_ANALYTICSETUP_REVISE_SAGA,
  ASSOCIATE_ASSIGNMENTSETUP_REVISE_SAGA,
  FILTERMODE_ENABLE
} from '../../actionType';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import './DisplayPaneThree.css';
import DisplayPaneThreeSectionOne from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssesseeDistinct';
import DisplayPaneThreeSectionTwo from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssesseeDistinct';
import DisplayPaneThreeSectionOneAssociate from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssociateDistinct';
import DisplayPaneThreeSectionTwoAssociate from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssociateDistinct';
import DisplayPaneThreeSectionOneAssesseeRole from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssesseeRole';
import DisplayPaneThreeSectionTwoAssesseeRole from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssesseeRole';
import DisplayPaneThreeSectionOneAssociateRole from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssociateRole';
import DisplayPaneThreeSectionTwoAssociateRole from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssociateRole';
import DisplayPaneThreeSectionOneAssesseeGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssesseeGroup';
import DisplayPaneThreeSectionTwoAssesseeGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssesseeGroup';
import DisplayPaneThreeSectionOneAssociateGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssociateGroup';
import DisplayPaneThreeSectionTwoAssociateGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssociateGroup';
import DisplayPaneThreeSectionOneAssessmentGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssessmentGroup';
import DisplayPaneThreeSectionTwoAssessmentGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssessmentGroup';
import DisplayPaneThreeSectionOneAssignmentGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssignmentGroup';
import DisplayPaneThreeSectionTwoAssignmentGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssignmentGroup';
import DisplayPaneThreeSectionOneAssessment from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssessmentDistinct';
import DisplayPaneThreeSectionTwoAssessment from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssessmentDistinct';
import DisplayPaneThreeSectionOneAssignmentType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssignmentType';
import DisplayPaneThreeSectionTwoAssignmentType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssignmentType';
import DisplayPaneThreeSectionOneAssessmentType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssessmentType';
import DisplayPaneThreeSectionTwoAssessmentType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssessmentType';
import DisplayPaneThreeSectionOneAssignment from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssignmentDistinct';
import DisplayPaneThreeSectionTwoAssignment from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssignmentDistinct';
import DisplayPaneThreeSectionOneAssociateNode from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssociateNode';
import DisplayPaneThreeSectionTwoAssociateNode from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssociateNode';
import {
  getAssesseeGroupAssesseeReqObj,
  getAssesseeNodeAssesseeReqObj,
  getAssesseeRoleAssesseeReqObj,
  setPermissionToDefault
} from '../../Actions/AssesseeModuleAction';
import {
  getAssociateGroupAssociateReqObj,
  getAssociateRoleAssociateReqObj
} from '../../Actions/AssociateModuleAction';
import DisplayPaneThreeSectionOneAssesseeType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssesseeType';
import DisplayPaneThreeSectionOneAssociateType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssociateType';
import DisplayPaneThreeSectionTwoAssesseeType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssesseeType';
import DisplayPaneThreeSectionTwoAssociateType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoAssociateType';
import DisplayPaneThreeSectionOneItem from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneItemDistinct';
import DisplayPaneThreeSectionTwoItem from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoItemDistinct';
import DisplayPaneThreeSectionOneItemGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneItemGroup';
import DisplayPaneThreeSectionTwoItemGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoItemGroup';
import DisplayPaneThreeSectionTwoItemType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoItemType';
import DisplayPaneThreeSectionOneItemType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneItemType';
import {
  getCultureGroupCultureReqObj,
  getCultureTypeCultureReqObj,
  getAssessmentGroupAssessmentReqObj,
  getAssessmentTypeAssessmentReqObj,
  getAssignmentGroupAssignmentReqObj,
  getAssignmentTypeAssignmentReqObj,
  getItemGroupItemReqObj,
  getItemTypeItemReqObj,
  getJobProfileTypeJobProfileReqObj,
  getJobProfileGroupJobProfileReqObj,
  getNodeAssessmentsReqObj,
  getNodeAssignmentsReqObj,
  getNodeAssociatesReqObj,
  getNodeItemsReqObj,
  getNodeCultureProfileReqObj,
  getNodeJobProfileReqObj,
  getAssociateTypeAssociateReqObj,
  getAssesseeTypeAssesseeReqObj,
  onClickFirst,
  onClickPrevious,
  onClickLast,
  onClickNext
} from '../../Actions/GenericActions';
import DisplayPaneThreeSectionOneCultureProfileDistinct from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneCultureProfileDistinct';
import DisplayPaneThreeSectionTwoCultureProfileDistinct from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoCultureProfileDistinct';
import DisplayPaneThreeSectionOneJobProfileDistinct from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneJobProfileDistinct';
import DisplayPaneThreeSectionTwoJobProfileDistinct from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoJobProfileDistinct';
import DisplayPaneThreeSectionOneCultureProfileGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneCultureProfileGroup';
import DisplayPaneThreeSectionTwoCultureProfileGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoCultureProfileGroup';
import DisplayPaneThreeSectionOneJobProfileGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneJobProfileGroup';
import DisplayPaneThreeSectionTwoJobProfileGroup from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoJobProfileGroup';
import DisplayPaneThreeSectionOneCultureProfileType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneCultureProfileType';
import DisplayPaneThreeSectionOneJobProfileType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneJobProfileType';
import DisplayPaneThreeSectionTwoCultureProfileType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoCultureProfileType';
import DisplayPaneThreeSectionTwoJobProfileType from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionTwoJobProfileType';
import {
  apiCallForItemDistinctPagination,
  setResponseToReducerObj
} from '../../Actions/ItemModuleAction';
import { callApiFunction } from '../../Actions/GenericActions';
import { BottomNavigation, Grid } from '@material-ui/core';
import DisplayPaneThreeSectionOneAssesseeReport from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssesseeReport';
import DisplayPaneThreeSectionOneAssessmentSection from '../../Molecules/DisplayPaneThree/DisplayPaneThreeSectionOneAssessmentSection';

export const DisplayPaneThree = () => {
  const dispatch = useDispatch();
  const {
    isReviewRevise = false,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo,
    headerOneBadgeThree,
    originResponseObj,
    responseObject,
    reviewMode,
    createMode,
    assesseeGroupAssessee,
    assesseeRoleAssessee,
    associateNodeAssessee,
    assignmentAssesseeList = [],
    assignmentAssessmentList = [],
    assignmentCultureProfileList = [],
    assignmentJobProfileList = [],
    isWeightageSelected = false,
    isRangeSelected = false,
    setUpAssociateModule,
    analyticSetUpModule,
    itemSetUpModule,
    assessmentSetUpModule,
    assesseeSetUpModule,
    assignmentSetUpModule
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const {
    typeOfMiddlePaneList,
    countPage,
    selectedAssociateInfo,
    reviewListDistinctData,
    reviewListReqObj,
    numberPage,
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    scanCount
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const assessmentInfo = useSelector((state) => state.AssessmentReducer);
  const assignmentInfo = useSelector((state) => state.AssignmentReducer);
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { informationBasic, assessee } = responseObject;
  const rightPaneSectionsAssessee = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOne,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwo,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssesseeRole = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssesseeRole,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssesseeRole,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssesseeGroup = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssesseeGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssesseeGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssociateRole = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssociateRole,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssociateRole,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssociateNode = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssociateNode,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssociateNode,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssociateGroup = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssociateGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssociateGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssessmentGroup = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssessmentGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssessmentGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsCultureProfileGroup = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneCultureProfileGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoCultureProfileGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsJobProfileGroup = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneJobProfileGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoJobProfileGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsCultureProfileType = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneCultureProfileType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoCultureProfileType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsJobProfileType = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneJobProfileType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoJobProfileType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsItemGroup = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneItemGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoItemGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssignmentGroup = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssignmentGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssignmentGroup,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssignmentType = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssignmentType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssignmentType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssessmentType = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssessmentType,
      // sectionComponent: DisplayPaneThreeSectionOneAssesseeReport,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssessmentType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssessmentSection = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssessmentSection,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionOneAssessmentSection,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssesseeReport = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssesseeReport,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionOneAssesseeReport,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssesseeType = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssesseeType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssesseeType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssociateType = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssociateType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssociateType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsItemType = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneItemType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoItemType,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssociate = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssociate,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssociate,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsItem = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneItem,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoItem,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssessment = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssessment,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssessment,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsCultureProfile = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneCultureProfileDistinct,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoCultureProfileDistinct,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsJobProfile = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneJobProfileDistinct,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoJobProfileDistinct,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const rightPaneSectionsAssignment = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneThreeSectionOneAssignment,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneThreeSectionTwoAssignment,
      displayPaneLeftHeaderText: '',
      displayPaneLeftBadgeText: ''
    }
  ];
  const [selectedSection, setSelectedSection] = useState(rightPaneSectionsAssessee[0]);
  const [selectedSectionAssesseeRole, setSelectedSectionAssesseeRole] = useState(
    rightPaneSectionsAssesseeRole[0]
  );
  const [selectedSectionAssesseeGroup, setSelectedSectionAssesseeGroup] = useState(
    rightPaneSectionsAssesseeGroup[0]
  );
  const [selectedSectionAssociateGroup, setSelectedSectionAssociateGroup] = useState(
    rightPaneSectionsAssociateGroup[0]
  );
  const [selectedSectionAssessmentGroup, setSelectedSectionAssessmentGroup] = useState(
    rightPaneSectionsAssessmentGroup[0]
  );
  const [selectedSectionCultureProfileGroup, setSelectedSectionCultureProfileGroup] = useState(
    rightPaneSectionsCultureProfileGroup[0]
  );
  const [selectedSectionJobProfileGroup, setSelectedSectionJobProfileGroup] = useState(
    rightPaneSectionsJobProfileGroup[0]
  );
  const [selectedSectionCultureProfileType, setSelectedSectionCultureProfileType] = useState(
    rightPaneSectionsCultureProfileType[0]
  );
  const [selectedSectionJobProfileType, setSelectedSectionJobProfileType] = useState(
    rightPaneSectionsJobProfileType[0]
  );
  const [selectedSectionItemGroup, setSelectedSectionItemGroup] = useState(
    rightPaneSectionsItemGroup[0]
  );
  const [selectedSectionAssignmentGroup, setSelectedSectionAssignmentGroup] = useState(
    rightPaneSectionsAssignmentGroup[0]
  );
  const [selectedSectionAssignmentType, setSelectedSectionAssignmentType] = useState(
    rightPaneSectionsAssignmentType[0]
  );
  const [selectedSectionAssessmentType, setSelectedSectionAssessmentType] = useState(
    rightPaneSectionsAssessmentType[0]
  );
  const [selectedSectionAssessmentSection, setSelectedSectionAssessmentSection] = useState(
    rightPaneSectionsAssessmentSection[0]
  );
  const [selectedSectionAssesseeReport, setSelectedSectionAssesseeReport] = useState(
    rightPaneSectionsAssesseeReport[0]
  );
  const [selectedSectionAssesseeType, setSelectedSectionAssesseeType] = useState(
    rightPaneSectionsAssesseeType[0]
  );
  const [selectedSectionAssociateType, setSelectedSectionAssociateType] = useState(
    rightPaneSectionsAssociateType[0]
  );
  const [selectedSectionItemType, setSelectedSectionItemType] = useState(
    rightPaneSectionsItemType[0]
  );
  const [selectedSectionAssessment, setSelectedSectionAssessment] = useState(
    rightPaneSectionsAssessment[0]
  );
  const [selectedSectionCultureProfile, setSelectedSectionCultureProfile] = useState(
    rightPaneSectionsCultureProfile[0]
  );
  const [selectedSectionJobProfile, setSelectedSectionJobProfile] = useState(
    rightPaneSectionsJobProfile[0]
  );
  const [selectedSectionAssignment, setSelectedSectionAssignment] = useState(
    rightPaneSectionsAssignment[0]
  );
  const [selectedSectionAssociateRole, setSelectedSectionAssociateRole] = useState(
    rightPaneSectionsAssociateRole[0]
  );
  const [selectedSectionAssociateNode, setSelectedSectionAssociateNode] = useState(
    rightPaneSectionsAssociateNode[0]
  );
  const [selectedSectionAssociate, setSelectedSectionAssociate] = useState(
    rightPaneSectionsAssociate[0]
  );
  const [selectedSectionItem, setSelectedSectionItem] = useState(rightPaneSectionsItem[0]);
  useEffect(() => {
    setSelectedSection(rightPaneSectionsAssessee[0]);
    setSelectedSectionAssesseeRole(rightPaneSectionsAssesseeRole[0]);
    setSelectedSectionAssesseeGroup(rightPaneSectionsAssesseeGroup[0]);
    setSelectedSectionAssociateGroup(rightPaneSectionsAssociateGroup[0]);
    setSelectedSectionAssessmentGroup(rightPaneSectionsAssessmentGroup[0]);
    setSelectedSectionCultureProfileGroup(rightPaneSectionsCultureProfileGroup[0]);
    setSelectedSectionJobProfileGroup(rightPaneSectionsJobProfileGroup[0]);
    setSelectedSectionCultureProfileType(rightPaneSectionsCultureProfileType[0]);
    setSelectedSectionJobProfileType(rightPaneSectionsJobProfileType[0]);
    setSelectedSectionItemGroup(rightPaneSectionsItemGroup[0]);
    setSelectedSectionAssignmentGroup(rightPaneSectionsAssignmentGroup[0]);
    setSelectedSectionAssignmentType(rightPaneSectionsAssignmentType[0]);
    setSelectedSectionAssessmentType(rightPaneSectionsAssessmentType[0]);
    setSelectedSectionAssesseeReport(rightPaneSectionsAssesseeReport[0]);
    setSelectedSectionAssesseeType(rightPaneSectionsAssesseeType[0]);
    setSelectedSectionAssociateType(rightPaneSectionsAssociateType[0]);
    setSelectedSectionItemType(rightPaneSectionsItemType[0]);
    setSelectedSectionAssessment(rightPaneSectionsAssessment[0]);
    if (isWeightageSelected) {
      setSelectedSectionCultureProfile(rightPaneSectionsCultureProfile[1]);
    } else {
      setSelectedSectionCultureProfile(rightPaneSectionsCultureProfile[0]);
    }
    if (isRangeSelected) {
      setSelectedSectionJobProfile(rightPaneSectionsJobProfile[1]);
    } else {
      setSelectedSectionJobProfile(rightPaneSectionsJobProfile[0]);
    }
    setSelectedSectionAssignment(rightPaneSectionsAssignment[0]);
    setSelectedSectionAssociateRole(rightPaneSectionsAssociateRole[0]);
    setSelectedSectionAssociateNode(rightPaneSectionsAssociateNode[0]);
    setSelectedSectionAssociate(rightPaneSectionsAssociate[0]);
    setSelectedSectionItem(rightPaneSectionsItem[0]);
    setIsShowReviseIcon(true);
  }, [
    responseObject,
    isWeightageSelected,
    isRangeSelected,
    setUpAssociateModule,
    analyticSetUpModule,
    itemSetUpModule,
    assessmentSetUpModule,
    assesseeSetUpModule,
    assignmentSetUpModule
  ]);

  const { navigatorIcon, FilterMode, FilterModeEnable } = useSelector(
    (state) => state.FilterReducer
  );
  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    console.log(siftValue);
    dispatch({ type: NAVIGATOR_MODE });
    if (siftValue === 'next') {
      onClickNext(
        reviewListDistinctData,
        responseObject.id,
        typeOfMiddlePaneList,
        selectedAssociateInfo,
        dispatch,
        headerOneBadgeTwo,
        reviewListReqObj,
        numberPage,
        middlePaneHeader,
        middlePaneHeaderBadgeOne,
        middlePaneHeaderBadgeTwo
      );
    }
    if (siftValue === 'previous') {
      onClickPrevious(
        reviewListDistinctData,
        responseObject.id,
        typeOfMiddlePaneList,
        selectedAssociateInfo,
        dispatch,
        headerOneBadgeTwo
      );
    }
    if (siftValue === 'first') {
      onClickFirst(
        reviewListDistinctData,
        responseObject.id,
        typeOfMiddlePaneList,
        selectedAssociateInfo,
        dispatch,
        headerOneBadgeTwo
      );
    }
    if (siftValue === 'last') {
      onClickLast(
        reviewListDistinctData,
        typeOfMiddlePaneList,
        selectedAssociateInfo,
        dispatch,
        scanCount,
        reviewListReqObj,
        numberPage,
        middlePaneHeader,
        middlePaneHeaderBadgeOne,
        middlePaneHeaderBadgeTwo
      );
    }
  };
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const assesseeInfo = useSelector((state) => state.AssesseeCreateReducer);
  const associateInfo = useSelector((state) => state.AssociateCreateReducer);
  const { cultureProfileInformation } = useSelector((state) => state.CultureProfileCreateReducer);
  const { jobProfileInformation } = useSelector((state) => state.JobProfileCreateReducer);
  const {
    assesseeGroup,
    assessmentGroup,
    assignmentGroup,
    associateGroup,
    itemGroup,
    cultureProfileGroup,
    jobProfileGroup
  } = useSelector((state) => state.GroupCreateReducer);
  const {
    assesseeType,
    assessmentType,
    assignmentType,
    associateType,
    itemType,
    cultureProfileType,
    jobProfileType
  } = useSelector((state) => state.TypeCreateReducer);
  const { associateRole, assesseeRole } = useSelector((state) => state.RoleCreateReducer);
  const { nodeInformation } = useSelector((state) => state.NodeCreateReducer);
  const primaryIcon = [{ label: 'navigator', onClick: onClickFooter, Icon: NavigatorIcon }];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  const onClickRevise = () => {
    console.log('ON CLICK REVISE ICON');
    setIsShowReviseIcon(false);
  };
  const onClickReviseCancel = () => {
    console.log('ON CLICK CANCEL ICON');
    if (headerOneBadgeOne === 'information' && headerOne === 'item') {
      setResponseToReducerObj(JSON.parse(originResponseObj), dispatch);
    }
    dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: 'review' });
    setIsShowReviseIcon(true);
  };
  const onClickReviseFinish = () => {
    console.log('ON CLICK FINISH ICON', assesseeInfo.informationBasic);
    if (
      headerOneBadgeOne === 'information' &&
      (headerOne === 'assessee' || headerOne === 'administrator' || headerOne === 'manager')
    ) {
      const {
        informationBasic,
        informationContact,
        informationPersonal,
        informationAllocation,
        informationSetup
      } = assesseeInfo;
      let selectedSignInCredential = '';
      if (informationSetup?.assesseeSignInCredential === 'email address (primary)') {
        selectedSignInCredential =
          responseObject.informationContact?.assesseeAddressEmailPrimary?.assesseeAddressEmail;
      } else if (informationSetup?.assesseeSignInCredential === 'email address (secondary)') {
        selectedSignInCredential =
          responseObject.informationContact?.assesseeAddressEmailSecondary?.assesseeAddressEmail;
      } else if (informationSetup?.assesseeSignInCredential === 'tag (primary)') {
        selectedSignInCredential =
          responseObject.informationEngagement?.assesseeTag?.assesseeTagPrimary;
      } else if (informationSetup?.assesseeSignInCredential === 'tag (secondary)') {
        selectedSignInCredential =
          responseObject.informationEngagement?.assesseeTag?.assesseeTagSecondary;
      } else if (informationSetup?.assesseeSignInCredential === 'mobile telephone (primary)') {
        selectedSignInCredential =
          responseObject.informationContact?.assesseeTelephoneMobilePrimary
            ?.assesseeTelephoneNumber;
      } else if (informationSetup?.assesseeSignInCredential === 'mobile telephone (secondary)') {
        selectedSignInCredential =
          responseObject.informationContact?.assesseeTelephoneMobileSecondary
            ?.assesseeTelephoneNumber;
      } else {
        selectedSignInCredential = responseObject?.informationSetup?.assesseeSignInCredential;
      }
      informationContact.assesseeAddressEmailPrimary.assesseeAddressEmailCommunication = false;
      if (assesseeInfo.tempCommunication === 'email address (primary)') {
        informationContact.assesseeAddressEmailPrimary.assesseeAddressEmailCommunication = true;
      }
      informationContact.assesseeAddressEmailSecondary.assesseeAddressEmailCommunication = false;
      if (assesseeInfo.tempCommunication === 'email address (secondary)') {
        informationContact.assesseeAddressEmailSecondary.assesseeAddressEmailCommunication = true;
      }
      //address communication
      informationContact.assesseeAddressHomePrimary.assesseeAddressCommunication = false;
      informationContact.assesseeAddressHomeSecondary.assesseeAddressCommunication = false;
      informationContact.assesseeAddressWorkPrimary.assesseeAddressCommunication = false;
      informationContact.assesseeAddressWorkSecondary.assesseeAddressCommunication = false;
      if (assesseeInfo.tempAddressCommunication === 'home address primary') {
        informationContact.assesseeAddressHomePrimary.assesseeAddressCommunication = true;
      }
      if (assesseeInfo.tempAddressCommunication === 'home address secondary') {
        informationContact.assesseeAddressHomeSecondary.assesseeAddressCommunication = true;
      }
      if (assesseeInfo.tempAddressCommunication === 'work address primary') {
        informationContact.assesseeAddressWorkPrimary.assesseeAddressCommunication = true;
      }
      if (assesseeInfo.tempAddressCommunication === 'work address secondary') {
        informationContact.assesseeAddressWorkSecondary.assesseeAddressCommunication = true;
      }
      // telephone communication
      informationContact.assesseeTelephoneHomePrimary.assesseeTelephoneCommunication = false;
      informationContact.assesseeTelephoneHomeSecondary.assesseeTelephoneCommunication = false;
      informationContact.assesseeTelephoneWorkPrimary.assesseeTelephoneCommunication = false;
      informationContact.assesseeTelephoneWorkSecondary.assesseeTelephoneCommunication = false;
      informationContact.assesseeTelephoneMobilePrimary.assesseeTelephoneCommunication = false;
      informationContact.assesseeTelephoneMobileSecondary.assesseeTelephoneCommunication = false;
      if (assesseeInfo.tempTelephoneCommunication === 'home telephone primary') {
        informationContact.assesseeTelephoneHomePrimary.assesseeTelephoneCommunication = true;
      }
      if (assesseeInfo.tempTelephoneCommunication === 'home telephone secondary') {
        informationContact.assesseeTelephoneHomeSecondary.assesseeTelephoneCommunication = true;
      }
      if (assesseeInfo.tempTelephoneCommunication === 'work telephone primary') {
        informationContact.assesseeTelephoneWorkPrimary.assesseeTelephoneCommunication = true;
      }
      if (assesseeInfo.tempTelephoneCommunication === 'work telephone secondary') {
        informationContact.assesseeTelephoneWorkSecondary.assesseeTelephoneCommunication = true;
      }
      if (assesseeInfo.tempTelephoneCommunication === 'mobile telephone primary') {
        informationContact.assesseeTelephoneMobilePrimary.assesseeTelephoneCommunication = true;
      }
      if (assesseeInfo.tempTelephoneCommunication === 'mobile telephone secondary') {
        informationContact.assesseeTelephoneMobileSecondary.assesseeTelephoneCommunication = true;
      }
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: id,
        associateId,
        assessee: {
          id,
          informationAllocation,
          informationBasic,
          informationContact,
          informationPersonal,
          informationSetup: {
            assesseeSignInCredential: selectedSignInCredential
          }
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSESSEE_INFO_REVISE_SAGA,
        payload: { secondaryOptionCheckValue: headerOneBadgeTwo, headerOne, reqBody }
      });
    } else if (
      headerOneBadgeOne === 'node' &&
      (headerOne === 'associate' ||
        headerOne === 'administrators' ||
        headerOne === 'managers' ||
        headerOne === 'assessees' ||
        headerOne === 'associates' ||
        headerOne === 'items' ||
        headerOne === 'culture profiles' ||
        headerOne === 'job profiles' ||
        headerOne === 'assessments' ||
        headerOne === 'assignments')
    ) {
      console.log('IN NODE REVISE');
      const { associateId, id } = responseObject;
      let reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        associateNode: {
          id,
          informationBasic: nodeInformation.informationBasic,
          // informationFramework: {
          //   associateNodeAscendant: {
          //     associateNodeAscendantPrimary:
          //       nodeInformation.informationFramework.associateNodeAscendant
          //         .associateNodeAscendantPrimary.id
          //   }
          // }
          informationFramework: nodeInformation.informationFramework,
          informationSetup: nodeInformation.informationSetup
        }
      };
      let associateNodeReqBody = null;
      let isShowAllModule = false;
      let sagaCall = '';
      if (headerOne === 'assessees') {
        reqBody = {
          ...reqBody,
          associateNodeAssessee: {
            associateNodeAssesseeAllocate:
              associateNodeAssessee?.associateNodeAssesseeAllocate || [],
            associateNodeAssesseeUnallocate:
              associateNodeAssessee?.associateNodeAssesseeUnallocate || []
          }
        };
        associateNodeReqBody = getAssesseeNodeAssesseeReqObj(
          selectedAssociateInfo,
          id,
          'active',
          0,
          countPage
        );
        isShowAllModule = false;
        sagaCall = GET_ASSESSEENODE_ASSESSEE_REVIEW_LIST;
      }
      if (headerOne === 'assessments') {
        reqBody = {
          ...reqBody,
          associateNodeAssessment: {
            associateNodeAssessmentAllocate:
              associateNodeAssessee?.associateNodeAssesseeAllocate || [],
            associateNodeAssessmentUnallocate:
              associateNodeAssessee?.associateNodeAssesseeUnallocate || []
          }
        };
        associateNodeReqBody = getNodeAssessmentsReqObj(
          selectedAssociateInfo,
          id,
          'active',
          0,
          countPage
        );
        isShowAllModule = false;
        sagaCall = GET_NODE_ASSESSMENTS_REVIEW_LIST_SAGA;
      }
      if (headerOne === 'assignments') {
        reqBody = {
          ...reqBody,
          associateNodeAssignment: {
            associateNodeAssignmentAllocate:
              associateNodeAssessee?.associateNodeAssesseeAllocate || [],
            associateNodeAssignmentUnallocate:
              associateNodeAssessee?.associateNodeAssesseeUnallocate || []
          }
        };
        associateNodeReqBody = getNodeAssignmentsReqObj(
          selectedAssociateInfo,
          id,
          'active',
          0,
          countPage
        );
        isShowAllModule = false;
        sagaCall = GET_NODE_ASSIGNMENTS_REVIEW_LIST_SAGA;
      }
      if (headerOne === 'associate') {
        isShowAllModule = true;
      }
      if (headerOne === 'associates') {
        reqBody = {
          ...reqBody,
          associateNodeAssociate: {
            associateNodeAssociateAllocate:
              associateNodeAssessee?.associateNodeAssesseeAllocate || [],
            associateNodeAssociateUnallocate:
              associateNodeAssessee?.associateNodeAssesseeUnallocate || []
          }
        };
        associateNodeReqBody = getNodeAssociatesReqObj(
          selectedAssociateInfo,
          id,
          'active',
          0,
          countPage
        );
        isShowAllModule = false;
        sagaCall = GET_NODE_ASSOCIATE_REVIEW_LIST;
      }
      if (headerOne === 'culture profiles') {
        reqBody = {
          ...reqBody,
          associateNodeCultureProfile: {
            associateNodeCultureProfileAllocate:
              associateNodeAssessee?.associateNodeAssesseeAllocate || [],
            associateNodeCultureProfileUnallocate:
              associateNodeAssessee?.associateNodeAssesseeUnallocate || []
          }
        };
        associateNodeReqBody = getNodeCultureProfileReqObj(
          selectedAssociateInfo,
          id,
          'active',
          0,
          countPage
        );
        isShowAllModule = false;
        sagaCall = GET_CULTURE_NODE_CULTURE_REVIEW_LIST_SAGA;
      }
      if (headerOne === 'job profiles') {
        reqBody = {
          ...reqBody,
          associateNodeJobProfile: {
            associateNodeJobProfileAllocate:
              associateNodeAssessee?.associateNodeAssesseeAllocate || [],
            associateNodeJobProfileUnallocate:
              associateNodeAssessee?.associateNodeAssesseeUnallocate || []
          }
        };
        associateNodeReqBody = getNodeJobProfileReqObj(
          selectedAssociateInfo,
          id,
          'active',
          0,
          countPage
        );
        isShowAllModule = false;
        sagaCall = GET_JOB_NODE_JOB_REVIEW_LIST_SAGA;
      }
      if (headerOne === 'items') {
        reqBody = {
          ...reqBody,
          associateNodeItem: {
            associateNodeItemAllocate: associateNodeAssessee?.associateNodeAssesseeAllocate || [],
            associateNodeItemUnallocate:
              associateNodeAssessee?.associateNodeAssesseeUnallocate || []
          }
        };
        associateNodeReqBody = getNodeItemsReqObj(
          selectedAssociateInfo,
          id,
          'active',
          0,
          countPage
        );
        isShowAllModule = false;
        sagaCall = GET_NODE_ITEMS_REVIEW_LIST_SAGA;
      }

      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSESSEE_NODE_INFO_REVISE_SAGA,
        payload: {
          selectedModule: headerOne,
          getReviewListSaga: sagaCall,
          isShowAllModule,
          reqBody,
          associateNodeReqBody,
          createMode
        }
      });
    } else if (
      headerOneBadgeOne === 'role' &&
      (headerOne === 'assessees' || headerOne === 'managers' || headerOne === 'administrators')
    ) {
      console.log('ASSESSEES ROLE REVISE');
      const { associateId, id } = responseObject;
      let reviseSetupObj = setPermissionToDefault(assesseeRole.informationSetup);
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        assesseeRoleAssessee: {
          assesseeRoleAssesseeAllocate: assesseeRoleAssessee?.assesseeRoleAssesseeAllocate || [],
          assesseeRoleAssesseeUnallocate: assesseeRoleAssessee?.assesseeRoleAssesseeUnallocate || []
        },
        assesseeRole: {
          id,
          informationBasic: assesseeRole.informationBasic,
          informationSetup: reviseSetupObj
        }
      };
      dispatch({ type: LOADER_START });
      let assesseeRoleAssesseeReqBody = getAssesseeRoleAssesseeReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSESSEE_ROLE_INFO_REVISE_SAGA,
        payload: { headerOne: 'assessees', reqBody, assesseeRoleAssesseeReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'role' && headerOne === 'associates') {
      console.log('ASS0CIATE ROLE REVISE');
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        associateRoleAssociate: {
          associateRoleAssociateAllocate: assesseeRoleAssessee?.assesseeRoleAssesseeAllocate || [],
          associateRoleAssociateUnallocate:
            assesseeRoleAssessee?.assesseeRoleAssesseeUnallocate || []
        },
        associateRole: {
          id,
          informationBasic: associateRole.informationBasic,
          informationSetup: associateRole.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let associateRoleAssociateReqBody = getAssociateRoleAssociateReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSOCIATE_ROLE_REVISE_INFO_SAGA,
        payload: { headerOne: 'associates', reqBody, associateRoleAssociateReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'group' && headerOne === 'associates') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        associateGroupAssociate: {
          associateGroupAssociateAllocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          associateGroupAssociateUnallocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        associateGroup: {
          id,
          informationBasic: associateGroup.informationBasic,
          informationSetup: associateGroup.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let associateGroupAssociateReqBody = getAssociateGroupAssociateReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSOCIATE_GROUP_REVISE_INFO_SAGA,
        payload: { headerOne: 'associates', associateGroupAssociateReqBody, reqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'group' && headerOne === 'assessments') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assessmentGroupAssessment: {
          assessmentGroupAssessmentAllocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          assessmentGroupAssessmentUnallocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        assessmentGroup: {
          id,
          informationBasic: assessmentGroup.informationBasic,
          informationSetup: assessmentGroup.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let assessmentGroupAssessmentReqBody = getAssessmentGroupAssessmentReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSESSMENT_GROUP_REVISE_INFO_SAGA,
        payload: { headerOne: 'assessments', reqBody, assessmentGroupAssessmentReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'group' && headerOne === 'culture profiles') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        cultureProfileGroupCultureProfile: {
          cultureProfileGroupCultureProfileAllocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          cultureProfileGroupCultureProfileUnallocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        cultureProfileGroup: {
          id,
          informationBasic: cultureProfileGroup.informationBasic,
          informationSetup: cultureProfileGroup.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let cultureGroupCultureReqBody = getCultureGroupCultureReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: CULTURE_GROUP_REVISE_INFO_SAGA,
        payload: { headerOne: 'culture profiles', reqBody, cultureGroupCultureReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'group' && headerOne === 'job profiles') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        jobProfileGroupJobProfile: {
          jobProfileGroupJobProfileAllocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          jobProfileGroupJobProfileUnallocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        jobProfileGroup: {
          id,
          informationBasic: jobProfileGroup.informationBasic,
          informationSetup: jobProfileGroup.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let jobGroupJobReqBody = getJobProfileGroupJobProfileReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: JOB_GROUP_REVISE_INFO_SAGA,
        payload: { headerOne: 'job profiles', reqBody, jobGroupJobReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'group' && headerOne === 'items') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        itemGroupItem: {
          itemGroupItemAllocate: assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          itemGroupItemUnallocate: assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        itemGroup: {
          id,
          informationBasic: itemGroup.informationBasic,
          informationSetup: itemGroup.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let itemGroupItemReqBody = getItemGroupItemReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ITEM_GROUP_REVISE_INFO_SAGA,
        payload: { headerOne: 'items', reqBody, itemGroupItemReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'group' && headerOne === 'assignments') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assignmentGroupAssignment: {
          assignmentGroupAssignmentAllocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          assignmentGroupAssignmentUnallocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        assignmentGroup: {
          id,
          informationBasic: assignmentGroup.informationBasic,
          informationSetup: assignmentGroup.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let assignmentGroupAssignmentReqBody = getAssignmentGroupAssignmentReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSIGNMENT_GROUP_REVISE_INFO_SAGA,
        payload: { headerOne: 'assignments', reqBody, assignmentGroupAssignmentReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'group' && headerOne === 'assessees') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        assesseeGroupAssessee: {
          assesseeGroupAssesseeAllocate: assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          assesseeGroupAssesseeUnallocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        assesseeGroup: {
          id,
          informationBasic: assesseeGroup.informationBasic,
          informationSetup: assesseeGroup.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let assesseeGroupAssesseeReqBody = getAssesseeGroupAssesseeReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSESSEE_GROUP_INFO_REVISE_SAGA,
        payload: { headerOne: 'assessees', assesseeGroupAssesseeReqBody, reqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'type' && headerOne === 'assessees') {
      const { associateId, id } = responseObject;
      console.log(assesseeType);
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        assesseeTypeAssessee: {
          assesseeTypeAssesseeAllocate: assesseeRoleAssessee?.assesseeRoleAssesseeAllocate || [],
          assesseeTypeAssesseeUnallocate: assesseeRoleAssessee?.assesseeRoleAssesseeUnallocate || []
        },
        assesseeType: {
          id,
          informationBasic: assesseeType.informationBasic,
          informationAllocation: assesseeType.informationAllocation,
          informationSetup: assesseeType.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let assesseeTypeAssesseeReqBody = getAssesseeTypeAssesseeReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSESSEE_TYPE_INFO_REVISE_SAGA,
        payload: { headerOne: 'assessees', reqBody, assesseeTypeAssesseeReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'type' && headerOne === 'assessments') {
      const { associateId, id } = responseObject;
      console.log(assessmentType);
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assessmentTypeAssessment: {
          assessmentTypeAssessmentAllocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          assessmentTypeAssessmentUnallocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        assessmentType: {
          id,
          informationBasic: assessmentType.informationBasic,
          informationAllocation: assessmentType.informationAllocation,
          informationSetup: assessmentType.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let assessmentTypeAssessmentReqBody = getAssessmentTypeAssessmentReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSESSMENT_TYPE_REVISE_INFO_SAGA,
        payload: { headerOne: 'assessments', reqBody, assessmentTypeAssessmentReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'type' && headerOne === 'assignments') {
      const { associateId, id } = responseObject;
      console.log(assignmentType);
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assignmentTypeAssignment: {
          assignmentTypeAssignmentAllocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          assignmentTypeAssignmentUnallocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        assignmentType: {
          id,
          informationBasic: assignmentType.informationBasic,
          informationAllocation: assignmentType.informationAllocation,
          informationSetup: assignmentType.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let assignmentTypeAssignmentReqBody = getAssignmentTypeAssignmentReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSIGNMENT_TYPE_REVISE_INFO_SAGA,
        payload: { headerOne: 'assignment', reqBody, assignmentTypeAssignmentReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'type' && headerOne === 'culture profiles') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        cultureProfileTypeCultureProfile: {
          cultureProfileTypeCultureProfileAllocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          cultureProfileTypeCultureProfileUnallocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        cultureProfileType: {
          id,
          informationBasic: cultureProfileType.informationBasic,
          informationAllocation: cultureProfileType.informationAllocation,
          informationSetup: cultureProfileType.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let cultureTypeCultureReqBody = getCultureTypeCultureReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: CULTURE_TYPE_REVISE_INFO_SAGA,
        payload: { headerOne: 'culture profiles', reqBody, cultureTypeCultureReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'type' && headerOne === 'job profiles') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        jobProfileTypeJobProfile: {
          jobProfileTypeJobProfileAllocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          jobProfileTypeJobProfileUnallocate:
            assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        jobProfileType: {
          id,
          informationBasic: jobProfileType.informationBasic,
          informationAllocation: jobProfileType.informationAllocation,
          informationSetup: jobProfileType.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let jobTypeJobReqBody = getJobProfileTypeJobProfileReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: JOB_TYPE_REVISE_INFO_SAGA,
        payload: { headerOne: 'job profiles', reqBody, jobTypeJobReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'type' && headerOne === 'items') {
      const { associateId, id } = responseObject;
      console.log(itemType);
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        itemTypeItem: {
          itemTypeItemAllocate: assesseeGroupAssessee?.assesseeGroupAssesseeAllocate || [],
          itemTypeItemUnallocate: assesseeGroupAssessee?.assesseeGroupAssesseeUnallocate || []
        },
        itemType: {
          id,
          informationBasic: itemType.informationBasic,
          informationSetup: itemType.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let itemTypeItemReqBody = getItemTypeItemReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ITEM_TYPE_REVISE_INFO_SAGA,
        payload: { headerOne: 'items', reqBody, itemTypeItemReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'type' && headerOne === 'associates') {
      const { associateId, id } = responseObject;
      console.log(associateType);
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        associateTypeAssociate: {
          associateTypeAssociateAllocate: assesseeRoleAssessee?.assesseeRoleAssesseeAllocate || [],
          associateTypeAssociateUnallocate:
            assesseeRoleAssessee?.assesseeRoleAssesseeUnallocate || []
        },
        associateType: {
          id,
          informationBasic: associateType.informationBasic,
          informationAllocation: associateType.informationAllocation,
          informationSetup: associateType.informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      let associateTypeAssociateReqBody = getAssociateTypeAssociateReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSOCIATE_TYPE_INFO_REVISE_SAGA,
        payload: { headerOne: 'associates', reqBody, associateTypeAssociateReqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'information' && headerOne === 'job profile') {
      const {
        informationBasic,
        informationAllocation,
        informationFramework
      } = jobProfileInformation;
      const { id } = responseObject;
      //jobProfileJobCompetencyTag
      let rangeCount = 0;
      let weightageCount = 0;
      let rangeArr = informationFramework?.jobProfileJobCompetencyRange || [];
      rangeArr.forEach((element) => {
        const rangeMax = element?.jobProfileJobCompetencyRangeMaximum || 0;
        if (rangeMax < 1) {
          rangeCount++;
        }
        element.jobProfileJobCompetencyTag = element.id;
      });
      let weightageArr = informationFramework?.jobProfileJobCompetencyWeightage || [];
      weightageArr.forEach((element) => {
        const weightageNum = element?.jobProfileJobCompetencyWeightage || 0;
        if (weightageNum < 1) {
          weightageCount++;
        }
        element.jobProfileJobCompetencyTag = element.id;
      });
      if (rangeCount > 0) {
        setIsShowReviseIcon(true);
        dispatch({ type: LOADER_STOP });
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'POPUPRANGEMSG', popupMode: 'JOBCREATE' }
        });
        return;
      }
      if (weightageCount > 0) {
        setIsShowReviseIcon(true);
        dispatch({ type: LOADER_STOP });
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'POPUPWEIGHTEMSG', popupMode: 'JOBCREATE' }
        });
        return;
      }
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        jobProfile: {
          id,
          informationBasic,
          informationAllocation,
          informationFramework: {
            jobProfileJobDomain: informationFramework?.jobProfileJobDomain || [],
            jobProfileJobFunction: informationFramework?.jobProfileJobFunction || [],
            jobProfileJobRole: informationFramework?.jobProfileJobRole || [],
            jobProfileJobCompetencyCore: informationFramework?.jobProfileJobCompetencyCore || [],
            jobProfileJobCompetencyShortlisted:
              informationFramework?.jobProfileJobCompetencyShortlisted || [],
            jobProfileJobCompetencySifted:
              informationFramework?.jobProfileJobCompetencySifted || [],
            jobProfileJobCompetencyRange: rangeArr,
            jobProfileJobCompetencyWeightage: weightageArr,
            jobProfileJobCompetencyCharacteristic: []
          }
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: JOB_PROFILE_INFO_REVISE_SAGA,
        payload: {
          secondaryOptionCheckValue: headerOneBadgeTwo,
          headerOne: 'job profile',
          reqBody,
          createMode
        }
      });
    } else if (headerOneBadgeOne === 'information' && headerOne === 'culture profile') {
      const {
        informationBasic,
        informationAllocation,
        informationFramework
      } = cultureProfileInformation;
      const { id } = responseObject;
      let cultureDimensionCore = informationFramework?.cultureProfileCultureDimensionCoreObj || [];
      let tempArr = [];
      let count = 0;
      cultureDimensionCore.forEach((element) => {
        const num = element?.cultureProfileCultureDimensionWeightage || 0;
        if (num < 1) {
          count++;
        }
        tempArr.push({
          cultureProfileCultureDimensionTag: element.cultureProfileCultureDimensionTag,
          cultureProfileCultureDimensionWeightage: element.cultureProfileCultureDimensionWeightage
        });
      });
      if (count > 0) {
        setIsShowReviseIcon(true);
        dispatch({ type: LOADER_STOP });
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'POPUPWEITAGENMSG', popupMode: 'CULTURECREATE' }
        });
        return;
      }
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId: id,
        cultureProfile: {
          id,
          informationBasic,
          informationAllocation,
          informationFramework: {
            cultureProfileCultureDimensionCore:
              informationFramework?.cultureProfileCultureDimensionCore || [],
            cultureProfileCultureDimensionWeightage: tempArr
          }
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: CULTURE_PROFILE_INFO_REVISE_SAGA,
        payload: {
          secondaryOptionCheckValue: headerOneBadgeTwo,
          headerOne: 'culture profile',
          reqBody,
          createMode
        }
      });
    } else if (headerOneBadgeOne === 'information' && headerOne === 'item') {
      const { informationBasic, informationAllocation } = itemInformation;
      const { id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        //associateId: id,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        item: {
          id,
          informationBasic,
          informationAllocation
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ITEM_INFO_REVISE_SAGA,
        payload: {
          secondaryOptionCheckValue: headerOneBadgeTwo,
          headerOne: 'item',
          reqBody,
          createMode
        }
      });
    } else if (headerOneBadgeOne === 'information' && headerOne === 'assessment') {
      const { informationBasic, informationAllocation, informationFramework } = assessmentInfo;
      const { id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assessment: {
          id,
          informationBasic,
          informationAllocation,
          informationFramework
        }
      };
      console.log('ASSESSMENT REVISE ===', reqBody);
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSESSMENT_INFO_REVISE_SAGA,
        payload: {
          secondaryOptionCheckValue: headerOneBadgeTwo,
          headerOne: 'assessment',
          reqBody,
          createMode
        }
      });
    } else if (headerOneBadgeOne === 'information' && headerOne === 'assignment') {
      console.log('ASSIGNMENT REVISE+++++>', assignmentAssessmentList, assignmentAssesseeList);
      const { informationBasic, informationAllocation } = assignmentInfo;
      const { id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assignment: {
          id,
          informationBasic,
          informationAllocation,
          informationFramework: {
            assignmentAssessee: assignmentAssesseeList || [],
            assignmentAssessment: assignmentAssessmentList || [],
            assignmentCultureProfile: assignmentCultureProfileList || [],
            assignmentJobProfile: assignmentJobProfileList || []
          }
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSIGNMENT_INFO_REVISE_SAGA,
        payload: {
          secondaryOptionCheckValue: headerOneBadgeTwo,
          headerOne: 'assignment',
          reqBody,
          createMode
        }
      });
    } else if (headerOneBadgeOne === 'information' && headerOne === 'associate') {
      const {
        informationBasic,
        informationAllocation,
        informationContact,
        informationSetup,
        associateCountry,
        associateCurrency,
        associateLanguage
      } = associateInfo;
      const updatedinformationSetup = {
        ...informationSetup.associate,
        associateCountry,
        associateCurrency,
        associateLanguage
      };
      const { id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        associate: {
          id,
          informationBasic,
          informationAllocation,
          informationContact,
          informationFramework: {
            associateAscendantPrimary:
              associateInfo.informationFramework.associateAscendant.associateAscendantPrimary[0]
          }
        }
      };
      // console.log(JSON.stringify(reqBody));
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSOCIATE_INFO_REVISE_SAGA,
        payload: { secondaryOptionCheckValue: headerOneBadgeTwo, headerOne: 'associate', reqBody }
      });
      if (informationSetup.assessee) {
        let setupObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId: id,
          assesseeAssociateSetup: informationSetup.assessee
        };
        dispatch({
          type: ASSOCIATE_ASSESSEESETUP_REVISE_SAGA,
          payload: { reqBody: setupObj }
        });
      }
      if (informationSetup.assessment) {
        let setupObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId: id,
          assessmentAssociateSetup: informationSetup.assessment
        };
        dispatch({
          type: ASSOCIATE_ASSESSMENTSETUP_REVISE_SAGA,
          payload: { reqBody: setupObj }
        });
      }
      if (informationSetup.assignment) {
        let setupObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId: id,
          assignmentAssociateSetup: informationSetup.assignment
        };
        dispatch({
          type: ASSOCIATE_ASSIGNMENTSETUP_REVISE_SAGA,
          payload: { reqBody: setupObj }
        });
      }
      if (informationSetup.associate) {
        let setupObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId: id,
          //associateSetup: informationSetup.associate
          associateSetup: updatedinformationSetup
        };
        dispatch({
          type: ASSOCIATE_ASSOCIATESETUP_REVISE_SAGA,
          payload: { reqBody: setupObj }
        });
      }
      if (informationSetup.associateNode) {
        let setupObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId: id,
          associateNodePermission: informationSetup.associateNode
        };
        dispatch({
          type: ASSOCIATE_ASSOCIATENODE_SETUP_REVISE_SAGA,
          payload: { reqBody: setupObj }
        });
      }
      if (informationSetup.item) {
        let setupObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId: id,
          itemAssociateSetup: informationSetup.item
        };
        dispatch({
          type: ASSOCIATE_ITEMSETUP_REVISE_SAGA,
          payload: { reqBody: setupObj }
        });
      }
      if (informationSetup.iguruAnalytic) {
        let setupObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId: id,
          iguruAnalyticAssociateSetup: informationSetup.iguruAnalytic
        };
        dispatch({
          type: ASSOCIATE_ANALYTICSETUP_REVISE_SAGA,
          payload: { reqBody: setupObj }
        });
      }
    } else {
      dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: 'review' });
    }
    setIsShowReviseIcon(true);
  };
  const onClickCreateAssessee = () => {
    console.log('ON CLICK CREATE ASSESSEE');
    dispatch({ type: ASSESSEE_INFO_CREATE });
    dispatch({
      type: ASSESSEE_SIGN_ON,
      payload: { isPopUpValue: 'ASSESSEENAMEPOPUP', popupMode: 'ASSESSEE_CREATE' }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'selectedInformationAllorKey', value: 'all' }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'typeOfAssesseeCreate',
        value: 'assessee'
      }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateAssessment = () => {
    console.log('ON CLICK CREATE ASSESSMENT');
    dispatch({ type: CLEAR_ASSESSMENT_INFO });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'selectedInformationAllorKey', value: headerOneBadgeTwo }
    });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ASSESSMENTCREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };

  const onClickCreateCultureProfile = () => {
    console.log('ON CLICK CREATE CultureProfile');
    dispatch({ type: CLEAR_CULTURE_REDUCER_STATE });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'selectedInformationAllorKey', value: headerOneBadgeTwo }
    });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'CULTURECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateJobProfile = () => {
    console.log('ON CLICK CREATE CultureProfile');
    dispatch({ type: CLEAR_CULTURE_REDUCER_STATE });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'selectedInformationAllorKey', value: headerOneBadgeTwo }
    });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ASSESSMENTCREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };

  const onClickCreateAssignment = () => {
    console.log('ON CLICK CREATE ASSIGNMENT');
    dispatch({ type: CLEAR_ASSIGNMENT_INFO });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'selectedInformationAllorKey', value: headerOneBadgeTwo }
    });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ASSIGNMENTCREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };

  const onClickCreateAssesseeGroup = () => {
    console.log('ON CLICK CREATE ASSESSEE GROUP');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesGROUPCREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateAssociateGroup = () => {
    console.log('ON CLICK CREATE ASSOCIATE GROUP');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesGROUPCREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateAssessmentGroup = () => {
    console.log('ON CLICK CREATE ASSESSMENT GROUP');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assessmentsGROUPCREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateCultureProfileGroup = () => {
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'culture profilesGROUPCREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateJobProfileGroup = () => {
    console.log('ON CLICK CREATE Job GROUP');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'job profilesTYPECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateCultureProfileType = () => {
    console.log('ON CLICK CREATE Culture Type');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'culture profilesTYPECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateJobProfileType = () => {
    console.log('ON CLICK CREATE Job Type');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'job profilesTYPECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };

  const onClickCreateItemGroup = () => {
    console.log('ON CLICK CREATE ASSESSMENT GROUP');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'itemsGROUPCREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };

  const onClickCreateAssignmentGroup = () => {
    console.log('ON CLICK CREATE ASSIGNMENT GROUP');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assignmentsGROUPCREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateAssignmentType = () => {
    console.log('ON CLICK CREATE ASSIGNMENT TYPE');
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assignmentsTYPECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateAssessmentType = () => {
    console.log('ON CLICK CREATE ASSESSMENT TYPE');
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assessmentsTYPECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateAssesseeType = () => {
    console.log('ON CLICK CREATE ASSESSEE TYPE');
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesTYPECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateAssociateType = () => {
    console.log('ON CLICK CREATE ASSOCIATE TYPE');
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesTYPECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateItemType = () => {
    console.log('ON CLICK CREATE ASSOCIATE TYPE');
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'itemsTYPECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };

  const onClickCreateAssesseeRole = () => {
    console.log('ON CLICK CREATE ASSESSEE ROLE');
    dispatch({ type: CLEAR_ROLE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesROLECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateItem = () => {
    console.log('ON CLICK CREATE ITEM');
    dispatch({ type: CLEAR_ITEM_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ITEMCREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateAssociateRole = () => {
    console.log('ON CLICK CREATE ASSOCIATE ROLE');
    dispatch({ type: CLEAR_ROLE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesROLECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const onClickCreateAssociateNode = () => {
    console.log('ON CLICK CREATE ASSOCIATE Node');
    dispatch({ type: CLEAR_NODE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'NODECREATE' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };

  const revisePrimaryIcon = [{ label: 'revise', onClick: onClickRevise, Icon: ReviseIcon }];
  const createAssesseePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssessee, Icon: AddIcon }
  ];
  const createItemPrimaryIcon = [{ label: 'create', onClick: onClickCreateItem, Icon: AddIcon }];
  const createAssessmentPrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssessment, Icon: AddIcon }
  ];
  const createCultureProfilePrimaryIcon = [
    { label: 'create', onClick: onClickCreateCultureProfile, Icon: AddIcon }
  ];
  const createJobProfilePrimaryIcon = [
    { label: 'create', onClick: onClickCreateCultureProfile, Icon: AddIcon }
  ];
  const createAssignmentPrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssignment, Icon: AddIcon }
  ];

  const createAssesseeGroupPrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssesseeGroup, Icon: AddIcon }
  ];
  const createAssociateGroupPrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssociateGroup, Icon: AddIcon }
  ];
  const createAssessmentGroupPrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssessmentGroup, Icon: AddIcon }
  ];
  const createCultureProfileGroupPrimaryIcon = [
    { label: 'create', onClick: onClickCreateCultureProfileGroup, Icon: AddIcon }
  ];
  const createJobProfileGroupPrimaryIcon = [
    { label: 'create', onClick: onClickCreateJobProfileGroup, Icon: AddIcon }
  ];
  const createCultureProfileTypePrimaryIcon = [
    { label: 'create', onClick: onClickCreateCultureProfileType, Icon: AddIcon }
  ];
  const createJobProfileTypePrimaryIcon = [
    { label: 'create', onClick: onClickCreateJobProfileType, Icon: AddIcon }
  ];
  const createItemGroupPrimaryIcon = [
    { label: 'create', onClick: onClickCreateItemGroup, Icon: AddIcon }
  ];
  const createAssignmentGroupPrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssignmentGroup, Icon: AddIcon }
  ];
  const createAssignmentTypePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssignmentType, Icon: AddIcon }
  ];
  const createAssessmentTypePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssessmentType, Icon: AddIcon }
  ];
  const createAssesseeTypePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssesseeType, Icon: AddIcon }
  ];
  const createAssociateTypePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssociateType, Icon: AddIcon }
  ];
  const createItemTypePrimaryIcon = [
    { label: 'create', onClick: onClickCreateItemType, Icon: AddIcon }
  ];

  const createAssesseeRolePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssesseeRole, Icon: AddIcon }
  ];
  const createAssociateRolePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssociateRole, Icon: AddIcon }
  ];
  const createAssociateNodePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssociateNode, Icon: AddIcon }
  ];

  const reviseSecondaryIcons = [
    { label: 'cancel', onClick: onClickReviseCancel, Icon: ClearIcon },
    { label: 'finish', onClick: onClickReviseFinish, Icon: Check }
  ];

  const onClickClearInfo = () => {
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
    dispatch({
      type: SET_MOBILE_PANE_STATE,
      payload:
        typeOfMiddlePaneList === '' ||
        typeOfMiddlePaneList === 'assesseesSelfReview' ||
        typeOfMiddlePaneList === 'associateSelfReview'
          ? 'displayPaneOne'
          : 'displayPaneTwo'
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'middlePaneSelectedValue', value: '' }
    });
  };
  console.log('DISPLAY PANE THREE++++++>', responseObject, headerOneBadgeThree);
  const reviseAssesseeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEENAMEPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'alias') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
  };
  const reviseAssesseeRoleBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'assesseesROLECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesROLECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'assesseesROLECREATE' }
      });
    }
  };
  const reviseAssesseeGroupBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'assesseesGROUPCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesGROUPCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'assesseesGROUPCREATE' }
      });
    }
  };
  const reviseAssociateGroupBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'associatesGROUPCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesGROUPCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'associatesGROUPCREATE' }
      });
    }
  };
  const reviseAssessmentGroupBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'assessmentsGROUPCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assessmentsGROUPCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'assessmentsGROUPCREATE' }
      });
    }
  };
  const reviseCultureProfileGroupBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'culture profilesGROUPCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'culture profilesGROUPCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'culture profilesGROUPCREATE' }
      });
    }
  };
  const reviseJobProfileGroupBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'job profilesGROUPCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'job profilesGROUPCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'job profilesGROUPCREATE' }
      });
    }
  };
  const reviseCultureProfileTypeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'culture profilesTYPECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'culture profilesTYPECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'culture profilesTYPECREATE' }
      });
    }
  };
  const reviseJobProfileTypeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'job profilesTYPECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'job profilesTYPECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'job profilesTYPECREATE' }
      });
    }
  };

  const reviseAssignmentGroupBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'assignmentsGROUPCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assignmentsGROUPCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'assignmentsGROUPCREATE' }
      });
    }
  };
  const reviseItemsGroupBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'itemsGROUPCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'itemsGROUPCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'itemsGROUPCREATE' }
      });
    }
  };
  const reviseAssociateNodeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'NODECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'NODECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'NODECREATE' }
      });
    }
  };

  const reviseAssociateRoleBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const profileId = e.currentTarget.getAttribute('id');
    console.log('====>', profileId);
    console.log('====>', labelName, informationBasic);
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'associatesROLECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesROLECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'associatesROLECREATE' }
      });
    }
  };

  const reviseAssociateBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSOCIATEPICTUREPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'NAMEALIASPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'DESCRIPTIONPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
  };
  const reviseAssessmentBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
  };
  const reviseCultureProfileBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'CULTURECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'CULTURECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'CULTURECREATE' }
      });
    }
  };
  const reviseJobProfileBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'JOBCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'JOBCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'JOBCREATE' }
      });
    }
  };

  const reviseAssignmentBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'ASSIGNMENTCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ASSIGNMENTCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'ASSIGNMENTCREATE' }
      });
    }
  };

  const reviseItemBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'ITEMCREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ITEMCREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'ITEMCREATE' }
      });
    }
  };

  const reviseAssociateTypeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'associatesTYPECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesTYPECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'associatesTYPECREATE' }
      });
    }
  };
  const reviseItemTypeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'itemsTYPECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'itemsTYPECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'itemsTYPECREATE' }
      });
    }
  };

  const reviseAssesseeTypeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'assesseesTYPECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesTYPECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'assesseesTYPECREATE' }
      });
    }
  };
  const reviseAssessmentTypeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'assessmentsTYPECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assessmentsTYPECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'assessmentsTYPECREATE' }
      });
    }
  };
  const reviseAssignmentTypeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    const profileId = e.currentTarget.getAttribute('id');
    if (profileId === 'profile-icon') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'assignmentsTYPECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assignmentsTYPECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'assignmentsTYPECREATE' }
      });
    }
  };
  console.log('reviewMode', reviewMode);
  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="right"
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo={headerOneBadgeTwo}
          headerOneBadgeThree={headerOneBadgeThree}
          headerPanelColour="green"
          onClickClearInfo={onClickClearInfo}
        />
      </div>
      {isReviewRevise &&
        responseObject &&
        ((headerOne === 'assessee' &&
          headerOneBadgeOne !== 'role' &&
          headerOneBadgeOne !== 'report') ||
          headerOne === 'administrator' ||
          headerOne === 'manager') && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.assesseeFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="alias"
                  textOneOne={`${
                    informationBasic?.assesseeNamePrefix
                  } ${informationBasic?.assesseeNameFirst.trim()} ${informationBasic?.assesseeNameOther.trim()} ${informationBasic?.assesseeNameLast.trim()} ${informationBasic.assesseeNameSuffix.trim()}`.trim()}
                  textOneTwo={informationBasic.assesseeAlias || 'No Information'}
                  isVerifiedActiveName={informationBasic?.assesseeNameVerification || false}
                  isVerifiedActivePicture={informationBasic?.assesseePictureVerification || false}
                  mode={reviewMode}
                  isImageActive={informationBasic.assesseePicture}
                  imageOne={informationBasic.assesseePicture}
                  onClickRevise={reviseAssesseeBasicInformation}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssessee}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}

            {createMode === 'assessee' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssessee}
                primaryIcon={createAssesseePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}

      {isReviewRevise &&
        responseObject &&
        ((headerOne === 'assessees' && headerOneBadgeOne === 'role') ||
          (headerOne === 'administrators' && headerOneBadgeOne === 'role') ||
          (headerOne === 'managers' && headerOneBadgeOne === 'role')) && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.assesseeRoleFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assesseeRoleName || 'No Information'}
                  textOneTwo={informationBasic.assesseeRoleDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  isImageActive={informationBasic.assesseeRolePicture}
                  imageOne={informationBasic.assesseeRolePicture}
                  onClickRevise={reviseAssesseeRoleBasicInformation}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssesseeRole}
                selectedSection={selectedSectionAssesseeRole}
                setSelectedSection={setSelectedSectionAssesseeRole}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assesseesRole' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssesseeRole}
                primaryIcon={createAssesseeRolePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assessees' &&
        headerOneBadgeOne === 'group' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.assesseeGroupFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assesseeGroupName || 'No Information'}
                  textOneTwo={informationBasic.assesseeGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  isImageActive={informationBasic.assesseeGroupPicture}
                  imageOne={informationBasic.assesseeGroupPicture}
                  onClickRevise={reviseAssesseeGroupBasicInformation}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssesseeGroup}
                selectedSection={selectedSectionAssesseeGroup}
                setSelectedSection={setSelectedSectionAssesseeGroup}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assesseesGroup' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssesseeGroup}
                primaryIcon={createAssesseeGroupPrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'associates' &&
        headerOneBadgeOne === 'group' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.associateGroupFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.associateGroupName || 'No Information'}
                  textOneTwo={informationBasic.associateGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  isImageActive={informationBasic.associateGroupPicture}
                  imageOne={informationBasic.associateGroupPicture}
                  onClickRevise={reviseAssociateGroupBasicInformation}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssociateGroup}
                selectedSection={selectedSectionAssociateGroup}
                setSelectedSection={setSelectedSectionAssociateGroup}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'associatesGroup' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssociateGroup}
                primaryIcon={createAssociateGroupPrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assessments' &&
        headerOneBadgeOne === 'group' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.assessmentGroupFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assessmentGroupName || 'No Information'}
                  textOneTwo={informationBasic.assessmentGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssessmentGroupBasicInformation}
                  isImageActive={informationBasic.assessmentGroupPicture}
                  imageOne={informationBasic.assessmentGroupPicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssessmentGroup}
                selectedSection={selectedSectionAssessmentGroup}
                setSelectedSection={setSelectedSectionAssessmentGroup}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assessmentsGroup' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssessmentGroup}
                primaryIcon={createAssessmentGroupPrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'culture profiles' &&
        headerOneBadgeOne === 'group' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.cultureProfileGroupFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic?.cultureProfileGroupName || 'No Information'}
                  textOneTwo={informationBasic?.cultureProfileGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseCultureProfileGroupBasicInformation}
                  isImageActive={informationBasic?.cultureProfileGroupPicture}
                  imageOne={informationBasic?.cultureProfileGroupPicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsCultureProfileGroup}
                selectedSection={selectedSectionCultureProfileGroup}
                setSelectedSection={setSelectedSectionCultureProfileGroup}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'culture ProfilesGroup' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateCultureProfileGroup}
                primaryIcon={createCultureProfileGroupPrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'job profiles' &&
        headerOneBadgeOne === 'group' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.jobProfileGroupFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.jobProfileGroupName || 'No Information'}
                  textOneTwo={informationBasic.jobProfileGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseJobProfileGroupBasicInformation}
                  isImageActive={informationBasic.jobProfileGroupPicture}
                  imageOne={informationBasic.jobProfileGroupPicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsJobProfileGroup}
                selectedSection={selectedSectionJobProfileGroup}
                setSelectedSection={setSelectedSectionJobProfileGroup}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'job ProfilesGroup' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateJobProfileGroup}
                primaryIcon={createJobProfileGroupPrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'culture profiles' &&
        headerOneBadgeOne === 'type' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.cultureProfileTypeFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.cultureProfileTypeName || 'No Information'}
                  textOneTwo={informationBasic.cultureProfileTypeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseCultureProfileTypeBasicInformation}
                  isImageActive={informationBasic.cultureProfileTypePicture}
                  imageOne={informationBasic.cultureProfileTypePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsCultureProfileType}
                selectedSection={selectedSectionCultureProfileType}
                setSelectedSection={setSelectedSectionCultureProfileType}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'cultureProfilesType' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateCultureProfileType}
                primaryIcon={createCultureProfileTypePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'job profiles' &&
        headerOneBadgeOne === 'type' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.jobProfileTypeFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.jobProfileTypeName || 'No Information'}
                  textOneTwo={informationBasic.jobProfileTypeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseJobProfileTypeBasicInformation}
                  isImageActive={informationBasic.jobProfileTypePicture}
                  imageOne={informationBasic.jobProfileTypePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsJobProfileType}
                selectedSection={selectedSectionJobProfileType}
                setSelectedSection={setSelectedSectionJobProfileType}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'jobProfilesType' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateJobProfileType}
                primaryIcon={createJobProfileTypePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise && responseObject && headerOne === 'items' && headerOneBadgeOne === 'group' && (
        <>
          <div style={{ padding: '2.5px' }}>
            <div style={{ padding: '2.5px' }}>
              <BasicCard
                isAlertActive
                isFlagActive={informationBasic?.itemGroupFlag || false}
                className=""
                labelTextOneOne="name"
                labelTextOneTwo="description"
                textOneOne={informationBasic?.itemGroupName || 'No Information'}
                textOneTwo={informationBasic?.itemGroupDescription || 'No Information'}
                isVerifiedActiveName={false}
                isVerifiedActivePicture={false}
                mode={reviewMode}
                onClickRevise={reviseItemsGroupBasicInformation}
                isImageActive={informationBasic?.itemGroupPicture}
                imageOne={informationBasic?.itemGroupPicture}
              />
            </div>
            <Sections
              listSections={rightPaneSectionsItemGroup}
              selectedSection={selectedSectionItemGroup}
              setSelectedSection={setSelectedSectionItemGroup}
            />
          </div>
          {reviewMode === 'revise' && (
            <FooterIconTwo
              FilterModeEnable={isShowReviseIcon}
              FilterMode={FilterMode}
              onClick={onClickRevise}
              primaryIcon={revisePrimaryIcon}
              secondaryIcon={reviseSecondaryIcons}
            />
          )}
          {createMode === 'itemsGroup' && reviewMode !== 'revise' && (
            <FooterIconTwo
              FilterModeEnable={true}
              FilterMode={FilterMode}
              onClick={onClickCreateItemGroup}
              primaryIcon={createItemGroupPrimaryIcon}
              secondaryIcon={[]}
            />
          )}
        </>
      )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assessment' &&
        headerOneBadgeOne === 'information' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.assessmentFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assessmentName || 'No Information'}
                  textOneTwo={informationBasic.assessmentDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssessmentBasicInformation}
                  isImageActive={informationBasic.assessmentPicture}
                  imageOne={informationBasic.assessmentPicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssessment}
                selectedSection={selectedSectionAssessment}
                setSelectedSection={setSelectedSectionAssessment}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assessment' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssessment}
                primaryIcon={createAssessmentPrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'culture profile' &&
        headerOneBadgeOne === 'information' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.cultureProfileFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.cultureProfileName || 'No Information'}
                  textOneTwo={informationBasic.cultureProfileDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseCultureProfileBasicInformation}
                  isImageActive={informationBasic.cultureProfilePicture}
                  imageOne={informationBasic.cultureProfilePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsCultureProfile}
                selectedSection={selectedSectionCultureProfile}
                setSelectedSection={setSelectedSectionCultureProfile}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'cultureProfile' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateCultureProfile}
                primaryIcon={createCultureProfilePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'job profile' &&
        headerOneBadgeOne === 'information' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.jobProfileFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.jobProfileName || 'No Information'}
                  textOneTwo={informationBasic.jobProfileDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseJobProfileBasicInformation}
                  isImageActive={informationBasic.jobProfilePicture}
                  imageOne={informationBasic.jobProfilePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsJobProfile}
                selectedSection={selectedSectionJobProfile}
                setSelectedSection={setSelectedSectionJobProfile}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'jobProfile' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateJobProfile}
                primaryIcon={createJobProfilePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assignment' &&
        headerOneBadgeOne === 'information' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.assignmentFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic?.assignmentName || 'No Information'}
                  textOneTwo={informationBasic?.assignmentDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssignmentBasicInformation}
                  isImageActive={informationBasic.assignmentPicture}
                  imageOne={informationBasic.assignmentPicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssignment}
                selectedSection={selectedSectionAssignment}
                setSelectedSection={setSelectedSectionAssignment}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assignment' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssignment}
                primaryIcon={createAssignmentPrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assignments' &&
        headerOneBadgeOne === 'group' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.assignmentGroupFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assignmentGroupName || 'No Information'}
                  textOneTwo={informationBasic.assignmentGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssignmentGroupBasicInformation}
                  isImageActive={informationBasic.assignmentGroupPicture}
                  imageOne={informationBasic.assignmentGroupPicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssignmentGroup}
                selectedSection={selectedSectionAssignmentGroup}
                setSelectedSection={setSelectedSectionAssignmentGroup}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assignmentsGroup' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssignmentGroup}
                primaryIcon={createAssignmentGroupPrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assignments' &&
        headerOneBadgeOne === 'type' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.assignmentTypeFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assignmentTypeName || 'No Information'}
                  textOneTwo={informationBasic.assignmentTypeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssignmentTypeBasicInformation}
                  isImageActive={informationBasic.assignmentTypePicture}
                  imageOne={informationBasic.assignmentTypePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssignmentType}
                selectedSection={selectedSectionAssignmentType}
                setSelectedSection={setSelectedSectionAssignmentType}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assignmentsType' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssignmentType}
                primaryIcon={createAssignmentTypePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assessments' &&
        headerOneBadgeOne === 'section' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={responseObject?.assessmentSectionFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={responseObject?.assessmentSectionName || 'No Information'}
                  textOneTwo={responseObject?.assessmentSectionDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  // onClickRevise={reviseAssessmentSectionBasicInformation}
                  isImageActive={responseObject?.assessmentSectionPicture}
                  imageOne={responseObject?.assessmentSectionPicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssessmentSection}
                selectedSection={selectedSectionAssessmentSection}
                setSelectedSection={setSelectedSectionAssessmentSection}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assessmentsType' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssessmentType}
                primaryIcon={createAssessmentTypePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assessments' &&
        headerOneBadgeOne === 'type' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.assessmentTypeFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic?.assessmentTypeName || 'No Information'}
                  textOneTwo={informationBasic?.assessmentTypeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssessmentTypeBasicInformation}
                  isImageActive={informationBasic?.assessmentTypePicture}
                  imageOne={informationBasic?.assessmentTypePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssessmentType}
                selectedSection={selectedSectionAssessmentType}
                setSelectedSection={setSelectedSectionAssessmentType}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assessmentsType' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssessmentType}
                primaryIcon={createAssessmentTypePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}

      {isReviewRevise && headerOne === 'assessee' && headerOneBadgeOne === 'report' && (
        <>
          <div style={{ padding: '2.5px' }}>
            <div style={{ padding: '2.5px' }}>
              <BasicCard
                isAlertActive
                isFlagActive={assessee.assesseeFlag}
                className=""
                labelTextOneOne="name"
                labelTextOneTwo="alias"
                textOneOne={assessee.assesseeNameFirst + ' ' + assessee.assesseeNameLast}
                textOneTwo={
                  assessee.assesseeAlias != '' ? assessee.assesseeAlias : 'No Information'
                }
                isVerifiedActiveName={false}
                isVerifiedActivePicture={false}
                mode={reviewMode}
              />
            </div>
            <Sections
              listSections={rightPaneSectionsAssesseeReport}
              selectedSection={selectedSectionAssesseeReport}
              setSelectedSection={DisplayPaneThreeSectionOneAssesseeReport}
            />
          </div>
        </>
      )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'assessees' &&
        headerOneBadgeOne === 'type' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.assesseeTypeFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic?.assesseeTypeName || 'No Information'}
                  textOneTwo={informationBasic?.assesseeTypeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssesseeTypeBasicInformation}
                  isImageActive={informationBasic?.assesseeTypePicture}
                  imageOne={informationBasic?.assesseeTypePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssesseeType}
                selectedSection={selectedSectionAssesseeType}
                setSelectedSection={setSelectedSectionAssesseeType}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'assesseesType' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssesseeType}
                primaryIcon={createAssesseeTypePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'associates' &&
        headerOneBadgeOne === 'type' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.associateTypeFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.associateTypeName || 'No Information'}
                  textOneTwo={informationBasic.associateTypeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssociateTypeBasicInformation}
                  isImageActive={informationBasic.associateTypePicture}
                  imageOne={informationBasic.associateTypePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssociateType}
                selectedSection={selectedSectionAssociateType}
                setSelectedSection={setSelectedSectionAssociateType}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'associatesType' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssociateType}
                primaryIcon={createAssociateTypePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise && responseObject && headerOne === 'items' && headerOneBadgeOne === 'type' && (
        <>
          <div style={{ padding: '2.5px' }}>
            <div style={{ padding: '2.5px' }}>
              <BasicCard
                isAlertActive
                isFlagActive={informationBasic?.itemTypeFlag || false}
                className=""
                labelTextOneOne="name"
                labelTextOneTwo="description"
                textOneOne={informationBasic.itemTypeName || 'No Information'}
                textOneTwo={informationBasic.itemTypeDescription || 'No Information'}
                isVerifiedActiveName={false}
                isVerifiedActivePicture={false}
                mode={reviewMode}
                onClickRevise={reviseItemTypeBasicInformation}
                isImageActive={informationBasic.itemTypePicture}
                imageOne={informationBasic.itemTypePicture}
              />
            </div>
            <Sections
              listSections={rightPaneSectionsItemType}
              selectedSection={selectedSectionItemType}
              setSelectedSection={setSelectedSectionItemType}
            />
          </div>
          {reviewMode === 'revise' && (
            <FooterIconTwo
              FilterModeEnable={isShowReviseIcon}
              FilterMode={FilterMode}
              onClick={onClickRevise}
              primaryIcon={revisePrimaryIcon}
              secondaryIcon={reviseSecondaryIcons}
            />
          )}
          {createMode === 'itemsType' && reviewMode !== 'revise' && (
            <FooterIconTwo
              FilterModeEnable={true}
              FilterMode={FilterMode}
              onClick={onClickCreateItemType}
              primaryIcon={createItemTypePrimaryIcon}
              secondaryIcon={[]}
            />
          )}
        </>
      )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'associates' &&
        headerOneBadgeOne === 'role' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.associateRoleFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.associateRoleName || 'No Information'}
                  textOneTwo={informationBasic.associateRoleDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssociateRoleBasicInformation}
                  isImageActive={informationBasic.associateRolePicture}
                  imageOne={informationBasic.associateRolePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssociateRole}
                selectedSection={selectedSectionAssociateRole}
                setSelectedSection={setSelectedSectionAssociateRole}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'associatesRole' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssociateRole}
                primaryIcon={createAssociateRolePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        (headerOne === 'associate' ||
          headerOne === 'associates' ||
          headerOne === 'assessees' ||
          headerOne === 'administrators' ||
          headerOne === 'managers' ||
          headerOne === 'assessments' ||
          headerOne === 'assignments' ||
          headerOne === 'culture profiles' ||
          headerOne === 'job profiles' ||
          headerOne === 'items') &&
        headerOneBadgeOne === 'node' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.associateNodeFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.associateNodeName || 'No Information'}
                  textOneTwo={informationBasic.associateNodeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssociateNodeBasicInformation}
                  isImageActive={informationBasic.associateNodePicture}
                  imageOne={informationBasic.associateNodePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssociateNode}
                selectedSection={selectedSectionAssociateNode}
                setSelectedSection={setSelectedSectionAssociateNode}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'associatesNode' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssociateNode}
                primaryIcon={createAssociateNodePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'associate' &&
        headerOneBadgeOne === 'information' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.associateFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic?.associateName || 'No Information'}
                  textOneTwo={informationBasic?.associateDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssociateBasicInformation}
                  isImageActive={informationBasic?.associatePicture}
                  imageOne={informationBasic?.associatePicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsAssociate}
                selectedSection={selectedSectionAssociate}
                setSelectedSection={setSelectedSectionAssociate}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}
            {createMode === 'associate' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateAssessee}
                primaryIcon={createAssesseePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise &&
        responseObject &&
        headerOne === 'item' &&
        headerOneBadgeOne === 'information' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive={informationBasic?.itemFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic?.itemName || 'No Information'}
                  textOneTwo={informationBasic?.itemDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseItemBasicInformation}
                  isImageActive={informationBasic?.itemPicture}
                  imageOne={informationBasic?.itemPicture}
                />
              </div>
              <Sections
                listSections={rightPaneSectionsItem}
                selectedSection={selectedSectionItem}
                setSelectedSection={setSelectedSectionItem}
              />
            </div>
            {reviewMode === 'revise' && (
              <FooterIconTwo
                FilterModeEnable={isShowReviseIcon}
                FilterMode={FilterMode}
                onClick={onClickRevise}
                primaryIcon={revisePrimaryIcon}
                secondaryIcon={reviseSecondaryIcons}
              />
            )}

            {createMode === 'item' && reviewMode !== 'revise' && (
              <FooterIconTwo
                FilterModeEnable={true}
                FilterMode={FilterMode}
                onClick={onClickCreateItem}
                primaryIcon={createItemPrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {reviewMode === 'review' && responseObject && headerOne !== '' && createMode === '' && (
        <FooterIconTwo
          FilterModeEnable={navigatorIcon}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
        // <div className={`middleFooterD`}>
        //   <div className={'footerInner'}>
        //     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        //       <BottomNavigation className={'MuiBottomNavigationCustom'}>
        //         <div className={'mbPager'}></div>
        //         <div className={'mbPager'}>
        //           <CircleIcon
        //             label={'first'}
        //             Icon={FirstPage}
        //             colour={'displayPaneCentre'}
        //             onClick={() => {
        //               onClickFirst(
        //                 reviewListDistinctData,
        //                 responseObject.id,
        //                 typeOfMiddlePaneList,
        //                 selectedAssociateInfo,
        //                 dispatch,
        //                 headerOneBadgeTwo
        //               );
        //             }}
        //             dataValue={'first'}
        //           />
        //         </div>
        //         <div className={'mbPager'}>
        //           <CircleIcon
        //             label={'previous'}
        //             Icon={ArrowLeft}
        //             colour={'displayPaneCentre'}
        //             dataValue={'previous'}
        //             onClick={() => {
        //               onClickPrevious(
        //                 reviewListDistinctData,
        //                 responseObject.id,
        //                 typeOfMiddlePaneList,
        //                 selectedAssociateInfo,
        //                 dispatch,
        //                 headerOneBadgeTwo
        //               );
        //             }}
        //           />
        //         </div>
        //         <div className={'mbPager'}>
        //           <CircleIcon
        //             label={'next'}
        //             Icon={ArrowRight}
        //             colour={'displayPaneCentre'}
        //             onClick={() => {
        //               onClickNext(
        //                 reviewListDistinctData,
        //                 responseObject.id,
        //                 typeOfMiddlePaneList,
        //                 selectedAssociateInfo,
        //                 dispatch,
        //                 headerOneBadgeTwo
        //               );
        //             }}
        //             dataValue={'next'}
        //           />
        //         </div>
        //         <div className={'mbPager'}>
        //           <CircleIcon
        //             label={'last'}
        //             Icon={LastPage}
        //             colour={'displayPaneCentre'}
        //             // onClick={}
        //             dataValue={'last'}
        //           />
        //         </div>
        //         <div className={'mbPager'}></div>{' '}
        //       </BottomNavigation>
        //     </Grid>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default DisplayPaneThree;
