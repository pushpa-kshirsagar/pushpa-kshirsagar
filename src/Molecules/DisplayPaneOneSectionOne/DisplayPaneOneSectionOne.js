import React from 'react';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../Card/Card';

const DisplayPaneOneSectionOne = () => {
  return (
    <>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="assessees" />
      </div>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="assessments" />
      </div>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="assignments" />
      </div>
      <div className="paddingCard">
        <Card isIcon IconOne={ArrowRight} textOneOne="associates" />
      </div>
    </>
  );
};

export default DisplayPaneOneSectionOne;
