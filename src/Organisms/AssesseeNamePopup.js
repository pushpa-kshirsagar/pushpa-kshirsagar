import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import { InputLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/Popup/Popup.css';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';

const AssesseeNamePopup = (props) => {
  const {
    inputHeader = 'name',
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
                <Fragment>{inputHeader}&nbsp;</Fragment>
                <div className={'infoSymbol'}></div>
              </InputLabel>
            </div>
          </div>

          <SelectField
            tag={'prefix'}
            label={'prefix'}
            listSelect={[
              ' ',
              'Dr.',
              'Dr. (Mrs.)',
              'Mr',
              'Mrs.',
              'Ms.',
              'Prof.',
              'Prof (Mrs.)',
              'Rev. Jr.',
              'Rev. Sr.'
            ]}
            errorMsg={errorMsg}
          />
          <InputFeild id={'first name'} label={'first name'} errorMsg={errorMsg} />
          <InputFeild id={'other name'} label={'other name'} errorMsg={errorMsg} />
          <InputFeild id={'last name'} label={'last name'} errorMsg={errorMsg} />
          <SelectField
            tag={'suffix'}
            label={'suffix'}
            listSelect={[' ', 'Jr.', 'Sr. ']}
            errorMsg={errorMsg}
          />
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')}>
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
      </Popup>
    </div>
  );
};

export default AssesseeNamePopup;
