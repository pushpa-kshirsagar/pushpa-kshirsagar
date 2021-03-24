import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { GET_USER_SAGA } from '../../actionType';
import HeaderZero from '../../Molecules/HeaderZero/HeaderZero';
import './DisplayPageOne.css';
import DisplayPaneOne from '../../Organisms/DisplayPaneOne/DisplayPaneOne';
import DisplayPaneThree from '../../Organisms/DisplayPaneThree/DisplayPaneThree';
import DisplayPaneTwo from '../../Organisms/DisplayPaneTwo/DisplayPaneTwo';
import GridColumn from '../../Molecules/GridColumn/GridColumn';
import DisplayPaneFour from '../../Organisms/DisplayPaneFour/DisplayPaneFour';
import DisplayPaneFive from '../../Organisms/DisplayPaneFive/DisplayPaneFive';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AccountContext } from '../../Account';
import LoadingComponent from '../../PopUpInformation/LoadingComponent';

// import { useHistory } from 'react-router-dom';

const DisplayPageOne = () => {
  // const { userData = null } = useSelector((state) => state.userReducer);
  const { gridColumnCountValue } = useSelector((state) => state.PopUpReducer);
  const { isDisplayPaneFourShow } = useSelector((state) => state.assessmentReducer);
  const { isLoading } = useSelector((state) => state.LoaderReducer);
  const { mobilePanestate } = useSelector((state) => state.DisplayPaneTwoReducer);

  const dispatch = useDispatch();
  const isExamMode = false;
  const { getSession } = useContext(AccountContext);
 //* code for change username and any attribute
  const changeUserName = () => {
    getSession()
      .then(({ user }) => {
        let attributeList = [];
        const attributeOb = {
          Name: 'preferred_username',
          Value: '8868916398' //'shivam.s@boppotechnologies.com'
        };
        const attribute = new CognitoUserAttribute(attributeOb);
        attributeList.push(attribute);
        user.updateAttributes(attributeList, function (err, result) {
          if (err) {
            console.log('IN ERROR ON CHANGE USERNAME', err);
            return;
          }
          console.log('call result: ' + result);
        });
      })
      .catch((err) => {
        console.log('SESSION ERR=====', err);
      });
  };

  useEffect(() => {
    dispatch({ type: GET_USER_SAGA });
  }, [dispatch]);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const userName =
    selectedAssociateInfo &&
    selectedAssociateInfo.assesseeInformation.assesseeNameFirst +
      ' ' +
      selectedAssociateInfo.assesseeInformation.assesseeNameLast;
  const userEmail =
    selectedAssociateInfo && selectedAssociateInfo.assesseeInformation.assesseeEmail;

  return (
    <>
      <HeaderZero userName={userName} userEmail={userEmail} />
      <LoadingComponent isActive={isLoading} />
      {gridColumnCountValue !== 0 ? (
        <GridColumn isExamMode={isExamMode} columnCount={gridColumnCountValue} />
      ) : null}
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
                  {/* <button onClick={changeUserName}>Change Username</button> */}
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
