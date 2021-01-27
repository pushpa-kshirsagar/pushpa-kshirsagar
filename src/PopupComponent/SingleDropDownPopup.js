import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Person from '@material-ui/icons/Person';
import '../Molecules/Popup/Popup.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';
import FormControl from '@material-ui/core/FormControl';
import SelectField from '../Atoms/SelectField/SelectField';

const SingleDropDownPopup = (props) => {
  const { popupMode, isPopUpValue } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();
  //props
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    listSelect,
    tag,
    } = props;

  //states
  const [state, setState] = useState({});
// handling the onchange event
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      [name + 'Err']: ''
    }));
  };
  //this function for validate email address
  const validate = () => {
    let isValid = true;
    let emailStr = state.email;
    let exp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if(emailStr === '')
    {
      isValid = false;
      setState((prevState) => ({
        ...prevState,
        emailErr: 'this information is required'
      }));
    }
    else if (exp.test(emailStr) === false && emailStr !== '') {
      isValid = false;
      setState((prevState) => ({
        ...prevState,
        emailErr: 'this information is incorrect'
      }));
    }

    return isValid;
  };
  //end

  const handleClick = () => {
    if (validate()) {
      //according to creation mode popup sequence will change
      if (popupMode === 'SIGNON') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'PICTUREPOPUP' } });
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
            <SelectField
              tag={tag}
              label={tag}
              listSelect={listSelect}
              errorMsg={state.valueErr}
              onChange={handleChange}
              value={state.value}
            />
          </FormControl>
          
        </DialogContent>
      </Popup>
    </div>
  );
};
SingleDropDownPopup.propTypes = {
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
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: PropTypes.bool
};
export default SingleDropDownPopup;
