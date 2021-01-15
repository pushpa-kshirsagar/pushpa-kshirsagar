import React from 'react';
import Paper from '@material-ui/core/Paper';
import IconsButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/NotificationsActive';
import Badge from '@material-ui/core/Badge';
import IconButton from '../IconButton/IconButton';
import Label from '../../Atoms/Labels/Label';
import Avatar from '@material-ui/core/Avatar';
import './Card.css';
const Card = (props) => {
  const {
    textOneLabel = '',
    textTwoLabel = '',
    Icon,
    isIcon,
    Image,
    isImage,
    isNotification,
    className,
    isRelated
  } = props;

  return (
    <div className={'iguru-leftpanel'}>
      <Paper className={[`iguru-iconbox-dashboardcardtop`].join(' ')}>
        <div className={['iguru-componentinnerdiv', 'iguru-background'].join(' ')}>
          <div className={'iguru-cardContentMidPanel'}>
            <div
              className={['midPaneInformation', textTwoLabel !== '' ? null : 'aliasmiddle'].join(
                ' '
              )}
            >
              {/* {name} */}
              <Label labelText={textOneLabel} labelSize={'1.6rem'} />
            </div>
            <div className={['midPaneLabel', 'textOverflow'].join(' ')}>{textTwoLabel}</div>
          </div>
          <div className={'iguru-iconbox'}>
            {isRelated ? (
              <span className={['unitFlex', 'assessmenetStatusText'].join(' ')}>lable</span>
            ) : (
              <Badge className={['badgeBox', 'notificationIcon'].join(' ')}>
                <IconsButton>{isNotification ? <Notifications /> : null}</IconsButton>
              </Badge>
            )}
          </div>
          <div className={'iguru-iconbox'}>
            {isImage ? (
              <Avatar
                alt=""
                className={'svgRootSize'}
                src={'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'}
              />
            ) : isIcon ? (
              <Icon className={className} />
            ) : (
              <IconButton Icon={Image} mode={'default'} className={'imageNA'} />
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Card;
