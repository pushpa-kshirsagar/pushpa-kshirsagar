import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  SET_POPUP_VALUE,
  GET_ASSOCIATE_INFO_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_SECONDARY_CREATE_OPTION_VALUE,
  SET_POPUP_STATE,
  SET_SECONDARY_OPTION_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  FILTERMODE,
  SET_REQUEST_OBJECT,
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
  CLEAR_DISPLAY_PANE_THREE,
  SET_POPUP_SINGLE_STATE,
  CLEAR_ROLE_REDUCER_STATE,
  INTERNAL_NODE_LIST_SAGA,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  CLEAR_NODE_REDUCER_STATE,
  CLEAR_GROUP_REDUCER_STATE,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  CLEAR_ITEM_REDUCER_STATE
} from '../actionType';
import {
  NOTIFICATION_REPORT_POPUP,
  ASSOCIATE_CARD_POPUP_OPTION,
  MODULE_POPUP_OPTION,
  REVIEW_REVISE_POPUP,
  EXCHANGE_POPUP_OPTION,
  REVIEW_POPUP_OPTIONS,
  MARKETPLACE_POPUP_OPTION,
  REVIEW_DISTINCT_POPUP_OPTION,
  GROUP_NODE_ROLE_TYPE_POPUP_OPTION,
  CREATE_INFORMATION_POPUP,
  ASSESSEE_REVIEW_REVISE_POPUP,
  NODE_POPUP_OPTION,
  SELF_POPUP,
  GROUP_TYPE_POPUP_OPTION,
  ANALYTICS_POPUP,
  MINE_REVIEW,
  UPLOAD_DOWNLOAD_POPUP
} from '../PopUpConfig';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  setAssociateCardPermissionInJson,
  makeAssesseeRoleObj,
  makeAssociateRoleObj,
  makeAssesseeGroupObj,
  makeAssociateGroupObj,
  makeAssessmentGroupObj,
  makeAssignmentGroupObj,
  makeAssessmentTypeObj,
  makeAssignmentTypeObj,
  makeAdministratorsReviewListRequestObject,
  makeManagersReviewListRequestObject,
  makeAdministratorRoleCreateObj,
  makeManagerRoleCreateObj,
  makeInternalNodeObj,
  getTypeGroupListApi
} from '../Actions/GenericActions';
import { getAssociatesTypeApiCall, getInternalNodeApiCall } from '../Actions/AssociateModuleAction';
import {
  assesseeCreateApiCalls,
  getAdminManagerDistinctApiCall,
  getAdminManagerRoleApiCall,
  getAssesseeTypeApiCall,
  getRoleGroupReviewListApi,
  getTypeGroupReviewListApi
} from '../Actions/AssesseeModuleAction';
import { getItemsDistinctApiCall } from '../Actions/ItemModuleAction';
const PopUpDownloadUpload = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupHeaderOneBadgeThree,
    popupOpenType,
    secondaryOptionCheckValue,
    currentPopUpOption
  } = useSelector((state) => state.PopUpReducer);
  const { userData, assesseePermission } = useSelector((state) => state.UserReducer);
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const [isReviseMode, setIsReviseMode] = useState(false);
  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft', isActive } = props;
  const ChangeOptionPopup = () => {};
  const setSecondaryOptionValue = () => {};
  const BackHandlerEvent = () => {};
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour + popupOpenType}
          headerOne={popupHeaderOne}
          headerOneBadgeOne={popupHeaderOneBadgeOne}
          headerOneBadgeTwo={popupHeaderOneBadgeTwo}
          headerOneBadgeThree={popupHeaderOneBadgeThree}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            secondaryOptionCheckValue={secondaryOptionCheckValue}
            currentPopUpOption={UPLOAD_DOWNLOAD_POPUP}
          />
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpDownloadUpload;
