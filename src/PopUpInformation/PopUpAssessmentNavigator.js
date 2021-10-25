import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import CircleIcon from '../Molecules/IconButton/IconButton';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { Button, Divider, IconButton, InputLabel } from '@material-ui/core';
import { Check, Dashboard } from '@material-ui/icons';

const PopUpAssessmentNavigator = (props) => {
  const {
    isActive,
    headerPanelColour = 'displayPaneRight',
    headerOne = 'assessment',
    headerOneBadgeOne = 'navigator',
    itemData
  } = props;

  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
  };
  const questionsArray = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50
  ];
  let itemArray = itemData;
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          onClick={handleClick}
          mode="error"
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div
            style={{ height: '210px', margin: '5px 0px', padding: '0 5px', overflow: 'overlay' }}
          >
            <div
              style={{
                display: 'grid',
                padding: '0px 5px',
                flexWrap: 'wrap',
                counterReset: 'l',
                justifyContent: 'flex-start',
                gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))'
              }}
            >
              {itemArray &&
                itemArray.map((question, index) => {
                  return (
                    <div key={question} style={{ padding: '5px', boxSizing: 'border-box' }}>
                      <div
                        style={{
                          flex: '1',
                          display: 'flex',
                          paddingTop: '0px',
                          alignItems: 'center',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}
                      >
                        <Button
                          style={{
                            fontSize: '1.6rem',
                            width: '40px',
                            height: '40px',
                            padding: '0',
                            minWidth: '0',
                            boxShadow:
                              '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
                            borderRadius: '50%'
                          }}
                          variant="fab"
                          mini
                        >
                          {index + 1}
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <Divider dark style={{ marginTop: '5px' }} />
            <Button className="optionPrimary" data-value="create">
              <span style={{ fontSize: '1.2rem' }}>all</span>
              {false ? (
                <IconButton className="tick" style={{ right: '10px' }}>
                  <Check
                    style={{
                      fontSize: '1.2rem',
                      position: 'relative',
                      right: '-2px',
                      color: '#0000008a'
                    }}
                  />
                </IconButton>
              ) : null}
            </Button>
          </div>
          <div>
            <Button className="optionPrimary" data-value="create">
              <span style={{ fontSize: '1.2rem' }}>flaged</span>
              {false ? (
                <IconButton className="tick" style={{ right: '10px' }}>
                  <Check
                    style={{
                      fontSize: '1.2rem',
                      position: 'relative',
                      right: '-2px',
                      color: '#0000008a'
                    }}
                  />
                </IconButton>
              ) : null}
            </Button>
            <Divider dark />
          </div>
          <div
            style={{
              display: 'flex',
              flex: 1,
              padding: '0 5px',
              textAlign: 'center',
              justifyContent: 'center',
              paddingTop: '5px'
            }}
          >
            <div className="iconBoxFooter" style={{ paddingTop: '0px' }}>
              <CircleIcon Icon={Dashboard} className="" colour="displayPaneLeft" label="" />
              {/* <Button
                variant="fab"
                mini
                style={{
                  color: '#e5f4d6',
                  backgroundColor: '#7DC832',
                  '&:hover': {
                    background: '#B1DE84'
                  }
                }}
              >
                <Dashboard />
              </Button> */}
              <InputLabel
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  margin: '0px',
                  color: 'rgba(0,0,0,0.87)'
                }}
              >
                dashboard
              </InputLabel>
            </div>
          </div>

          <div>
            <Divider dark />
            <Button className="optionPrimary">
              <span style={{ fontSize: '1.2rem' }}>finish</span>
            </Button>
          </div>

          <div>
            <Divider dark />
            <Button className="optionPrimary" disabled={true}>
              <span style={{ fontSize: '1.2rem' }}>suspend</span>
            </Button>
          </div>
          <div>
            <Button className="optionPrimary">
              <span style={{ fontSize: '1.2rem' }}>terminate</span>
            </Button>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpAssessmentNavigator.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf(['genericOne']),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};

export default PopUpAssessmentNavigator;
