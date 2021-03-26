import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useSelector } from 'react-redux';

const DisplayPaneThreeSectionOneAssociate = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { informationEngagement } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const list1 = [
    {
      id: 'a1',
      labelTextOneOne: 'family',
      labelTextOneOneBadgeOne: 'ascendant',
      labelTextOneOneBadgeTwo: 'descendant',
      labelTextOneOneBadgeThree: 'sibling',
      labelTextOneOneBadgeFour: 'spouse',
      isListCard: true,
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
      innerInfo: 'assessees'
    },
    {
      id: 'a2',
      labelTextOneOne: 'guardian',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
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
  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'group',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [
        {
          id: 'associate1',
          textOne: 'Simple Sample 01',
          textTwo: 'Manager',
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
      innerInfo: 'assessees',
      isListCard: true
    },
    {
      id: 'a2',
      labelTextOneOne: 'manager',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
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
      labelTextOneOne: 'type',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [
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
      ],
      innerInfo: 'Assessee',
      isListCard: true
    }
  ];
  const list3 = [
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
          textOne: informationEngagement.associateTenureDate || 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne: informationEngagement.associateTenureDate || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  const list4 = [
    {
      id: 'a1',
      labelTextOneOne: 'date',
      textOneOne: 'dd/mm/yyyy',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a2',
      labelTextOneOne: 'dictionary',
      textOneOne: 'No Information',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a3',
      labelTextOneOne: 'language',
      textOneOne: 'No Information',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a4',
      labelTextOneOne: 'people',
      textOneOne: 'No Information',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a5',
      labelTextOneOne: 'time',
      textOneOne: 'No Information',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    }
  ];

  return (
    <div
      style={{
        height: 'calc(100vh - 336px)',
        overflow: 'overlay'
      }}
    >
      <div style={{ padding: '5px 2.5px 2.5px 2.5px' }}>
        <AllocationAccordian
          headerOne="alliance"
          isDisplayCardExpanded={listExpand === 'alliance'}
          setListExpand={setListExpand}
          list={list1}
        />
      </div>
      <div className="containerPadding">
        <AllocationAccordian
          headerOne="allocation"
          isDisplayCardExpanded={listExpand === 'allocation'}
          setListExpand={setListExpand}
          list={list2}
        />
      </div>
      <div className="containerPadding">
        <AllocationAccordian
          headerOne="engagement"
          isDisplayCardExpanded={listExpand === 'engagement'}
          setListExpand={setListExpand}
          list={list3}
        />
      </div>
      <div className="containerPadding">
        <AllocationAccordian
          headerOne="setup"
          isDisplayCardExpanded={listExpand === 'setup'}
          setListExpand={setListExpand}
          list={list4}
        />
      </div>
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionOneAssociate;
