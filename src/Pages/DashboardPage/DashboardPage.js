import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_SAGA, POPUP_OPEN, SIGN_ON_POPUP_FLOW, SIGNON } from '../../actionType';
import IguruTopHeader from '../../Molecules/IguruTopHeader/IguruTopHeader';
import PicturePopup from '../../Organisms/PicturePopup';
import AssesseeNamePopup from '../../Organisms/AssesseeNamePopup';
import NameDescPopup from '../../Organisms/NameDescPopup';
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
      <PicturePopup isOpen={isPopUpValue === 'PICTUREPOPUP'} />
      <AssesseeNamePopup isOpen={isPopUpValue === 'NAMEPOPUP'} />
      <NameDescPopup isOpen={isPopUpValue === 'ALIASPOPUP'} />
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
