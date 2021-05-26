import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  ASSESSEE_INFO_REVISE_SAGA,
  ASSOCIATE_INFO_REVISE_SAGA,
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
  SHARE_ROLES_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_PREVIOUS_POPUP,
  SET_MIDDLEPANE_SECONDARY_OPTION,
  SET_MOBILE_PANE_STATE,
  SET_SECONDARY_CREATE_OPTION_VALUE,
  FILTERMODE,
  CLEAR_DISPLAY_PANE_THREE,
  LOADER_STOP,
  GET_ASSOCIATE_NODE_REVIEW_INFO_SAGA,
  CLEAR_NODE_REDUCER_STATE,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  INTERNAL_NODE_LIST_SAGA,
  SET_POPUP_VALUE,
  SET_NODE_DYNAMIC_SINGLE_STATE,
  SET_SINGLE_ASSOCIATE_INFORMATION
} from '../actionType';
import {
  getAssesseeGroupAssesseeDistinctApiCall,
  getAssesseeGroupAssesseeReqObj,
  getAssesseeNodeAssesseeDistinctApiCall,
  getAssesseeNodeAssesseeReqObj,
  getAssesseeRoleAssesseeDistinctApiCall,
  getAssesseeRoleAssesseeReqObj
} from '../Actions/AssesseeModuleAction';
import {
  associateCreatePopup,
  getAssociateGroupAssociateDistinctApiCall,
  getAssociateGroupAssociateReqObj,
  getAssociateRoleAssociateDistinctApiCall,
  getAssociateRoleAssociateReqObj
} from '../Actions/AssociateModuleAction';
import { makeInternalNodeObj } from '../Actions/GenericActions';
const PopUpMiddlePaneList = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupOpenType,
    secondaryOptionCheckValue,
    selectedTagValue,
    selectedTagGroupId
  } = useSelector((state) => state.PopUpReducer);
  const { selectedAssociateInfo, countPage, middlePaneHeader } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
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
    console.log(dataVal);
    if (dataVal === 'information' && popupHeaderOneBadgeTwo !== 'create') {
      console.log(selectedTagValue);
      console.log(typeOfMiddlePaneList);
      console.log(isReviseMode);
      dispatch({ type: LOADER_START });
      if (
        typeOfMiddlePaneList === 'assesseesDistinctReviewList' ||
        typeOfMiddlePaneList === 'assesseesSelfReview' ||
        typeOfMiddlePaneList === 'administratorsDistinctReviewList' ||
        typeOfMiddlePaneList === 'assesseesGroupAssesseeReviewList' ||
        typeOfMiddlePaneList === 'assesseesGroupAssesseeReviewList' ||
        typeOfMiddlePaneList === 'assesseesRoleAssesseeReviewList' ||
        typeOfMiddlePaneList === 'assesseesNodeAssesseeReviewList' ||
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
        let assesseeRoleAssesseeReqBody = getAssesseeRoleAssesseeReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            assesseeRoleAssesseeReqBody,
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
        let associateRoleAssociateReqBody = getAssociateRoleAssociateReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            associateRoleAssociateReqBody,
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
      if (
        typeOfMiddlePaneList === 'associateDistinctReviewList' ||
        typeOfMiddlePaneList === 'associatesRoleAssociateReviewList' ||
        typeOfMiddlePaneList === 'associatesGroupAssociateReviewList' ||
        typeOfMiddlePaneList === 'associateSelfReview' ||
        typeOfMiddlePaneList === 'associatesNodeDistinctReviewList'
      ) {
        dispatch({
          type: GET_ASSOCIATE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
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
      if (typeOfMiddlePaneList === 'associateNodeDistinctReviewList') {
        dispatch({ type: LOADER_START });
        let associateNodeAssesseeReqBody = getAssesseeNodeAssesseeReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSOCIATE_NODE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            associateNodeAssesseeReqBody,
            selectedModule: middlePaneHeader,
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
        let assesseeGroupAssesseeReqBody = getAssesseeGroupAssesseeReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            assesseeGroupAssesseeReqBody,
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
        let associateGroupAssociateReqBody = getAssociateGroupAssociateReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            associateGroupAssociateReqBody,
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
      // if (typeOfMiddlePaneList === 'associatesNodeDistinctReviewList') {
      //   dispatch({ type: LOADER_STOP });
      // }
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
    } else if (dataVal === 'distinct') {
      if (typeOfMiddlePaneList === 'assesseesGroupDistinctReviewList') {
        getAssesseeGroupAssesseeDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue, //group id
          '',
          false,
          true
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assesseeGroupAssesseeDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList') {
        getAssesseeRoleAssesseeDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false,
          middlePaneHeader
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assesseeRoleAssesseeDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'associateNodeDistinctReviewList') {
        getAssesseeNodeAssesseeDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false,
          middlePaneHeader
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assesseeNodeAssesseeDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'associatesGroupDistinctReviewList') {
        getAssociateGroupAssociateDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'associateGroupAssociateDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'associateRoleDistinctReviewList') {
        getAssociateRoleAssociateDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'associateRoleAssociateDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
    } else if (dataVal === 'revise') {
      // alert("IN REVISE");
      setIsReviseMode(true);
      dispatch({
        type: SET_MIDDLEPANE_SECONDARY_OPTION,
        payload: { badgeValue: dataVal, keyValue: keyVal }
      });
    } else if (dataVal === 'shareApiCall' || dataVal === 'unshareApiCall') {
      let reqBody = null;
      let shareVal = '';
      if (typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assesseeRoleShared: [
            {
              assesseeRoleId: selectedTagValue,
              assesseeRoleGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'assessee';
      }
      if (typeOfMiddlePaneList === 'associateRoleDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          associateRoleShared: [
            {
              associateRoleId: selectedTagValue,
              associateRoleGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'associate';
      }
      if (reqBody) {
        dispatch({ type: LOADER_START });
        dispatch({
          type: SHARE_ROLES_SAGA,
          payload: {
            secondaryOptionCheckValue: '',
            headerOne: '',
            request: reqBody,
            apiCall: dataVal,
            shareValue: shareVal
          }
        });
      }
      dispatch({ type: POPUP_CLOSE });
    } else if (dataVal === 'flagedApiCall' || dataVal === 'unflagedApiCall') {
      let reqBody = null;
      if (typeOfMiddlePaneList === 'assesseesDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assessee: {
            id: selectedTagValue,
            informationBasic: {
              assesseeFlag: dataVal === 'flagedApiCall' ? true : false
            }
          }
        };
        dispatch({ type: LOADER_START });
        dispatch({
          type: ASSESSEE_INFO_REVISE_SAGA,
          payload: { secondaryOptionCheckValue: '', headerOne: '', reqBody }
        });
        dispatch({ type: POPUP_CLOSE });
      }
    } else if (
      dataVal === 'suspendApiCall' ||
      dataVal === 'terminateApiCall' ||
      dataVal === 'unsuspendApiCall' ||
      dataVal === 'unarchiveApiCall' ||
      dataVal === 'archiveApiCall' ||
      dataVal === 'yesApiCall' ||
      dataVal === 'unterminateApiCall'
    ) {
      if (typeOfMiddlePaneList === 'assesseesDistinctReviewList') {
        let reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
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
      }
      if (typeOfMiddlePaneList === 'associateDistinctReviewList') {
        let reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          associate: {
            id: selectedTagValue,
            informationEngagement: {
              associateStatus: keyVal
            }
          }
        };
        dispatch({ type: LOADER_START });
        dispatch({
          type: ASSOCIATE_INFO_REVISE_SAGA,
          payload: { secondaryOptionCheckValue: '', headerOne: '', reqBody }
        });
      }

      dispatch({ type: POPUP_CLOSE });
    } else if (
      dataVal === 'information' &&
      popupHeaderOneBadgeTwo === 'create' &&
      middlePaneHeader === 'associate'
    ) {
      dispatch({ type: POPUP_CLOSE });
      let requestObj = makeInternalNodeObj(selectedAssociateInfo, 'active', 0, countPage);
      dispatch({ type: CLEAR_NODE_REDUCER_STATE });
      dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
      dispatch({
        type: INTERNAL_NODE_LIST_SAGA,
        payload: { request: requestObj, nodeViewState: 'list', isMiddlePaneList: false }
      });
      dispatch({
        type: SET_NODE_DYNAMIC_SINGLE_STATE,
        payload: {
          objectName: 'informationFramework',
          stateName: 'associateNodeAscendant',
          actualStateName: 'associateNodeAscendantPrimary',
          value: [selectedTagValue]
        }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'NODECREATE' }
      });
    } else if (
      dataVal === 'information' &&
      popupHeaderOneBadgeTwo === 'create' &&
      middlePaneHeader === 'associates'
    ) {
      dispatch({ type: POPUP_CLOSE });
      associateCreatePopup(
        selectedAssociateInfo,
        dispatch,
        secondaryOptionCheckValue,
        dataVal,
        selectedTagValue
      );
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
