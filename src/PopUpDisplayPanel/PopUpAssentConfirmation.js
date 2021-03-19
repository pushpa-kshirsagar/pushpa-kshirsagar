import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PopUpWhiteHeader from '../Molecules/PopUp/PopUpWhiteHeader';
import { Button } from '@material-ui/core';

const PopUpAssentConfirmation = (props) => {
  const {
    isActive,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    onClick,
    onClose,
    onClickNo,
    onClickYes
  } = props;

  return (
    <div>
      <Popup isActive={isActive}>
        <PopUpWhiteHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          mode={'cancel'}
          onClick={onClick}
          onClose={onClose}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div id="dialog-description">
            <div className="true">
              <div className={'tickOption'}>
                <div>
                  <Button className={'optionPrimary'} data-value="no" onClick={onClickNo}>
                    no
                  </Button>
                </div>
                <div>
                  <Button className={'optionPrimary'} data-value="yes" onClick={onClickYes}>
                    yes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAssentConfirmation;
