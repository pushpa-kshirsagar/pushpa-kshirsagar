import React from 'react';
import HeaderCard from '../../Molecules/Header/HeaderCard';
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
import AssesseeGroupAssesseeDistinctReviewList from '../../ReviewListComponent/AssesseeGroupAssesseeDistinctReviewList';
import AssociateGroupAssociateDistinctReviewList from '../../ReviewListComponent/AssociateGroupAssociateDistinctReviewList';
import AssesseeRoleAssesseeDistinctReviewList from '../../ReviewListComponent/AssesseeRoleAssesseeDistinctReviewList';
import AssociateRoleAssociateDistinctReviewList from '../../ReviewListComponent/AssociateRoleAssociateDistinctReviewList';
import IguruNodeReviewList from '../../ReviewListComponent/IguruNodeReviewList';
import AssociateNodeReviewList from '../../ReviewListComponent/AssociateNodeReviewList';
import AssesseeNodeAssesseeDistinctReviewList from '../../ReviewListComponent/AssesseeNodeAssesseeDistinctReviewList';
import AssesseeAssociateReviewList from '../../ReviewListComponent/AssesseeAssociateReviewList';
import AssesseeTypeReviewList from '../../ReviewListComponent/AssesseeTypeReviewList';
import AssociateTypeReviewList from '../../ReviewListComponent/AssociateTypeReviewList';
import AssesseeTypeAssesseeDistinctReviewList from '../../ReviewListComponent/AssesseeTypeAssesseeDistinctReviewList';
import AssociateTypeAssociateDistinctReviewList from '../../ReviewListComponent/AssociateTypeAssociateDistinctReviewList';
import ItemReviewList from '../../ReviewListComponent/ItemReviewList';
import ItemGroupReviewList from '../../ReviewListComponent/ItemGroupReviewList';
import NodeRelatedAssociateReviewList from '../../ReviewListComponent/NodeRelatedAssociateReviewList';
import ItemTypeReviewList from '../../ReviewListComponent/ItemTypeReviewList';
import ItemGroupItemDistinctReviewList from '../../ReviewListComponent/ItemGroupItemDistinctReviewList';
import ItemTypeItemDistinctReviewList from '../../ReviewListComponent/ItemTypeItemDistinctReviewList';
import AssessmentTypeAssessmentDistinctReviewList from '../../ReviewListComponent/AssessmentTypeAssessmentDistinctReviewList';
import AssessmentNodeAssessmentDistinctReviewList from '../../ReviewListComponent/AssessmentNodeAssessmentDistinctReviewList';
import ItemNodeItemDistinctReviewList from '../../ReviewListComponent/ItemNodeItemDistinctReviewList';
import AssignmentTypeAssignmentDistinctReviewList from '../../ReviewListComponent/AssignmentTypeAssignmentDistinctReviewList';
import AssignmentGroupAssignmentDistinctReviewList from '../../ReviewListComponent/AssignmentGroupAssignmentDistinctReviewList';
import AssignmentNodeAssignmentDistinctReviewList from '../../ReviewListComponent/AssignmentNodeAssignmentDistinctReviewList';
import CultureProfileDistinctReviewList from '../../ReviewListComponent/CultureProfileDistinctReviewList';
import CultureProfileGroupReviewList from '../../ReviewListComponent/CultureProfileGroupReviewList';
import CultureProfileTypeReviewList from '../../ReviewListComponent/CultureProfileTypeReviewList';
import JobProfileDistinctReviewList from '../../ReviewListComponent/JobProfileDistinctReviewList';
import CultureProfileGroupCultureProfileDistinctReviewList from '../../ReviewListComponent/CultureProfileGroupCultureProfileDistinctReviewList';
import CultureProfileTypeCultureProfileDistinctReviewList from '../../ReviewListComponent/CultureProfileTypeCultureProfileDistinctReviewList';
import JobProfileGroupReviewList from '../../ReviewListComponent/JobProfileGroupReviewList';
import JobProfileTypeReviewList from '../../ReviewListComponent/JobProfileTypeReviewList';
import AssessmentGroupAssessmentDistinctReviewList from '../../ReviewListComponent/AssessmentGroupAssessmentDistinctReviewList';
import JobProfileGroupJobProfileDistinctReviewList from '../../ReviewListComponent/JobProfileGroupJobProfileDistinctReviewList';
import JobProfileTypeJobProfileDistinctReviewList from '../../ReviewListComponent/JobProfileTypeJobProfileDistinctReviewList';
import CultureProfileNodeCultureProfileDistinctReviewList from '../../ReviewListComponent/CultureProfileNodeCultureProfileDistinctReviewList';
import JobProfileNodeJobProfileDistinctReviewList from '../../ReviewListComponent/JobProfileNodeJobProfileDistinctReviewList';
import AssignmentDistinctAssesseeDistinctReviewList from '../../ReviewListComponent/AssignmentDistinctAssesseeDistinctReviewList';
import AssignmentDistinctAssessmentDistinctReviewList from '../../ReviewListComponent/AssignmentDistinctAssessmentDistinctReviewList';
import AssignmentDistinctCultureProfileDistinctReviewList from '../../ReviewListComponent/AssignmentDistinctCultureProfileDistinctReviewList';
import AssignmentDistinctJobProfileDistinctReviewList from '../../ReviewListComponent/AssignmentDistinctJobProfileDistinctReviewList';
import CultureProfileAssessmentDistinctReviewList from '../../ReviewListComponent/CultureProfileAssessmentDistinctReviewList';
import JobProfileAssessmentDistinctReviewList from '../../ReviewListComponent/JobProfileAssessmentDistinctReviewList';
import AssesseeDistinctAssignmentDistinctReviewList from '../../ReviewListComponent/AssesseeDistinctAssignmentDistinctReviewList';
import AssessmentDistinctItemDistinctReviewList from '../../ReviewListComponent/AssessmentDistinctItemDistinctReviewList';
import AssessmentDistinctScaleDistinctReviewList from '../../ReviewListComponent/AssessmentDistinctScaleDistinctReviewList';
import AssesseeDistinctAssessmentDistinctReviewList from '../../ReviewListComponent/AssesseeDistinctAssessmentDistinctReviewList';
import AssesseeDistinctReportDistinctReviewList from '../../ReviewListComponent/AssesseeDistinctReportDistinctReviewList';

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
        {typeOfMiddlePaneList === 'assesseeAssignmentDistinctReviewList' && (
          <AssesseeDistinctAssignmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesAssginmentAssessmentReviewList' && (
          <AssesseeDistinctAssessmentDistinctReviewList popupAllClose={popupAllClose} />
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
        {typeOfMiddlePaneList === 'assessmentGroupAssessmentReviewList' && (
          <AssessmentGroupAssessmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentsTypeDistinctReviewList' && (
          <AssignmentTypeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentDistinctReviewList' && (
          <AssignmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentGroupAssignmentReviewList' && (
          <AssignmentGroupAssignmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentTypeAssignmentReviewList' && (
          <AssignmentTypeAssignmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentNodeAssignmentReviewList' && (
          <AssignmentNodeAssignmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assessmentDistinctReviewList' && (
          <AssessmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assessmentTypeAssessmentReviewList' && (
          <AssessmentTypeAssessmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assessmentNodeAssessmentReviewList' && (
          <AssessmentNodeAssessmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assessmentItemReviewList' && (
          <AssessmentDistinctItemDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assessmentscalesReviewList' && (
          <AssessmentDistinctScaleDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesGroupAssesseeReviewList' && (
          <AssesseeGroupAssesseeDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentDistinctAssesseeReviewList' && (
          <AssignmentDistinctAssesseeDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesReportReviewList' && (
          <AssesseeDistinctReportDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentDistinctAssessmentReviewList' && (
          <AssignmentDistinctAssessmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentDistinctCultureProfileReviewList' && (
          <AssignmentDistinctCultureProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assignmentDistinctJobProfileReviewList' && (
          <AssignmentDistinctJobProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associatesGroupAssociateReviewList' && (
          <AssociateGroupAssociateDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesRoleAssesseeReviewList' && (
          <AssesseeRoleAssesseeDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesTypeAssesseeReviewList' && (
          <AssesseeTypeAssesseeDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associatesRoleAssociateReviewList' && (
          <AssociateRoleAssociateDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'nodeAssociatesReviewList' && (
          <NodeRelatedAssociateReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associatesTypeAssociateReviewList' && (
          <AssociateTypeAssociateDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associatesNodeDistinctReviewList' && (
          <IguruNodeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associateNodeDistinctReviewList' && (
          <AssociateNodeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseesNodeAssesseeReviewList' && (
          <AssesseeNodeAssesseeDistinctReviewList popupAllClose={popupAllClose} />
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
          <ItemGroupItemDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'itemNodeItemReviewList' && (
          <ItemNodeItemDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'itemTypeItemReviewList' && (
          <ItemTypeItemDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'cultureProfilesDistinctReviewList' && (
          <CultureProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'cultureProfilesGroupDistinctReviewList' && (
          <CultureProfileGroupReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'cultureProfilesTypeDistinctReviewList' && (
          <CultureProfileTypeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'cultureProfileGroupCultureProfileReviewList' && (
          <CultureProfileGroupCultureProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'cultureProfileTypeCultureProfileReviewList' && (
          <CultureProfileTypeCultureProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'cultureProfileNodeCultureProfileReviewList' && (
          <CultureProfileNodeCultureProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'cultureProfileAssessmentReviewList' && (
          <CultureProfileAssessmentDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'jobProfilesDistinctReviewList' && (
          <JobProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'jobProfilesGroupDistinctReviewList' && (
          <JobProfileGroupReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'jobProfilesTypeDistinctReviewList' && (
          <JobProfileTypeReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'jobProfileGroupJobProfileReviewList' && (
          <JobProfileGroupJobProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'jobProfileTypeJobProfileReviewList' && (
          <JobProfileTypeJobProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'jobProfileNodeJobProfileReviewList' && (
          <JobProfileNodeJobProfileDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'jobProfilepAssessmentReviewList' && (
          <JobProfileAssessmentDistinctReviewList popupAllClose={popupAllClose} />
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
      </div>
    </div>
  );
};

export default DisplayPaneTwo;
