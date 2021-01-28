import { DialogContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import '../Molecules/Popup/Popup.css';

export const PopupErrorMessage = (props) => {
  const { isActive, errorMessage = 'Error Message' } = props;
  const dispatch = useDispatch();
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
        <PopupHeader headerPanelColour={'genericTwo'} headerOne={'Error'} />
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
PopupErrorMessage.propTypes = {
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

export default PopupErrorMessage;
