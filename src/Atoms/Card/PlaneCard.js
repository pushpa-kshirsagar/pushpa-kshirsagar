import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/NotificationsActive';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person';

import './Card.css';
const PlaneCard = (props) => {
  const { firstName = 'abxs' } = props;
  const { otherNames = 'abxs' } = props;
  const { lastName = 'abxs' } = props;
  const { alias = 'description' } = props;
  return (
    <div className={'iguru-leftpanel'}>
      <Paper className={'iguru-dashboardCardTop'}>
        <div className={'iguru-componentinnerdiv'}>
            {/* <div className={[`midPaneLabel`, `textOverflow`].join(' ')}>{alias}</div> */}
          </div>
          <div className={[`unitFlex`, `notificationIcon`].join(' ')}>
           
          </div>

          <div className={'dashboardImage'}>
            
          </div>
      </Paper>
    </div>
  );
};

export default PlaneCard;
