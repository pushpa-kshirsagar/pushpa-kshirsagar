import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/NotificationsActive';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person';

import './Card.css';
const Card = (props) => {
  console.log(props);
  const { firstName = 'abxs' } = props;
  const { otherNames = 'abxs' } = props;
  const { lastName = 'abxs' } = props;
  const { alias = 'description' } = props;
  return (
    <div className={'iguru-leftpanel'}>
      <Paper className={'iguru-dashboardCardTop'}>
        <div className={'iguru-componentinnerdiv'}>
          <div className={[`iguru-cardContentMidPanel`, `iguru-heightInherit`].join(' ')}>
            <div className={[`midPaneInformation`, `midphgt`].join(' ')}>
              {firstName} {otherNames} {lastName}
            </div>
            {/* <div className={[`midPaneLabel`, `textOverflow`].join(' ')}>{alias}</div> */}
          </div>
          <div className={[`unitFlex`, `notificationIcon`].join(' ')}>
            <Badge className={'badgeBox'}>
              <IconButton>
                <Notifications />
              </IconButton>
            </Badge>
          </div>

          <div className={'dashboardImage'}>
            <Button variant="fab" className={[`button`, `iconsFooterDefault`, `imageNA`].join(' ')}>
              <Person className={`svgRootSize`} />
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Card;
