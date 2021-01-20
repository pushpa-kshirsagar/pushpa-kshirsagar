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
    textOneOne = '',
    textTwoOne = '',
    IconOne,
    isIcon,
    ImageOne,
    isImageActive,
    isAlertActive,
    className,
    isAlliance
  } = props;

  return (
    <div className={'iguru-leftpanel'}>
      <Paper className={[`iguru-iconbox-dashboardcardtop`].join(' ')}>
        <div className={['iguru-componentinnerdiv', isAlliance && 'iguru-background'].join(' ')}>
          <div className={'iguru-cardContentMidPanel'}>
            <div
              className={['midPaneInformation', textTwoOne !== '' ? null : 'aliasmiddle'].join(' ')}
            >
              {/* {name} */}
              <Label labelText={textOneOne} labelSize={'1.6rem'} />
            </div>
            <div className={['midPaneLabel', 'textOverflow'].join(' ')}>{textTwoOne}</div>
          </div>
          <div className={'iguru-iconbox'}>
            {isAlliance ? (
              <span className={['unitFlex', 'assessmenetStatusText'].join(' ')}>label</span>
            ) : (
              <Badge className={['badgeBox', 'notificationIcon'].join(' ')}>
                <IconsButton>{isAlertActive ? <Notifications /> : null}</IconsButton>
              </Badge>
            )}
          </div>
          <div className={'iguru-iconbox'}>
            {isImageActive ? (
              <Avatar
                alt=""
                className={'svgRootSize'}
                src={'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'}
              />
            ) : isIcon ? (
              <IconOne className={className} />
            ) : (
             ImageOne? <IconButton Icon={ImageOne} mode={'default'} className={'imageNA'} />:null
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Card;