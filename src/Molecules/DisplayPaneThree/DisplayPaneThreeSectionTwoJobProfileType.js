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
  GET_ALLOCATE_ASSESSMENT,
  GET_ALLOCATE_JOB,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';
import {
  makeAssessmentReviewListRequestObject,
  makeJobProfileObj
} from '../../Actions/GenericActions';

const DisplayPaneThreeSectionTwoJobProfileType = () => {
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

  let cultureProfileList = [];
  if (relatedReviewListPaneThree) {
    cultureProfileList = relatedReviewListPaneThree?.jobProfile || [];
  }
  let cultureProfileArray = [];
  cultureProfileList.forEach((ob) => {
    const { id, informationBasic } = ob;
    cultureProfileArray.push({
      id,
      textOne: informationBasic?.jobProfileName || '',
      textTwo: informationBasic?.jobProfileDescription || '',
      status: ''
    });
  });

  const onclickReviseJobProfile = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'job profiles' && selectedBadgeName === 'distinct') {
      console.log('job profile CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let requestObect = makeJobProfileObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedTypeObject = {
        id: responseObject.id,
        jobProfileTypeName: responseObject.informationBasic.jobProfileTypeName,
        jobProfileTypeDescription: responseObject.informationBasic.jobProfileTypeDescription,
        jobProfileTypeStatus: responseObject.informationEngagement.jobProfileTypeStatus
      };
      let existingJobProfileId = [];
      if (relatedReviewListPaneThree && relatedReviewListPaneThree.jobProfile) {
        existingJobProfileId = relatedReviewListPaneThree.jobProfile.map((val) => {
          return val.id;
        });
      }
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'jobProfileTypeJobProfileRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_JOB,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedTypeObject,
          existingJobProfileId: existingJobProfileId,
          typeOfMiddlePaneList: 'jobProfileTypeJobProfileReviewList'
        }
      });
    }
  };

  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'job profiles',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: cultureProfileArray
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
                      onClickRevise={onclickReviseJobProfile}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <AccordianInfoCard
                      onClickRevise={onclickReviseJobProfile}
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

export default DisplayPaneThreeSectionTwoJobProfileType;
