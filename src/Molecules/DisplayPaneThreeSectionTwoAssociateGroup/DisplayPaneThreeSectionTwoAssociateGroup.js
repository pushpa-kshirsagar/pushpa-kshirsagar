import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';

const DisplayPaneThreeSectionTwoAssociateGroup = () => {
  // const [listExpand, setListExpand] = useState('');
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  // const { informationEngagement, informationSetup } = responseObject;
  // function capitalizeFirstLetter(string) {
  //   if (!string) return '';
  //   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  // }

  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'assessee',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      innerAssociateList: [
        {
          id: 'associate1',
          textOne: 'Simple Sample 01',
          textTwo: 'assessee',
          status: ''
        },
        {
          id: 'associate2',
          textOne: 'Simple Sample 02',
          textTwo: 'assessee',
          status: ''
        },
        {
          id: 'associate3',
          textOne: 'Simple Sample 03',
          textTwo: 'assessee',
          status: ''
        }
      ],
      innerInfo: 'assessees',
      isListCard: true
    }
  ];

  return (
    <div
      style={{
        height: 'calc(100vh - 336px)',
        overflow: 'overlay'
      }}
    >
      <>
        <div style={{ padding: '5px 2.5px 2.5px 2.5px' }}>
          <Paper className={'dossierContainerTop'}>
            {list2.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <AccordianListCard className="" accordianObject={ob} mode={reviewMode} />
                  ) : (
                    <AccordianInfoCard accordianObject={ob} mode={reviewMode} />
                  )}
                </div>
              );
            })}
          </Paper>
        </div>
      </>
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionTwoAssociateGroup;
