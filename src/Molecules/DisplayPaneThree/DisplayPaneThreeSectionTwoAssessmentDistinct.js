import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';

const DisplayPaneThreeSectionTwoAssessment = () => {
  const [listExpand, setListExpand] = useState('');
  const { headerOneBadgeTwo, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);

  const frameworkAll = [
    {
      id: 'a1',
      labelTextOneOne: 'communiqué',
      isListCard: true,
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a2',
      labelTextOneOne: 'item',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'core',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'practice',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'total',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a3',
      labelTextOneOne: 'manuscript',
      isListCard: false,
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a4',
      labelTextOneOne: 'score',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'minimum',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'maximum',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a5',
      labelTextOneOne: 'section',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '1',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a6',
      labelTextOneOne: 'time',
      isListCard: false,
      textOneOne: 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    }
  ];
  const frameworkKey = [
    {
      id: 'a2',
      labelTextOneOne: 'item',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'total',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a4',
      labelTextOneOne: 'score',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'minimum',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'total',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a5',
      labelTextOneOne: 'section',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '1',
          textOne: ''
        },
        {
          labelTextOneOneBadge: '2',
          textOne: ''
        },
        {
          labelTextOneOneBadge: '3',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a6',
      labelTextOneOne: 'time',
      isListCard: false,
      textOneOne: 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    }
  ];

  return (
    <div
      style={{
        height: 'calc(100vh - 355px)',
        overflow: 'overlay'
      }}
    >
      {headerOneBadgeTwo === 'all' ? (
        <>
          <div className={'containerPadding'}>
            <AllocationAccordian
              headerOne="framework"
              isDisplayCardExpanded={listExpand === 'framework'}
              setListExpand={setListExpand}
              list={frameworkAll}
              mode={reviewMode}
            />
          </div>
        </>
      ) : (
        <>
          <div className={'containerPadding'}>
            <Paper className={'dossierContainerTop'}>
              {frameworkKey.map((ob) => {
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
      )}
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionTwoAssessment;
