import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import ReactCKEditor from 'react-ckeditor-component';
import InputLabel from '@material-ui/core/InputLabel';
import PopUp from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { Check, Clear } from '@material-ui/icons';
import { DialogTitle, IconButton, Paper } from '@material-ui/core';
import { CLEAR_ASSESSEE_INFO, POPUP_CLOSE } from '../actionType';
import { useDispatch } from 'react-redux';

const PopUpTextSheet = (props) => {
  // const { popupMode } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const {
    isActive = false,
    headerPanelColour = 'displayPaneLeft',
    headerOne = 'textsheet',
    headerOneBadgeOne = '',
    headerOneBadgeTwo = '',
    headerOneBadgeThree = '',
    basicInfo,
    actualLableValue,
    typeOfSetObject = '',
    defaultSheetValue = '',
    mode,
    onClickSave = null
  } = props;

  // const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  // let defaultSheetValue = basicInfo[actualLableValue] || '';
  const [innerContent, setInnerContent] = useState(defaultSheetValue);
  const onChangeTextSheet = (evt) => {
    setInnerContent(evt.editor.getData());
  };
  const closePopup = () => {
    console.log('ON CLOSE');
    if (mode === 'revise') {
      dispatch({ type: POPUP_CLOSE });
    } else {
      dispatch({ type: CLEAR_ASSESSEE_INFO });
    }
  };
  const onClickYes = () => {
    console.log(innerContent);
    if (onClickSave){
      onClickSave(innerContent);
    }
    if (typeOfSetObject !== '') {
      dispatch({
        type: typeOfSetObject,
        payload: { ...basicInfo, [actualLableValue]: innerContent }
      });
    }
    dispatch({ type: POPUP_CLOSE });
  };

  return (
    <div>
      <PopUp isActive={isActive}>
        <DialogTitle id="dialog-title" className={'popupHeaderTitle'}>
          <Paper
            style={{
              maxWidth: '600px',
              alignItems: 'center',
              padding: '5px',
              display: 'flex'
            }}
            className={[`titleSolid-${headerPanelColour}`].join(' ')}
          >
            <div
              style={{
                width: '100%',
                alignItems: 'center',
                padding: '5px',
                display: 'flex'
              }}
            >
              <div className={'textSheetTitleBox'}>
                <span>{headerOne}</span>&nbsp;
                {headerOneBadgeOne ? (
                  <>
                    <span className={'iguru-header-badge1_0'}>{headerOneBadgeOne}</span>
                    &nbsp;
                  </>
                ) : null}
                {headerOneBadgeTwo ? (
                  <>
                    <span className={'iguru-header-badge1_0'}>{headerOneBadgeTwo}</span>
                    &nbsp;
                  </>
                ) : null}
                {headerOneBadgeThree ? (
                  <>
                    <span className={'iguru-header-badge1_0'}>{headerOneBadgeThree}</span>
                    &nbsp;
                  </>
                ) : null}
              </div>
              <div className={'backArrow'}>
                <IconButton className="MuiIconButton-root-1602">
                  <Check className={'popupClose'} onClick={onClickYes} />
                </IconButton>
              </div>
              <div className={'backArrow'}>
                <IconButton onClick={closePopup} className="MuiIconButton-root-1602">
                  <Clear className={'popupClose'} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </DialogTitle>
        <DialogContent className={['textsheetPopupContent'].join(' ')}>
          <ReactCKEditor
            activeClass="editor"
            content={innerContent}
            // onInit={(editor) => {
            //   editor.ui.view.editable.element.parentElement.insertBefore(
            //     editor.ui.view.toolbar.element,
            //     editor.ui.view.editable.element
            //   );
            // }}
            events={{
              // blur: this.onBlur,
              // afterPaste: this.afterPaste,
              change: onChangeTextSheet
            }}
            contentEditable="true"
            config={{
              isReadOnly: true
            }}
          />
        </DialogContent>
      </PopUp>
    </div>
  );
};
PopUpTextSheet.propTypes = {
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
export default PopUpTextSheet;
