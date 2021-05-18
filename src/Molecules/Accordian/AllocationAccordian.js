import React from 'react';
import AccordianHeader from './AccordianHeader';
import AccordianListCard from './AccordianListCard';
import './Accordian.css';
import AccordianInfoCard from './AccordianInfoCard';
import AccordianMultiListCard from './AccordianMultiListCard';

export const AllocationAccordian = (props) => {
  const {
    isDisplayCardExpanded,
    headerOne,
    setListExpand,
    list = [],
    mode = '',
    onClickRevise,
    onClickReview
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
              <>
                {ob.isMultiList ? (
                  <AccordianMultiListCard
                    onClickRevise={onClickRevise}
                    accordianObject={ob}
                    mode={mode}
                  />
                ) : (
                  <AccordianListCard
                    className=""
                    onClickRevise={onClickRevise}
                    accordianObject={ob}
                    mode={mode}
                  />
                )}
              </>
            ) : (
              <AccordianInfoCard
                onClickReview={onClickReview}
                onClickRevise={onClickRevise}
                accordianObject={ob}
                mode={mode}
              />
            )}
          </div>
        );
      })}
    </AccordianHeader>
  );
};

export default AllocationAccordian;
