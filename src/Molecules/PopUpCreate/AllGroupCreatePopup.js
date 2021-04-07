import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  POPUP_CLOSE,
  CREATE_GROUP_SAGA,
  SET_GROUP_REDUCER_STATE,
  LOADER_START,
  CLEAR_GROUP_REDUCER_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';

const AllGroupCreatePopup = (props) => {
  const { headerOne } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { groupInformation } = useSelector((state) => state.GroupCreateReducer);
  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let reqBody = {
      assesseeId: '0123456',
      associateId: '0654321'
    };
    if (headerOne === 'assessees') {
      reqBody = {
        assesseeId: '0123456',
        associateId: '0654321',
        whichGroupCreate: 'assessees',
        assesseeGroup: {
          informationBasic: {
            assesseeGroupName: groupInformation.informationBasic.groupName,
            assesseeGroupNameVerification: false,
            assesseeGroupDescription: groupInformation.informationBasic.groupDescription,
            assesseeGroupPicture: '',
            assesseeGroupPictureVerification: false
          },
          informationAllocation: {
            assesseeGroupManager: {
              assesseeGroupManagerPrimary: ['fdfsdf']
            },
            assesseeGroupNode: {
              assesseeGroupNodeSecondary: []
            },
            assesseeGroupType: {
              assesseeGroupTypePrimary: []
            }
          }
        }
      };
    }
    if (headerOne === 'associates') {
      reqBody = {
        assesseeId: '0123456',
        associateId: '0654321',
        whichGroupCreate: 'associates',
        associateGroup: {
          informationBasic: {
            associateGroupName: groupInformation.informationBasic.groupName,
            associateGroupNameVerification: false,
            associateGroupDescription: groupInformation.informationBasic.groupDescription,
            associateGroupPicture: '',
            associateGroupPictureVerification: false
          },
          informationAllocation: {
            associateGroupManager: {
              associateGroupManagerPrimary: ['fdfsdf']
            },
            associateGroupNode: {
              associateGroupNodeSecondary: []
            },
            associateGroupType: {
              associateGroupTypePrimary: []
            }
          }
        }
      };
    }
    if (headerOne === 'assessments') {
      reqBody = {
        assesseeId: '0123456',
        associateId: '0654321',
        whichGroupCreate: 'assessments',
        assessmentGroup: {
          informationBasic: {
            assessmentGroupName: groupInformation.informationBasic.groupName,
            assessmentGroupNameVerification: false,
            assessmentGroupDescription: groupInformation.informationBasic.groupDescription,
            assessmentGroupPicture: '',
            assessmentGroupPictureVerification: false
          },
          informationAllocation: {
            assessmentGroupManager: {
              assessmentGroupManagerPrimary: ['fdfsdf']
            },
            assessmentGroupNode: {
              assessmentGroupNodeSecondary: []
            },
            assessmentGroupType: {
              assessmentGroupTypePrimary: []
            }
          }
        }
      };
    }
    //console.log('CREATE group api', reqBody);
    dispatch({ type: LOADER_START });
    dispatch({ type: CREATE_GROUP_SAGA, payload: reqBody });
  };

  return (
    <div>
      <PopUpTextField
        isActive={isPopUpValue === 'NAMEPOPUP'}
        label={'name'}
        actualLableValue={'groupName'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={groupInformation.informationBasic}
        typeOfSetObject={SET_GROUP_REDUCER_STATE}
        isRequired={true}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={'groupDescription'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        basicInfo={groupInformation.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={SET_GROUP_REDUCER_STATE}
      />
      <PopUpPicture
        isActive={isPopUpValue === 'PICTUREPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'MANAGERLISTPOPUP'}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'MANAGERLISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'NODELISTPOPUP'}
        inputHeader={'group'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Group' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Group' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Group' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'NODELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'TYPELISTPOPUP'}
        inputHeader={'node'}
        inputHeaderBadge={'secondary'}
        infoMsg={'select a node'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Node' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Node' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Node' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
      />
      <PopUpReviewList
        isActive={isPopUpValue === 'TYPELISTPOPUP'}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'CONFIRMATIONPOPUP'}
        inputHeader={'type'}
        inputHeaderBadge={'primary'}
        infoMsg={'select a group'}
        ListData={[
          { id: '01', informationBasic: { name: 'Simple Sample 01', description: 'Type' } },
          { id: '02', informationBasic: { name: 'Simple Sample 02', description: 'Type' } },
          { id: '03', informationBasic: { name: 'Simple Sample 03', description: 'Type' } }
        ]}
        textOne={'name'}
        textTwo={'description'}
        onClickEvent={null}
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
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'create'}
        onClickYes={onClickYes}
      />
    </div>
  );
};

export default AllGroupCreatePopup;
