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
  SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT
} from '../../actionType';
import {
  getAssesseeRoleAssesseeDistinctApiCall,
  getAssesseeRoleAssesseeReqObj
} from '../../Actions/AssesseeModuleAction';
import {
  makeAdministratorRoleCreateObj,
  makeAdministratorsReviewListRequestObject,
  makeAssesseeReviewListRequestObject,
  makeManagerRoleCreateObj,
  makeManagersReviewListRequestObject
} from '../../Actions/GenericActions';

const DisplayPaneThreeSectionTwoAssesseeRole = () => {
  // const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const { headerOne, reviewMode, relatedReviewListPaneThree = null, responseObject } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, countPage } = useSelector((state) => state.DisplayPaneTwoReducer);
  console.log('ASSESSEE LIST ::::::::::::>', relatedReviewListPaneThree);
  // const { informationEngagement, informationSetup } = responseObject;
  // function capitalizeFirstLetter(string) {
  //   if (!string) return '';
  //   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  // }
  let assessee = [];
  if (relatedReviewListPaneThree && relatedReviewListPaneThree.length > 0) {
    assessee = relatedReviewListPaneThree[0]?.assessee || [];
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
      labelTextOneOne: headerOne.slice(0, -1),
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

  const onclickReviseAssessee = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    if (labelName === 'assessee' || labelName === 'administrator' || labelName === 'manager') {
      console.log('ASSESSEE CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let roleRequestObj =
        labelName === 'administrator' || labelName === 'manager'
          ? getAssesseeRoleAssesseeReqObj(
              selectedAssociateInfo,
              responseObject.id,
              'active',
              0,
              countPage
            )
          : makeAssesseeReviewListRequestObject(selectedAssociateInfo, 'active', 0, countPage);
      // let roleRequestObj =
      //   labelName === 'administrator'
      //     ? makeAdministratorsReviewListRequestObject(selectedAssociateInfo, 'active', 0, countPage)
      //     : labelName === 'manager'
      //     ? makeManagersReviewListRequestObject(selectedAssociateInfo, 'active', 0, countPage)
      //     : makeAssesseeReviewListRequestObject(selectedAssociateInfo, 'active', 0, countPage);

      console.log(labelName === 'administrator');
      let revisedRoleObject = {
        id: responseObject.id,
        assesseeRoleName: responseObject.informationBasic.assesseeRoleName,
        assesseeRoleDescription: responseObject.informationBasic.assesseeRoleDescription,
        assesseeRoleStatus: responseObject.informationEngagement.assesseeRoleStatus
      };
      let existingAssesseeId = [];
      let tempAssessees = relatedReviewListPaneThree[0]?.assessee || [];
      tempAssessees.map((val) => {
        return val.id;
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeRoleAssesseeRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });

      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSESSEE,
        payload: {
          request: roleRequestObj,
          headerOne: `${labelName}s`,
          revisedGroupObject: revisedRoleObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'assesseesRoleAssesseeReviewList'
        }
      });
    }
  };
  const onclickReviewAssessee = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('ASSESSEE CLICK :::::::>>>>>>>', labelName, assesseeArray);
    if (
      (labelName === 'assessee' || labelName === 'administrator' || labelName === 'manager') &&
      assesseeArray.length > 0
    ) {
      let result = assesseeArray.map((a) => a.id);
      console.log('RESULT++++', result);
      dispatch({ type: SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST, payload: result });
      // getAssesseeRoleAssesseeDistinctApiCall(
      //   selectedAssociateInfo,
      //   'active',
      //   countPage,
      //   dispatch,
      //   'distinct',
      //   responseObject.id,
      //   '',
      //   false,
      //   true
      // );
      // dispatch({
      //   type: RELATED_REVIEWLIST_DISTINCT_DATA,
      //   payload: relatedReviewListPaneThree
      // });
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: `${labelName}s`,
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assesseesRoleAssesseeReviewList',
          scanCount: 5,
          showMiddlePaneState: true
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

export default DisplayPaneThreeSectionTwoAssesseeRole;
