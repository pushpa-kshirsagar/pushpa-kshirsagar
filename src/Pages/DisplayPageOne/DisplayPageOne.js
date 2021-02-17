import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { GET_USER_SAGA } from '../../actionType';
import IguruTopHeader from '../../Molecules/IguruTopHeader/IguruTopHeader';
import './DisplayPageOne.css';
import DisplayPaneOne from '../../Organism/DisplayPaneOne/DisplayPaneOne';
import DisplayPaneThree from '../../Organism/DisplayPaneThree/DisplayPaneThree';
import DisplayPaneTwo from '../../Organism/DisplayPaneTwo/DisplayPaneTwo';
import GridUI from '../../Molecules/GridUI/GridUI';
import DisplayPaneFour from '../../Organism/DisplayPaneFour/DisplayPaneFour';
import DisplayPaneFive from '../../Organism/DisplayPaneFive/DisplayPaneFive';

const DisplayPageOne = () => {
  const { userData = null } = useSelector((state) => state.userReducer);
  const { popupMode, isPopUpValue, gridColumnCountValue } = useSelector(
    (state) => state.PopUpReducer
  );
  const { isDisplayPaneFourShow } = useSelector((state) => state.assessmentReducer);
  const dispatch = useDispatch();
  const mobilePanestate = isMobile && 'displayPaneTwo';
  const isExamMode = false;
  // console.log('IN DASH=', gridColumnCountValue);
  useEffect(() => {
    console.log('IN useEffect ====>');
    dispatch({ type: GET_USER_SAGA });
  }, [dispatch]);

  return (
    <>
      {userData && <IguruTopHeader userName={userData.name} userEmail={userData.email} />}
      {gridColumnCountValue !== 0 && (
        <GridUI isExamMode={isExamMode} columnCount={gridColumnCountValue} />
      )}
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
                <div style={{ width: isDisplayPaneFourShow ? '33.33%' : '4%' }}>
                  <DisplayPaneFour />
                </div>
                <div style={{ width: isDisplayPaneFourShow ? '66.66%' : '95.5%' }}>
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
    </>
  );
};

export default DisplayPageOne;
