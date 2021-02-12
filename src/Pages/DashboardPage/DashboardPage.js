import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { GET_USER_SAGA } from '../../actionType';
import IguruTopHeader from '../../Molecules/IguruTopHeader/IguruTopHeader';
import './DashboardPage.css';
import DisplayPaneOne from '../../Organism/DisplayPaneOne/DisplayPaneOne';
import DisplayPaneThree from '../../Organism/DisplayPaneThree/DisplayPaneThree';
import DisplayPaneTwo from '../../Organism/DisplayPaneTwo/DisplayPaneTwo';
import GridUI from '../../Molecules/GridUI/GridUI';
import DisplayPaneFour from '../../Organism/DisplayPaneFour/DisplayPaneFour';
import DisplayPaneFive from '../../Organism/DisplayPaneFive/DisplayPaneFive';

const DashboardPage = () => {
  const { userData = null } = useSelector((state) => state.userReducer);
  const { popupMode, isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const mobilePanestate = isMobile && 'displayPaneTwo';
  const isExamMode = false;
  console.log('IN DASH=', isPopUpValue, popupMode);
  useEffect(() => {
    console.log('IN useEffect ====>');
    dispatch({ type: GET_USER_SAGA });
  }, [dispatch]);

  return (
    <>
      {userData && <IguruTopHeader userName={userData.name} userEmail={userData.email} />}
      <GridUI isExamMode={isExamMode} />
      <div className="main-container">
        {isMobile ? (
          <div className="display-pane-container">
            {mobilePanestate === 'displayPaneOne' && <DisplayPaneOne />}
            {mobilePanestate === 'displayPaneTwo' && <DisplayPaneTwo />}
            {mobilePanestate === 'displayPaneThree' && <DisplayPaneThree />}
            {mobilePanestate === 'displayPaneFour' && <DisplayPaneFour />}
            {mobilePanestate === 'displayPaneFive' && <DisplayPaneFive />}
          </div>
        ) : (
          <>
            {isExamMode ? (
              <>
                <div className="display-pane-container">
                  <DisplayPaneFour />
                </div>
                <div style={{ width: '66.66%' }}>
                  <DisplayPaneFive />
                </div>
              </>
            ) : (
              <>
                <div className="display-pane-container">
                  <DisplayPaneOne />
                </div>
                <div className="display-pane-container">
                  <DisplayPaneTwo />
                </div>
                <div className="display-pane-container">
                  <DisplayPaneThree />
                </div>
              </>
            )}
          </>
        )}
      </div>

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
