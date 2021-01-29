import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../../Molecules/Card/Card';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import './DisplayPaneLeft';
import Sections from '../../Molecules/Sections/Section';

const temp1 = () => {
  return (
    <>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="assessees" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="assessments" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="assignments" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="associates" />
      </div>
    </>
  );
};
const temp2 = () => {
  return (
    <>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="career" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="education" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="occupation" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="pulse" />
      </div>
    </>
  );
};
const temp3 = () => {
  return (
    <>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="career" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="education" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="occupation" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="pulse" />
      </div>
    </>
  );
};
const temp4 = () => {
  return (
    <>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGem" textTwoOne="assessees" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGem" textTwoOne="assessments" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGem" textTwoOne="assignments" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGem" textTwoOne="associates" />
      </div>
    </>
  );
};

export const DisplayPaneLeft = () => {
  const numberOfSection = [
    {
      id: 'section1',
      sectionComponent: temp1
    },
    {
      id: 'section2',
      sectionComponent: temp2
    },
    {
      id: 'section3',
      sectionComponent: temp3
    },
    {
      id: 'section4',
      sectionComponent: temp4
    }
  ];

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="left"
          headerOne="dashboard"
          headerPanelColour="blue"
        />
      </div>
      <div style={{ padding: '5px' }}>
        <div style={{ margin: '0 0 5px 0' }}>
          <Card ImageOne={PersonIcon} textOneOne="assesseeName" />
        </div>
        <div>
          <Card ImageOne={AssociateIcon} textOneOne="Boppo Technologies" />
        </div>
        <Sections listSection={numberOfSection} />
      </div>
    </>
  );
};

export default DisplayPaneLeft;
