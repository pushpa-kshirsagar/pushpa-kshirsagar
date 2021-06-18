import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  POPUP_CLOSE,
  CLEAR_TYPE_REDUCER_STATE,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_JOB_REDUCER_STATE,
  SET_JOB_DYNAMIC_SINGLE_STATE,
  LOADER_START,
  CREATE_JOB_SAGA
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';

const PopUpJobProfileCreate = (props) => {
  const { headerOne, reducerObeject, allocationObj } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { jobProfileInformation } = useSelector((state) => state.JobProfileCreateReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const {
    selectedAssociateInfo,
    coreNodeReviewListData,
    coreGroupReviewListData,
    coreTypeReviewListData
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const dispatch = useDispatch();
  const [requiredErrorMsg, setRequiredErrorMsg] = useState('');

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
  console.log('jobProfileInformation', jobProfileInformation);
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
        ListData={coreGroupReviewListData}
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
      <PopUpConfirmation
        isActive={isPopUpValue === 'CANCELPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'cancel'}
        headerOneBadgeOne={''}
        mode={'cancel'}
        onClickYes={onClickCancelYes}
      />
      <PopUpConfirmation
        isActive={isPopUpValue === 'CONFIRMATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'create'}
        headerOneBadgeTwo={''}
        onClickYes={onClickYes}
      />
    </div>
  );
};

export default PopUpJobProfileCreate;
