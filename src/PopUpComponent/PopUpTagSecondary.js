import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { InputLabel, FormControl } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_ASSESSEE_INFO } from '../actionType';

const PopUpTagSecondary = (props) => {
  const dispatch = useDispatch();
  const basicInfo = useSelector((state) => state.AssesseeCreateReducer);
  const {
    isActive,
    primaryheader = 'secondary',
    inputHeader = 'tag',
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information'
  } = props;
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: UPDATE_ASSESSEE_INFO, payload: { ...basicInfo, [name]: value } });
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
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
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
              <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                <Fragment>
                  {inputHeader}&nbsp;
                  {primaryheader ? <span className={'headerBadge'}>{primaryheader}</span> : null}
                </Fragment>
                <div className={'infoSymbol'}></div>
              </InputLabel>
            </div>
          </div>
          <FormControl
            style={{ width: '100%', flexDirection: 'row' }}
            className={['inputFields', 'tagInputs'].join(' ')}
          >
            <Fragment>
              <InputFeild
                id="date"
                name="date"
                type="text"
                value={'de4red'}
                InputProps={{
                  readOnly: true,
                  maxLength: 6
                }}
              />
              <span>-</span>
              <div style={{ width: 'min-content' }}>
                <InputFeild
                  id="date1"
                  name={'date1'}
                  type="text"
                  value={'sa'}
                  onChange={handleChange}
                />
              </div>
            </Fragment>
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpTagSecondary.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf(['genericOne']),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};

export default PopUpTagSecondary;
