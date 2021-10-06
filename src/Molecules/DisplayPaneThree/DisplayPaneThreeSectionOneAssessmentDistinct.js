import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import {
  GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT,
  SET_POPUP_VALUE
} from '../../actionType';
import {
  makeAssessmentGroupObj,
  makeAssessmentTypeObj,
  makeInternalNodeObj
} from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOneAssessment = () => {
  const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const { responseObject, headerOneBadgeTwo, headerOneBadgeOne, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationEngagement, informationAllocation } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const allianceList = [
    {
      id: 'a1',
      labelTextOneOne: 'author',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      isListCard: true,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: [
            {
              id: 'associate1',
              textOne: 'Simple Sample 01',
              textTwo: 'author',
              status: ''
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'author',
              status: ''
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'author',
              status: ''
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerInfo: 'No Information'
    },
    {
      id: 'a2',
      labelTextOneOne: 'collaborator',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',      
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
  let assessmentGroupListPrimary = [];
  if (
    informationAllocation?.assessmentGroup?.assessmentGroupPrimary &&
    informationAllocation?.assessmentGroup?.assessmentGroupPrimary.length > 0
  ) {
    const tempArr = informationAllocation?.assessmentGroup?.assessmentGroupPrimary;
    tempArr.forEach((ob) => {
      assessmentGroupListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assessmentGroupName || '',
        textTwo: ob?.informationBasic?.assessmentGroupDescription || '',
        status: ''
      });
    });
  }
  let assessmentGroupListSecondary = [];
  if (
    informationAllocation?.assessmentGroup?.assessmentGroupSecondary &&
    informationAllocation?.assessmentGroup?.assessmentGroupSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.assessmentGroup?.assessmentGroupSecondary;
    tempArr.forEach((ob) => {
      assessmentGroupListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assessmentGroupName || '',
        textTwo: ob?.informationBasic?.assessmentGroupDescription || '',
        status: ''
      });
    });
  }

  let assessmentManagerListPrimary = [];
  if (
    informationAllocation?.assessmentManager?.assessmentManagerPrimary &&
    informationAllocation?.assessmentManager?.assessmentManagerPrimary.length > 0
  ) {
    const tempArr = informationAllocation?.assessmentManager?.assessmentManagerPrimary;
    tempArr.forEach((ob) => {
      assessmentManagerListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assessmentManagerName || '',
        textTwo: ob?.informationBasic?.assessmentManagerDescription || '',
        status: ''
      });
    });
  }
  let assessmentManagerListSecondary = [];
  if (
    informationAllocation?.assessmentManager?.assessmentManagerSecondary &&
    informationAllocation?.assessmentManager?.assessmentManagerSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.assessmentManager?.assessmentManagerSecondary;
    tempArr.forEach((ob) => {
      assessmentManagerListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assessmentManagerName || '',
        textTwo: ob?.informationBasic?.assessmentManagerDescription || '',
        status: ''
      });
    });
  }


  let assessmentNodeListPrimary = [];
  if (
    informationAllocation?.assessmentNode?.assessmentNodePrimary &&
    informationAllocation?.assessmentNode?.assessmentNodePrimary.length > 0
  ) {
    const tempArr = informationAllocation?.assessmentNode?.assessmentNodePrimary;
    tempArr.forEach((ob) => {
      assessmentNodeListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.associateNodeName || '',
        textTwo: ob?.informationBasic?.associateNodeDescription || '',
        status: ''
      });
    });
  }
  let assessmentNodeListSecondary = [];
  if (
    informationAllocation?.assessmentNode?.assessmentNodeSecondary &&
    informationAllocation?.assessmentNode?.assessmentNodeSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.assessmentNode?.assessmentNodeSecondary;
    tempArr.forEach((ob) => {
      assessmentNodeListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.associateNodeName || '',
        textTwo: ob?.informationBasic?.associateNodeDescription || '',
        status: ''
      });
    });
  }
  let assessmentTypeListPrimary = [];
  if (
    informationAllocation?.assessmentType?.assessmentTypePrimary &&
    informationAllocation?.assessmentType?.assessmentTypePrimary.length > 0
  ) {
    const tempArr = informationAllocation?.assessmentType?.assessmentTypePrimary;
    tempArr.forEach((ob) => {
      assessmentTypeListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assessmentTypeName || '',
        textTwo: ob?.informationBasic?.assessmentTypeDescription || '',
        status: ''
      });
    });
  }
  let assessmentTypeListSecondary = [];
  if (
    informationAllocation?.assessmentType?.assessmentTypeSecondary &&
    informationAllocation?.assessmentType?.assessmentTypeSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.assessmentType?.assessmentTypeSecondary;
    tempArr.forEach((ob) => {
      assessmentTypeListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assessmentTypeName || '',
        textTwo: ob?.informationBasic?.assessmentTypeDescription || '',
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
          innerList: assessmentGroupListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: assessmentGroupListSecondary
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
          innerList: assessmentManagerListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: assessmentManagerListSecondary
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
          innerList: assessmentNodeListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: assessmentNodeListSecondary
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
          innerList: assessmentTypeListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: assessmentTypeListSecondary
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
      textOneOne:
        (informationEngagement && capitalizeFirstLetter(informationEngagement?.assessmentStatus)) ||
        'No Information',
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
          textOne: informationEngagement?.assessmentTag.assessmentTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement?.assessmentTag.assessmentTagSecondary || 'No Information'
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
          textOne: informationEngagement?.assessmentTenure?.assessmentTenureDateTimeStart || 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne: informationEngagement?.assessmentTenure?.assessmentTenureDateTimeEnd || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  const setupList = [
    {
      id: 'a1',
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
      textOneOne: capitalizeFirstLetter(informationEngagement?.assessmentStatus) || 'No Information',
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
          textOne: informationEngagement?.assessmentTag.assessmentTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement?.assessmentTag.assessmentTagSecondary || 'No Information'
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
          textOne: informationEngagement?.assessmentTenureDate || 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne: informationEngagement?.assessmentTenureDate || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    }
  ];
  const reviseSetup = (e, selectedBadgeArray) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log(labelName, '+++++', selectedBadgeArray, '=====', selectedBadgeName);
    let badgeName = '';
    if (selectedBadgeArray.length > 0) {
      selectedBadgeArray.forEach((element) => {
        badgeName = badgeName + element.labelTextTwoBadge;
      });
    }
    console.log(badgeName);
    if (labelName === 'share' && badgeName === 'associate' && selectedBadgeName === 'distinct') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ASSESSMENTINFODISTINCTBASICPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'share' && badgeName === 'associate' && selectedBadgeName === 'fee') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ASSOCIATECREATEFEEPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'share' && badgeName === 'node' && selectedBadgeName === 'distinct') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ASSESSMENTINFODISTINCTBASICPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'share' && badgeName === 'node' && selectedBadgeName === 'fee') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ASSOCIATECREATEFEEPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
  };
  const reviseAllocation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'group') {
      dispatch({ type: LOADER_START });
      let requestObj = makeAssessmentGroupObj(selectedAssociateInfo, 'active', 0, -1);
      dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
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
          payload: { isPopUpValue: 'GROUPPOPUP', popupMode: 'ASSESSMENTCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'GROUPSECONDARYPOPUP', popupMode: 'ASSESSMENTCREATE' }
        });
      }
    }
    if (labelName === 'manager') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'MANAGERPOPUP', popupMode: 'ASSESSMENTCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'MANAGERSECONDARYPOPUP', popupMode: 'ASSESSMENTCREATE' }
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
          payload: { isPopUpValue: 'NODEPOPUP', popupMode: 'ASSESSMENTCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'NODESECONDARYPOPUP', popupMode: 'ASSESSMENTCREATE' }
        });
      }
    }
    if (labelName === 'type') {
      dispatch({ type: LOADER_START });
      let roleRequestObj = makeAssessmentTypeObj(selectedAssociateInfo, 'active', 0, -1);
      dispatch({ type: SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT, payload: roleRequestObj });
      dispatch({
        type: GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
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
          payload: { isPopUpValue: 'TYPEPOPUP', popupMode: 'ASSESSMENTCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TYPESECONDARYPOPUP', popupMode: 'ASSESSMENTCREATE' }
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
              onClickRevise={reviseSetup}
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
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {allocationList.map((ob) => {
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
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {engagementListKey.map((ob) => {
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
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {setupList.map((ob) => {
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

export default DisplayPaneThreeSectionOneAssessment;
