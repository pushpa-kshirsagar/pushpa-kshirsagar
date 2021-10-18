import React from 'react';
import { isMobile } from 'react-device-detect';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import { SET_POPUP_VALUE } from '../../actionType';

const DisplayPaneThreeSectionOneAssessmentCluster = () => {
  const dispatch = useDispatch();
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const frameworkAll = [
    {
      id: 'cluster',
      labelTextOneOne: 'cluster',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'one',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'label',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'description',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'explanation',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'polarity',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'two',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'label',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'description',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'explanation',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'polarity',
              innerLabelBadgeList: 'No Information'
            }
          ]
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    }
  ];

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
                    <DisplayPanelAccordianInformation accordianObject={ob} mode={reviewMode} />
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

export default DisplayPaneThreeSectionOneAssessmentCluster;
