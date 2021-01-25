import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/Popup/Popup.css';
import InputFeild from '../Atoms/InputField/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';

const NameDescPopup = (props) => {
  const { popupMode, isPopUpValue } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();
  const {
    headerPanelColour = 'genericOne',
    errorMsg = '',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    isOpen = false
  } = props;
  const handleClick = () => {
    if (popupMode === 'SIGNON') {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'PICTUREPOPUP' } });
    }
  };
  return (
    <div>
      <Popup isActive={isOpen}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          onClick={handleClick}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <InputFeild id={'description'} label={'description'} />
          </FormControl>
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div className={'f4'}>verification</div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                    disableRipple={true}
                    disableFocusRipple={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default NameDescPopup;
