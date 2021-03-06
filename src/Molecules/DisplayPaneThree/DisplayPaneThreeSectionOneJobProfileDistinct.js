import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import {
  GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
  GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT,
  SET_POPUP_VALUE
} from '../../actionType';
import {
  makeInternalNodeObj,
  makeJobProfileGroupObj,
  makeJobProfileTypeObj
} from '../../Actions/GenericActions';
// import {
//   GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
//   GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
//   INTERNAL_NODE_LIST_SAGA,
//   LOADER_START,
//   SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
//   SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
//   SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT,
//   SET_POPUP_VALUE
// } from '../../actionType';
// import {
//   makeAssessmentGroupObj,
//   makeAssessmentTypeObj,
//   makeInternalNodeObj
// } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOneJobProfileDistinct = () => {
  const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const { responseObject, headerOneBadgeTwo, headerOneBadgeOne, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationEngagement, informationAllocation } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const allianceList = [
    {
      id: 'a342',
      labelTextOneOne: 'assessor',
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
              textTwo: 'assessor',
              status: 'active'
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'assessor',
              status: 'active'
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'assessor',
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

  let jobProfileGroupListPrimary = [];
  if (
    informationAllocation?.jobProfileGroup?.jobProfileGroupPrimary &&
    informationAllocation?.jobProfileGroup?.jobProfileGroupPrimary.length > 0
  ) {
    const tempArr = informationAllocation?.jobProfileGroup?.jobProfileGroupPrimary;
    tempArr.forEach((ob) => {
      jobProfileGroupListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.jobProfileGroupName || '',
        textTwo: ob?.informationBasic?.jobProfileGroupDescription || '',
        status: ''
      });
    });
  }
  let jobProfileGroupListSecondary = [];
  if (
    informationAllocation?.jobProfileGroup?.jobProfileGroupSecondary &&
    informationAllocation?.jobProfileGroup?.jobProfileGroupSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.jobProfileGroup?.jobProfileGroupSecondary;
    tempArr.forEach((ob) => {
      jobProfileGroupListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.jobProfileGroupName || '',
        textTwo: ob?.informationBasic?.jobProfileGroupDescription || '',
        status: ''
      });
    });
  }
  let jobProfileNodeListPrimary = [];
  if (
    informationAllocation?.jobProfileNode?.jobProfileNodePrimary &&
    informationAllocation?.jobProfileNode?.jobProfileNodePrimary.length > 0
  ) {
    const tempArr = informationAllocation?.jobProfileNode?.jobProfileNodePrimary;
    tempArr.forEach((ob) => {
      jobProfileNodeListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.associateNodeName || '',
        textTwo: ob?.informationBasic?.associateNodeDescription || '',
        status: ''
      });
    });
  }
  let jobProfileNodeListSecondary = [];
  if (
    informationAllocation?.jobProfileNode?.jobProfileNodeSecondary &&
    informationAllocation?.jobProfileNode?.jobProfileNodeSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.jobProfileNode?.jobProfileNodeSecondary;
    tempArr.forEach((ob) => {
      jobProfileNodeListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.associateNodeName || '',
        textTwo: ob?.informationBasic?.associateNodeDescription || '',
        status: ''
      });
    });
  }
  let jobProfileTypeListPrimary = [];
  if (
    informationAllocation?.jobProfileType?.jobProfileTypePrimary &&
    informationAllocation?.jobProfileType?.jobProfileTypePrimary.length > 0
  ) {
    const tempArr = informationAllocation?.jobProfileType?.jobProfileTypePrimary;
    tempArr.forEach((ob) => {
      jobProfileTypeListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.jobProfileTypeName || '',
        textTwo: ob?.informationBasic?.jobProfileTypeDescription || '',
        status: ''
      });
    });
  }
  let jobProfileTypeListSecondary = [];
  if (
    informationAllocation?.jobProfileType?.jobProfileTypeSecondary &&
    informationAllocation?.jobProfileType?.jobProfileTypeSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.jobProfileType?.jobProfileTypeSecondary;
    tempArr.forEach((ob) => {
      jobProfileTypeListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.jobProfileTypeName || '',
        textTwo: ob?.informationBasic?.jobProfileTypeDescription || '',
        status: ''
      });
    });
  }
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
          innerList: jobProfileGroupListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: jobProfileGroupListSecondary
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
          innerList: jobProfileNodeListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: jobProfileNodeListSecondary
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
          innerList: jobProfileTypeListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: jobProfileTypeListSecondary
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
      textOneOne: capitalizeFirstLetter(informationEngagement.jobProfileStatus) || 'No Information',
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
          textOne: informationEngagement?.jobProfileTag?.jobProfileTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement?.jobProfileTag?.jobProfileTagSecondary || 'No Information'
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
            informationEngagement?.jobProfileTenure?.jobProfileTenureDateTimeStart ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement?.jobProfileTenure?.jobProfileTenureDateTimeEnd || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    }
  ];
  const setupList = [
    {
      id: 'setup-a1',
      labelTextOneOne: 'share',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'associate',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'distinct',
              innerLabelBadgeList: 'No'
            },
            {
              labelTextTwoBadge: 'fee',
              innerLabelBadgeList: 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: 'node',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'distinct',
              innerLabelBadgeList: 'No'
            },
            {
              labelTextTwoBadge: 'fee',
              innerLabelBadgeList: 'No'
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
  const engagementListKey = [
    {
      id: 'a2',
      textOneOne: capitalizeFirstLetter(informationEngagement.jobProfileStatus) || 'No Information',
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
          textOne: informationEngagement?.jobProfileTag?.jobProfileTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement?.jobProfileTag?.jobProfileTagSecondary || 'No Information'
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
            informationEngagement?.jobProfileTenure?.jobProfileTenureDateTimeStart ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement?.jobProfileTenure?.jobProfileTenureDateTimeEnd || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    }
  ];

  const reviseAllocation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'group') {
      dispatch({ type: LOADER_START });
      let requestObj = makeJobProfileGroupObj(selectedAssociateInfo, 'active', 0, -1);
      dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
      dispatch({
        type: GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
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
          payload: { isPopUpValue: 'GROUPPOPUP', popupMode: 'JOBCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'GROUPSECONDARYPOPUP', popupMode: 'JOBCREATE' }
        });
      }
    }
    if (labelName === 'manager') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'MANAGERPOPUP', popupMode: 'JOBCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'MANAGERSECONDARYPOPUP', popupMode: 'JOBCREATE' }
        });
      }
    }
    if (labelName === 'node') {
      dispatch({ type: LOADER_START });
      let nodeRequestObj = makeInternalNodeObj(selectedAssociateInfo, 'active', 0, -1);
      dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: nodeRequestObj });
      dispatch({
        type: INTERNAL_NODE_LIST_SAGA,
        payload: {
          request: nodeRequestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          nodeViewState: 'list',
          isMiddlePaneList: false
        }
      });
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'NODEPOPUP', popupMode: 'JOBCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'NODESECONDARYPOPUP', popupMode: 'JOBCREATE' }
        });
      }
    }
    if (labelName === 'type') {
      dispatch({ type: LOADER_START });
      let roleRequestObj = makeJobProfileTypeObj(selectedAssociateInfo, 'active', 0, -1);
      dispatch({ type: SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT, payload: roleRequestObj });
      dispatch({
        type: GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
        payload: {
          request: roleRequestObj,
          BadgeOne: headerOneBadgeOne,
          BadgeTwo: headerOneBadgeTwo,
          BadgeThree: '',
          isMiddlePaneList: false
        }
      });
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TYPEPOPUP', popupMode: 'JOBCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TYPESECONDARYPOPUP', popupMode: 'JOBCREATE' }
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
                      <DisplayPanelAccordianReviewListOne className="" accordianObject={ob} mode={reviewMode} />
                    ) : (
                      <DisplayPanelAccordianInformation accordianObject={ob} mode={reviewMode} />
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
                      <DisplayPanelAccordianReviewListOne
                        onClickRevise={reviseAllocation}
                        className=""
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
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {engagementListKey.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <DisplayPanelAccordianReviewListOne className="" accordianObject={ob} mode={reviewMode} />
                    ) : (
                      <DisplayPanelAccordianInformation accordianObject={ob} mode={reviewMode} />
                    )}
                  </div>
                );
              })}
            </Paper>
          </div>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {setupList.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <DisplayPanelAccordianReviewListOne className="" accordianObject={ob} mode={reviewMode} />
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

export default DisplayPaneThreeSectionOneJobProfileDistinct;
