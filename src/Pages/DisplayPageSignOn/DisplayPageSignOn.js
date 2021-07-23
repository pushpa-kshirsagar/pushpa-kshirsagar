import React, { useState } from 'react';
import iGuruLogo from '../../images/iglogo1.png';
import { useDispatch, useSelector } from 'react-redux';
import '../DisplayPageSignIn/DisplayPageSignIn.css';
// import bgImg from '../../images/bg.jpeg'; // old background Image
import IconButtonUI from '../../Molecules/IconButton/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import { ASSESSEE_SIGN_ON, ASSOCIATE_SIGN_ON } from '../../actionType';
import PopUpAssesseeCreateSignOn from '../../Molecules/PopUpCreate/PopUpAssesseeCreateSignOn';
import PopUpAssociateCreateSignOn from '../../Molecules/PopUpCreate/PopUpAssociateCreateSignOn';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import { Fragment } from 'react';
import LoadingComponent from '../../PopUpInformation/LoadingComponent';
const DisplayPageSignOn = () => {
  const bgImg = './Image/bg.jpg';
  const style = {
    backgroundPosition: '50% 50%',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover'
  };
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const handleClick = () => {
    let type = selected;
    if (type === 'assessee') {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEENAMEPOPUP', popupMode: 'ASSESSEE_SIGN_ON' }
      });
    }
    if (type === 'associate') {
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: {
          isPopUpValue: 'NAMEALIASPOPUP',
          popupMode: 'ASSOCIATE_SIGN_ON'
        }
      });
    }
  };
  const { isPopUpOpen, popupMode } = useSelector((state) => state.PopUpReducer);
  const { isLoading } = useSelector((state) => state.LoaderReducer);

  return (
    <div style={style} className="signin-container">
      <div className="form-box">
        {isPopUpOpen === false && (
          <Fragment>
            {' '}
            <div className="form-header">
              <div className="form-header-logo-container">
                <img className="form-header-logo-img" src={iGuruLogo} alt="iGuru logo" />
              </div>
              <div>
                <IconButton className="form-icon-style" onClick={handleClick}>
                  <SendIcon style={{ height: 20, width: 20 }} />
                </IconButton>
              </div>
            </div>
          </Fragment>
        )}
        {isPopUpOpen === false && (
          <div className="form-inputs-signoncantainer">
            <div id="dialog-description">
              <div className="true">
                <div className={'footerPopupIcons'}>
                  <div className={'mbPager'}>
                    <div>
                      <IconButtonUI
                        colour={'displayPaneLeft'}
                        Icon={PersonIcon}
                        label={'assessee'}
                        labelTwo={'sign-on'}
                        className={selected === 'assessee' ? 'imageNASelected' : 'imageNA'}
                        onClick={() => {
                          setSelected('assessee');
                        }}
                      />
                    </div>

                    <div>
                      <IconButtonUI
                        colour={'displayPaneLeft'}
                        Icon={AssociateIcon}
                        label={'associate'}
                        labelTwo={'sign-on'}
                        className={selected === 'associate' ? 'imageNASelected' : 'imageNA'}
                        onClick={() => {
                          setSelected('associate');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {popupMode === 'ASSESSEE_SIGN_ON' && <PopUpAssesseeCreateSignOn />}
      {popupMode === 'ASSOCIATE_SIGN_ON' && <PopUpAssociateCreateSignOn />}
      <LoadingComponent isActive={isLoading} />
    </div>
  );
};
export default DisplayPageSignOn;
