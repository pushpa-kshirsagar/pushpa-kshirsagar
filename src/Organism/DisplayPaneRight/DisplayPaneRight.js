import React, { useState } from 'react';
import ArrowRight from '@material-ui/icons/ChevronRight';
import TelephoneVerified from '@material-ui/icons/Call';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import BasicCard from '../../Molecules/BasicCard/BasicCard';
import Card from '../../Molecules/Card/Card';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import Sections from '../../Molecules/Sections/Section';
import './DisplayPaneRight';
import AllocationAccordian from '../../Molecules/Accordian/AllocationAccordian';

const DisplayPaneRightSection1 = () => {
  const [listExpand, setListExpand] = useState('');

  return (
    <div
      style={{
        height: 'calc(100vh - 336px)',
        overflow: 'overlay'
      }}
    >
      <div
        className="containerPadding"
        onClick={() => {
          setListExpand((st) => {
            if (st === 'alliance') {
              return '';
            } else {
              return 'alliance';
            }
          });
        }}
      >
        <AllocationAccordian
          headerOne="alliance"
          isDisplayCardExpanded={listExpand === 'alliance'}
        />
      </div>
      <div
        className="containerPadding"
        onClick={() => {
          setListExpand((st) => {
            if (st === 'allocation') {
              return '';
            } else {
              return 'allocation';
            }
          });
        }}
      >
        <AllocationAccordian
          IconOne={TelephoneVerified}
          IconTwo={VerifiedUserIcon}
          className={null}
          headerOne="allocation"
          isListSelect={false}
          labelTextOneOne="group"
          labelTextOneOneBadgeFour=""
          labelTextOneOneBadgeOne="primary"
          labelTextOneOneBadgeThree=""
          labelTextOneOneBadgeTwo="secondary"
          textOneOne="sample@gmail.com"
          isDisplayCardExpanded={listExpand === 'allocation'}
        />
      </div>
      <div
        className="containerPadding"
        onClick={() => {
          setListExpand((st) => {
            if (st === 'engagement') {
              return '';
            } else {
              return 'engagement';
            }
          });
        }}
      >
        {/* <Card isIcon IconOne={ArrowRight} textOneOne="engagement" /> */}
        <AllocationAccordian
          headerOne="engagement"
          isDisplayCardExpanded={listExpand === 'engagement'}
        />
      </div>
      <div
        className="containerPadding"
        onClick={() => {
          setListExpand((st) => {
            if (st === 'setup') {
              return '';
            } else {
              return 'setup';
            }
          });
        }}
      >
        <AllocationAccordian headerOne="setup" isDisplayCardExpanded={listExpand === 'setup'} />
      </div>
    </div>
  );
};

const DisplayPaneRightSection2 = () => {
  return (
    <>
      <div className="containerPadding">
        <Card isIcon IconOne={ArrowRight} textOneOne="career" />
      </div>
      <div className="containerPadding">
        <Card isIcon IconOne={ArrowRight} textOneOne="contact" />
      </div>
      <div className="containerPadding">
        <Card isIcon IconOne={ArrowRight} textOneOne="credential" />
      </div>
      <div className="containerPadding">
        <Card isIcon IconOne={ArrowRight} textOneOne="personal" />
      </div>
    </>
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
    </>
  );
};

export default DisplayPaneRight;
