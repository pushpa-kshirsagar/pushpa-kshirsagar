import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import {
  makeAssesseeReviewListRequestObject,
  makeAssessmentReviewListRequestObject,
  makeCultureProfileObj,
  makeJobProfileObj
} from '../../Actions/GenericActions';
import {
  FILTERMODE,
  GET_ALLOCATE_ASSESSEE,
  GET_ALLOCATE_ASSESSMENT,
  GET_ALLOCATE_CULTURE,
  GET_ALLOCATE_JOB,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_REQUEST_OBJECT
} from '../../actionType';

const DisplayPaneThreeSectionTwoAssignment = () => {
  const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const { headerOneBadgeTwo, reviewMode, relatedReviewListPaneThree, responseObject } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, countPage } = useSelector((state) => state.DisplayPaneTwoReducer);

  const frameworkList = [
    {
      id: 'a1',
      labelTextOneOne: 'assessees',
      isListCard: true,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'norm',
          textOne: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a3',
      labelTextOneOne: 'assessments',
      isListCard: true,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'CP-001',
      labelTextOneOne: 'culture profiles',
      isListCard: true,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'JP-001',
      labelTextOneOne: 'job profiles',
      isListCard: true,
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'group',
          innerList: []
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a4',
      labelTextOneOne: 'report',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'report',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    }
  ];
  const frameworkPlusAll = [
    {
      id: 'a2',
      labelTextOneOne: 'timeline',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'start',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne: 'No Information'
        }
      ],
      labelTextOneOneBadgeTwo: '',
      innerAssociateList: [],
      innerInfo: '',
      IconOne: null
    }
  ];
  const onclickReviseFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'assessees' && selectedBadgeName === 'distinct') {
      let requestObect = makeAssesseeReviewListRequestObject(
        selectedAssociateInfo,
        'active',
        0,
        countPage
      );
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingAssesseeId = [];
      let tempArr = relatedReviewListPaneThree[0]?.assessee || [];
      existingAssesseeId = tempArr.map((val) => {
        return val.id;
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctAssesseeRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSESSEE,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'assignmentDistinctAssesseeReviewList'
        }
      });
    }
    if (labelName === 'assessments' && selectedBadgeName === 'distinct') {
      let requestObect = makeAssessmentReviewListRequestObject(
        selectedAssociateInfo,
        'active',
        0,
        countPage
      );
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingAssesseeId = [];
      let tempArr = relatedReviewListPaneThree[0]?.assessment || [];
      existingAssesseeId = tempArr.map((val) => {
        return val.id;
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctAssessmentRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSESSMENT,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssessmentId: existingAssesseeId,
          typeOfMiddlePaneList: 'assignmentDistinctAssessmentReviewList'
        }
      });
    }
    if (labelName === 'culture profiles' && selectedBadgeName === 'distinct') {
      let requestObect = makeCultureProfileObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingCultureProfileId = [];
      let tempArr = relatedReviewListPaneThree[0]?.cultureProfile || [];
      existingCultureProfileId = tempArr.map((val) => {
        return val.id;
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctCultureProfileRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_CULTURE,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingCultureProfileId: existingCultureProfileId,
          typeOfMiddlePaneList: 'assignmentDistinctCultureProfileReviewList'
        }
      });
    }
    if (labelName === 'job profiles' && selectedBadgeName === 'distinct') {
      let requestObect = makeJobProfileObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        assignmentName: responseObject.informationBasic.assignmentName,
        assignmentDescription: responseObject.informationBasic.assignmentDescription,
        assignmentStatus: responseObject.informationEngagement.assignmentStatus
      };
      let existingJobProfileId = [];
      let tempArr = relatedReviewListPaneThree[0]?.cultureProfile || [];
      existingJobProfileId = tempArr.map((val) => {
        return val.id;
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentDistinctJobProfileRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_JOB,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingJobProfileId: existingJobProfileId,
          typeOfMiddlePaneList: 'assignmentDistinctJobProfileReviewList'
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
      {headerOneBadgeTwo === 'all' ? (
        <>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="framework"
              isDisplayCardExpanded={listExpand === 'framework'}
              setListExpand={setListExpand}
              list={frameworkList}
              mode={reviewMode}
              onClickRevise={onclickReviseFramework}
            />
          </div>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="framework+"
              isDisplayCardExpanded={listExpand === 'framework+'}
              setListExpand={setListExpand}
              list={frameworkPlusAll}
              mode={reviewMode}
            />
          </div>
        </>
      ) : (
        <>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {frameworkList.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard
                        onClickRevise={onclickReviseFramework}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    ) : (
                      <AccordianInfoCard
                        onClickRevise={onclickReviseFramework}
                        accordianObject={ob}
                        mode={reviewMode}
                      />
                    )}
                  </div>
                );
              })}
            </Paper>
          </div>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {frameworkPlusAll.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <AccordianListCard className="" accordianObject={ob} mode={reviewMode} />
                    ) : (
                      <AccordianInfoCard accordianObject={ob} mode={reviewMode} />
                    )}
                  </div>
                );
              })}
            </Paper>
          </div>
        </>
      )}
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionTwoAssignment;
