import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import PopUp from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import '../Molecules/PopUp/PopUp.css';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';

const PopUpReviewList = (props) => {
  const dispatch = useDispatch();

  const {
    isActive,
    errorMsg = '',
    inputHeaderBadge = 'primary',
    inputHeader = 'node',
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    infoMsg='select one or more',
    ListData = [
      { name: 'Simple Sample 01', description: '01' },
      { name: 'Simple Sample 02', description: '02' },
      { name: 'Simple Sample 03', description: '03' }
    ],
    nextPopUpValue
  } = props;

  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
  };
  return (
    <div>
      <PopUp isActive={isActive}>
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
                  {inputHeaderBadge ? <span className={'headerBadge'}>{inputHeaderBadge}</span> : null}
                </Fragment>
              </InputLabel>
              <div className={'infoSymbol'}></div>
              <div className={'infoSymbol'}>
                <InfoToolTip message={infoMsg} />
              </div>
            </div>
          </div>
          {ListData.map((index, option) => (
            <ReviewList
              textOne={index.name}
              id={index}
              isAlertActive={false}
              isFlagActive={false}
              isSelectActive={false}
              key={index}
            />
          ))}

          <FormHelperText className={['helperText', 'helptextmargin'].join(' ')}>
            <span>{errorMsg}</span>
          </FormHelperText>
        </DialogContent>
      </PopUp>
    </div>
  );
};

PopUpReviewList.propTypes = {
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

export default PopUpReviewList;
