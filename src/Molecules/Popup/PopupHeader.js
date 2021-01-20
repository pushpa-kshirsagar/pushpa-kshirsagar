import React, { Fragment } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';
import Previous from '@material-ui/icons/ArrowBack';
import './Popup.css';
const PopupHeader = (props) => {
  const {
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo,
    headerOneBadgeThree
  } = props;
  return (
    <DialogTitle id="dialog-title" className={'popupHeaderTitle'}>
      <Paper className={['popupMainHeader', `titleSolid-${headerPanelColour}`].join(' ')}>
        <div className={['componentInnerDiv', 'popupMainHeader'].join(' ')}>
          <div className={'titleBox'}>
            <span>{headerOne}</span>&nbsp;
            {headerOneBadgeOne ? (
              <Fragment>
                <span className={'iguru-header-badge1_0'}>{headerOneBadgeOne}</span>
                &nbsp;
              </Fragment>
            ) : null}
            {headerOneBadgeTwo ? (
              <Fragment>
                <span className={'iguru-header-badge1_0'}>{headerOneBadgeTwo}</span>
                &nbsp;
              </Fragment>
            ) : null}
            {headerOneBadgeThree ? (
              <Fragment>
                <span className={'iguru-header-badge1_0'}>{headerOneBadgeThree}</span>
                &nbsp;
              </Fragment>
            ) : null}
          </div>
          <div className={'backArrow'}>
            <IconButton className="MuiIconButton-root-1602">
              {headerPanelColour === 'genericOne' ? (
                <Check className={'popupClose'} />
              ) : (
                <Previous className={'popupClose'} />
              )}
            </IconButton>
          </div>
          <div className={'backArrow'}>
            <IconButton className="MuiIconButton-root-1602">
              <Clear className={'popupClose'} />
            </IconButton>
          </div>
        </div>
      </Paper>
    </DialogTitle>
  );
};
export default PopupHeader;
