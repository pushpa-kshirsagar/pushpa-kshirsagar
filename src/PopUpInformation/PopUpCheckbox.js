import React, { useState, Fragment, useEffect } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, SET_NEXT_POPUP, UPDATE_ASSESSEE_SETUP_PRIMARY_INFO } from '../actionType';
import { InputLabel } from '@material-ui/core';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { createNameWithBadge } from '../Actions/StatusAction';
import SelectField from '../Atoms/SelectField/SelectField';

const PopUpCheckbox = (props) => {
  /*props*/
  const {
    isActive,
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    headerOneBadgeTwo = '',
    valueArr = [],
    EmailPrimaryCommunication,
    EmailSecondaCommunication,
    typeOfPrimarySetObject,
    typeOfSecondaSetObject,
    nextPopUpValue,
    forceToSelect = '',
    mode,
    inputHeader = '',
    inputHeaderBadge = '',
    inputHeaderBadgeTwo = '',
    inputHeaderBadgeThree = '',
    infoMsg = '',
    isJobProfileList = false,
    textOne = '',
    textTwo = null,
    onClickNext = null,
    id,
    isChecked = '',
    availableSignInCredentialList = [],
    isRolePermission = false,
    valueArrState = [],
    informationArr = [],
    informationValue = '',
    typeOfSetObject,
    typeOfStateObj = '',
    objectName = '',
    stateName = ''
  } = props;

  const dispatch = useDispatch();
  const [localObject, setLocalObject] = useState(valueArrState);
  const [permissionInfo, setpermissionInfo] = useState('');

  useEffect(() => {
    setLocalObject(valueArrState);
    informationValue !== '' && setpermissionInfo(valueArrState[informationValue]);
  }, [!valueArrState]);

  /*handling the onchange event*/
  const handleChange = (event) => {
    console.log(event.target.checked);
    setState({ isChecked: event.target.value });
  };
  /*handling the onchange event*/
  const handleSingleState = (event) => {
    console.log(event.target.value);
    setLocalObject({ ...localObject, [event.target.value]: event.target.checked });

    console.log(localObject);
    // setState({ isChecked: event.target.value });
  };
  // const { availableSignInCredentialList = [], currentlySignInCredential } = useSelector(
  //   (state) => state.AssesseeCreateReducer
  // );

  const [state, setState] = useState({
    isChecked: isChecked
  });
  const handleDropDown = (e) => {
    setpermissionInfo(e.target.value);
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
      } else if (isRolePermission) {
        let reviseobj = null;
        if (informationValue !== '' && headerOne === 'assessees') {
          reviseobj = { ...localObject, [informationValue]: permissionInfo };
        } else {
          reviseobj = { ...localObject };
        }
        dispatch({
          type: typeOfSetObject,
          payload: {
            objectName: objectName,
            stateName: stateName,
            actualStateName: typeOfStateObj,
            value: reviseobj
          }
        });
      } else {
        onClickNext(id, state.isChecked);
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
      }
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
    }
    setLocalObject(JSON.parse(JSON.stringify(valueArrState)));
  };
  console.log('typeOfStateObj', typeOfStateObj);
  // const valueArr = ['email address (primary)', 'email address (secondary)'];
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo={headerOneBadgeTwo}
          onClick={handleClick}
          mode={mode}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
              <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                <Fragment>
                  {inputHeader}&nbsp;
                  {inputHeaderBadge ? (
                    <span className={'headerBadge'}>{inputHeaderBadge}</span>
                  ) : null}
                  &nbsp;
                  {inputHeaderBadgeTwo ? (
                    <span className={'headerBadge'}>{inputHeaderBadgeTwo}</span>
                  ) : null}
                  &nbsp;
                  {inputHeaderBadgeThree ? (
                    <span className={'headerBadge'}>{inputHeaderBadgeThree}</span>
                  ) : null}
                </Fragment>
              </InputLabel>
              <div className={'infoSymbol'}></div>
              <div className={'infoSymbol'}>
                <InfoToolTip message={infoMsg} />
              </div>
            </div>
          </div>
          {isJobProfileList && (
            <div className={'containerPadding'}>
              <div
                disableFocusRipple={true}
                disableRipple={true}
                className={['cardButton', 'heightInherit', 'reviewListFixedWidth'].join(' ')}
                style={{ borderBottom: '0px' }}
              >
                <div className={['measureBox', 'heightInherit', 'componentInnerDiv'].join(' ')}>
                  <div
                    className={['iguru-cardContentMidPanel', 'heightInherit'].join(' ')}
                    style={{ textTransform: 'none' }}
                  >
                    <div
                      className={[
                        'midPaneInformation',
                        textTwo == null || textTwo === '' ? 'aliasmiddle' : null
                      ].join(' ')}
                    >
                      <span>{textOne}</span>
                    </div>
                    {textTwo != null ? <div className={'midPaneLabel'}>{textTwo}</div> : null}
                  </div>
                </div>
              </div>
            </div>
          )}
          {isRolePermission && headerOne === 'assessees' && (
            <SelectField
              tag={'information'}
              label={'information'}
              dataValue={'information'}
              listSelect={informationArr}
              errorMsg={() => {}}
              onChange={handleDropDown}
              value={permissionInfo}
              mappingValue={'id'}
            />
          )}
          {valueArr.map((item, index) => (
            <div className={'fitContent'} key={`check${index}`}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>{createNameWithBadge(item)}</div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      color="default"
                      value={item}
                      key={index}
                      name={item}
                      disabled={
                        isJobProfileList || isRolePermission
                          ? false
                          : !availableSignInCredentialList.includes(item)
                      }
                      checked={isRolePermission ? localObject[item] : state.isChecked === item}
                      onChange={isRolePermission ? handleSingleState : handleChange}
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
