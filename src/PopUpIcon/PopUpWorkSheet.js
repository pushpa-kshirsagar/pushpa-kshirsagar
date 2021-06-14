import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Spreadsheet from 'react-spreadsheet';
// import Spreadsheet from 'react-spreadsheet-component';
import PopUp from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { Check, Clear } from '@material-ui/icons';
import { DialogTitle, IconButton, Paper } from '@material-ui/core';
import { CLEAR_ASSESSEE_INFO, POPUP_CLOSE } from '../actionType';
import { useDispatch } from 'react-redux';

const PopUpWorkSheet = (props) => {
  // const { popupMode } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const {
    isActive = false,
    headerPanelColour = 'displayPaneLeft',
    headerOne = 'spreadsheet '
  } = props;

  // const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  // const [innerContent, setInnerContent] = useState('');
  // const onChangeTextSheet = (evt) => {
  //   setInnerContent(evt.editor.getData());
  // };
  // const RangeView = ({ cell, getValue }) => (
  //   <input
  //     type="text"
  //     value={getValue({ data: cell })}
  //     disabled
  //     style={{ pointerEvents: 'none' }}
  //   />
  // );

  // const RangeEdit = ({ getValue, cell, onChange }) => (
  //   <input
  //     type="text"
  //     onChange={(e) => {
  //       console.log('IN ON CHANGE CELL======');
  //       onChange({ ...cell, value: e.target.value });
  //     }}
  //     value={getValue({ data: cell }) || 0}
  //     autoFocus
  //   />
  // );

  const data = [
    [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ],
    [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ],
    [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ],
    [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ],
    [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ],
    [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ],
    [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ],
    [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ]
  ];

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
              </div>
              <div className={'backArrow'}>
                <IconButton className="MuiIconButton-root-1602">
                  <Check
                    className={'popupClose'}
                    onClick={() => {
                      console.log('IN SHEET+++++', data);
                    }}
                  />
                </IconButton>
              </div>
              <div className={'backArrow'}>
                <IconButton
                  onClick={() => {
                    console.log('ON CLOSE');
                    // setIsPopUpOpen(false);
                    dispatch({ type: CLEAR_ASSESSEE_INFO });
                    dispatch({ type: POPUP_CLOSE });
                  }}
                  className="MuiIconButton-root-1602"
                >
                  <Clear className={'popupClose'} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </DialogTitle>
        <DialogContent className={['textsheetPopupContent', 'fixed10PadDim'].join(' ')}>
          {/* <Spreadsheet initialData={data} config={config} spreadsheetId="1" /> */}
          <Spreadsheet
            onChange={() => {
              console.log('IN CHANGE++++++');
            }}
            data={data}
          />
        </DialogContent>
      </PopUp>
    </div>
  );
};
PopUpWorkSheet.propTypes = {
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
export default PopUpWorkSheet;
