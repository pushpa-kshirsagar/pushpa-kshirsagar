import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, SET_POPUP_STATE } from '../actionType';
import PopUpAdministratorSignInCredentialRevise from './PopUpAdministratorSignInCredentialRevise';
import PopUpAssociateLinkSignIn from './PopUpAssociateLinkSignIn';

const PopUpAssociateLink = () => {
  const dispatch = useDispatch();
  const { isPopUpValue, popupHeaderOne, popupHeaderOneBadgeOne } = useSelector(
    (state) => state.PopUpReducer
  );
  const signInOptions = [
    { name: 'shivam.s@boppotechologies.com' },
    { name: 'simple.sample@gmail.com' },
    { name: '8006777221' },
    { name: '8877665698' }
  ];
  console.log('LINK POPUP +++++', isPopUpValue);
  return (
    <div>
      <PopUpAdministratorSignInCredentialRevise
        isActive={isPopUpValue === 'REVISE_CREDENTIAL_SIGNIN_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={popupHeaderOne}
        headerOneBadgeOne={popupHeaderOneBadgeOne}
        signInOptions={signInOptions}
        onClick={() => {
          dispatch({
            type: SET_POPUP_STATE,
            payload: {
              popupHeaderOne: 'associate',
              popupHeaderOneBadgeOne: 'link',
              popupHeaderOneBadgeTwo: '',
              isPopUpValue: 'SIGNIN_POPUP',
              popupOpenType: 'secondary',
              secondaryOptionCheckValue: '',
              popupContentArrValue: [],
              popupMode: 'ASSOCIATE_LINK'
            }
          });
        }}
        onClose={() => {
          dispatch({ type: POPUP_CLOSE });
        }}
      />
      <PopUpAssociateLinkSignIn
        isActive={isPopUpValue === 'SIGNIN_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={popupHeaderOne}
        headerOneBadgeOne={popupHeaderOneBadgeOne}
        signInOptions={signInOptions}
        onClick={() => {
          //TODO: Display associate list in displayPaneTwo
        }}
        onClose={() => {
          dispatch({ type: POPUP_CLOSE });
        }}
      />
    </div>
  );
};

export default PopUpAssociateLink;
