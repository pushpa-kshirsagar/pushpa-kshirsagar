import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_SAGA, SIGNON } from '../../actionType';
import IguruTopHeader from '../../Molecules/IguruTopHeader/IguruTopHeader';
import PopupPicture from '../../PopupComponent/PopupPicture';
import PopupAssesseeName from '../../PopupComponent/PopupAssesseeName';
import PopupNameDesc from '../../PopupComponent/PopupNameDesc';
import PopupEmail from '../../PopupComponent/PopupEmail';
import PopupSingleDropDown from '../../PopupComponent/PopupSingleDropDown';
import PopupList from '../../PopupComponent/PopupList';
import PopupAddress from '../../PopupComponent/PopupAddress';
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

      <PopupPicture isActive={isPopUpValue === 'PICTUREPOPUP'} />
      <PopupAssesseeName isActive={isPopUpValue === 'NAMEPOPUP'} />
      <PopupNameDesc isActive={isPopUpValue === 'ALIASPOPUP'} label={'alias'} />
      <PopupEmail isActive={isPopUpValue === 'EMAILPOPUP'} />
      <PopupList isActive={isPopUpValue === 'LISTPOPUP'} />
      <PopupAddress isActive={isPopUpValue === 'ADDRESSPOPUP'} />
      <PopupSingleDropDown
        isActive={isPopUpValue === 'SINGLEDROPDOWNPOPUP'}
        tag={'gender'}
        listSelect={[' ', 'Female', 'Male', 'Unlisted']}
        labelval={'gender'}
      />
      <div
        onClick={() => {
          dispatch({ type: SIGNON, payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'SIGNON' } });
        }}
      >
        DashboardPage
      </div>
    </>
  );
};

export default DashboardPage;
