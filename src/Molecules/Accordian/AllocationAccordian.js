import React from 'react';
import AccordianHeader from './AccordianHeader';
import AccordianListCard from './AccordianListCard';
import './Accordian.css';
import AccordianInfoCard from './AccordianInfoCard';

export const AllocationAccordian = (props) => {
  const {
    isDisplayCardExpanded,
    headerOne,
    setListExpand,
    list = [],
    mode = '',
    onClickRevise
  } = props;

  return (
    <AccordianHeader
      isDisplayCardExpanded={isDisplayCardExpanded}
      headerOne={headerOne}
      setListExpand={setListExpand}
    >
      {list.map((ob) => {
        return (
          <div key={ob.id}>
            {ob.isListCard ? (
              <AccordianListCard
                onClickRevise={onClickRevise}
                className=""
                accordianObject={ob}
                mode={mode}
              />
            ) : (
              <AccordianInfoCard onClickRevise={onClickRevise} accordianObject={ob} mode={mode} />
            )}
          </div>
        );
      })}
    </AccordianHeader>
  );
};

export default AllocationAccordian;
