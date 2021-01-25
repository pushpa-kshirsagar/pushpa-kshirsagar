import { Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import PropTypes from 'prop-types';
import Label from '../../Atoms/Labels/Label';
import IconsButton from '../IconButton/IconButton';
import iGuruLogo from '../../images/iglogo1.png';
import './IguruTopHeader.css';

export const IguruTopHeader = (props) => {
  const {
    userName = 'Joachim Carvalho',
    userEmail = 'joachim.carvalho@insightguru.com',
    isImageActive = false
  } = props;

  return (
    <div className="header-container">
      <div className="inner-container">
        <div>
          <div className="logo-container">
            <img className="logo-img" src={iGuruLogo} alt="iGuru logo" />
          </div>
        </div>
        <div className="flex-right">
          <div className="text-right">
            <div style={{ marginBottom: '5px' }}>
              <Label className="" text={userName} fontSize="1.6rem" colour="rgba(0, 0, 0, 0.87)" />
            </div>
            <div>
              <Label className="" text={userEmail} fontSize="1.2rem" colour="rgba(0, 0, 0, 0.54)" />
            </div>
          </div>
          <div style={{ margin: '0 20px 0 30px' }}>
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
  );
};

IguruTopHeader.propTypes = {
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  isImageActive: PropTypes.bool
};

export default IguruTopHeader;
