import React from 'react';
import List from '../List/List';
import AccordianHeader from './AccordianHeader';
import AccordianListCard from './AccordianListCard';
import './Accordian.css';

export const AllocationAccordian = (props) => {
  const {
    isDisplayCardExpanded,
    mode = 'revise',
    headerOne,
    labelTextOneOne,
    labelTextOneOneBadgeOne,
    isListSelect,
    labelTextOneOneBadgeTwo,
    isListSelectExpanded,
    labelTextOneOneBadgeThree,
    labelTextOneOneBadgeFour,
    IconOne,
    IconTwo,
    textOneOne
    // allData
  } = props;
  const tempAssociateList = [
    {
      id: 'associate1',
      textOne: 'Simple Sample 01',
      textTwo: 'Associate',
      status: 'active'
    },
    {
      id: 'associate2',
      textOne: 'Simple Sample 02',
      textTwo: 'Associate',
      status: 'active'
    },
    {
      id: 'associate3',
      textOne: 'Simple Sample 03',
      textTwo: 'Associate',
      status: 'active'
    },
    {
      id: 'associate4',
      textOne: 'Simple Sample 04',
      textTwo: 'Associate',
      status: 'active'
    }
  ];
  const tempList = [
    {
      id: 'a1',
      mode: 'revise',
      labelTextOneOne: 'group',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: ''
    },
    {
      id: 'a2',
      mode: 'revise',
      labelTextOneOne: 'manager',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: ''
    },
    {
      id: 'a3',
      mode: 'revise',
      labelTextOneOne: 'node',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: ''
    },
    {
      id: 'a4',
      mode: 'revise',
      labelTextOneOne: 'type',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: ''
    }
  ];

  return (
    <AccordianHeader isDisplayCardExpanded={isDisplayCardExpanded} headerOne={headerOne}>
      {tempList.map((temp) => {
        return (
          <div className="containerPadding">
            <AccordianListCard
              className=""
              id={temp.id}
              labelTextOneOne={temp.labelTextOneOne}
              labelTextOneOneBadgeOne={temp.labelTextOneOneBadgeOne}
              labelTextOneOneBadgeTwo={temp.labelTextOneOneBadgeTwo}
            />
          </div>
        );
      })}
      {/* {tempAssociateList.map((associate) => {
        return (
          <div className="containerPadding">
            <List
              className=""
              id={associate.id}
              status={associate.status}
              textOne={associate.textOne}
              textTwo={associate.textTwo}
            />
          </div>
        );
      })} */}
    </AccordianHeader>
  );
};

export default AllocationAccordian;
