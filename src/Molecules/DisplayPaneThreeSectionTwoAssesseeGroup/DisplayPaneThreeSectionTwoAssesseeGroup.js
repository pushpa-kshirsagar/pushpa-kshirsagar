import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import {
  FILTERMODE,
  GET_ALLOCATE_ASSESSEE,
  LOADER_START,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_REQUEST_OBJECT
} from '../../actionType';
import { getAssesseeGroupAssesseeDistinctApiCall } from '../../Actions/AssesseeModuleAction';
import { makeAssesseeReviewListRequestObject } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionTwoAssesseeGroup = () => {
  // const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const { reviewMode, relatedReviewListPaneThree, responseObject } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { relatedReviewListDistinctData } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { selectedAssociateInfo, countPage, reviewListDistinctData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  console.log('ASSESSEE LIST ::::::::::::>', relatedReviewListPaneThree);
  // const { informationEngagement, informationSetup } = responseObject;
  // function capitalizeFirstLetter(string) {
  //   if (!string) return '';
  //   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  // }
  let assessee = [];
  if (relatedReviewListPaneThree && relatedReviewListPaneThree.length > 0) {
    assessee = relatedReviewListPaneThree[0].assessee;
  }
  let assesseeArray = [];
  assessee.forEach((ob) => {
    const { id, informationBasic } = ob;
    assesseeArray.push({
      id,
      textOne: `${informationBasic.assesseeNamePrefix} ${informationBasic.assesseeNameFirst} ${informationBasic.assesseeNameOther} ${informationBasic.assesseeNameLast} ${informationBasic.assesseeNameSuffix}`,
      textTwo: informationBasic.assesseeAlias || 'No Information',
      status: ''
    });
  });

  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'assessee',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: assesseeArray
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
    if (labelName === 'assessee') {
      getAssesseeGroupAssesseeDistinctApiCall(
        selectedAssociateInfo,
        'active',
        countPage,
        dispatch,
        'distinct',
        responseObject.id, //group id
        '',
        false,
        true
      );
      // dispatch({
      //   type: FILTERMODE,
      //   payload: { FilterMode: 'assesseeGroupAssesseeDistinct' }
      // });
      // dispatch({
      //   type: RELATED_REVIEWLIST_DISTINCT_DATA,
      //   payload: relatedReviewListPaneThree
      // });
      // dispatch({
      //   type: SET_MIDDLEPANE_STATE,
      //   payload: {
      //     middlePaneHeader: 'assessees',
      //     middlePaneHeaderBadgeOne: 'distinct',
      //     middlePaneHeaderBadgeTwo: 'active',
      //     middlePaneHeaderBadgeThree: '',
      //     middlePaneHeaderBadgeFour: '',
      //     typeOfMiddlePaneList: 'assesseesGroupAssesseeReviewList',
      //     scanCount: 4,
      //     showMiddlePaneState: true
      //   }
      // });
    }
  };
  const onclickReviseAssessee = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    if (labelName === 'assessee') {
      console.log('ASSESSEE CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let requestObect = makeAssesseeReviewListRequestObject(
        selectedAssociateInfo,
        'active',
        0,
        countPage
      );
      let revisedGroupObject = {
        id: responseObject.id,
        assesseeGroupName: responseObject.informationBasic.assesseeGroupName,
        assesseeGroupDescription: responseObject.informationBasic.assesseeGroupDescription,
        assesseeGroupStatus: responseObject.informationEngagement.assesseeGroupStatus
      };
      let existingAssesseeId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree[0].assessee.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeGroupAssesseeRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSESSEE,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'assesseesGroupAssesseeReviewList'
        }
      });

      // getAssesseeGroupAssesseeDistinctApiCall(
      //   selectedAssociateInfo,
      //   'active',
      //   countPage,
      //   dispatch,
      //   'distinct',
      //   responseObject.id, //group id
      //   '',
      //   false,
      //   true
      // );
      // dispatch({
      //   type: RELATED_REVIEWLIST_DISTINCT_DATA,
      //   payload: relatedReviewListPaneThree
      // });
      // dispatch({
      //   type: SET_MIDDLEPANE_STATE,
      //   payload: {
      //     middlePaneHeader: 'assessees',
      //     middlePaneHeaderBadgeOne: 'distinct',
      //     middlePaneHeaderBadgeTwo: 'active',
      //     middlePaneHeaderBadgeThree: '',
      //     middlePaneHeaderBadgeFour: '',
      //     typeOfMiddlePaneList: 'assesseesGroupAssesseeReviewList',
      //     scanCount: 4,
      //     showMiddlePaneState: true
      //   }
      // });
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
                      onClickRevise={onclickReviseAssessee}
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

export default DisplayPaneThreeSectionTwoAssesseeGroup;
