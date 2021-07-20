import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import Manuscript from '@material-ui/icons/Description';
import { makeAssesseeReviewListRequestObject } from '../../Actions/GenericActions';
import { SET_PANE_THREE_PREVIEW_MODE, SET_POPUP_VALUE } from '../../actionType';

const DisplayPaneThreeSectionTwoAssessment = () => {
  const [listExpand, setListExpand] = useState('');
  const { headerOneBadgeTwo, reviewMode, responseObject } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { informationFramework } = responseObject;
  const dispatch = useDispatch();
  const frameworkAll = [
    // {
    //   id: 'a1',
    //   labelTextOneOne: 'communiqué',
    //   isListCard: true,
    //   labelTextOneOneBadgeOne: 'primary',
    //   labelTextOneOneBadgeTwo: 'secondary',
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: 'primary',
    //       innerList:
    //         informationFramework?.assessmentCommunique?.assessmentCommuniquePrimary ||
    //         'No Information'
    //     },
    //     {
    //       labelTextOneOneBadge: 'secondary',
    //       innerList:
    //         informationFramework?.assessmentCommunique?.assessmentCommuniqueSecondary ||
    //         'No Information'
    //     }
    //   ],
    //   innerAssociateList: [],
    //   innerInfo: 'No Information',
    //   IconOne: null
    // },
    {
      id: 'a1',
      labelTextOneOne: 'communiqué',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'secondary',
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
      labelTextOneOne: 'item',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'core',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'practice',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'total',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    // {
    //   id: 'a1',
    //   labelTextOneOne: 'manuscript',
    //   isListCard: true,
    //   labelTextOneOneBadgeOne: '',
    //   labelTextOneOneBadgeTwo: '',
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: '',
    //       innerList: informationFramework?.assessmentManuscript || 'No Information'
    //     }
    //   ],
    //   innerAssociateList: [],
    //   innerInfo: 'No Information',
    //   IconOne: null
    // },
    {
      id: 'm1',
      labelTextOneOne: 'manuscript',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a4',
      labelTextOneOne: 'score',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'minimum',
          textOne: informationFramework?.assessmentScore?.assessmentScoreMinimum || ''
        },
        {
          labelTextOneOneBadge: 'maximum',
          textOne: informationFramework?.assessmentScore?.assessmentScoreMaximum || ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a5',
      labelTextOneOne: 'section',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '1',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a6',
      labelTextOneOne: 'time',
      isListCard: false,
      textOneOne: informationFramework?.assessmentTime || 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    }
  ];
  const frameworkKey = [
    {
      id: 'a2',
      labelTextOneOne: 'item',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'total',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a4',
      labelTextOneOne: 'score',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'minimum',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'total',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a5',
      labelTextOneOne: 'section',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '1',
          textOne: ''
        },
        {
          labelTextOneOneBadge: '2',
          textOne: ''
        },
        {
          labelTextOneOneBadge: '3',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a6',
      labelTextOneOne: 'time',
      isListCard: false,
      textOneOne: 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    }
  ];
  const frameworkPlusAll = [
    {
      id: 'a2',
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
      labelTextOneOneBadgeTwo: '',
      innerAssociateList: [],
      innerInfo: '',
      IconOne: null
    }
  ];

  const onClickReview = (headerOne, badgeOne) => {
    if (headerOne === 'communiqué' && badgeOne === 'primary') {
      dispatch({
        type: SET_PANE_THREE_PREVIEW_MODE,
        payload: {
          isPreviewShow: true,
          previewHeaderOne: 'assessment',
          previewHeaderOneBadgeOne: 'communiqué',
          previewHeaderOneBadgeTwo: 'primary',
          previewHeaderOneBadgeThree: '',
          previewInnerHTML:
            informationFramework?.assessmentCommunique?.assessmentCommuniquePrimary || ''
        }
      });
    }
    if (headerOne === 'communiqué' && badgeOne === 'secondary') {
      dispatch({
        type: SET_PANE_THREE_PREVIEW_MODE,
        payload: {
          isPreviewShow: true,
          previewHeaderOne: 'assessment',
          previewHeaderOneBadgeOne: 'communiqué',
          previewHeaderOneBadgeTwo: 'secondary',
          previewHeaderOneBadgeThree: '',
          previewInnerHTML:
            informationFramework?.assessmentCommunique?.assessmentCommuniqueSecondary || ''
        }
      });
    }
    if (headerOne === 'manuscript' && badgeOne === 'primary') {
      dispatch({
        type: SET_PANE_THREE_PREVIEW_MODE,
        payload: {
          isPreviewShow: true,
          previewHeaderOne: 'assessment',
          previewHeaderOneBadgeOne: 'manuscript',
          previewHeaderOneBadgeTwo: 'primary',
          previewHeaderOneBadgeThree: '',
          previewInnerHTML:
            informationFramework?.assessmentManuscript?.assessmentManuscriptPrimary || ''
        }
      });
    }
    if (headerOne === 'manuscript' && badgeOne === 'secondary') {
      dispatch({
        type: SET_PANE_THREE_PREVIEW_MODE,
        payload: {
          isPreviewShow: true,
          previewHeaderOne: 'assessment',
          previewHeaderOneBadgeOne: 'manuscript',
          previewHeaderOneBadgeTwo: 'secondary',
          previewHeaderOneBadgeThree: '',
          previewInnerHTML:
            informationFramework?.assessmentManuscript?.assessmentManuscriptSecondary || ''
        }
      });
    }
  };
  const reviseFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'communiqué' && selectedBadgeName === 'primary') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ASSESSMENT_COMMUNIQUE_PRIMARY_TEXTSHEET_POPUP',
          popupMode: 'ASSESSMENTCREATE'
        }
      });
    }
    if (labelName === 'communiqué' && selectedBadgeName === 'secondary') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ASSESSMENT_COMMUNIQUE_SECONDARY_TEXTSHEET_POPUP',
          popupMode: 'ASSESSMENTCREATE'
        }
      });
    }
    if (labelName === 'manuscript' && selectedBadgeName === 'primary') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ASSESSMENT_MANUSCRIPT_PRIMARY_TEXTSHEET_POPUP',
          popupMode: 'ASSESSMENTCREATE'
        }
      });
    }
    if (labelName === 'manuscript' && selectedBadgeName === 'secondary') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: 'ASSESSMENT_MANUSCRIPT_SECONDARY_TEXTSHEET_POPUP',
          popupMode: 'ASSESSMENTCREATE'
        }
      });
    }
    if (labelName === 'score' && selectedBadgeName === 'maximum') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'SCOREMAXIMUMPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'score' && selectedBadgeName === 'minimum') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'SCOREMINIMUMPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'time') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'TIMEASSESSMENTPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'timeline' && selectedBadgeName === 'start') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'TIMELINESTARTPOPUP', popupMode: 'ASSESSMENTCREATE' }
      });
    }
    if (labelName === 'timeline' && selectedBadgeName === 'end') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'TIMELINEENDPOPUP', popupMode: 'ASSESSMENTCREATE' }
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
              onClickReview={onClickReview}
            />
          </div>
          <div className={'containerPadding'}>
            <AllocationAccordian
              headerOne="framework+"
              isDisplayCardExpanded={listExpand === 'framework+'}
              setListExpand={setListExpand}
              list={frameworkPlusAll}
              mode={reviewMode}
              onClickRevise={reviseFramework}
            />
          </div>
        </>
      ) : (
        <>
          <div className={'containerPadding'}>
            <Paper className={'dossierContainerTop'}>
              {frameworkKey.map((ob) => {
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
                        onClickReview={onClickReview}
                      />
                    )}
                  </div>
                );
              })}
              {frameworkPlusAll.map((ob) => {
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

export default DisplayPaneThreeSectionTwoAssessment;
