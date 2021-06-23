import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Label from '../Atoms/Label/Label';
import PropTypes from 'prop-types';
import '../Molecules/PopUp/PopUp.css';

const PopUpMessageGeneric = (props) => {
  const {
    isActive,
    headerPanelColour = 'genericOne',
    headerOne = 'culture profile',
    headerOneBadgeOne = 'information',
    textOneOne = 'select',
    textOneTwo = 'one or neither',
    textOneThree = 'culture dimensions',
    textOneFour = 'from the following twelve lists'
  } = props;

  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo={''}
          headerOneBadgeThree={''}
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
