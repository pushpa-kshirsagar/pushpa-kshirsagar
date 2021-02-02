import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import { Button } from '@material-ui/core';
import '../Molecules/Popup/Popup.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, CLEAR_ASSESSEE_INFO, SET_NEXT_POPUP } from '../actionType';
import '../Molecules/Popup/Popup.css';

const PopUpConfirmation = (props) => {
  const { isActive, headerPanelColour, headerOne, headerOneBadgeOne, onClickYes = null } = props;
  const dispatch = useDispatch();
  const { popupMode } = useSelector((state) => state.popUpReducer);
  const handleBack = () => {
    /*according manage back state*/
    if (popupMode === 'ASSESSEE_SIGN_ON') {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'NAMEPOPUP' } });
    }
    if (popupMode === 'ASSOCIATE_SIGN_ON') {
      dispatch({
        type: SET_NEXT_POPUP,
        payload: { isPopUpValue: 'NAMEALIASPOPUP' }
      });
    }
  };
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo={''}
          headerOneBadgeThree={''}
          mode={'confirm'}
          onClick={handleBack}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div id="dialog-description">
            <div className="true">
              <div className={'tickOption'}>
                <div>
                  <Button
                    className={'optionPrimary'}
                    data-value="no"
                    onClick={() => {
                      dispatch({ type: CLEAR_ASSESSEE_INFO });
                      dispatch({ type: POPUP_CLOSE });
                    }}
                  >
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

PopUpConfirmation.propTypes = {
  headerPanelColour: PropTypes.oneOf([
    'displayPaneLeft',
    'displayPaneCentre',
    'displayPaneRight',
    'genericOne',
    'genericTwo'
  ]), //new changes
  // displayPane: PropTypes.oneOf(['centre', 'core', 'left', 'right']), //old
  headerOne: PropTypes.string,
  className: null,
  isActive: PropTypes.bool
};
export default PopUpConfirmation;
