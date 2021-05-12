import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import {
  FILTERMODE,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import AccordianMultiListCard from '../Accordian/AccordianMultiListCard';
import { makeInternalNodeObj } from '../../Actions/GenericActions';
import { getAssesseeNodeAssesseeDistinctApiCall } from '../../Actions/AssesseeModuleAction';

const DisplayPaneThreeSectionTwoAssociateNode = () => {
  // const [listExpand, setListExpand] = useState('');
  const {
    reviewMode,
    relatedReviewListPaneThree = [],
    selectedModule,
    responseObject
  } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { countPage, selectedAssociateInfo, selectedTagValue } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const dispatch = useDispatch();
  const { informationFramework } = responseObject;
  let ascendantAll = [];
  let ascendantPrimary = [];
  let ascendantSecondary = [];
  if (informationFramework && informationFramework.associateNodeAscendant) {
    if (
      informationFramework.associateNodeAscendant.associateNodeAscendantAll &&
      informationFramework.associateNodeAscendant.associateNodeAscendantAll.length > 0
    ) {
      informationFramework.associateNodeAscendant.associateNodeAscendantAll.forEach((ob) => {
        ascendantAll.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateNodeName || '',
          textTwo: ob?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      });
    }
    if (
      informationFramework.associateNodeAscendant.associateNodeAscendantPrimary &&
      typeof informationFramework.associateNodeAscendant.associateNodeAscendantPrimary !==
        'string' &&
      informationFramework.associateNodeAscendant.associateNodeAscendantPrimary.length > 0
    ) {
      informationFramework.associateNodeAscendant.associateNodeAscendantPrimary.forEach((ob) => {
        ascendantPrimary.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateNodeName || '',
          textTwo: ob?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      });
    }
    if (
      informationFramework.associateNodeAscendant.associateNodeAscendantSecondary &&
      informationFramework.associateNodeAscendant.associateNodeAscendantSecondary.length > 0
    ) {
      informationFramework.associateNodeAscendant.associateNodeAscendantSecondary.forEach((ob) => {
        ascendantSecondary.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateNodeName || '',
          textTwo: ob?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      });
    }
  }
  let descendantAll = [];
  let descendantPrimary = [];
  let descendantSecondary = [];
  if (informationFramework && informationFramework.associateNodeDescendant) {
    if (
      informationFramework.associateNodeDescendant.associateNodeDescendantAll &&
      informationFramework.associateNodeDescendant.associateNodeDescendantAll.length > 0
    ) {
      informationFramework.associateNodeDescendant.associateNodeDescendantAll.forEach((ob) => {
        descendantAll.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateNodeName || '',
          textTwo: ob?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      });
    }
    if (
      informationFramework.associateNodeDescendant.associateNodeDescendantPrimary &&
      typeof informationFramework.associateNodeDescendant.associateNodeDescendantPrimary !==
        'string' &&
      informationFramework.associateNodeDescendant.associateNodeDescendantPrimary.length > 0
    ) {
      informationFramework.associateNodeDescendant.associateNodeDescendantPrimary.forEach((ob) => {
        descendantPrimary.push({
          id: ob.id,
          textOne: ob?.informationBasic?.associateNodeName || '',
          textTwo: ob?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      });
    }
    if (
      informationFramework.associateNodeDescendant.associateNodeDescendantSecondary &&
      informationFramework.associateNodeDescendant.associateNodeDescendantSecondary.length > 0
    ) {
      informationFramework.associateNodeDescendant.associateNodeDescendantSecondary.forEach(
        (ob) => {
          descendantSecondary.push({
            id: ob.id,
            textOne: ob?.informationBasic?.associateNodeName || '',
            textTwo: ob?.informationBasic?.associateNodeDescription || '',
            status: ''
          });
        }
      );
    }
  }

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
              innerList: ascendantAll
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: ascendantPrimary
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: ascendantSecondary
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: descendantAll
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: descendantPrimary
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: descendantSecondary
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
              innerList: ascendantAll
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: ascendantPrimary
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: ascendantSecondary
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: descendantAll
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: descendantPrimary
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: descendantSecondary
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
              innerList: ascendantAll
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: ascendantPrimary
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: ascendantSecondary
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: descendantAll
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: descendantPrimary
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: descendantSecondary
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
              innerList: ascendantAll
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: ascendantPrimary
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: ascendantSecondary
            }
          ]
        },
        {
          labelTextOneOneBadge: 'descendant',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'all',
              innerList: descendantAll
            },
            {
              labelTextTwoBadge: 'primary',
              innerList: descendantPrimary
            },
            {
              labelTextTwoBadge: 'secondary',
              innerList: descendantSecondary
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
  const reviewNode = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
    console.log(labelName, '+++++', selectedBadgeName, '+++++', innerSelectedBadgeName);
    if (labelName === 'assessee') {
      getAssesseeNodeAssesseeDistinctApiCall(
        selectedAssociateInfo,
        'active',
        countPage,
        dispatch,
        'distinct',
        selectedTagValue,
        '',
        false,
        'assessees'
      );
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeNodeAssesseeRevise' }
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
                          onClickReview={reviewNode}
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
