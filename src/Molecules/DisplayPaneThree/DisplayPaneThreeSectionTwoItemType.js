import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import { makeItemObj } from '../../Actions/GenericActions';
import {
  FILTERMODE,
  GET_ALLOCATE_ITEM,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';

const DisplayPaneThreeSectionTwoItemType = () => {
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
  let itemList = [];
  if (relatedReviewListPaneThree) {
    itemList = relatedReviewListPaneThree.item;
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
  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'items',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: itemArray
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];

  const onclickReviseItem = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'items' && selectedBadgeName === 'distinct') {
      console.log('item CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let requestObect = makeItemObj(selectedAssociateInfo, 'active', countPage, 0);
      let revisedTypeObject = {
        id: responseObject.id,
        itemTypeName: responseObject.informationBasic.itemTypeName,
        itemTypeDescription: responseObject.informationBasic.itemTypeDescription,
        itemTypeStatus: responseObject.informationEngagement.itemTypeStatus
      };
      let existingItemId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree.item.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'itemTypeItemeRevise' }
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
          revisedGroupObject: revisedTypeObject,
          existingItemId: existingItemId,
          typeOfMiddlePaneList: 'itemTypeItemReviewList'
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
            {list2.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      onClickRevise={onclickReviseItem}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                      onClickRevise={onclickReviseItem}
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

export default DisplayPaneThreeSectionTwoItemType;
