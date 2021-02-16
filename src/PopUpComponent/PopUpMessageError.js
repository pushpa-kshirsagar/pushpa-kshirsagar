import { DialogContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import '../Molecules/PopUp/PopUp.css';

export const PopUpMessageError = (props) => {
  const { isActive, errorMessage = 'Error Message' } = props;
  return (
    <div>
      <Popup isActive={isActive}>
        {/* <div style={{ width: '300px' }}> */}
        {/* <div
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
            </div> */}
        <PopupHeader headerPanelColour={'genericTwo'} headerOne={'Error'} mode={'error'} />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          {errorMessage}
        </DialogContent>
        {/* </div> */}
      </Popup>
    </div>
  );
};
PopUpMessageError.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf([
    'displayPaneLeft',
    'displayPaneCentre',
    'displayPaneRight',
    'genericOne',
    'genericTwo'
  ]),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};

export default PopUpMessageError;
