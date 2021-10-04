import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianReviewListTwo from '../Accordian/DisplayPanelAccordianReviewListTwo';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import {
  ASSESSEE_SIGN_ON,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_POPUP_VALUE,
  SET_STATUS_POPUP_VALUE
} from '../../actionType';
import { makeInternalNodeObj } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOneAssociateNode = () => {
  // const [listExpand, setListExpand] = useState('');
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationEngagement, informationFramework, informationSetup } = responseObject;
  const dispatch = useDispatch();
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  console.log('informationFramework', informationFramework);

  console.log('informationSetup', informationSetup);

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
  const list2 = [
    {
      id: 'a2',
      labelTextOneOne: 'manager',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: [
            {
              id: 'associate1',
              textOne: 'Simple Sample 01',
              textTwo: 'Manager',
              status: 'active'
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'Manager',
              status: 'active'
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'Manager',
              status: 'active'
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a6',
      labelTextOneOne: 'nodes',
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
  const list3 = [
    {
      id: 'a1',
      labelTextOneOne: 'log',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'all',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'key',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a2',
      textOneOne:
        capitalizeFirstLetter(informationEngagement?.associateNodeStatus) || 'No Information',
      labelTextOneOne: 'status',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    },
    {
      id: 'a3',
      labelTextOneOne: 'tag',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne:
            informationEngagement?.associateNodeTag?.associateNodeTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationEngagement?.associateNodeTag?.associateNodeTagSecondary || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    },
    {
      id: 'a4',
      labelTextOneOne: 'tenure',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'start',
          textOne:
            informationEngagement?.associateNodeTenure?.associateNodeTenureDateTimeStart ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement?.associateNodeTenure?.associateNodeTenureDateTimeEnd ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];

  const classificationList = [
    {
      id: 'a1',
      textOneOne:
        informationSetup?.associateNodeClassification?.associateNodeClassificationPrimary ||
        'No Information',
      labelTextOneOne: 'classification',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    }
  ];
  const reviseAllocation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
    if (
      labelName === 'nodes' &&
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
  const reviseEngagement = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'status') {
      dispatch({
        type: SET_STATUS_POPUP_VALUE,
        payload: capitalizeFirstLetter(informationEngagement?.associateNodeStatus)
      });
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'STATUSPOPUP', popupMode: 'NODECREATE' }
      });
    }
    if (labelName === 'tag') {
      if (selectedBadgeName === 'primary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TAGREADONLYPRIMARYPOPUP', popupMode: 'NODECREATE' }
        });
      }
      if (selectedBadgeName === 'secondary') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TAGSECONDARYPOPUP', popupMode: 'NODECREATE' }
        });
      }
    }
    if (labelName === 'tenure') {
      if (selectedBadgeName === 'start') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TENURESATRTDATEPOPUP', popupMode: 'NODECREATE' }
        });
      }
      if (selectedBadgeName === 'end') {
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'TENUREENDDATEPOPUP', popupMode: 'NODECREATE' }
        });
      }
    }
  };

  const reviseClassification = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'classification') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'CLASSIFICATIONLISTPOPUP', popupMode: 'NODECREATE' }
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
            {list2.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <>
                      {ob.isMultiList ? (
                        <DisplayPanelAccordianReviewListTwo
                          //onClickReview={reviewNode}
                          onClickRevise={reviseAllocation}
                          accordianObject={ob}
                          mode={reviewMode}
                        />
                      ) : (
                        <DisplayPanelAccordianReviewListOne
                          className=""
                          accordianObject={ob}
                          mode={reviewMode}
                        />
                      )}
                    </>
                  ) : (
                    <DisplayPanelAccordianInformation accordianObject={ob} mode={reviewMode} />
                  )}
                </div>
              );
            })}
          </Paper>
        </div>
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            {list3.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      onClickRevise={reviseEngagement}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      onClickRevise={reviseEngagement}
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  )}
                </div>
              );
            })}
          </Paper>
        </div>
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            {classificationList.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      onClickRevise={reviseClassification}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      onClickRevise={reviseClassification}
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

export default DisplayPaneThreeSectionOneAssociateNode;
