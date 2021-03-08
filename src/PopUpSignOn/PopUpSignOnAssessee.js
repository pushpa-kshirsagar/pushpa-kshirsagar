import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../PopUpInformation/PopUpPicture';
import PopUpAssesseeName from '../PopUpInformation/PopUpAssesseeName';
import PopUpTextField from '../PopUpInformation/PopUpTextField';
import PopUpAddressEmail from '../PopUpInformation/PopUpAddressEmail';
import PopUpDropList from '../PopUpInformation/PopUpDropList';
import PopUpConfirmation from '../PopUpGeneric/PopUpConfirmation';
import PopUpTelephone from '../PopUpInformation/PopUpTelephone';
import {
  CLEAR_ASSESSEE_INFO,
  POPUP_CLOSE,
  UPDATE_ASSESSEE_PERSONAL_INFO,
  UPDATE_ASSESSEE_BASIC_INFO,
  UPDATE_ASSESSEE_MOBILE_INFO,
  UPDATE_ASSESSEE_ADDRESS_EMAIL_PRIMARY_INFO
} from '../actionType';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userPool from '../UserPool';

const PopUpSignOnAssessee = () => {
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const assesseeInfo = useSelector((state) => state.AssesseeCreateReducer);
  const informationContact = assesseeInfo.informationContact;
  const dispatch = useDispatch();
  const onClickYes = async () => {
    const {
      informationBasic,
      informationAllocation,
      informationContact,
      informationPersonal,
      informationSetup
    } = assesseeInfo;
    let requestObect = {
      informationBasic: informationBasic,
      informationAllocation: informationAllocation,
      informationContact: informationContact,
      informationPersonal: informationPersonal,
      informationSetup: informationSetup
    };
    console.log('ONCLICK YES', requestObect);
    let attributeList = [];
    const dataEmail = {
      Name: 'email',
      Value: 'shivamsharma.sss11@gmail.com' // 'shivam.s@boppotechnologies.com' //'pushpa.k@boppotechnologies.com'
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    //TODO: Cognito SIGN-UP
    userPool.signUp(
      'test-admin', //username
      'Admin@123', //password
      attributeList, // required attribute list
      null,
      (error, data) => {
        console.log('SIGN-ON DATA===>', data);
        console.log('SIGN-ON ERROR===>', error);
      }
    );
  };

  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_ASSESSEE_INFO });
    dispatch({ type: POPUP_CLOSE });
  };

  return (
    <div>
      <PopUpAssesseeName
        isActive={isPopUpValue === 'NAMEPOPUP'}
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
        typeOfSetObject={UPDATE_ASSESSEE_ADDRESS_EMAIL_PRIMARY_INFO}
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
