import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopUpPicture from '../../PopUpInformation/PopUpPicture';
import PopUpTextField from '../../PopUpInformation/PopUpTextField';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import {
  POPUP_CLOSE,
  CREATE_GROUP_SAGA,
  LOADER_START,
  CLEAR_GROUP_REDUCER_STATE
} from '../../actionType';
import PopUpReviewList from '../../PopUpInformation/PopUpReviewList';

const AllGroupCreatePopup = (props) => {
  const {
    headerOne,
    reducerObeject,
    groupDescription,
    groupName,
    setReducerObject,
    objectName
  } = props;
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  // const { reducerObeject } = useSelector((state) => state.GroupCreateReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  // console.log(reducerObeject);
  // console.log('reducerObeject');
  const dispatch = useDispatch();
  const onClickCancelYes = () => {
    dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
    dispatch({ type: POPUP_CLOSE });
  };
  const onClickYes = () => {
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      whichGroupCreate: headerOne,
      [objectName]: reducerObeject
    };
    console.log(reqBody);
    {
      /* if (headerOne === 'assessees') {
      reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
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
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
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
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
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
    if (headerOne === 'assignments') {
      reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        whichGroupCreate: 'assignments',
        assignmentGroup: {
          informationBasic: {
            assignmentGroupName: groupInformation.informationBasic.groupName,
            assignmentGroupNameVerification: false,
            assignmentGroupDescription: groupInformation.informationBasic.groupDescription,
            assignmentGroupPicture: '',
            assignmentGroupPictureVerification: false
          },
          informationAllocation: {
            assignmentGroupManager: {
              assignmentGroupManagerPrimary: ['fdfsdf']
            },
            assignmentGroupNode: {
              assignmentGroupNodeSecondary: []
            },
            assignmentGroupType: {
              assignmentGroupTypePrimary: []
            }
          }
        }
      };
    }*/
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
        actualLableValue={groupName}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        nextPopUpValue={'ALIASPOPUP'}
        basicInfo={reducerObeject.informationBasic}
        typeOfSetObject={setReducerObject}
        isRequired={true}
      />
      <PopUpTextField
        isActive={isPopUpValue === 'ALIASPOPUP'}
        label={'description'}
        actualLableValue={groupDescription}
        headerPanelColour={'genericOne'}
        headerOne={headerOne}
        headerOneBadgeOne={'group'}
        headerOneBadgeTwo={'information'}
        basicInfo={reducerObeject.informationBasic}
        nextPopUpValue={'PICTUREPOPUP'}
        typeOfSetObject={setReducerObject}
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
