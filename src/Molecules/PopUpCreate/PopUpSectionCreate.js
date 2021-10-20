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
  SET_ASSESSMENT_SECTION_SCORE_FRAMEWORK_STATE
} from '../../actionType';

const PopUpSectionCreate = (props) => {
  const { headerOne } = props;
  const { isPopUpValue, selectedTagValue } = useSelector((state) => state.PopUpReducer);
  const { sectionInformation } = useSelector((state) => state.SectionCreateReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);

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
          { id: true, name: 'Permitted' },
          { id: false, name: 'Unpermitted' }
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

      {/* <PopUpTextField
        isActive={isPopUpValue === 'SCOREMINIMUMPOPUP'}
        label={'score'}
        labelBadgeOne={'minimum'}
        type={'number'}
        actualLableValue={'assessmentSectionScoreExtremumMinimum'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
        basicInfo={sectionInformation?.assessmentSectionScoreExtremumMinimum}        
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
        basicInfo={sectionInformation?.assessmentSectionScoreExtremumMaximum}
        nextPopUpValue={''}
        typeOfSetObject={SET_ASSESSMENT_SECTION_SCORE_FRAMEWORK_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      /> */}
    </div>
  );
};

export default PopUpSectionCreate;
