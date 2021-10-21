import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import PopUp from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import EditorJs from 'react-editor-js';
import Audio from 'audio-editor-js';
import CheckList from '@editorjs/checklist';
import Image from '@editorjs/image';
import Table from '@editorjs/table';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import InlineCode from '@editorjs/inline-code';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import { useRef } from 'react';
import 'suneditor/dist/css/suneditor.min.css';
import PropTypes from 'prop-types';
import { Check, Clear } from '@material-ui/icons';
import { DialogTitle, IconButton, Paper } from '@material-ui/core';
import { CLEAR_ASSESSEE_INFO, POPUP_CLOSE } from '../actionType';
import { imageUploadMethod, audioUploadMethod } from '../Actions/GenericActions';
import { useDispatch } from 'react-redux';

const PopUpTextEditor = (props) => {
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
  const instanceRef = useRef(null);
  const [innerContent, setInnerContent] = useState(defaultSheetValue);
  const closePopup = () => {
    console.log('ON CLOSE');
    if (mode === 'revise') {
      dispatch({ type: POPUP_CLOSE });
    } else {
      dispatch({ type: POPUP_CLOSE });
      dispatch({ type: CLEAR_ASSESSEE_INFO });
    }
  };
  useEffect(() => {
    setInnerContent(defaultSheetValue);
  }, [defaultSheetValue]);
  const onClickYes = async () => {
    let savedData = await instanceRef.current.save();
    let editorData = '';
    // onClickSave(JSON.stringify(savedData));
    console.log(savedData);
    if (savedData.blocks.length > 0) {
      editorData = { ...savedData };
    }
    if (onClickSave) {
      onClickSave(editorData);
    }
    if (typeOfSetObject !== '') {
      dispatch({
        type: typeOfSetObject,
        payload: { ...basicInfo, [actualLableValue]: savedData }
      });
    }
    dispatch({ type: POPUP_CLOSE });
  };
  const uploadImage = async (file) => {
    let uploadData = await imageUploadMethod(file);
    return uploadData;
    // console.log(file.name);
    // let imgUploadData = await ReactS3Client.uploadFile(file, file.name);
    // let res = { success: 1, file: { url: imgUploadData.location } };
    // return res;
  };

  return (
    <div>
      <PopUp isActive={isActive}>
        <DialogTitle id="dialog-title" className={'popupHeaderTitle'}>
          <Paper className={[`editor-popup-header titleSolid-${headerPanelColour}`].join(' ')}>
            <div className={'editor-popup-div'}>
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
        <DialogContent className={['editor-popup-content','textsheetPopupContent'].join(' ')}>
          <EditorJs
            instanceRef={(instance) => (instanceRef.current = instance)}
            data={innerContent}
            tools={{
              image: {
                class: Image,
                config: { uploader: { uploadByFile: uploadImage }, types: '*/*' }
              },
              audio: {
                class: Audio,
                config: { saveServer: audioUploadMethod }
              },
              // video: { class: Video, config: { uploader: { uploadByFile: uploadImage } } },
              table: { class: Table },
              paragraph: { class: Paragraph },
              list: { class: List },
              inlinecode: { class: InlineCode },
              marker: { class: Marker },
              CheckList: { class: CheckList },
              embed: { class: Embed, config: { services: { youtube: true, coub: true } } }
            }}
          />
          {/* <ReactCKEditor
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
          <SunEditor
            setOptions={{
              showPathLabel: false,
              minHeight: '50vh',
              maxHeight: '50vh',
              placeholder: '',
              plugins: [
                align,
                font,
                fontColor,
                fontSize,
                formatBlock,
                hiliteColor,
                horizontalRule,
                lineHeight,
                list,
                table,
                textStyle,
                image,
                video,
                link,
                audio
              ],
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike'],
                ['fontColor', 'hiliteColor'],
                '/', // Line break
                ['removeFormat', 'codeView', 'preview', 'outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                ['table', 'link', 'image', 'video', 'audio']
              ],
              // formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
              font: ['Arial', 'Calibri', 'Roboto', 'Times New Roman']
            }}
            setContents={innerContent}
            onChange={handleChange}
          />*/}
        </DialogContent>
      </PopUp>
    </div>
  );
};
PopUpTextEditor.propTypes = {
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
export default PopUpTextEditor;
