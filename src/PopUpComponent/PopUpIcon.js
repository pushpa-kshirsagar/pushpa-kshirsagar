import React, { useState, Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import { Grid, Button, InputLabel } from '@material-ui/core';
import '../Molecules/Popup/Popup.css';
import PropTypes from 'prop-types';
import CalculatorIcon from '@material-ui/icons/Keyboard';
import CalculatorAdvancedIcon from '@material-ui/icons/KeyboardHide';
import IconButton from '../Molecules/IconButton/IconButton';
const PopUpIcon = (props) => {
  /*props*/
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information'
  } = props;

  const handleClick = () => {};
  const arr = [
    { lable: 'basic', Icon: CalculatorIcon },
    { lable: 'buisness', Icon: CalculatorIcon },
    { lable: 'financial', Icon: CalculatorAdvancedIcon },
    { lable: 'scientific', Icon: CalculatorAdvancedIcon }
  ];

  const noofrows = Math.round(Object.keys(arr).length / 2);
  const list = [];
  for (let i = 0; i < noofrows; i++) {
    list.push(
      <div className={'mbPager'}>
        <div className={'iconBoxFooter'}></div>
        <div className={'mbPager'}>
          <IconButton label={arr[i].lable} Icon={CalculatorIcon} colour={'genericOne'} />
        </div>
        <div className={'iconBoxFooter'}></div>
        <div className={'mbPager'}>
          <IconButton label={'fsdfs'} Icon={CalculatorIcon} colour={'genericOne'} />
        </div>
        <div className={'iconBoxFooter'}></div>
      </div>
    );
  }
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          onClick={handleClick}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div id="dialog-description">
            <div className="true">
              {/* {list} */}
              {
              
                arr.map((item,index) =>{
                 return(<div className={'mbPager'}>
                  <IconButton label={item.lable} Icon={CalculatorIcon} colour={'genericOne'} />
                </div>
                )})
              }
              {/* <div className={'mbPager'}>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={'fsdfs'} Icon={CalculatorIcon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={'fsdfs'} Icon={CalculatorIcon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    </div> */}
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpIcon.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf(['genericOne']),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};
export default PopUpIcon;
