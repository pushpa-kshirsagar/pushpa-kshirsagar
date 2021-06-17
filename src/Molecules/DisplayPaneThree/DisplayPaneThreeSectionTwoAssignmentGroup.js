import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import { makeAssignmentReviewListRequestObject } from '../../Actions/GenericActions';
import {
  FILTERMODE,
  GET_ALLOCATE_ASSIGNMENT,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';

const DisplayPaneThreeSectionTwoAssignmentGroup = () => {
  // const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const { reviewMode, relatedReviewListPaneThree, responseObject } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, countPage, reviewListDistinctData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  // const { informationEngagement, informationSetup } = responseObject;
  // function capitalizeFirstLetter(string) {
  //   if (!string) return '';
  //   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  // }
  let assignmentList = [];
  if (relatedReviewListPaneThree) {
    assignmentList = relatedReviewListPaneThree?.assignment || [];
  }
  let assignmentArray = [];
  assignmentList.forEach((ob) => {
    const { id, informationBasic } = ob;
    assignmentArray.push({
      id,
      textOne: informationBasic?.assignmentName || '',
      textTwo: informationBasic?.assignmentDescription || '',
      status: ''
    });
  });

  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'assignment',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: assignmentArray
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];

  const onclickReviseAssignment = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'assignment' && selectedBadgeName === 'distinct') {
      console.log('assignment CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let requestObect = makeAssignmentReviewListRequestObject(
        selectedAssociateInfo,
        'active',
        0,
        countPage
      );
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentGroupName: responseObject.informationBasic.assignmentGroupName,
        assignmentGroupDescription: responseObject.informationBasic.assignmentGroupDescription,
        assignmentGroupStatus: responseObject.informationEngagement.assignmentGroupStatus
      };
      let existingAssignmentId = [];
      if (relatedReviewListPaneThree && relatedReviewListPaneThree.assignment) {
        existingAssignmentId =
          relatedReviewListPaneThree &&
          relatedReviewListPaneThree.assignment.map((val) => {
            return val.id;
          });
      }
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentGroupAssignmentRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSIGNMENT,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssignmentId: existingAssignmentId,
          typeOfMiddlePaneList: 'assignmentGroupAssignmentReviewList'
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
                      onClickRevise={onclickReviseAssignment}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <AccordianInfoCard
                      onClickRevise={onclickReviseAssignment}
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

export default DisplayPaneThreeSectionTwoAssignmentGroup;
