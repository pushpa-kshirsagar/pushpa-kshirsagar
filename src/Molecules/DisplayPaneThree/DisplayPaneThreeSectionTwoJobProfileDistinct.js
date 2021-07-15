import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { GET_JOBDOMAIN_REVIEW_LIST_SAGA, SET_NEXT_POPUP, SET_POPUP_VALUE } from '../../actionType';

const DisplayPaneThreeSectionTwoJobProfileDistinct = () => {
  const { headerOneBadgeTwo, reviewMode, isRangeSelected = false } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, jobProfilerReviewList } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  let selectedList = isRangeSelected ? 'framework' : '';
  const [listExpand, setListExpand] = useState(selectedList);
  const dispatch = useDispatch();

  const frameworkAll = [
    {
      id: 'JP-Assessment001',
      labelTextOneOne: 'assessments',
      isListCard: true,
      labelTextOneOneBadgeOne: 'distinct',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'job001',
      labelTextOneOne: 'job',
      isListCard: true,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'domain',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'function',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'role',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'job002',
      labelTextOneOne: 'job competencies',
      isListCard: true,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'core',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'range',
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
    },
    {
      id: 'job003',
      labelTextOneOne: 'preview',
      isListCard: false,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: ''
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
  const reviseFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log(labelName, selectedBadgeName);
    if (labelName !== '' && selectedBadgeName !== '') {
      if (jobProfilerReviewList === null) {
        let requestObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary
        };
        dispatch({
          type: GET_JOBDOMAIN_REVIEW_LIST_SAGA,
          payload: {
            request: requestObj,
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
      if (labelName === 'job competencies' && selectedBadgeName === 'core') {
      }

      if (labelName === 'job' && selectedBadgeName === 'domain') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: '' } });
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'POPUPDOMAINMSG', popupMode: 'JOBCREATE' }
        });
      }
      if (labelName === 'job' && selectedBadgeName === 'function') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: '' } });
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'POPUPFUNCTIONMSG', popupMode: 'JOBCREATE' }
        });
      }
      if (labelName === 'job' && selectedBadgeName === 'role') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: '' } });
        dispatch({
          type: SET_POPUP_VALUE,
          payload: { isPopUpValue: 'POPUPROLEMSG', popupMode: 'JOBCREATE' }
        });
      }
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
          <div className={'containerPadding'}>
            <AllocationAccordian
              headerOne="framework"
              isDisplayCardExpanded={listExpand === 'framework'}
              setListExpand={setListExpand}
              list={frameworkAll}
              mode={reviewMode}
              onClickRevise={reviseFramework}
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
        </>
      ) : (
        <>
          <div className={'containerPadding'}>
            <Paper className={'dossierContainerTop'}>
              {frameworkAll.map((ob) => {
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

export default DisplayPaneThreeSectionTwoJobProfileDistinct;
