import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
// import CalculatorIcon from '@material-ui/icons/Keyboard';
// import CalculatorAdvancedIcon from '@material-ui/icons/KeyboardHide';
import IconButton from '../Molecules/IconButton/IconButton';
const PopUpIcon = (props) => {
  /*props*/
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = '',
    dataArr = []
  } = props;

  const handleClick = () => {};
  // const dataArr = [
  //   { lable: 'basic', Icon: CalculatorIcon },
  //   { lable: 'buisness', Icon: CalculatorIcon },
  //   { lable: 'financial', Icon: CalculatorAdvancedIcon },
  //   { lable: 'scientific', Icon: CalculatorAdvancedIcon }
  // ];
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
              {dataArr.length === 1 ? (
                <div className={'popup-icon-mbPager'}>
                  <IconButton
                    label={dataArr[0].lable}
                    Icon={dataArr[0].Icon}
                    colour={'genericOne'}
                  />
                </div>
              ) : dataArr.length === 2 ? (
                <div className={'popup-icon-mbPager'}>
                  <div className={'iconBoxFooterPopup'}></div>
                  <div className={'popup-icon-mbPager'}>
                    <IconButton
                      label={dataArr[0].lable}
                      Icon={dataArr[0].Icon}
                      colour={'genericOne'}
                    />
                  </div>
                  <div className={'iconBoxFooterPopup'}></div>
                  <div className={'popup-icon-mbPager'}>
                    <IconButton
                      label={dataArr[1].lable}
                      Icon={dataArr[1].Icon}
                      colour={'genericOne'}
                    />
                  </div>
                  <div className={'iconBoxFooterPopup'}></div>
                </div>
              ) : dataArr.length === 4 ? (
                <Fragment>
                  <div className={'popup-icon-mbPager'}>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[0].lable}
                        Icon={dataArr[0].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[1].lable}
                        Icon={dataArr[1].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                  </div>
                  <div className={'popup-icon-mbPager'}>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[2].lable}
                        Icon={dataArr[2].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[3].lable}
                        Icon={dataArr[3].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                  </div>
                </Fragment>
              ) : dataArr.length === 6 ? (
                <Fragment>
                  <div className={'popup-icon-mbPager'}>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[0].lable}
                        Icon={dataArr[0].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[1].lable}
                        Icon={dataArr[1].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                  </div>
                  <div className={'popup-icon-mbPager'}>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[2].lable}
                        Icon={dataArr[2].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[3].lable}
                        Icon={dataArr[3].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                  </div>
                  <div className={'popup-icon-mbPager'}>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[4].lable}
                        Icon={dataArr[4].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[5].lable}
                        Icon={dataArr[5].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                  </div>
                </Fragment>
              ) : dataArr.length === 8 ? (
                <Fragment>
                  <div className={'popup-icon-mbPager'}>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[0].lable}
                        Icon={dataArr[0].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[1].lable}
                        Icon={dataArr[1].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                  </div>
                  <div className={'popup-icon-mbPager'}>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[2].lable}
                        Icon={dataArr[2].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[3].lable}
                        Icon={dataArr[3].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                  </div>
                  <div className={'popup-icon-mbPager'}>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[4].lable}
                        Icon={dataArr[4].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[5].lable}
                        Icon={dataArr[5].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                  </div>
                  <div className={'popup-icon-mbPager'}>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[6].lable}
                        Icon={dataArr[6].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
                    <div className={'popup-icon-mbPager'}>
                      <IconButton
                        label={dataArr[7].lable}
                        Icon={dataArr[7].Icon}
                        colour={'genericOne'}
                      />
                    </div>
                    <div className={'iconBoxFooterPopup'}></div>
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
