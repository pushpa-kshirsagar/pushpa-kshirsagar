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
  GET_ALLOCATE_ASSESSEE,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_VALUE
} from '../../actionType';
import AccordianMultiListCard from '../Accordian/AccordianMultiListCard';
import {
  makeAssesseeReviewListRequestObject,
  makeInternalNodeObj
} from '../../Actions/GenericActions';
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
    if (informationFramework.associateNodeAscendant.associateNodeAscendantPrimary) {
      let p1 = informationFramework.associateNodeAscendant.associateNodeAscendantPrimary;
      if (Array.isArray(p1)) {
        ascendantPrimary.push({
          id: p1[0].id,
          textOne: p1[0]?.informationBasic?.associateNodeName || '',
          textTwo: p1[0]?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
        ascendantPrimary.push(p1[0]);
      } else {
        ascendantPrimary.push({
          id: p1.id,
          textOne: p1?.informationBasic?.associateNodeName || '',
          textTwo: p1?.informationBasic?.associateNodeDescription || '',
          status: ''
        });
      }
      // console.log('primary ======>', ascendantPrimary);
      // informationFramework.associateNodeAscendant.associateNodeAscendantPrimary.forEach((ob) => {
      //   ascendantPrimary.push({
      //     id: ob.id,
      //     textOne: ob?.informationBasic?.associateNodeName || '',
      //     textTwo: ob?.informationBasic?.associateNodeDescription || '',
      //     status: ''
      //   });
      // });
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
  let assessee = [];
  if (relatedReviewListPaneThree && relatedReviewListPaneThree.length > 0) {
    assessee = relatedReviewListPaneThree[0].assessee;
  }

  const assesseeNodeList = [];
  assessee.forEach((ob) => {
    const { id, informationBasic } = ob;
    assesseeNodeList.push({
      id,
      textOne: `${informationBasic.assesseeNamePrefix} ${informationBasic.assesseeNameFirst} ${informationBasic.assesseeNameOther} ${informationBasic.assesseeNameLast} ${informationBasic.assesseeNameSuffix}`,
      textTwo: informationBasic.assesseeAlias || 'No Information',
      status: ''
    });
  });

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
          labelTextOneOneBadge: 'distinct',
          innerList: assesseeNodeList
        },
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
      labelTextOneOne: 'assessment',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
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
      labelTextOneOne: 'assignment',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
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
      labelTextOneOne: 'associate',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
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
      labelTextOneOne: 'iGuru analytic',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
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
      labelTextOneOne: 'item',
      labelTextOneOneBadgeOne: 'group',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
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
          labelTextOneOneBadge: 'distinct',
          innerList: assesseeNodeList
        },
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
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
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
      labelTextOneOne: 'item',
      labelTextOneOneBadgeOne: 'group',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
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
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
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
    if (labelName === 'assessee' && selectedBadgeName === 'distinct') {
      let requestObect = makeAssesseeReviewListRequestObject(
        selectedAssociateInfo,
        'active',
        0,
        countPage
      );
      let revisedRoleObject = {
        id: responseObject.id,
        associateNodeName: responseObject.informationBasic.associateNodeName,
        associateNodeDescription: responseObject.informationBasic.associateNodeDescription,
        associateNodeStatus: responseObject.informationEngagement.associateNodeStatus
      };
      let existingAssesseeId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree[0]?.assessee &&
        relatedReviewListPaneThree[0].assessee.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeNodeAssesseeRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSESSEE,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedRoleObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'assesseesNodeAssesseeReviewList'
        }
      });
    }
  };
  const reviewNode = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
    console.log(labelName, '+++++', selectedBadgeName, '+++++', innerSelectedBadgeName);
    if (labelName === 'assessee' && selectedBadgeName === 'distinct') {
      console.log('IN ASSSESSEE ');
      getAssesseeNodeAssesseeDistinctApiCall(
        selectedAssociateInfo,
        'active',
        countPage,
        dispatch,
        'distinct',
        responseObject.id,
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
        height: 'calc(100vh - 355px)',
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
                        <AccordianListCard
                          onClickReview={reviewNode}
                          onClickRevise={reviseNode}
                          className=""
                          accordianObject={ob}
                          mode={reviewMode}
                        />
                      )}
                    </>
                  ) : (
                    <AccordianInfoCard
                      onClickReview={reviewNode}
                      onClickRevise={reviseNode}
                      accordianObject={ob}
                      mode={reviewMode}
                    />
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
