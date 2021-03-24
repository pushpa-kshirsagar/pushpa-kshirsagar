import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import Unverified from '../../images/unverified.svg';
import EditIcon from '@material-ui/icons/Edit';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Manuscript from '@material-ui/icons/Description';
import MailOutline from '@material-ui/icons/MailOutline';
import TelephoneVerified from '@material-ui/icons/Call';
import { useSelector } from 'react-redux';

const DisplayPaneThreeSectionTwo = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { informationContact } = responseObject;
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
      textOneOne:
        informationContact.assesseeAddressEmailPrimary.assesseeAddressEmail ||
        'joachim.carvalho@insightguru.com',
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

export default DisplayPaneThreeSectionTwo;
