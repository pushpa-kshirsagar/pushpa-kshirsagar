import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import { RELATED_REVIEWLIST_DISTINCT_DATA, SET_MIDDLEPANE_STATE } from '../../actionType';

const DisplayPaneThreeSectionTwoAssociateGroup = () => {
  // const [listExpand, setListExpand] = useState('');
  const { reviewMode, relatedReviewListPaneThree } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const dispatch = useDispatch();
  console.log('ASSOCIATE LIST ::::::::::::>', relatedReviewListPaneThree);
  // const { informationEngagement, informationSetup } = responseObject;
  // function capitalizeFirstLetter(string) {
  //   if (!string) return '';
  //   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  // }
  let associate = [];
  if (relatedReviewListPaneThree && relatedReviewListPaneThree.length > 0) {
    associate = relatedReviewListPaneThree[0].associate;
  }
  let associateArray = [];
  associate.forEach((ob) => {
    const { id, informationBasic } = ob;
    associateArray.push({
      id,
      textOne: informationBasic?.associateName || '',
      textTwo: informationBasic?.associateDescription || 'No Information',
      status: ''
    });
  });

  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'associate',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: associateArray
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];

  const onclickReviewAssessee = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('ASSESSEE CLICK :::::::>>>>>>>', labelName);
    if (labelName === 'associate') {
      dispatch({
        type: RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: relatedReviewListPaneThree
      });
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'associates',
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'associatesGroupAssociateReviewList',
          scanCount: 4,
          showMiddlePaneState: true
        }
      });
    }
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 336px)',
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
                      onClickReview={onclickReviewAssessee}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <AccordianInfoCard accordianObject={ob} mode={reviewMode} />
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

export default DisplayPaneThreeSectionTwoAssociateGroup;
