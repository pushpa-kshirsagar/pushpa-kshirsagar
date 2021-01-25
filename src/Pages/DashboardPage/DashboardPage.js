import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_OPEN } from '../../actionType';
import IguruTopHeader from '../../Molecules/IguruTopHeader/IguruTopHeader';
import PicturePopup from '../../Organisms/PicturePopup';
import './DashboardPage.css';

const DashboardPage = () => {
  const { isPopUpOpen, isPopUpValue } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();
  console.log('IN DASH=', isPopUpValue, isPopUpOpen);

  return (
    <>
      <IguruTopHeader />
      <PicturePopup isOpen={isPopUpOpen} />
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
