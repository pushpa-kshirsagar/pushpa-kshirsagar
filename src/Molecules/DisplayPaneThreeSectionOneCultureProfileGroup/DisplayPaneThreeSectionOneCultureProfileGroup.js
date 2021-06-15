import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import { SET_POPUP_VALUE, SET_STATUS_POPUP_VALUE } from '../../actionType';

const DisplayPaneThreeSectionOneCultureProfileGroup = () => {
  // const [listExpand, setListExpand] = useState('');
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const dispatch = useDispatch();
  const { informationEngagement } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const allocationList = [
    {
      id: 'a2',
      labelTextOneOne: 'manager',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: [
            {
              id: 'associate1',
              textOne: 'Simple Sample 01',
              textTwo: 'Manager',
              status: 'active'
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'Manager',
              status: 'active'
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'Manager',
              status: 'active'
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a3',
      labelTextOneOne: 'node',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: [
            {
              id: 'associate1',
              textOne: 'Simple Sample 01',
              textTwo: 'Node',
              status: ''
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'Node',
              status: ''
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'Node',
              status: ''
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a4',
      labelTextOneOne: 'type',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: [
            {
              id: 'associate1',
              textOne: 'Simple Sample 01',
              textTwo: 'type',
              status: ''
            },
            {
              id: 'associate2',
              textOne: 'Simple Sample 02',
              textTwo: 'type',
              status: ''
            },
            {
              id: 'associate3',
              textOne: 'Simple Sample 03',
              textTwo: 'type',
              status: ''
            }
          ]
        },
        {
          labelTextOneOneBadge: 'secondary',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];
  const engagementList = [
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
      textOneOne:
        capitalizeFirstLetter(informationEngagement?.cultureProfileGroupStatus) || 'No Information',
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
            informationEngagement?.cultureProfileGroupTag?.cultureProfileGroupTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationEngagement?.cultureProfileGroupTag?.cultureProfileGroupTagSecondary ||
            'No Information'
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
            informationEngagement?.cultureProfileGroupTenure?.cultureProfileGroupTenureDateTimeStart ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement?.cultureProfileGroupTenure?.cultureProfileGroupTenureDateTimeEnd ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  const reviseAllocation = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName, selectedBadgeName);
    if (labelName === 'manager') {
      if (selectedBadgeName === 'primary') {
        // dispatch({
        //   type: SET_POPUP_VALUE,
        //   payload: { isPopUpValue: 'MANAGERLISTPOPUP', popupMode: 'cultureProfilesGROUPCREATE' }
        // });
      }
      if (selectedBadgeName === 'secondary') {
        // dispatch({
        //   type: SET_POPUP_VALUE,
        //   payload: {
        //     isPopUpValue: 'MANAGERSECONDARYLISTPOPUP',
        //     popupMode: 'cultureProfilesGROUPCREATE'
        //   }
        // });
      }
    }
    if (labelName === 'node') {
      if (selectedBadgeName === 'primary') {
        // dispatch({
        //   type: SET_POPUP_VALUE,
        //   payload: { isPopUpValue: 'NODELISTPOPUP', popupMode: 'cultureProfilesGROUPCREATE' }
        // });
      }
      if (selectedBadgeName === 'secondary') {
        // dispatch({
        //   type: SET_POPUP_VALUE,
        //   payload: { isPopUpValue: 'NODESECONDARYLISTPOPUP', popupMode: 'cultureProfilesGROUPCREATE' }
        // });
      }
    }
    if (labelName === 'type') {
      if (selectedBadgeName === 'primary') {
        // dispatch({
        //   type: SET_POPUP_VALUE,
        //   payload: { isPopUpValue: 'TYPELISTPOPUP', popupMode: 'cultureProfilesGROUPCREATE' }
        // });
      }
      if (selectedBadgeName === 'secondary') {
        // dispatch({
        //   type: SET_POPUP_VALUE,
        //   payload: { isPopUpValue: 'TYPESECONDARYLISTPOPUP', popupMode: 'cultureProfilesGROUPCREATE' }
        // });
      }
    }
  };
  const reviseEngagement = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('=====>', labelName);
    if (labelName === 'status') {
      // dispatch({
      //   type: SET_STATUS_POPUP_VALUE,
      //   payload: capitalizeFirstLetter(informationEngagement?.cultureProfileGroupStatus)
      // });
      // dispatch({
      //   type: SET_POPUP_VALUE,
      //   payload: { isPopUpValue: 'STATUSPOPUP', popupMode: 'cultureProfilesGROUPCREATE' }
      // });
    }
    if (labelName === 'tag') {
      if (selectedBadgeName === 'primary') {
        // dispatch({
        //   type: SET_POPUP_VALUE,
        //   payload: { isPopUpValue: 'TAGREADONLYPRIMARYPOPUP', popupMode: 'cultureProfilesGROUPCREATE' }
        // });
      }
      if (selectedBadgeName === 'secondary') {
        // dispatch({
        //   type: SET_POPUP_VALUE,
        //   payload: { isPopUpValue: 'TAGSECONDARYPOPUP', popupMode: 'cultureProfilesGROUPCREATE' }
        // });
      }
    }
    if (labelName === 'tenure') {
      if (selectedBadgeName === 'start') {
        // dispatch({
        //   type: SET_POPUP_VALUE,
        //   payload: { isPopUpValue: 'TENURESATRTDATEPOPUP', popupMode: 'cultureProfilesGROUPCREATE' }
        // });
      }
      if (selectedBadgeName === 'end') {
        // dispatch({
        //   type: SET_POPUP_VALUE,
        //   payload: { isPopUpValue: 'TENUREENDDATEPOPUP', popupMode: 'cultureProfilesGROUPCREATE' }
        // });
      }
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
        <div className="containerPadding">
          <Paper className={'dossierContainerTop'}>
            {allocationList.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <AccordianListCard
                      onClickRevise={reviseAllocation}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <AccordianInfoCard
                      onClickRevise={reviseAllocation}
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  )}
                </div>
              );
            })}
          </Paper>
        </div>
        <div className="containerPadding">
          <Paper className={'dossierContainerTop'}>
            {engagementList.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <AccordianListCard
                      onClickRevise={reviseEngagement}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <AccordianInfoCard
                      onClickRevise={reviseEngagement}
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

export default DisplayPaneThreeSectionOneCultureProfileGroup;
