import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import FormControl from '@material-ui/core/FormControl';
import InputFeild from '../Atoms/InputField/InputField';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/PopUp/PopUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';
import PropTypes from 'prop-types';
import { FormHelperText, Input, InputLabel } from '@material-ui/core';

const PopUpScan = (props) => {
  const dispatch = useDispatch();
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const {isActive = true } = props;

  const [state, setState] = useState({
    scanValue:''
  });

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      scanValue: event.target.value,
    }));
  };
  const handleClick = () => {
    /*according to seacrh will change*/
  
  };
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={'displayPaneCentre'}
          headerOne={'assessee'}
          headerOneBadgeOne={'scan'}
          headerOneBadgeTwo={''}
          headerOneBadgeThree={''}
          mode={'search'}
          onClick={handleClick}
        />
       
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <InputFeild
              id={"scan"}
              label={'scan'}
              labelBadgeOne={''}
              isRequired={false}
              value={state.scanValue}
              classNames={'scanInputFields'}
              onClick={handleChange}
            />
        <FormHelperText className={['aliasName', 'helptextmargin'].join(' ')}>
          {isPopUpValue ==='assesseeDistinctReviewList' && <span>name, alias, email address, mobile telephone, tag.</span>}
          {isPopUpValue ==='assesseeRelatedAssociate' && <span>name, description, website address, tag.</span>}
        </FormHelperText>
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpScan.propTypes = {
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
export default PopUpScan;
