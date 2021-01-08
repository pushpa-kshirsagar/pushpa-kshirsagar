import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/NotificationsActive';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';

import './Card.css';
const PlaneCard = (props) => {
  return (
    <div className={'iguru-leftpanel'}>
      <Paper className={`iguru-assesseescontainer`}>
        <div className={'iguru-componentinnerdiv'}>
          <div className={'iguru-cardContentMidPanel'}>
              <div className={['midPaneInformation'].join(' ')}>
                dsaasadaffasfsa  adsdsdada
              </div>
            
            <div className={['midPaneLabel','textOverflow'].join(' ')}>
              fsadads
            </div>
          </div>
          <div className={'iguru-iconbox'}>
            <Badge className={'badgeBox'}>
              <IconButton>
                <Notifications />
              </IconButton>
            </Badge>
          </div>
          <div className={'iguru-iconbox'}>
          
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default PlaneCard;
