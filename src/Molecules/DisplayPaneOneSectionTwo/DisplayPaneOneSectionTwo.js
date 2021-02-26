import React from 'react';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../Card/Card';

const DisplayPaneOneSectionTwo = () => {
  return (
    <>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="career" />
      </div>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="education" />
      </div>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="occupation" />
      </div>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="pulse" />
      </div>
    </>
  );
};

export default DisplayPaneOneSectionTwo;
