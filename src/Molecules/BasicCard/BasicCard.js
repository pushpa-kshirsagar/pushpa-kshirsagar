import { Avatar, Grid, IconButton } from '@material-ui/core';
import { CheckBoxOutlineBlank, Notifications } from '@material-ui/icons';
import PropTypes from 'prop-types';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import Label from '../../Atoms/Labels/Label';
import IconsButton from '../IconButton/IconButton';
import './BasicCard.css';

const BasicCard = (props) => {
  const {
    name = 'Shivam Sharma',
    description = 'No Information',
    isPicure = false,
    isNameVerified = false,
    isPictureVerified = false,
    flag = false
  } = props;

  return (
    <Grid className="basic-card-container">
      <div className="basic-card-row">
        <div className="label-container">
          <Label
            className="basic-card-label"
            labelText="name"
            labelSize="1.2rem"
            labelColour="rgba(0, 0, 0, 0.54)"
          />
          <Label
            className="padding-top-bottom"
            labelText={name}
            labelSize="1.6rem"
            labelColour="rgba(0, 0, 0, 0.87)"
          />
        </div>
        <div className="notifications-icon-container">
          <Notifications className="notificaton-icon" />
        </div>
        <div className={'iguru-iconbox'}>
          {isPicure ? (
            <Avatar
              alt=""
              className={'svgRootSize'}
              src={'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'}
            />
          ) : (
            <IconsButton Icon={PersonIcon} mode={'default'} className={'imageNA'} />
          )}
        </div>
      </div>
      <div className="basic-card-row">
        <div className="label-container">
          <Label
            className="basic-card-label"
            labelText="alias"
            labelSize="1.6rem"
            labelColour="rgba(0, 0, 0, 0.54)"
          />
          <Label
            className="padding-top-bottom"
            labelText={description}
            labelSize="1.1.6rem"
            labelColour="rgba(0, 0, 0, 0.87)"
          />
        </div>
        <div className={'unitFlex, unitFlexTop'}>
          <div className={'unitFlex, iconsBarDefaultFlag'}>
            <IconButton>
              {flag ? <i className="fa fa-flag"></i> : <i className="far fa-flag"></i>}
            </IconButton>
          </div>
          <div className={'unitFlex'} style={{ alignItems: 'flex-start' }}>
            <div className={'unitFlex, selectedOption'}>
              <IconButton>
                <CheckBoxOutlineBlank style={{ height: '0.82em' }} />
              </IconButton>
            </div>
          </div>
        </div>

        <div className={'unitFlex, unitFlexTop'}>
          <div
            className={'unitFlex, verifiedUser, verifiedUserTop'}
            style={{ alignItems: 'flex-start' }}
          >
            <IconButton>
              <img
                alt="Anonymous"
                src={isNameVerified ? '../../images/verified.svg' : '../../images/unverified.svg'}
                className={'verifiedImage'}
              />
            </IconButton>
          </div>
          <div className={'unitFlex, verifiedUser, verifiedUserTop'}>
            <IconButton>
              <img
                alt="Anonymous"
                src={
                  isPictureVerified ? '../../images/verified.svg' : '../../images/unverified.svg'
                }
                className={'verifiedImage'}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </Grid>
  );
};

BasicCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  isPicure: PropTypes.bool
};

BasicCard.defaultProps = {
  name: 'Sample Text',
  description: 'No Information',
  isPicure: false
};

export default BasicCard;
