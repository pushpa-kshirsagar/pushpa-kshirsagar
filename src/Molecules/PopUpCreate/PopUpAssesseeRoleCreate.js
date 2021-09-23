import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import {
  CLEAR_ROLE_REDUCER_STATE,
  POPUP_CLOSE,
  CREATE_ASSESSEE_ROLE_SAGA,
  SET_ASSESSEE_ROLE_REDUCER_STATE,
  LOADER_START,
  SET_ROLE_DYNAMIC_STATE,
  UPDATE_ASSESSEE_PERSONAL_INFO,
  UPDATE_ASSESSEE_ENGAGEMENT_INFO,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_SETUP_PERMISSION,
  SET_ASSESSEE_ROLE_CLASSIFICAION_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';
import PopUpTagSecondary from '../../PopUpInformation/PopUpTagSecondary';
import PopUpDropList from '../../PopUpInformation/PopUpDropList';
import PopUpCheckbox from '../../PopUpInformation/PopUpCheckbox';

const PopUpAssesseeRoleCreate = () => {
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { assesseeRole } = useSelector((state) => state.RoleCreateReducer);
  const {
    selectedAssociateInfo,
    coreRoleReviewListData,
    permissionStateOne,
    permissionStateTwo,
    permissionStateThree
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { reviewMode, responseObject, statusPopUpValue } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
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
    var requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assesseeRole: {
        informationBasic: assesseeRole.informationBasic,
        informationSetup: assesseeRole.informationSetup
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
    let tagIdArr =
      assesseeRole.informationSetup.assesseeRoleClassification.assesseeRoleClassificationPrimary;
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
      type: SET_SETUP_PERMISSION,
      payload: {
        objectName: 'assesseeRole',
        stateName: 'assesseeRoleClassification',
        actualStateName: 'assesseeRoleClassificationPrimary',
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
      {/* <PopUpReviewList
        isActive={isPopUpValue === 'ROLEGROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'classification'}
        inputHeaderBadge={''}
        isRequired={true}
        minimumSelected={1}
        selectedList={assesseeRole?.informationSetup?.assesseeRoleClassificationPrimary}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        infoMsg={'select a classification'}
        ListData={coreRoleReviewListData}
        textOne={'assesseeRoleClassificationName'}
        textTwo={'assesseeRoleClassificationDescription'}
        onClickEvent={updateRoleGroup}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      /> */}
      <PopUpDropList
        isActive={isPopUpValue === 'ROLEGROUPPOPUP'}
        tag={'assesseeRoleClassificationPrimary'}
        label={'classification'}
        listSelect={[
          { id: 'Bespoke', name: 'Bespoke' },
          { id: 'Generic', name: 'Generic' }
        ]}
        mappingValue={'id'}
        inputHeader={''}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        labelval={''}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        isRequired={true}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        basicInfo={assesseeRole?.informationSetup?.assesseeRoleClassificationPrimary}
        typeOfSetObject={SET_ASSESSEE_ROLE_CLASSIFICAION_STATE}
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
      <PopUpCheckbox
        isActive={isPopUpValue === 'PERMISSIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        inputHeader={permissionStateOne}
        inputHeaderBadge={permissionStateTwo}
        typeOfStateObj={permissionStateThree}
        objectName={'assesseeRole'}
        stateName={'assesseeRolePermission'}
        informationArr={
          permissionStateTwo === 'distinct'
            ? [
                { id: 'all', name: 'all' },
                { id: 'key', name: 'key' }
              ]
            : [{ id: 'key', name: 'key' }]
        }
        informationValue={'assesseePermissionInformation'}
        isRolePermission
        valueArr={['create', 'delete', 'review', 'revise', 'share']}
        valueArrState={assesseeRole.informationSetup?.assesseeRolePermission[permissionStateThree]}
        nextPopUpValue={''}
        typeOfSetObject={SET_SETUP_PERMISSION}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
    </div>
  );
};

export default PopUpAssesseeRoleCreate;
