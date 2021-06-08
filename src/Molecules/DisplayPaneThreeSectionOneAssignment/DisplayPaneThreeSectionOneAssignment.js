import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import { GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA, GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA, LOADER_START, SET_POPUP_VALUE } from '../../actionType';
import { makeAssignmentGroupObj, makeAssignmentTypeObj } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOneAssignment = () => {
  const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationEngagement } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const allianceList = [
    {
      id: 'a2',
      labelTextOneOne: 'collaborator',
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
              textTwo: 'collaborator',
              status: 'active'
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'collaborator',
              status: 'active'
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'collaborator',
              status: 'active'
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];
  const allocationList = [
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
          innerList: [
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
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
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
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a4',
      labelTextOneOne: 'type',
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
              textTwo: 'type',
              status: ''
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'type',
              status: ''
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'type',
              status: ''
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];
  const engagementListAll = [
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
      textOneOne: capitalizeFirstLetter(informationEngagement.assignmentStatus) || 'No Information',
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
          textOne: informationEngagement.assignmentTag.assignmentTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement.assignmentTag.assignmentTagSecondary || 'No Information'
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
          textOne: informationEngagement.assignmentTenureDate || 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne: informationEngagement.assignmentTenureDate || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  const setupList = [];
  const engagementListKey = [
    {
      id: 'a2',
      textOneOne: capitalizeFirstLetter(informationEngagement.assignmentStatus) || 'No Information',
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
          textOne: informationEngagement.assignmentTag.assignmentTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement.assignmentTag.assignmentTagSecondary || 'No Information'
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
          textOne: informationEngagement.assignmentTenureDate || 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne: informationEngagement.assignmentTenureDate || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  const reviseAllocation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'group') {
      dispatch({ type: LOADER_START });
      let requestObj = makeAssignmentGroupObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({
        type: GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false
        }
      });
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'GROUPPOPUP', popupMode: 'ASSIGNMENTCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'GROUPSECONDARYPOPUP', popupMode: 'ASSIGNMENTCREATE' }
        });
      }
    }
    if (labelName === 'manager') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'MANAGERPOPUP', popupMode: 'ASSIGNMENTCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'MANAGERSECONDARYPOPUP', popupMode: 'ASSIGNMENTCREATE' }
        });
      }
    }
    if (labelName === 'node') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'NODEPOPUP', popupMode: 'ASSIGNMENTCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'NODESECONDARYPOPUP', popupMode: 'ASSIGNMENTCREATE' }
        });
      }
    }
    if (labelName === 'type') {
      dispatch({ type: LOADER_START });
      let roleRequestObj = makeAssignmentTypeObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({
        type: GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
        payload: {
          request: roleRequestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false
        }
      });
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TYPEPOPUP', popupMode: 'ASSIGNMENTCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TYPESECONDARYPOPUP', popupMode: 'ASSIGNMENTCREATE' }
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
              headerOne="alliance"
              isDisplayCardExpanded={listExpand === 'alliance'}
              setListExpand={setListExpand}
              list={allianceList}
              mode={reviewMode}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="allocation"
              isDisplayCardExpanded={listExpand === 'allocation'}
              setListExpand={setListExpand}
              list={allocationList}
              mode={reviewMode}
              onClickRevise={reviseAllocation}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="engagement"
              isDisplayCardExpanded={listExpand === 'engagement'}
              setListExpand={setListExpand}
              list={engagementListAll}
              mode={reviewMode}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="setup"
              isDisplayCardExpanded={listExpand === 'setup'}
              setListExpand={setListExpand}
              list={setupList}
              mode={reviewMode}
            />
          </div>
        </>
      ) : (
        <>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {allianceList.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard className="" accordianObject={ob} mode={reviewMode} />
                    ) : (
                      <AccordianInfoCard accordianObject={ob} mode={reviewMode} />
                    )}
                  </div>
                );
              })}
            </Paper>
          </div>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {allocationList.map((ob) => {
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
              {engagementListKey.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard className="" accordianObject={ob} mode={reviewMode} />
                    ) : (
                      <AccordianInfoCard accordianObject={ob} mode={reviewMode} />
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

export default DisplayPaneThreeSectionOneAssignment;
