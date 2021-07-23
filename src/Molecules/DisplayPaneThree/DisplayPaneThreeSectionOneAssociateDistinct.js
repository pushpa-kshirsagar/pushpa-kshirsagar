import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import { ASSOCIATE_SIGN_ON, SET_STATUS_POPUP_VALUE } from '../../actionType';

const DisplayPaneThreeSectionOneAssociate = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode, administratorSecondary } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { middlePaneHeader = '' } = useSelector((state) => state.DisplayPaneTwoReducer);
  const {
    informationEngagement,
    informationSetup,
    informationAllocation,
    informationAlliance
  } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'name',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: 'No'
            },
            {
              labelTextTwoBadge: 'sign-on',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
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
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'associate',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'node',
                  innerLabelBadgeList: 'No'
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
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'share',
              innerLabelBadgeList: 'No'
            },
            {
              labelTextTwoBadge: 'sign-on',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
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
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: 'node',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'date',
              innerLabelBadgeList: 'No'
            },
            {
              labelTextTwoBadge: 'domain',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'primary',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'secondary',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'language',
              innerLabelBadgeList: 'No'
            },
            {
              labelTextTwoBadge: 'time',
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
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
      id: 'iguru-platform-11',
      labelTextOneOne: 'iGuru platform',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: '+',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'brand',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'theme',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'approval',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
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
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'fee',
                  innerLabelBadgeList: 'No'
                },
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: 'group',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
          labelTextTwoBadge: 'type',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'create',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'permission',
                  innerLabelBadgeList: 'No'
                }
              ]
            },
            {
              labelTextTwoBadge: 'information',
              innerLabelBadgeList: [
                {
                  labelTextTwoBadge: 'basic',
                  innerLabelBadgeList: 'No'
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
    if (
      labelName === 'assessees' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'approval'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEECREATEAPPROVALPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessees' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'fee'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEECREATEFEEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessees' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEECREATEPERMISSIONPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessees' &&
      badgeName === 'distinctinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEEINFODISTINCTBASICPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessees' &&
      badgeName === 'distinctinformation' &&
      selectedBadgeName === 'name'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'PEOPLEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessees' &&
      badgeName === 'groupcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSESSEEGROUPCREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'assessees' &&
      badgeName === 'groupinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEEBASICINFOGROUPPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessees' &&
      badgeName === 'rolecreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSESSEEROLECREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'assessees' &&
      badgeName === 'roleinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEEBASICINFOROLEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessees' &&
      badgeName === 'typecreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSESSEETYPECREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'assessees' &&
      badgeName === 'typeinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEEBASICINFOTYPEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessments' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'approval'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSMENTCREATEAPPROVALPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessments' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'fee'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSMENTCREATEFEEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessments' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSMENTCREATEPERMISSIONPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessments' &&
      badgeName === 'distinctinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSMENTINFODISTINCTBASICPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessments' &&
      badgeName === 'groupcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSESSMENTGROUPCREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'assessments' &&
      badgeName === 'groupinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSMENTBASICINFOGROUPPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assessments' &&
      badgeName === 'typecreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSESSMENTTYPECREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'assessments' &&
      badgeName === 'typeinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSMENTBASICINFOTYPEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assignments' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'approval'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSIGNMENTCREATEAPPROVALPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assignments' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'fee'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSIGNMENTCREATEFEEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assignments' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSIGNMENTCREATEPERMISSIONPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assignments' &&
      badgeName === 'distinctinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSIGNMENTINFODISTINCTBASICPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assignments' &&
      badgeName === 'groupcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSIGNMENTGROUPCREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'assignments' &&
      badgeName === 'groupinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSIGNMENTBASICINFOGROUPPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'assignments' &&
      badgeName === 'typecreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSIGNMENTTYPECREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'assignments' &&
      badgeName === 'typeinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSIGNMENTBASICINFOTYPEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'items' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'approval'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ITEMCREATEAPPROVALPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'items' && badgeName === 'distinctcreate' && selectedBadgeName === 'fee') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ITEMCREATEFEEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'items' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ITEMCREATEPERMISSIONPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'items' &&
      badgeName === 'distinctinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ITEMINFODISTINCTBASICPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'items' &&
      badgeName === 'groupcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ITEMGROUPCREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'items' &&
      badgeName === 'groupinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ITEMBASICINFOGROUPPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'items' && badgeName === 'typecreate' && selectedBadgeName === 'permission') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ITEMTYPECREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (labelName === 'items' && badgeName === 'typeinformation' && selectedBadgeName === 'basic') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ITEMBASICINFOTYPEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'iGuru analytics' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'approval'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'IGURUANALYTICSCREATEAPPROVALPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'iGuru analytics' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'fee'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'IGURUANALYTICSCREATEFEEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'iGuru analytics' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'IGURUANALYTICSCREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'iGuru analytics' &&
      badgeName === 'distinctinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'IGURUANALYTICSINFODISTINCTBASICPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'iGuru analytics' &&
      badgeName === 'groupcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'IGURUANALYTICSGROUPCREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'iGuru analytics' &&
      badgeName === 'groupinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'IGURUANALYTICSBASICINFOGROUPPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'iGuru analytics' &&
      badgeName === 'typecreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'IGURUANALYTICSTYPECREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'iGuru analytics' &&
      badgeName === 'typeinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'IGURUANALYTICSBASICINFOTYPEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }

    if (
      labelName === 'associates' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'approval'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSOCIATECREATEAPPROVALPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'fee'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSOCIATECREATEFEEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'distinctcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSOCIATECREATEPERMISSIONPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'distinctinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSOCIATEINFODISTINCTBASICPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'distinctinformation' &&
      selectedBadgeName === 'name'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSOCIATEPEOPLEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'groupcreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSOCIATEGROUPCREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'groupinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSOCIATEBASICINFOGROUPPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'rolecreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSOCIATEROLECREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'roleinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSOCIATEBASICINFOROLEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'typecreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSOCIATETYPECREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'typeinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSOCIATEBASICINFOTYPEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'nodecreate' &&
      selectedBadgeName === 'permission'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'ASSOCIATENODECREATEPERMISSIONPOPUP',
          popupMode: 'ASSOCIATE_CREATE'
        }
      });
    }
    if (
      labelName === 'associates' &&
      badgeName === 'nodeinformation' &&
      selectedBadgeName === 'basic'
    ) {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'ASSOCIATEBASICINFONODEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'associates' && badgeName === '+' && selectedBadgeName === 'date') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'DATEFORMATPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'associates' && badgeName === '+' && selectedBadgeName === 'language') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'LANGUAGEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }
    if (labelName === 'associates' && badgeName === '+' && selectedBadgeName === 'time') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'TIMEPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
    }

    // if (labelName === 'dictionary') {
    //   dispatch({
    //     type: ASSOCIATE_SIGN_ON,
    //     payload: { isPopUpValue: 'DICTIONARYPOPUP', popupMode: 'ASSOCIATE_CREATE' }
    //   });
    // }
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
