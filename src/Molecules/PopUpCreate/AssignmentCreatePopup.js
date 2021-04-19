import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  POPUP_CLOSE,
  SET_ASSIGNMENT_BASIC_REDUCER_STATE,
  CLEAR_ASSIGNMENT_INFO,
  CREATE_ASSIGNMENT_SAGA,
  LOADER_START
} from '../../actionType';

const AssignmentCreatePopup = (props) => {
  const { headerOne } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { informationBasic, informationAllocation } = useSelector(
    (state) => state.AssignmentReducer
  );
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_ASSIGNMENT_INFO });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assignment: {
        informationBasic: informationBasic,
        informationAllocation: informationAllocation
      }
    };

    console.log('CREATE assignment api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSIGNMENT_SAGA, payload: reqBody });
  };

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
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={''}
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
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
    </div>
  );
};

export default AssignmentCreatePopup;
