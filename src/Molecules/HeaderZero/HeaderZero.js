import { Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import Label from '../../Atoms/Labels/Label';
import IconsButton from '../IconButton/IconButton';
import iGuruLogo from '../../images/iglogo1.png';
// import prafulta from '../../images/prafulta.jpg';
// import insightGURULogo from '../../images/prafulta.jpg';
import './HeaderZero.css';

export const HeaderZero = (props) => {
  // const insightGURULogo = require('../../images/prafulta.jpg');
  const {
    userName = 'Joachim Carvalho',
    userEmail = 'joachim.carvalho@insightguru.com',
    isImageActive = false
  } = props;
  const isBespoke = true;
  const iguruBrandLogo = './Image/logo-04.jpeg'; //'./Image/logo-03.jpeg'
  // const iguruMainLogo = isBespoke ? './Image/client-logo.jpeg' : './Image/main-logo.jpeg';
  const iguruMainLogo = './Image/main-logo.jpeg';

  return (
    <div className="header-container">
      {!isMobile ? (
        <>
          <div className="inner-container">
            <div style={{ padding: '2.5px', width: '100%', boxSizing: 'border-box' }}>
              <div
                style={{
                  padding: '0 5px',
                  width: '100%',
                  boxSizing: 'border-box',
                  display: 'flex'
                }}
              >
                <div style={{ flex: '4' }}>
                  <div className="logo-container">
                    <img className="logo-img" src={iguruMainLogo} alt="iGuru logo" />
                  </div>
                </div>
                <div
                  style={{
                    flex: '1',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  {isBespoke && (
                    <div>
                      <Avatar
                        alt=""
                        className="iguru-icon-container"
                        style={{ borderRadius: '0' }}
                        src={iguruBrandLogo}
                      />
                    </div>
                  )}
                </div>
                <div style={{ flex: '1' }}></div>
              </div>
            </div>
          </div>
          <div className="inner-container"></div>
          <div className="inner-container">
            <div style={{ padding: '2.5px', width: '100%', boxSizing: 'border-box' }}>
              <div
                style={{
                  padding: '0 5px',
                  width: '100%',
                  boxSizing: 'border-box',
                  display: 'flex'
                }}
              >
                <div style={{ flex: '1' }}></div>
                <div style={{ flex: '1' }}></div>
                <div style={{ flex: '4', display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex' }} className="">
                    <div className="text-right">
                      <div style={{ marginBottom: '5px' }}>
                        <Label
                          className=""
                          text={userName}
                          fontSize="1.6rem"
                          colour="rgba(0, 0, 0, 0.87)"
                        />
                      </div>
                      <div>
                        <Label
                          className=""
                          text={userEmail}
                          fontSize="1.2rem"
                          colour="rgba(0, 0, 0, 0.54)"
                        />
                      </div>
                    </div>
                    <div style={{ margin: '0 0 0 10px' }}>
                      {isImageActive ? (
                        <Avatar
                          alt=""
                          className="iguru-icon-container"
                          src={'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'}
                        />
                      ) : (
                        <IconsButton Icon={PersonIcon} className="imageNA iguru-icon-container" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="inner-container">
          <div style={{ padding: '2.5px', width: '100%', boxSizing: 'border-box' }}>
            <div
              style={{ padding: '0 5px', width: '100%', boxSizing: 'border-box', display: 'flex' }}
            >
              <div style={{ flex: '4' }}>
                <div className="logo-container">
                  <img className="logo-img" src={iguruMainLogo} alt="iGuru logo" />
                </div>
              </div>
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                {isBespoke && (
                  <div>
                    <Avatar
                      alt=""
                      className="iguru-icon-container"
                      style={{ borderRadius: '0' }}
                      src={iguruBrandLogo}
                    />
                  </div>
                )}
              </div>
              <div style={{ flex: '1' }}>
                <div>
                  {isImageActive ? (
                    <Avatar
                      alt=""
                      className="iguru-icon-container"
                      src={'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'}
                    />
                  ) : (
                    <IconsButton Icon={PersonIcon} className="imageNA iguru-icon-container" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

HeaderZero.propTypes = {
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  isImageActive: PropTypes.bool
};

export default HeaderZero;
