import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import { SET_DISPLAY_TWO_SINGLE_STATE, SET_POPUP_VALUE } from '../../actionType';
import { getRoleGroupReviewListApi } from '../../Actions/AssesseeModuleAction';

const DisplayPaneThreeSectionOneAssociateRole = () => {
  // const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationEngagement, informationAllocation, informationSetup } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  let associateRoleGroupList = [];
  const tempRoleGroup = informationAllocation?.associateRoleGroup;
  if (tempRoleGroup) {
    associateRoleGroupList.push({
      id: tempRoleGroup?.id || '',
      textOne: tempRoleGroup?.informationBasic?.associateRoleGroupName || '',
      textTwo: tempRoleGroup?.informationBasic?.associateRoleGroupDescription || '',
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
  //         innerList: associateRoleGroupList
  //       }
  //     ],
  //     innerInfo: 'No Information',
  //     isListCard: true
  //   }
  // ];
  const list3 = [
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
        capitalizeFirstLetter(informationEngagement?.associateRoleStatus) || 'No Information',
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
            informationEngagement?.associateRoleTag?.associateRoleTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationEngagement?.associateRoleTag?.associateRoleTagSecondary || 'No Information'
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
            informationEngagement?.associateRoleTenure?.associateRoleTenureDateTimeStart ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement?.associateRoleTenure?.associateRoleTenureDateTimeEnd ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  const getPermissionStr = (permissionObj) => {
    console.log('permissionObj', permissionObj);
    let per = '';
    if (permissionObj) {
      Object.keys(permissionObj).map(function (key, val) {
        if (typeof permissionObj[key] === 'boolean' && permissionObj[key] === true) {
          per = per !== '' ? per + ', ' + splitCamelCaseToString(key) : splitCamelCaseToString(key);
        }
      });
    }
    return per;
  };
  let assesseePermission = getPermissionStr(
    informationSetup?.associateRolePermission?.associateAssesseePermission
  );
  let assessmentPermission = getPermissionStr(
    informationSetup?.associateRolePermission?.associateAssessmentPermission
  );
  let assignmentPermission = getPermissionStr(
    informationSetup?.associateRolePermission?.associateAssignmentPermission
  );
  let associatePermission = getPermissionStr(
    informationSetup?.associateRolePermission?.associateAssociatePermission
  );
  let iguruAnalyticPermission = getPermissionStr(
    informationSetup?.associateRolePermission?.associateiGuruAnalyticPermission
  );
  let itemPermission = getPermissionStr(
    informationSetup?.associateRolePermission?.associateItemPermission
  );
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
              innerLabelBadgeList: assesseePermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assesseePermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assesseePermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'role',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assesseePermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assesseePermission || 'No Information'
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
              innerLabelBadgeList: assessmentPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assessmentPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assessmentPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assessmentPermission || 'No Information'
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
              innerLabelBadgeList: assignmentPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assignmentPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assignmentPermission || 'No Information'
            }
          ]
        },

        {
          labelTextTwoBadge: 'report',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assignmentPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: assignmentPermission || 'No Information'
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
              innerLabelBadgeList: associatePermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associatePermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associatePermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'node',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associatePermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'role',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associatePermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: associatePermission || 'No Information'
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
      textOneOne:
        informationSetup?.associateRoleClassification?.associateRoleClassificationPrimary ||
        'No Information',
      labelTextOneOne: 'classification',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
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
              innerLabelBadgeList: iguruAnalyticPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: iguruAnalyticPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: iguruAnalyticPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: iguruAnalyticPermission || 'No Information'
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
              innerLabelBadgeList: itemPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: itemPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'manager',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: itemPermission || 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: itemPermission || 'No Information'
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
          value: 'associate' + camelCaseStr + 'Permission'
        }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PERMISSIONPOPUP', popupMode: 'associatesROLECREATE' }
      });
    }
    else if(labelName==='classification'){
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ROLEGROUPPOPUP', popupMode: 'associatesROLECREATE' }
      });
    }
  };
  const reviseAllocation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
    if (labelName === 'group') {
      getRoleGroupReviewListApi(selectedAssociateInfo, dispatch, 'associates');
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ROLEGROUPPOPUP', popupMode: 'associatesROLECREATE' }
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
            {list3.map((ob) => {
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
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            {setUpList.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                      onClickRevise={reviseSetUp}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      accordianObject={ob}
                      mode={reviewMode}
                      onClickRevise={reviseSetUp}
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

export default DisplayPaneThreeSectionOneAssociateRole;
