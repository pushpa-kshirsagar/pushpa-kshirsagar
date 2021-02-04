import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/Popup/Popup.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';
import FormControl from '@material-ui/core/FormControl';
import InputFeild from '../Atoms/InputField/InputField';

const PopUpEmail = (props) => {
  const { popupMode } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();
  /*props*/
  const {
    isActive = false,
    headerPanelColour = '',
    headerOne = '',
    headerOneBadgeOne = '',
    primaryLabel = 'email address',
    primaryLabelBadge = 'primary',
    tag,
    basicInfo,
    nextPopUpValue,
    typeOfSetObject,
    checkboxValue = primaryLabel + ' (' + primaryLabelBadge + ')'
  } = props;

  const [state, setState] = useState({
    // email: '',
    emailErr: ''
  });
  /*handling the onchange event*/
  const handleChange = (event) => {
    const { name, value } = event.target;
    let communication = checkboxValue;
    let signIn = checkboxValue;
    if (value === '') {
      communication = '';
      signIn = '';
    }
    dispatch({
      type: typeOfSetObject,
      payload: { ...basicInfo, [name]: value, communication: communication, signIn: signIn }
    });
    setState((prevState) => ({
      ...prevState,
      emailErr: ''
    }));
  };

  const handleCheckbox = (e) => {
    const { name, checked, value } = e.target;
    dispatch({
      type: typeOfSetObject,
      payload: { ...basicInfo, [name]: checked ? value : '' }
    });
  };

  /*this function for validate email address*/
  const validate = () => {
    let isValid = true;
    let emailStr = basicInfo[tag];
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
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
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
              id={tag}
              label={primaryLabel}
              labelBadgeOne={primaryLabelBadge}
              value={basicInfo && basicInfo[tag]}
              errorMsg={state.emailErr}
              onClick={handleChange}
            />
          </FormControl>

          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div
                  className={'f4'}
                  style={{
                    color: basicInfo && basicInfo.communication !== checkboxValue && 'dimgray'
                  }}
                >
                  communication
                </div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                    name={'communication'}
                    value={checkboxValue}
                    checked={
                      basicInfo ? (basicInfo.communication === checkboxValue ? true : false) : false
                    }
                    onChange={
                      popupMode !== 'ASSESSEE_SIGN_ON' &&
                      popupMode !== 'ASSOCIATE_SIGN_ON' &&
                      handleCheckbox
                    }
                    disabled={basicInfo && basicInfo.communication !== checkboxValue}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div
                  className={'f4'}
                  style={{
                    color: basicInfo && basicInfo.communication !== checkboxValue && 'dimgray'
                  }}
                >
                  sign-in
                </div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                    name={'signIn'}
                    value={checkboxValue}
                    checked={
                      basicInfo ? (basicInfo.signIn === checkboxValue ? true : false) : false
                    }
                    onChange={
                      popupMode !== 'ASSESSEE_SIGN_ON' &&
                      popupMode !== 'ASSOCIATE_SIGN_ON' &&
                      handleCheckbox
                    }
                    disabled={basicInfo && basicInfo.signIn !== checkboxValue}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div className={'f4'} style={{ color: 'dimgray' }}>
                  verification
                </div>
                <div className={'checkedFontNew'}>
                  <Checkbox className={''} color="default" disabled={true} />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpEmail.propTypes = {
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
export default PopUpEmail;
