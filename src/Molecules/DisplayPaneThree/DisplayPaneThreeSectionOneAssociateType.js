import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import { SET_POPUP_VALUE } from '../../actionType';

const DisplayPaneThreeSectionOneAssociateType = () => {
  // const [listExpand, setListExpand] = useState('');
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const dispatch = useDispatch();
  const { informationEngagement, informationAllocation, informationSetup } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  let associateTypeGroupList = [];
  const tempTypeGroup = informationAllocation?.associateTypeGroup;
  if (tempTypeGroup) {
    associateTypeGroupList.push({
      id: tempTypeGroup?.id || '',
      textOne: tempTypeGroup?.informationBasic?.associateTypeGroupName || '',
      textTwo: tempTypeGroup?.informationBasic?.associateTypeGroupDescription || '',
      status: ''
    });
  }
  // const allocationList = [
  //   {
  //     id: 'a1',
  //     labelTextOneOne: 'group',
  //     labelTextOneOneBadgeOne: '',
  //     labelTextOneOneBadgeTwo: '',
  //     labelTextOneOneBadgeThree: '',
  //     labelTextOneOneBadgeFour: '',
  //     labelTextOneOneBadges: [
  //       {
  //         labelTextOneOneBadge: '',
  //         innerList: associateTypeGroupList
  //       }
  //     ],
  //     innerInfo: 'No Information',
  //     isListCard: true
  //   }
  // ];
  const list3 = [
    {
      id: 'a1',
      labelTextOneOne: 'log',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'all',
          textOne: ''
        },
        {
          labelTextOneOneBadge: 'key',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a2',
      textOneOne:
        capitalizeFirstLetter(informationEngagement?.associateTypeStatus) || 'No Information',
      labelTextOneOne: 'status',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    },
    {
      id: 'a3',
      labelTextOneOne: 'tag',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          textOne:
            informationEngagement?.associateTypeTag?.associateTypeTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationEngagement?.associateTypeTag?.associateTypeTagSecondary || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    },
    {
      id: 'a4',
      labelTextOneOne: 'tenure',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'start',
          textOne:
            informationEngagement?.associateTypeTenure?.associateTypeTenureDateTimeStart ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement?.associateTypeTenure?.associateTypeTenureDateTimeEnd ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    }
  ];

  const classificationList = [
    // {
    //   id: 'a-classification',
    //   labelTextOneOne: 'classification',
    //   labelTextOneOneBadgeOne: '',
    //   labelTextOneOneBadgeTwo: '',
    //   labelTextOneOneBadgeThree: '',
    //   labelTextOneOneBadgeFour: '',
    //   labelTextOneOneBadges: [
    //     {
    //       labelTextOneOneBadge: '',
    //       innerList: []
    //     }
    //   ],
    //   innerInfo: 'No Information',
    //   isListCard: true
    // }
    {
      id: 'a1',
      textOneOne:
        informationSetup?.associateTypeClassification.associateTypeClassificationPrimary ||
        'No Information',
      labelTextOneOne: 'classification',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    }
  ];
  const reviseClassification = (e) => {
    debugger;
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
    if(labelName==='classification'){
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'GROUPPOPUP', popupMode: 'associatesTYPECREATE' }
      });
    }    
  };

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
            {list3.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation accordianObject={ob} mode={reviewMode} />
                  )}
                </div>
              );
            })}
          </Paper>
        </div>
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            {classificationList.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      onClickRevise={reviseClassification}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      onClickRevise={reviseClassification}
                      accordianObject={ob}
                      mode={reviewMode}
                    />
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

export default DisplayPaneThreeSectionOneAssociateType;
