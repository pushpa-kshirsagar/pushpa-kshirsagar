import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import CultureWeightageTableTemplate from '../Accordian/CultureWeightageTableTemplate';

const DisplayPaneThreeSectionTwoCultureProfileDistinct = () => {
  const [listExpand, setListExpand] = useState('');
  const { headerOneBadgeTwo, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const cultureProfilerItems = [
    {
      competencyId: '5734116b04a3242643c2e636',
      isNegative: true,
      weightage: 2,
      order: 0,
      options: [
        {
          name: 'Pragmatic',
          description:
            'We expect people to be primarily motivated by the material rewards associated with their job. The culture is one of reward for work done.  Employees are unlikely to find their jobs inherently rewarding or meaningful',
          isNegative: true
        },
        {
          name: 'Intrinsic Meaning',
          description:
            'People in our organization are generally concerned with fulfilling some deeper need. We offer people roles which are meaningful and valuable. People might see working for us as a vocation rather than just a job',
          isNegative: false
        }
      ]
    },
    {
      competencyId: '5734116b04a3242643c2e637',
      isNegative: false,
      weightage: 2,
      order: 1,
      options: [
        {
          name: 'Challenge',
          description:
            'We operate in an environment of challenge, difficult decisions and high stakes. People need to be resilient and able to handle whatever the job throws at them. It tends to be ‘survival of the fittest’ in this organization',
          isNegative: true
        },
        {
          name: 'Ease',
          description:
            'We offer our employees an environment which is stress-free, secure and comfortable. We try to provide an optimal environment where people can perform at their best',
          isNegative: false
        }
      ]
    },
    {
      competencyId: '5734116b04a3242643c2e638',
      isNegative: true,
      weightage: 1,
      order: 2,
      options: [
        {
          name: 'Guidance',
          description:
            'This is a highly process driven organization where people know exactly what they are expected to do and are monitored closely. Most roles would have a high level of guidance, supervision, and even ‘micro-management’',
          isNegative: true
        },
        {
          name: 'Autonomy',
          description:
            'This organization offers and expects a high level of autonomy and independence. We are less concerned with how people do things as long as results are achieved. Management style tends to be ‘hands-off’',
          isNegative: false
        }
      ]
    },
    {
      competencyId: '5734116b04a3242643c2e63b',
      isNegative: true,
      weightage: 3,
      order: 5,
      options: [
        {
          name: 'Unconventional',
          description:
            'Our organization culture is one which encourages an informal, casual environment where people (particularly younger employees) can ‘be themselves’',
          isNegative: true
        },
        {
          name: 'Conventional',
          description:
            'Our organization espouses a more traditional,formal culture. There is a certain correct way of doing things, and we expect people to be deferential to their seniors etc.',
          isNegative: false
        }
      ]
    },
    {
      competencyId: '5734116c04a3242643c2e63f',
      isNegative: true,
      weightage: 2,
      order: 9,
      options: [
        {
          name: 'Manual',
          description:
            'Our work environment is basically low-tech and hands-on, and most roles are quite traditional in nature. Technology is minimal',
          isNegative: true
        },
        {
          name: 'Technology',
          description:
            'Our work environment is technology focused and current. We pride ourselves on being a technology leader',
          isNegative: false
        }
      ]
    }
  ];
  const frameworkAll = [
    {
      id: 'a1',
      labelTextOneOne: 'culture dimension',
      isListCard: true,
      labelTextOneOneBadgeOne: 'core',
      labelTextOneOneBadgeTwo: 'weightage',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'core',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'weightage',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    }
  ];
  const frameworkPlus = [
    {
      id: 'fr_pl-001',
      labelTextOneOne: 'timeline',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'start',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne: 'No Information'
        }
      ],
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
          <div className={'containerPadding'}>
            <AllocationAccordian
              headerOne="framework+"
              isDisplayCardExpanded={listExpand === 'framework+'}
              setListExpand={setListExpand}
              list={frameworkPlus}
              mode={reviewMode}
            />
          </div>
          {/* <div className={'containerPadding'}>
            <CultureWeightageTableTemplate
              headerrowcount={3}
              title="weightage"
              selectrepeaterrow2col={3}
              row1={['low', 'medium', 'high']}
              culturedimensionselected={cultureProfilerItems}
              culturetooltipstate=""
              cultureprofilemode="review"
            />
          </div> */}
        </>
      ) : (
        <>
          <div className={'containerPadding'}>
            <Paper className={'dossierContainerTop'}>
              {frameworkAll.map((ob) => {
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
          <div className={'containerPadding'}>
            <Paper className={'dossierContainerTop'}>
              {frameworkPlus.map((ob) => {
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

export default DisplayPaneThreeSectionTwoCultureProfileDistinct;
