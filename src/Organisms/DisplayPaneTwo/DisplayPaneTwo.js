import React from 'react';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import { useSelector } from 'react-redux';
import './DisplayPaneTwo.css';
import AssesseeRelatedAssociateReviewList from '../../ReviewListComponent/AssesseeRelatedAssociateReviewList';
import AssesseeDistinctReviewList from '../../ReviewListComponent/AssesseeDistinctReviewList';
import AssociateDistinctReviewList from '../../ReviewListComponent/AssociateDistinctReviewList';
import AssesseeRoleDistinctReviewList from '../../ReviewListComponent/AssesseeRoleDistinctReviewList';
import AssociateRoleDistinctReviewList from '../../ReviewListComponent/AssociateRoleDistinctReviewList';
import PopUpScan from '../../PopUpInformation/PopUpScan';
import AssesseeGroupReviewList from '../../ReviewListComponent/AssesseeGroupReviewList';
import AssociateGroupReviewList from '../../ReviewListComponent/AssociateGroupReviewList';
import AssessmentGroupReviewList from '../../ReviewListComponent/AssessmentGroupReviewList';
import AssignmentGroupReviewList from '../../ReviewListComponent/AssignmentGroupReviewList';
import AssessmentTypeReviewList from '../../ReviewListComponent/AssessmentTypeReviewList';
import AssignmentTypeReviewList from '../../ReviewListComponent/AssignmentTypeReviewList';
import AssignmentDistinctReviewList from '../../ReviewListComponent/AssignmentDistinctReviewList';
import AssessmentDistinctReviewList from '../../ReviewListComponent/AssessmentDistinctReviewList';
import AssesseeGroupAssesseeReviewList from '../../ReviewListComponent/AssesseeGroupAssesseeReviewList';
import AssociateGroupAssociateReviewList from '../../ReviewListComponent/AssociateGroupAssociateReviewList';
import AssesseeRoleAssesseeReviewList from '../../ReviewListComponent/AssesseeRoleAssesseeReviewList';
import AssociateRoleAssociateReviewList from '../../ReviewListComponent/AssociateRoleAssociateReviewList';
import IguruNodeReviewList from '../../ReviewListComponent/IguruNodeReviewList';
import AssociateNodeReviewList from '../../ReviewListComponent/AssociateNodeReviewList';
import AssesseeNodeAssesseeReviewList from '../../ReviewListComponent/AssesseeNodeAssesseeReviewList';
import AssesseeAssociateReviewList from '../../ReviewListComponent/AssesseeAssociateReviewList';
import AssesseeTypeReviewList from '../../ReviewListComponent/AssesseeTypeReviewList';
import AssociateTypeReviewList from '../../ReviewListComponent/AssociateTypeReviewList';
import AssesseeTypeAssesseeReviewList from '../../ReviewListComponent/AssesseeTypeAssesseeReviewList';
import AssociateTypeAssociateReviewList from '../../ReviewListComponent/AssociateTypeAssociateReviewList';
import ItemReviewList from '../../ReviewListComponent/ItemReviewList';
import ItemGroupReviewList from '../../ReviewListComponent/ItemGroupReviewList';
import NodeRelatedAssociateReviewList from '../../ReviewListComponent/NodeRelatedAssociateReviewList';
import ItemTypeReviewList from '../../ReviewListComponent/ItemTypeReviewList';
import ItemGroupItemReviewList from '../../ReviewListComponent/ItemGroupItemReviewList';
import ItemTypeItemReviewList from '../../ReviewListComponent/ItemTypeItemReviewList';
import AssessmentGroupAssessmentReviewList from '../../ReviewListComponent/AssessmentGroupAssessmentReviewList';
import AssessmentTypeAssessmentReviewList from '../../ReviewListComponent/AssessmentTypeAssessmentReviewList';
import AssessmentNodeAssessmentReviewList from '../../ReviewListComponent/AssessmentNodeAssessmentReviewList';
import ItemNodeItemReviewList from '../../ReviewListComponent/ItemNodeItemReviewList';
import AssignmentTypeAssignmentReviewList from '../../ReviewListComponent/AssignmentTypeAssignmentReviewList';
import AssignmentGroupAssignmentReviewList from '../../ReviewListComponent/AssignmentGroupAssignmentReviewList';
import AssignmentNodeAssignmentReviewList from '../../ReviewListComponent/AssignmentNodeAssignmentReviewList';
import CultureProfileDistinctReviewList from '../../ReviewListComponent/CultureProfileDistinctReviewList';
import CultureProfileGroupReviewList from '../../ReviewListComponent/CultureProfileGroupReviewList';

export const DisplayPaneTwo = (props) => {
  const { popupAllClose } = props;
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const {
    isAssociateSelected,
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    middlePaneHeaderBadgeThree,
    middlePaneHeaderBadgeFour,
    typeOfMiddlePaneList,
    scanCount,
    showMiddlePaneState
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  console.log(typeOfMiddlePaneList,"typeOfMiddlePaneList");
  return (
    <div>
      <div>
        <HeaderCard
          className=""
          displayPane="centre"
          headerOne={middlePaneHeader}
          headerOneBadgeOne={middlePaneHeaderBadgeOne}
          headerOneBadgeTwo={middlePaneHeaderBadgeTwo}
          headerOneBadgeThree={middlePaneHeaderBadgeThree}
          headerOneBadgeFour={middlePaneHeaderBadgeFour}
          headerPanelColour="green"
          scanCount={scanCount}
          isAssociateSelected={isAssociateSelected}
          showMiddlePaneState={showMiddlePaneState}
        />
      </div>
      {popupMode === 'SCAN_POPUP_FUN' && <PopUpScan />}
      <div
        style={{
          height: 'calc(100vh - 190px)',
          overflow: 'overlay'
        }}
        className="containerPadding"
        id={'middleComponentId'}
      >
        {typeOfMiddlePaneList === 'assesseeRelatedAssociate' && (
          <AssesseeRelatedAssociateReviewList />
        )}
        {(typeOfMiddlePaneList === 'assesseesDistinctReviewList' ||
          typeOfMiddlePaneList === 'administratorsDistinctReviewList' ||
          typeOfMiddlePaneList === 'managersDistinctReviewList') && (
          <AssesseeDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associateDistinctReviewList' && (
          <AssociateDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList' && (
          <AssesseeRoleDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associateRoleDistinctReviewList' && (
          <AssociateRoleDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesGroupDistinctReviewList' && (
          <AssesseeGroupReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assessmentsGroupDistinctReviewList' && (
          <AssessmentGroupReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentsGroupDistinctReviewList' && (
          <AssignmentGroupReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associatesGroupDistinctReviewList' && (
          <AssociateGroupReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assessmentsTypeDistinctReviewList' && (
          <AssessmentTypeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentsTypeDistinctReviewList' && (
          <AssignmentTypeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentDistinctReviewList' && (
          <AssignmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentGroupAssignmentReviewList' && (
          <AssignmentGroupAssignmentReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentTypeAssignmentReviewList' && (
          <AssignmentTypeAssignmentReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentNodeAssignmentReviewList' && (
          <AssignmentNodeAssignmentReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assessmentDistinctReviewList' && (
          <AssessmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assessmentTypeAssessmentReviewList' && (
          <AssessmentTypeAssessmentReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assessmentNodeAssessmentReviewList' && (
          <AssessmentNodeAssessmentReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesGroupAssesseeReviewList' && (
          <AssesseeGroupAssesseeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associatesGroupAssociateReviewList' && (
          <AssociateGroupAssociateReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesRoleAssesseeReviewList' && (
          <AssesseeRoleAssesseeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesTypeAssesseeReviewList' && (
          <AssesseeTypeAssesseeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associatesRoleAssociateReviewList' && (
          <AssociateRoleAssociateReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'nodeAssociatesReviewList' && (
          <NodeRelatedAssociateReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associatesTypeAssociateReviewList' && (
          <AssociateTypeAssociateReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associatesNodeDistinctReviewList' && (
          <IguruNodeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associateNodeDistinctReviewList' && (
          <AssociateNodeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesNodeAssesseeReviewList' && (
          <AssesseeNodeAssesseeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseeassociatesReviewList' && (
          <AssesseeAssociateReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesTypeDistinctReviewList' && (
          <AssesseeTypeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associatesTypeDistinctReviewList' && (
          <AssociateTypeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'itemsDistinctReviewList' && (
          <ItemReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'itemsTypeDistinctReviewList' && (
          <ItemTypeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'itemsGroupDistinctReviewList' && (
          <ItemGroupReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'itemGroupItemReviewList' && (
          <ItemGroupItemReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'itemNodeItemReviewList' && (
          <ItemNodeItemReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'itemTypeItemReviewList' && (
          <ItemTypeItemReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'cultureProfilesDistinctReviewList' && (
          <CultureProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'cultureProfilesGroupDistinctReviewList' && (
          <CultureProfileGroupReviewList popupAllClose={popupAllClose} />
        )}
        {/* {typeOfMiddlePaneList !== '' &&
          typeOfMiddlePaneList !== 'assesseeRelatedAssociate' &&
          tempAssociateList.map((associate, index) => {
            return (
              <div className="containerPadding" key={index}>
                <ReviewList
                  className=""
                  id={associate.id}
                  status={associate.status}
                  textOne={associate.textOne}
                  textTwo={associate.textTwo}
                  isTooltipActive={associate.isTooltipActive}
                />
              </div>
            );
          })} */}
        {/* <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div> */}

        {/* for middle pane review list popup */}

        {/* <PopUpMiddlePaneList isActive={isPopUpValue === 'middlePaneListPopup'} /> */}
      </div>
    </div>
  );
};

export default DisplayPaneTwo;
