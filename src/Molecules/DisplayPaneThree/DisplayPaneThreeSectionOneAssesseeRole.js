import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import {
  ASSESSEE_SIGN_ON,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_STATUS_POPUP_VALUE
} from '../../actionType';
import { assesseeRole, getRoleGroupReviewListApi } from '../../Actions/AssesseeModuleAction';
import { getPermissionStr } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOneAssesseeRole = () => {
  // const [listExpand, setListExpand] = useState('');
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { informationEngagement, informationAllocation, informationSetup } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const dispatch = useDispatch();

  let assesseeRoleGroupList = [];
  const tempRoleGroup = informationAllocation?.assesseeRoleGroup;
  const rolePermission = informationSetup?.assesseeRolePermission;
  if (tempRoleGroup) {
    assesseeRoleGroupList.push({
      id: tempRoleGroup?.id || '',
      textOne: tempRoleGroup?.informationBasic?.assesseeRoleGroupName || '',
      textTwo: tempRoleGroup?.informationBasic?.assesseeRoleGroupDescription || '',
      status: ''
    });
  }
  // const allocationList = [
  //   {
  //     id: 'a1',
  //     labelTextOneOne: 'group',
  //     labelTextOneOneBadgeOne: '',
  //     labelTextOneOneBadgeTwo: '',
  //     labelTextOneOneBadgeThree: '',
  //     labelTextOneOneBadgeFour: '',
  //     labelTextOneOneBadges: [
  //       {
  //         labelTextOneOneBadge: '',
  //         innerList: assesseeRoleGroupList
  //       }
  //     ],
  //     innerInfo: 'No Information',
  //     isListCard: true
  //   }
  // ];
  const engagementList = [
    {
      id: 'a1',
      labelTextOneOne: 'log',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'all',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'key',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a2',
      textOneOne:
        capitalizeFirstLetter(informationEngagement?.assesseeRoleStatus) || 'No Information',
      labelTextOneOne: 'status',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    },
    {
      id: 'a3',
      labelTextOneOne: 'tag',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne:
            informationEngagement?.assesseeRoleTag?.assesseeRoleTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationEngagement?.assesseeRoleTag?.assesseeRoleTagSecondary || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    },
    {
      id: 'a4',
      labelTextOneOne: 'tenure',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'start',
          textOne:
            informationEngagement?.assesseeRoleTenure?.assesseeRoleTenureDateTimeStart ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement?.assesseeRoleTenure?.assesseeRoleTenureDateTimeEnd ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  let assesseeDistinct = '';
  let assesseeDistinctPer = '';
  let assesseeGroup = '';
  let assesseeGroupPer = '';
  let assesseeManager = '';
  let assesseeManagerPer = '';
  let assesseeRole = '';
  let assesseeRolePer = '';
  let assesseeType = '';
  let assesseeTypePer = '';
  //assessment
  let assessmentDistinct,
    assessmentDistinctPer,
    assessmentGroup,
    assessmentGroupPer,
    assessmentManager,
    assessmentManagerPer,
    assessmentType,
    assessmentTypePer = '';
  //assignment
  let assignmentDistinct,
    assignmentDistinctPer,
    assignmentGroup,
    assignmentGroupPer,
    assignmentManager,
    assignmentManagerPer,
    assignmentReport,
    assignmentReportPer,
    assignmentType,
    assignmentTypePer = '';
  //associate
  let associateDistinct,
    associateDistinctPer,
    associateGroup,
    associateGroupPer,
    associateManager,
    associateManagerPer,
    associateNode,
    associateNodePer,
    associateRole,
    associateRolePer,
    associateType,
    associateTypePer = '';
  //iguruAnalytic
  let iguruAnalyticDistinct,
    iguruAnalyticDistinctPer,
    iguruAnalyticGroup,
    iguruAnalyticGroupPer,
    iguruAnalyticManager,
    iguruAnalyticManagerPer,
    iguruAnalyticType,
    iguruAnalyticTypePer = '';
  //item
  let itemDistinct,
    itemDistinctPer,
    itemGroup,
    itemGroupPer,
    itemManager,
    itemManagerPer,
    itemType,
    itemTypePer = '';
  if (rolePermission) {
    assesseeDistinct = getPermissionStr(rolePermission?.assesseeAssesseeDistinctPermission);
    assesseeDistinctPer =
      rolePermission.assesseeAssesseeDistinctPermission.assesseePermissionInformation;
    assesseeGroup = getPermissionStr(rolePermission?.assesseeAssesseeGroupPermission);
    assesseeGroupPer = rolePermission.assesseeAssesseeGroupPermission.assesseePermissionInformation;
    assesseeManager = getPermissionStr(rolePermission?.assesseeAssesseeManagerPermission);
    assesseeManagerPer =
      rolePermission.assesseeAssesseeManagerPermission.assesseePermissionInformation;
    assesseeRole = getPermissionStr(rolePermission?.assesseeAssesseeRolePermission);
    assesseeRolePer = rolePermission.assesseeAssesseeRolePermission.assesseePermissionInformation;
    assesseeType = getPermissionStr(rolePermission?.assesseeAssesseeTypePermission);
    assesseeTypePer = rolePermission.assesseeAssesseeTypePermission.assesseePermissionInformation;
    //assessments
    assessmentDistinct = getPermissionStr(rolePermission?.assesseeAssessmentDistinctPermission);
    assessmentDistinctPer =
      rolePermission.assesseeAssessmentDistinctPermission.assesseePermissionInformation;
    assessmentGroup = getPermissionStr(rolePermission?.assesseeAssessmentGroupPermission);
    assessmentGroupPer =
      rolePermission.assesseeAssessmentGroupPermission.assesseePermissionInformation;
    assessmentManager = getPermissionStr(rolePermission?.assesseeAssessmentManagerPermission);
    assessmentManagerPer =
      rolePermission.assesseeAssessmentManagerPermission.assesseePermissionInformation;
    assessmentType = getPermissionStr(rolePermission?.assesseeAssessmentTypePermission);
    assessmentTypePer =
      rolePermission.assesseeAssessmentTypePermission.assesseePermissionInformation;
    //assignment

    assignmentDistinct = getPermissionStr(rolePermission?.assesseeAssignmentDistinctPermission);
    assignmentDistinctPer =
      rolePermission.assesseeAssignmentDistinctPermission.assesseePermissionInformation;
    assignmentGroup = getPermissionStr(rolePermission?.assesseeAssignmentGroupPermission);
    assignmentGroupPer =
      rolePermission.assesseeAssignmentGroupPermission.assesseePermissionInformation;
    assignmentManager = getPermissionStr(rolePermission?.assesseeAssignmentManagerPermission);
    assignmentManagerPer =
      rolePermission.assesseeAssignmentManagerPermission.assesseePermissionInformation;
    assignmentReport = getPermissionStr(rolePermission?.assesseeAssignmentReportPermission);
    assignmentReportPer =
      rolePermission.assesseeAssignmentReportPermission.assesseePermissionInformation;
    assignmentType = getPermissionStr(rolePermission?.assesseeAssignmentTypePermission);
    assignmentTypePer =
      rolePermission.assesseeAssignmentTypePermission.assesseePermissionInformation;
    //associate

    associateDistinct = getPermissionStr(rolePermission?.assesseeAssociateDistinctPermission);
    associateDistinctPer =
      rolePermission.assesseeAssociateDistinctPermission.assesseePermissionInformation;
    associateGroup = getPermissionStr(rolePermission?.assesseeAssociateGroupPermission);
    associateGroupPer =
      rolePermission.assesseeAssociateGroupPermission.assesseePermissionInformation;
    associateManager = getPermissionStr(rolePermission?.assesseeAssociateManagerPermission);
    associateManagerPer =
      rolePermission.assesseeAssociateManagerPermission.assesseePermissionInformation;
    associateNode = getPermissionStr(rolePermission?.assesseeAssociateNodePermission);
    associateNodePer = rolePermission.assesseeAssociateNodePermission.assesseePermissionInformation;
    associateRole = getPermissionStr(rolePermission?.assesseeAssociateRolePermission);
    associateRolePer = rolePermission.assesseeAssociateRolePermission.assesseePermissionInformation;
    associateType = getPermissionStr(rolePermission?.assesseeAssociateTypePermission);
    associateTypePer = rolePermission.assesseeAssociateTypePermission.assesseePermissionInformation;
    //iGuru Analytics

    iguruAnalyticDistinct = getPermissionStr(
      rolePermission?.assesseeiGuruAnalyticDistinctPermission
    );
    iguruAnalyticDistinctPer =
      rolePermission?.assesseeiGuruAnalyticDistinctPermission?.assesseePermissionInformation;
    iguruAnalyticGroup = getPermissionStr(rolePermission?.assesseeiGuruAnalyticGroupPermission);
    iguruAnalyticGroupPer =
      rolePermission?.assesseeiGuruAnalyticGroupPermission?.assesseePermissionInformation;
    iguruAnalyticManager = getPermissionStr(rolePermission?.assesseeiGuruAnalyticManagerPermission);
    iguruAnalyticManagerPer =
      rolePermission?.assesseeiGuruAnalyticManagerPermission.assesseePermissionInformation;
    iguruAnalyticType = getPermissionStr(rolePermission?.assesseeiGuruAnalyticTypePermission);
    iguruAnalyticTypePer =
      rolePermission?.assesseeiGuruAnalyticTypePermission.assesseePermissionInformation;
    //Items

    itemDistinct = getPermissionStr(rolePermission?.assesseeItemDistinctPermission);
    itemDistinctPer = rolePermission?.assesseeItemDistinctPermission.assesseePermissionInformation;
    itemGroup = getPermissionStr(rolePermission?.assesseeItemGroupPermission);
    itemGroupPer = rolePermission?.assesseeItemGroupPermission.assesseePermissionInformation;
    itemManager = getPermissionStr(rolePermission?.assesseeItemManagerPermission);
    itemManagerPer = rolePermission?.assesseeItemManagerPermission.assesseePermissionInformation;
    itemType = getPermissionStr(rolePermission?.assesseeItemTypePermission);
    itemTypePer = rolePermission?.assesseeItemTypePermission.assesseePermissionInformation;
  }

  const setUpList = [
    {
      id: 'a1',
      labelTextOneOne: 'assessees',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assesseeDistinct || 'No Information',
              innerLabelInformation: assesseeDistinctPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assesseeGroup || 'No Information',
              innerLabelInformation: assesseeGroupPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assesseeManager || 'No Information',
              innerLabelInformation: assesseeManagerPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'role',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assesseeRole || 'No Information',
              innerLabelInformation: assesseeRolePer
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assesseeType || 'No Information',
              innerLabelInformation: assesseeTypePer
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'a-assessments',
      labelTextOneOne: 'assessments',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assessmentDistinct || 'No Information',
              innerLabelInformation: assessmentDistinctPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assessmentGroup || 'No Information',
              innerLabelInformation: assessmentGroupPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assessmentManager || 'No Information',
              innerLabelInformation: assessmentManagerPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assessmentType || 'No Information',
              innerLabelInformation: assessmentTypePer
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'a-assignments',
      labelTextOneOne: 'assignments',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assignmentDistinct || 'No Information',
              innerLabelInformation: assignmentDistinctPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assignmentGroup || 'No Information',
              innerLabelInformation: assignmentGroupPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assignmentManager || 'No Information',
              innerLabelInformation: assignmentManagerPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'report',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assignmentReport || 'No Information',
              innerLabelInformation: assignmentReportPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assignmentType || 'No Information',
              innerLabelInformation: assignmentTypePer
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'a-associates',
      labelTextOneOne: 'associates',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associateDistinct || 'No Information',
              innerLabelInformation: associateDistinctPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associateGroup || 'No Information',
              innerLabelInformation: associateGroupPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'node',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associateNode || 'No Information',
              innerLabelInformation: associateNodePer
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associateManager || 'No Information',
              innerLabelInformation: associateManagerPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'role',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associateRole || 'No Information',
              innerLabelInformation: associateRolePer
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associateType || 'No Information',
              innerLabelInformation: associateTypePer
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'a-classification',
      labelTextOneOne: 'classification',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a-iGuru Analytics',
      labelTextOneOne: 'iGuru Analytics',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: iguruAnalyticDistinct || 'No Information',
              innerLabelInformation: iguruAnalyticDistinctPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: iguruAnalyticGroup || 'No Information',
              innerLabelInformation: iguruAnalyticGroupPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: iguruAnalyticManager || 'No Information',
              innerLabelInformation: iguruAnalyticManagerPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: iguruAnalyticType || 'No Information',
              innerLabelInformation: iguruAnalyticTypePer
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'a-items',
      labelTextOneOne: 'items',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: itemDistinct || 'No Information',
              innerLabelInformation: itemDistinctPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: itemGroup || 'No Information',
              innerLabelInformation: itemGroupPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: itemManager || 'No Information',
              innerLabelInformation: itemManagerPer
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: itemType || 'No Information',
              innerLabelInformation: itemTypePer
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    }
  ];
  // const setUpList = [
  //   {
  //     id: 'a2',
  //     labelTextOneOne: 'permission',
  //     labelTextOneOneBadgeOne: '',
  //     labelTextOneOneBadgeTwo: '',
  //     labelTextOneOneBadgeThree: '',
  //     labelTextOneOneBadgeFour: '',
  //     labelTextOneOneBadges: [
  //       {
  //         labelTextOneOneBadge: '',
  //         innerList: [
  //           {
  //             id: 'associate1',
  //             textOne: 'Simple Sample 01',
  //             textTwo: '',
  //             status: 'active'
  //           },
  //           {
  //             id: 'associate2',
  //             textOne: 'Simple Sample 02',
  //             textTwo: '',
  //             status: 'active'
  //           },
  //           {
  //             id: 'associate3',
  //             textOne: 'Simple Sample 03',
  //             textTwo: '',
  //             status: 'active'
  //           }
  //         ]
  //       }
  //     ],
  //     innerInfo: 'No Information',
  //     isListCard: true,
  //     isReviewLink: true
  //   }
  // ];
  const reviseEngagement = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'status') {
      dispatch({
        type: SET_STATUS_POPUP_VALUE,
        payload: capitalizeFirstLetter(informationEngagement?.assesseeRoleStatus)
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'STATUSPOPUP', popupMode: 'assesseesROLECREATE' }
      });
    }
    if (labelName === 'tag') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TAGREADONLYPRIMARYPOPUP', popupMode: 'assesseesROLECREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TAGSECONDARYPOPUP', popupMode: 'assesseesROLECREATE' }
        });
      }
    }
    if (labelName === 'tenure') {
      if (selectedBadgeName === 'start') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TENURESATRTDATEPOPUP', popupMode: 'assesseesROLECREATE' }
        });
      }
      if (selectedBadgeName === 'end') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TENUREENDDATEPOPUP', popupMode: 'assesseesROLECREATE' }
        });
      }
    }
  };
  function splitCamelCaseToString(s) {
    return s
      .split(/(?=[A-Z])/)
      .map(function (p) {
        return p.charAt(0).toUpperCase() + p.slice(1);
      })
      .join(' ');
  }
  const reviseSetUp = (e, data, selectedBadge) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    let selected = data ? data[0] : null;
    if (
      labelName !== '' &&
      (selected?.labelTextTwoBadge === 'distinct' ||
        selected?.labelTextTwoBadge === 'group' ||
        selected?.labelTextTwoBadge === 'manager' ||
        selected?.labelTextTwoBadge === 'node' ||
        selected?.labelTextTwoBadge === 'role' ||
        selected?.labelTextTwoBadge === 'type') &&
      selectedBadge?.labelTextTwoBadge === 'permission'
    ) {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'permissionStateOne', value: labelName }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'permissionStateTwo', value: selected?.labelTextTwoBadge }
      });
      let camelCaseStr =
        labelName === 'iGuru Analytics'
          ? 'iGuruAnalytic'
          : splitCamelCaseToString(labelName).slice(0, -1);
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'permissionStateThree',
          value:
            'assessee' +
            camelCaseStr +
            splitCamelCaseToString(selected?.labelTextTwoBadge) +
            'Permission'
        }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PERMISSIONPOPUP', popupMode: 'assesseesROLECREATE' }
      });
    }
  };

  const reviseAllocation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
    if (labelName === 'group') {
      getRoleGroupReviewListApi(selectedAssociateInfo, dispatch, 'assessees');
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ROLEGROUPPOPUP', popupMode: 'assesseesROLECREATE' }
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
            {engagementList.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      onClickRevise={reviseEngagement}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      onClickRevise={reviseEngagement}
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  )}
                </div>
              );
            })}
          </Paper>
        </div>
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            {setUpList.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      onClickRevise={reviseSetUp}
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      onClickRevise={reviseSetUp}
                      accordianObject={ob}
                      isPermission
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

export default DisplayPaneThreeSectionOneAssesseeRole;
