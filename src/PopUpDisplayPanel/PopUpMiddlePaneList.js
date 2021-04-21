import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  ASSESSEE_INFO_REVISE_SAGA,
  GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA,
  GET_ASSESSEE_INFO_SAGA,
  GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_INFO_SAGA,
  GET_ASSESSMENT_INFO_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_INFO_SAGA,
  GET_ASSIGNMENT_GROUP_REVIEW_INFO_SAGA,
  GET_ASSIGNMENT_INFO_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_INFO_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_PREVIOUS_POPUP,
  SET_MIDDLEPANE_SECONDARY_OPTION,
  SET_MOBILE_PANE_STATE,
  SET_SECONDARY_CREATE_OPTION_VALUE
} from '../actionType';
import { getAssesseeDistinctApiCall } from '../Actions/AssesseeModuleAction';
const PopUpMiddlePaneList = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupOpenType,
    secondaryOptionCheckValue,
    selectedTagValue
  } = useSelector((state) => state.PopUpReducer);
  const {
    selectedAssociateInfo,
    countPage,
    middlePaneHeaderBadgeTwo,
    middlePaneHeaderBadgeOne
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const [isReviseMode, setIsReviseMode] = useState(false);

  const dispatch = useDispatch();
  const {
    headerPanelColour = 'displayPaneCentre',
    isActive,
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
    let keyVal = e.currentTarget.getAttribute('data-key');
    let dataVal = e.currentTarget.getAttribute('data-value');
    // alert(keyVal, 'keyVal');
    if (dataVal === 'information') {
      console.log(selectedTagValue);
      dispatch({ type: LOADER_START });
      if (
        typeOfMiddlePaneList === 'assesseesDistinctReviewList' ||
        typeOfMiddlePaneList === 'administratorsDistinctReviewList' ||
        typeOfMiddlePaneList === 'managersDistinctReviewList'
      ) {
        dispatch({
          type: GET_ASSESSEE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            isReviseMode,
            headerOne:
              typeOfMiddlePaneList === 'administratorsDistinctReviewList'
                ? 'administrator'
                : typeOfMiddlePaneList === 'managersDistinctReviewList'
                ? 'manager'
                : 'assessee',
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
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
      if (typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList') {
        dispatch({
          type: GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            isReviseMode,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
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
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
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
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
      if (typeOfMiddlePaneList === 'assessmentDistinctReviewList') {
        dispatch({
          type: GET_ASSESSMENT_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
      if (typeOfMiddlePaneList === 'assignmentDistinctReviewList') {
        dispatch({
          type: GET_ASSIGNMENT_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
            isReviseMode,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
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
      if (typeOfMiddlePaneList === 'assignmentsGroupDistinctReviewList') {
        // alert(selectedTagValue);
        dispatch({
          type: GET_ASSIGNMENT_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
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
      if (typeOfMiddlePaneList === 'assessmentsTypeDistinctReviewList') {
        dispatch({
          type: GET_ASSESSMENT_TYPE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
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
      if (typeOfMiddlePaneList === 'assignmentsTypeDistinctReviewList') {
        dispatch({
          type: GET_ASSIGNMENT_TYPE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
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
      setIsReviseMode(false);
      // dispatch({ type: LOADER_STOP });

      // onClickInformation(secondaryOptionCheckValue);
    } else if (dataVal === 'revise') {
      // alert("IN REVISE");
      setIsReviseMode(true);
      dispatch({
        type: SET_MIDDLEPANE_SECONDARY_OPTION,
        payload: { badgeValue: dataVal, keyValue: keyVal }
      });
    } else if (
      (dataVal === 'suspendApiCall' ||
        dataVal === 'terminateApiCall' ||
        dataVal === 'unsuspendApiCall' ||
        dataVal === 'unterminateApiCall') &&
      popupHeaderOne === 'assessee'
    ) {
      let reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assessee: {
          id: selectedTagValue,
          informationEngagement: {
            assesseeStatus: keyVal
          }
        }
      };
      dispatch({ type: LOADER_START });
      dispatch({
        type: ASSESSEE_INFO_REVISE_SAGA,
        payload: { secondaryOptionCheckValue: '', headerOne: '', reqBody }
      });
      getAssesseeDistinctApiCall(
        selectedAssociateInfo,
        middlePaneHeaderBadgeTwo,
        countPage,
        dispatch,
        middlePaneHeaderBadgeOne
      );
      dispatch({ type: POPUP_CLOSE });
    } else {
      dispatch({
        type: SET_MIDDLEPANE_SECONDARY_OPTION,
        payload: { badgeValue: dataVal, keyValue: keyVal }
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
          headerOneBadgeTwo={popupHeaderOneBadgeTwo}
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
