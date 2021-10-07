import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import {
  ASSOCIATE_SIGN_ON,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_STATUS_POPUP_VALUE,
  UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSOCIATENODE_INFO,
  UPDATE_ASSOCIATE_SETUP_INFO,
  UPDATE_ASSOCIATE_SETUP_ITEM_INFO,
  UPDATE_ASSOCIATE_COUNTRY_INFO,
  UPDATE_ASSOCIATE_CURRENCY_INFO,
  UPDATE_ASSOCIATE_LANGUAGE_INFO
} from '../../actionType';
import {
  getPermissionStr,
  makeAssociateRoleObj,
  makeInternalNodeObj
} from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOneAssociate = () => {
  const [listExpand, setListExpand] = useState('');
  const [currencyData, setCurrencyData] = useState('No Information');
  const [countryData, setCountryData] = useState('No Information');
  const [languageData, setLanguageData] = useState('No Information');
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
    associateCurrencyMaster,
    selectedAssociateInfo
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const associateInfo = useSelector((state) => state.AssociateCreateReducer);
  const { informationEngagement, informationAllocation, informationAlliance } = responseObject;

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
  useEffect(() => {
    let currency =
      setUpAssociateModule?.associateCurrency?.associateCurrencyTag &&
      associateCurrencyMaster.filter(
        (x) => x.id === setUpAssociateModule?.associateCurrency?.associateCurrencyTag
      )[0].name;
    setCurrencyData(currency);
    const country =
      setUpAssociateModule?.associateCountry?.associateCountryTag &&
      associateCountryName.filter(
        (x) => x.id === setUpAssociateModule?.associateCountry?.associateCountryTag
      )[0].name;
    setCountryData(country);
    const language =
      setUpAssociateModule?.associateLanguage?.associateLanguageTag &&
      associateLanguages.filter(
        (x) => x.id === setUpAssociateModule?.associateLanguage?.associateLanguageTag
      )[0].name;
    setLanguageData(language);
  }, [administratorSecondary, setUpAssociateModule]);

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
  let associateGroupListPrimary=[];
  if(informationAllocation?.associateGroup?.associateGroupPrimary &&
    informationAllocation?.associateGroup?.associateGroupPrimary.length>0){
      const tempArr=informationAllocation?.associateGroup?.associateGroupPrimary;
      tempArr.forEach((ob) => {
        associateGroupListPrimary.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateGroupName || '',
          textTwo: ob?.informationBasic?.associateGroupDescription || '',
          status: ''
        });
      });
    }
    let associateGroupListSecondary=[];
  if(informationAllocation?.associateGroup?.associateGroupSecondary &&
    informationAllocation?.associateGroup?.associateGroupSecondary.length>0){
      const tempArr=informationAllocation?.associateGroup?.associateGroupSecondary;
      tempArr.forEach((ob) => {
        associateGroupListSecondary.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateGroupName || '',
          textTwo: ob?.informationBasic?.associateGroupDescription || '',
          status: ''
        });
      });
    }
    let associateManagerListPrimary=[];
  if(informationAllocation?.associateManager?.associateManagerPrimary &&
    informationAllocation?.associateManager?.associateManagerPrimary.length>0){
      const tempArr=informationAllocation?.associateManager?.associateManagerPrimary;
      tempArr.forEach((ob) => {
        associateManagerListPrimary.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateManagerName || '',
          textTwo: ob?.informationBasic?.associateManagerDescription || '',
          status: ''
        });
      });
    }
    let associateManagerListSecondary=[];
  if(informationAllocation?.associateManager?.associateManagerSecondary &&
    informationAllocation?.associateManager?.associateManagerSecondary.length>0){
      const tempArr=informationAllocation?.associateManager?.associateManagerSecondary;
      tempArr.forEach((ob) => {
        associateManagerListSecondary.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateManagerName || '',
          textTwo: ob?.informationBasic?.associateManagerDescription || '',
          status: ''
        });
      });
    }

    let associateNodeListPrimary=[];
    if(informationAllocation?.associateNode?.associateNodePrimary &&
      informationAllocation?.associateNode?.associateNodePrimary.length>0){
        const tempArr=informationAllocation?.associateNode?.associateNodePrimary;
        tempArr.forEach((ob) => {
          associateNodeListPrimary.push({
            id: ob.id,
            textOne: ob?.informationBasic?.associateNodeName || '',
            textTwo: ob?.informationBasic?.associateNodeDescription || '',
            status: ''
          });
        });
      }

      let associateNodeListSecondary=[];
      if(informationAllocation?.associateNode?.associateNodeSecondary &&
        informationAllocation?.associateNode?.associateNodeSecondary.length>0){
          const tempArr=informationAllocation?.associateNode?.associateNodeSecondary;
          tempArr.forEach((ob) => {
            associateNodeListSecondary.push({
              id: ob.id,
              textOne: ob?.informationBasic?.associateNodeName || '',
              textTwo: ob?.informationBasic?.associateNodeDescription || '',
              status: ''
            });
          });
        }

        let associateTypeListPrimary=[];
      if(informationAllocation?.associateType?.associateTypePrimary &&
        informationAllocation?.associateType?.associateTypePrimary.length>0){
          const tempArr=informationAllocation?.associateType?.associateTypePrimary;
          tempArr.forEach((ob) => {
            associateTypeListPrimary.push({
              id: ob.id,
              textOne: ob?.informationBasic?.associateTypeName || '',
              textTwo: ob?.informationBasic?.associateTypeDescription || '',
              status: ''
            });
          });
        }

        let associateTypeListSecondary=[];
        if(informationAllocation?.associateType?.associateTypeSecondary &&
          informationAllocation?.associateType?.associateTypeSecondary.length>0){
            const tempArr=informationAllocation?.associateType?.associateTypeSecondary;
            tempArr.forEach((ob) => {
              associateTypeListSecondary.push({
                id: ob.id,
                textOne: ob?.informationBasic?.associateTypeName || '',
                textTwo: ob?.informationBasic?.associateTypeDescription || '',
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
          innerList: associateGroupListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: associateGroupListSecondary
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
          innerList: associateManagerListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: associateManagerListSecondary
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
          innerList: associateNodeListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: associateNodeListSecondary
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
          innerList: associateTypeListPrimary
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: associateTypeListSecondary
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
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctCreateFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol + " " + assesseeSetUpModule?.assesseeDistinctCreateFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol + ' 0.00'
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
                  //'NAME_DESCRIPTION_UNIQUE'
                  labelTextTwoBadge: 'name',
                  innerLabelBadgeList:
                    assesseeSetUpModule?.assesseeDistinctNameFormat === 'NAME_DESCRIPTION_UNIQUE'
                      ? 'Last-Name First-Name Other-Name'
                      : 'First-Name Other-Name Last-Name' || 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctSellFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+ assesseeSetUpModule?.assesseeDistinctSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol +' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctSellPermission
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
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctShareFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+ assesseeSetUpModule?.assesseeDistinctShareFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol +' 0.00'
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
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctSignOnFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+ ' ' + assesseeSetUpModule?.assesseeDistinctSignOnFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeDistinctSignOnPermission
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
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupSellApproval ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupSellFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+assesseeSetUpModule?.assesseeGroupSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupSellPermission
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
                  innerLabelBadgeList: assesseeSetUpModule?.assesseeGroupShareFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+assesseeSetUpModule?.assesseeGroupShareFee)  || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
              innerLabelBadgeList: assesseeSetUpModule?.assesseeRoleSharePermission ? 'Yes' : 'No'
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
              innerLabelBadgeList: assesseeSetUpModule?.assesseeTypeSharePermission ? 'Yes' : 'No'
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
      //IconOne: SyncIcon,
      isResetIcon: true,
      IconReset: FlipCameraAndroidIcon
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
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentDistinctCreateFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol + " " + assessmentSetUpModuleBespoke?.assessmentDistinctCreateFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:assessmentSetUpModuleBespoke?.assessmentDistinctSellFee &&
                  (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+assessmentSetUpModuleBespoke?.assessmentDistinctSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol +' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentDistinctSellPermission
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
                  innerLabelBadgeList:assessmentSetUpModuleBespoke?.assessmentDistinctShareFee &&
                  (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+assessmentSetUpModuleBespoke?.assessmentDistinctShareFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentGroupSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:assessmentSetUpModuleBespoke?.assessmentGroupSellFee &&
                  (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+ ' ' + assessmentSetUpModuleBespoke?.assessmentGroupSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentGroupSellPermission
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
                  innerLabelBadgeList:assessmentSetUpModuleBespoke?.assessmentGroupShareFee&&
                  (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+ ' ' +assessmentSetUpModuleBespoke?.assessmentGroupShareFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
              innerLabelBadgeList: assessmentSetUpModuleBespoke?.assessmentTypeSharePermission
                ? 'Yes'
                : 'No'
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
      //IconOne: SyncIcon,
      isResetIcon: true,
      IconReset: FlipCameraAndroidIcon
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
                  innerLabelBadgeList:  assignmentSetUpModule?.assignmentDistinctCreateFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol +' '+ assignmentSetUpModule?.assignmentDistinctCreateFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:assignmentSetUpModule?.assignmentDistinctSellFee&& (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+assignmentSetUpModule?.assignmentDistinctSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctSellPermission
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
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentDistinctShareFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+assignmentSetUpModule?.assignmentDistinctShareFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupSellFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+assignmentSetUpModule?.assignmentGroupSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupSellPermission
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
                  innerLabelBadgeList: assignmentSetUpModule?.assignmentGroupShareFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+ ' ' +assignmentSetUpModule?.assignmentGroupShareFee)  || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
              innerLabelBadgeList: assignmentSetUpModule?.assignmentTypeSharePermission
                ? 'Yes'
                : 'No'
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
      //IconOne: SyncIcon,
      isResetIcon: true,
      IconReset: FlipCameraAndroidIcon
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
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctCreateFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol + ' '+ setUpAssociateModule?.associateDistinctCreateFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctSellFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+setUpAssociateModule?.associateDistinctSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctSellPermission
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
                  innerLabelBadgeList: setUpAssociateModule?.associateDistinctShareFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' ' +setUpAssociateModule?.associateDistinctShareFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList:  setUpAssociateModule?.associateDistinctSignOnFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol + ' ' + setUpAssociateModule?.associateDistinctSignOnFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupSellFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol + ' ' + setUpAssociateModule?.associateGroupSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupSellPermission
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
                  innerLabelBadgeList: setUpAssociateModule?.associateGroupShareFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+setUpAssociateModule?.associateGroupShareFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
              innerLabelBadgeList: associateNodeSetUpModule?.associateNodeSharePermission
                ? 'Yes'
                : 'No'
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
              innerLabelBadgeList: setUpAssociateModule?.associateRoleSharePermission ? 'Yes' : 'No'
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
              innerLabelBadgeList: setUpAssociateModule?.associateTypeSharePermission ? 'Yes' : 'No'
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
                  innerLabelBadgeList:
                    setUpAssociateModule?.iguruPlatformBrandChoice || 'No Information'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:setUpAssociateModule?.iguruPlatformBrandFee&& (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+ ' ' +setUpAssociateModule?.iguruPlatformBrandFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModule?.iguruPlatformBrandPermission
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'picture',
                  innerLabelBadgeList:
                    setUpAssociateModule?.iguruPlatformBrandPicture || 'No Information',
                  IconOne: BlurOnIcon
                }
              ]
            },
            {
              labelTextTwoBadge: 'country',
              innerLabelBadgeList: countryData || 'No Information',
              //innerLabelreset: "country",
              IconOne: BlurOnIcon
              //setUpAssociateModule?.associateCountry?.associateCountryName || 'No'
            },
            {
              labelTextTwoBadge: 'currency',
              innerLabelBadgeList: currencyData || 'No Information',
              IconOne: BlurOnIcon
            },
            {
              labelTextTwoBadge: 'date',
              innerLabelBadgeList: setUpAssociateModule?.associateDateFormat || 'No Information'
            },
            {
              labelTextTwoBadge: 'domain',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'primary',
                  innerLabelBadgeList:
                    setUpAssociateModule?.associateDomainPrimary || 'No Information'
                },
                {
                  labelTextTwoBadge: 'secondary',
                  innerLabelBadgeList:
                    setUpAssociateModule?.associateDomainSecondary || 'No Information'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: setUpAssociateModule?.associateInformation || 'No Information'
            },
            {
              labelTextTwoBadge: 'language',
              innerLabelBadgeList: languageData || 'No Information'
            },
            {
              labelTextTwoBadge: 'service',
              innerLabelBadgeList: setUpAssociateModule?.associateService || 'No Information'
            },
            {
              labelTextTwoBadge: 'rating',
              innerLabelBadgeList: setUpAssociateModule?.associateRating || 'No Information'
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
                  innerLabelBadgeList:
                    setUpAssociateModule?.iguruPlatformThemeChoice || 'No Information'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModule?.associateCurrency?.associateCurrencySymbol + ' ' + setUpAssociateModule?.iguruPlatformThemeFee || '0.00'
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
              innerLabelBadgeList: setUpAssociateModule?.associateTimeFormat || 'No Information'
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true,
      isResetIcon: true,
      IconReset: FlipCameraAndroidIcon
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
                  innerLabelBadgeList: analyticSetUpModule?.iguruAnalyticDistinctCreateFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+analyticSetUpModule?.iguruAnalyticDistinctCreateFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticDistinctSellFee && (setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+analyticSetUpModule?.iGuruAnalyticDistinctSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticDistinctSellPermission
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
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticDistinctShareFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+analyticSetUpModule?.iGuruAnalyticDistinctShareFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticGroupSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticGroupSellFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+analyticSetUpModule?.iGuruAnalyticGroupSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticGroupSellPermission
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
                  innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticGroupShareFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+analyticSetUpModule?.iGuruAnalyticGroupShareFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
              innerLabelBadgeList: analyticSetUpModule?.iGuruAnalyticTypeSharePermission
                ? 'Yes'
                : 'No'
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
      //IconOne: SyncIcon,
      isResetIcon: true,
      IconReset: FlipCameraAndroidIcon
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
      //IconOne: SyncIcon,
      isResetIcon: true,
      IconReset: FlipCameraAndroidIcon
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
      //IconOne: SyncIcon,
      isResetIcon: true,
      IconReset: FlipCameraAndroidIcon
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
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctCreateFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+itemSetUpModule?.itemDistinctCreateFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctSellApproval ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctSellFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+itemSetUpModule?.itemDistinctSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctSellPermission ? 'Yes' : 'No'
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
                  innerLabelBadgeList: itemSetUpModule?.itemDistinctShareFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+itemSetUpModule?.itemDistinctShareFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
                  innerLabelBadgeList: itemSetUpModule?.itemGroupSellApproval ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModule?.itemGroupSellFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+itemSetUpModule?.itemGroupSellFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModule?.itemGroupSellPermission ? 'Yes' : 'No'
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
                  innerLabelBadgeList: itemSetUpModule?.itemGroupShareFee&&(setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' '+itemSetUpModule?.itemGroupShareFee) || setUpAssociateModule?.associateCurrency?.associateCurrencySymbol+' 0.00'
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
              innerLabelBadgeList: itemSetUpModule?.itemTypeSharePermission ? 'Yes' : 'No'
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
      //IconOne: SyncIcon,
      isResetIcon: true,
      IconReset: FlipCameraAndroidIcon
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
                  innerLabelBadgeList:
                    assesseeSetUpModuleGeneric?.assesseeDistinctCreateFee || '0.00'
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
                    assesseeSetUpModuleGeneric?.assesseeDistinctNameFormat ===
                    'NAME_DESCRIPTION_UNIQUE'
                      ? 'Last-Name First-Name Other-Name'
                      : 'First-Name Other-Name Last-Name' || 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'sell',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctSellPermission
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
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assesseeSetUpModuleGeneric?.assesseeDistinctShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeDistinctSharePermission
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
                  innerLabelBadgeList:
                    assesseeSetUpModuleGeneric?.assesseeDistinctSignOnFee || '0.00'
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
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeGroupSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeGroupSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeGroupSellPermission
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
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeGroupShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeGroupShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeGroupSharePermission
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
              innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeRoleSharePermission
                ? 'Yes'
                : 'No'
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
              innerLabelBadgeList: assesseeSetUpModuleGeneric?.assesseeTypeSharePermission
                ? 'Yes'
                : 'No'
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
                    assessmentSetUpModuleGeneric?.assessmentDistinctCreateFee || '0.00'
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
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleGeneric?.assessmentDistinctSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentDistinctSellPermission
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
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleGeneric?.assessmentDistinctShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentDistinctSharePermission
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
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentGroupSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleGeneric?.assessmentGroupSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentGroupSellPermission
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
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentGroupShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assessmentSetUpModuleGeneric?.assessmentGroupShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentGroupSharePermission
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
              innerLabelBadgeList: assessmentSetUpModuleGeneric?.assessmentTypeSharePermission
                ? 'Yes'
                : 'No'
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
                    assignmentSetUpModuleGeneric?.assignmentDistinctCreateFee || '0.00'
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
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assignmentSetUpModuleGeneric?.assignmentDistinctSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctSellPermission
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
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assignmentSetUpModuleGeneric?.assignmentDistinctShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentDistinctSharePermission
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
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentGroupSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assignmentSetUpModuleGeneric?.assignmentGroupSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentGroupSellPermission
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
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentGroupShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    assignmentSetUpModuleGeneric?.assignmentGroupShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentGroupSharePermission
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
                    assignmentSetUpModuleGeneric?.assignmentTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: assignmentSetUpModuleGeneric?.assignmentTypeSharePermission
                ? 'Yes'
                : 'No'
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
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDistinctCreateFee || '0.00'
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
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDistinctSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctSellPermission
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
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDistinctShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctSharePermission
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
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDistinctSignOnFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateDistinctSignOnPermission
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
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateGroupCreatePermission
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
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateGroupSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateGroupSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateGroupSellPermission
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
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateGroupShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateGroupShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.associateGroupSharePermission
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
              innerLabelBadgeList: setUpAssociateModuleGeneric?.associateNodeSharePermission
                ? 'Yes'
                : 'No'
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
              innerLabelBadgeList: setUpAssociateModule?.associateRoleSharePermission ? 'Yes' : 'No'
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
              innerLabelBadgeList: setUpAssociateModule?.associateTypeSharePermission ? 'Yes' : 'No'
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
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.iguruPlatformBrandApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'choice',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.iguruPlatformBrandChoice || 'No Information'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.iguruPlatformBrandFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.iguruPlatformBrandPermission
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'picture',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.iguruPlatformBrandPicture || 'No Information'
                }
              ]
            },
            {
              labelTextTwoBadge: 'country',
              innerLabelBadgeList:
                setUpAssociateModuleGeneric?.associateCountry?.associateCountryName ||
                'No Information'
            },
            {
              labelTextTwoBadge: 'currency',
              innerLabelBadgeList:
                setUpAssociateModuleGeneric?.associateCurrencyName || 'No Information'
            },
            {
              labelTextTwoBadge: 'date',
              innerLabelBadgeList:
                setUpAssociateModuleGeneric?.associateDateFormat || 'No Information'
            },
            {
              labelTextTwoBadge: 'domain',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'primary',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDomainPrimary || 'No Information'
                },
                {
                  labelTextTwoBadge: 'secondary',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.associateDomainSecondary || 'No Information'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList:
                setUpAssociateModuleGeneric?.associateInformation || 'No Information'
            },
            {
              labelTextTwoBadge: 'language',
              innerLabelBadgeList:
                setUpAssociateModuleGeneric?.associateLanguage || 'No Information'
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
              innerLabelBadgeList: setUpAssociateModuleGeneric?.associateService || 'No Information'
            },
            {
              labelTextTwoBadge: 'rating',
              innerLabelBadgeList: setUpAssociateModuleGeneric?.associateRating || 'No Information'
            },
            {
              labelTextTwoBadge: 'theme',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.iguruPlatformThemeApproval
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'choice',
                  innerLabelBadgeList:
                    setUpAssociateModuleGeneric?.iguruPlatformThemeChoice || 'No Information'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.iguruPlatformThemeFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: setUpAssociateModuleGeneric?.iguruPlatformThemePermission
                    ? 'Yes'
                    : 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'time',
              innerLabelBadgeList:
                setUpAssociateModuleGeneric?.associateTimeFormat || 'No Information'
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
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreateFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iguruAnalyticDistinctCreatePermission
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
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    analyticSetUpModuleGeneric?.iGuruAnalyticDistinctSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticDistinctSellPermission
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
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    analyticSetUpModuleGeneric?.iGuruAnalyticDistinctShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticDistinctSharePermission
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
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticGroupSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    analyticSetUpModuleGeneric?.iGuruAnalyticGroupSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticGroupSellPermission
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
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticGroupShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList:
                    analyticSetUpModuleGeneric?.iGuruAnalyticGroupShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticGroupSharePermission
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
                    analyticSetUpModuleGeneric?.iGuruAnalyticTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: analyticSetUpModuleGeneric?.iGuruAnalyticTypeSharePermission
                ? 'Yes'
                : 'No'
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
                    ? 'Required'
                    : 'Unrequired'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreateFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctCreatePermission
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
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctSellApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctSellPermission
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
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctShareApproval
                    ? 'Yes'
                    : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctShareFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemDistinctSharePermission
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
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemGroupSellApproval ? 'Yes' : 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemGroupSellFee || '0.00'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: itemSetUpModuleGeneric?.itemGroupSellPermission
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
                    itemSetUpModuleGeneric?.itemTypeInformationBasic
                  )
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: itemSetUpModuleGeneric?.itemTypeSharePermission ? 'Yes' : 'No'
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
      let roleRequestObj = makeAssociateRoleObj(selectedAssociateInfo, 'active', 0, -1);
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT, payload: roleRequestObj });
      dispatch({
        type: GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
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
    if (!associateInfo?.informationSetup.assessee) {
      dispatch({
        type: UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO,
        payload: assesseeSetUpModule
      });
    }
    if (!associateInfo?.informationSetup.assessment) {
      dispatch({
        type: UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO,
        payload: assessmentSetUpModule
      });
    }
    if (!associateInfo?.informationSetup.assignment) {
      dispatch({
        type: UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO,
        payload: assignmentSetUpModule
      });
    }
    if (!associateInfo?.informationSetup.item) {
      dispatch({
        type: UPDATE_ASSOCIATE_SETUP_ITEM_INFO,
        payload: itemSetUpModule
      });
    }
    if (!associateInfo?.informationSetup.analytic) {
      dispatch({
        type: UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO,
        payload: analyticSetUpModule
      });
    }
    if (!associateInfo?.informationSetup.associate) {
      dispatch({
        type: UPDATE_ASSOCIATE_SETUP_INFO,
        payload: setUpAssociateModule
      });

      dispatch({
        type:UPDATE_ASSOCIATE_COUNTRY_INFO,
        payload:setUpAssociateModule?.associateCountry
      })

      dispatch({
        type:UPDATE_ASSOCIATE_CURRENCY_INFO,
        payload:setUpAssociateModule?.associateCurrency
      })
      dispatch({
        type:UPDATE_ASSOCIATE_LANGUAGE_INFO,
        payload:setUpAssociateModule?.associateLanguage
      })
    }
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

        dispatch({
          type:UPDATE_ASSOCIATE_COUNTRY_INFO,
          payload:setUpAssociateModule?.associateCountry
        })

        dispatch({
          type:UPDATE_ASSOCIATE_CURRENCY_INFO,
          payload:setUpAssociateModule?.associateCurrency
        })
        dispatch({
          type:UPDATE_ASSOCIATE_LANGUAGE_INFO,
          payload:setUpAssociateModule?.associateLanguage
        })
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
  };

  const reviewSetup = (labelName, selectedBadgeName) => {
    console.log('=====>', labelName);
    if (labelName === 'assessees') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSESSEERESETPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (labelName === 'assessments') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSESSMENTRESETPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (labelName === 'assignments') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSIGNMENTRESETPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (labelName === 'associates') {
      if (!associateInfo?.informationSetup.associate) {
        dispatch({
          type: UPDATE_ASSOCIATE_SETUP_INFO,
          payload: setUpAssociateModule
        });

        dispatch({
          type:UPDATE_ASSOCIATE_COUNTRY_INFO,
          payload:setUpAssociateModule?.associateCountry
        })

        dispatch({
          type:UPDATE_ASSOCIATE_CURRENCY_INFO,
          payload:setUpAssociateModule?.associateCurrency
        })
        dispatch({
          type:UPDATE_ASSOCIATE_LANGUAGE_INFO,
          payload:setUpAssociateModule?.associateLanguage
        })
      }
      if (labelName === 'associates' && selectedBadgeName === '') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATERESETPOPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (labelName === 'associates' && selectedBadgeName === 'country') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_COUNTRY_PICTURE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (labelName === 'associates' && selectedBadgeName === 'currency') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_CURRENCY_PICTURE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (labelName === 'associates' && selectedBadgeName === 'picture') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_BRAND_PICTURE_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
    }

    if (labelName === 'items') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ITEMRESETPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (labelName === 'iGuru analytics') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'IGURUANALYTICSRESETPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (labelName === 'iGuru marketplace') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'IGURUMARKETPLACERESETPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (labelName === 'iGuru mine') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'IGURUMINERESETPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
  };
  const reviseSetupPlus = (e, selectedBadgeArray) => {
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
          payload: setUpAssociateModuleGeneric
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
            isPopUpValue: 'LANGUAGE_SETUP_PLUS_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+' && selectedBadgeName === 'country') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_SETUPPLUS_COUNTRY_NAME_POPUP',
            popupMode: 'ASSOCIATE_CREATE'
          }
        });
      }
      if (badgeName === '+' && selectedBadgeName === 'currency') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: {
            isPopUpValue: 'ASSOCIATE_SETUPPLUS_CURRENCY_NAME_POPUP',
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
      // if (badgeName === '+brand' && selectedBadgeName === 'picture') {
      //   dispatch({
      //     type: ASSOCIATE_SIGN_ON,
      //     payload: {
      //       isPopUpValue: 'ASSOCIATE_BRAND_PICTURE_POPUP',
      //       popupMode: 'ASSOCIATE_CREATE'
      //     }
      //   });
      // }
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
              onClickReview={reviewSetup}
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
