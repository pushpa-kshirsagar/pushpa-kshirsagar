import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import { RELATED_REVIEWLIST_DISTINCT_DATA, SET_MIDDLEPANE_STATE } from '../../actionType';

const DisplayPaneThreeSectionTwoAssociateNode = () => {
  // const [listExpand, setListExpand] = useState('');
  const { reviewMode, relatedReviewListPaneThree = [], selectedModule } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const dispatch = useDispatch();

  const allModuleList = [
    {
      id: 'a1',
      labelTextOneOne: 'assessee',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'assessment',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'assignment',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'associate',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'item',
      labelTextOneOneBadgeOne: 'group',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'node',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];
  const assesseeModuleList = [
    {
      id: 'a1',
      labelTextOneOne: 'assessee',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'node',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];
  const assessmentModuleList = [
    {
      id: 'a1',
      labelTextOneOne: 'assessment',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'item',
      labelTextOneOneBadgeOne: 'group',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'node',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];
  const assignmentModuleList = [
    {
      id: 'a1',
      labelTextOneOne: 'assignment',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'item',
      labelTextOneOneBadgeOne: 'group',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'node',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];

  let list = allModuleList;
  if (selectedModule === 'assessees') {
    list = assesseeModuleList;
  }
  if (selectedModule === 'assessments') {
    list = assessmentModuleList;
  }
  if (selectedModule === 'assignments') {
    list = assignmentModuleList;
  }

  return (
    <div
      style={{
        height: 'calc(100vh - 336px)',
        overflow: 'overlay'
      }}
    >
      <>
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            {list.map((ob) => {
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

export default DisplayPaneThreeSectionTwoAssociateNode;
