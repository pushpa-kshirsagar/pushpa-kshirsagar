import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PopUpPicture from '../PopUpInformation/PopUpPicture';
import PopUpTextField from '../PopUpInformation/PopUpTextField';
import PopUpTelephone from '../PopUpInformation/PopUpTelephone';
import PopUpAddress from '../PopUpInformation/PopUpAddress';
import PopUpReviewList from '../PopUpInformation/PopUpReviewList';
import PopUpAssesseeName from '../PopUpInformation/PopUpAssesseeName';
import PopUpAddressEmail from '../PopUpInformation/PopUpAddressEmail';
import PopUpConfirmation from '../PopUpGeneric/PopUpConfirmation';
import PopUpDropList from '../PopUpInformation/PopUpDropList';
import {
  SET_NEXT_POPUP,
  CLEAR_ASSOCIATE_INFO,
  POPUP_CLOSE,
  UPDATE_ASSOCIATE_BASIC_INFO,
  UPDATE_ASSOCIATE_WORKADDRESS_INFO,
  UPDATE_ASSOCIATE_WORKTELEPHONE_INFO,
  UPDATE_ASSOCIATE_ADMIN_BASIC_INFO,
  UPDATE_ASSESSEE_BASIC_INFO,
  UPDATE_ASSESSEE_ADDRESS_EMAIL_PRIMARY_INFO,
  UPDATE_ASSESSEE_MOBILE_INFO,
  UPDATE_ASSESSEE_PERSONAL_INFO,
  CREATE_ASSOCIATE_SAGA,
  LOADER_START,
  CLEAR_ASSESSEE_INFO,
  SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
  UPDATE_ASSOCIATE_SETUP_INFO
} from '../actionType';
const PopUpSignOnAssociate = () => {
  const { popupMode, isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const associateInfo = useSelector((state) => state.AssociateCreateReducer);
  const assesseeInfo = useSelector((state) => state.AssesseeCreateReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const informationContact = assesseeInfo.informationContact;
  const { coreGroupReviewListData, selectedAssociateInfo, coreRoleReviewListData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const [roleSelectedError, setRoleSelectedError] = useState('');
  const history = useHistory();
  console.log(associateInfo);
  console.log('==================');
  const dispatch = useDispatch();
  useEffect(() => {
    if (assesseeInfo.assesseeInformationData) {
      console.log(popupMode);
      if (popupMode === 'ASSOCIATE_SIGN_ON') {
        let path = `/signIn`;
        history.push(path);
      } else {
        dispatch({ type: CLEAR_ASSOCIATE_INFO });
        dispatch({ type: CLEAR_ASSESSEE_INFO });
        dispatch({ type: POPUP_CLOSE });
      }
    }
  }, [assesseeInfo.assesseeInformationData, history]);
  const CreateApi = () => {
    const {
      informationBasic,
      informationAllocation,
      informationContact,
      informationPersonal,
      tempCommunication
    } = assesseeInfo;
    let assesseeContactObj = informationContact;

    if (tempCommunication === 'email address (primary)') {
      assesseeContactObj.assesseeAddressEmailPrimary.assesseeAddressEmailCommunication = true;
    }
    if (tempCommunication === 'email address (secondary)') {
      assesseeContactObj.assesseeAddressEmailSecondary.assesseeAddressEmailCommunication = true;
    }
    let requestObect = {
      assesseeId: selectedAssociateInfo?.assesseeId || '0123456',
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary ||
        '6083d82a5c42683849ce14d0',
      associate: {
        informationBasic: associateInfo.informationBasic,
        informationAllocation: associateInfo.informationAllocation,
        informationContact: associateInfo.informationContact
      },
      assessee: {
        informationBasic: informationBasic,
        informationAllocation: informationAllocation,
        informationContact: informationContact,
        // informationEngagement: informationEngagement,
        informationPersonal: informationPersonal
        // informationSetup: informationSetup
      }
    };
    console.log('ONCLICK YES', requestObect);
    console.log('loading start');
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSOCIATE_SAGA, payload: requestObect });
  };
  const handleNextPopupValue = () => {
    // alert(isPopUpValue);
    let tempCommunication = assesseeInfo.tempCommunication;
    let secondemail = informationContact.assesseeAddressEmailSecondary.assesseeAddressEmail;
    if (isPopUpValue === 'EMAILPOPUP') {
      if (tempCommunication === '' || secondemail !== '') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'EMAILSECONDARYPOPUP' } });
      } else {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'MOBILETELEPHONEPOPUP' } });
      }
    } else if (isPopUpValue === 'EMAILSECONDARYPOPUP') {
      if (tempCommunication === '') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'FORCETOSELECTCOMMUNICATION' } });
      } else {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'MOBILETELEPHONEPOPUP' } });
      }
    } else if (isPopUpValue === 'PICTUREPOPUP') {
      // if (popupMode === 'ASSOCIATE_SIGN_ON') {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'EMAILPOPUP' } });
      // } else {
      // dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'ASSESSEEGROUPLISTPOPUP' } });
      // }
    } else {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'CONFIRMATIONPOPUP' } });
    }
  };
  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_ASSOCIATE_INFO });
    dispatch({ type: POPUP_CLOSE });
  };

  const onClickYes = () => {
    if (popupMode === 'ASSOCIATE_SIGN_ON' || popupMode === 'ASSOCIATE_CREATE') {
      dispatch({
        type: SET_NEXT_POPUP,
        payload: { isPopUpValue: 'NAMEPOPUP' }
      });
    }
  };
  const updateAssociateGroups = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    console.log(associateInfo.informationAllocation.associateGroup.associateGroupPrimary);
    let groupid = e.currentTarget.getAttribute('tag');
    let groupArr = associateInfo.informationAllocation.associateGroup.associateGroupPrimary;
    if (groupArr.includes(groupid)) {
      document.getElementById(groupid).style.backgroundColor = 'white';
      groupArr = groupArr.filter(function (number) {
        return number !== groupid;
      });
    } else {
      groupArr.push(groupid);
      document.getElementById(groupid).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'associateGroup',
        actualStateName: 'associateGroupPrimary',
        value: groupArr
      }
    });
  };
  const updateAssociateRoles = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    console.log(associateInfo.informationAllocation.associateRole.associateRolePrimary);
    let roleid = e.currentTarget.getAttribute('tag');
    let roleArr = associateInfo.informationAllocation.associateRole.associateRolePrimary;
    setRoleSelectedError('');
    if (roleArr.includes(roleid)) {
      document.getElementById(roleid).style.backgroundColor = 'white';
      roleArr = roleArr.filter(function (number) {
        return number !== roleid;
      });
    } else {
      roleArr.push(roleid);
      document.getElementById(roleid).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'associateRole',
        actualStateName: 'associateRolePrimary',
        value: roleArr
      }
    });
  };
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEALIASPOPUP'}
        label={'name'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={'DESCRIPTIONPOPUP'}
        actualLableValue={'associateName'}
        basicInfo={associateInfo.informationBasic}
        typeOfSetObject={UPDATE_ASSOCIATE_BASIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'DESCRIPTIONPOPUP'}
        label={'description'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={false}
        actualLableValue={'associateDescription'}
        basicInfo={associateInfo.informationBasic}
        typeOfSetObject={UPDATE_ASSOCIATE_BASIC_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'ASSOCIATEPICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        basicInfo={associateInfo.basicInfo}
        nextPopUpValue={popupMode === 'ASSOCIATE_SIGN_ON' ? 'WORKADDRESSPOPUP' : 'GROUPPOPUP'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'MANAGERPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        ListData={coreGroupReviewListData}
        textOne={'associateGroupName'}
        textTwo={'associateGroupDescription'}
        onClickEvent={updateAssociateGroups}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
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
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'ROLEPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a node'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Node' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Node' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Node' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ROLEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'WORKADDRESSPOPUP'}
        inputHeader={'role'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a role'}
        ListData={coreRoleReviewListData}
        textOne={'associateRoleName'}
        textTwo={'associateRoleDescription'}
        onClickEvent={updateAssociateRoles}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        isRequired={true}
        selectedList={associateInfo?.informationAllocation?.associateRole.associateRolePrimary}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpAddress
        isActive={isPopUpValue === 'WORKADDRESSPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        inputHeader={'work address'}
        primaryheader={'primary'}
        nextPopUpValue={'WORKTELEPHONE'}
        isRequired={true}
        basicInfo={associateInfo.informationContact.associateAddressWorkPrimary}
        countryCode={'associateTelephoneCountryRegion'}
        typeOfSetObject={UPDATE_ASSOCIATE_WORKADDRESS_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpAddress
        isActive={isPopUpValue === 'WORKADDRESSSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        inputHeader={'work address'}
        primaryheader={'secondary'}
        nextPopUpValue={''}
        isRequired={true}
        basicInfo={associateInfo.informationContact.associateAddressWorkPrimary}
        countryCode={'associateTelephoneCountryRegion'}
        typeOfSetObject={UPDATE_ASSOCIATE_WORKADDRESS_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTelephone
        isActive={isPopUpValue === 'WORKTELEPHONE'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        inputHeader={'work telephone'}
        primaryheader={'primary'}
        basicInfo={associateInfo.informationContact.associateTelephoneWorkPrimary}
        isMobileState={false}
        typeOfSetObject={UPDATE_ASSOCIATE_WORKTELEPHONE_INFO}
        nextPopUpValue={'ASSOCIATECONFIRMATIONPOPUP'}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTelephone
        isActive={isPopUpValue === 'WORKTELEPHONESECONDARY'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        inputHeader={'work telephone'}
        primaryheader={'secondary'}
        basicInfo={associateInfo.informationContact.associateTelephoneWorkPrimary}
        isMobileState={false}
        typeOfSetObject={UPDATE_ASSOCIATE_WORKTELEPHONE_INFO}
        nextPopUpValue={''}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'DATEFORMATPOPUP'}
        tag={'associateDateFormat'}
        label={'date'}
        listSelect={[
          { id: 'dd/mm/yyyy', name: 'dd/mm/yyyy' },
          { id: 'mm/dd/yyyy', name: 'mm/dd/yyyy' }
        ]}
        mappingValue={'id'}
        labelval={'date'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo.informationSetup || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'DICTIONARYPOPUP'}
        tag={'associateDictionary'}
        label={'dictionary'}
        listSelect={[
          { id: 'Generic', name: 'Generic' },
          { id: 'iGuru Career', name: 'iGuru Career' },
          { id: 'iGuru Education', name: 'iGuru Education' },
          { id: 'iGuru Occupation', name: 'iGuru Occupation' },
          { id: 'iGuru Pulse', name: 'iGuru Pulse' }
        ]}
        mappingValue={'id'}
        labelval={'dictionary'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo.informationSetup || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'LANGUAGEPOPUP'}
        tag={'associateLanguage'}
        label={'language'}
        listSelect={[{ id: 'English (India)', name: 'English (India)' }]}
        mappingValue={'id'}
        labelval={'language'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo.informationSetup || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'PEOPLEPOPUP'}
        tag={'assesseeNameFormat'}
        label={'people'}
        listSelect={[
          { id: 'First-Name Other-Name Last-Name', name: 'First-Name Other-Name Last-Name' },
          { id: 'Last-Name First-Name Other-Name', name: 'Last-Name First-Name Other-Name' }
        ]}
        mappingValue={'id'}
        labelval={'people'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo.informationSetup || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'TIMEPOPUP'}
        tag={'associateTimeFormat'}
        label={'time'}
        listSelect={[
          { id: '12 Hours', name: '12 Hours' },
          { id: '24 Hours', name: '24 Hours' }
        ]}
        mappingValue={'id'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo.informationSetup || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'WEBSITEADDRESSPOPUP'}
        label={'website address'}
        labelBadgeOne={'primary'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={false}
        actualLableValue={'associateAddressWebsitePrimary'}
        basicInfo={associateInfo.informationBasic}
        typeOfSetObject={UPDATE_ASSOCIATE_BASIC_INFO}
        nextPopUpValue={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'WEBSITEADDRESSSECONDARYPOPUP'}
        label={'website address'}
        labelBadgeOne={'secondary'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={false}
        actualLableValue={'associateAddressWebsitePrimary'}
        basicInfo={associateInfo.informationBasic}
        typeOfSetObject={UPDATE_ASSOCIATE_BASIC_INFO}
        nextPopUpValue={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TAGSTATUTORYPOPUP'}
        label={'tag'}
        labelBadgeOne={'statutory'}
        actualLableValue={'associateTagStatutory'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        basicInfo={assesseeInfo.informationBasic}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSOCIATE_BASIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpConfirmation
        isActive={isPopUpValue === 'ASSOCIATECONFIRMATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'create'}
        onClickYes={onClickYes}
      />
      <PopUpAssesseeName
        isActive={isPopUpValue === 'NAMEPOPUP'}
        inputHeader={'name'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={assesseeInfo.informationBasic}
        typeOfSetObject={UPDATE_ASSESSEE_BASIC_INFO}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'alias'}
        actualLableValue={'assesseeAlias'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'PICTUREPOPUP'}
        basicInfo={assesseeInfo.informationBasic}
        typeOfSetObject={UPDATE_ASSESSEE_BASIC_INFO}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'EMAILPOPUP'}
        basicInfo={associateInfo.adminBasicInfo}
        typeOfSetObject={UPDATE_ASSOCIATE_ADMIN_BASIC_INFO}
        handleNextPopupValue={handleNextPopupValue}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ASSESSEEGROUPLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'ASSESSEEMANAGERLISTPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Group' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Group' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Group' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ASSESSEEMANAGERLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'ASSESSEENODELISTPOPUP'}
        inputHeader={'manager'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a role'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Manager' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Manager' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Manager' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ASSESSEENODELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'ASSESSEEROLELISTPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a node'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Node' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Node' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Node' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ASSESSEEROLELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'EMAILPOPUP'}
        inputHeader={'role'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a role'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Role' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Role' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Role' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
      />
      <PopUpAddressEmail
        isActive={isPopUpValue === 'EMAILPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        primaryLabel={'email address'}
        // nextPopUpValue={'MOBILETELEPHONEPOPUP'}
        tag={'assesseeAddressEmail'}
        basicInfo={assesseeInfo.informationContact.assesseeAddressEmailPrimary}
        typeOfSetObject={UPDATE_ASSESSEE_ADDRESS_EMAIL_PRIMARY_INFO}
        tempCommunication={assesseeInfo.tempCommunication}
        handleNextPopupValue={handleNextPopupValue}
      />
      <PopUpTelephone
        isActive={isPopUpValue === 'MOBILETELEPHONEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        inputHeader={'mobile telephone'}
        primaryheader={'primary'}
        nextPopUpValue={'SINGLEDROPDOWNPOPUP'}
        basicInfo={assesseeInfo.informationContact.assesseeTelephoneMobilePrimary}
        isMobileState={true}
        signInSetup={assesseeInfo.informationSetup}
        typeOfSetObject={UPDATE_ASSESSEE_MOBILE_INFO}
        // handleNextPopupValue={handleNextPopupValue}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'SINGLEDROPDOWNPOPUP'}
        tag={'assesseeGender'}
        label={'gender'}
        listSelect={[
          { id: 'Female', name: 'Female' },
          { id: 'Male', name: 'Male' },
          { id: 'Unlisted', name: 'Unlisted' }
        ]}
        mappingValue={'id'}
        labelval={'gender'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        basicInfo={assesseeInfo.informationPersonal}
        typeOfSetObject={UPDATE_ASSESSEE_PERSONAL_INFO}
      />
      <PopUpConfirmation
        isActive={isPopUpValue === 'CONFIRMATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'create'}
        onClickYes={CreateApi}
      />
      <PopUpConfirmation
        isActive={isPopUpValue === 'CANCELPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'cancel'}
        headerOneBadgeOne={''}
        mode={'cancel'}
        onClickYes={onClickCancelYes}
      />
    </div>
  );
};

export default PopUpSignOnAssociate;
