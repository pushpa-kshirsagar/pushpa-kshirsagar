import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_SAGA, SIGNON } from '../../actionType';
import IguruTopHeader from '../../Molecules/IguruTopHeader/IguruTopHeader';
import PopUpPicture from '../../PopupComponent/PopUpPicture';
import PopUpAssesseeName from '../../PopupComponent/PopUpAssesseeName';
import PopUpNameDesc from '../../PopupComponent/PopUpNameDesc';
import PopUpEmail from '../../PopupComponent/PopUpEmail';
import PopUpSingleDropDown from '../../PopupComponent/PopUpSingleDropDown';
import PopUpSingleInput from '../../PopupComponent/PopUpSingleInput';
import PopUpList from '../../PopupComponent/PopUpList';
import PopUpAddress from '../../PopupComponent/PopUpAddress';
import PopUpDatePicker from '../../PopupComponent/PopUpDatePicker';
import PopUpTagSecondary from '../../PopupComponent/PopUpTagSecondary';
import PopUpMobileTelephone from '../../PopupComponent/PopUpMobileTelephone';
import './DashboardPage.css';
import DisplayPaneLeft from '../../Organism/DisplayPaneLeft/DisplayPaneLeft';
import DisplayPaneRight from '../../Organism/DisplayPaneRight/DisplayPaneRight';
import DisplayPaneCenter from '../../Organism/DisplayPaneCenter/DisplayPaneCenter';
import GridUI from '../../Molecules/GridUI/GridUI';

const DashboardPage = () => {
  const { userData = null } = useSelector((state) => state.userReducer);
  const { popupMode, isPopUpValue } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();
  console.log('IN DASH=', isPopUpValue, popupMode);

  useEffect(() => {
    console.log('IN useEffect ====>');
    dispatch({ type: GET_USER_SAGA });
  }, [dispatch]);

  return (
    <>
      {userData && <IguruTopHeader userName={userData.name} userEmail={userData.email} />}
      <GridUI />
      <div className="main-container">
        <div className="display-pane-container">
          <DisplayPaneLeft />
        </div>
        <div className="display-pane-container">
          <DisplayPaneCenter />
        </div>
        <div className="display-pane-container">
          <DisplayPaneRight />
        </div>
      </div>

      <PopUpPicture isActive={isPopUpValue === 'PICTUREPOPUP'} />
      <PopUpAssesseeName isActive={isPopUpValue === 'NAMEPOPUP'} />
      <PopUpNameDesc isActive={isPopUpValue === 'ALIASPOPUP'} label={'alias'} />
      <PopUpEmail isActive={isPopUpValue === 'EMAILPOPUP'} />
      <PopUpList isActive={isPopUpValue === 'LISTPOPUP'} />
      <PopUpAddress isActive={isPopUpValue === 'ADDRESSPOPUP'} />
      <PopUpSingleInput isActive={isPopUpValue === 'SINGLEINPUTPOPUP'} />
      <PopUpDatePicker isActive={isPopUpValue === 'DatePicker'} />
      <PopUpTagSecondary isActive={isPopUpValue === 'TagSecondary'} />
      <PopUpMobileTelephone isActive={isPopUpValue === 'MobileTelephone'} />
      <PopUpSingleDropDown
        isActive={isPopUpValue === 'SINGLEDROPDOWNPOPUP'}
        tag={'gender'}
        listSelect={[' ', 'Female', 'Male', 'Unlisted']}
        labelval={'gender'}
      />
      {/* <div
        onClick={() => {
          dispatch({ type: SIGNON, payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'SIGNON' } });
        }}
      >
        DashboardPage
      </div> */}
    </>
  );
};

export default DashboardPage;
