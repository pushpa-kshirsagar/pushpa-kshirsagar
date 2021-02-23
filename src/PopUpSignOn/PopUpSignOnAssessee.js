import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../PopUpInformation/PopUpPicture';
import PopUpAssesseeName from '../PopUpInformation/PopUpAssesseeName';
import PopUpTextField from '../PopUpInformation/PopUpTextField';
import PopUpAddressEmail from '../PopUpInformation/PopUpAddressEmail';
import PopUpDropList from '../PopUpInformation/PopUpDropList';
import PopUpConfirmation from '../PopUpGeneric/PopUpConfirmation';
import PopUpTelephone from '../PopUpInformation/PopUpTelephone';
import PopUpAddress from '../PopUpInformation/PopUpAddress';
import {
  CLEAR_ASSESSEE_INFO,
  POPUP_CLOSE,
  UPDATE_ASSESSEE_PERSONAL_INFO,
  UPDATE_ASSESSEE_BASIC_INFO,
  UPDATE_ASSESSEE_INFO,
  UPDATE_ASSESSEE_MOBILE_INFO,
  UPDATE_ASSESSEE_HOMEADDRESS_INFO
} from '../actionType';

const PopUpSignOnAssessee = () => {
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const assesseeInfo = useSelector((state) => state.AssesseeCreateReducer);
  const dispatch = useDispatch();
  const onClickYes = async () => {
    console.log('ONCLICK YES', assesseeInfo);
    const {
      basicInfo,
      communication,
      emailAddressPrimary,
      emailAddressSecondary,
      homeAddressInfo,
      mobileTelephone,
      personalInfo,
      signIn,
      tagprimary,
      tagsecondary,
      tenureend,
      tenurestart
    } = assesseeInfo;
   //TODO SIGN UP
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
        basicInfo={assesseeInfo.basicInfo}
        nextPopUpValue={'ALIASPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_BASIC_INFO}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'alias'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        basicInfo={assesseeInfo.basicInfo}
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
        tag={'emailAddressPrimary'}
        basicInfo={assesseeInfo}
        nextPopUpValue={'MOBILETELEPHONEPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_INFO}
      />
      <PopUpAddress
        isActive={isPopUpValue === 'HOMEADDRESSPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'home address'}
        primaryheader={'primary'}
        tag={'emailAddressPrimary'}
        basicInfo={assesseeInfo.homeAddressInfo}
        nextPopUpValue={'MOBILETELEPHONEPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_HOMEADDRESS_INFO}
      />
      <PopUpTelephone
        isActive={isPopUpValue === 'MOBILETELEPHONEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'mobile telephone'}
        primaryheader={'primary'}
        basicInfo={assesseeInfo.mobileTelephone}
        nextPopUpValue={'SINGLEDROPDOWNPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_MOBILE_INFO}
      />
      <PopUpDropList
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
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        isRequired={true}
        basicInfo={assesseeInfo.personalInfo}
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
