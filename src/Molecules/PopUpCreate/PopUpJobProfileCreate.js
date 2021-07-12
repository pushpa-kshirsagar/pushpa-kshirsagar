import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import {
  POPUP_CLOSE,
  CLEAR_TYPE_REDUCER_STATE,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_JOB_REDUCER_STATE,
  SET_JOB_DYNAMIC_SINGLE_STATE,
  SET_JOB_DYNAMIC_ARRAY_STATE,
  LOADER_START,
  CREATE_JOB_SAGA,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_NEXT_POPUP,
  GET_JOBDOMAIN_REVIEW_LIST_SAGA,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT,
  GET_JOBFUNCTION_REVIEW_LIST_SAGA,
  GET_JOBROLE_REVIEW_LIST_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_JOB_COMPETANCY_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';
import PopUpMessageGeneric from '../../PopUpGeneric/PopUpMessageGeneric';
import PopUpCheckbox from '../../PopUpInformation/PopUpCheckbox';

const PopUpJobProfileCreate = (props) => {
  const { headerOne, reducerObeject, allocationObj } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { jobProfileInformation } = useSelector((state) => state.JobProfileCreateReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const {
    selectedAssociateInfo,
    coreNodeReviewListData,
    coreGroupReviewListData,
    coreRoleReviewListData,
    jobProfilerReviewList,
    jobProfileFunctionReviewList,
    jobProfileRoleReviewList,
    coreTypeReviewListData,
    selectedInformationAllorKey,
    responseObject
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const dispatch = useDispatch();
  const [requiredErrorMsg, setRequiredErrorMsg] = useState('');
  const [jobCompetancyArr, setJobCompetancyArr] = useState('');
  const [jobCompetancyGroup, setJobCompetancyGroup] = useState('');
  const siftListData = {
    indispensable: [],
    desirable: [],
    probable: [],
    removable: []
  };
  const onClickCancelYes = () => {
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      jobProfile: jobProfileInformation
    };
    console.log('CREATE api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_JOB_SAGA, payload: reqBody });
  };
  useEffect(() => {
    if (responseObject) {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'POPUPCONTINUE' } });
    }
  }, [responseObject]);
  const updateAllocationObj = (e, stateName, actualStateName) => {
    let tagId = e.currentTarget.getAttribute('tag');
    let tagIdArr = jobProfileInformation.informationAllocation[stateName][actualStateName];
    if (tagIdArr.includes(tagId)) {
      document.getElementById(tagId).style.backgroundColor = 'white';
      tagIdArr = tagIdArr.filter(function (number) {
        return number !== tagId;
      });
    } else {
      tagIdArr.push(tagId);
      document.getElementById(tagId).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_JOB_DYNAMIC_SINGLE_STATE,
      payload: {
        objectName: 'informationAllocation',
        stateName: stateName,
        actualStateName: actualStateName,
        value: tagIdArr
      }
    });
  };
  const updateFrameworkObj = (e, objectName, stateName) => {
    let tagId = e.currentTarget.getAttribute('tag');
    let tagIdArr = jobProfileInformation.informationFramework[stateName];
    if (tagIdArr.includes(tagId)) {
      document.getElementById(tagId).style.backgroundColor = 'white';
      tagIdArr = tagIdArr.filter(function (number) {
        return number !== tagId;
      });
    } else {
      tagIdArr.push(tagId);
      document.getElementById(tagId).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_JOB_DYNAMIC_ARRAY_STATE,
      payload: {
        objectName: objectName,
        stateName: stateName,
        value: tagIdArr
      }
    });
  };
  console.log('jobProfileInformation', jobProfileInformation);
  console.log('jobProfilerReviewList', jobProfilerReviewList);
  let selectedPrimaryGroup =
    jobProfileInformation?.informationAllocation?.jobProfileGroup?.jobProfileGroupPrimary || [];
  let selectedSecondaryGroup =
    jobProfileInformation?.informationAllocation?.jobProfileGroup?.jobProfileGroupSecondary || [];
  let filteredCoreGroupReviewListDataPrimary = [];
  if (coreGroupReviewListData && coreGroupReviewListData.length > 0) {
    coreGroupReviewListData.forEach((group) => {
      // for primary popup list
      if (!selectedSecondaryGroup.includes(group.id))
        filteredCoreGroupReviewListDataPrimary.push(group);
    });
  }
  let filteredCoreGroupReviewListDataSecondary = [];
  if (coreGroupReviewListData && coreGroupReviewListData.length > 0) {
    coreGroupReviewListData.forEach((group) => {
      // for Secondary popup list
      if (!selectedPrimaryGroup.includes(group.id))
        filteredCoreGroupReviewListDataSecondary.push(group);
    });
  }
  const onClickContinueNo = () => {
    dispatch({
      type: SET_DISPLAY_PANE_THREE_STATE,
      payload: {
        headerOne: 'job profile',
        headerOneBadgeOne: 'information',
        headerOneBadgeTwo: selectedInformationAllorKey,
        responseObject: responseObject,
        reviewMode: 'revise',
        createMode: 'jobProfile'
      }
    });
  };
  const onClickContinueYes = () => {
    let requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary
    };
    // dispatch({
    //   type: SET_DISPLAY_TWO_SINGLE_STATE,
    //   payload: { stateName: 'jobProfileDomainReviewList', value: [] }
    // });
    // dispatch({
    //   type: SET_DISPLAY_TWO_SINGLE_STATE,
    //   payload: { stateName: 'jobProfileFunctionReviewList', value: [] }
    // });
    // dispatch({
    //   type: SET_DISPLAY_TWO_SINGLE_STATE,
    //   payload: { stateName: 'jobProfileRoleReviewList', value: [] }
    // });
    dispatch({
      type: GET_JOBDOMAIN_REVIEW_LIST_SAGA,
      payload: {
        request: requestObj,
        BadgeOne: '',
        BadgeTwo: '',
        BadgeThree: '',
        isMiddlePaneList: false
      }
    });
    //   dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
    //   dispatch({
    //     type: GET_JOBFUNCTION_REVIEW_LIST_SAGA,
    //     payload: {
    //       request: requestObj,
    //       BadgeOne: '',
    //       BadgeTwo: '',
    //       BadgeThree: '',
    //       isMiddlePaneList: false
    //     }
    //   });
    //   dispatch({ type: SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
    //   dispatch({
    //     type: GET_JOBROLE_REVIEW_LIST_SAGA,
    //     payload: {
    //       request: requestObj,
    //       BadgeOne: '',
    //       BadgeTwo: '',
    //       BadgeThree: '',
    //       isMiddlePaneList: false
    //     }
    //   });
  };
  const setCompetancyCoreStateReducer = () => {
    let jobCompetancyCore =
      jobProfileInformation.informationFramework.jobProfileJobCompetencyCoreTags;
    console.log('jobCompetancyCore', jobCompetancyCore);
    let arrr = jobProfilerReviewList.jobCompetency
      .map((obj) => {
        let temp = '';
        // if (obj.group === jobCompetancyGroup) {
        temp = obj.jobCompetency.filter(function (ob) {
          if (jobCompetancyCore.includes(ob.id)) return ob;
        });
        // }
        return temp[0];
      })
      .filter((notUndefined) => notUndefined !== undefined);
    console.log('arrr', arrr);
    // dispatch({
    //   type: SET_JOB_DYNAMIC_ARRAY_STATE,
    //   payload: {
    //     objectName: 'informationFramework',
    //     stateName: 'jobProfileJobCompetencyCoreObj',
    //     value: arrr
    //   }
    // });
    dispatch({
      type: SET_JOB_COMPETANCY_STATE,
      payload: arrr
    });
    // dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'POPUPCORECOMPEMSG' } });
  };
  useEffect(() => {
    console.log('useeffect');
    if (jobProfileInformation.informationFramework.jobProfileJobCompetencyCoreObj.length > 0) {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'POPUPSIFTLIST0' } });
    }
  }, [jobProfileInformation.informationFramework.jobProfileJobCompetencyCoreObj]);
  const updateCompetencySiftList = (id, key) => {
    console.log(id, key);
    let siftList = jobProfileInformation.informationFramework.jobProfileJobCompetencySifted;
    siftList[key].push(id);
    console.log(siftList);
  };
  const openRightPaneForRange = () => {
    dispatch({
      type: SET_DISPLAY_PANE_THREE_STATE,
      payload: {
        headerOne: 'job profile',
        headerOneBadgeOne: 'information',
        headerOneBadgeTwo: selectedInformationAllorKey,
        responseObject: responseObject,
        reviewMode: 'revise',
        createMode: 'jobProfile'
      }
    });
    dispatch({
      type: SET_MOBILE_PANE_STATE,
      payload: 'displayPaneThree'
    });
  };
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'jobProfileName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        isRequired={true}
        typeOfSetObject={SET_JOB_REDUCER_STATE}
        basicInfo={jobProfileInformation.informationBasic}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'jobProfileDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_JOB_REDUCER_STATE}
        basicInfo={jobProfileInformation.informationBasic}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'GROUPPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'MANAGERPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        ListData={filteredCoreGroupReviewListDataPrimary}
        selectedList={
          jobProfileInformation.informationAllocation.jobProfileGroup.jobProfileGroupPrimary
        }
        textOne={'jobProfileGroupName'}
        textTwo={'jobProfileGroupDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'jobProfileGroup', 'jobProfileGroupPrimary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'MANAGERPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a group'}
        ListData={filteredCoreGroupReviewListDataSecondary}
        selectedList={
          jobProfileInformation.informationAllocation.jobProfileGroup.jobProfileGroupSecondary
        }
        textOne={'jobProfileGroupName'}
        textTwo={'jobProfileGroupDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'jobProfileGroup', 'jobProfileGroupSecondary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'NODEPOPUP'}
        inputHeader={'manager'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a manager'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Manager' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Manager' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Manager' } }
        ]}
        selectedList={[]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'NODEPOPUP'}
        inputHeader={'manager'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a manager'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Manager' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Manager' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Manager' } }
        ]}
        selectedList={[]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'TYPEPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a node'}
        ListData={coreNodeReviewListData}
        selectedList={
          jobProfileInformation.informationAllocation.jobProfileNode.jobProfileNodePrimary
        }
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'jobProfileNode', 'jobProfileNodePrimary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'TYPEPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a node'}
        ListData={coreNodeReviewListData}
        selectedList={
          jobProfileInformation.informationAllocation.jobProfileNode.jobProfileNodeSecondary
        }
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'jobProfileNode', 'jobProfileNodeSecondary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'type'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a type'}
        ListData={coreTypeReviewListData}
        selectedList={
          jobProfileInformation.informationAllocation.jobProfileType.jobProfileTypePrimary
        }
        textOne={'jobProfileTypeName'}
        textTwo={'jobProfileTypeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'jobProfileType', 'jobProfileTypePrimary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'type'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a type'}
        ListData={coreTypeReviewListData}
        selectedList={
          jobProfileInformation.informationAllocation.jobProfileType.jobProfileTypeSecondary
        }
        textOne={'jobProfileTypeName'}
        textTwo={'jobProfileTypeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'jobProfileType', 'jobProfileTypeSecondary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpConfirm
        isActive={isPopUpValue === 'CANCELPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'cancel'}
        headerOneBadgeOne={''}
        mode={'cancel'}
        onClickYes={onClickCancelYes}
      />
      <PopUpConfirm
        isActive={isPopUpValue === 'CONFIRMATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'create'}
        headerOneBadgeTwo={''}
        onClickYes={onClickYes}
      />
      <PopUpConfirm
        isActive={isPopUpValue === 'POPUPCONTINUE'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'continue'}
        headerOneBadgeTwo={''}
        onClickYes={onClickContinueYes}
        mode={'error'}
        onClickNoFun={onClickContinueNo}
      />
      <PopUpMessageGeneric
        isActive={isPopUpValue === 'POPUPDOMAINMSG'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'POPUPJOBDOMAIN'}
        textOneOne={'select'}
        textOneTwo={'one or more'}
        textOneThree={'job domains'}
        mode={'next'}
        textOneFour={'from the following list'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'POPUPJOBDOMAIN'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'POPUPFUNCTIONMSG'}
        prevPopUpValue={'POPUPDOMAINMSG'}
        inputHeader={'job domain'}
        inputHeaderBadge={''}
        infoMsg={'select a job domain'}
        isRequired={true}
        minimumSelected={1}
        ListData={jobProfilerReviewList?.jobDomain}
        onClickEvent={(e) => {
          updateFrameworkObj(e, 'informationFramework', 'jobProfileJobDomain');
        }}
        selectedList={jobProfileInformation.informationFramework.jobProfileJobDomain}
        textOne={'jobProfilerFrameworkSecondary'}
        // textTwo={'jobProfilerFrameworkSecondaryDescription'}
        // setErrorMsg={setRequiredErrorMsg}
        // errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpMessageGeneric
        isActive={isPopUpValue === 'POPUPFUNCTIONMSG'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'POPUPJOBFUNCTION'}
        textOneOne={'select'}
        textOneTwo={'one or more'}
        textOneThree={'job functions'}
        mode={'next'}
        textOneFour={'from the following list'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'POPUPJOBFUNCTION'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'POPUPROLEMSG'}
        prevPopUpValue={'POPUPFUNCTIONMSG'}
        inputHeader={'job function'}
        inputHeaderBadge={''}
        infoMsg={'select a job function'}
        isRequired={true}
        minimumSelected={1}
        ListData={jobProfilerReviewList?.jobFunction || []}
        onClickEvent={(e) => {
          updateFrameworkObj(e, 'informationFramework', 'jobProfileJobFunction');
        }}
        selectedList={jobProfileInformation.informationFramework.jobProfileJobFunction}
        textOne={'jobProfilerFrameworkSecondary'}
        // textTwo={'jobProfilerFrameworkSecondaryDescription'}
        setErrorMsg={null}
        errorMsg={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpMessageGeneric
        isActive={isPopUpValue === 'POPUPROLEMSG'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'POPUPJOBROLE'}
        textOneOne={'select'}
        textOneTwo={'one or more'}
        textOneThree={'job roles'}
        mode={'next'}
        textOneFour={'from the following list'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'POPUPJOBROLE'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'POPUPCOMPEMSG'}
        prevPopUpValue={'POPUPROLEMSG'}
        inputHeader={'job role'}
        inputHeaderBadge={''}
        infoMsg={'select a job role'}
        isRequired={true}
        minimumSelected={1}
        ListData={jobProfilerReviewList?.jobRole}
        onClickEvent={(e) => {
          updateFrameworkObj(e, 'informationFramework', 'jobProfileJobRole');
        }}
        selectedList={jobProfileInformation.informationFramework.jobProfileJobRole}
        textOne={'jobProfilerFrameworkSecondary'}
        // textTwo={'jobProfilerFrameworkSecondaryDescription'}
        setErrorMsg={null}
        errorMsg={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpMessageGeneric
        isActive={isPopUpValue === 'POPUPCOMPEMSG'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'POPUPCOMPITANCY0'}
        textOneOne={'shortlist'}
        textOneTwo={'eight or more'}
        textOneThree={'job competencies'}
        textOneFour={'from the following eleven lists'}
        mode={'next'}
      />
      {jobProfilerReviewList
        ? jobProfilerReviewList.jobCompetency.map((value, index) => {
            return (
              <PopUpReviewList
                isActive={isPopUpValue === `POPUPCOMPITANCY${index}`}
                headerPanelColour={'genericOne'}
                headerOne={headerOne}
                headerOneBadgeOne={'information'}
                inputHeader={'job competency'}
                inputHeaderBadge={'short list'}
                infoMsg={'eight or more job competencies'}
                nextPopUpValue={
                  index < jobProfilerReviewList.jobCompetency.length - 1
                    ? `POPUPCOMPITANCY${index + 1}`
                    : 'POPUPSIFTMSG'
                }
                // nextPopUpValue={`POPUPCOMPITANCY${index + 1}`}
                ListData={value.jobCompetency}
                // onClickEvent={updateJobCompetancy}
                onClickEvent={(e) => {
                  updateFrameworkObj(e, 'informationFramework', 'jobProfileJobCompetencyCoreTags');
                }}
                handleClickOnCorrect={null}
                selectedList={
                  jobProfileInformation.informationFramework.jobProfileJobCompetencyCoreTags
                }
                textOne={'jobProfilerFrameworkSecondary'}
                textTwo={'jobDimensionFrameworkSecondaryDescriptionPrimary'}
                tooltipActiveText={'jobProfilerFrameworkSecondaryDescriptionSecondary'}
                dataValue={value.group}
              />
            );
          })
        : null}
      <PopUpMessageGeneric
        isActive={isPopUpValue === 'POPUPSIFTMSG'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'onClickRevise'}
        handleClickFun={setCompetancyCoreStateReducer}
        textOneOne={'sift'}
        textOneTwo={''}
        textOneThree={'job competencies'}
        textOneFour={''}
        mode={'next'}
      />
      {jobProfileInformation?.informationFramework?.jobProfileJobCompetencyCoreObj.map(
        (value, index) => {
          return (
            <PopUpCheckbox
              isActive={isPopUpValue === `POPUPSIFTLIST${index}`}
              headerPanelColour={'genericOne'}
              headerOne={headerOne}
              headerOneBadgeOne={'information'}
              inputHeader={'job competency'}
              inputHeaderBadge={'sift list'}
              infoMsg={''}
              onClickNext={updateCompetencySiftList}
              isJobProfileList={true}
              id={value.id}
              textOne={value.jobProfilerFrameworkSecondary}
              textTwo={value.jobProfilerFrameworkSecondaryDescriptionPrimary}
              valueArr={['indispensable', 'desirable', 'probable', 'removable']}
              nextPopUpValue={
                index <
                jobProfileInformation.informationFramework.jobProfileJobCompetencyCoreObj.length - 1
                  ? `POPUPSIFTLIST${index + 1}`
                  : 'POPUPCORECOMPEMSG'
              }
              // nextPopUpValue={'POPUPCORECOMPEMSG'}
            />
          );
        }
      )}

      <PopUpMessageGeneric
        isActive={isPopUpValue === 'POPUPCORECOMPEMSG'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        // nextPopUpValue={'POPUPRANGEMSG'}
        nextPopUpValue={'POPUPCOMPETENCYLIST'}
        textOneOne={'select'}
        textOneTwo={'minimum eight or maximum twelve'}
        textOneThree={'core'}
        textOneFour={'job competencies'}
        mode={'next'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'POPUPCOMPETENCYLIST'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'POPUPRANGEMSG'}
        // prevPopUpValue={'POPUPROLEMSG'}
        inputHeader={'job competency'}
        inputHeaderBadge={'core'}
        infoMsg={'select a job competency'}
        isRequired={true}
        minimumSelected={1}
        ListData={jobProfileInformation.informationFramework.jobProfileJobCompetencyCoreObj}
        onClickEvent={(e) => {
          updateFrameworkObj(e, 'informationFramework', 'jobProfileJobCompetencyCore');
        }}
        selectedList={jobProfileInformation.informationFramework.jobProfileJobCompetencyCore}
        textOne={'jobProfilerFrameworkSecondary'}
        // textTwo={'jobProfilerFrameworkSecondaryDescription'}
        setErrorMsg={null}
        errorMsg={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpMessageGeneric
        isActive={isPopUpValue === 'POPUPRANGEMSG'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        // nextPopUpValue={'is'}
        nextPopUpValue={'onClickRevise'}
        handleClickFun={openRightPaneForRange}
        textOneOne={'range'}
        textOneTwo={'for'}
        textOneThree={'core'}
        textOneFour={'job competencies'}
        mode={'next'}
      />
      <PopUpMessageGeneric
        isActive={isPopUpValue === 'POPUPWEIGHTEMSG'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'POPUPCOMPITANCY0'}
        textOneOne={'weightage'}
        textOneTwo={'for'}
        textOneThree={'core'}
        textOneFour={'job competencies'}
        mode={'next'}
      />
    </div>
  );
};

export default PopUpJobProfileCreate;
