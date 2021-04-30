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
import { makeAssociateReviewListRequestObject } from '../Actions/GenericActions';
import { ASSIGNMENT_GROUP_NODE_TYPE_REVIEW_LIST_POPUP_OPTION } from '../PopUpConfig';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
import '../reactSortableTree.css';
const AssociateNodeAssociateReviewList = (props) => {
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
    treeData = [
      {
        id: '599d09d7e4b02ef63fbad571',
        userGroupId: '599d09d7e4b02ef63fbad570',
        parentOrgHierarchyId: null,
        description: 'Boppo Technologies',
        location: null,
        order: 1,
        isDefault: true,
        assign: null,
        name: 'Boppo Technologies',
        nodeManagers: null,
        children: [
          {
            id: '59ddf74ae4b0bbdc4d706c78',
            userGroupId: '59ddf74ae4b0bbdc4d706c77',
            parentOrgHierarchyId: '599d09d7e4b02ef63fbad571',
            description: 'Management Team',
            location: null,
            order: 2,
            isDefault: false,
            assign: null,
            name: 'Management Team',
            nodeManagers: null,
            children: [
              {
                id: '59ddf784e4b0bbdc4d706c81',
                userGroupId: '59ddf784e4b0bbdc4d706c80',
                parentOrgHierarchyId: '59ddf74ae4b0bbdc4d706c78',
                description: 'Support Team',
                location: 'Bangalore',
                order: 3,
                isDefault: false,
                assign: null,
                name: 'Support Team',
                nodeManagers: null,
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
  useEffect(() => {
    document.getElementById('middleComponentId').addEventListener('scroll', handleScroll);
  }, []);
  const handleScroll = (event) => {
    var targetPt = event.target;
    if (
      Math.ceil(targetPt.scrollHeight - targetPt.scrollTop) !== targetPt.clientHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
    console.log(isFetching);
  };
  const fetchData = async () => {
    if (reviewListDistinctData.length < scanCount) {
      let obj = {
        ...reviewListReqObj,
        numberPage: numberPage
      };
      dispatch({
        type: GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA,
        payload: {
          request: obj,
          BadgeOne: 'distinct',
          BadgeTwo: secondaryOptionCheckValue
        }
      });
      dispatch({ type: SET_PAGE_COUNT, payload: numberPage + 1 });
    }
  };
  useEffect(() => {
    console.log(reviewListDistinctData);
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };
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
    if (siftValue === 'suspended' || siftValue === 'terminated') siftApiCall(siftValue);
    dispatch({ type: FILTERMODE_ENABLE });
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'sift', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList }
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
  return (
    <div>
      {treeData && (
        <div style={{ minheight: 'calc(100vh - 135px)' }}>
          <SortableTree
            treeData={treeData}
            onChange={null}
            theme={FileExplorerTheme}
            isVirtualized={false}
            rowHeight={55}
            scaffoldBlockPxWidth={31}
            slideRegionSize={50}
            canDrag={({ node }) => null}
            onMoveNode={({ node }) => null}
            generateNodeProps={(node) => ({
              onClick: (event) => {
                // if (event.target.type != 'button') {
                //   this.props.openNodeRelatedAssesseeList(node, event, 'hirarchy', canUpdate);
                // }
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
      {FilterMode === 'assignmentsTypeDistinctinactive' && (
        <FooterIconTwo
          FilterModeEnable={FilterModeEnable}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        />
      )}
    </div>
  );
};
export default AssociateNodeAssociateReviewList;
