import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import {
  ASSESSEE_SIGN_ON,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  LOADER_START,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT
} from '../../actionType';
import { makeAssesseeGroupObj, makeAssesseeRoleObj } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOne = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const dispatch = useDispatch();
  const { informationEngagement, informationSetup, informationAllocation } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const allianceList1 = [
    {
      id: 'a1',
      labelTextOneOne: 'family',
      labelTextOneOneBadgeOne: 'ascendant',
      labelTextOneOneBadgeTwo: 'descendant',
      labelTextOneOneBadgeThree: 'sibling',
      labelTextOneOneBadgeFour: 'spouse',
      isListCard: true,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerList: [
            {
              id: 'associate1',
              textOne: 'Simple Sample 01',
              textTwo: 'family',
              status: ''
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'family',
              status: ''
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'family',
              status: ''
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'sibling',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'spouse',
          innerList: []
        }
      ],
      innerAssociateList: [
        {
          id: 'associate1',
          textOne: 'Simple Sample 01',
          textTwo: 'family',
          status: ''
        },
        {
          id: 'associate2',
          textOne: 'Simple Sample 02',
          textTwo: 'family',
          status: ''
        },
        {
          id: 'associate3',
          textOne: 'Simple Sample 03',
          textTwo: 'family',
          status: ''
        }
      ],
      innerInfo: 'No Information'
    },
    {
      id: 'a2',
      labelTextOneOne: 'guardian',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: [
            {
              id: 'associate1',
              textOne: 'Simple Sample 01',
              textTwo: 'guardian',
              status: 'active'
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'guardian',
              status: 'active'
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'guardian',
              status: 'active'
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerAssociateList: [
        {
          id: 'associate1',
          textOne: 'Simple Sample 01',
          textTwo: 'guardian',
          status: 'active'
        },
        {
          id: 'associate2',
          textOne: 'Simple Sample 02',
          textTwo: 'guardian',
          status: 'active'
        },
        {
          id: 'associate3',
          textOne: 'Simple Sample 03',
          textTwo: 'guardian',
          status: 'active'
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a3',
      labelTextOneOne: 'mentor',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: [
            {
              id: 'associate1',
              textOne: 'Simple Sample 01',
              textTwo: 'mentor',
              status: ''
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'mentor',
              status: ''
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'mentor',
              status: ''
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerAssociateList: [
        {
          id: 'associate1',
          textOne: 'Simple Sample 01',
          textTwo: 'mentor',
          status: ''
        },
        {
          id: 'associate2',
          textOne: 'Simple Sample 02',
          textTwo: 'mentor',
          status: ''
        },
        {
          id: 'associate3',
          textOne: 'Simple Sample 03',
          textTwo: 'mentor',
          status: ''
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];
  let assesseeGroupListPrimary = [];
  if (informationAllocation?.assesseeGroup.assesseeGroupPrimary.length > 0) {
    const tempArr = informationAllocation?.assesseeGroup?.assesseeGroupPrimary;
    tempArr.forEach((ob) => {
      assesseeGroupListPrimary.push({
        id: ob.id,
        textOne: ob.informationBasic.assesseeGroupName,
        textTwo: ob.informationBasic.assesseeGroupDescription,
        status: ''
      });
    });
  }
  let assesseeGroupListSecondary = [];
  if (informationAllocation?.assesseeGroup.assesseeGroupSecondary.length > 0) {
    const tempArr = informationAllocation?.assesseeGroup?.assesseeGroupSecondary;
    tempArr.forEach((ob) => {
      assesseeGroupListSecondary.push({
        id: ob.id,
        textOne: ob.informationBasic.assesseeGroupName,
        textTwo: ob.informationBasic.assesseeGroupDescription,
        status: ''
      });
    });
  }
  let assesseeRoleListPrimary = [];
  if (informationAllocation?.assesseeRole.assesseeRolePrimary.length > 0) {
    const tempArr = informationAllocation?.assesseeRole?.assesseeRolePrimary;
    tempArr.forEach((ob) => {
      assesseeRoleListPrimary.push({
        id: ob.id,
        textOne: ob.informationBasic.assesseeRoleName,
        textTwo: ob.informationBasic.assesseeRoleDescription,
        status: ''
      });
    });
  }
  let assesseeRoleListSecondary = [];
  if (informationAllocation?.assesseeRole.assesseeRoleSecondary.length > 0) {
    const tempArr = informationAllocation?.assesseeRole?.assesseeRoleSecondary;
    tempArr.forEach((ob) => {
      assesseeRoleListSecondary.push({
        id: ob.id,
        textOne: ob.informationBasic.assesseeRoleName,
        textTwo: ob.informationBasic.assesseeRoleDescription,
        status: ''
      });
    });
  }

  const allocationList1 = [
    {
      id: 'a1',
      labelTextOneOne: 'group',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: assesseeGroupListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: assesseeGroupListSecondary
        }
      ],
      innerAssociateList: [
        {
          id: 'associate1',
          textOne: 'Simple Sample 01',
          textTwo: 'Group',
          status: ''
        },
        {
          id: 'associate2',
          textOne: 'Simple Sample 02',
          textTwo: 'Group',
          status: ''
        },
        {
          id: 'associate3',
          textOne: 'Simple Sample 03',
          textTwo: 'Group',
          status: ''
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a2',
      labelTextOneOne: 'manager',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: [
            {
              id: 'associate1',
              textOne: 'Simple Sample 01',
              textTwo: 'Manager',
              status: 'active'
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'Manager',
              status: 'active'
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'Manager',
              status: 'active'
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerAssociateList: [
        {
          id: 'associate1',
          textOne: 'Simple Sample 01',
          textTwo: 'Manager',
          status: 'active'
        },
        {
          id: 'associate2',
          textOne: 'Simple Sample 02',
          textTwo: 'Manager',
          status: 'active'
        },
        {
          id: 'associate3',
          textOne: 'Simple Sample 03',
          textTwo: 'Manager',
          status: 'active'
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a3',
      labelTextOneOne: 'node',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: [
            {
              id: 'associate1',
              textOne: 'Simple Sample 01',
              textTwo: 'Node',
              status: ''
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'Node',
              status: ''
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'Node',
              status: ''
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerAssociateList: [
        {
          id: 'associate1',
          textOne: 'Simple Sample 01',
          textTwo: 'Node',
          status: ''
        },
        {
          id: 'associate2',
          textOne: 'Simple Sample 02',
          textTwo: 'Node',
          status: ''
        },
        {
          id: 'associate3',
          textOne: 'Simple Sample 03',
          textTwo: 'Node',
          status: ''
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a4',
      labelTextOneOne: 'role',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: assesseeRoleListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: assesseeRoleListSecondary
        }
      ],
      innerAssociateList: [
        {
          id: 'associate1',
          textOne: 'Simple Sample 01',
          textTwo: 'role',
          status: ''
        },
        {
          id: 'associate2',
          textOne: 'Simple Sample 02',
          textTwo: 'role',
          status: ''
        },
        {
          id: 'associate3',
          textOne: 'Simple Sample 03',
          textTwo: 'role',
          status: ''
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];
  const engagementList1 = [
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
      textOneOne: capitalizeFirstLetter(informationEngagement?.assesseeStatus) || 'No Information',
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
          textOne: informationEngagement?.assesseeTag?.assesseeTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement?.assesseeTag?.assesseeTagSecondary || 'No Information'
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
            informationEngagement?.assesseeTenure?.assesseeTenureDateTimeStart || 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement?.assesseeTenure?.assesseeTenureDateTimeEnd || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  const setupList1 = [
    {
      id: 'a1',
      labelTextOneOne: 'sign-in',
      textOneOne: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'credential',
          textOne: informationSetup?.assesseeSignInCredential || 'No Information'
        }
      ],
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    }
  ];

  const reviseAlliance = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
  };
  const reviseAllocation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
    if (labelName === 'group') {
      dispatch({ type: LOADER_START });
      let requestObj = makeAssesseeGroupObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({
        type: GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false
        }
      });
      dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });

      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'GROUPLISTPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'manager') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'MANAGERLISTPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'node') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'NODELISTPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'role') {
      let roleRequestObj = makeAssesseeRoleObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({ type: SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT, payload: roleRequestObj });
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
        payload: {
          request: roleRequestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false,
          isReviseMode: true
        }
      });
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'ROLELISTPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
  };
  const reviseEngagement = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
  };
  const reviseSetup = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 336px)',
        overflow: 'overlay'
      }}
    >
      {headerOneBadgeTwo === 'all' ? (
        <>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="alliance"
              isDisplayCardExpanded={listExpand === 'alliance'}
              setListExpand={setListExpand}
              list={allianceList1}
              mode={reviewMode}
              onClickRevise={reviseAlliance}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="allocation"
              isDisplayCardExpanded={listExpand === 'allocation'}
              setListExpand={setListExpand}
              list={allocationList1}
              mode={reviewMode}
              onClickRevise={reviseAllocation}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="engagement"
              isDisplayCardExpanded={listExpand === 'engagement'}
              setListExpand={setListExpand}
              list={engagementList1}
              mode={reviewMode}
              onClickRevise={reviseEngagement}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="setup"
              isDisplayCardExpanded={listExpand === 'setup'}
              setListExpand={setListExpand}
              list={setupList1}
              mode={reviewMode}
              onClickRevise={reviseSetup}
            />
          </div>
        </>
      ) : (
        <>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {allocationList1.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard
                        onClickRevise={reviseAllocation}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <AccordianInfoCard
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
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {engagementList1.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard
                        onClickRevise={reviseEngagement}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <AccordianInfoCard
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
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {setupList1.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard
                        onClickRevise={reviseSetup}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <AccordianInfoCard
                        onClickRevise={reviseSetup}
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

export default DisplayPaneThreeSectionOne;
