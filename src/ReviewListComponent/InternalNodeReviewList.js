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
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { makeAssociateReviewListRequestObject } from '../Actions/GenericActions';
import {
  ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION,
  ASSESSMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION,
  ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION,
  ASSOCIATE_REVIEW_LIST_POPUP_OPTION
} from '../PopUpConfig';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
import '../reactSortableTree.css';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { Fragment } from 'react';
import { getInternalNodeApiCall } from '../Actions/AssociateModuleAction';
const InternalNodeReviewList = (props) => {
  const dispatch = useDispatch();
  const { secondaryOptionCheckValue, countPage } = useSelector(
    (state) => state.AssesseeCreateReducer
  );
  const {
    numberPage,
    scanCount,
    reviewListDistinctData,
    reviewListReqObj,
    middlePaneSelectedValue,
    selectedAssociateInfo,
    nodeViewState,
    scanString,
    searchFocusIndex,
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    middlePaneHeaderBadgeThree,
    dummytreeData = [
      {
        id: '599d09d7e4b02ef63fbad571',
        parentOrgHierarchyId: null,
        description: 'Boppo Technologies',
        children: [
          {
            id: '59ddf74ae4b0bbdc4d706c78',
            parentOrgHierarchyId: '599d09d7e4b02ef63fbad571',
            children: [
              {
                id: '59ddf784e4b0bbdc4d706c81',
                parentOrgHierarchyId: '59ddf74ae4b0bbdc4d706c78',
                children: [],
                title: 'Support Team',
                expanded: true,
                subtitle: 'Support Team'
              }
            ],
            title: 'Management Team',
            expanded: true,
            subtitle: 'Management Team'
          }
        ],
        title: 'Boppo Technologies',
        expanded: true,
        subtitle: 'Boppo Technologies'
      }
    ]
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);

  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    dispatch({ type: FILTERMODE_ENABLE });
    if (siftValue === 'list' || siftValue === 'hierarchy') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'nodeViewState', value: siftValue }
      });
      getInternalNodeApiCall(
        selectedAssociateInfo,
        middlePaneHeaderBadgeTwo,
        countPage,
        dispatch,
        middlePaneHeaderBadgeOne,
        middlePaneHeaderBadgeThree,
        siftValue,
        middlePaneHeader
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
      console.log(node.node.id);
      nodeId = node.node.id;
    } else {
      console.log(node);
      nodeId = event.currentTarget.getAttribute('tag');
    }
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: middlePaneHeader,
        popupHeaderOneBadgeOne: 'node',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue:
          (middlePaneHeader === 'assessees' && ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION) ||
          (middlePaneHeader === 'assessments' &&
            ASSESSMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION) ||
          (middlePaneHeader === 'assignments' &&
            ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION) ||
          ASSOCIATE_REVIEW_LIST_POPUP_OPTION,
        selectedTagValue: nodeId
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: ASSOCIATE_REVIEW_LIST_POPUP_OPTION
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
    console.log(selectedGroup);
  };
  const changedNode = (node) => {
    console.log(node);
    console.log('changedNode');
  };
  return (
    <div>
      {reviewListDistinctData.length > 0 && (
        <>
          {nodeViewState === 'hierarchy' ? (
            <div style={{ minheight: 'calc(100vh - 135px)' }} key={scanString}>
              <SortableTree
                treeData={reviewListDistinctData}
                onChange={(treeData) => {
                  treeData.length ===1 &&
                    dispatch({
                      type: SET_DISPLAY_TWO_SINGLE_STATE,
                      payload: { stateName: 'reviewListDistinctData', value: treeData }
                    });
                }}
                searchQuery={scanString}
                searchFocusOffset={searchFocusIndex}
                canDrag={({ node }) => true && node.parentId !== null}
                onMoveNode={({ node }) => changedNode(node)}
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
                      status={item.informationEngagement.associateNodeStatus}
                      textOne={item.informationBasic.associateNodeName}
                      textTwo={item.informationBasic.associateNodeDescription}
                      isTooltipActive={false}
                      onClickEvent={(event) => {
                        openNodeListPopup(item.id, event, 'list', true);
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
export default InternalNodeReviewList;
