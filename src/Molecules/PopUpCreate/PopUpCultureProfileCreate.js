import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirm from '../../PopUpGeneric/PopUpConfirm';
import {
  POPUP_CLOSE,
  CLEAR_TYPE_REDUCER_STATE,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_CULTURE_REDUCER_STATE,
  SET_CULTURE_DYNAMIC_SINGLE_STATE,
  LOADER_START,
  CREATE_CULTURE_SAGA,
  SET_POPUP_VALUE,
  SET_NEXT_POPUP,
  SET_DISPLAY_PANE_THREE_STATE,
  GET_CULTURE_DIAMENTION_SAGA,
  SET_CULTURE_DIMENTION_STATE,
  SET_WEIGHTAGE_SELECTED
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';
import PopUpMessageGeneric from '../../PopUpGeneric/PopUpMessageGeneric';

const PopUpCultureProfileCreate = (props) => {
  const { headerOne, reducerObeject, allocationObj } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { cultureProfileInformation } = useSelector((state) => state.CultureProfileCreateReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const {
    selectedAssociateInfo,
    coreNodeReviewListData,
    coreGroupReviewListData,
    coreTypeReviewListData,
    responseObject,
    selectedInformationAllorKey,
    cultureProfileDiamentionReviewList
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const dispatch = useDispatch();
  const [requiredErrorMsg, setRequiredErrorMsg] = useState('');
  const [cultureDiamentionArr, setCultureDiamentionArr] = useState([]);
  const [cultureDiamentionGroup, setCultureDiamentionGroup] = useState('');

  const onClickCancelYes = () => {
    dispatch({
      type: SET_DISPLAY_THREE_SINGLE_STATE,
      payload: { stateName: 'createMode', value: '' }
    });
    dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  useEffect(() => {
    console.log('responseObject', responseObject);
    if (responseObject) {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'POPUPCONTINUE', popupMode: 'CULTURECREATE' }
      });
    }
  }, [responseObject]);
  const onClickYes = () => {
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      cultureProfile: cultureProfileInformation
    };
    console.log('CREATE type api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_CULTURE_SAGA, payload: reqBody });
  };
  const updateAllocationObj = (e, stateName, actualStateName) => {
    let tagId = e.currentTarget.getAttribute('tag');
    let tagIdArr = cultureProfileInformation.informationAllocation[stateName][actualStateName];
    if (tagIdArr.includes(tagId)) {
      document.getElementById(tagId).style.backgroundColor = 'white';
      tagIdArr = tagIdArr.filter(function (number) {
        return number !== tagId;
      });
    } else {
      tagIdArr.push(tagId);
      document.getElementById(tagId).style.backgroundColor = '#F0F0F0';
    }
    dispatch({
      type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
      payload: {
        objectName: 'informationAllocation',
        stateName: stateName,
        actualStateName: actualStateName,
        value: tagIdArr
      }
    });
  };
  console.log('cultureProfileInformation', cultureProfileInformation);
  let selectedPrimaryGroup =
    cultureProfileInformation?.informationAllocation?.cultureProfileGroup
      ?.cultureProfileGroupPrimary || [];
  let selectedSecondaryGroup =
    cultureProfileInformation?.informationAllocation?.cultureProfileGroup
      ?.cultureProfileGroupSecondary || [];
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
  const onClickContinueNo = () => {
    dispatch({
      type: SET_DISPLAY_PANE_THREE_STATE,
      payload: {
        headerOne: 'culture profile',
        headerOneBadgeOne: 'information',
        headerOneBadgeTwo: selectedInformationAllorKey,
        responseObject: responseObject,
        reviewMode: 'revise',
        createMode: 'cultureProfile'
      }
    });
  };
  const onClickContinueYes = () => {
    dispatch({ type: LOADER_START });
    let diamentionReqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      countPage: 50,
      numberPage: 0,
      filter: 'true',
      orderBy: {
        columnName: 'cultureProfilerFrameworkSecondaryGroup',
        order: 'asc'
      }
    };
    dispatch({ type: GET_CULTURE_DIAMENTION_SAGA, payload: { request: diamentionReqBody } });
  };
  const onClickRevise = () => {
    dispatch({
      type: SET_DISPLAY_PANE_THREE_STATE,
      payload: {
        headerOne: 'culture profile',
        headerOneBadgeOne: 'information',
        headerOneBadgeTwo: selectedInformationAllorKey,
        responseObject: responseObject,
        reviewMode: 'revise',
        createMode: 'cultureProfile'
      }
    });
    dispatch({
      type: SET_WEIGHTAGE_SELECTED,
      payload: true
    });
  };
  const updateDimention = (e) => {
    let tagId = e.currentTarget.getAttribute('tag');
    let groupId = e.currentTarget.getAttribute('data-value');
    let tagIdArr = [];
    if (cultureDiamentionArr.includes(tagId)) {
      document.getElementById(tagId).style.backgroundColor = 'white';
      tagIdArr = cultureDiamentionArr.filter(function (number) {
        return number !== tagId;
      });
    } else {
      var arr = [];
      tagIdArr = [...arr];
      tagIdArr.push(tagId);
      document.getElementById(tagId).style.backgroundColor = '#F0F0F0';
    }
    setCultureDiamentionArr(tagIdArr);
    setCultureDiamentionGroup(groupId);
  };
  const setDimentionStateReducer = () => {
    let arrr = cultureProfileDiamentionReviewList
      .map((obj) => {
        let temp = '';
        if (obj.group === cultureDiamentionGroup) {
          temp = obj.cultureDimensions.filter(function (ob) {
            return ob.id === cultureDiamentionArr[0];
          });
        }
        return temp[0];
      })
      .filter((notUndefined) => notUndefined !== undefined);

    console.log('arrr', arrr);
    let newtagIdArr =
      cultureProfileInformation?.informationFramework?.cultureProfileCultureDimensionCore || [];
    let existdiamentionObj =
      cultureProfileInformation?.informationFramework?.cultureProfileCultureDimensionCoreObj || [];
    console.log('newtagIdArr', newtagIdArr);
    console.log('cultureDiamentionArr', cultureDiamentionArr);
    if(arrr.length > 0){
      let ob = { ...arrr[0], cultureProfileCultureDimensionTag: arrr[0].id };
      dispatch({
        type: SET_CULTURE_DIMENTION_STATE,
        payload: {
          cultureProfileCultureDimensionCore: [...cultureDiamentionArr, ...newtagIdArr],
          cultureProfileCultureDimensionCoreObj: [...existdiamentionObj, ob]
        }
      });
    }
    setCultureDiamentionArr([]);
    setCultureDiamentionGroup('');
  };
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'cultureProfileName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        isRequired={true}
        typeOfSetObject={SET_CULTURE_REDUCER_STATE}
        basicInfo={cultureProfileInformation.informationBasic}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'cultureProfileDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_CULTURE_REDUCER_STATE}
        basicInfo={cultureProfileInformation.informationBasic}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'GROUPPOPUP'}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'MANAGERPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        ListData={filteredCoreGroupReviewListDataPrimary}
        selectedList={
          cultureProfileInformation.informationAllocation.cultureProfileGroup
            .cultureProfileGroupPrimary
        }
        textOne={'cultureProfileGroupName'}
        textTwo={'cultureProfileGroupDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'cultureProfileGroup', 'cultureProfileGroupPrimary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'GROUPSECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'MANAGERPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a group'}
        ListData={filteredCoreGroupReviewListDataSecondary}
        selectedList={
          cultureProfileInformation.informationAllocation.cultureProfileGroup
            .cultureProfileGroupSecondary
        }
        textOne={'cultureProfileGroupName'}
        textTwo={'cultureProfileGroupDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'cultureProfileGroup', 'cultureProfileGroupSecondary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'NODEPOPUP'}
        inputHeader={'manager'}
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
        headerOneBadgeOne={'information'}
        nextPopUpValue={'NODEPOPUP'}
        inputHeader={'manager'}
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
        headerOneBadgeOne={'information'}
        nextPopUpValue={'TYPEPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a node'}
        ListData={coreNodeReviewListData}
        selectedList={
          cultureProfileInformation.informationAllocation.cultureProfileNode
            .cultureProfileNodePrimary
        }
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'cultureProfileNode', 'cultureProfileNodePrimary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'TYPEPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a node'}
        ListData={coreNodeReviewListData}
        selectedList={
          cultureProfileInformation.informationAllocation.cultureProfileNode
            .cultureProfileNodeSecondary
        }
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'cultureProfileNode', 'cultureProfileNodeSecondary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPEPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'type'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a type'}
        ListData={coreTypeReviewListData}
        selectedList={
          cultureProfileInformation.informationAllocation.cultureProfileType
            .cultureProfileTypePrimary
        }
        textOne={'cultureProfileTypeName'}
        textTwo={'cultureProfileTypeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'cultureProfileType', 'cultureProfileTypePrimary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPESECONDARYPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'type'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a type'}
        ListData={coreTypeReviewListData}
        selectedList={
          cultureProfileInformation.informationAllocation.cultureProfileType
            .cultureProfileTypeSecondary
        }
        textOne={'cultureProfileTypeName'}
        textTwo={'cultureProfileTypeDescription'}
        onClickEvent={(e) => {
          updateAllocationObj(e, 'cultureProfileType', 'cultureProfileTypeSecondary');
        }}
        setErrorMsg={setRequiredErrorMsg}
        errorMsg={requiredErrorMsg}
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
        headerOne={headerOne}
        headerOneBadgeOne={'create'}
        headerOneBadgeTwo={''}
        onClickYes={onClickYes}
      />
      <PopUpConfirm
        isActive={isPopUpValue === 'POPUPCONTINUE'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'continue'}
        headerOneBadgeTwo={''}
        onClickYes={onClickContinueYes}
        mode={'error'}
        onClickNoFun={onClickContinueNo}
      />
      <PopUpMessageGeneric
        isActive={isPopUpValue === 'POPUPDIAMENTIONMSG'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'POPUPDIAMENTION0'}
        textOneOne={'select'}
        textOneTwo={'one or neither'}
        textOneThree={'culture dimensions'}
        textOneFour={`from the following twelve lists`}
        mode={'next'}
      />
      {cultureProfileDiamentionReviewList.map((value, index) => {
        return (
          <PopUpReviewList
            isActive={isPopUpValue === `POPUPDIAMENTION${index}`}
            headerPanelColour={'genericOne'}
            headerOne={headerOne}
            headerOneBadgeOne={'information'}
            nextPopUpValue={
              index < cultureProfileDiamentionReviewList.length - 1
                ? `POPUPDIAMENTION${index + 1}`
                : 'POPUPWEITAGENMSG'
            }
            handleClickOnCorrect={setDimentionStateReducer}
            inputHeader={'culture dimension'}
            inputHeaderBadge={'core'}
            infoMsg={'select a one neither culture dimension'}
            ListData={value.cultureDimensions}
            isTooltipActive={true}
            selectedList={cultureDiamentionArr}
            textOne={'cultureProfilerFrameworkSecondary'}
            textTwo={'cultureDimensionFrameworkSecondaryDescriptionPrimary'}
            tooltipActiveText={'cultureProfilerFrameworkSecondaryDescriptionSecondary'}
            dataValue={value.group}
            onClickEvent={updateDimention}
            setErrorMsg={setRequiredErrorMsg}
            errorMsg={requiredErrorMsg}
            mode={'core'}
          />
        );
      })}
      <PopUpMessageGeneric
        isActive={isPopUpValue === 'POPUPWEITAGENMSG'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'onClickRevise'}
        textOneOne={'weightage for'}
        textOneTwo={''}
        textOneThree={'core'}
        textOneFour={`culture dimensions`}
        mode={'next'}
        handleClickFun={onClickRevise}
      />
    </div>
  );
};

export default PopUpCultureProfileCreate;
