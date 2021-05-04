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
import { ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
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
    middlePaneHeaderBadgeTwo
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpValue, selectedTagValue } = useSelector((state) => state.PopUpReducer);
  const [secondaryIconData, setSecondaryIconData] = useState([]);
  // useEffect(() => {
  //   // setTreeData(reviewListDistinctData);
  //   if (reviewListDistinctData) {
  //     if (nodeViewState === 'hierarchy') {
  //       alert('aaa');
  //       setTreeData(reviewListDistinctData);
  //     } else {
  //       alert('bbb');
  //       setTreeData(reviewListDistinctData);
  //     }
  //   }
  // }, [reviewListDistinctData, nodeTreeData]);

  const siftApiCall = (siftKey) => {
    document.getElementById('middleComponentId').scrollTop = '0px';
  };

  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    let secondaryIcon = [];
    if (siftValue === 'sift') {
      secondaryIcon = [
        { label: 'primary', onClick: onClickFooter, Icon: FilterList },
        { label: 'secondary', onClick: onClickFooter, Icon: FilterList }
      ];
      setSecondaryIconData(secondaryIcon);
    }
    if (siftValue === 'view') {
      secondaryIcon = [
        { label: 'hierarchy', onClick: onClickFooter, Icon: AccountTree },
        { label: 'list', onClick: onClickFooter, Icon: ListIcon }
      ];
      setSecondaryIconData(secondaryIcon);
    }
    if (siftValue === 'list' || siftValue === 'hierarchy') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'nodeViewState', value: siftValue }
      });
      getAssociateNodeApiCall(
        selectedAssociateInfo,
        middlePaneHeaderBadgeOne,
        countPage,
        dispatch,
        middlePaneHeaderBadgeTwo,
        siftValue
      );
    }
    // if (siftValue === 'primary' || siftValue === 'terminated') siftApiCall(siftValue);
    dispatch({ type: FILTERMODE_ENABLE });
  };
  /* for middle pane */
  const primaryIcon = [
    { label: 'sift', onClick: onClickFooter, Icon: FilterList },
    { label: 'view', onClick: onClickFooter, Icon: FilterList }
  ];
  const openListPopup = (e) => {
    console.log(e.currentTarget.getAttribute('tag'));
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'associate',
        popupHeaderOneBadgeOne: 'node',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: e.currentTarget.getAttribute('tag')
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
  };
  const openNodeListPopup = (node, event, target, canUpdate) => {
    console.log(node);
    console.log(event);
    let selectedGroup = {};
    // if (target === 'hirarchy') {
    //   selectedGroup = {
    //     id: event.node.userGroupId,
    //     name: event.node.name,
    //     description: event.node.description,
    //     nodeid: event.node.id,
    //     order: event.node.order
    //   };
    // }
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
                // onChange={(treeData) => setTreeData(treeData)}
                onChange={(treeData) => {
                  dispatch({
                    type: SET_DISPLAY_TWO_SINGLE_STATE,
                    payload: { stateName: 'reviewListDistinctData', value: treeData }
                  });
                }}
                theme={FileExplorerTheme}
                isVirtualized={false}
                rowHeight={55}
                scaffoldBlockPxWidth={31}
                slideRegionSize={50}
                canDrag={({ node }) => (node.parentOrgHierarchyId !== null ? true : false)}
                // onMoveNode={({ node }) => changedNode(node) }
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
                      onClickEvent={openListPopup}
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
        secondaryIcon={secondaryIconData}
      />
      {/* )} */}
    </div>
  );
};
export default AssociatesNodeReviewList;
