import { Avatar, Grid, IconButton, Input } from '@material-ui/core';
import { CheckBoxOutlineBlank } from '@material-ui/icons';
import Notifications from '@material-ui/icons/NotificationsActive';
import PropTypes from 'prop-types';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import Unverified from '../../images/unverified.svg';
// import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import FlagIcon from '@material-ui/icons/Flag';
import Label from '../../Atoms/Labels/Label';
import IconsButton from '../IconButton/IconButton';
import './BasicCard.css';

const BasicCard = (props) => {
  const {
    textOneOne = '',
    labelTextOneOne = '',
    textOneTwo = '',
    labelTextOneTwo = '',
    isImageActive = false,
    isVerifiedActiveName = false,
    isVerifiedActivePicture = false,
    isFlagActive = false,
    isAlertActive = false,
    onClickRevise,
    mode = ''
  } = props;

  return (
    <Grid className="basic-card-container">
      <div className="basic-card-row">
        <div className="label-container">
          <Label
            className={mode === 'revise' ? ' basic-card-label-revise' : 'basic-card-label'}
            text={labelTextOneOne}
            fontSize="1.2rem"
            onClickLabel={mode === 'revise' ? onClickRevise : null}
            colour={mode === 'revise' ? '#00AFFF' : 'rgba(0, 0, 0, 0.54)'}
          />
          <Input
            multiline={false}
            // row={multiline ? 2 : 1}
            row={2}
            rowsMax={1}
            className={'inputText'}
            id="name-dn-input"
            value={textOneOne}
            disableUnderline={true}
            readOnly
          />
          {/* <Label
            className="padding-top-bottom"
            text={textOneOne}
            fontSize="1.6rem"
            colour="rgba(0, 0, 0, 0.87)"
          /> */}
        </div>
        <div className="flex-one-align-center">
          {isAlertActive && (
            <div className="notifications-icon-container">
              <Notifications className="notificaton-icon" />
            </div>
          )}
        </div>
        <div className={'iguru-iconbox'}>
          {isImageActive ? (
            <Avatar
              alt=""
              className={'svgRootSize'}
              id="profile-icon"
              onClick={mode === 'revise' ? onClickRevise : null}
              src={'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'}
            />
          ) : (
            <IconsButton
              id="profile-icon"
              onClick={mode === 'revise' ? onClickRevise : null}
              Icon={PersonIcon}
              className={'imageNA'}
            />
          )}
        </div>
      </div>
      <div className="basic-card-row">
        <div className="label-container">
          <Label
            className={mode === 'revise' ? ' basic-card-label-revise' : 'basic-card-label'}
            text={labelTextOneTwo}
            fontSize="1.2rem"
            onClickLabel={mode === 'revise' ? onClickRevise : null}
            colour={mode === 'revise' ? '#00AFFF' : 'rgba(0, 0, 0, 0.54)'}
          />
          <Input
            multiline={false}
            // row={multiline ? 2 : 1}
            row={2}
            rowsMax={1}
            className={'inputText'}
            id="name-dn-input"
            value={textOneTwo}
            disableUnderline={true}
            readOnly
          />
          {/* <Label
            className="padding-top-bottom"
            text={textOneTwo}
            fontSize="1.6rem"
            colour="rgba(0, 0, 0, 0.87)"
          /> */}
        </div>
        <div className="flex-one-align-center">
          <div>
            <IconButton className="icon-container">
              {isFlagActive && <FlagIcon className="iguru-icons-wid-hei" />}
            </IconButton>
          </div>
          <div>
            <IconButton className="icon-container">
              <CheckBoxOutlineBlank />
            </IconButton>
          </div>
        </div>

        <div className="flex-one-align-center">
          <div
            className={'unitFlex, verifiedUser, verifiedUserTop'}
            style={{ alignItems: 'flex-start' }}
          >
            <IconButton style={{ marginBottom: '5px', padding: 0 }}>
              {isVerifiedActiveName ? (
                <VerifiedUserOutlinedIcon className="iguru-icons-wid-hei" />
              ) : (
                <img alt="" className={'iguru-icons-wid-hei'} src={Unverified} />
              )}
            </IconButton>
          </div>
          <div className={'unitFlex, verifiedUser, verifiedUserTop'}>
            <IconButton style={{ padding: 0 }}>
              {isVerifiedActivePicture ? (
                <VerifiedUserOutlinedIcon className="iguru-icons-wid-hei" />
              ) : (
                <img alt="" className={'iguru-icons-wid-hei'} src={Unverified} />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </Grid>
  );
};

BasicCard.propTypes = {
  labelTextOneOne: PropTypes.string,
  textOneOne: PropTypes.string,
  labelTextOneTwo: PropTypes.string,
  textOneTwo: PropTypes.string,
  isImageActive: PropTypes.bool,
  isAlertActive: PropTypes.bool,
  isVerifiedActiveName: PropTypes.bool,
  isVerifiedActivePicture: PropTypes.bool,
  isFlagActive: PropTypes.bool
};

// BasicCard.defaultProps = {
//   name: 'Sample Text',
//   description: 'No Information',
//   isPicure: false
// };

export default BasicCard;
