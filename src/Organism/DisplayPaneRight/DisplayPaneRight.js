import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import ArrowRight from '@material-ui/icons/ChevronRight';
import TelephoneVerified from '@material-ui/icons/Call';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Manuscript from '@material-ui/icons/Description';
import MailOutline from '@material-ui/icons/MailOutline';
import Unverified from '../../images/unverified.svg';
import EditIcon from '@material-ui/icons/Edit';
import Fingerprint from '@material-ui/icons/Fingerprint';
// import TelephoneVerified from '../../images/telephone_verified.svg';
import BasicCard from '../../Molecules/BasicCard/BasicCard';
import Card from '../../Molecules/Card/Card';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import Sections from '../../Molecules/Sections/Section';
import './DisplayPaneRight';
import AllocationAccordian from '../../Molecules/Accordian/AllocationAccordian';
import { FilterList } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FILTERMODE } from '../../actionType';
import FooterIcon from '../../Molecules/FooterIcon/FooterIcon';

const DisplayPaneRightSection1 = () => {
  const [listExpand, setListExpand] = useState('');
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
    // {
    //   id: 'a1',
    //   labelTextOneOne: 'log',
    //   labelTextOneOneBadgeOne: 'all',
    //   labelTextOneOneBadgeTwo: 'key',
    //   labelTextOneOneBadgeThree: '',
    //   labelTextOneOneBadgeFour: '',
    //   innerAssociateList: [],
    //   innerInfo: 'assessees',
    //   isListCard: false,
    //   IconOne: Manuscript
    // },
    {
      id: 'a2',
      textOneOne: 'Active',
      labelTextOneOne: 'status',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    },
    {
      id: 'a3',
      labelTextOneOne: 'tag',
      textOneOne: '597b474de4b0f9a8be3f32dd',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    },
    {
      id: 'a4',
      labelTextOneOne: 'tenure',
      textOneOne: 'No Information',
      labelTextOneOneBadgeOne: 'start',
      labelTextOneOneBadgeTwo: 'end',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  const list4 = [
    {
      id: 'a1',
      labelTextOneOne: 'sign-in',
      textOneOne: 'joachim.carvalho@insightguru.com',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
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
      <div style={{ padding: '5px 5px 2.5px 5px' }}>
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

const DisplayPaneRightSection2 = () => {
  const [listExpand, setListExpand] = useState('');
  const list1 = [
    {
      id: 'a1',
      labelTextOneOne: 'document',
      textOneOne: '',
      labelTextOneOneBadgeOne: 'form',
      labelTextOneOneBadgeTwo: 'report',
      labelTextOneOneBadgeThree: 'resume',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    }
  ];
  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'email address',
      textOneOne: 'joachim.carvalho@insightguru.com',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: MailOutline,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a2',
      labelTextOneOne: 'home address',
      multiline: true,
      textOneOne:
        '602 Silver Beliza, 48 St. Francis Avenue, SantaCruz West,  Mumbai, Maharashtra 400054, India602 Silver Beliza, 48 St. Francis Avenue, SantaCruz West,  Mumbai, Maharashtra 400054, India',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: MailOutline,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a3',
      labelTextOneOne: 'home address',
      textOneOne: 'No Information',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: TelephoneVerified,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a4',
      labelTextOneOne: 'mobile telephone',
      textOneOne: 'No Information',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: TelephoneVerified,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    }
  ];
  const list3 = [
    {
      id: 'a1',
      labelTextOneOne: 'fingerprint',
      textOneOne: '',
      labelTextOneOneBadgeOne: 'left hand',
      labelTextOneOneBadgeTwo: 'right hand',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Fingerprint
    },
    {
      id: 'a2',
      labelTextOneOne: 'signature',
      textOneOne: '',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: EditIcon,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a4',
      labelTextOneOne: 'tag',
      textOneOne: 'No Information',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    }
  ];
  const list4 = [
    {
      id: 'a1',
      labelTextOneOne: 'birthdate',
      textOneOne: '03/07/1966',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    },
    {
      id: 'a2',
      labelTextOneOne: 'birthmark',
      textOneOne: 'No Information',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a3',
      labelTextOneOne: 'birthplace',
      textOneOne: 'Mumbai, Maharashtra, India',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a4',
      labelTextOneOne: 'community',
      textOneOne: 'No Information',
      labelTextOneOneBadgeOne: 'social',
      labelTextOneOneBadgeTwo: 'spiritual',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
    },
    {
      id: 'a4',
      labelTextOneOne: 'gender',
      textOneOne: 'Male',
      labelTextOneOneBadgeOne: 'social',
      labelTextOneOneBadgeTwo: 'spiritual',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
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
      <div style={{ padding: '5px 5px 2.5px 5px' }}>
        <AllocationAccordian
          headerOne="career"
          isDisplayCardExpanded={listExpand === 'career'}
          setListExpand={setListExpand}
          list={list1}
        />
      </div>
      <div className="containerPadding">
        <AllocationAccordian
          headerOne="contact"
          isDisplayCardExpanded={listExpand === 'contact'}
          setListExpand={setListExpand}
          list={list2}
        />
      </div>
      <div className="containerPadding">
        <AllocationAccordian
          headerOne="credential"
          isDisplayCardExpanded={listExpand === 'credential'}
          setListExpand={setListExpand}
          list={list3}
        />
      </div>
      <div className="containerPadding">
        <AllocationAccordian
          headerOne="personal"
          isDisplayCardExpanded={listExpand === 'personal'}
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

export const DisplayPaneRight = () => {
  const rightPaneSections = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneRightSection1,
      displayPaneLeftHeaderText: 'dashboard',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneRightSection2,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'analytics'
    }
  ];
  const [selectedSection, setSelectedSection] = useState(rightPaneSections[0]);
  const dispatch = useDispatch();
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.PopUpReducer);
  const onClickFooter = (e) => {
    dispatch({ type: FILTERMODE });
    // if(e.currentTarget.getAttribute('data-value') === 'sift'){
    //   dispatch({ type: FILTERMODE});
    // }
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'sift', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList },
    { label: 'unverified', onClick: onClickFooter, Icon: FilterList },
    { label: 'unverified', onClick: onClickFooter, Icon: FilterList }
  ];

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="right"
          headerOne="associate"
          headerOneBadgeOne="information"
          headerOneBadgeTwo="all"
          headerOneBadgeThree=""
          headerPanelColour="green"
        />
      </div>
      <div style={{ padding: '0 2.5px' }}>
        <BasicCard
          isAlertActive
          isFlagActive
          className=""
          labelTextOneOne="name"
          labelTextOneTwo="alias"
          textOneOne="Sample Text"
          textOneTwo="No Information"
        />
        <Sections
          listSections={rightPaneSections}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>
      <FooterIcon
        FilterModeEnable={FilterModeEnable}
        FilterMode={FilterMode}
        onClick={onClickFooter}
        primaryIcon={primaryIcon}
        secondaryIcon={secondaryIcon}
      />
    </>
  );
};

export default DisplayPaneRight;
