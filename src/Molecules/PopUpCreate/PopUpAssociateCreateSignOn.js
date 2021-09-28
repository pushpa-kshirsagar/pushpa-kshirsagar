import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpTelephone from '../../PopUpInformation/PopUpTelephone';
import PopUpAddress from '../../PopUpInformation/PopUpAddress';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';
import PopUpAssesseeName from '../../PopUpInformation/PopUpAssesseeName';
import PopUpAddressEmail from '../../PopUpInformation/PopUpAddressEmail';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import PopUpDropList from '../../PopUpInformation/PopUpDropList';
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
  UPDATE_ASSOCIATE_SETUP_INFO,
  UPDATE_ASSOCIATE_WEBSITE_INFO,
  UPDATE_ASSOCIATE_WORKTELEPHONE_SECONDARY_INFO,
  UPDATE_ASSOCIATE_WORKADDRESS_SECONDARY_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO,
  UPDATE_ASSESSEE_ENGAGEMENT_INFO,
  SET_IGURU_NODE_DYNAMIC_SINGLE_STATE,
  RESET_ALL_REDUCER,
  UPDATE_ASSOCIATE_INFO_CONTACT_INFO,
  UPDATE_ASSOCIATE_WEBSITE_PRIMARY_INFO,
  UPDATE_ASSOCIATE_WEBSITE_SECONDARY_INFO,
  SET_DISPLAY_THREE_SINGLE_STATE,
  UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO,
  UPDATE_ASSOCIATE_SETUP_ITEM_INFO,
  UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSOCIATENODE_INFO,
  UPDATE_ASSOCIATE_ASSOCIATENODE_INFO
} from '../../actionType';
import PopUpTagSecondary from '../../PopUpInformation/PopUpTagSecondary';
import { SIGN_IN_URL } from '../../endpoints';
import PopUpDropTwoList from '../../PopUpInformation/PopUpDropTwoList';
import PopUpCheckbox from '../../PopUpInformation/PopUpCheckbox';
const PopUpSignOnAssociate = () => {
  const { popupMode, isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const associateInfo = useSelector((state) => state.AssociateCreateReducer);
  const assesseeInfo = useSelector((state) => state.AssesseeCreateReducer);
  const { reviewMode, responseObject, statusPopUpValue, assesseeSetUpModule } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const informationContact = assesseeInfo.informationContact;
  const { associateTagPrimary } = useParams();
  const {
    coreGroupReviewListData,
    selectedAssociateInfo,
    coreRoleReviewListData,
    coreNodeReviewListData,
    permissionStateOne,
    permissionStateTwo,
    permissionStateThree
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const [roleSelectedError, setRoleSelectedError] = useState('');
  const history = useHistory();
  console.log(associateInfo);
  console.log('==================');
  const dispatch = useDispatch();
  useEffect(() => {
    if (assesseeInfo.assesseeInformationData) {
      console.log(popupMode);
      if (popupMode === 'ASSOCIATE_SIGN_ON') {
        let path = SIGN_IN_URL;
        history.push(path);
      } else {
        window.location.reload();
        dispatch({ type: RESET_ALL_REDUCER });
      }
    }
  }, [assesseeInfo.assesseeInformationData, history]);

  console.log("NODE LIST", coreNodeReviewListData);
  const coreNodeReviewListDataRemoveSelf = [];
  if (coreNodeReviewListData.length > 0) {
    // const { associateDescendantAll, associateRoot } = coreNodeReviewListData[0];
    // let tempArr = [...associateDescendantAll, associateRoot];
    let tempArr = [...coreNodeReviewListData]
    tempArr.forEach((ob) => {
      if (responseObject.id !== ob.id) {
        coreNodeReviewListDataRemoveSelf.push(ob);
      }
    });
  }
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
        associateInfo.parentAssociateId === ''
          ? associateTagPrimary
          : associateInfo.parentAssociateId,
      associate: {
        informationBasic: associateInfo.informationBasic,
        informationAllocation: associateInfo.informationAllocation,
        informationContact: associateInfo.informationContact
        // informationSetup: associateInfo.informationSetup
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
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
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
  const updateParentNode = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    let tagId = e.currentTarget.getAttribute('tag');
    let tagIdArr = associateInfo.informationFramework.associateAscendant.associateAscendantPrimary;
    if (tagIdArr.includes(tagId)) {
      setRoleSelectedError('');
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
      type: SET_IGURU_NODE_DYNAMIC_SINGLE_STATE,
      payload: {
        objectName: 'informationFramework',
        stateName: 'associateAscendant',
        actualStateName: 'associateAscendantPrimary',
        value: tagIdArr
      }
    });
  };
  console.log(isPopUpValue);
  console.log('INFO+++++', coreNodeReviewListData);
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
        basicInfo={associateInfo.informationBasic}
        actualLableValue={'associatePicture'}
        typeOfSetObject={UPDATE_ASSOCIATE_BASIC_INFO}
        nextPopUpValue={popupMode === 'ASSOCIATE_SIGN_ON' ? 'WORKADDRESSPOPUP' : 'GROUPPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
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
        isActive={isPopUpValue === 'GROUPSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'MANAGERPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'secondary'}
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
        isActive={isPopUpValue === 'MANAGERSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
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
        isActive={isPopUpValue === 'NODESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={''}
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
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ROLEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'TYPELISTPOPUP'}
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
      <PopUpReviewList
        isActive={isPopUpValue === 'ROLESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'WORKADDRESSPOPUP'}
        inputHeader={'role'}
        inputHeaderBadge={'secondary'}
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
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'WORKADDRESSPOPUP'}
        inputHeader={'type'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a type'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Type' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Type' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Type' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ASSOCIATESPARENTLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associates'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'ascendant'}
        inputHeaderBadgeTwo={'primary'}
        infoMsg={'select a node'}
        ListData={coreNodeReviewListDataRemoveSelf}
        isRequired={true}
        selectedList={
          associateInfo.informationFramework.associateAscendant.associateAscendantPrimary
        }
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        textOne={'associateName'}
        textTwo={'associateDescription'}
        onClickEvent={updateParentNode}
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
        basicInfo={associateInfo.informationContact.associateAddressWorkSecondary}
        countryCode={'associateAddressWorkSecondary'}
        typeOfSetObject={UPDATE_ASSOCIATE_WORKADDRESS_SECONDARY_INFO}
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
        basicInfo={associateInfo.informationContact.associateTelephoneWorkSecondary}
        isMobileState={false}
        typeOfSetObject={UPDATE_ASSOCIATE_WORKTELEPHONE_SECONDARY_INFO}
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
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo.informationSetup.associate || {}}
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
        basicInfo={associateInfo.informationSetup.associate || {}}
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
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo.informationSetup.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'PEOPLEPOPUP'}
        tag={'assesseeDistinctNameFormat'}
        label={'name'}
        listSelect={[
          { id: 'First-Name Other-Name Last-Name', name: 'First-Name Other-Name Last-Name' },
          { id: 'Last-Name First-Name Other-Name', name: 'Last-Name First-Name Other-Name' }
        ]}
        mappingValue={'id'}
        labelval={'people'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'information'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo.informationSetup.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATEPEOPLEPOPUP'}
        tag={'assesseeNameFormat'}
        label={'name'}
        listSelect={[
          { id: 'First-Name Other-Name Last-Name', name: 'First-Name Other-Name Last-Name' },
          { id: 'Last-Name First-Name Other-Name', name: 'Last-Name First-Name Other-Name' }
        ]}
        mappingValue={'id'}
        labelval={'people'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'information'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo.informationSetup.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
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
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo.informationSetup.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEECREATEAPPROVALPOPUP'}
        tag={'assesseeDistinctCreateApproval'}
        label={'approval'}
        listSelect={[
          { id: false, name: 'Approval Not Required' },
          { id: true, name: 'Approval Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENTCREATEAPPROVALPOPUP'}
        tag={'assessmentDistinctCreateApproval'}
        label={'approval'}
        listSelect={[
          { id: false, name: 'Approval Not Required' },
          { id: true, name: 'Approval Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSIGNMENTCREATEAPPROVALPOPUP'}
        tag={'assignmentDistinctCreateApproval'}
        label={'approval'}
        listSelect={[
          { id: false, name: 'Approval Not Required' },
          { id: true, name: 'Approval Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSIGNMENT_SHARE_POPUP'}
        tag={'assignmentDistinctShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSIGNMENT_GROUP_SHARE_POPUP'}
        tag={'assignmentGroupShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSIGNMENT_TYPE_SHARE_POPUP'}
        tag={'assignmentTypeShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpDropList
        isActive={isPopUpValue === 'ITEM_SHARE_POPUP'}
        tag={'itemDistinctShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.item || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ITEM_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEM_GROUP_SHARE_POPUP'}
        tag={'itemGroupShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.item || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ITEM_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEM_TYPE_SHARE_POPUP'}
        tag={'itemTypeShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.item || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ITEM_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ANALYTIC_SHARE_POPUP'}
        tag={'iGuruAnalyticDistinctShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.analytic || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ANALYTIC_GROUP_SHARE_POPUP'}
        tag={'iGuruAnalyticGroupShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.analytic || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ANALYTIC_TYPE_SHARE_POPUP'}
        tag={'iGuruAnalyticTypeShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.analytic || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEMCREATEAPPROVALPOPUP'}
        tag={'itemDistinctCreateApproval'}
        label={'approval'}
        listSelect={[
          { id: false, name: 'Approval Not Required' },
          { id: true, name: 'Approval Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.item || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ITEM_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'IGURUANALYTICSCREATEAPPROVALPOPUP'}
        tag={'iGuruAnalyticDistinctCreateApproval'}
        label={'approval'}
        listSelect={[
          { id: false, name: 'Approval Not Required' },
          { id: true, name: 'Approval Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.analytic || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATECREATEAPPROVALPOPUP'}
        tag={'associateDistinctCreateApproval'}
        label={'approval'}
        listSelect={[
          { id: false, name: 'Approval Not Required' },
          { id: false, name: 'Approval Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEECREATEPERMISSIONPOPUP'}
        tag={'assesseeDistinctCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENTCREATEPERMISSIONPOPUP'}
        tag={'assessmentDistinctCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSIGNMENTCREATEPERMISSIONPOPUP'}
        tag={'assignmentDistinctCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEMCREATEPERMISSIONPOPUP'}
        tag={'itemDistinctCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.item || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ITEM_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'IGURUANALYTICSCREATEPERMISSIONPOPUP'}
        tag={'iGuruAnalyticDistinctCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.analytic || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATECREATEPERMISSIONPOPUP'}
        tag={'associateDistinctCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEEGROUPCREATEPERMISSIONPOPUP'}
        tag={'assesseeGroupCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENTGROUPCREATEPERMISSIONPOPUP'}
        tag={'assessmentGroupCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSIGNMENTGROUPCREATEPERMISSIONPOPUP'}
        tag={'assignmentGroupCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEMGROUPCREATEPERMISSIONPOPUP'}
        tag={'itemGroupCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.item || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ITEM_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'IGURUANALYTICSGROUPCREATEPERMISSIONPOPUP'}
        tag={'iGuruAnalyticGroupCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.analytic || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATEGROUPCREATEPERMISSIONPOPUP'}
        tag={'associateGroupCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEEROLECREATEPERMISSIONPOPUP'}
        tag={'assesseeRoleCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'role'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATEROLECREATEPERMISSIONPOPUP'}
        tag={'associateRoleCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'role'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEETYPECREATEPERMISSIONPOPUP'}
        tag={'assesseeTypeCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENTTYPECREATEPERMISSIONPOPUP'}
        tag={'assessmentTypeCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSIGNMENTTYPECREATEPERMISSIONPOPUP'}
        tag={'assignmentTypeCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEMTYPECREATEPERMISSIONPOPUP'}
        tag={'itemTypeCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.item || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ITEM_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'IGURUANALYTICSTYPECREATEPERMISSIONPOPUP'}
        tag={'iGuruAnalyticTypeCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.analytic || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATETYPECREATEPERMISSIONPOPUP'}
        tag={'associateTypeCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATENODECREATEPERMISSIONPOPUP'}
        tag={'associateNodeCreatePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'node'}
        inputHeaderBadgeTwo={'create'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ASSESSEECREATEFEEPOPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        type={'number'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'assesseeDistinctCreateFee'}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ASSESSEE_SIGNON_FEE_POPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'sign-on'}
        type={'number'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'assesseeDistinctSignOnFee'}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ASSESSMENTCREATEFEEPOPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        type={'number'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'assessmentDistinctCreateFee'}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ASSIGNMENTCREATEFEEPOPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        type={'number'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'assignmentDistinctCreateFee'}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ITEMCREATEFEEPOPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        type={'number'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'itemDistinctCreateFee'}
        basicInfo={associateInfo?.informationSetup?.item || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ITEM_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'IGURUANALYTICSCREATEFEEPOPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        type={'number'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'iGuruAnalyticDistinctCreateFee'}
        basicInfo={associateInfo?.informationSetup?.analytic || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ASSOCIATECREATEFEEPOPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        type={'number'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'associateDistinctCreateFee'}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEEINFODISTINCTBASICPOPUP'}
        tag={'assesseeDistinctInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Alias Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Alias Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENTINFODISTINCTBASICPOPUP'}
        tag={'assessmentDistinctInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSIGNMENTINFODISTINCTBASICPOPUP'}
        tag={'assignmentDistinctInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEMINFODISTINCTBASICPOPUP'}
        tag={'itemDistinctInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.item || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ITEM_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'IGURUANALYTICSINFODISTINCTBASICPOPUP'}
        tag={'iGuruAnalyticDistinctInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.analytic || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATEINFODISTINCTBASICPOPUP'}
        tag={'associateDistinctInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEEBASICINFOGROUPPOPUP'}
        tag={'assesseeGroupInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENTBASICINFOGROUPPOPUP'}
        tag={'assessmentGroupInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSIGNMENTBASICINFOGROUPPOPUP'}
        tag={'assignmentGroupInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEMBASICINFOGROUPPOPUP'}
        tag={'itemGroupInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'IGURUANALYTICSBASICINFOGROUPPOPUP'}
        tag={'iGuruAnalyticGroupInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.analytic || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATEBASICINFOGROUPPOPUP'}
        tag={'associateGroupInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEEBASICINFOROLEPOPUP'}
        tag={'assesseeRoleCreatePermission'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'role'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATEBASICINFOROLEPOPUP'}
        tag={'associateRoleInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'role'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEEBASICINFOTYPEPOPUP'}
        tag={'assesseeTypeInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENTBASICINFOTYPEPOPUP'}
        tag={'assessmentTypeInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSIGNMENTBASICINFOTYPEPOPUP'}
        tag={'assignmentTypeInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assignments'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assignment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEMBASICINFOTYPEPOPUP'}
        tag={'itemTypeInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'items'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'IGURUANALYTICSBASICINFOTYPEPOPUP'}
        tag={'iGuruAnalyticTypeInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'iGuru analytics'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATEBASICINFOTYPEPOPUP'}
        tag={'associateTypeInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATEBASICINFONODEPOPUP'}
        tag={'associateNodeInformationBasic'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'Not_Required', name: 'Unique Name & Description Not Rquired' },
          { id: 'NAME_DESCRIPTION_UNIQUE', name: 'Unique Name + Description Required' },
          { id: 'NAME_UNIQUE', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'node'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
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
        actualLableValue={'associateAddressWebsite'}
        basicInfo={associateInfo.informationContact.associateAddressWebsitePrimary}
        typeOfSetObject={UPDATE_ASSOCIATE_WEBSITE_PRIMARY_INFO}
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
        actualLableValue={'associateAddressWebsite'}
        basicInfo={associateInfo.informationContact.associateAddressWebsiteSecondary}
        typeOfSetObject={UPDATE_ASSOCIATE_WEBSITE_SECONDARY_INFO}
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

      <PopUpConfirm
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
          { id: 'Not_Required', name: '' },
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
      <PopUpConfirm
        isActive={isPopUpValue === 'CONFIRMATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'create'}
        onClickYes={CreateApi}
      />
      <PopUpConfirm
        isActive={isPopUpValue === 'CANCELPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'cancel'}
        headerOneBadgeOne={''}
        mode={'cancel'}
        onClickYes={onClickCancelYes}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TAGREADONLYPRIMARYPOPUP'}
        label={'tag'}
        labelBadgeOne={'primary'}
        actualLableValue={'associateTagPrimary'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        basicInfo={responseObject?.informationEngagement?.associateTag?.associateTagPrimary || ''}
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTagSecondary
        isActive={isPopUpValue === 'TAGSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        tagSecondary={assesseeInfo.informationEngagement}
        signInSetup={assesseeInfo.informationSetup}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_ENGAGEMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'STATUSPOPUP'}
        tag={'associateStatus'}
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
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        basicInfo={statusPopUpValue}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSESSEE_PERSONAL_INFO}
        handleNextPopupValue={handleNextPopupValue}
        isNotRevised={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TENURESATRTDATEPOPUP'}
        label={'tenure'}
        labelBadgeOne={'start'}
        actualLableValue={''}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        basicInfo={
          responseObject?.informationEngagement?.associateTenureDate
            ?.associateTenureDateTimeStart || 'mm/dd/yyyy --:-- --'
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
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        basicInfo={
          responseObject?.informationEngagement?.associateTenureDate?.associateTenureDateTimeEnd ||
          'mm/dd/yyyy --:-- --'
        }
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEE_DIST_SHARE_POPUP'}
        tag={'assesseeDistinctShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'share'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_DIST_SHARE_POPUP'}
        tag={'associateDistinctShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'distinct'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEE_SIGNON_APPROVAL_POPUP'}
        tag={'assesseeDistinctSignOnApproval'}
        label={'approval'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'sign-on'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_SIGNON_APPROVAL_POPUP'}
        tag={'associateDistinctSignOnApproval'}
        label={'approval'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'sign-on'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ASSOCIATE_SIGNON_FEE_POPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'sign-on'}
        type={'number'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'associateDistinctSignOnFee'}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_SIGNON_PERMISSION_POPUP'}
        tag={'associateDistinctSignOnPermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'sign-on'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEE_SIGNON_PERMISSION_POPUP'}
        tag={'assesseeDistinctSignOnPermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'sign-on'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEE_GROUP_SHARE_POPUP'}
        tag={'assesseeGroupShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_GROUP_SHARE_POPUP'}
        tag={'associateGroupShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_NODE_SHARE_POPUP'}
        tag={'associateNodeShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'node'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_ROLE_SHARE_POPUP'}
        tag={'associateRoleShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'role'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_TYPE_SHARE_POPUP'}
        tag={'associateTypeShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEE_TYPE_SHARE_POPUP'}
        tag={'assesseeTypeShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSEE_ROLE_SHARE_POPUP'}
        tag={'assesseeRoleShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessees'}
        inputHeaderBadgeOne={'role'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessee || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENT_NODE_SHARE_POPUP'}
        tag={'assessmentDistinctSharedNode'}
        label={'node'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'share'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENT_ASSOCIATE_SHARE_POPUP'}
        tag={'assessmentDistinctSharedAssociate'}
        label={'associate'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'share'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENT_GROUP_SHARE_POPUP'}
        tag={'assessmentGroupShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'group'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENT_TYPE_SHARE_POPUP'}
        tag={'assessmentTypeShare'}
        label={'share'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'type'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.assessment || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_BRAND_APPROVAL_POPUP'}
        tag={'iguruPlatformBrandApproval'}
        label={'approval'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'brand'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_BRAND_PERMISSION_POPUP'}
        tag={'iguruPlatformBrandPermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'brand'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_BRAND_CHOICE_POPUP'}
        tag={'iguruPlatformBrandChoice'}
        label={'choice'}
        listSelect={[
          { id: 'Associate', name: 'Associate' },
          { id: 'Associate & iGuru', name: 'Associate & iGuru' },
          { id: 'iGuru', name: 'iGuru' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'brand'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'ASSOCIATE_BRAND_PICTURE_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'brand'}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        actualLableValue={'iguruPlatformBrandPicture'}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        nextPopUpValue={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ASSOCIATE_BRAND_FEE_POPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'brand'}
        inputHeaderBadgeTwo={''}
        type={'number'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'iguruPlatformBrandFee'}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ASSOCIATE_DOMAIN_PRIMARY_POPUP'}
        label={'primary'}
        headerPanelColour={'genericOne'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'domain'}
        inputHeaderBadgeTwo={''}
        type={'text'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'associateDomainPrimary'}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ASSOCIATE_DOMAIN_SECONDARY_POPUP'}
        label={'secondary'}
        headerPanelColour={'genericOne'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'domain'}
        inputHeaderBadgeTwo={''}
        type={'text'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'associateDomainSecondary'}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_THEME_APPROVAL_POPUP'}
        tag={'iguruPlatformThemeApproval'}
        label={'approval'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'theme'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSOCIATE_THEME_PERMISSION_POPUP'}
        tag={'iguruPlatformThemePermission'}
        label={'permission'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'theme'}
        inputHeaderBadgeTwo={''}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpTextField
        isActive={isPopUpValue === 'ASSOCIATE_THEME_FEE_POPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'associates'}
        inputHeaderBadgeOne={'theme'}
        inputHeaderBadgeTwo={''}
        type={'number'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'iguruPlatformThemeFee'}
        basicInfo={associateInfo?.informationSetup?.associate || {}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpCheckbox
        isActive={isPopUpValue === 'ASSOCIATE_NODE_PERMISSION_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'setup'}
        headerOneBadgeTwo={''}
        inputHeader={'node'}
        inputHeaderBadge={'permission'}
        inputHeaderBadgeTwo={permissionStateOne}
        inputHeaderBadgeThree={permissionStateTwo}
        typeOfStateObj={permissionStateThree}
        isRolePermission
        objectName={'associateNode'}
        stateName={'informationSetup'}
        // informationValue={permissionStateThree}
        valueArr={['create', 'delete', 'review', 'revise', 'share']}
        valueArrState={
          associateInfo?.informationSetup?.associateNode?.informationSetup[permissionStateThree]
        }
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSOCIATE_ASSOCIATENODE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpConfirm
        isActive={isPopUpValue === 'ASSESSEERESETPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'setup'}
        headerOneBadgeTwo={'reset'}        
        mode={'cancel'}
        onClickYes={onClickCancelYes}/>

      <PopUpConfirm
        isActive={isPopUpValue === 'ASSESSMENTRESETPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessments'}
        headerOneBadgeOne={'setup'}
        headerOneBadgeTwo={'reset'}
        mode={'cancel'}
        onClickYes={onClickCancelYes}/>

       <PopUpConfirm
        isActive={isPopUpValue === 'ASSIGNMENTRESETPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assignments'}
        headerOneBadgeOne={'setup'}
        headerOneBadgeTwo={'reset'}
        mode={'cancel'}
        onClickYes={onClickCancelYes}/>
        
        <PopUpConfirm
        isActive={isPopUpValue === 'ITEMRESETPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'items'}
        headerOneBadgeOne={'setup'}
        headerOneBadgeTwo={'reset'}
        mode={'cancel'}
        onClickYes={onClickCancelYes}/>

        <PopUpConfirm
        isActive={isPopUpValue === 'ASSOCIATERESETPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associates'}
        headerOneBadgeOne={'setup'}
        headerOneBadgeTwo={'reset'}
        mode={'cancel'}
        onClickYes={onClickCancelYes}/>

        <PopUpConfirm
        isActive={isPopUpValue === 'IGURUANALYTICSRESETPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'iGuru analytics'}
        headerOneBadgeOne={'setup'}
        headerOneBadgeTwo={'reset'}
        mode={'cancel'}
        onClickYes={onClickCancelYes}/>

        <PopUpConfirm
        isActive={isPopUpValue === 'IGURUMARKETPLACERESETPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'iGuru marketplace'}
        headerOneBadgeOne={'setup'}
        headerOneBadgeTwo={'reset'}
        mode={'cancel'}
        onClickYes={onClickCancelYes}/>

      <PopUpConfirm
        isActive={isPopUpValue === 'IGURUMINERESETPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'iGuru mine'}
        headerOneBadgeOne={'setup'}
        headerOneBadgeTwo={'reset'}
        mode={'cancel'}
        onClickYes={onClickCancelYes}/>     
    </div>
  );
};

export default PopUpSignOnAssociate;
