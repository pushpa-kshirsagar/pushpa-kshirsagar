import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import {
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import AccordianMultiListCard from '../Accordian/AccordianMultiListCard';
import { makeInternalNodeObj } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionTwoAssociateNode = () => {
  // const [listExpand, setListExpand] = useState('');
  const { reviewMode, relatedReviewListPaneThree = [], selectedModule } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
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
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'all',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'ascendant2',
                  textTwo: 'all',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'primary',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'secondary',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'ascendant2',
                  textTwo: 'secondary',
                  status: ''
                }
              ]
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'all',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'descendant2',
                  textTwo: 'all',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'primary',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'secondary',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'descendant2',
                  textTwo: 'secondary',
                  status: ''
                }
              ]
            }
          ]
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true,
      isMultiList: true
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
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'all',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'ascendant2',
                  textTwo: 'all',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'primary',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'secondary',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'ascendant2',
                  textTwo: 'secondary',
                  status: ''
                }
              ]
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'all',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'descendant2',
                  textTwo: 'all',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'primary',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'secondary',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'descendant2',
                  textTwo: 'secondary',
                  status: ''
                }
              ]
            }
          ]
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true,
      isMultiList: true
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
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'all',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'ascendant2',
                  textTwo: 'all',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'primary',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'secondary',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'ascendant2',
                  textTwo: 'secondary',
                  status: ''
                }
              ]
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'all',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'descendant2',
                  textTwo: 'all',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'primary',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'secondary',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'descendant2',
                  textTwo: 'secondary',
                  status: ''
                }
              ]
            }
          ]
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true,
      isMultiList: true
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
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'ascendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'all',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'ascendant2',
                  textTwo: 'all',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'primary',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'ascendant1',
                  textTwo: 'secondary',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'ascendant2',
                  textTwo: 'secondary',
                  status: ''
                }
              ]
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'all',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'descendant2',
                  textTwo: 'all',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'primary',
                  status: ''
                }
              ]
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: [
                {
                  id: 'associate1',
                  textOne: 'descendant1',
                  textTwo: 'secondary',
                  status: ''
                },
                {
                  id: 'associate1',
                  textOne: 'descendant2',
                  textTwo: 'secondary',
                  status: ''
                }
              ]
            }
          ]
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true,
      isMultiList: true
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

  const reviseNode = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
    console.log(labelName, '+++++', selectedBadgeName, '+++++', innerSelectedBadgeName);
    if (
      labelName === 'node' &&
      selectedBadgeName === 'ascendant' &&
      innerSelectedBadgeName === 'primary'
    ) {
      let requestObj = makeInternalNodeObj(selectedAssociateInfo, 'active', 0, countPage);
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
      dispatch({
        type: INTERNAL_NODE_LIST_SAGA,
        payload: { request: requestObj, nodeViewState: 'list', isMiddlePaneList: false }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PARENTLISTPOPUP', popupMode: 'NODECREATE' }
      });
    }
  };

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
                    <>
                      {ob.isMultiList ? (
                        <AccordianMultiListCard
                          onClickRevise={reviseNode}
                          accordianObject={ob}
                          mode={reviewMode}
                        />
                      ) : (
                        <AccordianListCard className="" accordianObject={ob} mode={reviewMode} />
                      )}
                    </>
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
