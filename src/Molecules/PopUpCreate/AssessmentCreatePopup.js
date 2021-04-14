import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  POPUP_CLOSE,
  SET_ASSESSMENT_BASIC_REDUCER_STATE,
  CLEAR_ASSESSMENT_REDUCER_STATE,
  CREATE_ASSESSMENT_SAGA
} from '../../actionType';

const AssessmentCreatePopup = (props) => {
  const { headerOne } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { informationBasic, informationAllocation } = useSelector(
    (state) => state.AssessmentCreateReducer
  );
  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_ASSESSMENT_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let reqBody = {
      assesseeId: '0123456',
      associateId: '0654321',
      assessment: {
        informationBasic: informationBasic,
        informationAllocation: informationAllocation
      }
    };

    console.log('CREATE assessment api', reqBody);
    // dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSESSMENT_SAGA, payload: reqBody });
  };

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

export default AssessmentCreatePopup;
