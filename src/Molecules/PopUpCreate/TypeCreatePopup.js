import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  POPUP_CLOSE,
  CREATE_TYPE_SAGA,
  LOADER_START,
  CLEAR_TYPE_REDUCER_STATE,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_TYPE_GROUP_ALLOCATION
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';

const TypeCreatePopup = (props) => {
  const {
    headerOne,
    reducerObeject,
    typeDescription,
    typeName,
    setReducerObject,
    objectName,
    allocationObj,
    groupName,
    groupDescription
  } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  // const { typeInformation } = useSelector((state) => state.TypeCreateReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo, coreGroupReviewListData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const dispatch = useDispatch();
  const [requiredErrorMsg, setRequiredErrorMsg] = useState('');

  const onClickCancelYes = () => {
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      whichTypeCreate: headerOne,
      [objectName]: reducerObeject
    };
    console.log('CREATE type api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_TYPE_SAGA, payload: reqBody });
  };
  const updateGroup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    setRequiredErrorMsg('');
    let tagId = e.currentTarget.getAttribute('tag');
    let tagIdArr = reducerObeject?.informationAllocation[allocationObj];
    dispatch({
      type: SET_TYPE_GROUP_ALLOCATION,
      payload: {
        objectName: objectName,
        stateName: allocationObj,
        value: tagId
      }
    });
  };
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={typeName}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'type'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={reducerObeject.informationBasic}
        typeOfSetObject={setReducerObject}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={typeDescription}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'type'}
        headerOneBadgeTwo={'information'}
        basicInfo={reducerObeject.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={setReducerObject}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'type'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'GROUPPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'type'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'group'}
        isRequired={headerOne === 'assessees' || headerOne === 'associates' ? true : false}
        inputHeaderBadge={''}
        infoMsg={'select a group'}
        ListData={
          ((headerOne === 'assessees' || headerOne === 'associates') &&
            coreGroupReviewListData) || [
            { id: '01', informationBasic: { name: 'Simple Sample 01', description: '' } },
            { id: '02', informationBasic: { name: 'Simple Sample 02', description: '' } },
            { id: '03', informationBasic: { name: 'Simple Sample 03', description: '' } }
          ]
        }
        selectedList={
          reducerObeject?.informationAllocation[allocationObj] === ''
            ? []
            : [reducerObeject?.informationAllocation[allocationObj]]
        }
        textOne={headerOne === 'assessees' || headerOne === 'associates' ? groupName : 'name'}
        textTwo={
          headerOne === 'assessees' || headerOne === 'associates' ? groupDescription : 'description'
        }
        onClickEvent={updateGroup}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
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
