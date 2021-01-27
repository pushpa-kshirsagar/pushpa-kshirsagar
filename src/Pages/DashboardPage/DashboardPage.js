import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_SAGA, SIGNON } from '../../actionType';
import IguruTopHeader from '../../Molecules/IguruTopHeader/IguruTopHeader';
import PicturePopup from '../../PopupComponent/PicturePopup';
import AssesseeNamePopup from '../../PopupComponent/AssesseeNamePopup';
import NameDescPopup from '../../PopupComponent/NameDescPopup';
import EmailPopup from '../../PopupComponent/EmailPopup';
import SingleDropDownPopup from '../../PopupComponent/SingleDropDownPopup';
import './DashboardPage.css';

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
      <PicturePopup isActive={isPopUpValue === 'PICTUREPOPUP'} />
      <AssesseeNamePopup isActive={isPopUpValue === 'NAMEPOPUP'} />
      <NameDescPopup isActive={isPopUpValue === 'ALIASPOPUP'} />
      <EmailPopup isActive={isPopUpValue === 'EMAILPOPUP'} />
      <SingleDropDownPopup
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
