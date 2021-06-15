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
  CLEAR_CULTURE_REDUCER_STATE
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
import {
  getAssesseeGroupAssesseeReqObj,
  getAssesseeNodeAssesseeReqObj,
  getAssesseeRoleAssesseeReqObj
} from '../../Actions/AssesseeModuleAction';
import {
  getAssociateGroupAssociateReqObj,
  getAssociateRoleAssociateReqObj
} from '../../Actions/AssociateModuleAction';
import DisplayPaneThreeSectionOneAssesseeType from '../../Molecules/DisplayPaneThreeSectionOneAssesseeType/DisplayPaneThreeSectionOneAssesseeType';
import DisplayPaneThreeSectionOneAssociateType from '../../Molecules/DisplayPaneThreeSectionOneAssociateType/DisplayPaneThreeSectionOneAssociateType';
import DisplayPaneThreeSectionTwoAssesseeType from '../../Molecules/DisplayPaneThreeSectionTwoAssesseeType/DisplayPaneThreeSectionTwoAssesseeType';
import DisplayPaneThreeSectionTwoAssociateType from '../../Molecules/DisplayPaneThreeSectionTwoAssociateType/DisplayPaneThreeSectionTwoAssociateType';
import DisplayPaneThreeSectionOneItem from '../../Molecules/DisplayPaneThreeSectionOneItem/DisplayPaneThreeSectionOneItem';
import DisplayPaneThreeSectionTwoItem from '../../Molecules/DisplayPaneThreeSectionTwoItem/DisplayPaneThreeSectionTwoItem';
import DisplayPaneThreeSectionOneItemGroup from '../../Molecules/DisplayPaneThreeSectionOneItemGroup/DisplayPaneThreeSectionOneItemGroup';
import DisplayPaneThreeSectionTwoItemGroup from '../../Molecules/DisplayPaneThreeSectionTwoItemGroup/DisplayPaneThreeSectionTwoItemGroup';
import DisplayPaneThreeSectionTwoItemType from '../../Molecules/DisplayPaneThreeSectionTwoItemType/DisplayPaneThreeSectionTwoItemType';
import DisplayPaneThreeSectionOneItemType from '../../Molecules/DisplayPaneThreeSectionOneItemType/DisplayPaneThreeSectionOneItemType';
import {
  getAssessmentGroupAssessmentReqObj,
  getAssessmentTypeAssessmentReqObj,
  getAssignmentGroupAssignmentReqObj,
  getAssignmentTypeAssignmentReqObj,
  getItemGroupItemReqObj,
  getItemTypeItemReqObj
} from '../../Actions/GenericActions';
import DisplayPaneThreeSectionOneCultureProfileDistinct from '../../Molecules/DisplayPaneThreeSectionOneCultureProfileDistinct/DisplayPaneThreeSectionOneCultureProfileDistinct';
import DisplayPaneThreeSectionTwoCultureProfileDistinct from '../../Molecules/DisplayPaneThreeSectionTwoCultureProfileDistinct/DisplayPaneThreeSectionTwoCultureProfileDistinct';
import DisplayPaneThreeSectionOneJobProfileDistinct from '../../Molecules/DisplayPaneThreeSectionOneJobProfileDistinct/DisplayPaneThreeSectionOneJobProfileDistinct';
import DisplayPaneThreeSectionTwoJobProfileDistinct from '../../Molecules/DisplayPaneThreeSectionTwoJobProfileDistinct/DisplayPaneThreeSectionTwoJobProfileDistinct';

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
    createMode,
    assesseeGroupAssessee,
    assesseeRoleAssessee,
    associateNodeAssessee
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { typeOfMiddlePaneList, countPage, selectedAssociateInfo } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const assessmentInfo = useSelector((state) => state.AssessmentReducer);
  const assignmentInfo = useSelector((state) => state.AssignmentReducer);
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
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
    setSelectedSectionItemGroup(rightPaneSectionsItemGroup[0]);
    setSelectedSectionAssignmentGroup(rightPaneSectionsAssignmentGroup[0]);
    setSelectedSectionAssignmentType(rightPaneSectionsAssignmentType[0]);
    setSelectedSectionAssessmentType(rightPaneSectionsAssessmentType[0]);
    setSelectedSectionAssesseeType(rightPaneSectionsAssesseeType[0]);
    setSelectedSectionAssociateType(rightPaneSectionsAssociateType[0]);
    setSelectedSectionItemType(rightPaneSectionsItemType[0]);
    setSelectedSectionAssessment(rightPaneSectionsAssessment[0]);
    setSelectedSectionCultureProfile(rightPaneSectionsCultureProfile[0]);
    setSelectedSectionJobProfile(rightPaneSectionsJobProfile[0]);
    setSelectedSectionAssignment(rightPaneSectionsAssignment[0]);
    setSelectedSectionAssociateRole(rightPaneSectionsAssociateRole[0]);
    setSelectedSectionAssociateNode(rightPaneSectionsAssociateNode[0]);
    setSelectedSectionAssociate(rightPaneSectionsAssociate[0]);
    setSelectedSectionItem(rightPaneSectionsItem[0]);
    setIsShowReviseIcon(true);
  }, [responseObject]);

  const { navigatorIcon, FilterMode } = useSelector((state) => state.FilterReducer);
  const onClickFooter = (e) => {
    dispatch({ type: NAVIGATOR_MODE });
  };
  const [isShowReviseIcon, setIsShowReviseIcon] = useState(true);
  const assesseeInfo = useSelector((state) => state.AssesseeCreateReducer);
  const associateInfo = useSelector((state) => state.AssociateCreateReducer);
  const {
    assesseeGroup,
    assessmentGroup,
    assignmentGroup,
    associateGroup,
    itemGroup
  } = useSelector((state) => state.GroupCreateReducer);
  const { assesseeType, assessmentType, assignmentType, associateType, itemType } = useSelector(
    (state) => state.TypeCreateReducer
  );
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
        headerOne === 'assessments' ||
        headerOne === 'assignments')
    ) {
      console.log('IN NODE REVISE');
      const { associateId, id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId,
        associateNodeAssessee: {
          associateNodeAssesseeAllocate: associateNodeAssessee?.associateNodeAssesseeAllocate || [],
          associateNodeAssesseeUnallocate:
            associateNodeAssessee?.associateNodeAssesseeUnallocate || []
        },
        associateNode: {
          id,
          informationBasic: nodeInformation.informationBasic,
          informationFramework: {
            associateNodeAscendant: {
              associateNodeAscendantPrimary:
                nodeInformation.informationFramework.associateNodeAscendant
                  .associateNodeAscendantPrimary[0]
            }
          }
        }
      };
      dispatch({ type: LOADER_START });
      let associateNodeAssesseeReqBody = getAssesseeNodeAssesseeReqObj(
        selectedAssociateInfo,
        id,
        'active',
        0,
        countPage
      );
      dispatch({
        type: ASSESSEE_NODE_INFO_REVISE_SAGA,
        payload: { selectedModule: headerOne, reqBody, associateNodeAssesseeReqBody, createMode }
      });
    } else if (
      headerOneBadgeOne === 'role' &&
      (headerOne === 'assessees' || headerOne === 'managers' || headerOne === 'administrators')
    ) {
      console.log('ASSESSEES ROLE REVISE');
      const { associateId, id } = responseObject;
      let allocationObj = {
        assesseeRoleGroup: assesseeRole.informationAllocation.assesseeRoleGroup[0]
      };
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
          informationAllocation: allocationObj
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
          informationBasic: associateRole.informationBasic
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
          informationBasic: associateGroup.informationBasic
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
          informationBasic: assessmentGroup.informationBasic
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
          informationBasic: itemGroup.informationBasic
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
          informationBasic: assignmentGroup.informationBasic
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
          informationBasic: assesseeGroup.informationBasic
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
        assesseeType: {
          id,
          informationBasic: assesseeType.informationBasic,
          informationAllocation: assesseeType.informationAllocation
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSESSEE_TYPE_INFO_REVISE_SAGA,
        payload: { headerOne: 'assessees', reqBody, createMode }
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
          informationBasic: assessmentType.informationBasic
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
          informationBasic: assignmentType.informationBasic
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
          informationBasic: itemType.informationBasic
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
        associateType: {
          id,
          informationBasic: associateType.informationBasic,
          informationAllocation: associateType.informationAllocation
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSOCIATE_TYPE_INFO_REVISE_SAGA,
        payload: { headerOne: 'associates', reqBody, createMode }
      });
    } else if (headerOneBadgeOne === 'information' && headerOne === 'item') {
      const { informationBasic, informationAllocation } = itemInformation;
      const { id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId: id,
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
      const { informationBasic, informationAllocation } = assessmentInfo;
      const { id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId: id,
        assessment: {
          id,
          informationBasic,
          informationAllocation
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
      const { informationBasic, informationAllocation } = assignmentInfo;
      const { id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId: id,
        assignment: {
          id,
          informationBasic,
          informationAllocation
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
      const { informationBasic, informationContact, informationSetup } = associateInfo;
      const { id } = responseObject;
      const reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId: id,
        associate: {
          id,
          informationBasic,
          informationContact,
          // informationSetup,
          informationFramework: {
            associateAscendantPrimary:
              associateInfo.informationFramework.associateAscendant.associateAscendantPrimary[0]
          }
        }
      };
      console.log(JSON.stringify(reqBody));
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

  const onClickCreateCultureProfile = () => {
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
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesGROUPCREATE' }
    });
  };
  const onClickCreateAssociateGroup = () => {
    console.log('ON CLICK CREATE ASSOCIATE GROUP');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesGROUPCREATE' }
    });
  };
  const onClickCreateAssessmentGroup = () => {
    console.log('ON CLICK CREATE ASSESSMENT GROUP');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assessmentsGROUPCREATE' }
    });
  };

  const onClickCreateItemGroup = () => {
    console.log('ON CLICK CREATE ASSESSMENT GROUP');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'itemsGROUPCREATE' }
    });
  };

  const onClickCreateAssignmentGroup = () => {
    console.log('ON CLICK CREATE ASSIGNMENT GROUP');
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assignmentsGROUPCREATE' }
    });
  };
  const onClickCreateAssignmentType = () => {
    console.log('ON CLICK CREATE ASSIGNMENT TYPE');
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assignmentsTYPECREATE' }
    });
  };
  const onClickCreateAssessmentType = () => {
    console.log('ON CLICK CREATE ASSESSMENT TYPE');
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assessmentsTYPECREATE' }
    });
  };
  const onClickCreateAssesseeType = () => {
    console.log('ON CLICK CREATE ASSESSEE TYPE');
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesTYPECREATE' }
    });
  };
  const onClickCreateAssociateType = () => {
    console.log('ON CLICK CREATE ASSOCIATE TYPE');
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesTYPECREATE' }
    });
  };
  const onClickCreateItemType = () => {
    console.log('ON CLICK CREATE ASSOCIATE TYPE');
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'itemsTYPECREATE' }
    });
  };

  const onClickCreateAssesseeRole = () => {
    console.log('ON CLICK CREATE ASSESSEE ROLE');
    dispatch({ type: CLEAR_ROLE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'assesseesROLECREATE' }
    });
  };
  const onClickCreateItem = () => {
    console.log('ON CLICK CREATE ITEM');
    dispatch({ type: CLEAR_ITEM_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ITEMCREATE' }
    });
  };
  const onClickCreateAssociateRole = () => {
    console.log('ON CLICK CREATE ASSOCIATE ROLE');
    dispatch({ type: CLEAR_ROLE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'associatesROLECREATE' }
    });
  };
  const onClickCreateAssociateNode = () => {
    console.log('ON CLICK CREATE ASSOCIATE Node');
    dispatch({ type: CLEAR_NODE_REDUCER_STATE });
    dispatch({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'NODECREATE' }
    });
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
      payload: typeOfMiddlePaneList === '' ? 'displayPaneOne' : 'displayPaneTwo'
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
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'CULTUREPROFILECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'CULTUREPROFILECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'CULTUREPROFILECREATE' }
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
        payload: { isPopUpValue: 'PICTUREPOPUP', popupMode: 'JOBPROFILECREATE' }
      });
    }
    if (labelName === 'name') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'JOBPROFILECREATE' }
      });
    }
    if (labelName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ALIASPOPUP', popupMode: 'JOBPROFILECREATE' }
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
                  isFlagActive={informationBasic?.assesseeFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="alias"
                  textOneOne={`${
                    informationBasic.assesseeNamePrefix
                  } ${informationBasic.assesseeNameFirst.trim()} ${informationBasic.assesseeNameOther.trim()} ${informationBasic.assesseeNameLast.trim()} ${informationBasic.assesseeNameSuffix.trim()}`.trim()}
                  textOneTwo={informationBasic.assesseeAlias || 'No Information'}
                  isVerifiedActiveName={informationBasic?.assesseeNameVerification || false}
                  isVerifiedActivePicture={informationBasic?.assesseePictureVerification || false}
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
                  isFlagActive={informationBasic?.assesseeRoleFlag || false}
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
                  isFlagActive={informationBasic?.assesseeGroupFlag || false}
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
                  isFlagActive={informationBasic?.associateGroupFlag || false}
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
                textOneOne={informationBasic.itemGroupName || 'No Information'}
                textOneTwo={informationBasic.itemGroupDescription || 'No Information'}
                isVerifiedActiveName={false}
                isVerifiedActivePicture={false}
                mode={reviewMode}
                onClickRevise={reviseItemsGroupBasicInformation}
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
        headerOne === 'culture profiles' &&
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
        headerOne === 'job profiles' &&
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
                  isFlagActive={informationBasic?.assessmentTypeFlag || false}
                  className=""
                  labelTextOneOne="name"
                  labelTextOneTwo="description"
                  textOneOne={informationBasic.assessmentTypeName || 'No Information'}
                  textOneTwo={informationBasic.assessmentTypeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssessmentTypeBasicInformation}
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
                  textOneOne={informationBasic.assesseeTypeName || 'No Information'}
                  textOneTwo={informationBasic.assesseeTypeDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseAssesseeTypeBasicInformation}
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
          headerOne === 'assessees' ||
          headerOne === 'administrators' ||
          headerOne === 'managers' ||
          headerOne === 'assessments' ||
          headerOne === 'assignments') &&
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
                  textOneOne={informationBasic.itemName || 'No Information'}
                  textOneTwo={informationBasic.itemDescription || 'No Information'}
                  isVerifiedActiveName={false}
                  isVerifiedActivePicture={false}
                  mode={reviewMode}
                  onClickRevise={reviseItemBasicInformation}
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
    </>
  );
};

export default DisplayPaneThree;
