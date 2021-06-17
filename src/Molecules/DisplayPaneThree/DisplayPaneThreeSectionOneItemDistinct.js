import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import {
  ASSOCIATE_SIGN_ON,
  GET_ITEM_GROUP_REVIEW_LIST_SAGA,
  GET_ITEM_TYPE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT,
  SET_POPUP_VALUE,
  SET_STATUS_POPUP_VALUE
} from '../../actionType';
import { makeInternalNodeObj, makeItemGroupObj, makeItemsTypeObj } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOneItem = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationEngagement, informationSetup, informationAllocation } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const dispatch = useDispatch();

  const allianceListAll = [
    {
      id: 'a2',
      labelTextOneOne: 'author',
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
              textTwo: '',
              status: 'active'
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: '',
              status: 'active'
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: '',
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
  let itemGroupListPrimary = [];
  if (
    informationAllocation?.itemGroup?.itemGroupPrimary &&
    informationAllocation?.itemGroup?.itemGroupPrimary.length > 0
  ) {
    const tempArr = informationAllocation?.itemGroup?.itemGroupPrimary;
    tempArr.forEach((ob) => {
      itemGroupListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.itemGroupName || '',
        textTwo: ob?.informationBasic?.itemGroupDescription || '',
        status: ''
      });
    });
  }
  let itemGroupListSecondary = [];
  if (
    informationAllocation?.itemGroup?.itemGroupSecondary &&
    informationAllocation?.itemGroup?.itemGroupSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.itemGroup?.itemGroupSecondary;
    tempArr.forEach((ob) => {
      itemGroupListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.itemGroupName || '',
        textTwo: ob?.informationBasic?.itemGroupDescription || '',
        status: ''
      });
    });
  }
  let itemNodeListPrimary = [];
  if (
    informationAllocation?.itemNode?.itemNodePrimary &&
    informationAllocation?.itemNode?.itemNodePrimary.length > 0
  ) {
    const tempArr = informationAllocation?.itemNode?.itemNodePrimary;
    tempArr.forEach((ob) => {
      itemNodeListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.associateNodeName || '',
        textTwo: ob?.informationBasic?.associateNodeDescription || '',
        status: ''
      });
    });
  }
  let itemNodeListSecondary = [];
  if (
    informationAllocation?.itemNode?.itemNodeSecondary &&
    informationAllocation?.itemNode?.itemNodeSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.itemNode?.itemNodeSecondary;
    tempArr.forEach((ob) => {
      itemNodeListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.associateNodeName || '',
        textTwo: ob?.informationBasic?.associateNodeDescription || '',
        status: ''
      });
    });
  }
  let itemTypeListPrimary = [];
  if (
    informationAllocation?.itemType?.itemTypePrimary &&
    informationAllocation?.itemType?.itemTypePrimary.length > 0
  ) {
    const tempArr = informationAllocation?.itemType?.itemTypePrimary;
    tempArr.forEach((ob) => {
      itemTypeListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.itemTypeName || '',
        textTwo: ob?.informationBasic?.itemTypeDescription || '',
        status: ''
      });
    });
  }
  let itemTypeListSecondary = [];
  if (
    informationAllocation?.itemType?.itemTypeSecondary &&
    informationAllocation?.itemType?.itemTypeSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.itemType?.itemTypeSecondary;
    tempArr.forEach((ob) => {
      itemTypeListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.itemTypeName || '',
        textTwo: ob?.informationBasic?.itemTypeDescription || '',
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
          innerList: itemGroupListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: itemGroupListSecondary
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
          innerList: itemNodeListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: itemNodeListSecondary
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'typ2',
      labelTextOneOne: 'type',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: itemTypeListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: itemTypeListSecondary
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
      textOneOne: capitalizeFirstLetter(informationEngagement.itemStatus) || 'No Information',
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
          textOne: informationEngagement?.itemTag?.itemTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement?.itemTag?.itemTagSecondary || 'No Information'
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
          textOne: informationEngagement.itemTenure?.itemTenureDateTimeStart || 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne: informationEngagement.itemTenure?.itemTenureDateTimeEnd || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    }
  ];
  const setUpListAll = [];
  const engagementListKey = [
    {
      id: 'a2',
      textOneOne: capitalizeFirstLetter(informationEngagement.itemStatus) || 'No Information',
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
          textOne: informationEngagement?.itemTag?.itemTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement?.itemTag?.itemTagSecondary || 'No Information'
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
          textOne: informationEngagement.itemTenure?.itemTenureDateTimeStart || 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne: informationEngagement.itemTenure?.itemTenureDateTimeEnd || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    }
  ];

  const reviseAlliance = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
  };
  const reviseAllocation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'group') {
      dispatch({ type: LOADER_START });
      let requestObj = makeItemGroupObj(selectedAssociateInfo, 'active', 0, -1);
      dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ITEM_GROUP_REVIEW_LIST_SAGA,
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
          payload: { isPopUpValue: 'GROUPPOPUP', popupMode: 'ITEMCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'GROUPSECONDARYPOPUP', popupMode: 'ITEMCREATE' }
        });
      }
    }
    if (labelName === 'manager') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'MANAGERPPOPUP', popupMode: 'ITEMCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'MANAGERSECONDARYPOPUP', popupMode: 'ITEMCREATE' }
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
          payload: { isPopUpValue: 'NODEPOPUP', popupMode: 'ITEMCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'NODESECONDARYPOPUP', popupMode: 'ITEMCREATE' }
        });
      }
    }
    if (labelName === 'type') {
      dispatch({ type: LOADER_START });
      let roleRequestObj = makeItemsTypeObj(selectedAssociateInfo, 'active', 0, -1);
      dispatch({ type: SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT, payload: roleRequestObj });
      dispatch({
        type: GET_ITEM_TYPE_REVIEW_LIST_SAGA,
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
          payload: { isPopUpValue: 'TYPEPOPUP', popupMode: 'ITEMCREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TYPESECONDARYPOPUP', popupMode: 'ITEMCREATE' }
        });
      }
    }
  };

  const reviseEngagement = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'status') {
      // dispatch({
      //   type: SET_STATUS_POPUP_VALUE,
      //   payload: capitalizeFirstLetter(informationEngagement?.associateStatus)
      // });
      // dispatch({
      //   type: ASSOCIATE_SIGN_ON,
      //   payload: { isPopUpValue: 'STATUSPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      // });
    }
    if (labelName === 'tag') {
      if (selectedBadgeName === 'primary') {
        // dispatch({
        //   type: ASSOCIATE_SIGN_ON,
        //   payload: { isPopUpValue: 'TAGREADONLYPRIMARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        // });
      }
      if (selectedBadgeName === 'secondary') {
        // dispatch({
        //   type: ASSOCIATE_SIGN_ON,
        //   payload: { isPopUpValue: 'TAGSECONDARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        // });
      }
    }
    if (labelName === 'tenure') {
      if (selectedBadgeName === 'start') {
        // dispatch({
        //   type: ASSOCIATE_SIGN_ON,
        //   payload: { isPopUpValue: 'TENURESATRTDATEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        // });
      }
      if (selectedBadgeName === 'end') {
        // dispatch({
        //   type: ASSOCIATE_SIGN_ON,
        //   payload: { isPopUpValue: 'TENUREENDDATEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        // });
      }
    }
  };
  const reviseSetup = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
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
              list={allianceListAll}
              mode={reviewMode}
              onClickRevise={reviseAlliance}
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
              onClickRevise={reviseEngagement}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="setup"
              isDisplayCardExpanded={listExpand === 'setup'}
              setListExpand={setListExpand}
              list={setUpListAll}
              mode={reviewMode}
              onClickRevise={reviseSetup}
            />
          </div>
        </>
      ) : (
        <>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {allianceListAll.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard
                        onClickRevise={reviseAlliance}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <AccordianInfoCard
                        onClickRevise={reviseAlliance}
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

export default DisplayPaneThreeSectionOneItem;
