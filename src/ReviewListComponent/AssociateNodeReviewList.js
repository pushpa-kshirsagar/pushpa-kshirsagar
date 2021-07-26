import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FILTERMODE_ENABLE,
  POPUP_OPEN,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_POPUP_STATE
} from '../actionType';
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import { FilterList, AccountTree } from '@material-ui/icons';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import {
  ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION,
  ASSESSMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION,
  ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION,
  ASSOCIATE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION,
  GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
} from '../PopUpConfig';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
import '../reactSortableTree.css';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { Fragment } from 'react';
import { getInternalNodeApiCall } from '../Actions/AssociateModuleAction';
import Card from '../Molecules/Card/Card';
import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
const AssociateNodeReviewList = (props) => {
  const dispatch = useDispatch();
  const { countPage } = useSelector((state) => state.AssesseeCreateReducer);
  const { cardValue } = useSelector((state) => state.PopUpReducer);
  const {
    reviewListDistinctData,
    middlePaneSelectedValue,
    selectedAssociateInfo,
    nodeViewState,
    scanString,
    searchFocusIndex,
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    middlePaneHeaderBadgeThree,
    isSelectActive,
    selectedTagsArray,
    unselectedTagsArray
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
    console.log(event);
    console.log(node);
    let selectedGroup = {};
    let nodeId = node;
    let nodeStatus = event.currentTarget.getAttribute('status');
    if (target === 'hirarchy') {
      console.log(node.node.id);
      nodeId = node.node.id;
      nodeStatus = node.node.status;
    }
    let optArr = [...GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION];
    if (
      middlePaneHeader === 'assessees' ||
      middlePaneHeader === 'administrators' ||
      middlePaneHeader === 'managers' ||
      middlePaneHeader === 'culture profiles' ||
      middlePaneHeader === 'job profiles' ||
      middlePaneHeader === 'items'
    ) {
      let reviseHeader = middlePaneHeader;
      let popupContentArrValue = ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION.map((obj) =>
        obj.data === 'assessees' ? { ...obj, data: middlePaneHeader, dataValue: reviseHeader } : obj
      );
      optArr = popupContentArrValue;
    }

    if (middlePaneHeader === 'assessments')
      optArr = [...ASSESSMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION];
    if (middlePaneHeader === 'assignments')
      optArr = [...ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION];
    if (middlePaneHeader === 'associates')
      optArr = [...ASSOCIATE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION];
    if (middlePaneHeader === 'associate') {
      let newObj = {
        data: 'create',
        dataValue: 'create',
        dataKey: 'createKey',
        optionClass: 'optionPrimary',
        disabled: false
      };
      optArr.splice(2, 0, newObj);
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
          cardValue === 'Card' ? GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION : optArr,
        selectedTagValue: nodeId,
        selectedTagStatus: nodeStatus
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: cardValue === 'Card' ? GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION : optArr
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
    console.log(selectedGroup);
  };
  const changedNode = (node) => {
    console.log(node.id);
    let dragedNodeId = node.id;
    let dragedNodeParentId = '';
    reviewListDistinctData.map((nodeData) => {
      console.log('nodeData', nodeData);
      nodeData.children.map((chnode) => {
        console.log(chnode.id);
        if (dragedNodeId === chnode.id) {
          dragedNodeParentId = nodeData.id;
        }
      });
    });
    // console.log('treedata', reviewListDistinctData);
  };
  useEffect(() => {
    // dispatch({
    //   type: SET_DISPLAY_TWO_SINGLE_STATE,
    //   payload: { stateName: 'scanString', value: 'scanString' }
    // });
  }, [reviewListDistinctData]);
  return (
    <div>
      {reviewListDistinctData.length > 0 && (
        <>
          {nodeViewState === 'hierarchy' ? (
            <div style={{ minheight: 'calc(100vh - 135px)' }} key={scanString}>
              <SortableTree
                treeData={reviewListDistinctData}
                onChange={(treeData) => {
                  treeData.length === 1 &&
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
              {reviewListDistinctData && (
                <div className="containerPadding">
                  <Card
                    textOneOne={
                      reviewListDistinctData[0].associateNodeRoot.informationBasic.associateNodeName
                    }
                    textTwoOne={
                      reviewListDistinctData[0].associateNodeRoot.informationBasic
                        .associateNodeDescription
                    }
                    isIcon={false}
                    labelTwoTwo={''}
                    onClickIconOne={null}
                    onClick={(event) => {
                      openNodeListPopup(
                        reviewListDistinctData[0].associateNodeRoot.id,
                        event,
                        'list',
                        true
                      );
                    }}
                    isAlliance
                    className={'iguru-iconboxSVG'}
                  />
                </div>
              )}
              {reviewListDistinctData &&
                reviewListDistinctData[0].associateNodeDescendantAll.map((item, index) => {
                  return (
                    <div className="containerPadding" key={index}>
                      <ReviewList
                        className=""
                        id={index}
                        tag={item.id}
                        isSelectedReviewList={middlePaneSelectedValue === item.id}
                        status={item.informationEngagement.associateNodeStatus}
                        actualStatus={item.informationEngagement.associateNodeStatus}
                        textOne={item.informationBasic.associateNodeName}
                        textTwo={item.informationBasic.associateNodeDescription}
                        isTooltipActive={false}
                        onClickEvent={(event) => {
                          openNodeListPopup(item.id, event, 'list', true);
                        }}
                        isSelectActive={isSelectActive}
                        isSelected={selectedTagsArray.includes(item.id)}
                        onClickCheckBox={(event) => {
                          onClickCheckBoxSelection(
                            selectedTagsArray,
                            unselectedTagsArray,
                            event,
                            dispatch
                          );
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
export default AssociateNodeReviewList;
