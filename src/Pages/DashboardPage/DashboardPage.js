import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_SAGA, POPUP_OPEN } from '../../actionType';
import IguruTopHeader from '../../Molecules/IguruTopHeader/IguruTopHeader';
import ErrorMessagePopUp from '../../Organisms/ErrorMessagePopUp';
import './DashboardPage.css';

const DashboardPage = () => {
  const { userData = null } = useSelector((state) => state.userReducer);
  const { isPopUpOpen, isPopUpValue } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();
  console.log('IN DASH=', isPopUpValue, isPopUpOpen);

  useEffect(() => {
    console.log('IN useEffect ====>');
    dispatch({ type: GET_USER_SAGA });
  }, [dispatch]);

  return (
    <>
      {userData && <IguruTopHeader userName={userData.name} userEmail={userData.email} />}
      <ErrorMessagePopUp isOpen={isPopUpOpen}/>
      <div
        onClick={() => {
          dispatch({ type: POPUP_OPEN, payload: 'ASSEESSES' });
        }}
      >
        DashboardPage
      </div>
    </>
  );
};

export default DashboardPage;
