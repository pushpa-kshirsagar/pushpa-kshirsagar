import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import ReactCKEditor from 'react-ckeditor-component';
import PopUp from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { Check, Clear } from '@material-ui/icons';
import { DialogTitle, IconButton, Paper } from '@material-ui/core';

const PopUpTextSheet = (props) => {
  // const { popupMode } = useSelector((state) => state.PopUpReducer);
  // const dispatch = useDispatch();
  const {
    // isActive = false,
    headerPanelColour = 'displayPaneLeft',
    headerOne = 'textsheet'
  } = props;

  const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  const [innerContent, setInnerContent] = useState('');
  const onChangeTextSheet = (evt) => {
    setInnerContent(evt.editor.getData());
  };
  console.log('TEXT SHEET+++++', innerContent);

  return (
    <div>
      <PopUp isActive={isPopUpOpen}>
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
              </div>
              <div className={'backArrow'}>
                <IconButton className="MuiIconButton-root-1602">
                  <Check
                    className={'popupClose'}
                    onClick={() => {
                      console.log('ON SAVE');
                    }}
                  />
                </IconButton>
              </div>
              <div className={'backArrow'}>
                <IconButton
                  onClick={() => {
                    console.log('ON CLOSE');
                    setIsPopUpOpen(false)
                  }}
                  className="MuiIconButton-root-1602"
                >
                  <Clear className={'popupClose'} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </DialogTitle>
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
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
