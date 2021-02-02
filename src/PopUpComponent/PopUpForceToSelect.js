import React, { useState, Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/Popup/Popup.css';
import PropTypes from 'prop-types';

const PopUpForceToSelect = (props) => {
  /*props*/
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information'
  } = props;

  const [state, setState] = useState({
    isChecked: false
  });
  /*handling the onchange event*/
  const handleChange = (event) => {
    setState({ isChecked: event.target.value });
  };

  const createNameWithBadge = (name) => {
    var txt = name;
    var arr = [];
    var newTxt = txt.split('(');

    for (var j = 1; j < newTxt.length; j++) {
      let word = newTxt[j].split(')')[0];
      let newwrd = word.replace(' ', '||');
      txt = txt.replace('(' + word + ')', '{' + newwrd + '}');
    }

    let finlastr = txt;
    var finalsplit = finlastr.split(' ');

    for (var i = 0; i < finalsplit.length; i++) {
      if (finalsplit[i].charAt(0) === '{') {
        let nobadge = finalsplit[i];
        let finalentry = nobadge.replace('{', '').replace('}', '').replace('||', ' ');
        arr.push(
          <Fragment>
            <span className={'headerBadge'} style={{ overflow: 'unset' }}>
              {finalentry}
            </span>
            <span>&nbsp;</span>
          </Fragment>
        );
      }

      if (finalsplit[i].charAt(0) !== '{') {
        arr.push(
          <Fragment>
            <span>{finalsplit[i]}</span>
            <span>&nbsp;</span>
          </Fragment>
        );
      }
    }

    return arr;
  };
  const handleClick = () => {};
  const arr = ['email address (primary)', 'email address (secondary)'];
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
          {arr.map((item) => (
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>{createNameWithBadge(item)}</div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      color="default"
                      value={item}
                      name={item}
                      checked={state.isChecked === item}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpForceToSelect.propTypes = {
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
export default PopUpForceToSelect;
