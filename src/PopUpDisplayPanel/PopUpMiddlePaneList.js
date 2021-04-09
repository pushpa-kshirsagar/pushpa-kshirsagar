import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA,
  GET_ASSESSEE_INFO_SAGA,
  GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_INFO_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA,
  LOADER_START,
  LOADER_STOP,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_PREVIOUS_POPUP,
  SET_MIDDLEPANE_SECONDARY_OPTION,
  SET_MOBILE_PANE_STATE,
  SET_SECONDARY_CREATE_OPTION_VALUE
} from '../actionType';
const PopUpMiddlePaneList = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupOpenType,
    secondaryOptionCheckValue,
    selectedTagValue
  } = useSelector((state) => state.PopUpReducer);

  const dispatch = useDispatch();
  const {
    headerPanelColour = 'displayPaneCentre',
    isActive,
    onClickInformation = null,
    popupAllClose,
    typeOfMiddlePaneList
  } = props;
  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_SECONDARY_CREATE_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    console.log(e.currentTarget.getAttribute('data-value'));
    console.log('ChangeOptionPopup');
    let clickVal = e.currentTarget.getAttribute('data-value');
    if (clickVal === 'information') {
      console.log(selectedTagValue);
      dispatch({ type: LOADER_START });
      if (typeOfMiddlePaneList === 'assesseeDistinctReviewList') {
        dispatch({
          type: GET_ASSESSEE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            reqBody: {
              assesseeId: '0123456',
              associateId: '0654321',
              filter: 'true',
              searchCondition: 'AND',
              search: [
                {
                  condition: 'and',
                  searchBy: [
                    {
                      dataType: 'string',
                      conditionColumn: 'id',
                      conditionValue: {
                        condition: 'eq',
                        value: {
                          from: selectedTagValue ? selectedTagValue : '6054a4d6cb14fb2075aeec87'
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList') {
        dispatch({
          type: GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            reqBody: {
              assesseeId: '0123456',
              associateId: '0654321',
              filter: 'true',
              searchCondition: 'AND',
              search: [
                {
                  condition: 'and',
                  searchBy: [
                    {
                      dataType: 'string',
                      conditionColumn: 'id',
                      conditionValue: {
                        condition: 'eq',
                        value: {
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'associateRoleDistinctReviewList') {
        dispatch({
          type: GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            reqBody: {
              assesseeId: '0123456',
              associateId: '0654321',
              filter: 'true',
              searchCondition: 'AND',
              search: [
                {
                  condition: 'and',
                  searchBy: [
                    {
                      dataType: 'string',
                      conditionColumn: 'id',
                      conditionValue: {
                        condition: 'eq',
                        value: {
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'associateDistinctReviewList') {
        dispatch({
          type: GET_ASSOCIATE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            reqBody: {
              assesseeId: '0123456',
              associateId: '605091f81edc573048fb467a', //605255729d3c823d3964e0ec
              filter: true,
              search: [
                {
                  condition: 'and',
                  searchBy: [
                    {
                      dataType: 'String',
                      conditionColumn: 'id',
                      conditionValue: {
                        condition: 'eq',
                        value: {
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'assesseesGroupDistinctReviewList') {
        dispatch({
          type: GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            reqBody: {
              assesseeId: '0123456',
              associateId: '605091f81edc573048fb467a', //605255729d3c823d3964e0ec
              filter: true,
              search: [
                {
                  condition: 'and',
                  searchBy: [
                    {
                      dataType: 'String',
                      conditionColumn: 'id',
                      conditionValue: {
                        condition: 'eq',
                        value: {
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'associatesGroupDistinctReviewList') {
        dispatch({
          type: GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            reqBody: {
              assesseeId: '0123456',
              associateId: '0654321', //605255729d3c823d3964e0ec
              filter: true,
              search: [
                {
                  condition: 'and',
                  searchBy: [
                    {
                      dataType: 'String',
                      conditionColumn: 'id',
                      conditionValue: {
                        condition: 'eq',
                        value: {
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'assessmentsGroupDistinctReviewList') {
        dispatch({
          type: GET_ASSESSMENT_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            reqBody: {
              assesseeId: '0123456',
              associateId: '0654321',
              filter: 'true',
              search: [
                {
                  condition: 'and',
                  searchBy: [
                    {
                      dataType: 'string',
                      conditionColumn: 'id',
                      conditionValue: {
                        condition: 'eq',
                        value: {
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      // if(typeOfMiddlePaneList === ''){}
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'middlePaneSelectedValue', value: selectedTagValue }
      });
      popupAllClose();
      // dispatch({ type: LOADER_STOP });

      // onClickInformation(secondaryOptionCheckValue);
    } else {
      dispatch({
        type: SET_MIDDLEPANE_SECONDARY_OPTION,
        payload: clickVal
      });
    }
  };
  const BackHandlerEvent = (e) => {
    dispatch({ type: SET_MIDDLEPANE_PREVIOUS_POPUP });
  };
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour + popupOpenType}
          headerOne={popupHeaderOne}
          headerOneBadgeOne={popupHeaderOneBadgeOne}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            secondaryOptionCheckValue={secondaryOptionCheckValue}
          />
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpMiddlePaneList;
