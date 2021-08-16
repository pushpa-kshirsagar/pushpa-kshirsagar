import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, UPDATE_ASSESSEE_COMMUNICATION, UPDATE_ASSESSEE_SETUP_PRIMARY_INFO } from '../actionType';
import FormControl from '@material-ui/core/FormControl';
import InputFeild from '../Atoms/InputField/InputField';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';
const PopUpAddressEmail = (props) => {
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);

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
    typeOfSetObject,
    signInSetup,
    checkboxValue = primaryLabel + ' (' + primaryLabelBadge + ')',
    handleNextPopupValue,
    tempCommunication,
    mode
  } = props;

  const [state, setState] = useState({
    // email: '',
    emailErr: ''
  });
  const [localObject, setLocalObject] = useState(basicInfo);
  useEffect(() => {
    setLocalObject(basicInfo);
  }, [basicInfo]);
  /*handling the onchange event*/
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value === '') {
      dispatch({
        type: UPDATE_ASSESSEE_COMMUNICATION,
        payload: ''
      });
      dispatch({
        type: UPDATE_ASSESSEE_SETUP_PRIMARY_INFO,
        payload: { assesseeSignIn: '' }
      });
    } else {
      if (tempCommunication === '') {
        dispatch({
          type: UPDATE_ASSESSEE_COMMUNICATION,
          payload: checkboxValue
        });
      }
      if (signInSetup && signInSetup.assesseeSignIn === '') {
        dispatch({
          type: UPDATE_ASSESSEE_SETUP_PRIMARY_INFO,
          payload: { assesseeSignIn: checkboxValue }
        });
      }
    }

    setLocalObject({ ...localObject, [name]: value });

    // dispatch({
    //   type: typeOfSetObject,
    //   payload: {
    //     ...basicInfo,
    //     [name]: value
    //   }
    // });

    setState((prevState) => ({
      ...prevState,
      emailErr: ''
    }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    if (name === 'assesseeAddressEmailCommunication') {
      dispatch({
        type: UPDATE_ASSESSEE_COMMUNICATION,
        payload: checked ? checkboxValue : ''
      });
    } else {
      dispatch({
        type: UPDATE_ASSESSEE_SETUP_PRIMARY_INFO,
        payload: { assesseeSignIn: checked ? checkboxValue : '' }
      });
    }
  };

  /*this function for validate email address*/
  const validate = () => {
    let isValid = true;
    let emailStr = localObject[tag];
    let exp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (emailStr === '') {
      isValid = false;
      setState((prevState) => ({
        ...prevState,
        emailErr: REQUIRED_ERROR_MESSAGE
      }));
    } else if (exp.test(emailStr)) {
      isValid = true;
      return isValid;
    } else {
      setState((prevState) => ({
        ...prevState,
        emailErr: REQUIRED_ERROR_MESSAGE
      }));
    }
  };
  //end

  const handleClick = () => {
    dispatch({ type: typeOfSetObject, payload: { ...localObject } });
    if (validate()) {
      /*according to creation mode popup sequence will change*/
      // dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
      if (reviewMode === 'revise') {
        dispatch({ type: POPUP_CLOSE });
      } else {
      handleNextPopupValue();
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
          mode={mode}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <InputFeild
              id={tag}
              label={primaryLabel}
              labelBadgeOne={primaryLabelBadge}
              value={localObject && localObject[tag]}
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
                    color: localObject && localObject[tag] !== '' ? '' : 'dimgray'
                  }}
                >
                  communication
                </div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                    name={'assesseeAddressEmailCommunication'}
                    value={''}
                    onChange={
                      popupMode !== 'ASSESSEE_SIGN_ON' &&
                      popupMode !== 'ASSOCIATE_SIGN_ON' &&
                      handleCheckbox
                    }
                    disabled={
                      popupMode === 'ASSESSEE_SIGN_ON' && popupMode === 'ASSOCIATE_SIGN_ON'
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div
                  className={'f4'}
                  style={{
                    color:
                      (localObject && localObject[tag] !== '') ||
                      (signInSetup && signInSetup.assesseeSignIn !== '')
                        ? ''
                        : 'dimgray'
                  }}
                >
                  sign-in
                </div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                    name={'assesseeSignIn'}
                    value={checkboxValue}
                    checked={
                      signInSetup
                        ? signInSetup.assesseeSignIn === checkboxValue
                          ? true
                          : false
                        : false
                    }
                    onChange={
                      popupMode !== 'ASSESSEE_SIGN_ON' &&
                      popupMode !== 'ASSOCIATE_SIGN_ON' &&
                      handleCheckbox
                    }
                    disabled={
                      popupMode === 'ASSESSEE_SIGN_ON' && popupMode === 'ASSOCIATE_SIGN_ON'
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </div>
                  </div>*/}
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
PopUpAddressEmail.propTypes = {
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
export default PopUpAddressEmail;
