import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import { ASSOCIATE_SIGN_ON, SET_STATUS_POPUP_VALUE } from '../../actionType';

const DisplayPaneThreeSectionOneAssociate = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { informationEngagement, informationSetup, informationAllocation } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const dispatch = useDispatch();

  const allianceListAll = [
    {
      id: 'a2',
      labelTextOneOne: 'administrator',
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
      labelTextOneOne: 'assessee',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'create',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'approval',
              innerList: []
            },
            {
              labelTextTwoBadge: 'fee',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'information',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'distinct',
              innerList: []
            },
            {
              labelTextTwoBadge: 'group',
              innerList: []
            },
            {
              labelTextTwoBadge: 'role',
              innerList: []
            },
            {
              labelTextTwoBadge: 'type',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'name',
              innerList: []
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: true,
      isReviewLink: false,
      isMultiList: true
    },
    {
      id: 'a2',
      labelTextOneOne: 'assessment',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'create',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'approval',
              innerList: []
            },
            {
              labelTextTwoBadge: 'fee',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'information',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'distinct',
              innerList: []
            },
            {
              labelTextTwoBadge: 'group',
              innerList: []
            },
            {
              labelTextTwoBadge: 'type',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: true,
      isReviewLink: false,
      isMultiList: true
    },
    {
      id: 'a3',
      labelTextOneOne: 'assignment',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'create',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'approval',
              innerList: []
            },
            {
              labelTextTwoBadge: 'fee',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'information',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'distinct',
              innerList: []
            },
            {
              labelTextTwoBadge: 'group',
              innerList: []
            },
            {
              labelTextTwoBadge: 'type',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: true,
      isReviewLink: false,
      isMultiList: true
    },
    {
      id: 'a4',
      labelTextOneOne: 'associate',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'create',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'approval',
              innerList: []
            },
            {
              labelTextTwoBadge: 'fee',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'information',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'distinct',
              innerList: []
            },
            {
              labelTextTwoBadge: 'group',
              innerList: []
            },
            {
              labelTextTwoBadge: 'node',
              innerList: []
            },
            {
              labelTextTwoBadge: 'role',
              innerList: []
            },
            {
              labelTextTwoBadge: 'type',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'permission',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'node',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'date',
              innerList: []
            },
            {
              labelTextTwoBadge: 'domain',
              innerList: []
            },
            {
              labelTextTwoBadge: 'language',
              innerList: []
            },
            {
              labelTextTwoBadge: 'time',
              innerList: []
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: true,
      isReviewLink: false,
      isMultiList: true
    },
    {
      id: 'a5',
      labelTextOneOne: 'iGuru analytic',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'create',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'approval',
              innerList: []
            },
            {
              labelTextTwoBadge: 'fee',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'information',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'distinct',
              innerList: []
            },
            {
              labelTextTwoBadge: 'group',
              innerList: []
            },
            {
              labelTextTwoBadge: 'type',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: true,
      isReviewLink: false,
      isMultiList: true
    },
    {
      id: 'marketPlace002',
      labelTextOneOne: 'iGuru marketplace',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'create',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'information',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'rating',
              innerList: []
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: true,
      isReviewLink: false,
      isMultiList: true
    },
    {
      id: 'mine002',
      labelTextOneOne: 'iGuru mine',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'create',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'information',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: true,
      isReviewLink: false,
      isMultiList: true
    },
    {
      id: 'a8',
      labelTextOneOne: 'iGuru platform',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'create',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'information',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'brand',
              innerList: [
                {
                  id: 'brand1',
                  textOne: 'Associate',
                  textTwo: '',
                  status: ''
                },
                {
                  id: 'brand2',
                  textOne: 'Associate & iGuru',
                  textTwo: '',
                  status: ''
                },
                {
                  id: 'brand3',
                  textOne: 'iGuru',
                  textTwo: '',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'theme',
              innerList: []
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: true,
      isReviewLink: false,
      isMultiList: true
    },
    {
      id: 'a9',
      labelTextOneOne: 'item',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'create',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'approval',
              innerList: []
            },
            {
              labelTextTwoBadge: 'fee',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: 'information',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'distinct',
              innerList: []
            },
            {
              labelTextTwoBadge: 'group',
              innerList: []
            },
            {
              labelTextTwoBadge: 'type',
              innerList: []
            }
          ]
        },
        {
          labelTextOneOneBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: '',
              innerList: []
            }
          ]
        }
      ],
      innerInfo: 'No',
      isListCard: true,
      isReviewLink: false,
      isMultiList: true
    }
    // {
    //   id: 'a1',
    //   labelTextOneOne: 'date',
    //   textOneOne: informationSetup?.associate?.associateDateFormat || 'No Information',
    //   innerAssociateList: [],
    //   innerInfo: 'assessees',
    //   isListCard: false
    // },
    // {
    //   id: 'a2',
    //   labelTextOneOne: 'dictionary',
    //   textOneOne: informationSetup?.associate?.associateDictionary || 'No Information',
    //   innerAssociateList: [],
    //   innerInfo: 'assessees',
    //   isListCard: false
    // },
    // {
    //   id: 'a3',
    //   labelTextOneOne: 'language',
    //   textOneOne: informationSetup?.associate?.associateLanguage || 'No Information',
    //   innerAssociateList: [],
    //   innerInfo: 'assessees',
    //   isListCard: false
    // },
    // {
    //   id: 'a4',
    //   labelTextOneOne: 'people',
    //   textOneOne: informationSetup?.assessee?.assesseeNameFormat || 'No Information',
    //   innerAssociateList: [],
    //   innerInfo: 'assessees',
    //   isListCard: false
    // },
    // {
    //   id: 'a5',
    //   labelTextOneOne: 'time',
    //   textOneOne: informationSetup?.associate?.associateTimeFormat || 'No Information',
    //   innerAssociateList: [],
    //   innerInfo: 'assessees',
    //   isListCard: false
    // }
  ];
  const allianceListKey = [
    {
      id: 'a1',
      labelTextOneOne: 'administrator',
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
              textTwo: '',
              status: ''
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: '',
              status: ''
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: '',
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
          payload: { isPopUpValue: 'GROUPPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'GROUPSECONDARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
    }
    if (labelName === 'manager') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'MANAGERPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'MANAGERSECONDARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
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
          payload: { isPopUpValue: 'NODESECONDARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
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
          payload: { isPopUpValue: 'ROLESECONDARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
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
          payload: { isPopUpValue: 'TAGREADONLYPRIMARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'TAGSECONDARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
    }
    if (labelName === 'tenure') {
      if (selectedBadgeName === 'start') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'TENURESATRTDATEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
      if (selectedBadgeName === 'end') {
        dispatch({
          type: ASSOCIATE_SIGN_ON,
          payload: { isPopUpValue: 'TENUREENDDATEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
        });
      }
    }
  };
  const reviseSetup = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
    if (labelName === 'date') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'DATEFORMATPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'dictionary') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'DICTIONARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'language') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'LANGUAGEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'people') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'PEOPLEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'time') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'TIMEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
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
          <div style={{ padding: '5px 2.5px 2.5px 2.5px' }}>
            <Paper className={'dossierContainerTop'}>
              {allianceListKey.map((ob) => {
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

export default DisplayPaneThreeSectionOneAssociate;
