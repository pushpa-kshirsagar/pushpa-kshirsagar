import React from 'react';
import { useSelector } from 'react-redux';
import PopUpPicture from '../PopUpComponent/PopUpPicture';
import PopUpAssesseeName from '../PopUpComponent/PopUpAssesseeName';
import PopUpNameDesc from '../PopUpComponent/PopUpNameDesc';
import PopUpEmail from '../PopUpComponent/PopUpEmail';
import PopUpSingleDropDown from '../PopUpComponent/PopUpSingleDropDown';
import PopUpConfirmation from '../PopUpComponent/PopUpConfirmation';
import PopUpMobileTelephone from '../PopUpComponent/PopUpMobileTelephone';

const PopUpAssesseeSignON = () => {
  const { isPopUpValue } = useSelector((state) => state.popUpReducer);
  return (
    <div>
      <PopUpAssesseeName
        isActive={isPopUpValue === 'NAMEPOPUP'}
        inputHeader={'name'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
      />
      <PopUpNameDesc
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'alias'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
      />
      <PopUpEmail
        isActive={isPopUpValue === 'EMAILPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        primaryLabel={'email address'}
      />
      <PopUpMobileTelephone
        isActive={isPopUpValue === 'MobileTelephone'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        inputHeader={'mobile telephone'}
        primaryheader={'primary'}
      />
      <PopUpConfirmation
        isActive={isPopUpValue === 'CONFIRMATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'create'}
      />
      <PopUpSingleDropDown
        isActive={isPopUpValue === 'SINGLEDROPDOWNPOPUP'}
        tag={'gender'}
        listSelect={[' ', 'Female', 'Male', 'Unlisted']}
        labelval={'gender'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'information'}
        isRequired={true}
      />
    </div>
  );
};

export default PopUpAssesseeSignON;
