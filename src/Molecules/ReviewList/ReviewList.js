import React, { useState } from 'react';
import { ClickAwayListener, InputLabel } from '@material-ui/core';
import Notifications from '@material-ui/icons/NotificationsActive';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import FlagIcon from '@material-ui/icons/Flag';
import './ReviewList.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
const ReviewList = (props) => {
  const {
    textTwo = '',
    textOne,
    status,
    isAlertActive = false,
    isFlagActive = false,
    isSelectActive = '',
    isTooltipActive = false,
    tooltipActiveText = '',
    isSelectedReviewList = false,
    onClickEvent = null,
    tag = '',
    id,
    actualStatus = '',
    onClickCheckBox = null,
    onClickAddFladed = null,
    onClickArrow = null,
    isSelected = false,
    isDelivery = false,
    dataValue = '',
    flagedValue = '',
    shared = '',
    className
  } = props;
  const [isShowTooltip, setIsShowTooltip] = useState(false);

  return (
    <div key={id}>
      <div disableFocusRipple={true} disableRipple={true} className={'reviewListBorder'}>
        <div
          className={['cardButtonwithouttextTransform', 'heightInherit'].join(' ')}
          style={{ backgroundColor: isSelectedReviewList ? 'rgb(240, 240, 240)' : '' }}
        >
          <div
            className={['measureBox', 'heightInherit', 'componentinnerdiv-iguru', className].join(
              ' '
            )}
          >
            <div
              className={['iguru-cardContentMidPanel', 'heightInherit'].join(' ')}
              tag={tag}
              id={id}
              status={actualStatus}
              data-value={dataValue}
              data-shared={shared}
              data-flag={isFlagActive}
              onClick={isSelectActive !== '' ? null : onClickEvent}
              style={{
                backgroundColor: isSelectedReviewList ? 'rgb(240, 240, 240)' : '',
                height: '48px'
              }}
            >
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
                            {tooltipActiveText}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </ClickAwayListener>
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: textOne }}></span>
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
              {isDelivery && (
                <IconButton
                  onClick={onClickArrow}
                  assignmentid={tag}
                  actualstatus={actualStatus}
                  index={id}
                  className={'assesseeListiconSize'}
                >
                  <ArrowForwardIosIcon className={'flagiconmargin'} />
                </IconButton>
              )}
              {isFlagActive || flagedValue !== '' ? (
                <div className={['unitFlex', 'iconsBarDefaultFlag'].join(' ')}>
                  <IconButton
                    className={'assesseeListiconSize'}
                    id={tag}
                    onClick={flagedValue !== '' ? onClickAddFladed : null}
                  >
                    {/* */}
                    {isFlagActive ? (
                      <FlagIcon className={'flagiconmargin'} id={tag} />
                    ) : (
                      <FlagOutlinedIcon className={'flagiconmargin'} id={tag} />
                    )}
                  </IconButton>
                </div>
              ) : null}

              {isSelectActive !== '' ? (
                <div className={'unitFlex'}>
                  <div
                    className={[
                      'unitFlex',
                      isFlagActive ? 'iconsBarDefaultFlag' : 'selectedOption'
                    ].join(' ')}
                  >
                    <Checkbox
                      id={tag}
                      className={'assesseeListCheckBoxSelctedOut'}
                      color="default"
                      onChange={onClickCheckBox}
                      checked={isSelected}
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
