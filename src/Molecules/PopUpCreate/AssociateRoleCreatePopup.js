import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  CLEAR_ROLE_REDUCER_STATE,
  POPUP_CLOSE,
  CREATE_ASSOCIATE_ROLE_SAGA,
  SET_ASSOCIATE_ROLE_REDUCER_STATE,
  LOADER_START
} from '../../actionType';

const AssociateRoleCreatePopup = () => {
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { associateRole } = useSelector((state) => state.RoleCreateReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_ROLE_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    var requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      associateRole: { informationBasic: associateRole.informationBasic }
    };

    console.log('CREATE Role api', requestObj);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSOCIATE_ROLE_SAGA, payload: requestObj });
  };

  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'associateRoleName'}
        headerPanelColour={'genericOne'}
        headerOne={'associates'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={associateRole.informationBasic}
        typeOfSetObject={SET_ASSOCIATE_ROLE_REDUCER_STATE}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'associateRoleDescription'}
        headerPanelColour={'genericOne'}
        headerOne={'associates'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        basicInfo={associateRole.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_ASSOCIATE_ROLE_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associates'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
      />

      <PopUpConfirmation
        isActive={isPopUpValue === 'CANCELPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'cancel'}
        headerOneBadgeOne={''}
        mode={'cancel'}
        onClickYes={onClickCancelYes}
      />
      <PopUpConfirmation
        isActive={isPopUpValue === 'CONFIRMATIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associates'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
    </div>
  );
};

export default AssociateRoleCreatePopup;
