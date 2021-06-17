import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
// import {
//   FILTERMODE,
//   GET_ALLOCATE_ASSESSMENT,
//   LOADER_START,
//   SET_DISPLAY_TWO_SINGLE_STATE,
//   SET_MOBILE_PANE_STATE
// } from '../../actionType';
// import { makeAssessmentReviewListRequestObject } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionTwoCultureProfileType = () => {
  // const [listExpand, setListExpand] = useState('');
  const { reviewMode, relatedReviewListPaneThree, responseObject } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, countPage, reviewListDistinctData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const dispatch = useDispatch();
  // const { informationEngagement, informationSetup } = responseObject;
  // function capitalizeFirstLetter(string) {
  //   if (!string) return '';
  //   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  // }

  const onclickReviseCultureProfile = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
  };

  // let assessmentList = [];
  // if (relatedReviewListPaneThree) {
  //   assessmentList = relatedReviewListPaneThree.assessment;
  // }
  // let assessmentArray = [];
  // assessmentList.forEach((ob) => {
  //   const { id, informationBasic } = ob;
  //   assessmentArray.push({
  //     id,
  //     textOne: informationBasic?.assessmentName || '',
  //     textTwo: informationBasic?.assessmentDescription || '',
  //     status: ''
  //   });
  // });

  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'culture profile',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
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
            {list2.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <AccordianListCard
                      onClickRevise={onclickReviseCultureProfile}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <AccordianInfoCard
                      onClickRevise={onclickReviseCultureProfile}
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

export default DisplayPaneThreeSectionTwoCultureProfileType;
