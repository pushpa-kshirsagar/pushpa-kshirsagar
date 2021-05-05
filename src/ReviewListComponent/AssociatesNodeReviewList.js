import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSOCIATE_POPUP_CLOSE,
  ASSOCIATE_REVIEW_DISTINCT_SAGA,
  FILTERMODE_ENABLE,
  GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
  LOADER_START,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_STATE,
  SET_REQUEST_OBJECT
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIconTwo/FooterIconTwo';
import { FilterList, AccountTree } from '@material-ui/icons';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { makeAssociateReviewListRequestObject } from '../Actions/GenericActions';
import { ASSOCIATE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
import '../reactSortableTree.css';
import { getAssociateNodeApiCall } from '../Actions/AssociateModuleAction';
import { Fragment } from 'react';
import Card from '../Molecules/Card/Card';
const AssociatesNodeReviewList = (props) => {
  const dispatch = useDispatch();
  const { secondaryOptionCheckValue, countPage } = useSelector(
    (state) => state.AssesseeCreateReducer
  );
  const {
    reviewListDistinctData,
    middlePaneSelectedValue,
    selectedAssociateInfo,
    nodeViewState,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    scanString,
    searchFocusIndex
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpValue, selectedTagValue } = useSelector((state) => state.PopUpReducer);
   const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    dispatch({ type: FILTERMODE_ENABLE });
    if (siftValue === 'list' || siftValue === 'hierarchy') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'nodeViewState', value: siftValue }
      });
      getAssociateNodeApiCall(
        selectedAssociateInfo,
        middlePaneHeaderBadgeTwo,
        countPage,
        dispatch,
        middlePaneHeaderBadgeOne,
        siftValue
      );
    }
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'view', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'hierarchy', onClick: onClickFooter, Icon: AccountTree },
    { label: 'list', onClick: onClickFooter, Icon: ListIcon }
  ];
  const openNodeListPopup = (node, event, target, canUpdate) => {
    let selectedGroup = {};
    let nodeId = '';
    if (target === 'hirarchy') {
      console.log(node);
      nodeId = node.id;
      // selectedGroup = {
      //   id: event.node.userGroupId,
      //   name: event.node.name,
      //   description: event.node.description,
      //   nodeid: event.node.id,
      //   order: event.node.order
      // };
    } else {
      console.log(node);
      nodeId = event.currentTarget.getAttribute('tag');
    }
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'associates',
        popupHeaderOneBadgeOne: 'node',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: ASSOCIATE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: nodeId
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: ASSOCIATE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
    console.log(selectedGroup);
  };
  return (
    <div>
      {reviewListDistinctData.length > 0 && (
        <>
          {nodeViewState === 'hierarchy' ? (
            <div style={{ minheight: 'calc(100vh - 135px)' }}>
              <SortableTree
                treeData={reviewListDistinctData}
                onChange={(treeData) => {
                  dispatch({
                    type: SET_DISPLAY_TWO_SINGLE_STATE,
                    payload: { stateName: 'reviewListDistinctData', value: treeData }
                  });
                }}
                searchQuery={scanString}
                searchFocusOffset={searchFocusIndex}
                searchFinishCallback={(matches) => {
                  console.log(matches);
                  dispatch({
                    type: SET_DISPLAY_TWO_SINGLE_STATE,
                    payload: {
                      stateName: 'searchFocusIndex',
                      value: matches.length > 0 ? searchFocusIndex % matches.length : 0
                    }
                  });
                }}
                theme={FileExplorerTheme}
                isVirtualized={false}
                rowHeight={55}
                scaffoldBlockPxWidth={31}
                slideRegionSize={50}
                generateNodeProps={(node) => ({
                  onClick: (event) => {
                    if (event.target.type !== 'button') {
                      openNodeListPopup(node, event, 'hirarchy', true);
                    }
                  }
                })}
              />
            </div>
          ) : (
            <Fragment>
              {reviewListDistinctData[0].map((item, index) => {
                // if (index === 0) {
                //   <Card
                //     textOneOne={item.informationBasic.associateName}
                //     textTwoOne={item.informationBasic.associateDescription}
                //     IconOne={null}
                //     isIcon={false}
                //     labelTwoTwo={''}
                //     onClickIconOne={null}
                //     isAlliance
                //   />;
                // } else {
                return (
                  <div className="containerPadding" key={index}>
                    <ReviewList
                      className=""
                      id={index}
                      tag={item.id}
                      isSelectedReviewList={middlePaneSelectedValue === item.id}
                      status={item.informationEngagement.associateStatus}
                      textOne={item.informationBasic.associateName}
                      textTwo={item.informationBasic.associateDescription}
                      isTooltipActive={false}
                      onClickEvent={(event) => {
                        openNodeListPopup(item.id, event, 'hirarchy', true);
                      }}
                    />
                  </div>
                );
                // }
              })}
            </Fragment>
          )}
        </>
      )}
      <FooterIconTwo
        FilterModeEnable={FilterModeEnable}
        FilterMode={FilterMode}
        onClick={onClickFooter}
        primaryIcon={primaryIcon}
        secondaryIcon={secondaryIcon}
      />
      {/* )} */}
    </div>
  );
};
export default AssociatesNodeReviewList;
