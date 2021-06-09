import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  POPUP_CLOSE,
  CREATE_ITEM_SAGA,
  LOADER_START,
  CLEAR_TYPE_REDUCER_STATE,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_TYPE_GROUP_ALLOCATION,
  SET_TYPE_REDUCER_STATE,
  SET_ITEM_DYNAMIC_SINGLE_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';

const ItemCreatePopUp = (props) => {
  const { headerOne = 'item' } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const {
    selectedAssociateInfo,
    coreGroupReviewListData,
    coreTypeReviewListData,
    coreNodeReviewListData
  } = useSelector((state) => state.DisplayPaneTwoReducer);
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
      item: itemInformation
    };
    console.log('CREATE item api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_ITEM_SAGA, payload: reqBody });
  };
  // const updateGroup = (e) => {
  //   console.log(e.currentTarget.getAttribute('tag'));
  //   setRequiredErrorMsg('');
  //   let tagId = e.currentTarget.getAttribute('tag');
  //   let tagIdArr = itemInformation?.informationAllocation.itemGroup.itemGroupPrimary;
  //   dispatch({
  //     type: SET_TYPE_GROUP_ALLOCATION,
  //     payload: {
  //       objectName: objectName,
  //       stateName: allocationObj,
  //       value: tagId
  //     }
  //   });
  // };
  const updateGroup = (e, stateName, actualStateName) => {
    let groupid = e.currentTarget.getAttribute('tag');
    let groupArr = itemInformation.informationAllocation[stateName][actualStateName];
    if (groupArr.includes(groupid)) {
      document.getElementById(groupid).style.backgroundColor = 'white';
      groupArr = groupArr.filter(function (number) {
        return number !== groupid;
      });
    } else {
      groupArr.push(groupid);
      document.getElementById(groupid).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_ITEM_DYNAMIC_SINGLE_STATE,
      payload: {
        objectName: 'informationAllocation',
        stateName: stateName,
        actualStateName: actualStateName,
        value: groupArr
      }
    });
  };
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'itemName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={itemInformation.informationBasic}
        typeOfSetObject={SET_TYPE_REDUCER_STATE}
        isRequired={true}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'itemDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        basicInfo={itemInformation.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_TYPE_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'GROUPPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'MANAGERPPOPUP'}
        inputHeader={'group'}
        isRequired={false}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        setErrorMsg={setRequiredErrorMsg}
        ListData={coreGroupReviewListData}
        textOne={'itemGroupName'}
        textTwo={'itemGroupDescription'}
        onClickEvent={(e) => {
          updateGroup(e, 'itemGroup', 'itemGroupPrimary');
        }}
        selectedList={itemInformation.informationAllocation.itemGroup.itemGroupPrimary}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'MANAGERPPOPUP'}
        inputHeader={'group'}
        isRequired={false}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a group'}
        setErrorMsg={setRequiredErrorMsg}
        ListData={coreGroupReviewListData}
        textOne={'itemGroupName'}
        textTwo={'itemGroupDescription'}
        onClickEvent={(e) => {
          updateGroup(e, 'itemGroup', 'itemGroupSecondary');
        }}
        selectedList={itemInformation.informationAllocation.itemGroup.itemGroupSecondary}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'NODEPOPUP'}
        inputHeader={'manager'}
        isRequired={false}
        inputHeaderBadge={'primary'}
        infoMsg={'select a manager'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Manager' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Manager' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Manager' } }
        ]}
        selectedList={[]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'NODEPOPUP'}
        inputHeader={'manager'}
        isRequired={false}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a manager'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Manager' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Manager' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Manager' } }
        ]}
        selectedList={[]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'TYPEPOPUP'}
        inputHeader={'node'}
        isRequired={false}
        inputHeaderBadge={'primary'}
        infoMsg={'select a node'}
        ListData={coreNodeReviewListData}
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        onClickEvent={(e) => {
          updateGroup(e, 'itemNode', 'itemNodeSecondary');
        }}
        selectedList={itemInformation.informationAllocation.itemNode.itemNodeSecondary}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'TYPEPOPUP'}
        inputHeader={'node'}
        isRequired={false}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a node'}
        ListData={coreNodeReviewListData}
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        onClickEvent={(e) => {
          updateGroup(e, 'itemNode', 'itemNodeSecondary');
        }}
        selectedList={itemInformation.informationAllocation.itemNode.itemNodeSecondary}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'type'}
        isRequired={false}
        inputHeaderBadge={'primary'}
        infoMsg={'select a type'}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        ListData={coreTypeReviewListData}
        textOne={'itemTypeName'}
        textTwo={'itemTypeDescription'}
        onClickEvent={(e) => {
          updateGroup(e, 'itemType', 'itemTypePrimary');
        }}
        selectedList={itemInformation.informationAllocation.itemType.itemTypePrimary}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'type'}
        isRequired={false}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a type'}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        ListData={coreTypeReviewListData}
        textOne={'itemTypeName'}
        textTwo={'itemTypeDescription'}
        onClickEvent={(e) => {
          updateGroup(e, 'itemType', 'itemTypeSecondary');
        }}
        selectedList={itemInformation.informationAllocation.itemType.itemTypeSecondary}
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
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
    </div>
  );
};

export default ItemCreatePopUp;
