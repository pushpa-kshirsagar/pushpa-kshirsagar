import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import CircleIcon from '../Molecules/IconButton/IconButton';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { Button, Divider, IconButton, InputLabel } from '@material-ui/core';
import { Check, Dashboard } from '@material-ui/icons';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import { GET_ASSESSEE_ASSIGNMENT_SAGA, LOADER_START, POPUP_CLOSE, POPUP_OPEN, SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE, SET_DISPLAY_TWO_SINGLE_STATE, SET_POPUP_STATE, SET_POPUP_VALUE, SET_SECONDARY_CREATE_OPTION_VALUE } from '../actionType';
import { useDispatch, useSelector } from 'react-redux';
import { ASSESSMENT_CLOSED_POPUP_OPTION } from '../PopUpConfig';

const PopUpAssessmentNavigator = (props) => {
  const {
    isActive,
    headerPanelColour = 'displayPaneRight',
    headerOne = 'assessment',
    headerOneBadgeOne = 'navigator',
    itemData,
  } = props;
  const dispatch = useDispatch();
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupHeaderOneBadgeThree,
    popupOpenType,
    secondaryOptionCheckValue,
    tertiaryOptionCheckValue = 'all',
    forthOptionCheckValue,
    popupContentArrValue,
    isPopUpValue
  } = useSelector((state) => state.PopUpReducer);
  const { selectedAssociateInfo, relatedReviewListDistinctData, reviewListReqObj } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  console.log('relatedReviewListDistinctData',relatedReviewListDistinctData);
  const [itemNavigatorData, setNavigatorData] = useState(itemData);
  const [flagedCheck, setFlagCheck] = useState(false);
  const handleClick = () => {
    console.log('cancelled call');
    setNavigatorData(itemData);
    /*according to creation mode popup sequence will change*/
  };
  // useEffect(() => {
  //   setNavigatorData(itemData);
  // }, [itemData, isQuestionFlaged]);
  let itemArray = itemData;
  const handleOnClickFilter = (value) => {
    if (value === 'all') {
      //itemArray = itemData;
      //setNavigatorData([...itemData]);
      setFlagCheck(false);
      dispatch({
        type: SET_SECONDARY_CREATE_OPTION_VALUE,
        payload: value
      });
    } else if (value === 'flaged') {
      setFlagCheck(true);
      dispatch({
        type: SET_SECONDARY_CREATE_OPTION_VALUE,
        payload: value
      });
      //let flagedData = itemData.filter(x => x.isFlagged === true);
      //itemArray = flagedData;
      //setNavigatorData([...flagedData]);
    } else if (value === 'finish' || value === 'terminate') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'assessment',
          popupHeaderOneBadgeOne: value === 'finish' ? 'finish' : 'terminate',
          popupHeaderOneBadgeTwo: '',
          isPopUpValue: '',
          popupOpenType: 'primary',
          secondaryOptionCheckValue: 'assignment',
          popupContentArrValue: ASSESSMENT_CLOSED_POPUP_OPTION,
        }
      });
      dispatch({ type: POPUP_OPEN, payload: 'POPUP_TERMINATE_SUSPEND' });
    }
    else { }
    
  }
  const ChangeOptionPopup = (e) => {
    let keyVal = e.currentTarget.getAttribute('data-key');
    let dataVal = e.currentTarget.getAttribute('data-value');
    console.log(dataVal);
    if (dataVal === 'yes' && secondaryOptionCheckValue === 'assignment') {
      dispatch({ type: LOADER_START });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({
        type: GET_ASSESSEE_ASSIGNMENT_SAGA,
        payload: {
          request: reviewListReqObj,
          BadgeOne: 'active',
          BadgeTwo: '',
          BadgeThree: '',
          assessmentStarted: true,
          assignmentId: relatedReviewListDistinctData[0].assignmentId
        }
      });
    }
    if (dataVal === 'yes' && secondaryOptionCheckValue === 'sign-out') {
    }
    if (dataVal === 'yes' && secondaryOptionCheckValue === 'dashboard') {
      dispatch({
        type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
        payload: { stateName: 'isExamMode', value: false }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'typeOfMiddlePaneList', value: '' }
      });
    }
    dispatch({ type: POPUP_CLOSE });
  };
  const BackHandlerEvent = (e) => { 
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        secondaryOptionCheckValue: 'all'
      }
    }); 
    dispatch({ type: POPUP_OPEN, payload: 'NavigatorPOPUP' });
  };
  const setSecondaryOptionValue = (e) => {
    //TODO: set secondary option in item
    var dataVal = e.currentTarget.getAttribute('data-value')
    console.log(dataVal, 'dataVal');
    dispatch({
      type: SET_SECONDARY_CREATE_OPTION_VALUE,
      payload: dataVal
    });
  };
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
                    <div
                      key={question}
                      style={{
                        padding: '5px', boxSizing: 'border-box',
                        display: flagedCheck ? question.assesseeAssignmentAssessmentItemFlagged === true ? 'block' : 'none' : 'block'
                      }}>
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
                        {question.assesseeAssignmentAssessmentItemFlagged ? (
                          <i className={['fa fa-flag', 'jss13409'].join(' ')} ></i>
                        ) : (
                          < i></i>
                        )}
                        {/* <IconButton className={'assessmentFlagButton'}>
                          {question.isFlagged ? (
                            <i className="fa fa-flag" style={{ color: '#ff6464' }}></i>
                          ) : (
                            < i></i>
                          )}
                        </IconButton> */}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <Divider dark style={{ marginTop: '5px' }} />
            <Button className="optionPrimary" data-value="create" onClick={() => { handleOnClickFilter('all') }}>
              <span style={{ fontSize: '1.2rem' }}>all</span>
              {secondaryOptionCheckValue === 'all' ? (
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
            <Button className="optionPrimary" data-value="create" onClick={() => { handleOnClickFilter('flaged') }}
            >
              <span style={{ fontSize: '1.2rem' }}>flaged</span>
              {secondaryOptionCheckValue === 'flaged' ? (
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
            <Button className="optionPrimary" onClick={() => { handleOnClickFilter('finish') }}>
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
            <Button className="optionPrimary" onClick={() => { handleOnClickFilter('terminate') }}>
              <span style={{ fontSize: '1.2rem' }}>terminate</span>
            </Button>
          </div>
        </DialogContent>
      </Popup>
      <Popup isActive={isPopUpValue === 'POPUP_TERMINATE_SUSPEND'}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={popupHeaderOneBadgeOne}
          onClick={BackHandlerEvent}
          mode=''
          isNotRevised={false}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            //currentPopUpOption={popupContentArrValue}
            secondaryOptionCheckValue={secondaryOptionCheckValue}
          //tertiaryOptionCheckValue={tertiaryOptionCheckValue}
          />
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
