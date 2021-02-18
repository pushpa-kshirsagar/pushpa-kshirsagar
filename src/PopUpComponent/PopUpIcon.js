import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
// import CalculatorIcon from '@material-ui/icons/Keyboard';
// import CalculatorAdvancedIcon from '@material-ui/icons/KeyboardHide';
import IconButton from '../Molecules/IconButton/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { Clear } from '@material-ui/icons';
import { POPUP_CLOSE, SET_GRID_COLUMN_COUNT_VALUE } from '../actionType';

const PopUpIconLengthOne = (props) => {
  const { popupContentArrValue, onClickEvent } = props;
  return (
    <div className={'popup-icon-mbPager'}>
      <IconButton
        label={popupContentArrValue[0].lable}
        labelTwo={popupContentArrValue[0].labelTwo && popupContentArrValue[0].labelTwo}
        Icon={popupContentArrValue[0].Icon}
        dataValue={popupContentArrValue[0].dataValue}
        onClick={onClickEvent && onClickEvent}
        colour={'genericOne'}
      />
    </div>
  );
};
const PopUpIconLengthTwo = (props) => {
  const { popupContentArrValue, onClickEvent } = props;
  return (
    <div className={'popup-icon-mbPager'}>
      <div className={'iconBoxFooterPopup'}></div>
      <div className={'popup-icon-mbPager'}>
        <IconButton
          label={popupContentArrValue[0].lable}
          labelTwo={popupContentArrValue[0].labelTwo && popupContentArrValue[0].labelTwo}
          Icon={popupContentArrValue[0].Icon}
          dataValue={popupContentArrValue[0].dataValue}
          onClick={onClickEvent && onClickEvent}
          colour={'genericOne'}
        />
      </div>
      <div className={'iconBoxFooterPopup'}></div>
      <div className={'popup-icon-mbPager'}>
        <IconButton
          label={popupContentArrValue[1].lable}
          labelTwo={popupContentArrValue[1].labelTwo && popupContentArrValue[1].labelTwo}
          Icon={popupContentArrValue[1].Icon}
          dataValue={popupContentArrValue[1].dataValue}
          onClick={onClickEvent && onClickEvent}
          colour={'genericOne'}
        />
      </div>
      <div className={'iconBoxFooterPopup'}></div>
    </div>
  );
};

const PopUpIconLengthFour = (props) => {
  const { popupContentArrValue, onClickEvent } = props;
  return (
    <Fragment>
      <div className={'popup-icon-mbPager'}>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[0].lable}
            labelTwo={popupContentArrValue[0].labelTwo && popupContentArrValue[0].labelTwo}
            Icon={popupContentArrValue[0].Icon}
            dataValue={popupContentArrValue[0].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[1].lable}
            labelTwo={popupContentArrValue[1].labelTwo && popupContentArrValue[1].labelTwo}
            Icon={popupContentArrValue[1].Icon}
            dataValue={popupContentArrValue[1].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
      </div>
      <div className={'popup-icon-mbPager'}>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[2].lable}
            labelTwo={popupContentArrValue[2].labelTwo && popupContentArrValue[2].labelTwo}
            Icon={popupContentArrValue[2].Icon}
            dataValue={popupContentArrValue[2].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[3].lable}
            labelTwo={popupContentArrValue[3].labelTwo && popupContentArrValue[3].labelTwo}
            Icon={popupContentArrValue[3].Icon}
            dataValue={popupContentArrValue[3].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
      </div>
    </Fragment>
  );
};
const PopUpIconLengthSix = (props) => {
  const { popupContentArrValue, onClickEvent } = props;
  const { gridColumnCountValue } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <div className={'popup-icon-mbPager'}>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[0].lable}
            labelTwo={popupContentArrValue[0].labelTwo && popupContentArrValue[0].labelTwo}
            Icon={
              gridColumnCountValue === popupContentArrValue[0].id
                ? Clear
                : popupContentArrValue[0].Icon
            }
            dataValue={popupContentArrValue[0].dataValue}
            onClick={
              gridColumnCountValue === popupContentArrValue[0].id
                ? () => {
                    dispatch({
                      type: SET_GRID_COLUMN_COUNT_VALUE,
                      payload: 0
                    });
                  }
                : onClickEvent
            }
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[1].lable}
            labelTwo={popupContentArrValue[1].labelTwo && popupContentArrValue[1].labelTwo}
            Icon={
              gridColumnCountValue === popupContentArrValue[1].id
                ? Clear
                : popupContentArrValue[1].Icon
            }
            dataValue={popupContentArrValue[1].dataValue}
            onClick={
              gridColumnCountValue === popupContentArrValue[1].id
                ? () => {
                    dispatch({
                      type: SET_GRID_COLUMN_COUNT_VALUE,
                      payload: 0
                    });
                  }
                : onClickEvent
            }
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
      </div>
      <div className={'popup-icon-mbPager'}>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[2].lable}
            labelTwo={popupContentArrValue[2].labelTwo && popupContentArrValue[2].labelTwo}
            Icon={
              gridColumnCountValue === popupContentArrValue[2].id
                ? Clear
                : popupContentArrValue[2].Icon
            }
            dataValue={popupContentArrValue[2].dataValue}
            onClick={
              gridColumnCountValue === popupContentArrValue[2].id
                ? () => {
                    dispatch({
                      type: SET_GRID_COLUMN_COUNT_VALUE,
                      payload: 0
                    });
                  }
                : onClickEvent
            }
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[3].lable}
            labelTwo={popupContentArrValue[3].labelTwo && popupContentArrValue[3].labelTwo}
            Icon={
              gridColumnCountValue === popupContentArrValue[3].id
                ? Clear
                : popupContentArrValue[3].Icon
            }
            dataValue={popupContentArrValue[3].dataValue}
            onClick={
              gridColumnCountValue === popupContentArrValue[3].id
                ? () => {
                    dispatch({
                      type: SET_GRID_COLUMN_COUNT_VALUE,
                      payload: 0
                    });
                  }
                : onClickEvent
            }
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
      </div>
      <div className={'popup-icon-mbPager'}>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[4].lable}
            labelTwo={popupContentArrValue[4].labelTwo && popupContentArrValue[4].labelTwo}
            Icon={
              gridColumnCountValue === popupContentArrValue[4].id
                ? Clear
                : popupContentArrValue[4].Icon
            }
            dataValue={popupContentArrValue[4].dataValue}
            onClick={
              gridColumnCountValue === popupContentArrValue[4].id
                ? () => {
                    dispatch({
                      type: SET_GRID_COLUMN_COUNT_VALUE,
                      payload: 0
                    });
                  }
                : onClickEvent
            }
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[5].lable}
            labelTwo={popupContentArrValue[5].labelTwo && popupContentArrValue[5].labelTwo}
            Icon={
              gridColumnCountValue === popupContentArrValue[5].id
                ? Clear
                : popupContentArrValue[5].Icon
            }
            dataValue={popupContentArrValue[5].dataValue}
            onClick={
              gridColumnCountValue === popupContentArrValue[5].id
                ? () => {
                    dispatch({
                      type: SET_GRID_COLUMN_COUNT_VALUE,
                      payload: 0
                    });
                  }
                : onClickEvent
            }
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
      </div>
    </Fragment>
  );
};
const PopUpIconLengthEight = (props) => {
  const { popupContentArrValue, onClickEvent } = props;
  return (
    <Fragment>
      <div className={'popup-icon-mbPager'}>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[0].lable}
            labelTwo={popupContentArrValue[0].labelTwo && popupContentArrValue[0].labelTwo}
            Icon={popupContentArrValue[0].Icon}
            dataValue={popupContentArrValue[0].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[1].lable}
            labelTwo={popupContentArrValue[1].labelTwo && popupContentArrValue[1].labelTwo}
            Icon={popupContentArrValue[1].Icon}
            dataValue={popupContentArrValue[1].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
      </div>
      <div className={'popup-icon-mbPager'}>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[2].lable}
            labelTwo={popupContentArrValue[2].labelTwo && popupContentArrValue[2].labelTwo}
            Icon={popupContentArrValue[2].Icon}
            dataValue={popupContentArrValue[2].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[3].lable}
            labelTwo={popupContentArrValue[3].labelTwo && popupContentArrValue[3].labelTwo}
            Icon={popupContentArrValue[3].Icon}
            dataValue={popupContentArrValue[3].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
      </div>
      <div className={'popup-icon-mbPager'}>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[4].lable}
            labelTwo={popupContentArrValue[4].labelTwo && popupContentArrValue[4].labelTwo}
            Icon={popupContentArrValue[4].Icon}
            dataValue={popupContentArrValue[4].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[5].lable}
            labelTwo={popupContentArrValue[5].labelTwo && popupContentArrValue[5].labelTwo}
            Icon={popupContentArrValue[5].Icon}
            dataValue={popupContentArrValue[5].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
      </div>
      <div className={'popup-icon-mbPager'}>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[6].lable}
            labelTwo={popupContentArrValue[6].labelTwo && popupContentArrValue[6].labelTwo}
            Icon={popupContentArrValue[6].Icon}
            dataValue={popupContentArrValue[6].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
        <div className={'popup-icon-mbPager'}>
          <IconButton
            label={popupContentArrValue[7].lable}
            labelTwo={popupContentArrValue[7].labelTwo && popupContentArrValue[7].labelTwo}
            Icon={popupContentArrValue[7].Icon}
            dataValue={popupContentArrValue[7].dataValue}
            onClick={onClickEvent && onClickEvent}
            colour={'genericOne'}
          />
        </div>
        <div className={'iconBoxFooterPopup'}></div>
      </div>
    </Fragment>
  );
};
const PopUpIcon = (props) => {
  const {
    popupHeaderOne,
    popupOpenType,
    popupHeaderOneBadgeOne,
    popupContentArrValue
  } = useSelector((state) => state.PopUpReducer);
  /*props*/
  const dispatch = useDispatch();
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    BackHandlerEvent,
    onClickEvent
  } = props;

  const handleClick = () => {
    if (popupOpenType === 'primary') {
      dispatch({ type: POPUP_CLOSE });
    } else {
      BackHandlerEvent();
    }
  };
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour + popupOpenType}
          headerOne={popupHeaderOne}
          headerOneBadgeOne={popupHeaderOneBadgeOne}
          onClick={handleClick}
          mode={''}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div id="dialog-description">
            <div className="true">
              {popupContentArrValue && popupContentArrValue.length === 1 ? (
                <PopUpIconLengthOne
                  popupContentArrValue={popupContentArrValue}
                  onClickEvent={onClickEvent}
                />
              ) : popupContentArrValue && popupContentArrValue.length === 2 ? (
                <PopUpIconLengthTwo
                  popupContentArrValue={popupContentArrValue}
                  onClickEvent={onClickEvent}
                />
              ) : popupContentArrValue && popupContentArrValue.length === 4 ? (
                <PopUpIconLengthFour
                  popupContentArrValue={popupContentArrValue}
                  onClickEvent={onClickEvent}
                />
              ) : popupContentArrValue && popupContentArrValue.length === 6 ? (
                <PopUpIconLengthSix
                  popupContentArrValue={popupContentArrValue}
                  onClickEvent={onClickEvent}
                />
              ) : popupContentArrValue && popupContentArrValue.length === 8 ? (
                <PopUpIconLengthEight
                  popupContentArrValue={popupContentArrValue}
                  onClickEvent={onClickEvent}
                />
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpIcon.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf(['displayPaneLeft']),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};
export default PopUpIcon;
