import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AllocationAccordian from '../Accordian/AllocationAccordian';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import {
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_PANE_THREE_ITEM_PREVIEW_MODE,
  SET_POPUP_VALUE
} from '../../actionType';

const DisplayPaneThreeSectionTwoItem = () => {
  const [listExpand, setListExpand] = useState('');
  const { responseObject, headerOneBadgeTwo, reviewMode } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const itemFrameworkOne = responseObject?.informationFramework?.itemFrameworkOne;
  // const { countPage, selectedAssociateInfo, selectedTagValue } = useSelector(
  //   (state) => state.DisplayPaneTwoReducer
  // );
  const dispatch = useDispatch();
  // const { informationContact, informationCredential, informationFramework } = responseObject;
  const itemTypeList = itemInformation?.informationFramework.itemTypeList || [];
  const datatypeItem = itemTypeList.find(
    (item) => item.id === responseObject.informationFramework?.itemFrameworkOne.itemFrameworkOneType
  );
  let clusterObj = [];
  if (itemFrameworkOne) {
    const tempArr = itemFrameworkOne.itemFrameworkOneCluster;
    tempArr.forEach((ob) => {
      clusterObj.push({
        textOne: ob.itemFrameworkOneClusterPrimaryLabel || '',
        textTwo: '',
        status: ''
      });
    });
  }
  let scaleObj = [];
  if (itemFrameworkOne) {
    const tempArr = itemFrameworkOne.itemFrameworkOneScale;
    tempArr.forEach((ob) => {
      scaleObj.push({
        textOne: ob.itemFrameworkOneScaleLabel || '',
        textTwo: '',
        status: ''
      });
    });
  }
  const frameworkList = [
    {
      id: 'a2',
      labelTextOneOne: 'cluster',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: clusterObj
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a-level',
      labelTextOneOne: 'level',
      isListCard: false,
      textOneOne: itemFrameworkOne?.itemFrameworkOneLevel || 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a1-media',
      labelTextOneOne: 'media',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false,
      IconOne: null,
      IconTwo: null,
      isReviewLink: true
    },
    {
      id: 'a-polarity',
      labelTextOneOne: 'polarity',
      isListCard: false,
      textOneOne: itemFrameworkOne?.itemFrameworkOnePolarity || 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a2',
      labelTextOneOne: 'scale',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: scaleObj
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a3',
      labelTextOneOne: 'score',
      isListCard: false,
      textOneOne: itemFrameworkOne?.itemFrameworkOneScore || 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a4',
      labelTextOneOne: 'time',
      isListCard: false,
      textOneOne: itemFrameworkOne?.itemFrameworkOneTime || 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a5',
      labelTextOneOne: 'type',
      isListCard: false,
      textOneOne: datatypeItem?.itemFrameworkOneTypeNameReference || 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    },
    {
      id: 'a6',
      labelTextOneOne: 'weightage',
      isListCard: false,
      textOneOne: itemFrameworkOne?.itemFrameworkOneWeightage || 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    }
  ];

  const reviseFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log(labelName);
    if (labelName === 'media') {
      dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: true });
    }
    if (labelName === 'score') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ITEMSCOREPOPUP', popupMode: 'ITEMCREATE' }
      });
    }
    if (labelName === 'level') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ITEMLEVELPOPUP', popupMode: 'ITEMCREATE' }
      });
    }
    if (labelName === 'time') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ITEMTIMEPOPUP', popupMode: 'ITEMCREATE' }
      });
    }
    if (labelName === 'weightage') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ITEMWEITAGEPOPUP', popupMode: 'ITEMCREATE' }
      });
    }
    if (labelName === 'polarity') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ITEMPOLARITYPOPUP', popupMode: 'ITEMCREATE' }
      });
    }
    if (labelName === 'scale') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'ITEMSCALEPOPUP', popupMode: 'ITEMCREATE' }
      });
    }
    if (labelName === 'type') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'FRAMEWORKONETYPEPOPUP', popupMode: 'ITEMCREATE' }
      });
    }
  };
  const reviewFramework = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'media') {
      dispatch({ type: SET_PANE_THREE_ITEM_PREVIEW_MODE, payload: true });
    }
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 355px)',
        overflow: 'overlay'
      }}
    >
      {headerOneBadgeTwo === 'all' ? (
        <>
          <div className="containerPadding">
            <AllocationAccordian
              headerOne="framework"
              isDisplayCardExpanded={listExpand === 'framework'}
              setListExpand={setListExpand}
              list={frameworkList}
              mode={reviewMode}
              onClickRevise={reviseFramework}
              onClickReview={reviewFramework}
            />
          </div>
        </>
      ) : (
        <>
          <div className="containerPadding">
            <Paper className={'dossierContainerTop'}>
              {frameworkList.map((ob) => {
                return (
                  <div key={ob.id}>
                    {ob.isListCard ? (
                      <DisplayPanelAccordianReviewListOne
                        onClickRevise={reviseFramework}
                        className=""
                        accordianObject={ob}
                        mode={reviewMode}
                        onClickReview={reviewFramework}
                      />
                    ) : (
                      <DisplayPanelAccordianInformation
                        onClickRevise={reviseFramework}
                        accordianObject={ob}
                        mode={reviewMode}
                        onClickReview={reviewFramework}
                      />
                    )}
                  </div>
                );
              })}
            </Paper>
          </div>
        </>
      )}
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionTwoItem;
