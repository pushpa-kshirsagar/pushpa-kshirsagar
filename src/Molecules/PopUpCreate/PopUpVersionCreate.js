import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import {
  POPUP_CLOSE,
  LOADER_START,
  SET_DISPLAY_THREE_SINGLE_STATE,
  CLEAR_VERSION_REDUCER_STATE,
  SET_VERSION_REDUCER_STATE,
  CREATE_ASSESSMENT_SECTION_SAGA
} from '../../actionType';

const PopUpVersionCreate = (props) => {
  const { headerOne } = props;
  const { isPopUpValue, selectedTagValue } = useSelector((state) => state.PopUpReducer);
  const { versionInformation } = useSelector((state) => state.VersionCreateReducer);
  console.log(versionInformation);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);

  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
    dispatch({ type: CLEAR_VERSION_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    dispatch({ type: POPUP_CLOSE });
    let requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assessmentId: selectedTagValue,
      assessmentVersion: versionInformation
    };
    console.log('requestObj', requestObj);
    dispatch({ type: POPUP_CLOSE });
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSESSMENT_SECTION_SAGA, payload: requestObj });
  };
  console.log('versionInformation', versionInformation);

  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'assessmentVersionName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={versionInformation}
        typeOfSetObject={SET_VERSION_REDUCER_STATE}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'assessmentVersionDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        basicInfo={versionInformation}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        typeOfSetObject={SET_VERSION_REDUCER_STATE}
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

export default PopUpVersionCreate;
