import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Label from '../Atoms/Label/Label';
import PropTypes from 'prop-types';
import '../Molecules/PopUp/PopUp.css';
import { SET_NEXT_POPUP } from '../actionType';
import { useDispatch } from 'react-redux';

const PopUpMessageGeneric = (props) => {
  const {
    isActive,
    nextPopUpValue = '',
    headerPanelColour = 'genericOne',
    headerOne = 'culture profile',
    headerOneBadgeOne = 'information',
    textOneOne = '',
    textOneTwo = '',
    textOneThree = '',
    textOneFour = '',
    mode,
    handleClickFun = null
  } = props;
  const dispatch = useDispatch();
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
    if (nextPopUpValue === 'onClickRevise') {
      handleClickFun();
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
          mode={mode}
          onClick={handleClick}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div id="dialog-description">
            <div className={'tickOption'}>
              {textOneOne && (
                <div style={{ padding: '5px 0' }}>
                  <Label text={textOneOne} fontSize="1.6rem" colour="rgba(0, 0, 0, 0.87)" />
                </div>
              )}
              {textOneTwo && (
                <div style={{ padding: '5px 0' }}>
                  <Label text={textOneTwo} fontSize="1.6rem" colour="rgb(255, 100, 100)" />
                </div>
              )}
              {textOneThree && (
                <div style={{ padding: '5px 0' }}>
                  <Label text={textOneThree} fontSize="1.6rem" colour="rgba(0, 0, 0, 0.87)" />
                </div>
              )}
              {textOneFour && (
                <div style={{ padding: '5px 0' }}>
                  <Label text={textOneFour} fontSize="1.6rem" colour="rgba(0, 0, 0, 0.87)" />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpMessageGeneric.propTypes = {
  headerPanelColour: PropTypes.oneOf([
    'displayPaneLeft',
    'displayPaneCentre',
    'displayPaneRight',
    'genericOne',
    'genericTwo'
  ]), //new changes
  // displayPane: PropTypes.oneOf(['centre', 'core', 'left', 'right']), //old
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  textOneOne: PropTypes.string,
  textOneTwo: PropTypes.string,
  textOneThree: PropTypes.string,
  textOneFour: PropTypes.string,
  isActive: PropTypes.bool
};
export default PopUpMessageGeneric;
