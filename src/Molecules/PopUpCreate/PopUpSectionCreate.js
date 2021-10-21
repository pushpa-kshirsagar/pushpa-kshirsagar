import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import PopUpDropList from '../../PopUpInformation/PopUpDropList'; //'../../PopUpInformation/PopUpDropList';
import {
  POPUP_CLOSE,
  LOADER_START,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_SECTION_REDUCER_STATE,
  CLEAR_CLUSTER_REDUCER_STATE,
  CREATE_ASSESSMENT_SECTION_SAGA,
  SET_ASSESSMENT_SECTION_AID_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_SCORE_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_RESPONCE_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_COMMUNIQUE_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_MANUSCRIPT_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_SYNOPSIS_FRAMEWORK_STATE
  
} from '../../actionType';
import PopUpTextEditor from '../../PopUpIcon/PopUpTextEditor';

const PopUpSectionCreate = (props) => {
  const { headerOne } = props;
  const { isPopUpValue, selectedTagValue } = useSelector((state) => state.PopUpReducer);
  const { sectionInformation } = useSelector((state) => state.SectionCreateReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { indexPointer } = useSelector((state) => state.DisplayPaneTwoReducer);

  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
    dispatch({ type: CLEAR_CLUSTER_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assessmentId: selectedTagValue,
      assessmentSection: sectionInformation
    };
    console.log('requestObj', requestObj);
    dispatch({ type: POPUP_CLOSE });
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSESSMENT_SECTION_SAGA, payload: requestObj });
  };
  console.log('sectionInformation', sectionInformation);
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'assessmentSectionName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={sectionInformation}
        typeOfSetObject={SET_SECTION_REDUCER_STATE}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'assessmentSectionDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        basicInfo={sectionInformation}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={SET_SECTION_REDUCER_STATE}
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
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'AID_CAL_POPUP'}
        tag={'assessmentSectionAidCalculatorPermission'}
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
        basicInfo={sectionInformation?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_SECTION_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'AID_SHEET_POPUP'}
        tag={'assessmentSectionAidSpreadsheetPermission'}
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
        basicInfo={sectionInformation?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_SECTION_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'AID_TEXT_POPUP'}
        tag={'assessmentSectionAidTextsheetPermission'}
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
        basicInfo={sectionInformation?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_SECTION_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'AID_CALCULATOR_TYPE_POPUP'}
        tag={'assessmentSectionAidCalculatorType'}
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
        basicInfo={sectionInformation?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_SECTION_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpDropList
        isActive={isPopUpValue === 'AID_SPREADSHEET_TYPE_POPUP'}
        tag={'assessmentSectionAidSpreadsheetType'}
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
        basicInfo={sectionInformation?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_SECTION_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'AID_TEXTSHEET_TYPE_POPUP'}
        tag={'assessmentSectionAidTextsheetType'}
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
        basicInfo={sectionInformation?.assessmentAid}
        typeOfSetObject={SET_ASSESSMENT_SECTION_AID_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'EVALUATION_POPUP'}
        tag={'assessmentSectionEvaluation'}
        label={'evaluation'}
        listSelect={[
          { id: false, name: 'No' },
          { id: true, name: 'Yes' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={sectionInformation}
        typeOfSetObject={SET_SECTION_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'SECTION_RESET_POPUP'}
        tag={'assessmentSectionAdministrationRepeat'}
        label={'reset'}
        listSelect={[
          { id: true, name: 'Yes' },
          { id: false, name: 'No' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={sectionInformation}
        typeOfSetObject={SET_SECTION_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'SECTION_REPEAT_POPUP'}
        tag={'assessmentSectionAdministrationRepeat'}
        label={'repeat'}
        listSelect={[
          { id: true, name: 'Yes' },
          { id: false, name: 'No' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={sectionInformation}
        typeOfSetObject={SET_SECTION_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'SECTION_SHUFFLE_POPUP'}
        tag={'assessmentSectionAdministrationShuffle'}
        label={'shuffle'}
        listSelect={[
          { id: true, name: 'Yes' },
          { id: false, name: 'No' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={sectionInformation}
        typeOfSetObject={SET_SECTION_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpTextField
        isActive={isPopUpValue === 'SCOREMINIMUMPOPUP'}
        label={'score'}
        labelBadgeOne={'minimum'}
        type={'number'}
        actualLableValue={'assessmentSectionScoreExtremumMinimum'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        basicInfo={sectionInformation?.assessmentSectionScoreExtremum}
        nextPopUpValue={''}
        typeOfSetObject={SET_ASSESSMENT_SECTION_SCORE_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'SCOREMAXIMUMPOPUP'}
        label={'score'}
        labelBadgeOne={'maximum'}
        type={'number'}
        actualLableValue={'assessmentSectionScoreExtremumMaximum'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        basicInfo={sectionInformation?.assessmentSectionScoreExtremum}
        nextPopUpValue={''}
        typeOfSetObject={SET_ASSESSMENT_SECTION_SCORE_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpTextField
        isActive={isPopUpValue === 'RESPONCE_EXTREEMINIMUMPOPUP'}
        label={'responce'}
        labelBadgeOne={'minimum'}
        type={'number'}
        actualLableValue={'assessmentSectionResponseExtremumMinimum'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        basicInfo={sectionInformation?.assessmentSectionResponseExtremum}
        nextPopUpValue={''}
        typeOfSetObject={SET_ASSESSMENT_SECTION_RESPONCE_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpTextField
        isActive={isPopUpValue === 'RESPONCE_EXTREEMAXIMUMPOPUP'}
        label={'responce'}
        labelBadgeOne={'maximum'}
        type={'number'}
        actualLableValue={'assessmentSectionResponseExtremumMaximum'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        basicInfo={sectionInformation?.assessmentSectionResponseExtremum}
        nextPopUpValue={''}
        typeOfSetObject={SET_ASSESSMENT_SECTION_RESPONCE_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpTextField
        isActive={isPopUpValue === 'RESPONSELABEL'}
        label={'response'}
        labelBadgeOne={'label'}
        actualLableValue={'assessmentSectionItemFrameworkOneResponseLabel'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        basicInfo={sectionInformation}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={SET_SECTION_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'RESPONSE_REVISE_POPUP'}
        tag={'assessmentSectionItemFrameworkOneResponseRevise'}
        label={'response'}
        labelBadgeOne={'revise'}
        listSelect={[
          { id: true, name: 'Yes' },
          { id: false, name: 'No' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={true}
        nextPopUpValue={''}
        basicInfo={sectionInformation}
        typeOfSetObject={SET_SECTION_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpTextField
        isActive={isPopUpValue === 'SEQUENCE_POPUP'}
        label={'sequence'}
        actualLableValue={'assessmentSectionSequence'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        basicInfo={sectionInformation}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={SET_SECTION_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpTextEditor
        isActive={isPopUpValue === 'ASSESSMENT_COMMUNIQUE_PRIMARY_TEXTSHEET_POPUP'}
        headerOne={'section'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'communique'}
        headerOneBadgeTwo={indexPointer}
        defaultSheetValue={sectionInformation.assessmentSectionCommunique[indexPointer - 1]}
        onClickSave={(data) => {
          dispatch({ type: SET_ASSESSMENT_SECTION_COMMUNIQUE_FRAMEWORK_STATE, payload: data });
        }}
        actualLableValue={indexPointer - 1}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpTextEditor
        isActive={isPopUpValue === 'ASSESSMENT_MANUSCRIPT_PRIMARY_TEXTSHEET_POPUP'}
        headerOne={'section'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'manuscript'}
        headerOneBadgeTwo={indexPointer}
        defaultSheetValue={sectionInformation?.assessmentSectionManuscript[indexPointer - 1] || ''}
        actualLableValue={indexPointer - 1}
        onClickSave={(data) => {
          dispatch({ type: SET_ASSESSMENT_SECTION_MANUSCRIPT_FRAMEWORK_STATE, payload: data });
        }}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />

      <PopUpTextEditor
        isActive={isPopUpValue === 'ASSESSMENT_SYNOPSIS_TEXTSHEET_POPUP'}
        headerOne={'section'}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'synopsis'}
        headerOneBadgeTwo={indexPointer}
        defaultSheetValue={sectionInformation?.assessmentSectionSynopsis[indexPointer - 1] || ''}
        actualLableValue={indexPointer - 1}
        onClickSave={(data) => {
          dispatch({ type: SET_ASSESSMENT_SECTION_SYNOPSIS_FRAMEWORK_STATE, payload: data });
        }}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
    </div>
  );
};

export default PopUpSectionCreate;
