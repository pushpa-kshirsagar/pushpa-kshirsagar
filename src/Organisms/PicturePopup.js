import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Person from '@material-ui/icons/Person';
import '../Molecules/Popup/Popup.css';
const PicturePopup = (props) => {
  const {isOpen = false} = props;

  return (
    <div>
      <Popup isActive={isOpen}>
        <PopupHeader
          headerPanelColour={'genericOne'}
          headerOne={'assessees'}
          headerOneBadgeOne={'information'}
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
                <div className={'f4'}>verification</div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                    disableRipple={true}
                    disableFocusRipple={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        {/* <DialogContent className={'popupContent'}>
          <div id="dialog-description">
            <div className="true">
              <div className={'tickOption'}>
                <div>
                  <Button className={'optionPrimary'} data-value="create">
                    create
                  </Button>
                </div>
                <div>
                  <Button className={'optionPrimary'} data-value="review">
                    review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent> */}
      </Popup>
    </div>
  );
};

export default PicturePopup;
