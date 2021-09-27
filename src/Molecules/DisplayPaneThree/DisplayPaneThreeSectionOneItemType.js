import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import { SET_POPUP_VALUE } from '../../actionType';
import { getTypeGroupReviewListApi } from '../../Actions/AssesseeModuleAction';

const DisplayPaneThreeSectionOneItemType = () => {
  // const [listExpand, setListExpand] = useState('');
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { informationEngagement, informationAllocation, informationSetup } = responseObject;
  const dispatch = useDispatch();
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  let itemTypeGroupList = [];
  const tempTypeGroup = informationAllocation?.itemTypeGroup;
  if (tempTypeGroup) {
    itemTypeGroupList.push({
      id: tempTypeGroup?.id || '',
      textOne: tempTypeGroup?.informationBasic?.itemTypeGroupName || '',
      textTwo: tempTypeGroup?.informationBasic?.itemTypeGroupDescription || '',
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
  //         innerList: itemTypeGroupList
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
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a2',
      textOneOne: capitalizeFirstLetter(informationEngagement?.itemTypeStatus) || 'No Information',
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
          textOne: informationEngagement?.itemTypeTag?.itemTypeTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne: informationEngagement?.itemTypeTag?.itemTypeTagSecondary || 'No Information'
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
            informationEngagement?.itemTypeTenure?.itemTypeTenureDateTimeStart || 'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement?.itemTypeTenure?.itemTypeTenureDateTimeEnd || 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];

  const classificationList = [
    // {
    //   id: 'a1',
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
        informationSetup?.itemTypeClassification.itemTypeClassificationPrimary || 'No Information',
      labelTextOneOne: 'classification',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    }
  ];
  const reviseClassification = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
    if (labelName === 'classification') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'GROUPPOPUP', popupMode: 'itemsTYPECREATE' }
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

export default DisplayPaneThreeSectionOneItemType;
