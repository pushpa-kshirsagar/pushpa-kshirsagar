import React, { useEffect } from 'react';
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
  CLEAR_ASSESSEE_INFO
} from '../actionType';
const PopUpSignOnAssociate = () => {
  const { popupMode, isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const associateInfo = useSelector((state) => state.AssociateCreateReducer);
  const assesseeInfo = useSelector((state) => state.AssesseeCreateReducer);
  const informationContact = assesseeInfo.informationContact;
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
      informationSetup,
      informationEngagement,
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
      assesseeId: '0123456',
      associateId: '605091f81edc573048fb467a',
      associate: {
        informationBasic: associateInfo.informationBasic,
        informationAllocation: associateInfo.informationAllocation,
        informationContact: associateInfo.informationContact
      },
      assessee: {
        informationBasic: informationBasic,
        informationAllocation: informationAllocation,
        informationContact: informationContact,
        informationEngagement: informationEngagement,
        informationPersonal: informationPersonal,
        informationSetup: informationSetup
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
      if (popupMode === 'ASSOCIATE_SIGN_ON') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'EMAILPOPUP' } });
      } else {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'ASSESSEEROLELISTPOPUP' } });
      }
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
      />
      <PopUpPicture
        isActive={isPopUpValue === 'ASSOCIATEPICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        basicInfo={associateInfo.basicInfo}
        nextPopUpValue={'ROLEPOPUP'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ROLEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        inputHeader={'role'}
        inputHeaderBadge={'primary'}
        nextPopUpValue={'WORKADDRESSPOPUP'}
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
        isActive={isPopUpValue === 'ASSESSEEROLELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        inputHeader={'role'}
        inputHeaderBadge={'primary'}
        nextPopUpValue={'EMAILPOPUP'}
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
