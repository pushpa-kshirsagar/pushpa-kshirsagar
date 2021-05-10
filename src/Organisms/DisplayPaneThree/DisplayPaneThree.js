import React, { useEffect, useState } from 'react';
import NavigatorIcon from '@material-ui/icons/OpenWith';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import BasicCard from '../../Molecules/BasicCard/BasicCard';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import Sections from '../../Molecules/Section/Section';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSESSEE_INFO_CREATE,
  ASSESSEE_INFO_REVISE_SAGA,
  ASSESSEE_SIGN_ON,
  ASSOCIATE_INFO_REVISE_SAGA,
  ASSOCIATE_SIGN_ON,
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
  ASSOCIATE_ROLE_REVISE_INFO_SAGA
} from '../../actionType';
import FooterIconTwo from '../../Molecules/FooterIconTwo/FooterIconTwo';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import './DisplayPaneThree.css';
import DisplayPaneThreeSectionOne from '../../Molecules/DisplayPaneThreeSectionOne/DisplayPaneThreeSectionOne';
import DisplayPaneThreeSectionTwo from '../../Molecules/DisplayPaneThreeSectionTwo/DisplayPaneThreeSectionTwo';
import DisplayPaneThreeSectionOneAssociate from '../../Molecules/DisplayPaneThreeSectionOneAssociate/DisplayPaneThreeSectionOneAssociate';
import DisplayPaneThreeSectionTwoAssociate from '../../Molecules/DisplayPaneThreeSectionTwoAssociate/DisplayPaneThreeSectionTwoAssociate';
import DisplayPaneThreeSectionOneAssesseeRole from '../../Molecules/DisplayPaneThreeSectionOneAssesseeRole/DisplayPaneThreeSectionOneAssesseeRole';
import DisplayPaneThreeSectionTwoAssesseeRole from '../../Molecules/DisplayPaneThreeSectionTwoAssesseeRole/DisplayPaneThreeSectionTwoAssesseeRole';
import DisplayPaneThreeSectionOneAssociateRole from '../../Molecules/DisplayPaneThreeSectionOneAssociateRole/DisplayPaneThreeSectionOneAssociateRole';
import DisplayPaneThreeSectionTwoAssociateRole from '../../Molecules/DisplayPaneThreeSectionTwoAssociateRole/DisplayPaneThreeSectionTwoAssociateRole';
import DisplayPaneThreeSectionOneAssesseeGroup from '../../Molecules/DisplayPaneThreeSectionOneAssesseeGroup/DisplayPaneThreeSectionOneAssesseeGroup';
import DisplayPaneThreeSectionTwoAssesseeGroup from '../../Molecules/DisplayPaneThreeSectionTwoAssesseeGroup/DisplayPaneThreeSectionTwoAssesseeGroup';
import DisplayPaneThreeSectionOneAssociateGroup from '../../Molecules/DisplayPaneThreeSectionOneAssociateGroup/DisplayPaneThreeSectionOneAssociateGroup';
import DisplayPaneThreeSectionTwoAssociateGroup from '../../Molecules/DisplayPaneThreeSectionTwoAssociateGroup/DisplayPaneThreeSectionTwoAssociateGroup';
import DisplayPaneThreeSectionOneAssessmentGroup from '../../Molecules/DisplayPaneThreeSectionOneAssessmentGroup/DisplayPaneThreeSectionOneAssessmentGroup';
import DisplayPaneThreeSectionTwoAssessmentGroup from '../../Molecules/DisplayPaneThreeSectionTwoAssessmentGroup/DisplayPaneThreeSectionTwoAssessmentGroup';
import DisplayPaneThreeSectionOneAssignmentGroup from '../../Molecules/DisplayPaneThreeSectionOneAssignmentGroup/DisplayPaneThreeSectionOneAssignmentGroup';
import DisplayPaneThreeSectionTwoAssignmentGroup from '../../Molecules/DisplayPaneThreeSectionTwoAssignmentGroup/DisplayPaneThreeSectionTwoAssignmentGroup';
import DisplayPaneThreeSectionOneAssessment from '../../Molecules/DisplayPaneThreeSectionOneAssessment/DisplayPaneThreeSectionOneAssessment';
import DisplayPaneThreeSectionTwoAssessment from '../../Molecules/DisplayPaneThreeSectionTwoAssessment/DisplayPaneThreeSectionTwoAssessment';
import DisplayPaneThreeSectionOneAssignmentType from '../../Molecules/DisplayPaneThreeSectionOneAssignmentType/DisplayPaneThreeSectionOneAssignmentType';
import DisplayPaneThreeSectionTwoAssignmentType from '../../Molecules/DisplayPaneThreeSectionTwoAssignmentType/DisplayPaneThreeSectionTwoAssignmentType';
import DisplayPaneThreeSectionOneAssessmentType from '../../Molecules/DisplayPaneThreeSectionOneAssessmentType/DisplayPaneThreeSectionOneAssessmentType';
import DisplayPaneThreeSectionTwoAssessmentType from '../../Molecules/DisplayPaneThreeSectionTwoAssessmentType/DisplayPaneThreeSectionTwoAssessmentType';
import DisplayPaneThreeSectionOneAssignment from '../../Molecules/DisplayPaneThreeSectionOneAssignment/DisplayPaneThreeSectionOneAssignment';
import DisplayPaneThreeSectionTwoAssignment from '../../Molecules/DisplayPaneThreeSectionTwoAssignment/DisplayPaneThreeSectionTwoAssignment';
import DisplayPaneThreeSectionOneAssociateNode from '../../Molecules/DisplayPaneThreeSectionOneAssociateNode/DisplayPaneThreeSectionOneAssociateNode';
import DisplayPaneThreeSectionTwoAssociateNode from '../../Molecules/DisplayPaneThreeSectionTwoAssociateNode/DisplayPaneThreeSectionTwoAssociateNode';

export const DisplayPaneThree = () => {
  const dispatch = useDispatch();
  const {
    isReviewRevise = false,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo,
    headerOneBadgeThree,
    responseObject,
    reviewMode,
    createMode
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { showMiddlePaneState, selectedAssociateInfo } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const { informationBasic } = responseObject;
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
  const [selectedSectionAssignmentGroup, setSelectedSectionAssignmentGroup] = useState(
    rightPaneSectionsAssignmentGroup[0]
  );
  const [selectedSectionAssignmentType, setSelectedSectionAssignmentType] = useState(
    rightPaneSectionsAssignmentType[0]
  );
  const [selectedSectionAssessmentType, setSelectedSectionAssessmentType] = useState(
    rightPaneSectionsAssessmentType[0]
  );
  const [selectedSectionAssessment, setSelectedSectionAssessment] = useState(
    rightPaneSectionsAssessment[0]
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
  useEffect(() => {
    setSelectedSection(rightPaneSectionsAssessee[0]);
    setSelectedSectionAssesseeRole(rightPaneSectionsAssesseeRole[0]);
    setSelectedSectionAssesseeGroup(rightPaneSectionsAssesseeGroup[0]);
    setSelectedSectionAssociateGroup(rightPaneSectionsAssociateGroup[0]);
    setSelectedSectionAssessmentGroup(rightPaneSectionsAssessmentGroup[0]);
    setSelectedSectionAssignmentGroup(rightPaneSectionsAssignmentGroup[0]);
    setSelectedSectionAssignmentType(rightPaneSectionsAssignmentType[0]);
    setSelectedSectionAssessmentType(rightPaneSectionsAssessmentType[0]);
    setSelectedSectionAssessment(rightPaneSectionsAssessment[0]);
    setSelectedSectionAssignment(rightPaneSectionsAssignment[0]);
    setSelectedSectionAssociateRole(rightPaneSectionsAssociateRole[0]);
    setSelectedSectionAssociateNode(rightPaneSectionsAssociateNode[0]);
    setSelectedSectionAssociate(rightPaneSectionsAssociate[0]);
  }, [responseObject]);

  const { navigatorIcon, FilterMode } = useSelector((state) => state.FilterReducer);
  const onClickFooter = (e) => {
    dispatch({ type: NAVIGATOR_MODE });
  };
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const assesseeInfo = useSelector((state) => state.AssesseeCreateReducer);
  const associateInfo = useSelector((state) => state.AssociateCreateReducer);
  const { assesseeGroup, assessmentGroup, assignmentGroup, associateGroup } = useSelector(
    (state) => state.GroupCreateReducer
  );
  const { associateRole, assesseeRole } = useSelector((state) => state.RoleCreateReducer);
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
    dispatch({ type: SET_DISPLAY_PANE_THREE_REVIEW_MODE, payload: 'review' });
    setIsShowReviseIcon(true);
  };
  const onClickReviseFinish = () => {
    console.log('ON CLICK FINISH ICON', assesseeInfo.informationBasic);
    if (headerOneBadgeOne === 'information' && headerOne === 'assessee') {
      const {
        informationBasic,
        informationContact,
        informationPersonal,
        informationAllocation
      } = assesseeInfo;
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: id,
        associateId,
        assessee: {
          id,
          informationAllocation,
          informationBasic,
          informationContact,
          informationPersonal
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSESSEE_INFO_REVISE_SAGA,
        payload: { secondaryOptionCheckValue: headerOneBadgeTwo, headerOne: 'assessee', reqBody }
      });
    } else if (headerOneBadgeOne === 'role' && headerOne === 'assessees') {
      console.log('ASSESSEES ROLE REVISE');
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        assesseeRole: {
          id,
          informationBasic: assesseeRole.informationBasic
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSESSEE_ROLE_INFO_REVISE_SAGA,
        payload: { headerOne: 'assessees', reqBody }
      });
    } else if (headerOneBadgeOne === 'role' && headerOne === 'associates') {
      console.log('ASS0CIATE ROLE REVISE');
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        associateRole: {
          id,
          informationBasic: associateRole.informationBasic
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSOCIATE_ROLE_REVISE_INFO_SAGA,
        payload: { headerOne: 'associates', reqBody }
      });
    } else if (headerOneBadgeOne === 'group' && headerOne === 'associates') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        associateGroup: {
          id,
          informationBasic: associateGroup.informationBasic
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSOCIATE_GROUP_REVISE_INFO_SAGA,
        payload: { headerOne: 'associates', reqBody }
      });
    } else if (headerOneBadgeOne === 'group' && headerOne === 'assessees') {
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        assesseeGroup: {
          id,
          informationBasic: assesseeGroup.informationBasic
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSESSEE_GROUP_INFO_REVISE_SAGA,
        payload: { headerOne: 'assessees', reqBody }
      });
    } else if (headerOneBadgeOne === 'information' && headerOne === 'associate') {
      const { informationBasic, informationContact, informationSetup } = associateInfo;
      const { id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId: id,
        associate: {
          id,
          informationBasic,
          // informationContact,
          informationSetup
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSOCIATE_INFO_REVISE_SAGA,
        payload: { secondaryOptionCheckValue: headerOneBadgeTwo, headerOne: 'associate', reqBody }
      });
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
  };

  const onClickCreateAssesseeGroup = () => {
    console.log('ON CLICK CREATE ASSESSEE GROUP');
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesGROUPCREATE' }
    });
  };
  const onClickCreateAssociateGroup = () => {
    console.log('ON CLICK CREATE ASSOCIATE GROUP');
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesGROUPCREATE' }
    });
  };
  const onClickCreateAssessmentGroup = () => {
    console.log('ON CLICK CREATE ASSESSMENT GROUP');
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assessmentsGROUPCREATE' }
    });
  };
  const onClickCreateAssignmentGroup = () => {
    console.log('ON CLICK CREATE ASSIGNMENT GROUP');
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assignmentsGROUPCREATE' }
    });
  };
  const onClickCreateAssignmentType = () => {
    console.log('ON CLICK CREATE ASSIGNMENT TYPE');
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assignmentsTYPECREATE' }
    });
  };
  const onClickCreateAssessmentType = () => {
    console.log('ON CLICK CREATE ASSESSMENT TYPE');
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assessmentsTYPECREATE' }
    });
  };

  const onClickCreateAssesseeRole = () => {
    console.log('ON CLICK CREATE ASSESSEE ROLE');
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesROLECREATE' }
    });
  };
  const onClickCreateAssociateRole = () => {
    console.log('ON CLICK CREATE ASSOCIATE ROLE');
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesROLECREATE' }
    });
  };

  const revisePrimaryIcon = [{ label: 'revise', onClick: onClickRevise, Icon: ReviseIcon }];
  const createAssesseePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssessee, Icon: AddIcon }
  ];
  const createAssessmentPrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssessment, Icon: AddIcon }
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
  const createAssignmentGroupPrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssignmentGroup, Icon: AddIcon }
  ];
  const createAssignmentTypePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssignmentType, Icon: AddIcon }
  ];
  const createAssessmentTypePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssessmentType, Icon: AddIcon }
  ];

  const createAssesseeRolePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssesseeRole, Icon: AddIcon }
  ];
  const createAssociateRolePrimaryIcon = [
    { label: 'create', onClick: onClickCreateAssociateRole, Icon: AddIcon }
  ];

  const reviseSecondaryIcons = [
    { label: 'cancel', onClick: onClickReviseCancel, Icon: ClearIcon },
    { label: 'finish', onClick: onClickReviseFinish, Icon: Check }
  ];

  const onClickClearInfo = () => {
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
    dispatch({
      type: SET_MOBILE_PANE_STATE,
      payload: showMiddlePaneState ? 'displayPaneTwo' : 'displayPaneOne'
    });
  };
  console.log('DISPLAY PANE THREE++++++>', responseObject, headerOneBadgeThree);
  const reviseAssesseeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName, informationBasic);
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
    console.log('====>', labelName);
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
    console.log('====>', labelName);
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
    console.log('====>', labelName);
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
  const reviseAssociateNodeBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
    if (labelName === 'name') {
    }
    if (labelName === 'description') {
    }
  };

  const reviseAssociateRoleBasicInformation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('====>', labelName);
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
        ((headerOne === 'assessee' && headerOneBadgeOne !== 'role') ||
          headerOne === 'administrator' ||
          headerOne === 'manager') && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="alias"
                  textOneOne={`${informationBasic.assesseeNamePrefix} ${informationBasic.assesseeNameFirst} ${informationBasic.assesseeNameOther} ${informationBasic.assesseeNameLast} ${informationBasic.assesseeNameSuffix}`.trim()}
                  textOneTwo={informationBasic.assesseeAlias || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
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
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assesseeRoleName || 'No Information'}
                  textOneTwo={informationBasic.assesseeRoleDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
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
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assesseeGroupName || 'No Information'}
                  textOneTwo={informationBasic.assesseeGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
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
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.associateGroupName || 'No Information'}
                  textOneTwo={informationBasic.associateGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
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
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assessmentGroupName || 'No Information'}
                  textOneTwo={informationBasic.assessmentGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
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
        headerOne === 'assessment' &&
        headerOneBadgeOne === 'information' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assessmentName || 'No Information'}
                  textOneTwo={informationBasic.assessmentDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
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
        headerOne === 'assignment' &&
        headerOneBadgeOne === 'information' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assignmentName || 'No Information'}
                  textOneTwo={informationBasic.assignmentDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
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
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assignmentGroupName || 'No Information'}
                  textOneTwo={informationBasic.assignmentGroupDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
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
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assignmentTypeName || 'No Information'}
                  textOneTwo={informationBasic.assignmentTypeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
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
        headerOneBadgeOne === 'type' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assessmentTypeName || 'No Information'}
                  textOneTwo={informationBasic.assessmentTypeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
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
      {isReviewRevise &&
        responseObject &&
        headerOne === 'associates' &&
        headerOneBadgeOne === 'role' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.associateRoleName || 'No Information'}
                  textOneTwo={informationBasic.associateRoleDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssociateRoleBasicInformation}
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
        headerOne === 'associate' &&
        headerOneBadgeOne === 'node' && (
          <>
            <div style={{ padding: '2.5px' }}>
              <div style={{ padding: '2.5px' }}>
                <BasicCard
                  isAlertActive
                  isFlagActive
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.associateNodeName || 'No Information'}
                  textOneTwo={informationBasic.associateNodeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssociateNodeBasicInformation}
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
                onClick={onClickCreateAssociateRole}
                primaryIcon={createAssociateRolePrimaryIcon}
                secondaryIcon={[]}
              />
            )}
          </>
        )}
      {isReviewRevise && responseObject && headerOne === 'associate' && (
        <>
          <div style={{ padding: '2.5px' }}>
            <div style={{ padding: '2.5px' }}>
              <BasicCard
                isAlertActive
                isFlagActive
                className=""
                labelTextOneOne="name"
                labelTextOneTwo="description"
                textOneOne={informationBasic.associateName || 'No Information'}
                textOneTwo={informationBasic.associateDescription || 'No Information'}
                isVerifiedActiveName={false}
                isVerifiedActivePicture={false}
                mode={reviewMode}
                onClickRevise={reviseAssociateBasicInformation}
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
    </>
  );
};

export default DisplayPaneThree;
