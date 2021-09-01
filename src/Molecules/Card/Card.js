import React from 'react';
import Paper from '@material-ui/core/Paper';
import IconsButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/NotificationsActive';
import Badge from '@material-ui/core/Badge';
import IconButton from '../IconButton/IconButton';
import Label from '../../Atoms/Label/Label';
import Avatar from '@material-ui/core/Avatar';
import './Card.css';
import { Input } from '@material-ui/core';
import { Fragment } from 'react';
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
    relatedCardFixed = false,
    labelTwoTwo = 'label',
    onClickIconOne = null,
    imageOneOne,
    tag = ''
  } = props;

  return (
    <div className={('iguru-leftpanel', relatedCardFixed && 'relatedCardFixed')}>
      <Paper
        style={{
          boxShadow:
            '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
        }}
        className={[`iguru-iconbox-dashboardcardtop`].join(' ')}
      >
        <div className={['iguru-componentinnerdiv', isAlliance && 'iguru-background'].join(' ')}>
          <div
            className={'iguru-cardContentMidPanel'}
            onClick={onClick}
            data-value={tag}
            style={{ flex: '4', width: '20px' }}
          >
            <div
              className={['midPaneInformation', textTwoOne !== '' ? null : 'aliasmiddle'].join(' ')}
            >
              {textOneOne}
              {/* <Label text={textOneOne} fontSize={'1.6rem'} /> */}
              {/* <Input
                multiline={false}
                row={2}
                rowsMax={1}
                className={'inputText'}
                id="name-dn-input"
                value={textOneOne}
                // dangerouslySetInnerHTML={{ __html: textOneOne }}
                disableUnderline={true}
                readOnly
              /> */}
            </div>
            <div className={['midPaneLabel', 'textOverflow'].join(' ')}>{textTwoOne}</div>
          </div>
          <div className={'iguru-iconbox'}>
            {isAlliance ? (
              <span className={['unitFlex', 'assessmenetStatusText'].join(' ')}>{labelTwoTwo}</span>
            ) : (
              <Badge className={['badgeBox', 'notificationIcon'].join(' ')}>
                <IconsButton>{isAlertActive ? <Notifications /> : null}</IconsButton>
              </Badge>
            )}
          </div>
          <div className={'iguru-iconbox'}>
            {isImageActive ? (
              <Avatar alt="" className={'svgRootSize'} src={imageOneOne} />
            ) : isIcon ? (
              <Fragment>
                <IconsButton onClick={onClickIconOne}>
                  <IconOne className={className} data-value={tag} />
                </IconsButton>
                {/* <IconOne className={className} onClick={onClickIconOne} data-value={tag} /> */}
              </Fragment>
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
