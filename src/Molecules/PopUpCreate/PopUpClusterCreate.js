import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import {
  POPUP_CLOSE,
  LOADER_START,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_CLUSTER_REDUCER_STATE,
  CLEAR_CLUSTER_REDUCER_STATE,
  CREATE_ASSESSMENT_SECTION_SAGA
} from '../../actionType';
import PopUpTextEditor from '../../PopUpIcon/PopUpTextEditor';
import PopUpDropList from '../../PopUpInformation/PopUpDropList';

const PopUpClusterCreate = (props) => {
  const { headerOne } = props;
  const { isPopUpValue, selectedTagValue } = useSelector((state) => state.PopUpReducer);
  const { clusterInformation } = useSelector((state) => state.ClusterCreateReducer);
  const { reviewMode, responseObject, statusPopUpValue } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, coreNodeReviewListData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );

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
    dispatch({ type: POPUP_CLOSE });
    let requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assessmentId: selectedTagValue,
      assessmentCluster: clusterInformation
    };
    console.log('requestObj', requestObj);
    dispatch({ type: POPUP_CLOSE });
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSESSMENT_SECTION_SAGA, payload: requestObj });
  };
  console.log('clusterInformation', clusterInformation);

  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'assessmentClusterOneName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={clusterInformation}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'assessmentClusterOneDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        basicInfo={clusterInformation}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ONEONELABELPOPUP'}
        label={'label'}
        actualLableValue={'assessmentClusterOneOneLabel'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={clusterInformation}
        nextPopUpValue={''}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ONETWOLABELPOPUP'}
        label={'label'}
        actualLableValue={'assessmentClusterOneTwoLabel'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={clusterInformation}
        nextPopUpValue={''}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ONEONEDESCPOPUP'}
        label={'description'}
        actualLableValue={'assessmentClusterOneOneDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={clusterInformation}
        nextPopUpValue={''}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ONETWODESCPOPUP'}
        label={'description'}
        actualLableValue={'assessmentClusterOneTwoDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={clusterInformation}
        nextPopUpValue={''}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      {/* <PopUpTextEditor
        isActive={isPopUpValue === 'ONEONEEXPLANATION'}
        headerOne={headerOne}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'explanation'}
        headerOneBadgeTwo={'information'}
        basicInfo={clusterInformation}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        defaultSheetValue={clusterInformation.assessmentClusterOneOneExplanation}
        actualLableValue={'assessmentClusterOneOneExplanation'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      /> */}
       <PopUpTextField
        isActive={isPopUpValue === 'ONEONEEXPLANATION'}
        label={'explanation'}
        actualLableValue={'assessmentClusterOneOneExplanation'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={clusterInformation}
        nextPopUpValue={''}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ONETWOEXPLANATION'}
        label={'explanation'}
        actualLableValue={'assessmentClusterOneTwoExplanation'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        basicInfo={clusterInformation}
        nextPopUpValue={''}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      {/* <PopUpTextEditor
        isActive={isPopUpValue === 'ONETWOEXPLANATION'}
        headerOne={headerOne}
        headerPanelColour={'genericOne'}
        headerOneBadgeOne={'explanation'}
        headerOneBadgeTwo={'information'}
        basicInfo={clusterInformation}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        defaultSheetValue={clusterInformation.assessmentClusterOneTwoExplanation}
        actualLableValue={'assessmentClusterOneTwoExplanation'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      /> */}
      <PopUpDropList
        isActive={isPopUpValue === 'ONEONEPOLARITY'}
        tag={'assessmentClusterOneOnePolarity'}
        label={'polarity'}
        listSelect={[
          { id: 'Bespoke', name: 'Bespoke' },
          { id: 'Generic', name: 'Generic' }
        ]}
        mappingValue={'id'}
        labelval={''}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={false}
        nextPopUpValue={''}
        basicInfo={clusterInformation}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ONETWOPOLARITY'}
        tag={'assessmentClusterOneTwoPolarity'}
        label={'polarity'}
        listSelect={[
          { id: 'Bespoke', name: 'Bespoke' },
          { id: 'Generic', name: 'Generic' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={false}
        nextPopUpValue={''}
        basicInfo={clusterInformation}
        typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
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
    </div>
  );
};

export default PopUpClusterCreate;
