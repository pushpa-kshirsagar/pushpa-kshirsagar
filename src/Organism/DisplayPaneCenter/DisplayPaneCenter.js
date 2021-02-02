import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../../Molecules/Card/Card';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import './DisplayPaneCenter';
import List from '../../Molecules/List/List';

export const DisplayPaneCenter = () => {
  const tempAssociateList = [
    {
      id: 'associate1',
      textOne: '01 Blank Assessee',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate2',
      textOne: '01 SP. wer SP',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate3',
      textOne: '02 Blank Assessee',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate4',
      textOne: '03 Blank Assessee',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate5',
      textOne: '04 Blank Assessee',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate6',
      textOne: 'associate',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate7',
      textOne: 'associate',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate8',
      textOne: 'associate',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate9',
      textOne: 'associate',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate10',
      textOne: 'associate',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate11',
      textOne: 'associate',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate12',
      textOne: 'associate',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate13',
      textOne: 'associate',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate14',
      textOne: 'associate',
      textTwo: '',
      status: 'active'
    },
    {
      id: 'associate15',
      textOne: 'associate',
      textTwo: '',
      status: 'active'
    }
  ];

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="centre"
          headerOne="associate"
          headerOneBadgeOne=""
          headerOneBadgeTwo="distinct"
          headerOneBadgeThree="active"
          headerPanelColour="green"
          headerOneBadgeFour=""
          scanCount={tempAssociateList.length}
        />
      </div>
      <div
        style={{
          padding: '5px',
          height: 'calc(100vh - 207px)',
          overflow: 'overlay',
          marginBottom: '10px'
        }}
      >
        {tempAssociateList.map((associate) => {
          return (
            <List
              className=""
              status={associate.status}
              textOne={associate.textOne}
              textTwo={associate.textTwo}
            />
          );
        })}
      </div>
    </>
  );
};

export default DisplayPaneCenter;
