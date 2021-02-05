import React from 'react';
import AccordianHeader from './AccordianHeader';
import AccordianListCard from './AccordianListCard';
import './Accordian.css';
import AccordianInfoCard from './AccordianInfoCard';

export const AllocationAccordian = (props) => {
  const { isDisplayCardExpanded, headerOne, setListExpand, list = [] } = props;

  return (
    <AccordianHeader
      isDisplayCardExpanded={isDisplayCardExpanded}
      headerOne={headerOne}
      setListExpand={setListExpand}
    >
      {list.map((ob) => {
        return (
          <>
            {ob.isListCard ? (
              <AccordianListCard className="" accordianObject={ob} />
            ) : (
              <AccordianInfoCard accordianObject={ob} />
            )}
          </>
        );
      })}
    </AccordianHeader>
  );
};

export default AllocationAccordian;
