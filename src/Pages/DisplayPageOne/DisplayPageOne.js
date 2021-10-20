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
  SET_CULTURE_GROUP_REDUCER_STATE,
  SET_CULTURE_TYPE_REDUCER_STATE,
  SET_ITEM_GROUP_REDUCER_STATE,
  SET_ITEM_TYPE_REDUCER_STATE,
  SET_JOB_GROUP_REDUCER_STATE,
  SET_JOB_TYPE_REDUCER_STATE
} from '../../actionType';
import HeaderZero from '../../Molecules/HeaderZero/HeaderZero';
import './DisplayPageOne.css';
import DisplayPaneOne from '../../Organisms/DisplayPaneOne/DisplayPaneOne';
import DisplayPaneThree from '../../Organisms/DisplayPaneThree/DisplayPaneThree';
import DisplayPaneTwo from '../../Organisms/DisplayPaneTwo/DisplayPaneTwo';
import GridColumn from '../../Molecules/GridColumn/GridColumn';
import DisplayPaneSix from '../../Organisms/DisplayPaneSix/DisplayPaneSix';
import DisplayPaneSeven from '../../Organisms/DisplayPaneSeven/DisplayPaneSeven';
// import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
// import { AccountContext } from '../../Account';
import LoadingComponent from '../../PopUpInformation/LoadingComponent';
import PicturePreview from '../../PopUpInformation/PicturePreview';
import PopUpDisplayPaneTwoReviewList from '../../PopUpDisplayPanel/PopUpDisplayPaneTwoReviewList';
import PopUpAssesseeCreateSignOn from '../../Molecules/PopUpCreate/PopUpAssesseeCreateSignOn';
import PopUpAssociateCreateSignOn from '../../Molecules/PopUpCreate/PopUpAssociateCreateSignOn';
import PopUpAssesseeRoleCreate from '../../Molecules/PopUpCreate/PopUpAssesseeRoleCreate';
import PopUpAssociateRoleCreate from '../../Molecules/PopUpCreate/PopUpAssociateRoleCreate';
import PopUpGroupCreate from '../../Molecules/PopUpCreate/PopUpGroupCreate';
import PopUpTypeCreate from '../../Molecules/PopUpCreate/PopUpTypeCreate';
import PopUpCultureProfileCreate from '../../Molecules/PopUpCreate/PopUpCultureProfileCreate';
import PopUpAssignmentCreate from '../../Molecules/PopUpCreate/PopUpAssignmentCreate';
import PopUpAssessmentCreate from '../../Molecules/PopUpCreate/PopUpAssessmentCreate';
import PopUpMessageError from '../../PopUpGeneric/PopUpMessageError';
import { useHistory } from 'react-router-dom';
import PopUpNodeCreate from '../../Molecules/PopUpCreate/PopUpNodeCreate';
import PopUpDisplayPaneTwoTripleDot from '../../PopUpDisplayPanel/PopUpDisplayPaneTwoTripleDot';
import PopUpItemCreate from '../../Molecules/PopUpCreate/PopUpItemCreate';
import PopUpJobProfileCreate from '../../Molecules/PopUpCreate/PopUpJobProfileCreate';
import DisplayPaneFour from '../../Organisms/DisplayPaneFour/DisplayPaneFour';
import DisplayPaneFive from '../../Organisms/DisplayPaneFive/DisplayPaneFive';
import PopUpDisplayPanelAssesseeAssessment from '../../PopUpDisplayPanel/PopUpDisplayPanelAssesseeAssessment';
import PopUpItemConfig from '../../PopUpInformation/PopUpItemConfig';
import PopUpItemFramework from '../../PopUpInformation/PopUpItemFramework';
import PopUpClusterCreate from '../../Molecules/PopUpCreate/PopUpClusterCreate';
import PopUpScaleCreate from '../../Molecules/PopUpCreate/PopUpScaleCreate';
import PopUpSectionCreate from '../../Molecules/PopUpCreate/PopUpSectionCreate';

// import { useHistory } from 'react-router-dom';

const DisplayPageOne = () => {
  const { loginUserName } = useSelector((state) => state.UserReducer);
  const { gridColumnCountValue } = useSelector((state) => state.PopUpReducer);
  const { isDisplayPaneSixShow } = useSelector((state) => state.AssessmentReducer);
  const { isLoading } = useSelector((state) => state.LoaderReducer);
  const { mobilePanestate } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { isItemPreviewShow = false, reviewMode, isAssessmentPreviewShow = false } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );

  const { isExamMode, isAssessmentStart } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
  const dispatch = useDispatch();
  const assesseeId = localStorage.getItem('assesseeId');
  const accessToken = localStorage.getItem('token');
  const {
    assesseeGroup,
    assessmentGroup,
    assignmentGroup,
    associateGroup,
    itemGroup,
    cultureProfileGroup,
    jobProfileGroup
  } = useSelector((state) => state.GroupCreateReducer);
  const {
    assesseeType,
    assessmentType,
    assignmentType,
    associateType,
    itemType,
    cultureProfileType,
    jobProfileType
  } = useSelector((state) => state.TypeCreateReducer);
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
    ? leftPaneAssesseeInfo?.assessee?.informationBasic.assesseeNameFirst.trim() +
      ' ' +
      leftPaneAssesseeInfo?.assessee?.informationBasic.assesseeNameLast.trim()
    : '';
  const userEmail = assesseeId || '';

  const popupAllClose = () => {
    dispatch({ type: CLEAR_ASSESSEE_INFO });
    // dispatch({ type: CLEAR_ASSESSMENT_INFO });
    dispatch({ type: POPUP_CLOSE });
    dispatch({ type: CLEAR_ASSOCIATE_INFO });
    dispatch({ type: CLEAR_ASSIGNMENT_INFO });
    dispatch({ type: CLEAR_IGAUGE_REDUCER });
  };
  const { typeOfMiddlePaneList } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { isPreviewShow = false } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { assesseeAssessmentStartData } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
  const assesseePicture = leftPaneAssesseeInfo?.assessee?.informationBasic?.assesseePicture;

  console.log('isExamMode', isExamMode);
  return (
    <>
      <HeaderZero
        userName={userName}
        userEmail={userEmail}
        imageOne={assesseePicture}
        isImageActive={assesseePicture}
      />

      {gridColumnCountValue !== 0 ? (
        <GridColumn isExamMode={isExamMode} columnCount={gridColumnCountValue} />
      ) : null}
      <div className="main-container">
        {isMobile ? (
          <div className="display-pane-container">
            {mobilePanestate === 'displayPaneOne' && <DisplayPaneOne />}
            {mobilePanestate === 'displayPaneTwo' && (
              <>
                {isPreviewShow ? (
                  <>
                    <DisplayPaneFour />
                  </>
                ) : (
                  <DisplayPaneTwo popupAllClose={popupAllClose} />
                )}
              </>
            )}
            {mobilePanestate === 'displayPaneThree' && <DisplayPaneThree />}
            {mobilePanestate === 'displayPaneFour' && <DisplayPaneFour />}
            {mobilePanestate === 'displayPaneFive' && <DisplayPaneFive />}
            {mobilePanestate === 'displayPaneSix' && <DisplayPaneSix />}
            {mobilePanestate === 'displayPaneSeven' && <DisplayPaneSeven />}
          </div>
        ) : (
          <>
            {isExamMode ? (
              <>
                {(isAssessmentStart === 'PROGRESS' && (
                  <div style={{ width: isDisplayPaneSixShow ? '33.33%' : '4%' }}>
                    <DisplayPaneOne />
                  </div>
                )) || (
                  <div style={{ width: isDisplayPaneSixShow ? '33.33%' : '' }}>
                    <DisplayPaneSix />
                  </div>
                )}
                {/* {assesseeAssessmentStartData &&  */}
                <div style={{ width: isDisplayPaneSixShow ? '66.66%' : '100%' }}>
                  <DisplayPaneSeven />
                </div>
                {/* } */}
              </>
            ) : isItemPreviewShow ? (
              <>
                <div style={{ width: isDisplayPaneSixShow ? '66.66%' : '95.5%' }}>
                  <DisplayPaneFive />
                </div>
                <div style={{ width: isDisplayPaneSixShow ? '33.33%' : '4%' }}>
                  <DisplayPaneThree />
                </div>
              </>
            ) : isAssessmentPreviewShow ? (
              <>
                <div style={{ width: isDisplayPaneSixShow ? '66.66%' : '95.5%' }}>
                  <DisplayPaneFive />
                </div>
                <div style={{ width: isDisplayPaneSixShow ? '33.33%' : '4%' }}>
                  <DisplayPaneThree />
                </div>
              </>
            ) : (
              <>
                <div className="display-pane-container">
                  <DisplayPaneOne />
                  {/* <button onClick={changeUserName}>Change Username</button> */}
                </div>
                <div className="display-pane-container">
                  <>
                    {isPreviewShow ? (
                      <>
                        <DisplayPaneFour />
                      </>
                    ) : (
                      <DisplayPaneTwo popupAllClose={popupAllClose} />
                    )}
                  </>
                </div>
                <div className="display-pane-container">
                  <DisplayPaneThree />
                  {/* <>
                    {isPreviewShow ? (
                      <>
                        <DisplayPaneFour />
                      </>
                    ) : (
                      <DisplayPaneThree />
                    )}
                  </> */}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <PopUpDisplayPaneTwoReviewList
        isActive={isPopUpValue === 'middlePaneListPopup'}
        typeOfMiddlePaneList={typeOfMiddlePaneList}
        popupAllClose={popupAllClose}
      />
      <PopUpDisplayPanelAssesseeAssessment
        isActive={isPopUpValue === 'paneSevenPopup'}
        typeOfMiddlePaneList={typeOfMiddlePaneList}
        popupAllClose={popupAllClose}
      />
      <PopUpDisplayPaneTwoTripleDot
        isActive={isPopUpValue === 'middlePaneTrippleDotPopup'}
        typeOfMiddlePaneList={typeOfMiddlePaneList}
        popupAllClose={popupAllClose}
      />
      <PopUpDisplayPaneTwoReviewList
        isActive={isPopUpValue === 'leftPaneTrippleDotPopup'}
        typeOfMiddlePaneList={typeOfMiddlePaneList}
        popupAllClose={popupAllClose}
        headerPanelColour={'displayPaneLeft'}
      />
      {popupMode === 'ASSESSEE_CREATE' && <PopUpAssesseeCreateSignOn />}
      {popupMode === 'ADMINISTRATOR_CREATE' && (
        <PopUpAssesseeCreateSignOn headerOne={'administrator'} />
      )}
      {popupMode === 'MANAGER_CREATE' && <PopUpAssesseeCreateSignOn headerOne={'manager'} />}
      {popupMode === 'ASSOCIATE_CREATE' && <PopUpAssociateCreateSignOn />}
      {popupMode === 'assesseesROLECREATE' && <PopUpAssesseeRoleCreate />}
      {popupMode === 'associatesROLECREATE' && <PopUpAssociateRoleCreate />}
      {popupMode === 'responseErrorMsg' && (
        <PopUpMessageError isActive errorMessage={isPopUpValue} />
      )}
      {popupMode === 'assesseesGROUPCREATE' && (
        <PopUpGroupCreate
          headerOne={'assessees'}
          reducerObeject={assesseeGroup}
          groupName={'assesseeGroupName'}
          groupDescription={'assesseeGroupDescription'}
          setReducerObject={SET_ASSESSEE_GROUP_REDUCER_STATE}
          objectName={'assesseeGroup'}
        />
      )}
      {popupMode === 'assessmentsGROUPCREATE' && (
        <PopUpGroupCreate
          headerOne={'assessments'}
          reducerObeject={assessmentGroup}
          groupName={'assessmentGroupName'}
          groupDescription={'assessmentGroupDescription'}
          setReducerObject={SET_ASSESSMENT_GROUP_REDUCER_STATE}
          objectName={'assessmentGroup'}
        />
      )}
      {popupMode === 'assignmentsGROUPCREATE' && (
        <PopUpGroupCreate
          headerOne={'assignments'}
          reducerObeject={assignmentGroup}
          groupName={'assignmentGroupName'}
          groupDescription={'assignmentGroupDescription'}
          setReducerObject={SET_ASSIGNMEMT_GROUP_REDUCER_STATE}
          objectName={'assignmentGroup'}
        />
      )}
      {popupMode === 'associatesGROUPCREATE' && (
        <PopUpGroupCreate
          headerOne={'associates'}
          reducerObeject={associateGroup}
          groupName={'associateGroupName'}
          groupDescription={'associateGroupDescription'}
          setReducerObject={SET_ASSOCIATE_GROUP_REDUCER_STATE}
          objectName={'associateGroup'}
        />
      )}
      {popupMode === 'itemsGROUPCREATE' && (
        <PopUpGroupCreate
          headerOne={'items'}
          reducerObeject={itemGroup}
          groupName={'itemGroupName'}
          groupDescription={'itemGroupDescription'}
          setReducerObject={SET_ITEM_GROUP_REDUCER_STATE}
          objectName={'itemGroup'}
        />
      )}
      {popupMode === 'culture profilesGROUPCREATE' && (
        <PopUpGroupCreate
          headerOne={'culture profiles'}
          reducerObeject={cultureProfileGroup}
          groupName={'cultureProfileGroupName'}
          groupDescription={'cultureProfileGroupDescription'}
          setReducerObject={SET_CULTURE_GROUP_REDUCER_STATE}
          objectName={'cultureProfileGroup'}
        />
      )}
      {popupMode === 'job profilesGROUPCREATE' && (
        <PopUpGroupCreate
          headerOne={'job profiles'}
          reducerObeject={jobProfileGroup}
          groupName={'jobProfileGroupName'}
          groupDescription={'jobProfileGroupDescription'}
          setReducerObject={SET_JOB_GROUP_REDUCER_STATE}
          objectName={'jobProfileGroup'}
        />
      )}
      {popupMode === 'assesseesTYPECREATE' && (
        <PopUpTypeCreate
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
        <PopUpTypeCreate
          headerOne={'assessments'}
          reducerObeject={assessmentType}
          typeName={'assessmentTypeName'}
          typeDescription={'assessmentTypeDescription'}
          setReducerObject={SET_ASSESSMENT_TYPE_REDUCER_STATE}
          objectName={'assessmentType'}
          allocationObj={'assessmentTypeGroup'}
          groupName={'assessmentTypeGroupName'}
          groupDescription={'assessmentTypeGroupDescription'}
        />
      )}
      {popupMode === 'assignmentsTYPECREATE' && (
        <PopUpTypeCreate
          headerOne={'assignments'}
          reducerObeject={assignmentType}
          typeName={'assignmentTypeName'}
          typeDescription={'assignmentTypeDescription'}
          setReducerObject={SET_ASSIGNMENT_TYPE_REDUCER_STATE}
          objectName={'assignmentType'}
          allocationObj={'assignmentTypeGroup'}
          groupName={'assignmentTypeGroupName'}
          groupDescription={'assignmentTypeGroupDescription'}
        />
      )}
      {popupMode === 'associatesTYPECREATE' && (
        <PopUpTypeCreate
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
      {popupMode === 'itemsTYPECREATE' && (
        <PopUpTypeCreate
          headerOne={'items'}
          reducerObeject={itemType}
          typeName={'itemTypeName'}
          typeDescription={'itemTypeDescription'}
          setReducerObject={SET_ITEM_TYPE_REDUCER_STATE}
          objectName={'itemType'}
          allocationObj={'itemTypeGroup'}
          groupName={'itemTypeGroupName'}
          groupDescription={'itemTypeGroupDescription'}
        />
      )}
      {popupMode === 'culture profilesTYPECREATE' && (
        <PopUpTypeCreate
          headerOne={'culture profiles'}
          reducerObeject={cultureProfileType}
          typeName={'cultureProfileTypeName'}
          typeDescription={'cultureProfileTypeDescription'}
          setReducerObject={SET_CULTURE_TYPE_REDUCER_STATE}
          objectName={'cultureProfileType'}
          allocationObj={'cultureProfileTypeGroup'}
          groupName={'cultureProfileTypeGroupName'}
          groupDescription={'cultureProfileTypeGroupDescription'}
        />
      )}
      {popupMode === 'job profilesTYPECREATE' && (
        <PopUpTypeCreate
          headerOne={'job profiles'}
          reducerObeject={jobProfileType}
          typeName={'jobProfileTypeName'}
          typeDescription={'jobProfileTypeDescription'}
          setReducerObject={SET_JOB_TYPE_REDUCER_STATE}
          objectName={'jobProfileType'}
          allocationObj={'jobProfileTypeGroup'}
          groupName={'jobProfileTypeGroupName'}
          groupDescription={'jobProfileTypeGroupDescription'}
        />
      )}
      {popupMode === 'CULTURECREATE' && (
        <PopUpCultureProfileCreate headerOne={'culture profiles'} />
      )}
      {popupMode === 'JOBCREATE' && <PopUpJobProfileCreate headerOne={'job profiles'} />}
      {popupMode === 'NODECREATE' && <PopUpNodeCreate headerOne={'associate'} />}
      {popupMode === 'ASSIGNMENTCREATE' && <PopUpAssignmentCreate headerOne={'assignment'} />}
      {popupMode === 'ASSESSMENTCREATE' && <PopUpAssessmentCreate headerOne={'assessment'} />}
      {popupMode === 'ITEMCREATE' && <PopUpItemCreate />}
      {popupMode === 'CLUSTERCREATE' && <PopUpClusterCreate headerOne={'clusters'} />}
      {popupMode === 'SECTIONCREATE' && <PopUpSectionCreate headerOne={'sections'} />}
      {popupMode === 'SCALECREATE' && <PopUpScaleCreate headerOne={'scales'} />}
      <PopUpItemFramework
        isActive={isPopUpValue === 'ITEM_FRAMEWORK_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'item'}
        headerOneBadgeOne={'configuration'}
        nextPopUpValue={''}
        // inputHeader={'item'}
        // primaryheader={'configuration'}
        isItemFramework={true}
        mode={'revise'}
      />
      <LoadingComponent isActive={isLoading} />
      {popupMode === 'IMAGEPREVIEW' && (
        <PicturePreview isActive={true} imageOne={isPopUpValue} dispatch={dispatch} />
      )}
    </>
  );
};

export default DisplayPageOne;
