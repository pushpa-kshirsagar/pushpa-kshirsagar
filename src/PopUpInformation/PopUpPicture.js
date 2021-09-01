import React, { useEffect, useRef, useState } from 'react';
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
import { POPUP_CLOSE, SET_NEXT_POPUP } from '../actionType';
import { Avatar } from '@material-ui/core';
import { imageUploadMethod } from '../Actions/GenericActions';

const PopUpPicture = (props) => {
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const [imageSelected, setimageSelected] = useState('');
  const dispatch = useDispatch();
  const inputFile = useRef(null);

  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessee',
    inputHeader = 'picture',
    inputHeaderBadgeOne = '',
    inputHeaderBadgeTwo = '',
    headerOneBadgeOne = '',
    headerOneBadgeTwo = '',
    nextPopUpValue,
    handleNextPopupValue,
    mode,
    basicInfo = '',
    actualLableValue = '',
    typeOfSetObject
  } = props;
  const onClickImageUpload = async (event) => {
    var file = event.target.files[0];
    console.log(file);
    let imagePath = await imageUploadMethod(file);
    console.log(imagePath);
    setimageSelected(imagePath.file.url);
  };
  useEffect(() => {
    setimageSelected(basicInfo[actualLableValue]);
  }, [basicInfo]);
  const handleClick = async () => {
    //according to creation mode popup sequence will change
    if (typeOfSetObject !== '' && basicInfo) {
      dispatch({
        type: typeOfSetObject,
        payload: { ...basicInfo, [actualLableValue]: imageSelected }
      });
    }
    if (mode === 'revise') {
      dispatch({ type: POPUP_CLOSE });
    } else {
      if (handleNextPopupValue) {
        handleNextPopupValue();
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
          headerOneBadgeTwo={headerOneBadgeTwo}
          onClick={handleClick}
          mode={mode}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
              {headerOne !== 'signature' && (
                <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                  <>
                    {inputHeader}&nbsp;
                    {inputHeaderBadgeOne ? (
                      <span className={'headerBadge'}>{inputHeaderBadgeOne}</span>
                    ) : null}
                    &nbsp;
                    {inputHeaderBadgeTwo ? (
                      <span className={'headerBadge'}>{inputHeaderBadgeTwo}</span>
                    ) : null}
                  </>
                </InputLabel>
              )}
            </div>

            <div className={['dashboardImage', 'popupMargin'].join(' ')}>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: 'none' }}
                onChange={onClickImageUpload}
              />
              <Button
                variant="fab"
                // disabled={true}
                mini
                className={[
                  'button',
                  'uploadImageWidthHeight',
                  'iconsFooterDefault',
                  'unAvailable',
                  !imageSelected && 'imageNA'
                ].join(' ')}
                onClick={() => {
                  inputFile.current.click();
                }}
              >
                {imageSelected ? (
                  <Avatar
                    className={['svgRootSize', 'uploadImageWidthHeight'].join(' ')}
                    alt="Remy Sharp"
                    src={imageSelected}
                    style={{ backgroundColor: 'none' }}
                  />
                ) : (
                  <Person className={['svgRootSize', 'uploadImageWidthHeight'].join(' ')} />
                )}
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
