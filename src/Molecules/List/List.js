import React from 'react';
import { InputLabel } from '@material-ui/core';
import Notifications from '@material-ui/icons/NotificationsActive';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import './List.css';

const List = (props) => {
  const {
    textTwo = '',
    textOne,
    status,
    isAlertActive = false,
    isFlagActive = false,
    isSelectActive = false,
    id
  } = props;

  return (
    <div style={{ padding: '0 5px' }} key={id}>
      <div
        className={['cardButtonwithouttextTransform', 'heightInherit'].join(' ')}
        id={id}
      >
        <div
          className={['measureBox', 'heightInherit', 'iguru-componentinnerdiv-margin'].join(' ')}
        >
          <div className={['iguru-cardContentMidPanel', 'heightInherit'].join(' ')}>
            <div
              className={[
                'midPaneInformation',
                textTwo == null || textTwo === '' ? 'aliasmiddle' : null
              ].join(' ')}
            >
              {textOne}
            </div>
            {textTwo != null ? <div className={'midPaneLabel'}>{textTwo}</div> : null}
          </div>
          <div className={'unitFlex'}>
            <span
              className={['unitFlex', 'assessmenetStatusText', 'AssesseeNotifyStatus'].join(' ')}
              style={{ textAlign: 'center' }}
            >
              {isAlertActive ? <Notifications className={'selectionIcon'} /> : null}
              <InputLabel
                className={['iconsFooterLabelDefault', 'AssesseeNotifyStatusLabel'].join(' ')}
              >
                {status}
              </InputLabel>
            </span>
          </div>

          <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
            {isFlagActive ? (
              <div className={['unitFlex', 'iconsBarDefaultFlag'].join(' ')}>
                <IconButton className={'assesseeListiconSize'}>
                  <FlagOutlinedIcon className={'flagiconmargin'} />
                  {/* <i className="far fa-flag" id={'flagid'}></i> */}
                </IconButton>
              </div>
            ) : null}
            {isSelectActive ? (
              <div className={'unitFlex'}>
                <div
                  className={[
                    'unitFlex',
                    isFlagActive ? 'iconsBarDefaultFlag' : 'selectedOption'
                  ].join(' ')}
                >
                  <Checkbox
                    id={'id'}
                    className={'assesseeListCheckBoxSelctedOut'}
                    color="default"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
