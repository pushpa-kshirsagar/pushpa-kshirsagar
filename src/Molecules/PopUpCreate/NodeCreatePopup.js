import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  POPUP_CLOSE,
  CREATE_NODE_SAGA,
  SET_NODE_REDUCER_STATE,
  LOADER_START,
  CLEAR_NODE_REDUCER_STATE,
  SET_NODE_DYNAMIC_SINGLE_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';

const NodeCreatePopup = (props) => {
  const { headerOne } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { nodeInformation } = useSelector((state) => state.NodeCreateReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo, coreNodeReviewListData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  console.log(nodeInformation);
  const [roleSelectedError, setRoleSelectedError] = useState('');
  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_NODE_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let framworkObj = {
      associateNodeAscendant: {
        associateNodeAscendantPrimary:
          nodeInformation.informationFramework.associateNodeAscendant
            .associateNodeAscendantPrimary[0],
        associateNodeAscendantSecondary: []
      }
    };
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      associateNode: {
        informationBasic: nodeInformation.informationBasic,
        informationAllocation: nodeInformation.informationAllocation,
        informationFramework: framworkObj
      }
    };
    console.log('CREATE group api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_NODE_SAGA, payload: reqBody });
  };
  const updateParentNode = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    let tagId = e.currentTarget.getAttribute('tag');
    let tagIdArr =
      nodeInformation.informationFramework.associateNodeAscendant.associateNodeAscendantPrimary;
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
      type: SET_NODE_DYNAMIC_SINGLE_STATE,
      payload: {
        objectName: 'informationFramework',
        stateName: 'associateNodeAscendant',
        actualStateName: 'associateNodeAscendantPrimary',
        value: tagIdArr
      }
    });
  };
  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'associateNodeName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'node'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={nodeInformation.informationBasic}
        typeOfSetObject={SET_NODE_REDUCER_STATE}
        isRequired={true}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'associateNodeDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'node'}
        headerOneBadgeTwo={'information'}
        basicInfo={nodeInformation.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_NODE_REDUCER_STATE}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'node'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'MANAGERLISTPOPUP'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'PARENTLISTPOPUP'}
        inputHeader={'manager'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a role'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Manager' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Manager' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Manager' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
        mode={reviewMode === 'revise' ? 'revise' : 'core'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'PARENTLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'ascendant'}
        inputHeaderBadgeTwo={'primary'}
        infoMsg={'select a node'}
        ListData={coreNodeReviewListData[0]}
        isRequired={true}
        selectedList={
          nodeInformation.informationFramework.associateNodeAscendant.associateNodeAscendantPrimary
        }
        setErrorMsg={setRoleSelectedError}
        errorMsg={roleSelectedError}
        textOne={'associateNodeName'}
        textTwo={'associateNodeDescription'}
        onClickEvent={updateParentNode}
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
        headerOneBadgeOne={'node'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
    </div>
  );
};

export default NodeCreatePopup;
