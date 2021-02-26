import React from 'react';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../Card/Card';

const DisplayPaneOneSectionThree = () => {
  return (
    <>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="career" />
      </div>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="education" />
      </div>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="occupation" />
      </div>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="pulse" />
      </div>
    </>
  );
};

export default DisplayPaneOneSectionThree;
