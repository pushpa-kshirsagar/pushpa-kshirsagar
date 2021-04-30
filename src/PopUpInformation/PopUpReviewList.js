import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import PopUp from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import '../Molecules/PopUp/PopUp.css';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, SET_NEXT_POPUP } from '../actionType';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';
const PopUpReviewList = (props) => {
  const dispatch = useDispatch();
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);

  const {
    isActive,
    errorMsg = '',
    setErrorMsg = null,
    headerOneBadgeTwo = '',
    inputHeaderBadge = 'primary',
    inputHeaderBadgeTwo,
    inputHeader = 'node',
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    infoMsg = 'select one or more',
    ListData = [
      { id: '01', informationBasic: { name: 'Simple Sample 01', description: '01' } },
      { id: '02', informationBasic: { name: 'Simple Sample 02', description: '02' } },
      { id: '03', informationBasic: { name: 'Simple Sample 03', description: '03' } }
    ],
    textOne = 'name',
    textTwo = 'description',
    nextPopUpValue,
    onClickEvent = null,
    mode,
    isRequired = false,
    selectedList = []
  } = props;

  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    if (isRequired) {
      if (selectedList.length > 0) {
        if (reviewMode === 'revise') {
          dispatch({ type: POPUP_CLOSE });
        } else {
          dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
        }
      } else {
        setErrorMsg(REQUIRED_ERROR_MESSAGE);
      }
    } else {
      if (reviewMode === 'revise') {
        dispatch({ type: POPUP_CLOSE });
      } else {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
      }
    }
  };
  return (
    <div>
      <PopUp isActive={isActive}>
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
              <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                <Fragment>
                  {inputHeader}&nbsp;
                  {inputHeaderBadge ? (
                    <span className={'headerBadge'}>{inputHeaderBadge}</span>
                  ) : null}&nbsp;
                  {inputHeaderBadgeTwo ? (
                    <span className={'headerBadge'}>{inputHeaderBadgeTwo}</span>
                  ) : null}
                </Fragment>
              </InputLabel>
              <div className={'infoSymbol'}></div>
              <div className={'infoSymbol'}>
                <InfoToolTip message={infoMsg} />
              </div>
            </div>
          </div>
          {ListData &&
            ListData.map((index, option) => (
              <ReviewList
                textOne={index.informationBasic[textOne]}
                textTwo={index.informationBasic[textTwo]}
                id={index.id}
                tag={index.id}
                isAlertActive={false}
                isFlagActive={false}
                isSelectActive={false}
                key={index.id}
                isSelectedReviewList={selectedList.includes(index.id)}
                onClickEvent={onClickEvent}
                // isSelectedReviewList={selectedIdsArr.includes(index.id)}
              />
            ))}

          <FormHelperText
            className={['helperText', 'helptextmargin'].join(' ')}
            style={{ margin: '5px 0px 0px 5px' }}
          >
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
