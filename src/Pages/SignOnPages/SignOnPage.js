import React from 'react';
import iGuruLogo from '../../images/iglogo1.png';
import { useDispatch, useSelector } from 'react-redux';
import '../SignInPage/SignInPage.css';
import bgImg from '../../images/bg.jpeg';
import IconButton from '../../Molecules/IconButton/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import { ASSESSEE_SIGN_ON, ASSOCIATE_SIGN_ON } from '../../actionType';
import PopUpAssesseeSignON from '../../PopUpAction/PopUpAssesseeSignON';
import PopUpAssociateSignON from '../../PopUpAction/PopUpAssociateSignON';

const SignOnPage = () => {
  const style = {
    backgroundPosition: '50% 50%',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover'
  };
  const dispatch = useDispatch();
  const { isPopUpOpen, popupMode } = useSelector((state) => state.popUpReducer);

  return (
    <div style={style} className="signin-container">
      <div className="form-box">
        <div className="form-header">
          <div className="form-header-logo-container">
            <img className="form-header-logo-img" src={iGuruLogo} alt="iGuru logo" />
          </div>
        </div>
        {isPopUpOpen === false && (
          <div className="form-inputs-cantainer">
            <div id="dialog-description">
              <div className="true">
                <div className={'footerPopupIcons'}>
                  <div className={'mbPager'}>
                    <IconButton
                      colour={'displayPaneLeft'}
                      Icon={PersonIcon}
                      label={'assessee'}
                      labelTwo={'sign-on'}
                      className={'imageNA'}
                      onClick={() => {
                        dispatch({
                          type: ASSESSEE_SIGN_ON,
                          payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ASSESSEE_SIGN_ON' }
                        });
                      }}
                    />

                    <IconButton
                      colour={'displayPaneLeft'}
                      Icon={AssociateIcon}
                      label={'associate'}
                      labelTwo={'sign-on'}
                      className={'imageNA'}
                      onClick={() => {
                        dispatch({
                          type: ASSOCIATE_SIGN_ON,
                          payload: {
                            isPopUpValue: 'NAMEALIASPOPUP',
                            popupMode: 'ASSOCIATE_SIGN_ON'
                          }
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {popupMode === 'ASSESSEE_SIGN_ON' && <PopUpAssesseeSignON />}
      {popupMode === 'ASSOCIATE_SIGN_ON' && <PopUpAssociateSignON />}
    </div>
  );
};
export default SignOnPage;
