import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, SET_NEXT_POPUP } from '../actionType';
import FormControl from '@material-ui/core/FormControl';
import SelectField from '../Atoms/SelectField/SelectField';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';

const PopUpDropList = (props) => {
  const dispatch = useDispatch();
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  //props
  const {
    isActive = false,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    listSelect,
    isRequired = false,
    basicInfo,
    tag,
    label,
    typeOfSetObject,
    nextPopUpValue,
    mappingValue,
    handleNextPopupValue,
    mode,
    isNotRevised = false
  } = props;

  //states
  let errorMessage = isNotRevised ? 'this information cannot be revised' : '';
  const [state, setState] = useState({ isError: errorMessage });
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  // handling the onchange event
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!isNotRevised) {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
        isError: ''
      }));
      dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
    }
  };
  //this function for validate
  const validate = () => {
    let isValidate = true;
    if (isRequired) {
      if (basicInfo[tag] === '') {
        setState((prevState) => ({ ...prevState, isError: REQUIRED_ERROR_MESSAGE }));
        isValidate = false;
      }
      return isValidate;
    } else {
      return isValidate;
    }
  };
  //end

  const handleClick = () => {
    if (validate()) {
      //according to creation mode popup sequence will change
      if (popupMode === 'ASSESSEE_CREATE') {
        if (reviewMode === 'revise') {
          dispatch({ type: POPUP_CLOSE });
        } else {
          handleNextPopupValue();
        }
      } else {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
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
          mode={mode}
          isNotRevised={isNotRevised}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <SelectField
              tag={tag}
              label={label}
              listSelect={listSelect}
              errorMsg={state.isError}
              onChange={handleChange}
              value={isNotRevised ? basicInfo : basicInfo && basicInfo[tag]}
              mappingValue={mappingValue}
            />
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpDropList.propTypes = {
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
export default PopUpDropList;
