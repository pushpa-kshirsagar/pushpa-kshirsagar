import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  CLEAR_ROLE_REDUCER_STATE,
  POPUP_CLOSE,
  CREATE_ASSESSEE_ROLE_SAGA,
  SET_ASSESSEE_ROLE_REDUCER_STATE,
  LOADER_START,
  SET_ROLE_DYNAMIC_STATE,
  UPDATE_ASSESSEE_PERSONAL_INFO,
  UPDATE_ASSESSEE_ENGAGEMENT_INFO,
  SET_DISPLAY_THREE_SINGLE_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';
import PopUpTagSecondary from '../../PopUpInformation/PopUpTagSecondary';
import PopUpDropList from '../../PopUpInformation/PopUpDropList';

const PopUpAssesseeRoleCreate = () => {
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { assesseeRole } = useSelector((state) => state.RoleCreateReducer);
  const { selectedAssociateInfo, coreRoleReviewListData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const { reviewMode, responseObject, statusPopUpValue } = useSelector((state) => state.DisplayPaneThreeReducer);
  const [roleSelectedError, setRoleSelectedError] = useState('');
  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
    dispatch({ type: CLEAR_ROLE_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let allocationObj = {
        assesseeRoleGroup: assesseeRole.informationAllocation.assesseeRoleGroup[0]
    };
    var requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assesseeRole: {
        informationBasic: assesseeRole.informationBasic,
        informationAllocation: allocationObj
      }
    };

    console.log('CREATE Role api', requestObj);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSESSEE_ROLE_SAGA, payload: requestObj });
  };
  console.log('ROLE ASSESSEE POPUP>>>>>>>>>.', assesseeRole);
  const updateRoleGroup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    setRoleSelectedError('');
    let tagId = e.currentTarget.getAttribute('tag');
    let tagIdArr = assesseeRole.informationAllocation.assesseeRoleGroup;
    if (tagIdArr.includes(tagId)) {
      document.getElementById(tagId).style.backgroundColor = 'white';
      tagIdArr = tagIdArr.filter(function (number) {
        return number !== tagId;
      });
    } else {
      var arr = [];
      tagIdArr = [...arr];
      tagIdArr.push(tagId);
      document.getElementById(tagId).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_ROLE_DYNAMIC_STATE,
      payload: {
        objectName: 'assesseeRole',
        stateName: 'informationAllocation',
        actualStateName: 'assesseeRoleGroup',
        value: tagIdArr
      }
    });
  };
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'assesseeRoleName'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={assesseeRole.informationBasic}
        typeOfSetObject={SET_ASSESSEE_ROLE_REDUCER_STATE}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'assesseeRoleDescription'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        basicInfo={assesseeRole.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_ASSESSEE_ROLE_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ROLEGROUPPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ROLEGROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={''}
        isRequired={true}
        selectedList={assesseeRole?.informationAllocation?.assesseeRoleGroup}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        infoMsg={'select a group'}
        ListData={coreRoleReviewListData}
        textOne={'assesseeRoleGroupName'}
        textTwo={'assesseeRoleGroupDescription'}
        onClickEvent={updateRoleGroup}
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
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TAGREADONLYPRIMARYPOPUP'}
        label={'tag'}
        labelBadgeOne={'primary'}
        actualLableValue={'assesseeTagPrimary'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        basicInfo={
          responseObject?.informationEngagement?.assesseeRoleTag?.assesseeRoleTagPrimary || ''
        }
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TENURESATRTDATEPOPUP'}
        label={'tenure'}
        labelBadgeOne={'start'}
        actualLableValue={''}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        basicInfo={
          responseObject?.informationEngagement?.assesseeRoleTenure
            ?.assesseeRoleTenureDateTimeStart || 'mm/dd/yyyy --:-- --'
        }
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TENUREENDDATEPOPUP'}
        label={'tenure'}
        labelBadgeOne={'end'}
        actualLableValue={''}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        basicInfo={
          responseObject?.informationEngagement?.assesseeRoleTenure
            ?.assesseeRoleTenureDateTimeEnd || 'mm/dd/yyyy --:-- --'
        }
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'STATUSPOPUP'}
        tag={'assesseeStatus'}
        label={'status'}
        listSelect={[
          { id: 'Active', name: 'Active' },
          { id: 'Suspended', name: 'Suspended' },
          { id: 'Terminated', name: 'Terminated' },
          { id: 'Unverified', name: 'Unverified' },
          { id: 'Confirmed', name: 'Confirmed' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        isRequired={true}
        basicInfo={statusPopUpValue}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSESSEE_PERSONAL_INFO}
        handleNextPopupValue={() => {}}
        isNotRevised={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTagSecondary
        isActive={isPopUpValue === 'TAGSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        tagSecondary={assesseeRole?.informationEngagement || {}}
        signInSetup={assesseeRole?.informationSetup || {}}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_ENGAGEMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
    </div>
  );
};

export default PopUpAssesseeRoleCreate;
