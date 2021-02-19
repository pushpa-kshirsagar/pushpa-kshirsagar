import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { InputLabel, FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';

const PopUpCalculatorBasic = (props) => {
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const {
    isActive,
    primaryheader,
    inputHeader,
    headerPanelColour,
    headerOne = 'calculator',
    headerOneBadgeOne = 'basic',
    nextPopUpValue,
    typeOfSetObject,
    basicInfo
  } = props;
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
  };
  return (
    <div>
      <Popup isActive={true}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          onClick={handleClick}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          PopUpCalculatorBasic placeholder
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpCalculatorBasic.propTypes = {
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

export default PopUpCalculatorBasic;
