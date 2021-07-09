import React, { useState, Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, SET_NEXT_POPUP, UPDATE_ASSESSEE_SETUP_PRIMARY_INFO } from '../actionType';

const PopUpCheckbox = (props) => {
  /*props*/
  const {
    isActive,
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    valueArr,
    EmailPrimaryCommunication,
    EmailSecondaCommunication,
    typeOfPrimarySetObject,
    typeOfSecondaSetObject,
    nextPopUpValue,
    forceToSelect = '',
    mode
  } = props;

  const dispatch = useDispatch();
  /*handling the onchange event*/
  const handleChange = (event) => {
    console.log(event.target.checked);
    setState({ isChecked: event.target.value });
  };
  const { availableSignInCredentialList = [], currentlySignInCredential } = useSelector(
    (state) => state.AssesseeCreateReducer
  );

  const [state, setState] = useState({
    isChecked: currentlySignInCredential
  });

  const createNameWithBadge = (name) => {
    var txt = name;
    var arr = [];
    var newTxt = txt.split('(');

    for (var j = 1; j < newTxt.length; j++) {
      let word = newTxt[j].split(')')[0];
      let newwrd = word.replace(' ', '||');
      txt = txt.replace('(' + word + ')', '{' + newwrd + '}');
    }

    let finlastr = txt;
    var finalsplit = finlastr.split(' ');

    for (var i = 0; i < finalsplit.length; i++) {
      if (finalsplit[i].charAt(0) === '{') {
        let nobadge = finalsplit[i];
        let finalentry = nobadge.replace('{', '').replace('}', '').replace('||', ' ');
        arr.push(
          <Fragment>
            <span className={'headerBadge'} style={{ overflow: 'unset' }}>
              {finalentry}
            </span>
            <span>&nbsp;</span>
          </Fragment>
        );
      }

      if (finalsplit[i].charAt(0) !== '{') {
        arr.push(
          <Fragment>
            <span>{finalsplit[i]}</span>
            <span>&nbsp;</span>
          </Fragment>
        );
      }
    }

    return arr;
  };

  const handleClick = () => {
    if (forceToSelect === 'signIn') {
      dispatch({
        type: UPDATE_ASSESSEE_SETUP_PRIMARY_INFO,
        payload: { assesseeSignInCredential: state.isChecked }
      });
      dispatch({ type: POPUP_CLOSE });
    } else {
      if (state.isChecked === 'email address (primary)') {
        dispatch({
          type: typeOfPrimarySetObject,
          payload: {
            ...EmailPrimaryCommunication,
            assesseeAddressEmailCommunication: true
          }
        });
      } else if (state.isChecked === 'email address (secondary)') {
        dispatch({
          type: typeOfSecondaSetObject,
          payload: {
            ...EmailSecondaCommunication,
            assesseeAddressEmailCommunication: true
          }
        });
      } else {
        return;
      }
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
    }
  };
  // const valueArr = ['email address (primary)', 'email address (secondary)'];
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
          {valueArr.map((item) => (
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>{createNameWithBadge(item)}</div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      color="default"
                      value={item}
                      name={item}
                      disabled={!availableSignInCredentialList.includes(item)}
                      checked={state.isChecked === item}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpCheckbox.propTypes = {
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
export default PopUpCheckbox;
