import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import '../Molecules/Popup/Popup.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';
import FormControl from '@material-ui/core/FormControl';
import SelectField from '../Atoms/SelectField/SelectField';

const PopUpSingleDropDown = (props) => {
  const { popupMode } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();
  //props
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    listSelect,
    tag
  } = props;

  //states
  const [state, setState] = useState({});
  // handling the onchange event
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name + 'Err']: ''
    }));
  };
  //this function for validate email address
  const validate = () => {
    let isValid = true;
    return isValid;
  };
  //end

  const handleClick = () => {
    if (validate()) {
      //according to creation mode popup sequence will change
      if (popupMode === 'SIGNON') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'ADDRESSPOPUP' } });
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
