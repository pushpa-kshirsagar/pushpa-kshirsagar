import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import {
  POPUP_CLOSE,
  SET_ASSESSMENT_BASIC_REDUCER_STATE,
  CLEAR_ASSESSMENT_INFO,
  CREATE_ASSESSMENT_SAGA,
  LOADER_START,
  SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_ASSESSMENT_FRAMEWORK_STATE,
  SET_ASSESSMENT_SCORE_FRAMEWORK_STATE,
  SET_ASSESSMENT_COMMUNIQUE_FRAMEWORK_STATE,
  UPDATE_ASSOCIATE_BASIC_INFO,
  UPDATE_ASSOCIATE_SETUP_INFO,
  SET_ASSESSMENT_MANUSCRIPT_FRAMEWORK_STATE,
  SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
  SET_ASSESSMENT_AID_FRAMEWORK_STATE,
  SET_ASSESSMENT_EVALUATION_FRAMEWORK_STATE
} from '../../actionType';
import PopUpTextSheet from '../../PopUpIcon/PopUpTextSheet';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';
import PopUpDropList from '../../PopUpInformation/PopUpDropList';
import PopUpDatePicker from '../../PopUpInformation/PopUpDatePicker';
import PopUpTextEditor from '../../PopUpIcon/PopUpTextEditor';
import PopUpCheckbox from '../../PopUpInformation/PopUpCheckbox';

const PopUpAssessmentCreate = (props) => {
  const { headerOne } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const [errorMsg, setErrorMsg] = useState('');
  const {
    selectedAssociateInfo,
    coreTypeReviewListData,
    coreGroupReviewListData,
    coreNodeReviewListData
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationBasic, informationAllocation, informationFramework } = useSelector(
    (state) => state.AssessmentReducer
  );
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
    dispatch({ type: CLEAR_ASSESSMENT_INFO });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    // add default root node in allocation if node not selected
    if (informationAllocation.assessmentNode.assessmentNodePrimary.length === 0) {
      let rootNode = coreNodeReviewListData.filter((node) => {
        return node.informationFramework.associateNodeAscendantPrimary === null;
      });
      let rootNodeId = rootNode[0].id;
      informationAllocation.assessmentNode.assessmentNodePrimary = [
        ...informationAllocation.assessmentNode.assessmentNodePrimary,
        rootNodeId
      ];
    }
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assessment: {
        informationBasic: informationBasic,
        informationAllocation: informationAllocation,
        informationFramework: informationFramework
      }
    };

    console.log('CREATE assessment api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSESSMENT_SAGA, payload: reqBody });
  };
  const updateAllocationObj = (e, stateName, actualStateName) => {
    let id = e.currentTarget.getAttribute('tag');
    let arr = informationAllocation[stateName][actualStateName];
    if (arr.includes(id)) {
      document.getElementById(id).style.backgroundColor = 'white';
      arr = arr.filter(function (number) {
        return number !== id;
      });
    } else {
      arr.push(id);
      document.getElementById(id).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
      payload: {
        stateName: stateName,
        actualStateName: actualStateName,
        value: arr
      }
    });
  };
  console.log('ASSESSMENT=====>', informationBasic, informationAllocation, informationFramework);
  let selectedPrimaryGroup = informationAllocation?.assessmentGroup.assessmentGroupPrimary || [];
  let selectedSecondaryGroup =
    informationAllocation?.assessmentGroup.assessmentGroupSecondary || [];
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

  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'assessmentName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={informationBasic}
        typeOfSetObject={SET_ASSESSMENT_BASIC_REDUCER_STATE}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'assessmentDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        basicInfo={informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_ASSESSMENT_BASIC_REDUCER_STATE}
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
        textOne={'assessmentGroupName'}
        textTwo={'assessmentGroupDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assessmentGroup', 'assessmentGroupPrimary');
        }}
        selectedList={informationAllocation.assessmentGroup.assessmentGroupPrimary}
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
        textOne={'assessmentGroupName'}
        textTwo={'assessmentGroupDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assessmentGroup', 'assessmentGroupSecondary');
        }}
        selectedList={informationAllocation.assessmentGroup.assessmentGroupSecondary}
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
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assessmentNode', 'assessmentNodePrimary');
        }}
        selectedList={informationAllocation.assessmentNode.assessmentNodePrimary}
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
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assessmentNode', 'assessmentNodeSecondary');
        }}
        selectedList={informationAllocation.assessmentNode.assessmentNodeSecondary}
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
        textOne={'assessmentTypeName'}
        isRequired={true}
        minimumSelected={1}
        setErrorMsg={setErrorMsg}
        errorMsg={errorMsg}
        textTwo={'assessmentTypeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assessmentType', 'assessmentTypePrimary');
        }}
        selectedList={informationAllocation.assessmentType.assessmentTypePrimary}
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
        textOne={'assessmentTypeName'}
        textTwo={'assessmentTypeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'assessmentType', 'assessmentTypeSecondary');
        }}
        selectedList={informationAllocation.assessmentType.assessmentTypeSecondary}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TIMEASSESSMENTPOPUP'}
        label={'time'}
        type={'number'}
        actualLableValue={'assessmentTime'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        basicInfo={informationFramework}
        nextPopUpValue={''}
        typeOfSetObject={SET_ASSESSMENT_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'SCOREMINIMUMPOPUP'}
        label={'score'}
        labelBadgeOne={'minimum'}
        type={'number'}
        actualLableValue={'assessmentScoreMinimum'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        basicInfo={informationFramework.assessmentScore}
        nextPopUpValue={''}
        typeOfSetObject={SET_ASSESSMENT_SCORE_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'SCOREMAXIMUMPOPUP'}
        label={'score'}
        labelBadgeOne={'maximum'}
        type={'number'}
        actualLableValue={'assessmentScoreMaximum'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        basicInfo={informationFramework.assessmentScore}
        nextPopUpValue={''}
        typeOfSetObject={SET_ASSESSMENT_SCORE_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextEditor
        isActive={isPopUpValue === 'ASSESSMENT_COMMUNIQUE_PRIMARY_TEXTSHEET_POPUP'}
        headerOne={'assessment'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'communique'}
        headerOneBadgeTwo={'primary'}
        basicInfo={informationFramework.assessmentCommunique}
        typeOfSetObject={SET_ASSESSMENT_COMMUNIQUE_FRAMEWORK_STATE}
        defaultSheetValue={
          informationFramework?.assessmentCommunique?.assessmentCommuniquePrimary || ''
        }
        actualLableValue={'assessmentCommuniquePrimary'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextEditor
        isActive={isPopUpValue === 'ASSESSMENT_MANUSCRIPT_PRIMARY_TEXTSHEET_POPUP'}
        headerOne={'assessment'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'manuscript'}
        headerOneBadgeTwo={'primary'}
        basicInfo={informationFramework?.assessmentManuscript}
        typeOfSetObject={SET_ASSESSMENT_MANUSCRIPT_FRAMEWORK_STATE}
        defaultSheetValue={
          informationFramework?.assessmentManuscript?.assessmentManuscriptPrimary || ''
        }
        actualLableValue={'assessmentManuscriptPrimary'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextEditor
        isActive={isPopUpValue === 'ASSESSMENT_MANUSCRIPT_SECONDARY_TEXTSHEET_POPUP'}
        headerOne={'assessment'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'manuscript'}
        headerOneBadgeTwo={'secondary'}
        basicInfo={informationFramework?.assessmentManuscript}
        typeOfSetObject={SET_ASSESSMENT_MANUSCRIPT_FRAMEWORK_STATE}
        defaultSheetValue={
          informationFramework?.assessmentManuscript?.assessmentManuscriptSecondary || ''
        }
        actualLableValue={'assessmentManuscriptSecondary'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TIMELINESTARTPOPUP'}
        label={'timeline'}
        labelBadgeOne={'start'}
        actualLableValue={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={informationFramework?.assessmentTimelineStart || 'mm/dd/yyyy --:-- --'}
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'TIMELINEENDPOPUP'}
        label={'timeline'}
        labelBadgeOne={'end'}
        actualLableValue={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={informationFramework?.assessmentTimelineEnd || 'mm/dd/yyyy --:-- --'}
        nextPopUpValue={''}
        isNotRevised={true}
        typeOfSetObject={''}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextEditor
        isActive={isPopUpValue === 'ASSESSMENT_COMMUNIQUE_SECONDARY_TEXTSHEET_POPUP'}
        headerOne={'assessment'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'communiqué'}
        headerOneBadgeTwo={'secondary'}
        basicInfo={informationFramework.assessmentCommunique}
        typeOfSetObject={SET_ASSESSMENT_COMMUNIQUE_FRAMEWORK_STATE}
        defaultSheetValue={
          informationFramework?.assessmentCommunique?.assessmentCommuniqueSecondary || ''
        }
        actualLableValue={'assessmentCommuniqueSecondary'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ASSOCIATECREATEFEEPOPUP'}
        label={'fee'}
        headerPanelColour={'genericOne'}
        inputHeader={'assessment'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'create'}
        type={'number'}
        headerOne={'assessment'}
        headerOneBadgeOne={'setup'}
        isRequired={false}
        actualLableValue={'assesseeCreateFee'}
        basicInfo={{}}
        typeOfSetObject={UPDATE_ASSOCIATE_BASIC_INFO}
        nextPopUpValue={'ASSOCIATEPICTUREPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ASSESSMENTINFODISTINCTBASICPOPUP'}
        tag={'assesseeCreateApproval'}
        label={'information'}
        labelBadgeOne={'basic'}
        listSelect={[
          { id: 'a', name: 'Unique Name & Description Not Rquired' },
          { id: 'b', name: 'Unique Name + Description Required' },
          { id: 'c', name: 'Unique Name Required' }
        ]}
        mappingValue={'id'}
        inputHeader={'assessments'}
        inputHeaderBadgeOne={'distinct'}
        inputHeaderBadgeTwo={'information'}
        labelval={'time'}
        headerPanelColour={'genericOne'}
        headerOne={'assessment'}
        headerOneBadgeOne={'setup'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={{}}
        typeOfSetObject={UPDATE_ASSOCIATE_SETUP_INFO}
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
      <PopUpCheckbox
        isActive={isPopUpValue === 'NAVIGATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        inputHeader={'navigation'}
        inputHeaderBadge={'item'}
        typeOfStateObj={null}
        objectName={'assesseeRole'}
        stateName={'assessmentNavigation'}
        valueArr={['first', 'last', 'next', 'previous', 'skip']}
        nextPopUpValue={''}
        isRolePermission
        typeOfSetObject={SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE}
        valueArrState={informationFramework?.assessmentNavigation}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'REVISIONPOPUP'}
        tag={''}
        label={'response'}
        listSelect={[
          { id: false, name: 'Enable' },
          { id: true, name: 'Disable' }
        ]}
        mappingValue={'id'}
        inputHeader={'revision'}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={null}
        // typeOfSetObject={SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'AID_CAL_POPUP'}
        tag={'assessmentAidCalculatorPermission'}
        label={'calculator'}
        listSelect={[
          { id: true, name: 'Permitted' },
          { id: false, name: 'Unpermitted' }
        ]}
        mappingValue={'id'}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'AID_SHEET_POPUP'}
        tag={'assessmentAidSpreadsheetPermission'}
        label={'spredsheet'}
        listSelect={[
          { id: true, name: 'Permitted' },
          { id: false, name: 'Unpermitted' }
        ]}
        mappingValue={'id'}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'AID_TEXT_POPUP'}
        tag={'assessmentAidTextsheetPermission'}
        label={'textsheet'}
        listSelect={[
          { id: true, name: 'Permitted' },
          { id: false, name: 'Unpermitted' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'AID_CALCULATOR_TYPE_POPUP'}
        tag={'assessmentAidCalculatorType'}
        label={'type'}
        listSelect={[
          { id: 'basic', name: 'basic' },
          { id: 'business', name: 'business' },
          { id: 'financial', name: 'financial' },
          { id: 'scientific', name: 'scientific' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'AID_SPREADSHEET_TYPE_POPUP'}
        tag={'assessmentAidSpreadsheetType'}
        label={'type'}
        listSelect={[
          { id: 'goole', name: 'goole' },
          { id: 'microsoft', name: 'microsoft' },
          { id: 'spreadsheet', name: 'spreadsheet' }          
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
       <PopUpDropList
        isActive={isPopUpValue === 'AID_TEXTSHEET_TYPE_POPUP'}
        tag={'assessmentAidTextsheetType'}
        label={'type'}
        listSelect={[
          { id: 'goole', name: 'goole' },
          { id: 'microsoft', name: 'microsoft' },
          { id: 'textsheet', name: 'textsheet' }          
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={informationFramework?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
       <PopUpCheckbox
        isActive={isPopUpValue === 'EVALUATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        valueArr={[
          'assessmentEvaluationScoreCutoff',    
          'assessmentEvaluationScoreGeneric',
          'assessmentEvaluationScoreGrade',
          'assessmentEvaluationScorePercentage',
          'assessmentEvaluationScorePercentile',
          'assessmentEvaluationScoreRank',
          'assessmentEvaluationScoreRaw',
          'assessmentEvaluationScoreStandard',
          'assessmentEvaluationScoreSten',
          'assessmentEvaluationScoreT',
          'assessmentEvaluationScoreZ'
        ]}
        //forceToSelect="signIn"
        typeOfSetObject={SET_ASSESSMENT_EVALUATION_FRAMEWORK_STATE}
        valueArrState={informationFramework?.assessmentEvaluation}
        isRolePermission
        forceToSelect="assessmentRevise"
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
    </div>
  );
};

export default PopUpAssessmentCreate;
