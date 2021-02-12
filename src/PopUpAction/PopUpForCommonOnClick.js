import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import Popup from '../Molecules/Popup/Popup';
import { DialogContent, Button, Divider } from '@material-ui/core';

import { SET_NEXT_POPUP } from '../actionType';
const PopUpForCommonOnClick = (props) => {
  const { popupHeaderOne, popupHeaderOneBadgeOne, popupContentArrValue } = useSelector(
    (state) => state.PopUpReducer
  );
  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft', isActive, handleClick = null } = props;

  const ChangeOptionPopup = (e) => {
    console.log(e.currentTarget.getAttribute('data-value'));
  };
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={popupHeaderOne}
          headerOneBadgeOne={popupHeaderOneBadgeOne}
          onClick={handleClick}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <div id="dialog-description">
            <div className="true">
              <div className={'tickOption'}>
                {popupContentArrValue &&
                  popupContentArrValue.map((item) => {
                    return (
                      <div>
                        <Button
                          className={item.optionClass}
                          data-value={item.dataValue}
                          onClick={ChangeOptionPopup}
                        >
                          {item.data}
                        </Button>
                        {item.divider && <Divider {...item.divider} />}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpForCommonOnClick;
