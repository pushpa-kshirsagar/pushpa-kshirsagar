import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopUpPicture from '../PopUpComponent/PopUpPicture';
import PopUpNameDesc from '../PopUpComponent/PopUpNameDesc';
import PopUpHomeWorkTelephone from '../PopUpComponent/PopUpHomeWorkTelephone';
import PopUpAddress from '../PopUpComponent/PopUpAddress';
import PopUpList from '../PopUpComponent/PopUpList';
import PopUpAssesseeName from '../PopUpComponent/PopUpAssesseeName';
import PopUpEmail from '../PopUpComponent/PopUpEmail';
import PopUpMobileTelephone from '../PopUpComponent/PopUpMobileTelephone';
import PopUpConfirmation from '../PopUpComponent/PopUpConfirmation';
import PopUpSingleDropDown from '../PopUpComponent/PopUpSingleDropDown';
import {
  SET_NEXT_POPUP,
  CLEAR_ASSOCIATE_INFO,
  POPUP_CLOSE,
  UPDATE_ASSOCIATE_BASIC_INFO,
  UPDATE_ASSOCIATE_INFO,
  UPDATE_ASSOCIATE_WORKADDRESS_INFO,
  UPDATE_ASSOCIATE_WORKTELEPHONE_INFO,
  UPDATE_ASSOCIATE_ADMIN_BASIC_INFO,
  UPDATE_ASSOCIATE_ADMIN_MOBILE_INFO,
  UPDATE_ASSOCIATE_ADMIN_PERSONAL_INFO,
} from '../actionType';
const PopUpAssociateSignON = () => {
  const { popupMode, isPopUpValue } = useSelector((state) => state.popUpReducer);
  const associateInfo = useSelector((state) => state.CreateAssociateReducer);
  console.log(associateInfo);
  console.log('==================');
  const dispatch = useDispatch();

  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_ASSOCIATE_INFO });
    dispatch({ type: POPUP_CLOSE });
  };

  console.log('basicInfo');
  console.log(isPopUpValue);
  console.log('isPopUpValue');

  const onClickYes = () => {
    if (popupMode === 'ASSOCIATE_SIGN_ON') {
      dispatch({
        type: SET_NEXT_POPUP,
        payload: { isPopUpValue: 'NAMEPOPUP' }
      });
    }
  };
  return (
    <div>
      <PopUpNameDesc
        isActive={isPopUpValue === 'NAMEALIASPOPUP'}
        label={'name'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={'DESCRIPTIONPOPUP'}
        basicInfo={associateInfo.basicInfo}
        typeOfSetObject={UPDATE_ASSOCIATE_BASIC_INFO}
      />
      <PopUpNameDesc
        isActive={isPopUpValue === 'DESCRIPTIONPOPUP'}
        label={'description'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        isRequired={false}
        basicInfo={associateInfo.basicInfo}
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
      <PopUpList
        isActive={isPopUpValue === 'ROLEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        inputHeader={'role'}
        primaryheader={'primary'}
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
        basicInfo={associateInfo.workAddressInfo}
        typeOfSetObject={UPDATE_ASSOCIATE_WORKADDRESS_INFO}


      />
      <PopUpHomeWorkTelephone
        isActive={isPopUpValue === 'WORKTELEPHONE'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'information'}
        inputHeader={'work telephone'}
        primaryheader={'primary'}
        basicInfo={associateInfo.workTeleponeInfo}
        typeOfSetObject={UPDATE_ASSOCIATE_WORKTELEPHONE_INFO}
        nextPopUpValue={'ASSOCIATECONFIRMATIONPOPUP'}

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
        basicInfo={associateInfo.adminBasicInfo}
        typeOfSetObject={UPDATE_ASSOCIATE_ADMIN_BASIC_INFO}
      />
      <PopUpNameDesc
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'alias'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'PICTUREPOPUP'}
        basicInfo={associateInfo.adminBasicInfo}
        typeOfSetObject={UPDATE_ASSOCIATE_ADMIN_BASIC_INFO}

      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'EMAILPOPUP'}
        basicInfo={associateInfo.adminBasicInfo}
        typeOfSetObject={UPDATE_ASSOCIATE_ADMIN_BASIC_INFO}

      />
      <PopUpEmail
        isActive={isPopUpValue === 'EMAILPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        primaryLabel={'email address'}
        nextPopUpValue={'MOBILETELEPHONEPOPUP'}
        tag={'emailAddressPrimary'}
        basicInfo={associateInfo}
        typeOfSetObject={UPDATE_ASSOCIATE_INFO}

      />
      <PopUpMobileTelephone
        isActive={isPopUpValue === 'MOBILETELEPHONEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'information'}
        inputHeader={'mobile telephone'}
        primaryheader={'primary'}
        nextPopUpValue={'SINGLEDROPDOWNPOPUP'}
        basicInfo={associateInfo.AdminMobileTelephone}
        typeOfSetObject={UPDATE_ASSOCIATE_ADMIN_MOBILE_INFO}

      />
       <PopUpSingleDropDown
        isActive={isPopUpValue === 'SINGLEDROPDOWNPOPUP'}
        tag={'gender'}
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
        basicInfo={associateInfo.AdminPersonalInfo}
        typeOfSetObject={UPDATE_ASSOCIATE_ADMIN_PERSONAL_INFO}

      />
      <PopUpConfirmation
        isActive={isPopUpValue === 'CONFIRMATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'administrator'}
        headerOneBadgeOne={'create'}
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

export default PopUpAssociateSignON;
