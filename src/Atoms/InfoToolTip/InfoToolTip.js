import React, { useState } from 'react';
import Info from '@material-ui/icons/InfoOutlined';
import PropTypes from 'prop-types';
import { ClickAwayListener, Tooltip, Typography } from '@material-ui/core';

export const InfoToolTip = (props) => {
  const { message = '' } = props;
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const handleTooltipClose = () => {
    setIsToolTipOpen(false);
  };
  const handleTooltipOpen = () => {
    setIsToolTipOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        title={
          <Typography color="inherit" style={{ fontSize: '15px' }}>
            {message}
          </Typography>
        }
        placement="bottom"
        onClose={handleTooltipClose}
        open={isToolTipOpen}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <Info
          style={{ color: 'rgba(0, 0, 0, 0.54)', cursor: 'pointer', fontSize: '20px' }}
          onClick={handleTooltipOpen}
        />
      </Tooltip>
    </ClickAwayListener>
  );
};

InfoToolTip.propTypes = {
  message: PropTypes.string
};

export default InfoToolTip;
