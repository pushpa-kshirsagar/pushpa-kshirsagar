import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  CLEAR_ROLE_REDUCER_STATE,
  POPUP_CLOSE,
  CREATE_ASSOCIATE_ROLE_SAGA,
  SET_ASSOCIATE_ROLE_REDUCER_STATE,
  LOADER_START,
  SET_ROLE_DYNAMIC_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';

const AssociateRoleCreatePopup = () => {
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { associateRole } = useSelector((state) => state.RoleCreateReducer);
  const { selectedAssociateInfo, coreRoleReviewListData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const [roleSelectedError, setRoleSelectedError] = useState('');

  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_ROLE_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let allocationObj = {
      associateRoleGroup: associateRole.informationAllocation.associateRoleGroup[0]
    };
    var requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      associateRole: {
        informationBasic: associateRole.informationBasic,
        informationAllocation: allocationObj
      }
    };

    console.log('CREATE Role api', requestObj);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ASSOCIATE_ROLE_SAGA, payload: requestObj });
  };
  const updateRoleGroup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    let tagId = e.currentTarget.getAttribute('tag');
    setRoleSelectedError('');
    let tagIdArr = associateRole.informationAllocation.associateRoleGroup;
    if (tagIdArr.includes(tagId)) {
      setRoleSelectedError('');
      document.getElementById(tagId).style.backgroundColor = 'white';
      tagIdArr = tagIdArr.filter(function (number) {
        return number !== tagId;
      });
    } else {
      var arr = [];
      tagIdArr = [...arr];
      tagIdArr.push(tagId);
      document.getElementById(tagId).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_ROLE_DYNAMIC_STATE,
      payload: {
        objectName: 'associateRole',
        stateName: 'informationAllocation',
        actualStateName: 'associateRoleGroup',
        value: tagIdArr
      }
    });
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
        nextPopUpValue={'ROLEGROUPPOPUP'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ROLEGROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={''}
        isRequired={true}
        selectedList={associateRole?.informationAllocation?.associateRoleGroup}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        infoMsg={'select a group'}
        ListData={coreRoleReviewListData}
        textOne={'associateRoleGroupName'}
        textTwo={'associateRoleGroupDescription'}
        onClickEvent={updateRoleGroup}
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
        headerOne={'associates'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
    </div>
  );
};

export default AssociateRoleCreatePopup;
