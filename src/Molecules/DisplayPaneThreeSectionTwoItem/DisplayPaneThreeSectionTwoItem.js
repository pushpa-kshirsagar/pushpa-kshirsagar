import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';

const DisplayPaneThreeSectionTwoItem = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  // const { countPage, selectedAssociateInfo, selectedTagValue } = useSelector(
  //   (state) => state.DisplayPaneTwoReducer
  // );
  // const dispatch = useDispatch();
  // const { informationContact, informationCredential, informationFramework } = responseObject;

  const frameworkList = [
    {
      id: 'a1',
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
      id: 'a1',
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
    }
  ];

  const reviseFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    const innerSelectedBadgeName = e.currentTarget.getAttribute('id');
    console.log(labelName, '+++++', selectedBadgeName, '+++++', innerSelectedBadgeName);
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
                      <AccordianListCard
                        onClickRevise={reviseFramework}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <AccordianInfoCard
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