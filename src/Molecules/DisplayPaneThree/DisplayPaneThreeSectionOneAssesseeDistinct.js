import React, { useEffect, useState } from 'react';
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
  GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_AVAILABLE_SIGNIN_LIST,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT,
  SET_CURRENTLY_SIGNIN_CREDENTIAL,
  SET_STATUS_POPUP_VALUE
} from '../../actionType';
import {
  makeAssesseeGroupObj,
  makeAssesseeRoleObj,
  makeAssesseeTypeObj,
  makeInternalNodeObj
} from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOne = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const dispatch = useDispatch();
  const {
    informationEngagement,
    informationSetup,
    informationAllocation,
    informationContact
  } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  useEffect(() => {
    setListExpand('');
  }, [responseObject]);
  const allianceList1 = [
    {
      id: 'a1',
      labelTextOneOne: 'family',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'father',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'Simple Sample 01',
                  textTwo: 'father',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'mother',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'Simple Sample 01',
                  textTwo: 'mother',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'unlisted',
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
                }
              ]
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'daughter',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'Simple Sample 01',
                  textTwo: 'daughter',
                  status: ''
                },
                {
                  id: 'associate2',
                  textOne: 'Simple Sample 02',
                  textTwo: 'daughter',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'son',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'Simple Sample 01',
                  textTwo: 'son',
                  status: ''
                },
                {
                  id: 'associate2',
                  textOne: 'Simple Sample 02',
                  textTwo: 'son',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'unlisted',
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
            }
          ]
        },
        {
          labelTextOneOneBadge: 'sibling',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'brother',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'Simple Sample 01',
                  textTwo: 'brother',
                  status: ''
                },
                {
                  id: 'associate2',
                  textOne: 'Simple Sample 02',
                  textTwo: 'brother',
                  status: ''
                },
                {
                  id: 'associate3',
                  textOne: 'Simple Sample 03',
                  textTwo: 'brother',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'sister',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'Simple Sample 01',
                  textTwo: 'sister',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'unlisted',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'spouse',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'husband',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'Simple Sample 01',
                  textTwo: 'husband',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'wife',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'Simple Sample 01',
                  textTwo: 'wife',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'unlisted',
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
            }
          ]
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: false,
      isMultiList: true
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
  if (
    informationAllocation?.assesseeGroup?.assesseeGroupPrimary &&
    informationAllocation?.assesseeGroup?.assesseeGroupPrimary.length > 0
  ) {
    const tempArr = informationAllocation?.assesseeGroup?.assesseeGroupPrimary;
    tempArr.forEach((ob) => {
      assesseeGroupListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assesseeGroupName || '',
        textTwo: ob?.informationBasic?.assesseeGroupDescription || '',
        status: ''
      });
    });
  }
  let assesseeGroupListSecondary = [];
  if (
    informationAllocation?.assesseeGroup?.assesseeGroupSecondary &&
    informationAllocation?.assesseeGroup?.assesseeGroupSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.assesseeGroup?.assesseeGroupSecondary;
    tempArr.forEach((ob) => {
      assesseeGroupListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assesseeGroupName || '',
        textTwo: ob?.informationBasic?.assesseeGroupDescription || '',
        status: ''
      });
    });
  }
  let assesseeNodeListPrimary = [];
  if (
    informationAllocation?.assesseeNode?.assesseeNodePrimary &&
    informationAllocation?.assesseeNode?.assesseeNodePrimary.length > 0
  ) {
    const tempArr = informationAllocation?.assesseeNode?.assesseeNodePrimary;
    tempArr.forEach((ob) => {
      assesseeNodeListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.associateNodeName || '',
        textTwo: ob?.informationBasic?.associateNodeDescription || '',
        status: ''
      });
    });
  }
  let assesseeNodeListSecondary = [];
  if (
    informationAllocation?.assesseeNode?.assesseeNodeSecondary &&
    informationAllocation?.assesseeNode?.assesseeNodeSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.assesseeNode?.assesseeNodeSecondary;
    tempArr.forEach((ob) => {
      assesseeNodeListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.associateNodeName || '',
        textTwo: ob?.informationBasic?.associateNodeDescription || '',
        status: ''
      });
    });
  }

  let assesseeRoleListPrimary = [];
  if (
    informationAllocation?.assesseeRole?.assesseeRolePrimary &&
    informationAllocation?.assesseeRole?.assesseeRolePrimary.length > 0
  ) {
    const tempArr = informationAllocation?.assesseeRole?.assesseeRolePrimary;
    tempArr.forEach((ob) => {
      assesseeRoleListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assesseeRoleName || '',
        textTwo: ob?.informationBasic?.assesseeRoleDescription || '',
        status: ''
      });
    });
  }
  let assesseeRoleListSecondary = [];
  if (
    informationAllocation?.assesseeRole?.assesseeRoleSecondary &&
    informationAllocation?.assesseeRole?.assesseeRoleSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.assesseeRole?.assesseeRoleSecondary;
    tempArr.forEach((ob) => {
      assesseeRoleListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assesseeRoleName || '',
        textTwo: ob?.informationBasic?.assesseeRoleDescription || '',
        status: ''
      });
    });
  }
  let assesseeTypeListPrimary = [];
  if (
    informationAllocation?.assesseeType?.assesseeTypePrimary &&
    informationAllocation?.assesseeType?.assesseeTypePrimary.length > 0
  ) {
    const tempArr = informationAllocation?.assesseeType?.assesseeTypePrimary || [];
    tempArr.forEach((ob) => {
      assesseeTypeListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assesseeTypeName || '',
        textTwo: ob?.informationBasic?.assesseeTypeDescription || '',
        status: ''
      });
    });
  }
  let assesseeTypeListSecondary = [];
  if (
    informationAllocation?.assesseeType?.assesseeTypeSecondary &&
    informationAllocation?.assesseeType?.assesseeTypeSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.assesseeType?.assesseeTypeSecondary || [];
    tempArr.forEach((ob) => {
      assesseeTypeListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.assesseeTypeName || '',
        textTwo: ob?.informationBasic?.assesseeTypeDescription || '',
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
          innerList: assesseeNodeListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: assesseeNodeListSecondary
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
          innerList: assesseeTypeListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: assesseeTypeListSecondary
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
          labelTextOneOneBadge: 'primary',
          textOne: informationEngagement?.assesseeTag?.assesseeTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
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
    // {
    //   id: 'a1',
    //   labelTextOneOne: 'sign-in',
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: 'credential',
    //       innerLabelBadgeList: [
    //         {
    //           labelTextTwoBadge: 'primary',
    //           innerList: []
    //         },
    //         {
    //           labelTextTwoBadge: 'secondary',
    //           innerList: []
    //         }
    //       ]
    //     }
    //   ],
    //   innerInfo: 'No Information',
    //   isListCard: true,
    //   isReviewLink: false,
    //   isMultiList: true
    // }
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
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'GROUPLISTPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'GROUPLISTSECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'manager') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'MANAGERLISTPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'MANAGERLISTSECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'node') {
      let nodeRequestObj = makeInternalNodeObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: nodeRequestObj });
      dispatch({
        type: INTERNAL_NODE_LIST_SAGA,
        payload: {
          request: nodeRequestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false
        }
      });
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'NODELISTPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'NODELISTSECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
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
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'ROLELISTPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'ROLELISTSECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'type') {
      let typeRequestObj = makeAssesseeTypeObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({ type: SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT, payload: typeRequestObj });
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
        payload: {
          request: typeRequestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false,
          isReviseMode: true
        }
      });
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'TYPELISTPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'TYPELISTSECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
  };
  const reviseEngagement = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'status') {
      dispatch({
        type: SET_STATUS_POPUP_VALUE,
        payload: capitalizeFirstLetter(informationEngagement?.assesseeStatus)
      });
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'STATUSPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
    if (labelName === 'tag') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'TAGREADONLYPRIMARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'TAGSECONDARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
    if (labelName === 'tenure') {
      if (selectedBadgeName === 'start') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'TENURESATRTDATEPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'end') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'TENUREENDDATEPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
    }
  };
  const reviseSetup = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'sign-in') {
      let availableCredentialArray = [];
      if (informationContact?.assesseeAddressEmailPrimary?.assesseeAddressEmail) {
        availableCredentialArray.push('email address (primary)');
        if (
          informationContact?.assesseeAddressEmailPrimary?.assesseeAddressEmail ===
          informationSetup.assesseeSignInCredential
        ) {
          dispatch({ type: SET_CURRENTLY_SIGNIN_CREDENTIAL, payload: 'email address (primary)' });
        }
      }
      if (informationContact?.assesseeAddressEmailSecondary?.assesseeAddressEmail) {
        availableCredentialArray.push('email address (secondary)');
        if (
          informationContact?.assesseeAddressEmailSecondary?.assesseeAddressEmail ===
          informationSetup.assesseeSignInCredential
        ) {
          dispatch({ type: SET_CURRENTLY_SIGNIN_CREDENTIAL, payload: 'email address (secondary)' });
        }
      }
      if (informationEngagement?.assesseeTag?.assesseeTagPrimary) {
        availableCredentialArray.push('tag (primary)');
        if (
          informationEngagement?.assesseeTag?.assesseeTagPrimary ===
          informationSetup.assesseeSignInCredential
        ) {
          dispatch({ type: SET_CURRENTLY_SIGNIN_CREDENTIAL, payload: 'tag (primary)' });
        }
      }
      if (informationEngagement?.assesseeTag?.assesseeTagSecondary) {
        availableCredentialArray.push('tag (secondary)');
        if (
          informationEngagement?.assesseeTag?.assesseeTagSecondary ===
          informationSetup.assesseeSignInCredential
        ) {
          dispatch({ type: SET_CURRENTLY_SIGNIN_CREDENTIAL, payload: 'tag (secondary)' });
        }
      }
      if (informationContact?.assesseeTelephoneMobilePrimary?.assesseeTelephoneNumber) {
        availableCredentialArray.push('mobile telephone (primary)');
        if (
          informationContact?.assesseeTelephoneMobilePrimary?.assesseeTelephoneNumber ===
          informationSetup.assesseeSignInCredential
        ) {
          dispatch({
            type: SET_CURRENTLY_SIGNIN_CREDENTIAL,
            payload: 'mobile telephone (primary)'
          });
        }
      }
      if (informationContact?.assesseeTelephoneMobileSecondary?.assesseeTelephoneNumber) {
        availableCredentialArray.push('mobile telephone (secondary)');
        if (
          informationContact?.assesseeTelephoneMobileSecondary?.assesseeTelephoneNumber ===
          informationSetup.assesseeSignInCredential
        ) {
          dispatch({
            type: SET_CURRENTLY_SIGNIN_CREDENTIAL,
            payload: 'mobile telephone (secondary)'
          });
        }
      }

      dispatch({
        type: SET_AVAILABLE_SIGNIN_LIST,
        payload: availableCredentialArray
      });
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'TAGREADONLYPRIMARYPOPUP', popupMode: 'ASSESSEE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSESSEE_SIGN_ON,
          payload: { isPopUpValue: 'FORCETOSELECTSIGNIN', popupMode: 'ASSESSEE_CREATE' }
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
