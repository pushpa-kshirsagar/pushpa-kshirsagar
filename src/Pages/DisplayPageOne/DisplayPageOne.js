import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import {
  CLEAR_ASSESSEE_INFO,
  CLEAR_ASSESSMENT_INFO,
  CLEAR_ASSIGNMENT_INFO,
  CLEAR_ASSOCIATE_INFO,
  CLEAR_IGAUGE_REDUCER,
  GET_ASSESSEE_SIGN_IN_INFO,
  GET_USER_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_ASSESSEE_GROUP_REDUCER_STATE,
  SET_ASSESSEE_TYPE_REDUCER_STATE,
  SET_ASSESSMENT_GROUP_REDUCER_STATE,
  SET_ASSESSMENT_TYPE_REDUCER_STATE,
  SET_ASSIGNMEMT_GROUP_REDUCER_STATE,
  SET_ASSIGNMENT_TYPE_REDUCER_STATE,
  SET_ASSOCIATE_GROUP_REDUCER_STATE,
  SET_ASSOCIATE_TYPE_REDUCER_STATE,
  SET_ITEM_GROUP_REDUCER_STATE
} from '../../actionType';
import HeaderZero from '../../Molecules/HeaderZero/HeaderZero';
import './DisplayPageOne.css';
import DisplayPaneOne from '../../Organisms/DisplayPaneOne/DisplayPaneOne';
import DisplayPaneThree from '../../Organisms/DisplayPaneThree/DisplayPaneThree';
import DisplayPaneTwo from '../../Organisms/DisplayPaneTwo/DisplayPaneTwo';
import GridColumn from '../../Molecules/GridColumn/GridColumn';
import DisplayPaneFour from '../../Organisms/DisplayPaneFour/DisplayPaneFour';
import DisplayPaneFive from '../../Organisms/DisplayPaneFive/DisplayPaneFive';
// import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
// import { AccountContext } from '../../Account';
import LoadingComponent from '../../PopUpInformation/LoadingComponent';
import PopUpMiddlePaneList from '../../PopUpDisplayPanel/PopUpMiddlePaneList';
import PopUpSignOnAssessee from '../../PopUpSignOn/PopUpSignOnAssessee';
import PopUpSignOnAssociate from '../../PopUpSignOn/PopUpSignOnAssociate';
import AssesseeRoleCreatePopUp from '../../Molecules/PopUpCreate/AssesseeRoleCreatePopUp';
import AssociateRoleCreatePopup from '../../Molecules/PopUpCreate/AssociateRoleCreatePopup';
import AllGroupCreatePopup from '../../Molecules/PopUpCreate/AllGroupCreatePopup';
import TypeCreatePopup from '../../Molecules/PopUpCreate/TypeCreatePopup';
import AssignmentCreatePopup from '../../Molecules/PopUpCreate/AssignmentCreatePopup';
import AssessmentCreatePopup from '../../Molecules/PopUpCreate/AssessmentCreatePopup';
import PopUpMessageError from '../../PopUpGeneric/PopUpMessageError';
import { useHistory } from 'react-router-dom';
import NodeCreatePopup from '../../Molecules/PopUpCreate/NodeCreatePopup';
import PopUpMiddlePaneTrippleDot from '../../PopUpDisplayPanel/PopUpMiddlePaneTrippleDot';
import ItemCreatePopUp from '../../Molecules/PopUpCreate/ItemCreatePopUp';
import PopUpDownloadUpload from '../../PopUpDisplayPanel/PopUpDownloadUpload';

// import { useHistory } from 'react-router-dom';

const DisplayPageOne = () => {
  const { loginUserName } = useSelector((state) => state.UserReducer);
  const { gridColumnCountValue } = useSelector((state) => state.PopUpReducer);
  const { isDisplayPaneFourShow } = useSelector((state) => state.AssessmentReducer);
  const { isLoading } = useSelector((state) => state.LoaderReducer);
  const { mobilePanestate } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { assesseeConfirmStatus } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const isExamMode = false;
  const assesseeId = localStorage.getItem('assesseeId');
  const accessToken = localStorage.getItem('token');
  const { assesseeGroup, assessmentGroup, assignmentGroup, associateGroup, itemGroup } = useSelector(
    (state) => state.GroupCreateReducer
  );
  const { assesseeType, assessmentType, assignmentType, associateType } = useSelector(
    (state) => state.TypeCreateReducer
  );
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: LOADER_START });
    dispatch({
      type: GET_ASSESSEE_SIGN_IN_INFO,
      payload: {
        accessToken,
        assesseeId
      }
    });
  }, []);
  // const { getSession } = useContext(AccountContext);
  //* code for change username and any attribute
  // const changeUserName = () => {
  //   getSession()
  //     .then(({ user }) => {
  //       let attributeList = [];
  //       const attributeOb = {
  //         Name: 'preferred_username',
  //         Value: '8868916398' //'shivam.s@boppotechnologies.com'
  //       };
  //       const attribute = new CognitoUserAttribute(attributeOb);
  //       attributeList.push(attribute);
  //       user.updateAttributes(attributeList, function (err, result) {
  //         if (err) {
  //           console.log('IN ERROR ON CHANGE USERNAME', err);
  //           return;
  //         }
  //         console.log('call result: ' + result);
  //       });
  //     })
  //     .catch((err) => {
  //       console.log('SESSION ERR=====', err);
  //     });
  // };

  // useEffect(() => {
  //   dispatch({ type: GET_USER_SAGA });
  // }, [dispatch]);
  const { selectedAssociateInfo, leftPaneAssesseeInfo } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);

  // const userName =
  //   selectedAssociateInfo &&
  //   selectedAssociateInfo.assesseeInformation.assesseeNameFirst +
  //     ' ' +
  //     selectedAssociateInfo.assesseeInformation.assesseeNameLast;
  // const userEmail =
  // selectedAssociateInfo && selectedAssociateInfo.assesseeInformation.assesseeEmail;
  const userName = leftPaneAssesseeInfo
    ? leftPaneAssesseeInfo.informationBasic.assesseeNameFirst.trim() +
      ' ' +
      leftPaneAssesseeInfo.informationBasic.assesseeNameLast.trim()
    : '';
  const userEmail = assesseeId || '';
  const popupAllClose = () => {
    dispatch({ type: CLEAR_ASSESSEE_INFO });
    dispatch({ type: CLEAR_ASSESSMENT_INFO });
    dispatch({ type: POPUP_CLOSE });
    dispatch({ type: CLEAR_ASSOCIATE_INFO });
    dispatch({ type: CLEAR_ASSIGNMENT_INFO });
    dispatch({ type: CLEAR_IGAUGE_REDUCER });
  };
  const { typeOfMiddlePaneList } = useSelector((state) => state.DisplayPaneTwoReducer);
  return (
    <>
      <HeaderZero userName={userName} userEmail={userEmail} />
      <LoadingComponent isActive={isLoading} />
      {gridColumnCountValue !== 0 ? (
        <GridColumn isExamMode={isExamMode} columnCount={gridColumnCountValue} />
      ) : null}
      <div className="main-container">
        {isMobile ? (
          <div className="display-pane-container">
            {mobilePanestate === 'displayPaneOne' && <DisplayPaneOne />}
            {mobilePanestate === 'displayPaneTwo' && (
              <DisplayPaneTwo popupAllClose={popupAllClose} />
            )}
            {mobilePanestate === 'displayPaneThree' && <DisplayPaneThree />}
            {mobilePanestate === 'displayPaneFour' && <DisplayPaneFour />}
            {mobilePanestate === 'displayPaneFive' && <DisplayPaneFive />}
          </div>
        ) : (
          <>
            {isExamMode ? (
              <>
                <div style={{ width: isDisplayPaneFourShow ? '33.33%' : '4%' }}>
                  <DisplayPaneFour />
                </div>
                <div style={{ width: isDisplayPaneFourShow ? '66.66%' : '95.5%' }}>
                  <DisplayPaneFive />
                </div>
              </>
            ) : (
              <>
                <div className="display-pane-container">
                  <DisplayPaneOne />
                  {/* <button onClick={changeUserName}>Change Username</button> */}
                </div>
                <div className="display-pane-container">
                  <DisplayPaneTwo popupAllClose={popupAllClose} />
                </div>
                <div className="display-pane-container">
                  <DisplayPaneThree />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <PopUpMiddlePaneList
        isActive={isPopUpValue === 'middlePaneListPopup'}
        typeOfMiddlePaneList={typeOfMiddlePaneList}
        popupAllClose={popupAllClose}
      />
      <PopUpMiddlePaneTrippleDot
        isActive={isPopUpValue === 'middlePaneTrippleDotPopup'}
        typeOfMiddlePaneList={typeOfMiddlePaneList}
        popupAllClose={popupAllClose}
      />
      <PopUpMiddlePaneList
        isActive={isPopUpValue === 'leftPaneTrippleDotPopup'}
        typeOfMiddlePaneList={typeOfMiddlePaneList}
        popupAllClose={popupAllClose}
        headerPanelColour={'displayPaneLeft'}
      />
      {popupMode === 'ASSESSEE_CREATE' && <PopUpSignOnAssessee />}
      {popupMode === 'ADMINISTRATOR_CREATE' && <PopUpSignOnAssessee headerOne={'administrator'} />}
      {popupMode === 'MANAGER_CREATE' && <PopUpSignOnAssessee headerOne={'manager'} />}
      {popupMode === 'ASSOCIATE_CREATE' && <PopUpSignOnAssociate />}
      {popupMode === 'assesseesROLECREATE' && <AssesseeRoleCreatePopUp />}
      {popupMode === 'associatesROLECREATE' && <AssociateRoleCreatePopup />}
      {popupMode === 'responseErrorMsg' && (
        <PopUpMessageError isActive errorMessage={isPopUpValue} />
      )}
      {popupMode === 'assesseesGROUPCREATE' && (
        <AllGroupCreatePopup
          headerOne={'assessees'}
          reducerObeject={assesseeGroup}
          groupName={'assesseeGroupName'}
          groupDescription={'assesseeGroupDescription'}
          setReducerObject={SET_ASSESSEE_GROUP_REDUCER_STATE}
          objectName={'assesseeGroup'}
        />
      )}
      {popupMode === 'assessmentsGROUPCREATE' && (
        <AllGroupCreatePopup
          headerOne={'assessments'}
          reducerObeject={assessmentGroup}
          groupName={'assessmentGroupName'}
          groupDescription={'assessmentGroupDescription'}
          setReducerObject={SET_ASSESSMENT_GROUP_REDUCER_STATE}
          objectName={'assessmentGroup'}
        />
      )}
      {popupMode === 'assignmentsGROUPCREATE' && (
        <AllGroupCreatePopup
          headerOne={'assignments'}
          reducerObeject={assignmentGroup}
          groupName={'assignmentGroupName'}
          groupDescription={'assignmentGroupDescription'}
          setReducerObject={SET_ASSIGNMEMT_GROUP_REDUCER_STATE}
          objectName={'assignmentGroup'}
        />
      )}
      {popupMode === 'associatesGROUPCREATE' && (
        <AllGroupCreatePopup
          headerOne={'associates'}
          reducerObeject={associateGroup}
          groupName={'associateGroupName'}
          groupDescription={'associateGroupDescription'}
          setReducerObject={SET_ASSOCIATE_GROUP_REDUCER_STATE}
          objectName={'associateGroup'}
        />
      )}
      {popupMode === 'itemsGROUPCREATE' && (
        <AllGroupCreatePopup
          headerOne={'items'}
          reducerObeject={itemGroup}
          groupName={'itemGroupName'}
          groupDescription={'itemGroupDescription'}
          setReducerObject={SET_ITEM_GROUP_REDUCER_STATE}
          objectName={'itemGroup'}
        />
      )}
      {popupMode === 'assesseesTYPECREATE' && (
        <TypeCreatePopup
          headerOne={'assessees'}
          reducerObeject={assesseeType}
          typeName={'assesseeTypeName'}
          typeDescription={'assesseeTypeDescription'}
          setReducerObject={SET_ASSESSEE_TYPE_REDUCER_STATE}
          objectName={'assesseeType'}
          allocationObj={'assesseeTypeGroup'}
          groupName={'assesseeTypeGroupName'}
          groupDescription={'assesseeTypeGroupDescription'}
        />
      )}
      {popupMode === 'assessmentsTYPECREATE' && (
        <TypeCreatePopup
          headerOne={'assessments'}
          reducerObeject={assessmentType}
          typeName={'assessmentTypeName'}
          typeDescription={'assessmentTypeDescription'}
          setReducerObject={SET_ASSESSMENT_TYPE_REDUCER_STATE}
          objectName={'assessmentType'}
          allocationObj={'assessmentTypeGroup'}
        />
      )}
      {popupMode === 'assignmentsTYPECREATE' && (
        <TypeCreatePopup
          headerOne={'assignments'}
          reducerObeject={assignmentType}
          typeName={'assignmentTypeName'}
          typeDescription={'assignmentTypeDescription'}
          setReducerObject={SET_ASSIGNMENT_TYPE_REDUCER_STATE}
          objectName={'assignmentType'}
          allocationObj={'assignmentTypeGroup'}
        />
      )}
      {popupMode === 'associatesTYPECREATE' && (
        <TypeCreatePopup
          headerOne={'associates'}
          reducerObeject={associateType}
          typeName={'associateTypeName'}
          typeDescription={'associateTypeDescription'}
          setReducerObject={SET_ASSOCIATE_TYPE_REDUCER_STATE}
          objectName={'associateType'}
          allocationObj={'associateTypeGroup'}
          groupName={'associateTypeGroupName'}
          groupDescription={'associateTypeGroupDescription'}
        />
      )}
      {popupMode === 'NODECREATE' && <NodeCreatePopup headerOne={'associate'} />}
      {popupMode === 'ASSIGNMENTCREATE' && <AssignmentCreatePopup headerOne={'assignment'} />}
      {popupMode === 'ASSESSMENTCREATE' && <AssessmentCreatePopup headerOne={'assessment'} />}
      {popupMode === 'ITEMCREATE' && <ItemCreatePopUp />}
      {popupMode === 'UPLOAD_DOWNLOAD_POPUP' && <PopUpDownloadUpload isActive/>}
    </>
  );
};

export default DisplayPageOne;
