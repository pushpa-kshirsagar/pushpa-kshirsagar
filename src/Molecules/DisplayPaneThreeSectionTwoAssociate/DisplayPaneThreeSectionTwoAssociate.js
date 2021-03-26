import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Unverified from '../../images/unverified.svg';
import { useSelector } from 'react-redux';

const DisplayPaneThreeSectionTwoAssociate = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { informationContact, informationCredential } = responseObject;

  //   associateAddress: "sampleaddress"
  // associateAddressCity: "33"
  // associateAddressCommunication: false
  // associateAddressCountryRegion: "91"
  // associateAddressPostcode: "123456"
  // associateAddressProvinceState: "22"
  // associateAddressVerification: false

  const workAddressPrimary = `${informationContact?.associateAddressWorkPrimary?.associateAddress}, ${informationContact?.associateAddressWorkPrimary?.associateAddressCity}, ${informationContact?.associateAddressWorkPrimary?.associateAddressCountryRegion}, ${informationContact?.associateAddressWorkPrimary?.associateAddressPostcode}`;

  const list1 = [
    {
      id: 'a1',
      labelTextOneOne: 'website address',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: informationContact?.associateAddressWebsite || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationContact?.associateAddressWebsite || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    {
      id: 'a2',
      labelTextOneOne: 'work address',
      multiline: true,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: workAddressPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: 'No Information'
        }
      ],
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    {
      id: 'a3',
      labelTextOneOne: 'work telephone',
      multiline: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: 'No Information'
        }
      ],
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    }
  ];
  const list2 = [
    {
      id: 'a4',
      labelTextOneOne: 'tag',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'statutory',
          textOne: informationCredential || 'No Information'
        }
      ],
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [],
      innerInfo: 'associate',
      isListCard: false,
      IconTwo: () => {
        return <img src={Unverified} alt="Unverified" />;
      }
    }
  ];
  const list3 = [
    {
      id: 'a1',
      labelTextOneOne: 'associate',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'descendant',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'associate',
      isListCard: false,
      IconOne: null
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
          headerOne="contact"
          isDisplayCardExpanded={listExpand === 'contact'}
          setListExpand={setListExpand}
          list={list1}
        />
      </div>
      <div className="containerPadding">
        <AllocationAccordian
          headerOne="credential"
          isDisplayCardExpanded={listExpand === 'credential'}
          setListExpand={setListExpand}
          list={list2}
        />
      </div>
      <div className="containerPadding">
        <AllocationAccordian
          headerOne="framework"
          isDisplayCardExpanded={listExpand === 'framework'}
          setListExpand={setListExpand}
          list={list3}
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

export default DisplayPaneThreeSectionTwoAssociate;
