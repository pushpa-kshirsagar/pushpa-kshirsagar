import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
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
              {arr.length === 1 ? (
                <div className={'mbPager'}>
                  <IconButton label={arr[0].lable} Icon={arr[0].Icon} colour={'genericOne'} />
                </div>
              ) : arr.length === 2 ? (
                <div className={'mbPager'}>
                  <div className={'iconBoxFooter'}></div>
                  <div className={'mbPager'}>
                    <IconButton label={arr[0].lable} Icon={arr[0].Icon} colour={'genericOne'} />
                  </div>
                  <div className={'iconBoxFooter'}></div>
                  <div className={'mbPager'}>
                    <IconButton label={arr[1].lable} Icon={arr[1].Icon} colour={'genericOne'} />
                  </div>
                  <div className={'iconBoxFooter'}></div>
                </div>
              ) : arr.length === 4 ? (
                <Fragment>
                  <div className={'mbPager'}>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[0].lable} Icon={arr[0].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[1].lable} Icon={arr[1].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                  </div>
                  <div className={'mbPager'}>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[2].lable} Icon={arr[2].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[3].lable} Icon={arr[3].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                  </div>
                </Fragment>
              ) : arr.length === 6 ? (
                <Fragment>
                  <div className={'mbPager'}>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[0].lable} Icon={arr[0].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[1].lable} Icon={arr[1].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                  </div>
                  <div className={'mbPager'}>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[2].lable} Icon={arr[2].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[3].lable} Icon={arr[3].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                  </div>
                  <div className={'mbPager'}>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[4].lable} Icon={arr[4].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[5].lable} Icon={arr[5].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                  </div>
                </Fragment>
              ) : arr.length === 8 ? (
                <Fragment>
                  <div className={'mbPager'}>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[0].lable} Icon={arr[0].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[1].lable} Icon={arr[1].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                  </div>
                  <div className={'mbPager'}>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[2].lable} Icon={arr[2].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[3].lable} Icon={arr[3].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                  </div>
                  <div className={'mbPager'}>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[4].lable} Icon={arr[4].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[5].lable} Icon={arr[5].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                  </div>
                  <div className={'mbPager'}>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[6].lable} Icon={arr[6].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                    <div className={'mbPager'}>
                      <IconButton label={arr[7].lable} Icon={arr[7].Icon} colour={'genericOne'} />
                    </div>
                    <div className={'iconBoxFooter'}></div>
                  </div>
                </Fragment>
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
