import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import {
  FILTERMODE,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  GET_ALLOCATE_ITEM
} from '../../actionType';
import { makeItemObj } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionTwoItemGroup = () => {
  // const [listExpand, setListExpand] = useState('');
  const { reviewMode, relatedReviewListPaneThree, responseObject } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, countPage, reviewListDistinctData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const dispatch = useDispatch();
  // const { informationEngagement, informationSetup } = responseObject;
  // function capitalizeFirstLetter(string) {
  //   if (!string) return '';
  //   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  // }

  const { informationFramework } = responseObject;
  let itemList = [];
  if (relatedReviewListPaneThree) {
    itemList = relatedReviewListPaneThree?.item || [];
  }
  let itemArray = [];
  itemList.forEach((ob) => {
    const { id, informationBasic } = ob;
    itemArray.push({
      id,
      textOne: informationBasic?.itemName || '',
      textTwo: informationBasic?.itemDescription || '',
      status: ''
    });
  });
  let clusterObj = [];
  if (informationFramework) {
    clusterObj = informationFramework?.itemGroupitemFrameworkOneCluster || [];
  }
  let clusterArray = [];
  clusterObj.forEach((ob) => {
    clusterArray.push({
      textOne: ob.itemGroupitemFrameworkOneClusterPrimary || '',
      textTwo: '',
      status: ob.clusterQuestionCount || 0
    });
  });

  let polarityObj = [];
  if (informationFramework) {
    polarityObj = informationFramework?.itemGroupitemFrameworkOneCluster || [];
  }
  let polarityArray = [];
  polarityObj.forEach((ob) => {
    polarityArray.push({
      textOne: ob.itemGroupitemFrameworkOneClusterPrimary || '',
      textTwo: '',
      status: ob.clusterQuestionCount || 0
    });
  });
  console.log(polarityArray);
  const clusterList = [
    {
      id: 'a1',
      labelTextOneOne: 'cluster',
      labelTextOneOneBadgeOne: 'primary',
      labelTextOneOneBadgeTwo: 'polarity',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'primary',
          innerList: clusterArray
        },
        {
          labelTextOneOneBadge: 'polarity',
          innerList: [
            {
              id: 'associate1',
              textOne: 'positive',
              textTwo: '',
              status: '20'
            },
            {
              id: 'associate1',
              textOne: 'negative',
              textTwo: '',
              status: '20'
            }
          ]
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'items',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: itemArray
        },
        {
          labelTextOneOneBadge: 'label',
          innerList: []
        },
        {
          labelTextOneOneBadge: 'template',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    },
    {
      id: 'a1',
      labelTextOneOne: 'scale',
      labelTextOneOneBadgeOne: 'distinct',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: polarityArray
        },
        {
          labelTextOneOneBadge: '',
          innerList: []
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];

  const onClickRevise = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'items' && selectedBadgeName === 'distinct') {
      console.log('item CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let requestObect = makeItemObj(selectedAssociateInfo, 'active', -1, -1);
      let revisedGroupObject = {
        id: responseObject.id,
        itemGroupName: responseObject.informationBasic.itemGroupName,
        itemGroupDescription: responseObject.informationBasic.itemGroupDescription,
        itemGroupStatus: responseObject.informationEngagement.itemGroupStatus
      };
      let existingItemId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree[0].item.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'itemGroupItemeRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ITEM,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingItemId: existingItemId,
          typeOfMiddlePaneList: 'itemGroupItemReviewList'
        }
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
            {clusterList.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      onClickRevise={onClickRevise}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      onClickRevise={onClickRevise}
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

export default DisplayPaneThreeSectionTwoItemGroup;
