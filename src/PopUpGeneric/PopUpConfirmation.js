import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, CLEAR_ASSESSEE_INFO, SET_NEXT_POPUP, PREVIOUS_POPUP } from '../actionType';
import '../Molecules/PopUp/PopUp.css';

const PopUpConfirmation = (props) => {
  const {
    isActive,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo,
    onClickYes = null,
    mode = 'confirm'
  } = props;
  const dispatch = useDispatch();
  const { popupMode, isPopUpValue, prevPopUpValue } = useSelector((state) => state.PopUpReducer);

  const onClickNo = () => {
    if (mode === 'cancel') {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: prevPopUpValue } });
    } else {
      dispatch({ type: CLEAR_ASSESSEE_INFO });
      dispatch({ type: POPUP_CLOSE });
    }
  };
  const handleBack = () => {
    /*according manage back state*/
    if (popupMode === 'ASSESSEE_SIGN_ON' || popupMode === 'ASSESSEE_CREATE') {
      dispatch({ type: PREVIOUS_POPUP, payload: { prevPopUpValue: isPopUpValue } });
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'ASSESSEENAMEPOPUP' } });
    }
    if (popupMode === 'ASSOCIATE_SIGN_ON' || popupMode === 'ASSOCIATE_CREATE') {
      dispatch({
        type: SET_NEXT_POPUP,
        payload: { isPopUpValue: 'NAMEALIASPOPUP' }
      });
    }
    if (
      popupMode === 'assesseesROLECREATE' ||
      popupMode === 'associatesROLECREATE' ||
      popupMode === 'assesseesGROUPCREATE' ||
      popupMode === 'associatesGROUPCREATE' ||
      popupMode === 'assignmentsGROUPCREATE' ||
      popupMode === 'assessmentsGROUPCREATE' ||
      popupMode === 'assignmentsTYPECREATE' ||
      popupMode === 'assessmentsTYPECREATE'
    ) {
      dispatch({
        type: SET_NEXT_POPUP,
        payload: { isPopUpValue: 'NAMEPOPUP' }
      });
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
          headerOneBadgeThree={''}
          mode={mode}
          onClick={handleBack}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div id="dialog-description">
            <div className="true">
              <div className={'tickOption'}>
                <div>
                  <Button className={'optionPrimary'} data-value="no" onClick={onClickNo}>
                    no
                  </Button>
                </div>
                <div>
                  <Button className={'optionPrimary'} data-value="yes" onClick={onClickYes}>
                    yes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpConfirmation.propTypes = {
  headerPanelColour: PropTypes.oneOf([
    'displayPaneLeft',
    'displayPaneCentre',
    'displayPaneRight',
    'genericOne',
    'genericTwo'
  ]), //new changes
  // displayPane: PropTypes.oneOf(['centre', 'core', 'left', 'right']), //old
  headerOne: PropTypes.string,
  className: null,
  isActive: PropTypes.bool
};
export default PopUpConfirmation;
