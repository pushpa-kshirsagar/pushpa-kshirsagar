import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { POPUP_CLOSE } from '../actionType';
import { FormControl } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';

const PopUpPasswordRevise = (props) => {
  const dispatch = useDispatch();
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessee',
    headerOneBadgeOne = 'password'
  } = props;

  const handleClick = () => {
    //according to creation mode popup sequence will change
    dispatch({ type: POPUP_CLOSE });
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
            <InputFeild id={'current password'} label={'current password'} onClick={null} />
            <InputFeild id={'revised password'} label={'revised password'} onClick={null} />
            <InputFeild id={'revised password'} label={'revised password'} onClick={null} />
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpPasswordRevise.propTypes = {
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
export default PopUpPasswordRevise;
