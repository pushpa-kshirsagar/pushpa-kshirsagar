import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import '../Molecules/Popup/Popup.css';
import List from '../Molecules/List/List';

const ListPopup = (props) => {
  const {
    primaryheader = 'primary',
    inputHeader = 'node',
    headerPanelColour = 'genericOne',
    errorMsg = '',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information'
  } = props;

  return (
    <div>
      <Popup isActive={true}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
              <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                <Fragment>
                  {inputHeader}&nbsp;
                  <span className={'headerBadge'}>{primaryheader}</span>
                </Fragment>
                <div className={'infoSymbol'}></div>
              </InputLabel>
            </div>
          </div>
          <List textOne="name" isAlertActive={false} isFlagActive={false} isSelectActive={false} />
          <List textOne="name" isAlertActive={false} isFlagActive={false} isSelectActive={false} />
          <List textOne="name" isAlertActive={false} isFlagActive={false} isSelectActive={false} />
          <FormHelperText className={['helperText', 'helptextmargin'].join(' ')}>
            <span>{errorMsg}</span>
          </FormHelperText>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default ListPopup;
