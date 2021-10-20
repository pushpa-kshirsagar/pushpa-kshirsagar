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
  const onClickReview = (e) => {};
  const onClickRevise = (e, selectedBadgeArray) => {
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
    console.log(badgeName);
    console.log(labelName + '  ' + selectedBadgeName);
    if (labelName === 'cluster' && badgeName === 'one' && selectedBadgeName === 'label') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ONEONELABELPOPUP', popupMode: 'CLUSTERCREATE' }
      });
    }
    if (labelName === 'cluster' && badgeName === 'two' && selectedBadgeName === 'label') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ONETWOLABELPOPUP', popupMode: 'CLUSTERCREATE' }
      });
    }
    if (labelName === 'cluster' && badgeName === 'one' && selectedBadgeName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ONEONEDESCPOPUP', popupMode: 'CLUSTERCREATE' }
      });
    }
    if (labelName === 'cluster' && badgeName === 'two' && selectedBadgeName === 'description') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ONETWODESCPOPUP', popupMode: 'CLUSTERCREATE' }
      });
    }
    if (labelName === 'cluster' && badgeName === 'one' && selectedBadgeName === 'explanation') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ONEONEEXPLANATION', popupMode: 'CLUSTERCREATE' }
      });
    }
    if (labelName === 'cluster' && badgeName === 'two' && selectedBadgeName === 'explanation') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ONETWOEXPLANATION', popupMode: 'CLUSTERCREATE' }
      });
    }
    if (labelName === 'cluster' && badgeName === 'one' && selectedBadgeName === 'polarity') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ONEONEPOLARITY', popupMode: 'CLUSTERCREATE' }
      });
    }
    if (labelName === 'cluster' && badgeName === 'two' && selectedBadgeName === 'polarity') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ONETWOPOLARITY', popupMode: 'CLUSTERCREATE' }
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
            {frameworkAll.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                      onClickRevise={onClickRevise}
                      onClickReview={onClickReview}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      accordianObject={ob}
                      mode={reviewMode}
                      onClickRevise={onClickRevise}
                      onClickReview={onClickReview}
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

export default DisplayPaneThreeSectionOneAssessmentCluster;
