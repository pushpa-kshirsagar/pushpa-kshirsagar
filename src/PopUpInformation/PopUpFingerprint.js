import React, { useState } from 'react';
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
import { Fingerprint } from '@material-ui/icons';
import leftHandImg from '../images/lhand.png';
import rightHandImg from '../images/rhand.png';

const PopUpFingerprint = (props) => {
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const [imgsrc, setimgsrc] = useState('');

  const dispatch = useDispatch();
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessee',
    headerOneBadgeOne = '',
    headerOneBadgeTwo = '',
    nextPopUpValue,
    handleNextPopupValue,
    mode
  } = props;

  const handleClick = async () => {
    //according to creation mode popup sequence will change
    if (mode === 'revise') {
      dispatch({ type: POPUP_CLOSE });
    } else {
      if (handleNextPopupValue) {
        handleNextPopupValue();
      } else {
        // await dispatch({ type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA, payload: { request: requestObj } });
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
      }
    }
  };
  const assesseeLeftFingerPrint = ['', '', '', '', ''];
  const assesseeRightFingerPrint = ['', '', '', '', ''];
  const leftFingerArea = [
    {
      title: '1',
      headerTitle: 'left hand 1',
      fingerImg:
        assesseeLeftFingerPrint[0] !== undefined
          ? 'data:image/png;base64,' + assesseeLeftFingerPrint[0].fingerprint
          : null,
      coords: '2,129,54,170'
    },
    {
      title: '2',
      headerTitle: 'left hand 2',
      fingerImg:
        assesseeLeftFingerPrint[1] !== undefined
          ? 'data:image/png;base64,' + assesseeLeftFingerPrint[1].fingerprint
          : null,
      coords: '75,24,118,60'
    },
    {
      title: '3',
      headerTitle: 'left hand 3',
      fingerImg:
        assesseeLeftFingerPrint[2] !== undefined
          ? 'data:image/png;base64,' + assesseeLeftFingerPrint[2].fingerprint
          : null,
      coords: '121,1,163,31'
    },
    {
      title: '4',
      headerTitle: 'left hand 4',
      fingerImg:
        assesseeLeftFingerPrint[3] !== undefined
          ? 'data:image/png;base64,' + assesseeLeftFingerPrint[3].fingerprint
          : null,
      coords: '168,10,208,40'
    },
    {
      title: '5',
      headerTitle: 'left hand 5',
      fingerImg:
        assesseeLeftFingerPrint[4] !== undefined
          ? 'data:image/png;base64,' + assesseeLeftFingerPrint[4].fingerprint
          : null,
      coords: '211,39,249,69'
    }
  ];
  console.log(leftFingerArea);

  const rightFingerArea = [
    {
      title: '1',
      headerTitle: 'right hand 1',
      fingerImg:
        assesseeRightFingerPrint[0] != undefined
          ? 'data:image/png;base64,' + assesseeRightFingerPrint[0].fingerprint
          : null,
      coords: '210,134,259,170'
    },
    {
      title: '2',
      headerTitle: 'right hand 2',
      fingerImg:
        assesseeRightFingerPrint[1] !== undefined
          ? 'data:image/png;base64,' + assesseeRightFingerPrint[1].fingerprint
          : null,
      coords: '139,25,180,58'
    },
    {
      title: '3',
      headerTitle: 'right hand 3',
      fingerImg:
        assesseeRightFingerPrint[2] !== undefined
          ? 'data:image/png;base64,' + assesseeRightFingerPrint[2].fingerprint
          : null,
      coords: '92,0,134,32'
    },
    {
      title: '4',
      headerTitle: 'right hand 4',
      fingerImg:
        assesseeRightFingerPrint[3] !== undefined
          ? 'data:image/png;base64,' + assesseeRightFingerPrint[3].fingerprint
          : null,
      coords: '42,10,90,44'
    },
    {
      title: '5',
      headerTitle: 'right hand 5',
      fingerImg:
        assesseeRightFingerPrint[4] !== undefined
          ? 'data:image/png;base64,' + assesseeRightFingerPrint[4].fingerprint
          : null,
      coords: '2,42,40,70'
    }
  ];

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
        <DialogContent className={'popupContent'}>
          <div id="dialog-description">
            <div className="true">
              <div className={'imagePopup'} style={{ margin: 5 }}>
                {'1' === '3' ? (
                  // <img className={classes.fingerImg} src={imgsrc}/>
                  <Button
                    variant="fab"
                    disabled={true}
                    mini
                    className="button
                      uploadImageWidthHeight
                      iconsFooterDefault
                      unAvailable
                      imageNA"
                  >
                    <Avatar
                      alt="Anonymous"
                      src={imgsrc}
                      className={'avatar profileAvatarRight assesseeCredentialImage'}
                    />
                  </Button>
                ) : (
                  <div>
                    <img
                      className={'fingerImg'}
                      src={headerOneBadgeOne === 'left hand' ? leftHandImg : rightHandImg}
                      useMap={
                        headerOneBadgeOne === 'left hand' ? '#left-fingure' : '#right-fingure'
                      }
                      alt=""
                    />
                    <map
                      name={headerOneBadgeOne === 'left hand' ? '#left-fingure' : '#right-fingure'}
                      className={'imageMap'}
                    >
                      {headerOneBadgeOne === 'left hand'
                        ? leftFingerArea.map((value, index) => (
                            <area
                              alt=""
                              key={index}
                              onClick={() => null}
                              coords={value.coords}
                              shape="rect"
                            />
                          ))
                        : rightFingerArea.map((value, index) => (
                            <area
                              alt=""
                              key={index}
                              onClick={() => null}
                              coords={value.coords}
                              shape="rect"
                            />
                          ))}
                    </map>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpFingerprint.propTypes = {
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
export default PopUpFingerprint;
