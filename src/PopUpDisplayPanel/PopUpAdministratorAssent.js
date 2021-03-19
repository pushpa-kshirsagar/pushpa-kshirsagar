import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PopUpWhiteHeader from '../Molecules/PopUp/PopUpWhiteHeader';

const PopUpAdministratorAssent = (props) => {
  const { isActive, headerPanelColour, headerOne, headerOneBadgeOne, onClick, onClose } = props;

  return (
    <div>
      <Popup isActive={isActive}>
        <PopUpWhiteHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          mode={'core'}
          onClick={onClick}
          onClose={onClose}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div id="dialog-description">placeholder</div>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAdministratorAssent;
