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
import { FilterList } from '@material-ui/icons';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { makeAssociateReviewListRequestObject } from '../Actions/GenericActions';
import { ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
import '../reactSortableTree.css';
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
  const { isPopUpValue, selectedTagValue } = useSelector((state) => state.PopUpReducer);
  const [isFetching, setIsFetching] = useState(false);
  const [nodeTreeData, setTreeData] = useState([]);
  const [secondaryIconData, setSecondaryIconData] = useState([]);

  console.log(reviewListDistinctData);
  console.log('reviewListDistinctData');
  useEffect(() => {
    // setTreeData(dummytreeData);
    setTreeData(dummytreeData);
  }, []);

  const siftApiCall = (siftKey) => {
    let requestObect = makeAssociateReviewListRequestObject(
      selectedAssociateInfo,
      siftKey,
      0,
      countPage
    );
    dispatch({ type: SET_PAGE_COUNT, payload: 1 });
    dispatch({ type: LOADER_START });
    dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
    dispatch({
      type: ASSOCIATE_REVIEW_DISTINCT_SAGA,
      payload: {
        request: requestObect,
        BadgeOne: 'distinct',
        BadgeTwo: siftKey
      }
    });
    dispatch({ type: ASSOCIATE_POPUP_CLOSE });
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
        { label: 'hierarchy', onClick: onClickFooter, Icon: AccountTreeIcon },
        { label: 'list', onClick: onClickFooter, Icon: FilterList }
      ];
      setSecondaryIconData(secondaryIcon);
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
      {nodeTreeData && (
        <div style={{ minheight: 'calc(100vh - 135px)' }}>
          <SortableTree
            treeData={nodeTreeData}
            onChange={(treeData) => setTreeData(treeData)}
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
      )}
      {/* {reviewListDistinctData &&
        reviewListDistinctData.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={item.id}
                isSelectedReviewList={middlePaneSelectedValue === item.id}
                status={item.informationEngagement.assignmentTypeStatus}
                textOne={item.informationBasic.assignmentTypeName}
                textTwo={item.informationBasic.assignmentTypeDescription}
                isTooltipActive={false}
                onClickEvent={openListPopup}
              />
            </div>
          );
        })} */}
      {/* {FilterMode === 'associateNodeDistinctactive' && ( */}
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
export default InternalNodeReviewList;
