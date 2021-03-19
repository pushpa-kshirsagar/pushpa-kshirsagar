import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  ASSESSEE_POPUP_CLOSE,
  LOADER_START,
  ASSESSEE_INFO_CREATE
} from '../actionType';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userPool from '../UserPool';
import PopUpTagPrimary from '../PopUpInformation/PopUpTagPrimary';
import PopUpTagSecondary from '../PopUpInformation/PopUpTagSecondary';

const PopUpSignOnAssessee = () => {
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const assesseeInfo = useSelector((state) => state.AssesseeCreateReducer);
  const informationContact = assesseeInfo.informationContact;
  const dispatch = useDispatch();
  const [nextPopUpValue, setNextPopUpValue] = useState('');
  const history = useHistory();
  useEffect(() => {
    console.log(popupMode)
    console.log(assesseeInfo.assesseeInformationData)
    console.log("assesseeInformationData")
    if (assesseeInfo.assesseeInformationData) {
      if (popupMode === 'ASSESSEE_SIGN_ON') {
        let path = `/signIn`;
        history.push(path);
      } else {
        console.log('show right pane');
        onClickCancelYes();
        dispatch({ type: ASSESSEE_INFO_CREATE });
      }
    }
  }, [assesseeInfo.assesseeInformationData, history]);
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
    if (tempCommunication === 'email address (primary)') {
      informationContact.assesseeAddressEmailPrimary.assesseeAddressEmailCommunication = true;
    }
    if (tempCommunication === 'email address (secondary)') {
      informationContact.assesseeAddressEmailSecondary.assesseeAddressEmailCommunication = true;
    }
    let requestObect = {
      assesseeId: '0123456',
      associateId: '60520a349d66236bb84f8b1b',
      associateName:"Boppo Technologies",
      assessee: {
        informationBasic: informationBasic,
        informationAllocation: informationAllocation,
        informationContact: informationContact,
        informationPersonal: informationPersonal,
        informationEngagement: informationEngagement,
        informationSetup: informationSetup
      },
      associate: {
        id: "60520a349d66236bb84f8b1b",
        informationBasic: {
          associateName: "dsada",
          associateNameVerification: false,
          associateDescription: "asd",
          associatePicture: "",
          associatePictureVerification: false,
          associateFlag: null
        },
        informationSetup: null,
        informationContact: {
          associateAddressWebsite: null,
          associateAddressWebsiteVerification: false,
          associateAddressWorkPrimary: {
            associateAddressCountryRegion: "91",
            associateAddressProvinceState: "211",
            associateAddressPostcode: "dasas",
            associateAddressCity: "345",
            associateAddress: "dasd",
            associateAddressCommunication: false,
            associateAddressVerification: false
          },
          associateAddressWorkSecondary: null,
          associateTelephoneWorkPrimary: {
            associateTelephoneCountryRegion: "91",
            associateTelephoneAreaCity: "345",
            associateTelephoneNumber: "ssad",
            associateTelephoneExtension: "sad",
            associateTelephoneCommunication: false,
            associateTelephoneVerification: false
          },
          associateTelephoneWorkSecondary: null
        },
        informationCredential: null,
        informationFramework: null,
        parentId: "605091f81edc573048fb467a"
      }
    };
    console.log('ONCLICK assessee Create Yes', requestObect);
    console.log('loading start');
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSESSEE_SAGA, payload: requestObect });
    /* let attributeList = [];
    const dataEmail = {
      Name: 'email',
      Value: 'pushpa.k@boppotechnologies.com' // 'shivam.s@boppotechnologies.com' //'pushpa.k@boppotechnologies.com'
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    // const preferredUsername = {
    //   Name: 'preferred_username',
    //   Value: 'pushpa.k@boppotechnologies.com'
    // };
    // const attributePreferredUsername = new CognitoUserAttribute(preferredUsername);
    // attributeList.push(attributePreferredUsername);
    //TODO: Cognito SIGN-UP
    userPool.signUp(
      'pushpa.k@boppotechnologies.com', //username//shivam-sharma //pushpa-boppo //pushpa-admin
      'Admin@123', //password
      attributeList, // required attribute list
      null,
      (error, data) => {
        console.log('SIGN-ON DATA===>', data);
        console.log('SIGN-ON ERROR===>', error);
      }
    );*/
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
    } else {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'CONFIRMATIONPOPUP' } });
    }
  };
  return (
    <div>
      <PopUpAssesseeName
        isActive={isPopUpValue === 'ASSESSEENAMEPOPUP'}
        inputHeader={'name'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        basicInfo={assesseeInfo.informationBasic}
        nextPopUpValue={'ALIASPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_BASIC_INFO}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'alias'}
        actualLableValue={'assesseeAlias'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        basicInfo={assesseeInfo.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_BASIC_INFO}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'EMAILPOPUP'}
      />
      <PopUpAddressEmail
        isActive={isPopUpValue === 'EMAILPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
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
      />
      <PopUpAddressEmail
        isActive={isPopUpValue === 'EMAILSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
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
      />
      <PopUpCheckbox
        isActive={isPopUpValue === 'FORCETOSELECTCOMMUNICATION'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
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
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'mobile telephone'}
        primaryheader={'primary'}
        basicInfo={informationContact.assesseeTelephoneMobilePrimary}
        nextPopUpValue={'SINGLEDROPDOWNPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_MOBILE_INFO}
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
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        basicInfo={assesseeInfo.informationPersonal}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_PERSONAL_INFO}
        handleNextPopupValue={handleNextPopupValue}
      />
      <PopUpTagPrimary
        isActive={isPopUpValue === 'TAGPRIMARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        signInSetup={assesseeInfo.informationSetup}
        // nextPopUpValue={'CONFIRMATIONPOPUP'}
        handleNextPopupValue={handleNextPopupValue}
        typeOfSetObject={UPDATE_ASSESSEE_SETUP_PRIMARY_INFO}
      />
      <PopUpTagSecondary
        isActive={isPopUpValue === 'TAGSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        tagSecondary={assesseeInfo.informationEngagement}
        signInSetup={assesseeInfo.informationSetup}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_ENGAGEMENT_INFO}
      />
      <PopUpCheckbox
        isActive={isPopUpValue === 'FORCETOSELECTSIGNIN'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        valueArr={[
          'email address (primary)',
          'email address (secondary)',
          'tag (primary)',
          'tag (secondary)'
        ]}
        forceToSelect="signIn"
        typeOfSetObject={UPDATE_ASSESSEE_SETUP_PRIMARY_INFO}
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
        headerOne={'assessee'}
        headerOneBadgeOne={'create'}
        onClickYes={onClickYes}
      />
    </div>
  );
};

export default PopUpSignOnAssessee;
