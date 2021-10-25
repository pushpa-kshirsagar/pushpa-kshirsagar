import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import {
  POPUP_CLOSE,
  SET_ASSIGNMENT_BASIC_REDUCER_STATE,
  CLEAR_ASSIGNMENT_INFO,
  CREATE_ASSIGNMENT_SAGA,
  LOADER_START,
  SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_ASSIGNMENT_FRAMEWORK_STATE,
  SET_ASSIGNMENT_COMMUNIQUE_FRAMEWORK_STATE,
  SET_ASSIGNMENT_SYNOPSIS_FRAMEWORK_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';
import PopUpDropList from '../../PopUpInformation/PopUpDropList';
import PopUpTextEditor from '../../PopUpIcon/PopUpTextEditor';

const PopUpAssignmentCreate = (props) => {
  const { headerOne } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { informationBasic, informationAllocation, informationFramework } = useSelector(
    (state) => state.AssignmentReducer
  );
  const {
    selectedAssociateInfo,
    coreTypeReviewListData,
    coreGroupReviewListData,
    coreNodeReviewListData,
    indexPointer
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
    dispatch({ type: CLEAR_ASSIGNMENT_INFO });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    // add default root node in allocation if node not selected
    if (informationAllocation.assignmentNode.assignmentNodePrimary.length === 0) {
      let rootNode = coreNodeReviewListData.filter((node) => {
        return node.informationFramework.associateNodeAscendantPrimary === null;
      });
      let rootNodeId = rootNode[0].id;
      informationAllocation.assignmentNode.assignmentNodePrimary = [
        ...informationAllocation.assignmentNode.assignmentNodePrimary,
        rootNodeId
      ];
    }
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assignment: {
        informationBasic: informationBasic,
        informationAllocation: informationAllocation,
        informationFramework: informationFramework
      }
    };

    console.log('CREATE assignment api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSIGNMENT_SAGA, payload: reqBody });
  };
  let selectedPrimaryGroup = informationAllocation?.assignmentGroup.assignmentGroupPrimary || [];
  let selectedSecondaryGroup =
    informationAllocation?.assignmentGroup.assignmentGroupSecondary || [];
  let filteredCoreGroupReviewListDataPrimary = [];
  if (coreGroupReviewListData && coreGroupReviewListData.length > 0) {
    coreGroupReviewListData.forEach((group) => {
      // for primary popup list
      if (!selectedSecondaryGroup.includes(group.id))
        filteredCoreGroupReviewListDataPrimary.push(group);
    });
  }
  let filteredCoreGroupReviewListDataSecondary = [];
  if (coreGroupReviewListData && coreGroupReviewListData.length > 0) {
    coreGroupReviewListData.forEach((group) => {
      // for Secondary popup list
      if (!selectedPrimaryGroup.includes(group.id))
        filteredCoreGroupReviewListDataSecondary.push(group);
    });
  }
  const updateAllocationObj = (e, stateName, actualStateName) => {
    let groupid = e.currentTarget.getAttribute('tag');
    let groupArr = informationAllocation[stateName][actualStateName];
    if (groupArr.includes(groupid)) {
      document.getElementById(groupid).style.backgroundColor = 'white';
      groupArr = groupArr.filter(function (number) {
        return number !== groupid;
      });
    } else {
      groupArr.push(groupid);
      document.getElementById(groupid).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: stateName,
        actualStateName: actualStateName,
        value: groupArr
      }
    });
  };
  console.log('assignment', informationFramework);
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'assignmentName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={informationBasic}
        typeOfSetObject={SET_ASSIGNMENT_BASIC_REDUCER_STATE}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'assignmentDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        basicInfo={informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_ASSIGNMENT_BASIC_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        nextPopUpValue={'GROUPPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'MANAGERPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        ListData={filteredCoreGroupReviewListDataPrimary}
        textOne={'assignmentGroupName'}
        textTwo={'assignmentGroupDescription'}
        // onClickEvent={updateAssignmentGroups}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assignmentGroup', 'assignmentGroupPrimary');
        }}
        selectedList={informationAllocation.assignmentGroup.assignmentGroupPrimary}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'MANAGERPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a group'}
        ListData={filteredCoreGroupReviewListDataSecondary}
        textOne={'assignmentGroupName'}
        textTwo={'assignmentGroupDescription'}
        selectedList={informationAllocation.assignmentGroup.assignmentGroupSecondary}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assignmentGroup', 'assignmentGroupSecondary');
        }}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'NODEPOPUP'}
        inputHeader={'manager'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a manager'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Manager' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Manager' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Manager' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'NODEPOPUP'}
        inputHeader={'manager'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a manager'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Manager' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Manager' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Manager' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'TYPEPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a node'}
        ListData={coreNodeReviewListData}
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        selectedList={informationAllocation.assignmentNode.assignmentNodePrimary}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assignmentNode', 'assignmentNodePrimary');
        }}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'TYPEPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a node'}
        ListData={coreNodeReviewListData}
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        selectedList={informationAllocation.assignmentNode.assignmentNodeSecondary}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assignmentNode', 'assignmentNodeSecondary');
        }}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'type'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a type'}
        ListData={coreTypeReviewListData}
        textOne={'assignmentTypeName'}
        textTwo={'assignmentTypeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assignmentType', 'assignmentTypePrimary');
        }}
        selectedList={informationAllocation.assignmentType.assignmentTypePrimary}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'type'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a type'}
        ListData={coreTypeReviewListData}
        textOne={'assignmentTypeName'}
        textTwo={'assignmentTypeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assignmentType', 'assignmentTypeSecondary');
        }}
        selectedList={informationAllocation.assignmentType.assignmentTypeSecondary}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpConfirm
        isActive={isPopUpValue === 'CANCELPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'cancel'}
        headerOneBadgeOne={''}
        mode={'cancel'}
        onClickYes={onClickCancelYes}
      />
      <PopUpConfirm
        isActive={isPopUpValue === 'CONFIRMATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ADMINPROCTORPOPUP'}
        tag={'assignmentAdministrationProctor'}
        label={'proctor'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework}
        typeOfSetObject={SET_ASSIGNMENT_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ADMINREPEATPOPUP'}
        tag={'assignmentAdministrationRepeat'}
        label={'repeat'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework}
        typeOfSetObject={SET_ASSIGNMENT_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ADMINRESETPOPUP'}
        tag={'assignmentAdministrationReset'}
        label={'reset'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework}
        typeOfSetObject={SET_ASSIGNMENT_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ADMINSHUFFLEPOPUP'}
        tag={'assignmentAdministrationShuffle'}
        label={'shuffle'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework}
        typeOfSetObject={SET_ASSIGNMENT_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ADMINSUPERVISEPOPUP'}
        tag={'assignmentAdministrationSupervise'}
        label={'supervise'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework}
        typeOfSetObject={SET_ASSIGNMENT_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ADMINVERSONPOPUP'}
        tag={'assignmentAdministrationVersion'}
        label={'version'}
        listSelect={[
          { id: 'Fixed', name: 'Fixed' },
          { id: 'Random', name: 'Random' }
        ]}
        mappingValue={'id'}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework}
        typeOfSetObject={SET_ASSIGNMENT_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextEditor
        isActive={isPopUpValue === 'COMMUNIQUE_TEXTSHEET_POPUP'}
        headerOne={'assignment'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'communiqué'}
        headerOneBadgeTwo={indexPointer}
        defaultSheetValue={informationFramework.assignmentCommunique[indexPointer - 1]}
        onClickSave={(data) => {
          dispatch({ type: SET_ASSIGNMENT_COMMUNIQUE_FRAMEWORK_STATE, payload: data });
        }}
        actualLableValue={indexPointer - 1}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextEditor
        isActive={isPopUpValue === 'SYNOPSIS_TEXTSHEET_POPUP'}
        headerOne={'assignment'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'synopsis'}
        headerOneBadgeTwo={indexPointer}
        defaultSheetValue={informationFramework.assignmentSynopsis[indexPointer - 1]}
        onClickSave={(data) => {
          dispatch({ type: SET_ASSIGNMENT_SYNOPSIS_FRAMEWORK_STATE, payload: data });
        }}
        actualLableValue={indexPointer - 1}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
    </div>
  );
};

export default PopUpAssignmentCreate;
