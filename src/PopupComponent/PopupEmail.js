import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/Popup/Popup.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP, UPDATE_ASSESSEE_INFO } from '../actionType';
import FormControl from '@material-ui/core/FormControl';
import InputFeild from '../Atoms/InputField/InputField';

const PopupEmail = (props) => {
  const { popupMode } = useSelector((state) => state.popUpReducer);
  const basicInfo = useSelector((state) => state.CreateAssesseeReducer);
  const dispatch = useDispatch();
  /*props*/
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information'
  } = props;

  const [state, setState] = useState({
    // email: '',
    emailErr: ''
  });
  /*handling the onchange event*/
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: UPDATE_ASSESSEE_INFO, payload: { ...basicInfo, [name]: value } });
    setState((prevState) => ({
      ...prevState,
      [name + 'Err']: ''
    }));
  };
  /*this function for validate email address*/
  const validate = () => {
    let isValid = true;
    let emailStr = basicInfo.email;
    let exp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (emailStr === '') {
      isValid = false;
      setState((prevState) => ({
        ...prevState,
        emailErr: 'this information is required'
      }));
    } else if (exp.test(emailStr)) {
      isValid = true;
      return isValid;
      } else {
      setState((prevState) => ({
        ...prevState,
        emailErr: 'this information is incorrect'
      }));
    }
  };
  //end

  const handleClick = () => {
    if (validate()) {
      /*according to creation mode popup sequence will change*/
      if (popupMode === 'SIGNON') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'SINGLEDROPDOWNPOPUP' } });
      }
    }
  };

  return (
    <div>
      <Popup isActive={isActive}>
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
            <InputFeild
              id={'email'}
              label={'email address'}
              labelBadgeOne={'primary'}
              value={basicInfo.email}
              errorMsg={state.emailErr}
              onClick={handleChange}
            />
          </FormControl>

          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div className={'f4'}>communication</div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div className={'f4'}>sign-in</div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div className={'f4'}>verification</div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
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
PopupEmail.propTypes = {
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
export default PopupEmail;
