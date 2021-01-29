import React, { useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import iGuruLogo from '../../images/iglogo1.png';
import '../SignInPage/SignInPage.css';
import InputField from '../../Atoms/InputField/InputField';
import bgImg from '../../images/bg.jpeg';
import Label from '../../Atoms/Labels/Label';
import IconButton from '../../Molecules/IconButton/IconButton'
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
const SignOnPage = () => {
  const style = {
    backgroundPosition: '50% 50%',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover'
  };
  return (
    <div style={style} className="signin-container">
      <div className="form-box">
        <div className="form-header">
          <div className="form-header-logo-container">
            <img className="form-header-logo-img" src={iGuruLogo} alt="iGuru logo" />
          </div>

        </div>
        <div className="form-inputs-cantainer">
        <div id="dialog-description">
            <div className="true">
              <div className={'footerPopupIcons'}>
                <div className={'mbPager'}>
                    <IconButton colour={'displayPaneLeft'}
                    Icon={PersonIcon}
                    label={'assessee'}/>
                  
                  <IconButton colour={'displayPaneLeft'}
                    Icon={AssociateIcon}
                    label={'associate'}/>
                  </div>
                </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default SignOnPage;
