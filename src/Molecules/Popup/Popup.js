import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import Previous from '@material-ui/icons/ArrowBack';
import './Popup.css';

const Popup = (isopen, close, parentDialogue, children, badge, headerColor, secondpopup = true) => {
  return (
    <div>
      <Dialog
        open={isopen}
        disableEscapeKeyDown={true}
        onClose={close}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        // className={parentDialogue}
      >
        <DialogTitle id="dialog-title" className={'popupHeaderTitle'}>
          <Paper className={['popupMainHeader', 'titleSolidGreen'].join(' ')}>
            <div className={['componentInnerDiv', 'popupMainHeader'].join(' ')}>
              <div className={'titleBox'}>
                <span>assessee</span>&nbsp;
              </div>
              <div className={'backArrow'}>
                <IconButton className="MuiIconButton-root-1602">
                  <Previous className={'popupClose'} />
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
        {/* {children} */}
        <DialogContent className={'popupContent'}>
          <div id="dialog-description">
            <div className="true">
              <div className={'tickOption'}>
                <div>
                  <Button className={'optionPrimary'} data-value="create">
                    <span>create</span>
                  </Button>
                </div>
                <div>
                  <Button className={'optionPrimary'} data-value="review">
                    <span>review</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Popup;
