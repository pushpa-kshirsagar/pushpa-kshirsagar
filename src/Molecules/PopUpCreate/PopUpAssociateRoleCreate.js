import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import {
  CLEAR_ROLE_REDUCER_STATE,
  POPUP_CLOSE,
  CREATE_ASSOCIATE_ROLE_SAGA,
  SET_ASSOCIATE_ROLE_REDUCER_STATE,
  LOADER_START,
  SET_ROLE_DYNAMIC_STATE,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_SETUP_PERMISSION,
  SET_ASSOCIATE_ROLE_CLASSIFICAION_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';
import PopUpCheckbox from '../../PopUpInformation/PopUpCheckbox';
import PopUpDropList from '../../PopUpInformation/PopUpDropList';

const PopUpAssociateRoleCreate = () => {
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { associateRole } = useSelector((state) => state.RoleCreateReducer);
  const {
    selectedAssociateInfo,
    coreRoleReviewListData,
    permissionStateOne,
    permissionStateTwo,
    permissionStateThree
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const [roleSelectedError, setRoleSelectedError] = useState('');

  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
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
  console.log('ROLE ASOCIATE POPUP>>>>>>>>>.', associateRole);

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
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      {/* <PopUpReviewList
        isActive={isPopUpValue === 'ROLEGROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associates'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={''}
        isRequired={true}
        minimumSelected={1}
        selectedList={associateRole?.informationAllocation?.associateRoleGroup}
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        infoMsg={'select a group'}
        ListData={coreRoleReviewListData}
        textOne={'associateRoleGroupName'}
        textTwo={'associateRoleGroupDescription'}
        onClickEvent={updateRoleGroup}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      /> */}
      <PopUpDropList
        isActive={isPopUpValue === 'ROLEGROUPPOPUP'}
        tag={'assesseeRoleClassificationPrimary'}
        label={'classification'}
        listSelect={[
          { id: 'Bespoke', name: 'Bespoke' },
          { id: 'Generic', name: 'Generic' }
        ]}
        mappingValue={'id'}
        inputHeader={''}
        inputHeaderBadgeOne={''}
        inputHeaderBadgeTwo={''}
        labelval={''}
        headerPanelColour={'genericOne'}
        headerOne={'associates'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        isRequired={true}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        basicInfo={associateRole?.informationSetup?.associateRoleClassificationPrimary}
        typeOfSetObject={SET_ASSOCIATE_ROLE_CLASSIFICAION_STATE}
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
        headerOne={'associates'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
      <PopUpCheckbox
        isActive={isPopUpValue === 'PERMISSIONPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'associate'}
        headerOneBadgeOne={'role'}
        headerOneBadgeTwo={'information'}
        inputHeader={permissionStateOne}
        inputHeaderBadge={permissionStateTwo}
        typeOfStateObj={permissionStateThree}
        objectName={'associateRole'}
        stateName={'associateRolePermission'}
        informationArr={
          permissionStateTwo === 'distinct'
            ? [
                { id: 'all', name: 'all' },
                { id: 'key', name: 'key' }
              ]
            : [{ id: 'key', name: 'key' }]
        }
        informationValue={''}
        isRolePermission
        valueArr={['create', 'delete', 'review', 'revise', 'share']}
        valueArrState={
          associateRole?.informationSetup?.associateRolePermission
            ? associateRole?.informationSetup?.associateRolePermission[permissionStateThree]
            : ''
        }
        nextPopUpValue={''}
        typeOfSetObject={SET_SETUP_PERMISSION}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
    </div>
  );
};

export default PopUpAssociateRoleCreate;
