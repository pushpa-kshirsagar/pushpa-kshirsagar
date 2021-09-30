import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import Fingerprint from '@material-ui/icons/Fingerprint';
import SyncIcon from '@material-ui/icons/Sync';
import {
  ASSOCIATE_SIGN_ON,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_STATUS_POPUP_VALUE,
  UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSOCIATENODE_INFO,
  UPDATE_ASSOCIATE_SETUP_INFO,
  UPDATE_ASSOCIATE_SETUP_ITEM_INFO
} from '../../actionType';
import { getPermissionStr } from '../../Actions/GenericActions';
import { isDescendant } from 'react-sortable-tree';

const DisplayPaneThreeSectionOneAssociate = () => {
  const [listExpand, setListExpand] = useState('');
  const {
    responseObject,
    headerOneBadgeTwo,
    reviewMode,
    administratorSecondary,
    setUpAssociateModule,
    associateNodeSetUpModule,
    analyticSetUpModule,
    itemSetUpModule,
    assessmentSetUpModule,
    assesseeSetUpModule,
    assignmentSetUpModule,
    assessmentSetUpModuleGeneric,
    assessmentSetUpModuleBespoke,
    assesseeSetUpModuleGeneric,
    assignmentSetUpModuleGeneric,
    itemSetUpModuleGeneric,
    analyticSetUpModuleGeneric,
    setUpAssociateModuleGeneric
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const {
    middlePaneHeader = '',
    associateCountryName,
    associateLanguages,
    associateCurrencyMaster
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const associateInfo = useSelector((state) => state.AssociateCreateReducer);
  const {
    informationEngagement,
    informationSetup,
    informationAllocation,
    informationAlliance
  } = responseObject;
  const country =
    setUpAssociateModule?.associateCountry?.associateCountryTag &&
    associateCountryName.filter(
      (x) => x.id === setUpAssociateModule?.associateCountry?.associateCountryTag
    )[0].name;
  const language =
    setUpAssociateModule?.associateLanguage?.associateLanguageTag &&
    associateLanguages.filter(
      (x) => x.id === setUpAssociateModule?.associateLanguage?.associateLanguageTag
    )[0].name;
  const currency =
    setUpAssociateModule?.associateCurrency?.associateCurrencyTag &&
    associateCurrencyMaster.filter(
      (x) => x.id === setUpAssociateModule?.associateCurrency?.associateCurrencyTag
    )[0].name;

  //console.log(setUpAssociateModule);

  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  function informationBasicStr(string) {
    return string === 'NAME_UNIQUE'
      ? 'Unique Name Required'
      : string === 'NAME_DESCRIPTION_UNIQUE'
      ? 'Unique Name + Description Required'
      : 'Unique Name & Description Not Rquired';
  }
  useEffect(() => {}, [administratorSecondary]);

  const dispatch = useDispatch();
  let administratorPrimaryList = [];
  if (informationAlliance?.associateAdministratorPrimary) {
    const ob = informationAlliance?.associateAdministratorPrimary || {};
    const administratorName = `${
      ob?.informationBasic.assesseeNamePrefix
    } ${ob?.informationBasic.assesseeNameFirst.trim()} ${ob?.informationBasic.assesseeNameOther.trim()} ${ob?.informationBasic.assesseeNameLast.trim()} ${ob?.informationBasic.assesseeNameSuffix.trim()}`.trim();
    administratorPrimaryList.push({
      id: ob.id,
      textOne: administratorName || '',
      textTwo: ob?.informationBasic?.assesseeAlias || '',
      status: ''
    });
  }
  let administratorSecondaryList = [];
  if (administratorSecondary && administratorSecondary.length > 0) {
    administratorSecondary.map((ob) => {
      const administratorSecondaryName = `${
        ob?.informationBasic.assesseeNamePrefix
      } ${ob?.informationBasic.assesseeNameFirst.trim()} ${ob?.informationBasic.assesseeNameOther.trim()} ${ob?.informationBasic.assesseeNameLast.trim()} ${ob?.informationBasic.assesseeNameSuffix.trim()}`.trim();
      administratorSecondaryList.push({
        id: ob.id,
        textOne: administratorSecondaryName || '',
        textTwo: ob?.informationBasic?.assesseeAlias || '',
        status: ''
      });
    });
  }

  const allianceListAll = [
    {
      id: 'a2',
      labelTextOneOne: 'administrator',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges:
        middlePaneHeader === ''
          ? [
              {
                labelTextOneOneBadge: 'primary',
                innerList: administratorPrimaryList
              },
              {
                labelTextOneOneBadge: 'secondary',
                innerList: administratorSecondaryList
              }
            ]
          : [
              {
                labelTextOneOneBadge: 'primary',
                innerList: administratorPrimaryList
              }
            ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];
  let associateRoleListPrimary = [];
  if (
    informationAllocation?.associateRole.associateRolePrimary &&
    informationAllocation?.associateRole.associateRolePrimary.length > 0
  ) {
    const tempArr = informationAllocation?.associateRole?.associateRolePrimary;
    tempArr.forEach((ob) => {
      associateRoleListPrimary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.associateRoleName || '',
        textTwo: ob?.informationBasic?.associateRoleDescription || '',
        status: ''
      });
    });
  }
  let associateRoleListSecondary = [];
  if (
    informationAllocation?.associateRole.associateRoleSecondary &&
    informationAllocation?.associateRole.associateRoleSecondary.length > 0
  ) {
    const tempArr = informationAllocation?.associateRole?.associateRoleSecondary;
    tempArr.forEach((ob) => {
      associateRoleListSecondary.push({
        id: ob.id,
        textOne: ob?.informationBasic?.associateRoleName || '',
        textTwo: ob?.informationBasic?.associateRoleDescription || '',
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
      labelTextOneOne: 'role',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: associateRoleListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: associateRoleListSecondary
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
      textOneOne: capitalizeFirstLetter(informationEngagement.associateStatus) || 'No Information',
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
          textOne: informationEngagement?.associateTag?.associateTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement?.associateTag?.associateTagSecondary || 'No Information'
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
            informationEngagement.associateTenureDate?.associateTenureDateTimeStart ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement.associateTenureDate?.associateTenureDateTimeEnd ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  const setUpListAll = [
    {
      id: 'a1',
      labelTextOneOne: 'assessees',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctCreateApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList:
                    assesseeSetUpModule?.assesseeDistinctInformationBasic === 'NAME_UNIQUE'
                      ? 'Unique Name Required'
                      : assesseeSetUpModule?.assesseeDistinctInformationBasic ===
                        'NAME_DESCRIPTION_UNIQUE'
                      ? 'Unique Name + Alias Required'
                      : 'Unique Name & Alias Not Rquired'
                },
                {
                  labelTextTwoBadge: 'name',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctNameFormat || 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'sign-on',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctSignOnApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctSignOnFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctSignOnPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assesseeSetUpModule?.assesseeGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: informationBasicStr(
                    assesseeSetUpModule?.assesseeGroupTransferFee || 'No'
                  )
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              //innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupShare ? 'Yes' : 'No'
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'role',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeRoleCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assesseeSetUpModule?.assesseeRoleInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: assesseeSetUpModule?.assesseeRoleShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeTypeCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assesseeSetUpModule?.assesseeTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: assesseeSetUpModule?.assesseeTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true,
      IconOne: SyncIcon
    },
    {
      id: 'a-112',
      labelTextOneOne: 'assessments',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentDistinctCreateApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleBespoke?.assessmentDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentDistinctCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assessmentSetUpModuleBespoke?.assessmentDistinctInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentDistinctTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleBespoke?.assessmentDistinctTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentDistinctTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleBespoke?.assessmentDistinctShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentDistinctSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentGroupCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assessmentSetUpModuleBespoke?.assessmentGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentGroupTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleBespoke?.assessmentGroupTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentGroupTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentGroupShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentGroupShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentGroupSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentTypeCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assessmentSetUpModuleBespoke?.assessmentTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true,
      IconOne: SyncIcon
    },
    {
      id: 'assignment-232',
      labelTextOneOne: 'assignments',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctCreateApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assignmentSetUpModule?.assignmentDistinctInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctTransferPermission
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assignmentSetUpModule?.assignmentGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentTypeCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assignmentSetUpModule?.assignmentTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: assignmentSetUpModule?.assignmentTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true,
      IconOne: SyncIcon
    },
    {
      id: 'associate-213',
      labelTextOneOne: 'associates',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctCreateApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    setUpAssociateModule?.associateDistinctInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'sign-on',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctSignOnApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctSignOnFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctSignOnPermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    setUpAssociateModule?.associateGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'node',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateNodeCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    setUpAssociateModule?.associateNodeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'ascendant',
                  innerLabelBadgeList: [
                    {
                      labelTextTwoBadge: 'all',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeAscendantAll
                      )
                    },
                    {
                      labelTextTwoBadge: 'primary',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeAscendantPrimary
                      )
                    },
                    {
                      labelTextTwoBadge: 'secondary',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeAscendantSecondary
                      )
                    }
                  ]
                },
                {
                  labelTextTwoBadge: 'descendant',
                  innerLabelBadgeList: [
                    {
                      labelTextTwoBadge: 'all',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeDescendantAll
                      )
                    },
                    {
                      labelTextTwoBadge: 'primary',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeDescendantPrimary
                      )
                    },
                    {
                      labelTextTwoBadge: 'secondary',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeDescendantSecondary
                      )
                    }
                  ]
                },
                {
                  labelTextTwoBadge: 'peer',
                  innerLabelBadgeList: [
                    {
                      labelTextTwoBadge: 'all',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodePeerAll
                      )
                    }
                  ]
                },
                {
                  labelTextTwoBadge: 'root',
                  innerLabelBadgeList: getPermissionStr(
                    associateNodeSetUpModule?.informationSetup?.associateNodeRoot
                  )
                },
                {
                  labelTextTwoBadge: 'self',
                  innerLabelBadgeList: getPermissionStr(
                    associateNodeSetUpModule?.informationSetup?.associateNodeSelf
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: 'role',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateRoleCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    setUpAssociateModule?.associateRoleInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: setUpAssociateModule?.associateRoleShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateTypeCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    setUpAssociateModule?.associateTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: setUpAssociateModule?.associateTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'brand',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'choice',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandChoice || 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandPermission
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'picture',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandPicture || 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'country',
              // innerLabelBadgeList: [
              //   // {
              //   //   labelTextTwoBadge: 'flag',
              //   //   innerLabelBadgeList:
              //   //     setUpAssociateModule?.associateCountry?.associateCountryFlag || 'No'
              //   // },
              //   // {
              //   //   labelTextTwoBadge: 'name',
              //   //   innerLabelBadgeList:
              //   //     setUpAssociateModule?.associateCountry?.associateCountryName || 'No'
              //   // },
              //   // {
              //   //   labelTextTwoBadge: 'tag',
              //   //   innerLabelBadgeList:
              //   //     setUpAssociateModule?.associateCountry?.associateCountryTag || 'No'
              //   // }
              // ]
              innerLabelBadgeList: country || 'No'
              //setUpAssociateModule?.associateCountry?.associateCountryName || 'No'
            },
            {
              labelTextTwoBadge: 'currency',
              innerLabelBadgeList: currency || 'No'
              // setUpAssociateModule?.associateCurrencyName || 'No'
              // innerLabelBadgeList: [
              //   // {
              //   //   labelTextTwoBadge: 'name',
              //   //   innerLabelBadgeList: setUpAssociateModule?.associateCurrencyName || 'No'
              //   // },
              //   // {
              //   //   labelTextTwoBadge: 'symbol',
              //   //   innerLabelBadgeList: setUpAssociateModule?.associateCurrencySymbol || 'No'
              //   // },
              //   // {
              //   //   labelTextTwoBadge: 'tag',
              //   //   innerLabelBadgeList: setUpAssociateModule?.associateCurrencyTag || 'No'
              //   // }
              // ]
            },
            {
              labelTextTwoBadge: 'date',
              innerLabelBadgeList: setUpAssociateModule?.associateDateFormat || 'No'
            },
            {
              labelTextTwoBadge: 'domain',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'primary',
                  innerLabelBadgeList: setUpAssociateModule?.associateDomainPrimary || 'No'
                },
                {
                  labelTextTwoBadge: 'secondary',
                  innerLabelBadgeList: setUpAssociateModule?.associateDomainSecondary || 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: setUpAssociateModule?.associateInformation || 'No'
            },
            {
              labelTextTwoBadge: 'language',
              innerLabelBadgeList: language || 'No'
              //setUpAssociateModule?.associateLanguage?.associateLanguageName || 'No'
              // innerLabelBadgeList: [
              //   {
              //     labelTextTwoBadge: 'name',
              //     innerLabelBadgeList: setUpAssociateModule?.associateLanguageName || 'No'
              //   },
              //   {
              //     labelTextTwoBadge: 'tag',
              //     innerLabelBadgeList: setUpAssociateModule?.associateLanguageTag || 'No'
              //   }
              // ]
            },
            {
              labelTextTwoBadge: 'service',
              innerLabelBadgeList: setUpAssociateModule?.associateService || 'No'
            },
            {
              labelTextTwoBadge: 'rating',
              innerLabelBadgeList: setUpAssociateModule?.associateRating || 'No'
            },
            {
              labelTextTwoBadge: 'theme',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformThemeApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'choice',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformThemeChoice || 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformThemeFee ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformThemePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'time',
              innerLabelBadgeList: setUpAssociateModule?.associateTimeFormat || 'No'
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true,
      IconOne: SyncIcon
    },
    {
      id: 'iguru-11',
      labelTextOneOne: 'iGuru analytics',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: analyticSetUpModule?.iguruAnalyticDistinctCreateApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: analyticSetUpModule?.iguruAnalyticDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModule?.iguruAnalyticDistinctCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    analyticSetUpModule?.iguruAnalyticTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticDistinctTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticDistinctTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticDistinctTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticDistinctShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticDistinctSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModule?.iguruAnalyticGroupCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    analyticSetUpModule?.iguruAnalyticGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticGroupTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticGroupTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticGroupTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticGroupShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticGroupShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticGroupSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticTypeCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    analyticSetUpModule?.iGuruAnalyticTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true,
      IconOne: SyncIcon
    },
    {
      id: 'iguru-market-11',
      labelTextOneOne: 'iGuru marketplace',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'rating',
              innerLabelBadgeList: 'No'
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true,
      IconOne: SyncIcon
    },
    {
      id: 'iguru-mine-11',
      labelTextOneOne: 'iGuru mine',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true,
      IconOne: SyncIcon
    },
    {
      id: 'iguru-item-11',
      labelTextOneOne: 'items',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctCreateApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(itemSetUpModule?.itemInformationBasic)
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctTransferApproval ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctShareApproval ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctSharePermission ? 'Yes' : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModule?.itemGroupCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    itemSetUpModule?.itemGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: itemSetUpModule?.itemGroupTransferApproval ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModule?.itemGroupTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModule?.itemGroupTransferPermission ? 'Yes' : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: itemSetUpModule?.itemGroupShareApproval ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModule?.itemGroupShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModule?.itemGroupSharePermission ? 'Yes' : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModule?.itemTypeCreatePermission
                    ? 'Permitted'
                    : 'Unpermitted'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    itemSetUpModule?.itemTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: itemSetUpModule?.itemTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true,
      IconOne: SyncIcon
    }
  ];
  const allianceListKey = [
    {
      id: 'a1',
      labelTextOneOne: 'administrator',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      isListCard: true,
      labelTextOneOneBadges:
        middlePaneHeader === ''
          ? [
              {
                labelTextOneOneBadge: 'primary',
                innerList: administratorPrimaryList
              },
              {
                labelTextOneOneBadge: 'secondary',
                innerList: administratorSecondaryList
              }
            ]
          : [
              {
                labelTextOneOneBadge: 'primary',
                innerList: administratorPrimaryList
              }
            ],
      innerInfo: 'No Information'
    }
  ];
  const engagementListKey = [
    {
      id: 'a2',
      textOneOne: capitalizeFirstLetter(informationEngagement.associateStatus) || 'No Information',
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
          textOne: informationEngagement.associateTag.associateTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement.associateTag.associateTagSecondary || 'No Information'
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
            informationEngagement.associateTenureDate?.associateTenureDateTimeStart ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement.associateTenureDate?.associateTenureDateTimeEnd ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];

  const setUpPlusListAll = [
    {
      id: 'a1',
      labelTextOneOne: 'assessees',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList:
                    assesseeSetUpModuleGeneric?.assesseeDistinctInformationBasic === 'NAME_UNIQUE'
                      ? 'Unique Name Required'
                      : assesseeSetUpModuleGeneric?.assesseeDistinctInformationBasic ===
                        'NAME_DESCRIPTION_UNIQUE'
                      ? 'Unique Name + Alias Required'
                      : 'Unique Name & Alias Not Rquired'
                },
                {
                  labelTextTwoBadge: 'name',
                  innerLabelBadgeList:
                    assesseeSetUpModuleGeneric?.assesseeDistinctNameFormat || 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'sign-on',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctSignOnApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctSignOnFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctSignOnPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeGroupCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assesseeSetUpModuleGeneric?.assesseeGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'role',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeRoleCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assesseeSetUpModuleGeneric?.assesseeRoleInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeRoleShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeTypeCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assesseeSetUpModuleGeneric?.assesseeTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'a-112',
      labelTextOneOne: 'assessments',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleGeneric?.assessmentDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assessmentSetUpModuleGeneric?.assessmentDistinctInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assesseeDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleGeneric?.assesseeDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assesseeDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assesseeDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleGeneric?.assesseeDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assesseeDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentGroupCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assessmentSetUpModuleGeneric?.assessmentGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assesseeDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleGeneric?.assesseeDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assesseeDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assesseeDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleGeneric?.assesseeDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assesseeDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentTypeCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assessmentSetUpModuleGeneric?.assessmentTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'assignment-232',
      labelTextOneOne: 'assignments',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assignmentSetUpModuleGeneric?.assignmentDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assignmentSetUpModuleGeneric?.assignmentDistinctInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assignmentSetUpModuleGeneric?.assignmentDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assignmentSetUpModuleGeneric?.assignmentDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentGroupCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assignmentSetUpModuleGeneric?.assignmentGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assignmentSetUpModuleGeneric?.assignmentDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assignmentSetUpModuleGeneric?.assignmentDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentTypeCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    assignmentSetUpModuleGeneric?.assignmentTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'associate-213',
      labelTextOneOne: 'associates',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    setUpAssociateModuleGeneric?.associateDistinctInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'sign-on',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctSignOnApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDistinctSignOnFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctSignOnPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateGroupCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    setUpAssociateModuleGeneric?.associateGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'node',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateNodeCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    setUpAssociateModuleGeneric?.associateNodeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'ascendant',
                  innerLabelBadgeList: [
                    {
                      labelTextTwoBadge: 'all',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeAscendantAll
                      )
                    },
                    {
                      labelTextTwoBadge: 'primary',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeAscendantPrimary
                      )
                    },
                    {
                      labelTextTwoBadge: 'secondary',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeAscendantSecondary
                      )
                    }
                  ]
                },
                {
                  labelTextTwoBadge: 'descendant',
                  innerLabelBadgeList: [
                    {
                      labelTextTwoBadge: 'all',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeDescendantAll
                      )
                    },
                    {
                      labelTextTwoBadge: 'primary',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeDescendantPrimary
                      )
                    },
                    {
                      labelTextTwoBadge: 'secondary',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodeDescendantSecondary
                      )
                    }
                  ]
                },
                {
                  labelTextTwoBadge: 'peer',
                  innerLabelBadgeList: [
                    {
                      labelTextTwoBadge: 'all',
                      innerLabelBadgeList: getPermissionStr(
                        associateNodeSetUpModule?.informationSetup?.associateNodePeerAll
                      )
                    }
                  ]
                },
                {
                  labelTextTwoBadge: 'root',
                  innerLabelBadgeList: getPermissionStr(
                    associateNodeSetUpModule?.informationSetup?.associateNodeRoot
                  )
                },
                {
                  labelTextTwoBadge: 'self',
                  innerLabelBadgeList: getPermissionStr(
                    associateNodeSetUpModule?.informationSetup?.associateNodeSelf
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: 'role',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateRoleCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    setUpAssociateModule?.associateRoleInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: setUpAssociateModule?.associateRoleShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateTypeCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    setUpAssociateModule?.associateTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: setUpAssociateModule?.associateTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'brand',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'choice',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandChoice || 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandPermission
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'picture',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandPicture || 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'country',
              innerLabelBadgeList:
                setUpAssociateModuleGeneric?.associateCountry?.associateCountryName || 'No'
            },
            {
              labelTextTwoBadge: 'currency',
              innerLabelBadgeList: setUpAssociateModuleGeneric?.associateCurrencyName || 'No'
            },
            {
              labelTextTwoBadge: 'date',
              innerLabelBadgeList: setUpAssociateModule?.associateDateFormat || 'No'
            },
            {
              labelTextTwoBadge: 'domain',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'primary',
                  innerLabelBadgeList: setUpAssociateModule?.associateDomainPrimary || 'No'
                },
                {
                  labelTextTwoBadge: 'secondary',
                  innerLabelBadgeList: setUpAssociateModule?.associateDomainSecondary || 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: setUpAssociateModule?.associateInformation || 'No'
            },
            {
              labelTextTwoBadge: 'language',
              innerLabelBadgeList: setUpAssociateModuleGeneric?.associateLanguage || 'No'
              // innerLabelBadgeList: [
              //   {
              //     labelTextTwoBadge: 'name',
              //     innerLabelBadgeList: setUpAssociateModule?.associateLanguageName || 'No'
              //   },
              //   {
              //     labelTextTwoBadge: 'tag',
              //     innerLabelBadgeList: setUpAssociateModule?.associateLanguageTag || 'No'
              //   }
              // ]
            },
            {
              labelTextTwoBadge: 'service',
              innerLabelBadgeList: setUpAssociateModule?.associateService || 'No'
            },
            {
              labelTextTwoBadge: 'rating',
              innerLabelBadgeList: setUpAssociateModule?.associateRating || 'No'
            },
            {
              labelTextTwoBadge: 'theme',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformThemeApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'choice',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformThemeChoice || 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformThemeFee ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformThemePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'time',
              innerLabelBadgeList: setUpAssociateModule?.associateTimeFormat || 'No'
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
      id: 'iguru-11',
      labelTextOneOne: 'iGuru analytics',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    analyticSetUpModuleGeneric?.iguruAnalyticTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticGroupCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    analyticSetUpModuleGeneric?.iguruAnalyticGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticTypeCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    analyticSetUpModuleGeneric?.iGuruAnalyticTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'iguru-market-11',
      labelTextOneOne: 'iGuru marketplace',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'rating',
              innerLabelBadgeList: 'No'
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
      id: 'iguru-mine-11',
      labelTextOneOne: 'iGuru mine',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: 'No'
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'iguru-item-11',
      labelTextOneOne: 'items',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'distinct',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    itemSetUpModuleGeneric?.itemInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreateApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreateFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemGroupCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    itemSetUpModuleGeneric?.itemGroupInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemGroupTransferApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemGroupTransferFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemGroupTransferPermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemGroupShareApproval ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemGroupShareFee || 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemGroupSharePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            }
          ]
        },
        {
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemTypeCreatePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: informationBasicStr(
                    itemSetUpModuleGeneric?.itemTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: itemSetUpModuleGeneric?.itemTypeShare ? 'Yes' : 'No'
            }
          ]
        },
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: 'No'
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
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
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'GROUPPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'GROUPSECONDARYPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'manager') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'MANAGERPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'MANAGERSECONDARYPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'node') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'NODEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'NODESECONDARYPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'role') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'ROLEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ROLESECONDARYPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
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
        payload: capitalizeFirstLetter(informationEngagement?.associateStatus)
      });
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'STATUSPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'tag') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'TAGREADONLYPRIMARYPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'TAGSECONDARYPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'tenure') {
      if (selectedBadgeName === 'start') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'TENURESATRTDATEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (selectedBadgeName === 'end') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'TENUREENDDATEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
  };
  const reviseSetup = (e, selectedBadgeArray) => {
    debugger;
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('labelName', labelName);
    console.log('selectedBadgeName', selectedBadgeName);
    // console.log(labelName, '+labelName+', selectedBadgeArray, '=Array=', selectedBadgeName);
    let badgeName = '';
    if (selectedBadgeArray.length > 0) {
      selectedBadgeArray.forEach((element) => {
        badgeName = badgeName + element.labelTextTwoBadge;
      });
    }
    console.log('badgeName', badgeName);
    if (labelName === 'assessees') {
      if (!associateInfo?.informationSetup.assessee) {
        dispatch({
          type: UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO,
          payload: assesseeSetUpModule
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'approval') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEECREATEAPPROVALPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'fee') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEECREATEFEEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEEINFODISTINCTBASICPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctinformation' && selectedBadgeName === 'name') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'PEOPLEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinct' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEE_DIST_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctsign-on' && selectedBadgeName === 'approval') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEE_SIGNON_APPROVAL_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctsign-on' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEE_SIGNON_PERMISSION_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'group' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEE_GROUP_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'type' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEE_TYPE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'role' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEE_ROLE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEEGROUPCREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEEBASICINFOGROUPPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'rolecreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEEROLECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'roleinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEEBASICINFOROLEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typecreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEETYPECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typeinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEEBASICINFOTYPEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (labelName === 'assessees' && selectedBadgeName === 'reset') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSEERESETPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'assessments') {
      if (!associateInfo?.informationSetup.assessment) {
        dispatch({
          type: UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO,
          payload: assessmentSetUpModule
        });
      }

      if (labelName === 'assessments' && selectedBadgeName === 'reset') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENTRESETPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'approval') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENTCREATEAPPROVALPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'fee') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENTCREATEFEEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENTCREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENTINFODISTINCTBASICPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctshare' && selectedBadgeName === 'node') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENT_NODE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctshare' && selectedBadgeName === 'associate') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENT_ASSOCIATE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'group' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENT_GROUP_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'type' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENT_TYPE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENTGROUPCREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENTBASICINFOGROUPPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typecreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENTTYPECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typeinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSESSMENTBASICINFOTYPEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'assignments') {
      if (!associateInfo?.informationSetup.assignment) {
        dispatch({
          type: UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO,
          payload: assignmentSetUpModule
        });
      }
      if (labelName === 'assignments' && selectedBadgeName === 'reset') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENTRESETPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'approval') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENTCREATEAPPROVALPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'fee') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENTCREATEFEEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENTCREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENTINFODISTINCTBASICPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENTGROUPCREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENTBASICINFOGROUPPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typecreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENTTYPECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typeinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENTBASICINFOTYPEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinct' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENT_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'group' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENT_GROUP_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'type' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSIGNMENT_TYPE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'items') {
      if (!associateInfo?.informationSetup.item) {
        dispatch({
          type: UPDATE_ASSOCIATE_SETUP_ITEM_INFO,
          payload: itemSetUpModule
        });
      }
      if (labelName === 'items' && selectedBadgeName === 'reset') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEMRESETPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'approval') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEMCREATEAPPROVALPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'fee') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEMCREATEFEEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEMCREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEMINFODISTINCTBASICPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEMGROUPCREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEMBASICINFOGROUPPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typecreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEMTYPECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typeinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEMBASICINFOTYPEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }

      if (badgeName === 'distinct' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEM_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'group' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEM_GROUP_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'type' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ITEM_TYPE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'iGuru analytics') {
      if (!associateInfo?.informationSetup.analytic) {
        dispatch({
          type: UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO,
          payload: analyticSetUpModule
        });
      }
      if (labelName === 'iGuru analytics' && selectedBadgeName === 'reset') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUANALYTICSRESETPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'approval') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUANALYTICSCREATEAPPROVALPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'fee') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUANALYTICSCREATEFEEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUANALYTICSCREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUANALYTICSINFODISTINCTBASICPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUANALYTICSGROUPCREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUANALYTICSBASICINFOGROUPPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typecreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUANALYTICSTYPECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typeinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUANALYTICSBASICINFOTYPEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinct' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ANALYTIC_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'group' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ANALYTIC_GROUP_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'type' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ANALYTIC_TYPE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'associates') {
      if (!associateInfo?.informationSetup.associate) {
        dispatch({
          type: UPDATE_ASSOCIATE_SETUP_INFO,
          payload: setUpAssociateModule
        });
      }
      if (
        badgeName === 'nodepermissiondescendant' ||
        badgeName === 'nodepermissionascendant' ||
        badgeName === 'nodepermissionpeer' ||
        badgeName === 'nodepermission'
      ) {
        if (!associateInfo?.informationSetup.associateNode) {
          dispatch({
            type: UPDATE_ASSOCIATE_SETUP_ASSOCIATENODE_INFO,
            payload: associateNodeSetUpModule
          });
        }
      }

      if (labelName === 'associates' && selectedBadgeName === 'reset') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATERESETPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'approval') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATECREATEAPPROVALPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'fee') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATECREATEFEEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATEINFODISTINCTBASICPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctinformation' && selectedBadgeName === 'name') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATEPEOPLEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupcreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATEGROUPCREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'groupinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATEBASICINFOGROUPPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'rolecreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATEROLECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'roleinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATEBASICINFOROLEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typecreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATETYPECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'typeinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATEBASICINFOTYPEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'nodecreate' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATENODECREATEPERMISSIONPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'nodeinformation' && selectedBadgeName === 'basic') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATEBASICINFONODEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+' && selectedBadgeName === 'date') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'DATEFORMATPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+' && selectedBadgeName === 'language') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'LANGUAGEPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+' && selectedBadgeName === 'time') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'TIMEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
      if (badgeName === 'distinct' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_DIST_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctsign-on' && selectedBadgeName === 'approval') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_SIGNON_APPROVAL_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctsign-on' && selectedBadgeName === 'fee') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_SIGNON_FEE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'distinctsign-on' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_SIGNON_PERMISSION_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'group' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_GROUP_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'node' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_NODE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'role' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_ROLE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'type' && selectedBadgeName === 'share') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_TYPE_SHARE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+brand' && selectedBadgeName === 'approval') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_BRAND_APPROVAL_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+brand' && selectedBadgeName === 'fee') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_BRAND_FEE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+brand' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_BRAND_PERMISSION_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+brand' && selectedBadgeName === 'choice') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_BRAND_CHOICE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+brand' && selectedBadgeName === 'picture') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_BRAND_PICTURE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      // if (badgeName === '+domain' && selectedBadgeName === 'primary') {
      //   dispatch({
      //     type: ASSOCIATE_SIGN_ON,
      //     payload: {
      //       isPopUpValue: 'ASSOCIATE_DOMAIN_PRIMARY_POPUP',
      //       popupMode: 'ASSOCIATE_CREATE'
      //     }
      //   });
      // }
      // if (badgeName === '+domain' && selectedBadgeName === 'secondary') {
      //   dispatch({
      //     type: ASSOCIATE_SIGN_ON,
      //     payload: {
      //       isPopUpValue: 'ASSOCIATE_DOMAIN_SECONDARY_POPUP',
      //       popupMode: 'ASSOCIATE_CREATE'
      //     }
      //   });
      // }
      if (badgeName === '+theme' && selectedBadgeName === 'approval') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_THEME_APPROVAL_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+theme' && selectedBadgeName === 'fee') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_THEME_FEE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+theme' && selectedBadgeName === 'permission') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_THEME_PERMISSION_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'nodepermissiondescendant') {
        if (selectedBadgeName === 'all') {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: {
              stateName: 'permissionStateThree',
              value: 'associateNodeDescendantAll'
            }
          });
        }
        if (selectedBadgeName === 'primary') {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: {
              stateName: 'permissionStateThree',
              value: 'associateNodeDescendantPrimary'
            }
          });
        }
        if (selectedBadgeName === 'secondary') {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: {
              stateName: 'permissionStateThree',
              value: 'associateNodeDescendantSecondary'
            }
          });
        }
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'permissionStateOne', value: 'descendant' }
        });
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: {
            stateName: 'permissionStateTwo',
            value: selectedBadgeName
          }
        });
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_NODE_PERMISSION_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'nodepermissionascendant') {
        if (selectedBadgeName === 'all') {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: {
              stateName: 'permissionStateThree',
              value: 'associateNodeAscendantAll'
            }
          });
        }
        if (selectedBadgeName === 'primary') {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: {
              stateName: 'permissionStateThree',
              value: 'associateNodeAscendantPrimary'
            }
          });
        }
        if (selectedBadgeName === 'secondary') {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: {
              stateName: 'permissionStateThree',
              value: 'associateNodeAscendantSecondary'
            }
          });
        }
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'permissionStateOne', value: 'ascendant' }
        });
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: {
            stateName: 'permissionStateTwo',
            value: selectedBadgeName
          }
        });
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_NODE_PERMISSION_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'nodepermissionpeer') {
        if (selectedBadgeName === 'all') {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: {
              stateName: 'permissionStateThree',
              value: 'associateNodePeerAll'
            }
          });
        }
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'permissionStateOne', value: 'peer' }
        });
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: {
            stateName: 'permissionStateTwo',
            value: selectedBadgeName
          }
        });
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_NODE_PERMISSION_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === 'nodepermission') {
        if (selectedBadgeName === 'root') {
          dispatch({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: {
              stateName: 'permissionStateThree',
              value: 'associateNodeRoot'
            }
          });
        }
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'permissionStateOne', value: 'root' }
        });
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: {
            stateName: 'permissionStateTwo',
            value: selectedBadgeName
          }
        });
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_NODE_PERMISSION_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+' && selectedBadgeName === 'country') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_COUNTRY_NAME_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+' && selectedBadgeName === 'currency') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_CURRENCY_NAME_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'iGuru marketplace') {
      if (labelName === 'iGuru marketplace' && selectedBadgeName === 'reset') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUMARKETPLACERESETPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
    if (labelName === 'iGuru mine') {
      if (labelName === 'iGuru mine' && selectedBadgeName === 'reset') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'IGURUMINERESETPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }
  };

  const reviseSetupPlus = (e, selectedBadgeArray) => {
    debugger;
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('labelName', labelName);
    console.log('selectedBadgeName', selectedBadgeName);
    // console.log(labelName, '+labelName+', selectedBadgeArray, '=Array=', selectedBadgeName);
    let badgeName = '';
    if (selectedBadgeArray.length > 0) {
      selectedBadgeArray.forEach((element) => {
        badgeName = badgeName + element.labelTextTwoBadge;
      });
    }
    console.log('badgeName', badgeName);
    // if (labelName === "assessees") {
    //   if (!associateInfo?.informationSetup.assessee) {
    //     dispatch({
    //       type: UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO,
    //       payload: assesseeSetUpModule,
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "approval") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEECREATEAPPROVALPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "fee") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEECREATEFEEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctcreate" &&
    //     selectedBadgeName === "permission"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctinformation" &&
    //     selectedBadgeName === "basic"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEEINFODISTINCTBASICPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctinformation" && selectedBadgeName === "name") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "PEOPLEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinct" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEE_DIST_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctsign-on" && selectedBadgeName === "approval") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEE_SIGNON_APPROVAL_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctsign-on" &&
    //     selectedBadgeName === "permission"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEE_SIGNON_PERMISSION_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "group" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEE_GROUP_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "type" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEE_TYPE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "role" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEE_ROLE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupcreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEEGROUPCREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEEBASICINFOGROUPPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "rolecreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEEROLECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "roleinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEEBASICINFOROLEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typecreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEETYPECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typeinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEEBASICINFOTYPEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (labelName === "assessees" && selectedBadgeName === "reset") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSEERESETPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    // }
    // if (labelName === "assessments") {
    //   if (!associateInfo?.informationSetup.assessment) {
    //     dispatch({
    //       type: UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO,
    //       payload: assessmentSetUpModule,
    //     });
    //   }

    //   if (labelName === "assessments" && selectedBadgeName === "reset") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENTRESETPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "approval") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENTCREATEAPPROVALPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "fee") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENTCREATEFEEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctcreate" &&
    //     selectedBadgeName === "permission"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENTCREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctinformation" &&
    //     selectedBadgeName === "basic"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENTINFODISTINCTBASICPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctshare" && selectedBadgeName === "node") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENT_NODE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctshare" && selectedBadgeName === "associate") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENT_ASSOCIATE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "group" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENT_GROUP_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "type" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENT_TYPE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupcreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENTGROUPCREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENTBASICINFOGROUPPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typecreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENTTYPECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typeinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSESSMENTBASICINFOTYPEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    // }
    // if (labelName === "assignments") {
    //   if (!associateInfo?.informationSetup.assignment) {
    //     dispatch({
    //       type: UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO,
    //       payload: assignmentSetUpModule,
    //     });
    //   }
    //   if (labelName === "assignments" && selectedBadgeName === "reset") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENTRESETPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "approval") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENTCREATEAPPROVALPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "fee") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENTCREATEFEEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctcreate" &&
    //     selectedBadgeName === "permission"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENTCREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctinformation" &&
    //     selectedBadgeName === "basic"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENTINFODISTINCTBASICPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupcreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENTGROUPCREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENTBASICINFOGROUPPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typecreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENTTYPECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typeinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENTBASICINFOTYPEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinct" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENT_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "group" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENT_GROUP_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "type" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSIGNMENT_TYPE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    // }
    // if (labelName === "items") {
    //   if (!associateInfo?.informationSetup.item) {
    //     dispatch({
    //       type: UPDATE_ASSOCIATE_SETUP_ITEM_INFO,
    //       payload: itemSetUpModule,
    //     });
    //   }
    //   if (labelName === "items" && selectedBadgeName === "reset") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEMRESETPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "approval") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEMCREATEAPPROVALPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "fee") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEMCREATEFEEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctcreate" &&
    //     selectedBadgeName === "permission"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEMCREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctinformation" &&
    //     selectedBadgeName === "basic"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEMINFODISTINCTBASICPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupcreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEMGROUPCREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEMBASICINFOGROUPPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typecreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEMTYPECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typeinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEMBASICINFOTYPEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }

    //   if (badgeName === "distinct" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEM_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "group" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEM_GROUP_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "type" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ITEM_TYPE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    // }
    // if (labelName === "iGuru analytics") {
    //   if (!associateInfo?.informationSetup.analytic) {
    //     dispatch({
    //       type: UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO,
    //       payload: analyticSetUpModule,
    //     });
    //   }
    //   if (labelName === "iGuru analytics" && selectedBadgeName === "reset") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUANALYTICSRESETPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "approval") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUANALYTICSCREATEAPPROVALPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "fee") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUANALYTICSCREATEFEEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctcreate" &&
    //     selectedBadgeName === "permission"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUANALYTICSCREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctinformation" &&
    //     selectedBadgeName === "basic"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUANALYTICSINFODISTINCTBASICPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupcreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUANALYTICSGROUPCREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUANALYTICSBASICINFOGROUPPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typecreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUANALYTICSTYPECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typeinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUANALYTICSBASICINFOTYPEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinct" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ANALYTIC_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "group" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ANALYTIC_GROUP_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "type" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ANALYTIC_TYPE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    // }
    // if (labelName === "associates") {
    //   if (!associateInfo?.informationSetup.associate) {
    //     dispatch({
    //       type: UPDATE_ASSOCIATE_SETUP_INFO,
    //       payload: setUpAssociateModule,
    //     });
    //   }
    //   if (
    //     badgeName === "nodepermissiondescendant" ||
    //     badgeName === "nodepermissionascendant" ||
    //     badgeName === "nodepermissionpeer" ||
    //     badgeName === "nodepermission"
    //   ) {
    //     if (!associateInfo?.informationSetup.associateNode) {
    //       dispatch({
    //         type: UPDATE_ASSOCIATE_SETUP_ASSOCIATENODE_INFO,
    //         payload: associateNodeSetUpModule,
    //       });
    //     }
    //   }

    //   if (labelName === "associates" && selectedBadgeName === "reset") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATERESETPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "approval") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATECREATEAPPROVALPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctcreate" && selectedBadgeName === "fee") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATECREATEFEEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctcreate" &&
    //     selectedBadgeName === "permission"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctinformation" &&
    //     selectedBadgeName === "basic"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATEINFODISTINCTBASICPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctinformation" && selectedBadgeName === "name") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATEPEOPLEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupcreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATEGROUPCREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "groupinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATEBASICINFOGROUPPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "rolecreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATEROLECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "roleinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATEBASICINFOROLEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typecreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATETYPECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "typeinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATEBASICINFOTYPEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "nodecreate" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATENODECREATEPERMISSIONPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "nodeinformation" && selectedBadgeName === "basic") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATEBASICINFONODEPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+" && selectedBadgeName === "date") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "DATEFORMATPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+" && selectedBadgeName === "language") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "LANGUAGE_SETUP_PLUS_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+" && selectedBadgeName === "country") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_SETUPPLUS_COUNTRY_NAME_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+" && selectedBadgeName === "currency") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_SETUPPLUS_CURRENCY_NAME_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+" && selectedBadgeName === "time") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: { isPopUpValue: "TIMEPOPUP", popupMode: "ASSOCIATE_CREATE" },
    //     });
    //   }
    //   if (badgeName === "distinct" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_DIST_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctsign-on" && selectedBadgeName === "approval") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_SIGNON_APPROVAL_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "distinctsign-on" && selectedBadgeName === "fee") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_SIGNON_FEE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (
    //     badgeName === "distinctsign-on" &&
    //     selectedBadgeName === "permission"
    //   ) {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_SIGNON_PERMISSION_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "group" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_GROUP_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "node" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_NODE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "role" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_ROLE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "type" && selectedBadgeName === "share") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_TYPE_SHARE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+brand" && selectedBadgeName === "approval") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_BRAND_APPROVAL_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+brand" && selectedBadgeName === "fee") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_BRAND_FEE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+brand" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_BRAND_PERMISSION_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+brand" && selectedBadgeName === "choice") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_BRAND_CHOICE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+brand" && selectedBadgeName === "picture") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_BRAND_PICTURE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   // if (badgeName === '+domain' && selectedBadgeName === 'primary') {
    //   //   dispatch({
    //   //     type: ASSOCIATE_SIGN_ON,
    //   //     payload: {
    //   //       isPopUpValue: 'ASSOCIATE_DOMAIN_PRIMARY_POPUP',
    //   //       popupMode: 'ASSOCIATE_CREATE'
    //   //     }
    //   //   });
    //   // }
    //   // if (badgeName === '+domain' && selectedBadgeName === 'secondary') {
    //   //   dispatch({
    //   //     type: ASSOCIATE_SIGN_ON,
    //   //     payload: {
    //   //       isPopUpValue: 'ASSOCIATE_DOMAIN_SECONDARY_POPUP',
    //   //       popupMode: 'ASSOCIATE_CREATE'
    //   //     }
    //   //   });
    //   // }
    //   if (badgeName === "+theme" && selectedBadgeName === "approval") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_THEME_APPROVAL_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+theme" && selectedBadgeName === "fee") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_THEME_FEE_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "+theme" && selectedBadgeName === "permission") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_THEME_PERMISSION_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "nodepermissiondescendant") {
    //     if (selectedBadgeName === "all") {
    //       dispatch({
    //         type: SET_DISPLAY_TWO_SINGLE_STATE,
    //         payload: {
    //           stateName: "permissionStateThree",
    //           value: "associateNodeDescendantAll",
    //         },
    //       });
    //     }
    //     if (selectedBadgeName === "primary") {
    //       dispatch({
    //         type: SET_DISPLAY_TWO_SINGLE_STATE,
    //         payload: {
    //           stateName: "permissionStateThree",
    //           value: "associateNodeDescendantPrimary",
    //         },
    //       });
    //     }
    //     if (selectedBadgeName === "secondary") {
    //       dispatch({
    //         type: SET_DISPLAY_TWO_SINGLE_STATE,
    //         payload: {
    //           stateName: "permissionStateThree",
    //           value: "associateNodeDescendantSecondary",
    //         },
    //       });
    //     }
    //     dispatch({
    //       type: SET_DISPLAY_TWO_SINGLE_STATE,
    //       payload: { stateName: "permissionStateOne", value: "descendant" },
    //     });
    //     dispatch({
    //       type: SET_DISPLAY_TWO_SINGLE_STATE,
    //       payload: {
    //         stateName: "permissionStateTwo",
    //         value: selectedBadgeName,
    //       },
    //     });
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_NODE_PERMISSION_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "nodepermissionascendant") {
    //     if (selectedBadgeName === "all") {
    //       dispatch({
    //         type: SET_DISPLAY_TWO_SINGLE_STATE,
    //         payload: {
    //           stateName: "permissionStateThree",
    //           value: "associateNodeAscendantAll",
    //         },
    //       });
    //     }
    //     if (selectedBadgeName === "primary") {
    //       dispatch({
    //         type: SET_DISPLAY_TWO_SINGLE_STATE,
    //         payload: {
    //           stateName: "permissionStateThree",
    //           value: "associateNodeAscendantPrimary",
    //         },
    //       });
    //     }
    //     if (selectedBadgeName === "secondary") {
    //       dispatch({
    //         type: SET_DISPLAY_TWO_SINGLE_STATE,
    //         payload: {
    //           stateName: "permissionStateThree",
    //           value: "associateNodeAscendantSecondary",
    //         },
    //       });
    //     }
    //     dispatch({
    //       type: SET_DISPLAY_TWO_SINGLE_STATE,
    //       payload: { stateName: "permissionStateOne", value: "ascendant" },
    //     });
    //     dispatch({
    //       type: SET_DISPLAY_TWO_SINGLE_STATE,
    //       payload: {
    //         stateName: "permissionStateTwo",
    //         value: selectedBadgeName,
    //       },
    //     });
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_NODE_PERMISSION_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "nodepermissionpeer") {
    //     if (selectedBadgeName === "all") {
    //       dispatch({
    //         type: SET_DISPLAY_TWO_SINGLE_STATE,
    //         payload: {
    //           stateName: "permissionStateThree",
    //           value: "associateNodePeerAll",
    //         },
    //       });
    //     }
    //     dispatch({
    //       type: SET_DISPLAY_TWO_SINGLE_STATE,
    //       payload: { stateName: "permissionStateOne", value: "peer" },
    //     });
    //     dispatch({
    //       type: SET_DISPLAY_TWO_SINGLE_STATE,
    //       payload: {
    //         stateName: "permissionStateTwo",
    //         value: selectedBadgeName,
    //       },
    //     });
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_NODE_PERMISSION_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    //   if (badgeName === "nodepermission") {
    //     if (selectedBadgeName === "root") {
    //       dispatch({
    //         type: SET_DISPLAY_TWO_SINGLE_STATE,
    //         payload: {
    //           stateName: "permissionStateThree",
    //           value: "associateNodeRoot",
    //         },
    //       });
    //     }
    //     dispatch({
    //       type: SET_DISPLAY_TWO_SINGLE_STATE,
    //       payload: { stateName: "permissionStateOne", value: "root" },
    //     });
    //     dispatch({
    //       type: SET_DISPLAY_TWO_SINGLE_STATE,
    //       payload: {
    //         stateName: "permissionStateTwo",
    //         value: selectedBadgeName,
    //       },
    //     });
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "ASSOCIATE_NODE_PERMISSION_POPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    // }
    // if (labelName === "iGuru marketplace") {
    //   if (labelName === "iGuru marketplace" && selectedBadgeName === "reset") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUMARKETPLACERESETPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    // }
    // if (labelName === "iGuru mine") {
    //   if (labelName === "iGuru mine" && selectedBadgeName === "reset") {
    //     dispatch({
    //       type: ASSOCIATE_SIGN_ON,
    //       payload: {
    //         isPopUpValue: "IGURUMINERESETPOPUP",
    //         popupMode: "ASSOCIATE_CREATE",
    //       },
    //     });
    //   }
    // }
  };
  console.log(associateNodeSetUpModule);
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
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="setup+"
              isDisplayCardExpanded={listExpand === 'setup+'}
              setListExpand={setListExpand}
              list={setUpPlusListAll}
              mode={reviewMode}
              onClickRevise={reviseSetupPlus}
            />
          </div>
        </>
      ) : (
        <>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {allianceListKey.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <DisplayPanelAccordianReviewListOne
                        onClickRevise={reviseAlliance}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <DisplayPanelAccordianInformation
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

export default DisplayPaneThreeSectionOneAssociate;
