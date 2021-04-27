import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Person from '@material-ui/icons/Person';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';

const PopUpPicture = (props) => {
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessee',
    headerOneBadgeOne = '',
    headerOneBadgeTwo = '',
    nextPopUpValue,
    handleNextPopupValue
  } = props;

  const handleClick = async () => {
    //according to creation mode popup sequence will change
    if (handleNextPopupValue) {
      handleNextPopupValue();
    } else {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
    }
  };

  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo={headerOneBadgeTwo}
          onClick={handleClick}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
              <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                picture &nbsp;
              </InputLabel>
            </div>

            <div className={['dashboardImage', 'popupMargin'].join(' ')}>
              <Button
                variant="fab"
                disabled={true}
                mini
                className={[
                  'button',
                  'uploadImageWidthHeight',
                  'iconsFooterDefault',
                  'unAvailable',
                  'imageNA'
                ].join(' ')}
              >
                <Person className={['svgRootSize', 'uploadImageWidthHeight'].join(' ')} />
              </Button>
            </div>
          </div>
          <FormHelperText className={['helperText', 'helptextmargin'].join(' ')}></FormHelperText>

          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div
                  className={'f4'}
                  style={{
                    color:
                      popupMode === 'ASSESSEE_SIGN_ON' || popupMode === 'ASSOCIATE_SIGN_ON'
                        ? 'dimgray'
                        : ''
                  }}
                >
                  verification
                </div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                    disableRipple={true}
                    disabled={
                      popupMode === 'ASSESSEE_SIGN_ON' || popupMode === 'ASSOCIATE_SIGN_ON'
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpPicture.propTypes = {
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
export default PopUpPicture;
