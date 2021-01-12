import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import IconsButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/NotificationsActive';
import Badge from '@material-ui/core/Badge';
import IconButton from '../IconButton/IconButton';
import Label from '../../Atoms/Labels/Label';

import './Card.css';
const Card = (props) => {
  const { name = '', description = '', ImgIcon, isImage, isNotification, className } = props;

  return (
    <div className={'iguru-leftpanel'}>
      <Paper className={[`iguru-iconbox-dashboardcardtop`].join(' ')}>
        <div className={'iguru-componentinnerdiv'}>
          <div className={'iguru-cardContentMidPanel'}>
            <div
              className={['midPaneInformation', description != '' ? null : 'aliasmiddle'].join(' ')}
            >
              {/* {name} */}
              <Label innerText={name} size={'large'}/>
            </div>
            <div className={['midPaneLabel', 'textOverflow'].join(' ')}>{description}</div>
          </div>
          <div className={'iguru-iconbox'}>
            <Badge className={['badgeBox', 'notificationIcon'].join(' ')}>
              <IconsButton>{isNotification ? <Notifications /> : null}</IconsButton>
            </Badge>
          </div>
          <div className={'iguru-iconbox'}>
            {isImage ? (
              <IconButton Icon={ImgIcon} mode={'default'} className={'imageNA'} />
            ) : (
              <ImgIcon className={className} />
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Card;
