import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { IconButton, InputLabel, Paper } from '@material-ui/core';
import { getTypeGroupReviewListApi } from '../../Actions/AssesseeModuleAction';
import { SET_POPUP_VALUE } from '../../actionType';
import {convertToLocalTime} from '../../Actions/GenericActions'

const DisplayPaneThreeSectionOneAssesseeReport = () => {
  // const [listExpand, setListExpand] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('analytic');
  const dispatch = useDispatch();
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationEngagement, informationAllocation,assesseeAssignment } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  // let groupList = [];
  let assessmentTypeGroupList = [];
  const tempTypeGroup = informationAllocation?.assessmentTypeGroup;
  if (tempTypeGroup) {
    assessmentTypeGroupList.push({
      id: tempTypeGroup?.id || '',
      textOne: tempTypeGroup?.informationBasic?.assessmentTypeGroupName || '',
      textTwo: tempTypeGroup?.informationBasic?.assessmentTypeGroupDescription || '',
      status: ''
    });
  }
  const allocationList = [
    {
      id: 'assessments',
      labelTextOneOne: 'assessments',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'analytic',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'evaluation',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: '',
      isListCard: false
      // IconOne: Manuscript
    }
  ];
  //console.log('responce Object');
  //console.log(assesseeAssignment);
  //console.log(assesseeAssignment.assesseeAssignmentAssessment);
  //console.log(assesseeAssignment.assesseeAssignmentAssessment.length);
  return (
    <div
      style={{
        height: 'calc(100vh - 355px)',
        overflow: 'overlay'
      }}
    >
      <>
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            <div className={'detailsContactContainer'}>
              <div className={'detsailsPadding'}>
                <div className={['FormBox'].join(' ')}>
                  <div style={{ width: '100%' }}>
                    <div className={['report-label'].join(' ')}>
                      <InputLabel
                        htmlFor="name-input"
                        className={['textForLabel', 'textForLabelRight', 'careerLabelRight'].join(
                          ' '
                        )}
                      >
                        <span
                          style={{
                            marginBottom: '5px',
                            display: 'inline-block'
                          }}
                          className={'reviewLabelClass'}
                          data-value={'assessments'}
                          data-key={'assessments' || ''}
                        >
                          assessments
                          <sup
                            onClick={() => {
                              setSelectedBadge('analytic');
                            }}
                            style={{
                              backgroundColor:
                                selectedBadge === 'analytic' ? 'rgb(242, 242, 242)' : ''
                            }}
                          >
                            analytic
                          </sup>
                          <sup
                            onClick={() => {
                              setSelectedBadge('evaluation');
                            }}
                            style={{
                              backgroundColor:
                                selectedBadge === 'evaluation' ? 'rgb(242, 242, 242)' : ''
                            }}
                          >
                            evaluation
                          </sup>
                        </span>
                      </InputLabel>
                    </div>
                    {selectedBadge === 'analytic' && (
                      <div>
                        <div>
                          <div
                            disableFocusRipple={true}
                            disableRipple={true}
                            className={'heightInherit'}
                            style={{ textTransform: 'none' }}
                          >
                            <div
                              className={['measureBox', 'heightInherit'].join(' ')}
                              style={{ cursor: 'default' }}
                            >
                              <div style={{ flex: '4' }}>
                                <div className={['midPaneInformation'].join(' ')}>
                                  {assesseeAssignment.assesseeAssignmentName}
                                </div>
                                {
                                assesseeAssignment.assesseeAssignmentDescription === "" ? null:
                                <div
                                  style={{ textAlign: 'left' }}
                                  className={['midPaneLabel', 'textOverflow'].join(' ')}
                                >
                                  {assesseeAssignment.assesseeAssignmentDescription}
                                </div>
                                }                                
                              </div>
                              <div
                                style={{ flex: '1', display: 'flex', alignItems: 'center' }}
                                className="flex-center"
                              ></div>
                              <div
                                style={{
                                  flex: '1',
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexDirection: 'column'
                                }}
                                className="flex-center"
                              >
                                <IconButton>
                                  <Manuscript />
                                </IconButton>
                                <span style={{ fontSize: '1rem' }}>sheet</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={'containerPadding'}>
                        {
                          assesseeAssignment.assesseeAssignmentAssessment.length > 0?
                          assesseeAssignment.assesseeAssignmentAssessment.map((assesmentResult,index)=>(
                            <div key={index}>
                              <div style={{ display: 'flex' }}>
                              <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div  className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}> 
                                {assesmentResult.assesseeAssignmentAssessmentAttempted}
                                </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>
                                attempted
                              </div>
                              </div>
                              <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              >
                                {assesmentResult.assesseeAssignmentAssessmentItemResponseCorrect}
                              </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>
                                correct
                              </div>
                            </div>
                              <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              >
                                {assesmentResult.assesseeAssignmentAssessmentItemResponseTotal}
                              </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>total</div>
                            </div>

                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              ></div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}></div>
                            </div>
                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              ></div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}></div>
                            </div>
                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              ></div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}></div>
                            </div>
                            </div>
                              <div style={{ display: 'flex' }}>
                                <div
                            className={['measureBox', 'heightInherit'].join(' ')}
                            style={{ cursor: 'default' }}>
                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start', fontSize: '1rem' }}
                              >
                                {convertToLocalTime(assesmentResult.assesseeAssignmentAssessmentTimeline.assesseeAssignmentAssessmentTimeStart)}
                              </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>start</div>
                            </div>
                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start', fontSize: '1rem' }}
                              >
                                {convertToLocalTime(assesmentResult.assesseeAssignmentAssessmentTimeline.assesseeAssignmentAssessmentTimeEnd)}
                              </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>end</div>
                            </div>
                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start', fontSize: '1rem' }}
                              >
                                {'19 Mins, 29 Secs'}
                              </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>time</div>
                            </div>
                          </div>

                                </div>
                            </div>
                          ))
                          :
                          <div>
                             
                          </div>
                        }
                        </div>
                        
                        <div className={'containerPadding'}>
                                                  
                        </div>
                      </div>
                    )}
                    {selectedBadge === 'evaluation' && (
                      <div>
                        <div>
                          <div
                            disableFocusRipple={true}
                            disableRipple={true}
                            className={'heightInherit'}
                            style={{ textTransform: 'none' }}
                          >
                            <div
                              className={['measureBox', 'heightInherit'].join(' ')}
                              style={{ cursor: 'default' }}
                            >
                              <div style={{ flex: '4' }}>
                                <div className={['midPaneInformation'].join(' ')}>
                                  {assesseeAssignment.assesseeAssignmentName}
                                </div>
                                {
                                  assesseeAssignment.assesseeAssignmentDescription===""?null:
                                  <div 
                                  style={{ textAlign: 'left' }}
                                  className={['midPaneLabel', 'textOverflow'].join(' ')}
                                >
                                  {assesseeAssignment.assesseeAssignmentDescription}
                                </div>
                                }                                
                              </div>
                              <div
                                style={{
                                  flex: '1',
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexDirection: 'column'
                                }}
                                className="flex-center"
                              >
                                -<span style={{ fontSize: '1rem' }}>grade</span>
                              </div>{' '}
                              <div
                                style={{
                                  flex: '1',
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexDirection: 'column'
                                }}
                                className="flex-center"
                              >
                                -<span style={{ fontSize: '1rem' }}>sheet</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={'containerPadding'}>
                          <div style={{ display: 'flex' }}>
                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              >
                                {assesseeAssignment.assesseeAssignmentMaximum}
                              </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>
                                maximum
                              </div>
                            </div>
                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              >
                                {assesseeAssignment.assesseeAssignmentMinimum}
                              </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>
                                minimum
                              </div>
                            </div>
                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              ></div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}></div>
                            </div>

                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              >
                                {assesseeAssignment.assesseeAssignmentPercentage}
                              </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>
                                percentage
                              </div>
                            </div>
                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              >
                                {assesseeAssignment.assesseeAssignmentPercentile}
                              </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>
                                percentile
                              </div>
                            </div>
                            <div className={['unitFlex', 'unitFlexTop'].join(' ')}>
                              <div
                                className={['unitFlex', 'midPaneInformation'].join(' ')}
                                style={{ alignItems: 'flex-start' }}
                              >
                                {assesseeAssignment.assesseeAssignmentScore}
                              </div>
                              <div className={['unitFlex', 'reports-center'].join(' ')}>tally</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* {allocationList.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      //   onClickRevise={reviseAllocation}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    // <DisplayPanelAccordianInformation
                    //   //   onClickRevise={reviseAllocation}
                    //   accordianObject={ob}
                    //   mode={reviewMode}
                    // />
                    
                  )}
                </div>
              );
            })} */}
          </Paper>
        </div>
      </>
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionOneAssesseeReport;
