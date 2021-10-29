import React from 'react';
import { isMobile } from 'react-device-detect';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  FILTERMODE,
  GET_ALLOCATE_ITEM,
  GET_ALLOCATE_ITEM_GROUP,
  LOADER_START,
  SET_ASSESSMENT_SINGLE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PANE_THREE_ASSESSMENT_PREVIEW_MODE,
  SET_PANE_THREE_ASSESSMENT_SECTION_PREVIEW_MODE,
  SET_PANE_THREE_PREVIEW_MODE,
  SET_POPUP_VALUE
} from '../../actionType';
import { convertSecondsToHMmSs, makeItemGroupObj, makeItemObj } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOneAssessmentVersion = () => {
  const dispatch = useDispatch();
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);

  const { assessmentResponseObject } = useSelector((state) => state.DisplayPaneTwoReducer);

  let sectionArr = [];
  assessmentResponseObject?.informationFramework?.assessmentSection.map((comm, index) => {
    sectionArr.push({ labelTextOneOneBadge: index + 1, textOne: '' });
  });
  const frameworkAll = [
    {
      id: 'a4',
      labelTextOneOne: 'items',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'group',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'a4',
      labelTextOneOne: 'section',
      isListCard: false,
      labelTextOneOneBadges: sectionArr,
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    }
  ];
  const reviseFramework = (e, selectedBadgeArray) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    let badgeName = '';
    if (selectedBadgeArray) {
      if (selectedBadgeArray.length > 0) {
        selectedBadgeArray.forEach((element) => {
          badgeName = badgeName + element.labelTextTwoBadge;
        });
      }
    }
  };

  const onClickReview = (e, badge) => {
    // console.log(e);
    // console.log(badge);
    if (typeof e === 'object') {
      const headerOne = e.currentTarget.getAttribute('data-value');
      const badgeOne = e.currentTarget.getAttribute('data-key');
      if (headerOne === 'preview') {
        dispatch({ type: SET_PANE_THREE_ASSESSMENT_SECTION_PREVIEW_MODE, payload: true });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
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
      <>
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            {frameworkAll.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      accordianObject={ob}
                      mode={reviewMode}
                      onClickReview={onClickReview}
                      onClickRevise={reviseFramework}
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

export default DisplayPaneThreeSectionOneAssessmentVersion;
