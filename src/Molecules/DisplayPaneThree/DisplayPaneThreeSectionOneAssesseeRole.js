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
  const getPermissionStr = (permissionObj) => {
    console.log('permissionObj', permissionObj);
    let per = '';
    if (permissionObj) {
      Object.keys(permissionObj).map(function (key, val) {
        if (typeof permissionObj[key] === 'boolean' && permissionObj[key] === true) {
          per = per !== '' ? per + ', ' + key : key;
        }
      });
    }
    console.log('per', per);
    // Object.keys()
    //   .toString()
    //   .replace(',assesseePermissionInformation', '')
    return per;
  };
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
  const allocationList = [
    {
      id: 'a1',
      labelTextOneOne: 'group',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: assesseeRoleGroupList
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];
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
  console.log('rolePermission', rolePermission);
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
  if (rolePermission) {
    assesseeDistinct = getPermissionStr(rolePermission?.assesseeAssesseeDistinctPermission);
    assesseeDistinctPer =
      rolePermission.assesseeAssesseeDistinctPermission.assesseePermissionInformation;
    assesseeGroup = Object.keys(rolePermission?.assesseeAssesseeGroupPermission)
      .toString()
      .replace(',assesseePermissionInformation', '');
    assesseeGroupPer = rolePermission.assesseeAssesseeGroupPermission.assesseePermissionInformation;
    assesseeManager = Object.keys(rolePermission?.assesseeAssesseeManagerPermission)
      .toString()
      .replace(',assesseePermissionInformation', '');
    assesseeManagerPer =
      rolePermission.assesseeAssesseeManagerPermission.assesseePermissionInformation;
    assesseeRole = Object.keys(rolePermission?.assesseeAssesseeRolePermission)
      .toString()
      .replace(',assesseePermissionInformation', '');
    assesseeRolePer = rolePermission.assesseeAssesseeRolePermission.assesseePermissionInformation;
    assesseeType = Object.keys(rolePermission?.assesseeAssesseeTypePermission)
      .toString()
      .replace(',assesseePermissionInformation', '');
    assesseeTypePer = rolePermission.assesseeAssesseeTypePermission.assesseePermissionInformation;
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
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
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
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'report',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
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
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'node',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'role',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
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
      id: 'a-iGuru Analytics',
      labelTextOneOne: 'iGuru Analytics',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
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
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
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
    console.log('===data==>', data);
    console.log('===selectedBadge==>', selectedBadge);
    console.log('=====>', selectedBadgeName);
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
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'permissionStateThree',
          value:
            'assessee' +
            splitCamelCaseToString(labelName).slice(0, -1) +
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
            {allocationList.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      className=""
                      onClickRevise={reviseAllocation}
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      onClickRevise={reviseAllocation}
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
