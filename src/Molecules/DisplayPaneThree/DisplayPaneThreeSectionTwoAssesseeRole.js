import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
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
  SET_PAGE_COUNT,
  SET_POPUP_VALUE
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
import { createNameWithBadge } from '../../Actions/StatusAction';

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
  let permissionList = [
    {
      id: 'id1',
      textOne:
        "<span>assessees</span>&nbsp <span class='iguru-header-badge1_2'>distinct</span>&nbsp;",
      textTwo: 'create, review' || 'No Information',
      status: ''
    },
    {
      id: 'id2',
      textOne:
        "<span>assessees</span>&nbsp <span class='iguru-header-badge1_2'>groups</span>&nbsp;",
      textTwo: 'create' || 'No Information',
      status: ''
    },
    {
      id: 'id3',
      textOne:
        "<span>assessees</span>&nbsp <span class='iguru-header-badge1_2'>managers</span>&nbsp;",
      textTwo: 'create' || 'No Information',
      status: ''
    },
    {
      id: 'id4',
      textOne: "<span>assessees</span>&nbsp <span class='iguru-header-badge1_2'>roles</span>&nbsp;",
      textTwo: 'create' || 'No Information',
      status: ''
    },
    {
      id: 'id4',
      textOne: "<span>assessees</span>&nbsp <span class='iguru-header-badge1_2'>types</span>&nbsp;",
      textTwo: 'create' || 'No Information',
      status: ''
    }
  ];

  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: headerOne,
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
    },
    {
      id: 'a2',
      labelTextOneOne: 'permission',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          innerList: permissionList
        }
      ],
      innerInfo: 'No Information',
      isListCard: true,
      isReviewLink: true
    }
  ];

  const onclickReviseAssessee = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    if (labelName === 'assessees' || labelName === 'administrators' || labelName === 'managers') {
      console.log('ASSESSEE CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let roleRequestObj =
        labelName === 'administrators' || labelName === 'managers'
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

      console.log(labelName === 'administrators');
      let revisedRoleObject = {
        id: responseObject.id,
        assesseeRoleName: responseObject.informationBasic.assesseeRoleName,
        assesseeRoleDescription: responseObject.informationBasic.assesseeRoleDescription,
        assesseeRoleStatus: responseObject.informationEngagement.assesseeRoleStatus
      };
      let existingAssesseeId = [];
      let tempAssessees = relatedReviewListPaneThree[0]?.assessee || [];
      existingAssesseeId = tempAssessees.map((val) => {
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
          headerOne: labelName,
          revisedGroupObject: revisedRoleObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'assesseesRoleAssesseeReviewList'
        }
      });
    }
    if (labelName === 'permission') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'PERMISSIONPOPUP', popupMode: 'assesseesROLECREATE' }
      });
    }
  };
  const onclickReviewAssessee = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('ASSESSEE CLICK :::::::>>>>>>>', labelName, assesseeArray);
    if (
      (labelName === 'assessees' || labelName === 'administrators' || labelName === 'managers') &&
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
          middlePaneHeader: labelName,
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
                    <DisplayPanelAccordianReviewListOne
                      onClickReview={onclickReviewAssessee}
                      onClickRevise={onclickReviseAssessee}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation accordianObject={ob} mode={reviewMode} />
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
