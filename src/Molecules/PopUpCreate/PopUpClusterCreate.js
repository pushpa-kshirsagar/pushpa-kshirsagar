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
    CLEAR_CLUSTER_REDUCER_STATE
  } from '../../actionType';
    

const PopUpClusterCreate = (props) => {
    const { headerOne } = props;
    const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
    const { clusterInformation } = useSelector((state) => state.ClusterCreateReducer);
    console.log(clusterInformation);
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
    //   let reqBody = {
    //     assesseeId: selectedAssociateInfo?.assesseeId,
    //     associateId:
    //       selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    //     assessmentCluster: {
    //       informationBasic: clusterInformation.informationBasic,
    //       informationAllocation: clusterInformation.informationAllocation,
    //       informationFramework: clusterInformation.informationFramework,
    //       informationSetup: clusterInformation.informationSetup
    //     }
    //   };
    //   console.log('CREATE group api', reqBody);
    //   dispatch({ type: LOADER_START });
    //   dispatch({ type: CREATE_CLUSTER_SAGA, payload: reqBody });
    };
    return (
      <div>
        <PopUpTextField
          isActive={isPopUpValue === 'NAMEPOPUP'}
          label={'name'}
          actualLableValue={'assessmentClusterName'}
          headerPanelColour={'genericOne'}
          headerOne={headerOne}
          headerOneBadgeOne={''}
          headerOneBadgeTwo={'information'}
          nextPopUpValue={'ALIASPOPUP'}
          basicInfo={clusterInformation?.informationBasic}
          typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
          isRequired={true}
          mode={reviewMode === 'revise' ? 'revise' : 'core'}
        />
        <PopUpTextField
          isActive={isPopUpValue === 'ALIASPOPUP'}
          label={'description'}
          actualLableValue={'assessmentClusterDescription'}
          headerPanelColour={'genericOne'}
          headerOne={headerOne}
          headerOneBadgeOne={''}
          headerOneBadgeTwo={'information'}
          basicInfo={clusterInformation.informationBasic}
          nextPopUpValue={'PICTUREPOPUP'}
          typeOfSetObject={SET_CLUSTER_REDUCER_STATE}
          mode={reviewMode === 'revise' ? 'revise' : 'core'}
        />
        <PopUpPicture
          isActive={isPopUpValue === 'PICTUREPOPUP'}
          headerPanelColour={'genericOne'}
          headerOne={headerOne}
          headerOneBadgeOne={''}
          headerOneBadgeTwo={'information'}
          nextPopUpValue={'CONFIRMATIONPOPUP'}
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
  