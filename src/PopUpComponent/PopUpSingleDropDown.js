import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import '../Molecules/Popup/Popup.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP, UPDATE_ASSESSEE_INFO } from '../actionType';
import FormControl from '@material-ui/core/FormControl';
import SelectField from '../Atoms/SelectField/SelectField';

const PopUpSingleDropDown = (props) => {
  const { popupMode } = useSelector((state) => state.popUpReducer);
  const basicInfo = useSelector((state) => state.CreateAssesseeReducer);
  const dispatch = useDispatch();
  //props
  const {
    isActive = false,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    listSelect,
    isRequired = false,
    tag
  } = props;

  //states
  const [state, setState] = useState({ isError: '' });
  // handling the onchange event
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      isError: ''
    }));
    dispatch({ type: UPDATE_ASSESSEE_INFO, payload: { ...basicInfo, [name]: value } });
  };
  //this function for validate
  const validate = () => {
    let isValidate = true;
    if (isRequired) {
      if (basicInfo[tag] === '') {
        setState((prevState) => ({ ...prevState, isError: 'this information is required' }));
        isValidate = false;
      }
    }
    return isValidate;
  };
  //end

  const handleClick = () => {
    if (validate()) {
      //according to creation mode popup sequence will change
      if (popupMode === 'ASSESSEE_SIGN_ON') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'CONFIRMATIONPOPUP' } });
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
          headerOneBadgeTwo={''}
          headerOneBadgeThree={''}
          onClick={handleClick}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <SelectField
              tag={tag}
              label={tag}
              listSelect={listSelect}
              errorMsg={state.isError}
              onChange={handleChange}
              value={basicInfo[tag]}
            />
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpSingleDropDown.propTypes = {
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
export default PopUpSingleDropDown;
