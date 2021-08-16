import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import {
  POPUP_CLOSE,
  CREATE_ITEM_SAGA,
  LOADER_START,
  CLEAR_TYPE_REDUCER_STATE,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_TYPE_GROUP_ALLOCATION,
  SET_TYPE_REDUCER_STATE,
  SET_ITEM_DYNAMIC_SINGLE_STATE,
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_ITEMFRAMEWORK_REDUCER_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';
import PopUpDropList from '../../PopUpInformation/PopUpDropList';

const PopUpItemCreate = (props) => {
  const { headerOne = 'item' } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  console.log('itemInformation',itemInformation);
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
  let selectedPrimaryGroup =
    itemInformation?.informationAllocation?.itemGroup.itemGroupPrimary || [];
  let selectedSecondaryGroup =
    itemInformation?.informationAllocation?.itemGroup.itemGroupSecondary || [];
  let filteredCoreGroupReviewListDataPrimary = [];
  if (coreGroupReviewListData && coreGroupReviewListData.length > 0) {
    coreGroupReviewListData.forEach((group) => {
      // for primary popup list
      if (!selectedSecondaryGroup.includes(group.id))
        filteredCoreGroupReviewListDataPrimary.push(group);
    });
  }
  let filteredCoreGroupReviewListDataSecondary = [];
  if (coreGroupReviewListData && coreGroupReviewListData.length > 0) {
    coreGroupReviewListData.forEach((group) => {
      // for Secondary popup list
      if (!selectedPrimaryGroup.includes(group.id))
        filteredCoreGroupReviewListDataSecondary.push(group);
    });
  }
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
        ListData={filteredCoreGroupReviewListDataPrimary}
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
        ListData={filteredCoreGroupReviewListDataSecondary}
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
          updateGroup(e, 'itemNode', 'itemNodePrimary');
        }}
        selectedList={itemInformation.informationAllocation.itemNode.itemNodePrimary}
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
      <PopUpConfirm
        isActive={isPopUpValue === 'CANCELPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={'cancel'}
        headerOneBadgeOne={''}
        mode={'cancel'}
        onClickYes={onClickCancelYes}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ITEMSCOREPOPUP'}
        label={'score'}
        actualLableValue={'itemFrameworkOneScore'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        basicInfo={itemInformation.informationFramework?.itemFrameworkOne || ''}
        nextPopUpValue={''}
        typeOfSetObject={SET_ITEMFRAMEWORK_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ITEMTIMEPOPUP'}
        label={'time'}
        actualLableValue={'itemFrameworkOneTime'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        basicInfo={itemInformation.informationFramework?.itemFrameworkOne || ''}
        nextPopUpValue={''}
        typeOfSetObject={SET_ITEMFRAMEWORK_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ITEMWEITAGEPOPUP'}
        label={'weightage'}
        actualLableValue={'itemFrameworkOneWeightage'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        basicInfo={itemInformation.informationFramework?.itemFrameworkOne || ''}
        nextPopUpValue={''}
        typeOfSetObject={SET_ITEMFRAMEWORK_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEMLEVELPOPUP'}
        tag={'itemFrameworkOneLevel'}
        label={'level'}
        listSelect={[
          { id: 'High-Level', name: 'High-Level' },
          { id: 'Low-Level', name: 'Low-Level' },
          { id: 'Mid-Level', name: 'Mid-Level' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={false}
        basicInfo={itemInformation.informationFramework?.itemFrameworkOne || ''}
        typeOfSetObject={SET_ITEMFRAMEWORK_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpDropList
        isActive={isPopUpValue === 'ITEMPOLARITYPOPUP'}
        tag={'itemFrameworkOnePolarity'}
        label={'polarity'}
        listSelect={[
          { id: 'Negative', name: 'Negative' },
          { id: 'Positive', name: 'Positive' }
        ]}
        mappingValue={'id'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        isRequired={false}
        basicInfo={itemInformation.informationFramework?.itemFrameworkOne || ''}
        typeOfSetObject={SET_ITEMFRAMEWORK_REDUCER_STATE}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'ITEMSCALEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        inputHeader={'type'}
        isRequired={false}
        inputHeaderBadge={''}
        infoMsg={'select a type'}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        ListData={itemInformation.informationFramework.itemFrameworkOne.itemFrameworkOneScale}
        textOne={'itemFrameworkOneScaleLabel'}
        textTwo={''}
        // onClickEvent={(e) => {
        //   updateGroup(e, 'itemType', 'itemTypeSecondary');
        // }}
        // selectedList={}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'FRAMEWORKONETYPEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={''}
        headerOneBadgeTwo={'information'}
        inputHeader={'type'}
        isRequired={false}
        inputHeaderBadge={''}
        infoMsg={'select a type'}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        ListData={itemInformation.informationFramework.itemTypeList || []}
        textOne={'itemFrameworkOneTypeName'}
        textTwo={'itemFrameworkOneTypeDescription'}
        // onClickEvent={(e) => {
        //   updateGroup(e, 'itemType', 'itemTypeSecondary');
        // }}
        selectedList={[itemInformation.informationFramework.itemFrameworkOne.itemFrameworkOneType]}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
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

export default PopUpItemCreate;
