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
  LOADER_START,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  GET_ALLOCATE_ASSOCIATE
} from '../../actionType';
import { getAssociateDistinctApiCall } from '../../Actions/AssociateModuleAction';
import {
  makeAssociateNodeObj,
  makeAssociateReviewListRequestObject
} from '../../Actions/GenericActions';

const DisplayPaneThreeSectionTwoAssociateGroup = () => {
  // const [listExpand, setListExpand] = useState('');
  const { reviewMode, relatedReviewListPaneThree, responseObject } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, countPage } = useSelector((state) => state.DisplayPaneTwoReducer);
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
    console.log('Associate review CLICK :::::::>>>>>>>', labelName);
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
  const onclickReviseAssessee = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    if (labelName === 'associate') {
      // getAssociateDistinctApiCall(selectedAssociateInfo, 'active', dispatch, countPage, 'distinct');
      console.log('ASSESSEE CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let requestObect = makeAssociateNodeObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        associateGroupName: responseObject.informationBasic.associateGroupName,
        associateGroupDescription: responseObject.informationBasic.associateGroupDescription,
        associateGroupStatus: responseObject.informationEngagement.associateGroupStatus
      };
      let existingAssesseeId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree[0].associate.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'associateGroupAssociateRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSOCIATE,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'associatesGroupAssociateReviewList'
        }
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

export default DisplayPaneThreeSectionTwoAssociateGroup;
