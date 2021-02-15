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
    isAlliance,
    onClick = null,
    tag = ''
  } = props;

  return (
    <div className={'iguru-leftpanel'}>
      <Paper
        style={{
          boxShadow:
            '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
        }}
        className={[`iguru-iconbox-dashboardcardtop`].join(' ')}
      >
        <div className={['iguru-componentinnerdiv', isAlliance && 'iguru-background'].join(' ')}>
          <div className={'iguru-cardContentMidPanel'} onClick={onClick} data-value={tag}>
            <div
              className={['midPaneInformation', textTwoOne !== '' ? null : 'aliasmiddle'].join(' ')}
            >
              {/* {name} */}
              <Label text={textOneOne} fontSize={'1.6rem'} />
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
            ) : ImageOne ? (
              <IconButton Icon={ImageOne} className={'imageNA'} />
            ) : null}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Card;
