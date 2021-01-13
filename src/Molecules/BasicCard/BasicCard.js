import { Avatar, Grid } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import Label from '../../Atoms/Labels/Label';
import IconButton from '../IconButton/IconButton';
import './BasicCard.css';

const BasicCard = (props) => {
  const { isPicure = false } = props;

  return (
    <Grid className="basic-card-container">
      <div className="basic-card-row">
        <div className="label-container">
          <Label
            className="basic-card-label"
            innerText="name"
            size="medium"
            colour="rgba(0, 0, 0, 0.54)"
          />
          <Label
            className="padding-top-bottom"
            innerText="Shivam Sharma"
            size="large"
            colour="rgba(0, 0, 0, 0.87)"
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
            <IconButton Icon={PersonIcon} mode={'default'} className={'imageNA'} />
          )}
        </div>
      </div>
      <div className="basic-card-row">
        <div className="label-container">
          <Label
            className="basic-card-label"
            innerText="alias"
            size="medium"
            colour="rgba(0, 0, 0, 0.54)"
          />
          <Label
            className="padding-top-bottom"
            innerText="No Information"
            size="large"
            colour="rgba(0, 0, 0, 0.87)"
          />
        </div>
      </div>
    </Grid>
  );
};

export default BasicCard;
