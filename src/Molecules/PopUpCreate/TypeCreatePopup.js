import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  POPUP_CLOSE,
  CREATE_TYPE_SAGA,
  SET_TYPE_REDUCER_STATE,
  LOADER_START,
  CLEAR_TYPE_REDUCER_STATE
} from '../../actionType';

const TypeCreatePopup = (props) => {
  const { headerOne } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { typeInformation } = useSelector((state) => state.TypeCreateReducer);
  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let reqBody = {
      assesseeId: '0123456',
      associateId: '0654321'
    };
    if (headerOne === 'assessments') {
      reqBody = {
        assesseeId: '0123456',
        associateId: '0654321',
        whichTypeCreate: 'assessments',
        assessmentType: {
          informationBasic: {
            assessmentTypeName: typeInformation.informationBasic.typeName,
            assessmentTypeNameVerification: false,
            assessmentTypeDescription: typeInformation.informationBasic.typeDescription,
            assessmentTypePicture: '',
            assessmentTypePictureVerification: false
          }
        }
      };
    }
    if (headerOne === 'assignments') {
      reqBody = {
        assesseeId: '0123456',
        associateId: '0654321',
        whichTypeCreate: 'assignments',
        assignmentType: {
          informationBasic: {
            assignmentTypeName: typeInformation.informationBasic.typeName,
            assignmentTypeNameVerification: false,
            assignmentTypeDescription: typeInformation.informationBasic.typeDescription,
            assignmentTypePicture: '',
            assignmentTypePictureVerification: false
          }
        }
      };
    }
    //console.log('CREATE group api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_TYPE_SAGA, payload: reqBody });
  };

  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'typeName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'type'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={typeInformation.informationBasic}
        typeOfSetObject={SET_TYPE_REDUCER_STATE}
        isRequired={true}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'typeDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'type'}
        headerOneBadgeTwo={'information'}
        basicInfo={typeInformation.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_TYPE_REDUCER_STATE}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'type'}
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
        headerOne={headerOne}
        headerOneBadgeOne={'type'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
    </div>
  );
};

export default TypeCreatePopup;
