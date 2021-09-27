import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import {
  POPUP_CLOSE,
  CREATE_GROUP_SAGA,
  LOADER_START,
  CLEAR_GROUP_REDUCER_STATE,
  UPDATE_ASSESSEE_PERSONAL_INFO,
  UPDATE_ASSESSEE_ENGAGEMENT_INFO,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_GROUP_ALLOCATION_STATE,
  SET_ASSESSEE_CLASSIFICAION_STATE,
  SET_ASSESSMENT_CLASSIFICAION_STATE,
  SET_ASSIGNMENT_CLASSIFICAION_STATE,
  SET_ASSOCIATE_CLASSIFICAION_STATE,
  SET_CULTUREPROFILE_CLASSIFICAION_STATE,
  SET_JOBPROFILE_CLASSIFICAION_STATE,
  SET_ITEM_CLASSIFICAION_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';
import PopUpDropList from '../../PopUpInformation/PopUpDropList';
import PopUpTagSecondary from '../../PopUpInformation/PopUpTagSecondary';

const PopUpGroupCreate = (props) => {
  const {
    headerOne,
    reducerObeject,
    groupDescription,
    groupName,
    setReducerObject,
    objectName
  } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const [nodeSelectedError, setNodeSelectedError] = useState('');
  const [roleSelectedError, setRoleSelectedError] = useState('');
  const { selectedAssociateInfo, coreNodeReviewListData, coreRoleReviewListData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const dispatch = useDispatch();
  const { reviewMode, responseObject, statusPopUpValue } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );

  const updateAllocationObj = (e, stateName, actualStateName) => {
    let tagId = e.currentTarget.getAttribute('tag');
    console.log('tagId', tagId);
    setNodeSelectedError('');
    let groupArr = reducerObeject.informationAllocation[stateName][actualStateName];
    if (groupArr.includes(tagId)) {
      document.getElementById(tagId).style.backgroundColor = 'white';
      groupArr = groupArr.filter(function (number) {
        return number !== tagId;
      });
    } else {
      groupArr.push(tagId);
      document.getElementById(tagId).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_GROUP_ALLOCATION_STATE,
      payload: {
        objectName: objectName,
        stateName: stateName,
        actualStateName: actualStateName,
        value: groupArr
      }
    });
  };
  const onClickCancelYes = () => {
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    // add default root node in allocation if node not selected
    if (
      reducerObeject.informationAllocation[objectName + 'Node'][objectName + 'NodePrimary']
        .length === 0
    ) {
      let rootNode = coreNodeReviewListData.filter((node) => {
        return node.informationFramework.associateNodeAscendantPrimary === null;
      });
      let rootNodeId = rootNode[0].id;
      reducerObeject.informationAllocation[objectName + 'Node'][objectName + 'NodePrimary'] = [
        ...reducerObeject.informationAllocation[objectName + 'Node'][objectName + 'NodePrimary'],
        rootNodeId
      ];
    }
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      whichGroupCreate: headerOne,
      [objectName]: reducerObeject
    };
    console.log(reqBody);
    //console.log('CREATE group api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_GROUP_SAGA, payload: reqBody });
  };
  let tagPrimary = '';
  let tenureStartDate = 'mm/dd/yyyy --:-- --';
  let tenureEndDate = 'mm/dd/yyyy --:-- --';
  if (headerOne === 'assessees') {
    tagPrimary =
      responseObject?.informationEngagement?.assesseeGroupTag?.assesseeGroupTagPrimary || '';
    tenureStartDate =
      responseObject?.informationEngagement?.assesseeGroupTenure
        ?.assesseeGroupTenureDateTimeStart || 'mm/dd/yyyy --:-- --';
    tenureEndDate =
      responseObject?.informationEngagement?.assesseeGroupTenure?.assesseeGroupTenureDateTimeEnd ||
      'mm/dd/yyyy --:-- --';
  }
  if (headerOne === 'associates') {
    tagPrimary =
      responseObject?.informationEngagement?.associateGroupTag?.associateGroupTagPrimary || '';
    tenureStartDate =
      responseObject?.informationEngagement?.associateGroupTenure
        ?.associateGroupTenureDateTimeStart || 'mm/dd/yyyy --:-- --';
    tenureEndDate =
      responseObject?.informationEngagement?.associateGroupTenure
        ?.associateGroupTenureDateTimeEnd || 'mm/dd/yyyy --:-- --';
  }
  if (headerOne === 'assessments') {
    tagPrimary =
      responseObject?.informationEngagement?.assessmentGroupTag?.assessmentGroupTagPrimary || '';
    tenureStartDate =
      responseObject?.informationEngagement?.assessmentGroupTenure
        ?.assessmentGroupTenureDateTimeStart || 'mm/dd/yyyy --:-- --';
    tenureEndDate =
      responseObject?.informationEngagement?.assessmentGroupTenure
        ?.assessmentGroupTenureDateTimeEnd || 'mm/dd/yyyy --:-- --';
  }
  if (headerOne === 'assignments') {
    tagPrimary =
      responseObject?.informationEngagement?.assignmentGroupTag?.assignmentGroupTagPrimary || '';
    tenureStartDate =
      responseObject?.informationEngagement?.assignmentGroupTenure
        ?.assignmentGroupTenureDateTimeStart || 'mm/dd/yyyy --:-- --';
    tenureEndDate =
      responseObject?.informationEngagement?.assignmentGroupTenure
        ?.assignmentGroupTenureDateTimeEnd || 'mm/dd/yyyy --:-- --';
  }
  if (headerOne === 'items') {
    tagPrimary = responseObject?.informationEngagement?.itemGroupTag?.itemGroupTagPrimary || '';
    tenureStartDate =
      responseObject?.informationEngagement?.itemGroupTenure?.itemGroupTenureDateTimeStart ||
      'mm/dd/yyyy --:-- --';
    tenureEndDate =
      responseObject?.informationEngagement?.itemGroupTenure?.itemGroupTenureDateTimeEnd ||
      'mm/dd/yyyy --:-- --';
  }
  console.log('reducerObeject', reducerObeject);
  console.log('coreRoleReviewListData', coreRoleReviewListData);
  console.log('reviewMode', reviewMode);
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={groupName}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={reducerObeject.informationBasic}
        typeOfSetObject={setReducerObject}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={groupDescription}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        basicInfo={reducerObeject.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={setReducerObject}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'MANAGERLISTPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'NODELISTPOPUP'}
        inputHeader={'manager'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
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
        isActive={isPopUpValue === 'MANAGERSECONDARYLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'NODELISTPOPUP'}
        inputHeader={'manager'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a group'}
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
        isActive={isPopUpValue === 'ROLELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={''}
        inputHeader={'role'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a role'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Role' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Role' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Role' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ROLESECONDARYLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={''}
        inputHeader={'role'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a role'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Role' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Role' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Role' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'TYPELISTPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a node'}
        isRequired={false}
        minimumSelected={1}
        ListData={coreNodeReviewListData}
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        setErrorMsg={setNodeSelectedError}
        errorMsg={nodeSelectedError}
        // onClickEvent={updateAllocationObj}
        selectedList={
          reducerObeject.informationAllocation[objectName + 'Node'][objectName + 'NodePrimary']
        }
        onClickEvent={(e) => {
          updateAllocationObj(e, objectName + 'Node', objectName + 'NodePrimary');
        }}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODESECONDARYLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={''}
        inputHeader={'node'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a node'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Node' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Node' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Node' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CLASSIFICATIONLISTPOPUP'}
        inputHeader={'type'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Type' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Type' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Type' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPESECONDARYLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'type'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a group'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Type' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Type' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Type' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      {/* <PopUpReviewList
        isActive={isPopUpValue === 'CLASSIFICATIONLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'classification'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        ListData={coreRoleReviewListData}
        textOne={'assesseeGroupClassificationName'}
        textTwo={'assesseeGroupClassificationDescription'}
        isRequired={true}
        minimumSelected={1}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        onClickEvent={(e) => {
          updateSetupObj(e, objectName + 'Classification', objectName + 'ClassificationPrimary');
        }}
        selectedList={
          reducerObeject.informationSetup[objectName + 'Classification'][objectName + 'ClassificationPrimary']
        }
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      /> */}

      <PopUpDropList
        isActive={isPopUpValue === 'CLASSIFICATIONLISTPOPUP'}
        tag={objectName + 'ClassificationPrimary'}
        label={'classification'}
        listSelect={[
          { id: 'Bespoke', name: 'Bespoke' },
          { id: 'Generic', name: 'Generic' }
        ]}
        mappingValue={'id'}
        inputHeader={''}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        labelval={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        isRequired={true}
        nextPopUpValue={reviewMode === 'revise' ? '' : 'CONFIRMATIONPOPUP'}
        basicInfo={reducerObeject.informationSetup[objectName + 'Classification']}
        typeOfSetObject={
          objectName === 'assesseeGroup'
            ? SET_ASSESSEE_CLASSIFICAION_STATE
            : objectName === 'assessmentGroup'
            ? SET_ASSESSMENT_CLASSIFICAION_STATE
            : objectName === 'assignmentGroup'
            ? SET_ASSIGNMENT_CLASSIFICAION_STATE
            : objectName === 'associateGroup'
            ? SET_ASSOCIATE_CLASSIFICAION_STATE
            : objectName === 'cultureProfileGroup'
            ? SET_CULTUREPROFILE_CLASSIFICAION_STATE
            : objectName === 'jobProfileGroup'
            ? SET_JOBPROFILE_CLASSIFICAION_STATE
            : objectName === 'itemGroup'
            ? SET_ITEM_CLASSIFICAION_STATE
            : null
        }
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
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TAGREADONLYPRIMARYPOPUP'}
        label={'tag'}
        labelBadgeOne={'primary'}
        actualLableValue={'assesseeTagPrimary'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        basicInfo={tagPrimary}
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TENURESATRTDATEPOPUP'}
        label={'tenure'}
        labelBadgeOne={'start'}
        actualLableValue={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        basicInfo={tenureStartDate}
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TENUREENDDATEPOPUP'}
        label={'tenure'}
        labelBadgeOne={'end'}
        actualLableValue={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        basicInfo={tenureEndDate}
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'STATUSPOPUP'}
        tag={'assesseeStatus'}
        label={'status'}
        listSelect={[
          { id: 'Active', name: 'Active' },
          { id: 'Suspended', name: 'Suspended' },
          { id: 'Terminated', name: 'Terminated' },
          { id: 'Unverified', name: 'Unverified' },
          { id: 'Confirmed', name: 'Confirmed' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        isRequired={true}
        basicInfo={statusPopUpValue}
        nextPopUpValue={''}
        typeOfSetObject={UPDATE_ASSESSEE_PERSONAL_INFO}
        handleNextPopupValue={() => {}}
        isNotRevised={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTagSecondary
        isActive={isPopUpValue === 'TAGSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        tagSecondary={reducerObeject?.informationEngagement || {}}
        signInSetup={reducerObeject?.informationSetup || {}}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={UPDATE_ASSESSEE_ENGAGEMENT_INFO}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
    </div>
  );
};

export default PopUpGroupCreate;
