import { DialogContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import React from 'react';
import { useDispatch } from 'react-redux';
import { POPUP_CLOSE } from '../actionType';
import Label from '../Atoms/Labels/Label';
import Popup from '../Molecules/Popup/Popup';
// import PopupHeader from '../Molecules/Popup/PopupHeader';

export const ErrorMessagePopUp = (props) => {
  const { isOpen, errorMessage = 'Error Message' } = props;
  const dispatch = useDispatch();
  return (
    <div>
      <Popup isActive={isOpen}>
        <div style={{ width: '300px' }}>
          <div
            style={{
              padding: '3px 10px',
              backgroundColor: 'rgb(255, 100, 100)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Label text="Error" fontSize="1.6rem" colour="#ffffff" />
            <div>
              <IconButton
                onClick={() => {
                  dispatch({ type: POPUP_CLOSE });
                }}
              >
                <Clear className={'popupClose'} />
              </IconButton>
            </div>
          </div>
          {/* <PopupHeader headerPanelColour={'genericOne'} headerOne={'Error'} /> */}
          <DialogContent
            className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
          >
            {errorMessage}
          </DialogContent>
        </div>
      </Popup>
    </div>
  );
};

export default ErrorMessagePopUp;
