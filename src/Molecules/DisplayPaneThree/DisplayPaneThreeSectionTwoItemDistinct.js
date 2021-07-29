import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { SET_PANE_THREE_ITEM_PREVIEW_MODE } from '../../actionType';

const DisplayPaneThreeSectionTwoItem = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  // const { countPage, selectedAssociateInfo, selectedTagValue } = useSelector(
  //   (state) => state.DisplayPaneTwoReducer
  // );
  const dispatch = useDispatch();
  // const { informationContact, informationCredential, informationFramework } = responseObject;

  const frameworkList = [
    // {
    //   id: 'a1-blank',
    //   labelTextOneOne: 'blank',
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: '',
    //       textOne: ''
    //     }
    //   ],
    //   innerAssociateList: [],
    //   innerInfo: 'No Information',
    //   isListCard: false,
    //   IconOne: null,
    //   IconTwo: null
    // },
    {
      id: 'a1-difficulty',
      labelTextOneOne: 'difficulty',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    {
      id: 'a1-group',
      labelTextOneOne: 'group',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    {
      id: 'a1-media',
      labelTextOneOne: 'media',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    {
      id: 'a1-polarity',
      labelTextOneOne: 'polarity',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    // {
    //   id: 'a1-response',
    //   labelTextOneOne: 'response',
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: 'attachment',
    //       textOne: ''
    //     },
    //     {
    //       labelTextOneOneBadge: 'correct',
    //       textOne: ''
    //     }
    //   ],
    //   innerAssociateList: [],
    //   innerInfo: 'No Information',
    //   isListCard: false,
    //   IconOne: null,
    //   IconTwo: null
    // },
    {
      id: 'a1-score',
      labelTextOneOne: 'score',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    // {
    //   id: 'a1-sequence',
    //   labelTextOneOne: 'sequence',
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: '',
    //       textOne: ''
    //     }
    //   ],
    //   innerAssociateList: [],
    //   innerInfo: 'No Information',
    //   isListCard: false,
    //   IconOne: null,
    //   IconTwo: null
    // },
    {
      id: 'a1-time',
      labelTextOneOne: 'time',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    // {
    //   id: 'item-type',
    //   labelTextOneOne: 'type',
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: '',
    //       textOne: ''
    //     }
    //   ],
    //   innerAssociateList: [],
    //   innerInfo: 'No Information',
    //   isListCard: false,
    //   IconOne: null,
    //   IconTwo: null
    // },
    {
      id: 'item-word',
      labelTextOneOne: 'weightage',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    }
  ];

  const reviseFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'media') {
      dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: true });
    }
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 355px)',
        overflow: 'overlay'
      }}
    >
      {headerOneBadgeTwo === 'all' ? (
        <>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="framework"
              isDisplayCardExpanded={listExpand === 'framework'}
              setListExpand={setListExpand}
              list={frameworkList}
              mode={reviewMode}
              onClickRevise={reviseFramework}
            />
          </div>
        </>
      ) : (
        <>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {frameworkList.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <DisplayPanelAccordianReviewListOne
                        onClickRevise={reviseFramework}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <DisplayPanelAccordianInformation
                        onClickRevise={reviseFramework}
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
      )}
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionTwoItem;
