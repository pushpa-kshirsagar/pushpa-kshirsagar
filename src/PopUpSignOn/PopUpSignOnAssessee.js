import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../PopUpInformation/PopUpPicture';
import PopUpAssesseeName from '../PopUpInformation/PopUpAssesseeName';
import PopUpTextField from '../PopUpInformation/PopUpTextField';
import PopUpAddressEmail from '../PopUpInformation/PopUpAddressEmail';
import PopUpDropList from '../PopUpInformation/PopUpDropList';
import PopUpConfirmation from '../PopUpGeneric/PopUpConfirmation';
import PopUpTelephone from '../PopUpInformation/PopUpTelephone';
import PopUpCheckbox from '../PopUpInformation/PopUpCheckbox';
import {
  CLEAR_ASSESSEE_INFO,
  POPUP_CLOSE,
  UPDATE_ASSESSEE_PERSONAL_INFO,
  UPDATE_ASSESSEE_BASIC_INFO,
  UPDATE_ASSESSEE_MOBILE_INFO,
  UPDATE_ASSESSEE_ADDRESS_EMAIL_PRIMARY_INFO,
  UPDATE_ASSESSEE_ADDRESS_EMAIL_SECONDARY_INFO,
  UPDATE_ASSESSEE_SETUP_PRIMARY_INFO,
  UPDATE_ASSESSEE_ENGAGEMENT_INFO,
  SET_NEXT_POPUP,
  CREATE_ASSESSEE_SAGA,
  LOADER_START,
  ASSESSEE_INFO_CREATE,
  SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
  UPDATE_ASSESSEE_HOMEADDRESS_INFO,
  UPDATE_ASSESSEE_TELEPHONE_WORK_INFO,
  UPDATE_ASSESSEE_TELEPHONE_HOME_INFO,
  UPDATE_ASSESSEE_COMMUNITY_SOCIAL_INFO,
  UPDATE_ASSESSEE_COMMUNITY_SPIRITUAL_INFO,
  UPDATE_ASSESSEE_HOMEADDRESS_SECONDARY_INFO,
  UPDATE_ASSESSEE_WORKADDRESS_INFO,
  UPDATE_ASSESSEE_WORKADDRESS_SECONDARY_INFO,
  UPDATE_ASSESSEE_TELEPHONE_HOME_SECONDARY_INFO,
  UPDATE_ASSESSEE_MOBILE_SECONDARY_INFO,
  UPDATE_ASSESSEE_TAG_STATUTORY_INFO
} from '../actionType';
import PopUpTagPrimary from '../PopUpInformation/PopUpTagPrimary';
import PopUpTagSecondary from '../PopUpInformation/PopUpTagSecondary';
import PopUpReviewList from '../PopUpInformation/PopUpReviewList';
import PopUpAddress from '../PopUpInformation/PopUpAddress';
import PopUpDatePicker from '../PopUpInformation/PopUpDatePicker';
import PopUpCommunity from '../PopUpInformation/PopUpCommunity';
import PopUpBirthplace from '../PopUpInformation/PopUpBirthplace';
import { DEFAULT_ROLE_ID, SIGN_IN_URL } from '../endpoints';
import PopUpFingerprint from '../PopUpInformation/PopUpFingerprint';

const PopUpSignOnAssessee = (props) => {
  const { headerOne = 'assessee' } = props;
  const { associateTagPrimary } = useParams();
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const assesseeInfo = useSelector((state) => state.AssesseeCreateReducer);
  const {
    coreGroupReviewListData,
    selectedAssociateInfo,
    coreRoleReviewListData,
    coreNodeReviewListData
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { reviewMode, statusPopUpValue = '', responseObject } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const informationContact = assesseeInfo.informationContact;
  console.log('============>', assesseeInfo);
  const [roleSelectedError, setRoleSelectedError] = useState('');
  const [assignNodeArr, setAssignNodeArr] = useState([]);
  const [defaultNodeId, setdefaultNodeId] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (assesseeInfo.assesseeInformationData) {
      if (popupMode === 'ASSESSEE_SIGN_ON') {
        let path = SIGN_IN_URL;
        history.push(path);
      } else {
        onClickCancelYes();
        dispatch({ type: ASSESSEE_INFO_CREATE });
      }
    }
  }, [assesseeInfo.assesseeInformationData, history]);
  useEffect(() => {
    if (headerOne === 'assessee') {
      if (
        assesseeInfo.informationAllocation.assesseeRole.assesseeRolePrimary.includes(
          DEFAULT_ROLE_ID
        ) === false
      )
        assesseeInfo.informationAllocation.assesseeRole.assesseeRolePrimary.push(DEFAULT_ROLE_ID);
    }
    console.log("coreNodeReviewListData",coreNodeReviewListData);
    // let rootArr = coreNodeReviewListData.length > 0 && coreNodeReviewListData[0].associateNodeRoot;
    // let descenArr = coreNodeReviewListData.length > 0 && coreNodeReviewListData[0].associateNodeDescendantAll.unshift(rootArr);
    // console.log("rootArr",rootArr);
    // console.log("descenArr",descenArr);
    // descenArr ? setAssignNodeArr(descenArr):setAssignNodeArr([]);
    if (headerOne === 'administrator' && coreNodeReviewListData.length > 0) {
      let defaultnode = coreNodeReviewListData.filter(
          (x) =>
            x.informationFramework.associateNodeAscendant.associateNodeAscendantPrimary === null
        )
        .map((x) => x.id);
      assesseeInfo.informationAllocation.assesseeNode.assesseeNodePrimary.push(defaultnode[0]);
      setdefaultNodeId(defaultnode[0]);
    }
    // console.log("assignNodeArr",assignNodeArr);
  }, [coreRoleReviewListData, coreNodeReviewListData]);

  console.log(
    'IN SIDE SIGN ON ASSESSEE+++>',
    coreGroupReviewListData,
    assesseeInfo?.informationAllocation?.assesseeGroup.assesseeGroupPrimary,
    assesseeInfo?.informationAllocation?.assesseeGroup.assesseeGroupSecondary
  );
  let selectedPrimaryGroup =
    assesseeInfo?.informationAllocation?.assesseeGroup.assesseeGroupPrimary || [];
  let selectedSecondaryGroup =
    assesseeInfo?.informationAllocation?.assesseeGroup.assesseeGroupSecondary || [];
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

  const onClickYes = async () => {
    const {
      informationBasic,
      informationAllocation,
      informationContact,
      informationPersonal,
      informationSetup,
      informationEngagement,
      tempCommunication
    } = assesseeInfo;
    if (headerOne === 'administrator' || headerOne === 'manager') {
      informationAllocation.assesseeRole.assesseeRolePrimary.push(DEFAULT_ROLE_ID);
    }
    if (tempCommunication === 'email address (primary)') {
      informationContact.assesseeAddressEmailPrimary.assesseeAddressEmailCommunication = true;
    }
    if (tempCommunication === 'email address (secondary)') {
      informationContact.assesseeAddressEmailSecondary.assesseeAddressEmailCommunication = true;
    }

    //6083d82a5c42683849ce14d0 parent associate id
    let requestObect = {
      assesseeId: selectedAssociateInfo?.assesseeId || '0123456',
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary ||
        associateTagPrimary,
      assessee: {
        informationBasic: informationBasic,
        informationAllocation: informationAllocation,
        informationContact: informationContact,
        informationPersonal: informationPersonal,
        informationEngagement: informationEngagement,
        informationSetup: informationSetup
      }
    };
    console.log('ONCLICK assessee Create Yes', requestObect);
    console.log('loading start');
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSESSEE_SAGA, payload: requestObect });
  };

  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_ASSESSEE_INFO });
    dispatch({ type: POPUP_CLOSE });
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
      if (popupMode === 'ASSESSEE_SIGN_ON') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'EMAILPOPUP' } });
      } else {
        // dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'ROLELISTPOPUP' } });
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'GROUPLISTPOPUP' } });
      }
    } else {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'CONFIRMATIONPOPUP' } });
    }
  };

  const updateNodeIdObject = (e) => {
    let nodeid = e.currentTarget.getAttribute('tag');
    let nodeArr = assesseeInfo.informationAllocation.assesseeNode.assesseeNodePrimary;
    if (defaultNodeId !== nodeid || headerOne !== 'administrator') {
      setRoleSelectedError('');
      if (nodeArr.includes(nodeid)) {
        document.getElementById(nodeid).style.backgroundColor = 'white';
        nodeArr = nodeArr.filter(function (number) {
          return number !== nodeid;
        });
      } else {
        nodeArr.push(nodeid);
        document.getElementById(nodeid).style.backgroundColor = '#F0F0F0';
      }
      dispatch({
        type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'assesseeNode',
          actualStateName: 'assesseeNodePrimary',
          value: nodeArr
        }
      });
    }
  };
  const updateRoleIdObject = (e) => {
    // console.log(e.currentTarget.getAttribute('tag'));
    // console.log(assesseeInfo.informationAllocation.assesseeRole.assesseeRolePrimary);
    let roleid = e.currentTarget.getAttribute('tag');
    let roleArr = assesseeInfo.informationAllocation.assesseeRole.assesseeRolePrimary;
    console.log(roleArr.includes(roleid));
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
      type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
      payload: { stateName: 'assesseeRole', actualStateName: 'assesseeRolePrimary', value: roleArr }
    });
  };

  const updateRoleIdSecondaryObject = (e) => {
    // console.log(e.currentTarget.getAttribute('tag'));
    // console.log(assesseeInfo.informationAllocation.assesseeRole.assesseeRoleSecondary);
    let roleid = e.currentTarget.getAttribute('tag');
    let roleArr = assesseeInfo.informationAllocation.assesseeRole.assesseeRoleSecondary;
    console.log(roleArr.includes(roleid));
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
      type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'assesseeRole',
        actualStateName: 'assesseeRoleSecondary',
        value: roleArr
      }
    });
  };
  const updateAssesseeGroups = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    console.log(assesseeInfo.informationAllocation.assesseeGroup.assesseeGroupPrimary);
    let groupid = e.currentTarget.getAttribute('tag');
    let roleArr = assesseeInfo.informationAllocation.assesseeGroup.assesseeGroupPrimary;
    console.log(roleArr.includes(groupid));

    if (roleArr.includes(groupid)) {
      document.getElementById(groupid).style.backgroundColor = 'white';
      roleArr = roleArr.filter(function (number) {
        return number !== groupid;
      });
    } else {
      roleArr.push(groupid);
      document.getElementById(groupid).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'assesseeGroup',
        actualStateName: 'assesseeGroupPrimary',
        value: roleArr
      }
    });
  };
  const updateAssesseeSecondaryGroups = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    console.log(assesseeInfo.informationAllocation.assesseeGroup.assesseeGroupSecondary);
    let groupid = e.currentTarget.getAttribute('tag');
    let roleArr = assesseeInfo.informationAllocation.assesseeGroup.assesseeGroupSecondary;
    console.log(roleArr.includes(groupid));

    if (roleArr.includes(groupid)) {
      document.getElementById(groupid).style.backgroundColor = 'white';
      roleArr = roleArr.filter(function (number) {
        return number !== groupid;
      });
    } else {
      roleArr.push(groupid);
      document.getElementById(groupid).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: 'assesseeGroup',
        actualStateName: 'assesseeGroupSecondary',
        value: roleArr
      }
    });
  };
console.log('associateTagPrimary',associateTagPrimary);
  return (
    <div>
      <PopUpAssesseeName
        isActive={isPopUpValue === 'ASSESSEENAMEPOPUP'}
        inputHeader={'name'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={assesseeInfo.informationBasic}
        nextPopUpValue={'ALIASPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_BASIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'alias'}
        actualLableValue={'assesseeAlias'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={assesseeInfo.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_BASIC_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TAGSTATUTORY'}
        label={'tag'}
        labelBadgeOne={'statutory'}
        actualLableValue={'assesseeTagStatutory'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={assesseeInfo.informationBasic}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSESSEE_TAG_STATUTORY_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TAGREADONLYPRIMARYPOPUP'}
        label={'tag'}
        labelBadgeOne={'primary'}
        actualLableValue={'assesseeTagPrimary'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={responseObject?.informationEngagement?.assesseeTag?.assesseeTagPrimary || ''}
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
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={
          responseObject?.informationEngagement?.assesseeTenure?.assesseeTenureDateTimeStart ||
          'mm/dd/yyyy --:-- --'
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
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={
          responseObject?.informationEngagement?.assesseeTenure?.assesseeTenureDateTimeEnd ||
          'mm/dd/yyyy --:-- --'
        }
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        // nextPopUpValue={popupMode === 'ASSESSEE_SIGN_ON' ? 'EMAILPOPUP' :'ROLELISTPOPUP'}
        handleNextPopupValue={handleNextPopupValue}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'SIGNATUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'signature'}
        headerOneBadgeOne={''}
        mode={'revise'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'MANAGERLISTPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        ListData={filteredCoreGroupReviewListDataPrimary}
        textOne={'assesseeGroupName'}
        textTwo={'assesseeGroupDescription'}
        onClickEvent={updateAssesseeGroups}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
        selectedList={assesseeInfo?.informationAllocation?.assesseeGroup.assesseeGroupPrimary}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPLISTSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'MANAGERLISTPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a group'}
        ListData={filteredCoreGroupReviewListDataSecondary}
        textOne={'assesseeGroupName'}
        textTwo={'assesseeGroupDescription'}
        onClickEvent={updateAssesseeSecondaryGroups}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
        selectedList={assesseeInfo?.informationAllocation?.assesseeGroup.assesseeGroupSecondary}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'NODELISTPOPUP'}
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
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERLISTSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'NODELISTPOPUP'}
        inputHeader={'manager'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a role'}
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
        isActive={isPopUpValue === 'NODELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'ROLELISTPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a node'}
        isRequired={false}
        selectedList={assesseeInfo?.informationAllocation?.assesseeNode.assesseeNodePrimary}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        ListData={coreNodeReviewListData}
        // ListData={assignNodeArr}
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        onClickEvent={updateNodeIdObject}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODELISTSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'ROLELISTPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a node'}
        isRequired={true}
        selectedList={assesseeInfo?.informationAllocation?.assesseeNode.assesseeNodePrimary}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        // ListData={assignNodeArr}
        ListData={coreNodeReviewListData}
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        onClickEvent={updateNodeIdObject}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ROLELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'TYPELISTPOPUP'}
        inputHeader={'role'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a role'}
        isRequired={true}
        selectedList={assesseeInfo?.informationAllocation?.assesseeRole.assesseeRolePrimary}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        ListData={coreRoleReviewListData}
        textOne={'assesseeRoleName'}
        textTwo={'assesseeRoleDescription'}
        onClickEvent={updateRoleIdObject}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ROLELISTSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'EMAILPOPUP'}
        inputHeader={'role'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a role'}
        isRequired={true}
        selectedList={assesseeInfo?.informationAllocation?.assesseeRole.assesseeRoleSecondary}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        ListData={coreRoleReviewListData}
        textOne={'assesseeRoleName'}
        textTwo={'assesseeRoleDescription'}
        onClickEvent={updateRoleIdSecondaryObject}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'EMAILPOPUP'}
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
      <PopUpAddressEmail
        isActive={isPopUpValue === 'EMAILPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        primaryLabel={'email address'}
        primaryLabelBadge={'primary'}
        tag={'assesseeAddressEmail'}
        basicInfo={informationContact.assesseeAddressEmailPrimary}
        signInSetup={assesseeInfo.informationSetup}
        nextPopUpValue={'MOBILETELEPHONEPOPUP'}
        tempCommunication={assesseeInfo.tempCommunication}
        typeOfSetObject={UPDATE_ASSESSEE_ADDRESS_EMAIL_PRIMARY_INFO}
        handleNextPopupValue={handleNextPopupValue}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpAddressEmail
        isActive={isPopUpValue === 'EMAILSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        primaryLabel={'email address'}
        primaryLabelBadge={'secondary'}
        tag={'assesseeAddressEmail'}
        basicInfo={informationContact.assesseeAddressEmailSecondary}
        signInSetup={assesseeInfo.informationSetup}
        // nextPopUpValue={'MOBILETELEPHONEPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_ADDRESS_EMAIL_SECONDARY_INFO}
        handleNextPopupValue={handleNextPopupValue}
        tempCommunication={assesseeInfo.tempCommunication}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpCheckbox
        isActive={isPopUpValue === 'FORCETOSELECTCOMMUNICATION'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        valueArr={['email address (primary)', 'email address (secondary)']}
        basicInfo={informationContact.assesseeTelephoneMobilePrimary}
        nextPopUpValue={'MOBILETELEPHONEPOPUP'}
        typeOfPrimarySetObject={UPDATE_ASSESSEE_ADDRESS_EMAIL_PRIMARY_INFO}
        typeOfSecondaSetObject={UPDATE_ASSESSEE_ADDRESS_EMAIL_SECONDARY_INFO}
        EmailPrimaryCommunication={informationContact.assesseeAddressEmailPrimary}
        EmailSecondaCommunication={informationContact.assesseeAddressEmailSecondary}
      />
      <PopUpTelephone
        isActive={isPopUpValue === 'MOBILETELEPHONEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        inputHeader={'mobile telephone'}
        primaryheader={'primary'}
        basicInfo={informationContact.assesseeTelephoneMobilePrimary}
        nextPopUpValue={'SINGLEDROPDOWNPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_MOBILE_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
        isMobileState={true}
      />
      <PopUpTelephone
        isActive={isPopUpValue === 'MOBILETELEPHONESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        inputHeader={'mobile telephone'}
        primaryheader={'secondary'}
        basicInfo={informationContact.assesseeTelephoneMobileSecondary}
        nextPopUpValue={'SINGLEDROPDOWNPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_MOBILE_SECONDARY_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
        isMobileState={true}
      />
      <PopUpTelephone
        isActive={isPopUpValue === 'HOMETELEPHONEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        inputHeader={'home telephone'}
        primaryheader={'primary'}
        basicInfo={informationContact.assesseeTelephoneHomePrimary}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSESSEE_TELEPHONE_HOME_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTelephone
        isActive={isPopUpValue === 'HOMETELEPHONESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        inputHeader={'home telephone'}
        primaryheader={'secondary'}
        basicInfo={informationContact.assesseeTelephoneHomeSecondary}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSESSEE_TELEPHONE_HOME_SECONDARY_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTelephone
        isActive={isPopUpValue === 'WORKTELEPHONEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        inputHeader={'work telephone'}
        primaryheader={'primary'}
        basicInfo={informationContact.assesseeTelephoneWorkPrimary}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSESSEE_TELEPHONE_WORK_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTelephone
        isActive={isPopUpValue === 'WORKTELEPHONESECONDARPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        inputHeader={'work telephone'}
        primaryheader={'secondary'}
        basicInfo={informationContact.assesseeTelephoneWorkSecondary}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSESSEE_TELEPHONE_WORK_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
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
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        basicInfo={assesseeInfo.informationPersonal}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_PERSONAL_INFO}
        handleNextPopupValue={handleNextPopupValue}
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
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        basicInfo={statusPopUpValue}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSESSEE_PERSONAL_INFO}
        handleNextPopupValue={handleNextPopupValue}
        isNotRevised={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTagPrimary
        isActive={isPopUpValue === 'TAGPRIMARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        signInSetup={assesseeInfo.informationSetup}
        // nextPopUpValue={'CONFIRMATIONPOPUP'}
        handleNextPopupValue={handleNextPopupValue}
        typeOfSetObject={UPDATE_ASSESSEE_SETUP_PRIMARY_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTagSecondary
        isActive={isPopUpValue === 'TAGSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        tagSecondary={assesseeInfo.informationEngagement}
        signInSetup={assesseeInfo.informationSetup}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_ENGAGEMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpCheckbox
        isActive={isPopUpValue === 'FORCETOSELECTSIGNIN'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        valueArr={[
          'email address (primary)',
          'email address (secondary)',
          'tag (primary)',
          'tag (secondary)'
        ]}
        forceToSelect="signIn"
        typeOfSetObject={UPDATE_ASSESSEE_SETUP_PRIMARY_INFO}
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
        onClickYes={onClickYes}
      />
      <PopUpAddress
        isActive={isPopUpValue === 'HOMEADDRESSPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'home address'}
        primaryheader={'primary'}
        nextPopUpValue={''}
        isRequired={true}
        basicInfo={assesseeInfo.informationContact.assesseeAddressHomePrimary}
        typeOfSetObject={UPDATE_ASSESSEE_HOMEADDRESS_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpAddress
        isActive={isPopUpValue === 'HOMEADDRESSSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'home address'}
        primaryheader={'secondary'}
        nextPopUpValue={''}
        isRequired={true}
        basicInfo={assesseeInfo.informationContact.assesseeAddressHomeSecondary}
        typeOfSetObject={UPDATE_ASSESSEE_HOMEADDRESS_SECONDARY_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpAddress
        isActive={isPopUpValue === 'WORKADDRESSPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'work address'}
        primaryheader={'primary'}
        nextPopUpValue={''}
        isRequired={true}
        basicInfo={assesseeInfo.informationContact.assesseeAddressWorkPrimary}
        typeOfSetObject={UPDATE_ASSESSEE_WORKADDRESS_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpAddress
        isActive={isPopUpValue === 'WORKADDRESSSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'work address'}
        primaryheader={'secondary'}
        nextPopUpValue={''}
        isRequired={true}
        basicInfo={assesseeInfo.informationContact.assesseeAddressWorkSecondary}
        typeOfSetObject={UPDATE_ASSESSEE_WORKADDRESS_SECONDARY_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDatePicker
        isActive={isPopUpValue === 'BIRTHDATEPOPUP'}
        primaryheader=""
        inputHeader="birthdate"
        headerPanelColour="genericOne"
        headerOne="assessees"
        headerOneBadgeOne="information"
        valueState="tenurestart"
        isVerification={true}
        basicInfo={assesseeInfo.informationPersonal}
        typeOfSetObject={UPDATE_ASSESSEE_PERSONAL_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'BIRTHMARKPOPUP'}
        label={'birthmark'}
        actualLableValue={'assesseeBirthmark'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={assesseeInfo.informationPersonal}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSESSEE_PERSONAL_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpCommunity
        isActive={isPopUpValue === 'COMMUNITYSOCIALPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'community'}
        primaryheader={'social'}
        nextPopUpValue={''}
        isRequired={false}
        basicInfo={assesseeInfo?.informationPersonal?.assesseeCommunitySocial || {}}
        typeOfSetObject={UPDATE_ASSESSEE_COMMUNITY_SOCIAL_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpCommunity
        isActive={isPopUpValue === 'COMMUNITYSPIRITUALPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'community'}
        primaryheader={'spiritual'}
        nextPopUpValue={''}
        isRequired={false}
        basicInfo={assesseeInfo?.informationPersonal?.assesseeCommunitySpiritual || {}}
        typeOfSetObject={UPDATE_ASSESSEE_COMMUNITY_SPIRITUAL_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpBirthplace
        isActive={isPopUpValue === 'BIRTHPLACEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'birthplace'}
        primaryheader={''}
        nextPopUpValue={''}
        isRequired={false}
        basicInfo={assesseeInfo?.informationPersonal}
        typeOfSetObject={UPDATE_ASSESSEE_PERSONAL_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpFingerprint
        isActive={isPopUpValue === 'LEFTFINGERPRINTPOPUP'}
        headerPanelColour="genericOne"
        headerOne="fingerprint"
        headerOneBadgeOne="left hand"
        headerOneBadgeTwo=""
        mode={'revise'}
      />
      <PopUpFingerprint
        isActive={isPopUpValue === 'RIGHTFINGERPRINTPOPUP'}
        headerPanelColour="genericOne"
        headerOne="fingerprint"
        headerOneBadgeOne="right hand"
        headerOneBadgeTwo=""
        mode={'revise'}
      />
    </div>
  );
};

export default PopUpSignOnAssessee;
