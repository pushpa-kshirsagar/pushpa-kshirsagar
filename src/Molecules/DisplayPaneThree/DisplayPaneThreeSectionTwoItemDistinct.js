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
    {
      id: 'a1-score',
      labelTextOneOne: 'score',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'maximum',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'minimum',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    {
      id: 'a1-time',
      labelTextOneOne: 'time',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: null,
      IconTwo: null
    },
    {
      id: 'item-type',
      labelTextOneOne: 'type',
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
      id: 'item-preview',
      labelTextOneOne: 'items',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: true,
      IconOne: null,
      IconTwo: null
    }
  ];

  const reviseFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'items' && selectedBadgeName === 'distinct') {
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
