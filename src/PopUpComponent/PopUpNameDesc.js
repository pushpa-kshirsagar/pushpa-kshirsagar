import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import FormControl from '@material-ui/core/FormControl';
import InputFeild from '../Atoms/InputField/InputField';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/Popup/Popup.css';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';
import PropTypes from 'prop-types';

const PopUpNameDesc = (props) => {
  const { popupMode } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();
  const {
    headerPanelColour = '',
    headerOne = '',
    headerOneBadgeOne = '',
    isActive = false,
    isRequired = false,
    label = ''
  } = props;
  const validateFun = () => {
    let isValidate = true;
    if (isRequired) {
      isValidate = true;
    }
    return isValidate;
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    if (validateFun()) {
    }
    if (popupMode === 'ASSESSEE_SIGN_ON') {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'PICTUREPOPUP' } });
    }
    if (popupMode === 'ASSOCIATE_SIGN_ON') {
      dispatch({
        type: SET_NEXT_POPUP,
        payload: {
          isPopUpValue:
            label === 'name'
              ? 'DESCRIPTIONPOPUP'
              : label === 'description'
              ? 'ASSOCIATEPICTUREPOPUP'
              : 'PICTUREPOPUP'
        }
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
          onClick={handleClick}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <InputFeild id={label} label={label} />
          </FormControl>
          {label === 'name' && (
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
          )}
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpNameDesc.propTypes = {
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
export default PopUpNameDesc;
