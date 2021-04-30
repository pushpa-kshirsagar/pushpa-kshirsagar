import { DialogContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import '../Molecules/PopUp/PopUp.css';
import { useHistory } from 'react-router-dom';

export const PopUpMessageError = (props) => {
  const { isActive, errorMessage = 'Error Message' } = props;
  const history = useHistory();

  useEffect(() => {
    if (errorMessage === 'User unauthorized') {
      let path = `/`;
      history.push(path);
    }
  }, [history]);
  return (
    <div>
      <Popup isActive={isActive}>
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
