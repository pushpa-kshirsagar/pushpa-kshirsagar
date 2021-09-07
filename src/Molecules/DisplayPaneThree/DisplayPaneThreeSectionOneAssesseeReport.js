import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { InputLabel, Paper } from '@material-ui/core';
import { getTypeGroupReviewListApi } from '../../Actions/AssesseeModuleAction';
import { SET_POPUP_VALUE } from '../../actionType';

const DisplayPaneThreeSectionOneAssesseeReport = () => {
  // const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationEngagement, informationAllocation } = responseObject;
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
            {allocationList.map((ob) => {
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
                    <DisplayPanelAccordianInformation
                      //   onClickRevise={reviseAllocation}
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                    // <div className={'detailsContactContainer'}>
                    //   <div className={'detsailsPadding'}>
                    //     <div
                    //       style={{ height: '50px' }}
                    //       className={['FormBox', 'detailsHeight'].join(' ')}
                    //     >
                    //       <div className={['formControlReviewName', 'formControlRight'].join(' ')}>
                    //         <div style={{ width: '100%' }}>
                    //           <InputLabel
                    //             htmlFor="name-input"
                    //             className={[
                    //               'textForLabel',
                    //               'textForLabelRight',
                    //               'careerLabelRight'
                    //             ].join(' ')}
                    //           >
                    //             <span
                    //               style={{
                    //                 marginBottom: '5px',
                    //                 display: 'inline-block'
                    //               }}
                    //               className={'reviewLabelClass'}
                    //               data-value={'assessments'}
                    //               data-key={'assessments' || ''}
                    //             >
                    //               {'assessments'}
                    //               <sup >analytic</sup>
                    //               <sup>evaluation</sup>
                    //             </span>
                    //           </InputLabel>
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                  )}
                </div>
              );
            })}
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
