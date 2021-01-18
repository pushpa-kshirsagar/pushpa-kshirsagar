import React from 'react';
import { InputLabel } from '@material-ui/core';
import Notifications from '@material-ui/icons/NotificationsActive';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import './List.css';

const List = (props) => {
  const { textTwo = '', textOne, status, isAlert, isFlagged, isSelected } = props;
  const listarr = ['01', '02', '03'];

  return (
    <div>
      {listarr.map((item) => (
        <div className={'containerPadding'}>
          <div
            disableFocusRipple={true}
            disableRipple={true}
            className={['cardButtonwithouttextTransform', 'heightInherit'].join(' ')}
          >
            <div className={['measureBox', 'heightInherit', 'iguru-componentinnerdiv'].join(' ')}>
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
                  className={['unitFlex', 'assessmenetStatusText', 'AssesseeNotifyStatus'].join(
                    ' '
                  )}
                  style={{ textAlign: 'center' }}
                >
                  {isAlert ? <Notifications className={'selectionIcon'} /> : null}
                  <InputLabel
                    className={['iconsFooterLabelDefault', 'AssesseeNotifyStatusLabel'].join(' ')}
                  >
                    {status}
                  </InputLabel>
                </span>
              </div>

              <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                {isFlagged ? (
                  <div className={['unitFlex', 'iconsBarDefaultFlag'].join(' ')}>
                    <IconButton className={'assesseeListiconSize'}>
                      <FlagOutlinedIcon className={'flagiconmargin'} />
                      {/* <i className="far fa-flag" id={'flagid'}></i> */}
                    </IconButton>
                  </div>
                ) : null}
                {isSelected ? (
                  <div className={'unitFlex'}>
                    <div
                      className={[
                        'unitFlex',
                        isFlagged ? 'iconsBarDefaultFlag' : 'selectedOption'
                      ].join(' ')}
                    >
                      <Checkbox
                        id={'id'}
                        className={'assesseeListCheckBoxSelctedOut'}
                        color="default"
                        disableRipple={true}
                        disableFocusRipple={true}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
