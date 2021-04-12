import React, { useState } from 'react';
import { ClickAwayListener, InputLabel } from '@material-ui/core';
import Notifications from '@material-ui/icons/NotificationsActive';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import './ReviewList.css';

const ReviewList = (props) => {
  const {
    textTwo = '',
    textOne,
    status,
    isAlertActive = false,
    isFlagActive = false,
    isSelectActive = false,
    isTooltipActive = false,
    isSelectedReviewList = false,
    onClickEvent = null,
    tag = '',
    id
  } = props;
  const [isShowTooltip, setIsShowTooltip] = useState(false);

  return (
    <div key={id}>
      <div disableFocusRipple={true} disableRipple={true} className={'reviewListBorder'}>
        <div
          className={['cardButtonwithouttextTransform', 'heightInherit'].join(' ')}
          tag={tag}
          id={id}
          data-value={id}
          onClick={onClickEvent}
          style={{ backgroundColor: isSelectedReviewList ? 'rgb(240, 240, 240)' : '' }}
        >
          <div className={['measureBox', 'heightInherit', 'componentinnerdiv-iguru'].join(' ')}>
            <div className={['iguru-cardContentMidPanel', 'heightInherit'].join(' ')}>
              <div
                className={[
                  'midPaneInformation',
                  textTwo == null || textTwo === '' ? 'aliasmiddle' : null
                ].join(' ')}
              >
                {isTooltipActive ? (
                  <ClickAwayListener
                    onClickAway={(event) => {
                      event.stopPropagation();
                      setIsShowTooltip(false);
                      // this.props.cls.setTemplateValue('culturetooltipstate', '');
                    }}
                  >
                    <div>
                      <span
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsShowTooltip((state) => !state);
                          // this.props.cls.setTemplateValue('culturetooltipstate', textOne);
                        }}
                        className="midPaneInformation"
                      >
                        {textOne}
                      </span>
                      {isShowTooltip ? (
                        <div className="tooltip-container">
                          <p className="tooltip-text" style={{ margin: '0' }}>
                            Click me, I will stay visible until you click outside.
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </ClickAwayListener>
                ) : (
                  <span>{textOne}</span>
                )}
                {/* {textOne} */}
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
    </div>
  );
};

export default ReviewList;
