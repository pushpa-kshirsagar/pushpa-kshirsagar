import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { GET_USER_SAGA } from '../../actionType';
import IguruTopHeader from '../../Molecules/IguruTopHeader/IguruTopHeader';
import './DashboardPage.css';
import DisplayPaneLeft from '../../Organism/DisplayPaneLeft/DisplayPaneLeft';
import DisplayPaneRight from '../../Organism/DisplayPaneRight/DisplayPaneRight';
import DisplayPaneCenter from '../../Organism/DisplayPaneCenter/DisplayPaneCenter';
import GridUI from '../../Molecules/GridUI/GridUI';
import DisplayPaneFour from '../../Organism/DisplayPaneFour/DisplayPaneFour';
import DisplayPaneFive from '../../Organism/DisplayPaneFive/DisplayPaneFive';

const DashboardPage = () => {
  const { userData = null } = useSelector((state) => state.userReducer);
  const { popupMode, isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const mobilePanestate = isMobile && 'displayPaneFive';
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
            {mobilePanestate === 'leftPane' && <DisplayPaneLeft />}
            {mobilePanestate === 'centerPane' && <DisplayPaneCenter />}
            {mobilePanestate === 'rightPane' && <DisplayPaneRight />}
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
                  <DisplayPaneLeft />
                </div>
                <div className="display-pane-container">
                  <DisplayPaneCenter />
                </div>
                <div className="display-pane-container">
                  <DisplayPaneRight />
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
