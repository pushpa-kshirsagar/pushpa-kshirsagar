import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import { makeAssessmentReviewListRequestObject } from '../../Actions/GenericActions';
import {
  FILTERMODE,
  GET_ALLOCATE_ASSESSMENT,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_REQUEST_OBJECT
} from '../../actionType';

const DisplayPaneThreeSectionTwoAssessmentGroup = () => {
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
  let assessmentList = [];
  if (relatedReviewListPaneThree) {
    assessmentList = relatedReviewListPaneThree.assessment;
  }
  let assessmentArray = [];
  assessmentList.forEach((ob) => {
    const { id, informationBasic } = ob;
    assessmentArray.push({
      id,
      textOne: informationBasic?.assessmentName || '',
      textTwo: informationBasic?.assessmentDescription || '',
      status: ''
    });
  });

  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'assessment',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: assessmentArray
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];
  const onclickReviseAssessment = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'assessment' && selectedBadgeName === 'distinct') {
      console.log('assessment CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let requestObect = makeAssessmentReviewListRequestObject(
        selectedAssociateInfo,
        'active',
        0,
        countPage
      );
      let revisedGroupObject = {
        id: responseObject.id,
        assessmentGroupName: responseObject.informationBasic.assessmentGroupName,
        assessmentGroupDescription: responseObject.informationBasic.assessmentGroupDescription,
        assessmentGroupStatus: responseObject.informationEngagement.assessmentGroupStatus
      };
      let existingAssessmentId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree.assessment.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assessmentGroupAssessmenteRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSESSMENT,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssessmentId: existingAssessmentId,
          typeOfMiddlePaneList: 'assessmentGroupAssessmentReviewList'
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
                      onClickRevise={onclickReviseAssessment}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <AccordianInfoCard
                      onClickRevise={onclickReviseAssessment}
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

export default DisplayPaneThreeSectionTwoAssessmentGroup;
