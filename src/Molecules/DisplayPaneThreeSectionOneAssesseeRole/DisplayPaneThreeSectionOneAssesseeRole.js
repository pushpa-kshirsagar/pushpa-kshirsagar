import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import { ASSESSEE_SIGN_ON, SET_STATUS_POPUP_VALUE } from '../../actionType';

const DisplayPaneThreeSectionOneAssesseeRole = () => {
  // const [listExpand, setListExpand] = useState('');
  const { responseObject, reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const { informationEngagement } = responseObject;
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const dispatch = useDispatch();
  const allocationList = [
    {
      id: 'a1',
      labelTextOneOne: 'group',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'secondary',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: []
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
        capitalizeFirstLetter(informationEngagement?.assesseeRoleStatus) || 'No Information',
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
            informationEngagement?.assesseeRoleTag?.assesseeRoleTagPrimary || 'No Information'
        },
        {
          labelTextOneOneBadge: 'secondary',
          textOne:
            informationEngagement?.assesseeRoleTag?.assesseeRoleTagSecondary || 'No Information'
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
            informationEngagement?.assesseeRoleTenure?.assesseeRoleTenureDateTimeStart ||
            'No Information'
        },
        {
          labelTextOneOneBadge: 'end',
          textOne:
            informationEngagement?.assesseeRoleTenure?.assesseeRoleTenureDateTimeEnd ||
            'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'Assessee',
      isListCard: false
    }
  ];
  const reviseEngagement = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    console.log('=====>', labelName);
    if (labelName === 'status') {
      dispatch({
        type: SET_STATUS_POPUP_VALUE,
        payload: capitalizeFirstLetter(informationEngagement?.assesseeRoleStatus)
      });
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'STATUSPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    }
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 336px)',
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
                    <AccordianListCard className="" accordianObject={ob} mode={reviewMode} />
                  ) : (
                    <AccordianInfoCard accordianObject={ob} mode={reviewMode} />
                  )}
                </div>
              );
            })}
          </Paper>
        </div>
        <div className={'containerPadding'}>
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

export default DisplayPaneThreeSectionOneAssesseeRole;
