import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  CLEAR_ROLE_REDUCER_STATE,
  POPUP_CLOSE,
  CREATE_ASSESSEE_ROLE_SAGA,
  SET_ASSESSEE_ROLE_REDUCER_STATE,
  LOADER_START,
  SET_ROLE_DYNAMIC_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';

const AssesseeRoleCreatePopUp = () => {
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { assesseeRole } = useSelector((state) => state.RoleCreateReducer);
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
        assesseeRoleGroup: assesseeRole.informationAllocation.assesseeRoleGroup[0]
    };
    var requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assesseeRole: {
        informationBasic: assesseeRole.informationBasic,
        informationAllocation: allocationObj
      }
    };

    console.log('CREATE Role api', requestObj);
    // dispatch({ type: LOADER_START });
    // dispatch({ type: CREATE_ASSESSEE_ROLE_SAGA, payload: requestObj });
  };
  console.log('ROLE ASSESSEE POPUP>>>>>>>>>.', assesseeRole);
  const updateRoleGroup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    setRoleSelectedError('');
    let tagId = e.currentTarget.getAttribute('tag');
    let tagIdArr = assesseeRole.informationAllocation.assesseeRoleGroup;
    if (tagIdArr.includes(tagId)) {
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
        objectName: 'assesseeRole',
        stateName: 'informationAllocation',
        actualStateName: 'assesseeRoleGroup',
        value: tagIdArr
      }
    });
  };
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'assesseeRoleName'}
        headerPanelColour={'genericOne'}
        headerOne={'assessee'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={assesseeRole.informationBasic}
        typeOfSetObject={SET_ASSESSEE_ROLE_REDUCER_STATE}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'assesseeRoleDescription'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        basicInfo={assesseeRole.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_ASSESSEE_ROLE_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ROLEGROUPPOPUP'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ROLEGROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={''}
        isRequired={true}
        selectedList={assesseeRole?.informationAllocation?.assesseeRoleGroup}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        infoMsg={'select a group'}
        ListData={coreRoleReviewListData}
        textOne={'assesseeRoleGroupName'}
        textTwo={'assesseeRoleGroupDescription'}
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
        headerOne={'assessees'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
    </div>
  );
};

export default AssesseeRoleCreatePopUp;
