import React, { useEffect, useRef, useState } from 'react';
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
import FooterIconTwo from '../Molecules/FooterIcon/FooterIconTwo';
import { FilterList, AccountTree } from '@material-ui/icons';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { makeAssociateReviewListRequestObject } from '../Actions/GenericActions';
import {
  ASSOCIATE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION,
  GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION
} from '../PopUpConfig';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
import '../reactSortableTree.css';
import { getAssociateNodeApiCall, sortingListInAsc } from '../Actions/AssociateModuleAction';
import { Fragment } from 'react';
import Card from '../Molecules/Card/Card';
import { assesseeStatus } from '../Actions/StatusAction';
const IguruNodeReviewList = (props) => {
  const dispatch = useDispatch();
  const [renderComp, setRenderComp] = useState(false);
  const inputRef = useRef(null);
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
    let optArr = [...GROUP_NODE_ROLE_TYPE_REVIEW_LIST_POPUP_OPTION];
    console.log(node);
    console.log(event.currentTarget.getAttribute('status'));
    let nodeStatus = '';
    let selectedGroup = {};
    let nodeId = node;
    if (target === 'hirarchy') {
      console.log(node);
      nodeId = node?.node?.id || '';
      nodeStatus = node?.node?.status || '';
    } else {
      nodeStatus = event.currentTarget.getAttribute('status');
    }
    let newObj = {
      data: 'create',
      dataValue: 'create',
      dataKey: 'create',
      optionClass: 'optionPrimary',
      disabled: false
    };
    optArr.splice(2, 0, newObj);
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'associates',
        popupHeaderOneBadgeOne: '',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: optArr,
        selectedTagValue: nodeId,
        selectedTagStatus: nodeStatus
      }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'middlePaneListPopupOptions',
        value: optArr
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'middlePaneListPopup' });
    console.log(selectedGroup);
  };
  const changedNode = (node) => {
    console.log(node);
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
                  treeData.length === 1 &&
                    dispatch({
                      type: SET_DISPLAY_TWO_SINGLE_STATE,
                      payload: { stateName: 'reviewListDistinctData', value: treeData }
                    });
                }}
                searchQuery={scanString}
                searchFocusOffset={searchFocusIndex}
                searchFinishCallback={(matches) => {
                  dispatch({
                    type: SET_DISPLAY_TWO_SINGLE_STATE,
                    payload: {
                      stateName: 'searchFocusIndex',
                      value: matches.length > 0 ? searchFocusIndex % matches.length : 0
                    }
                  });
                }}
                canDrag={({ node }) => true && !node.parentId}
                onMoveNode={({ node }) => changedNode(node)}
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
                <Card
                  textOneOne={
                    reviewListDistinctData[0].associateRoot.informationBasic.associateName
                  }
                  textTwoOne={
                    reviewListDistinctData[0].associateRoot.informationBasic.associateDescription
                  }
                  isIcon={false}
                  labelTwoTwo={''}
                  onClickIconOne={null}
                  onClick={(event) => {
                    openNodeListPopup(
                      reviewListDistinctData[0].associateRoot.id,
                      event,
                      'list',
                      true
                    );
                  }}
                  isAlliance
                />
              )}
              {reviewListDistinctData &&
                reviewListDistinctData[0].associateDescendantAll.map((item, index) => {
                  return (
                    <div className="containerPadding" key={index}>
                      <ReviewList
                        className=""
                        id={index}
                        tag={item.id}
                        isSelectedReviewList={middlePaneSelectedValue === item.id}
                        status={assesseeStatus(
                          middlePaneHeaderBadgeTwo,
                          item.informationEngagement.associateStatus
                        )}
                        actualStatus={item.informationEngagement.associateStatus}
                        textOne={item.informationBasic.associateName}
                        textTwo={item.informationBasic.associateDescription}
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
      {FilterMode === 'associatesNodeDistinct' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
      {/* )} */}
    </div>
  );
};
export default IguruNodeReviewList;
