import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTERMODE_ENABLE } from '../actionType';
import FooterIconTwo from '../Molecules/FooterIconTwo/FooterIconTwo';
import { FilterList, AccountTree } from '@material-ui/icons';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import 'react-sortable-tree/style.css';

import '../reactSortableTree.css';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { Fragment } from 'react';
const AssesseeAssociateReviewList = (props) => {
  const dispatch = useDispatch();
  const { reviewListDistinctData, middlePaneSelectedValue } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const [reviewListData, setReviewListData] = useState([]);
  const onClickFooter = (e) => {
    dispatch({ type: FILTERMODE_ENABLE });
  };
  useEffect(() => {
    let reviewListData = reviewListDistinctData?.assesseeAssociate || [];
    setReviewListData(reviewListData);
  }, [reviewListDistinctData]);
  /* for middle pane */
  const primaryIcon = [{ label: 'view', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'hierarchy', onClick: onClickFooter, Icon: AccountTree },
    { label: 'list', onClick: onClickFooter, Icon: ListIcon }
  ];
  console.log('reviewListDistinctData', reviewListDistinctData);
  console.log('reviewListData', reviewListData);
  return (
    <div>
      <Fragment>
        {reviewListData.length > 0 &&
          reviewListData.map((item, index) => {
            return (
              <div className="containerPadding" key={index}>
                <ReviewList
                  className=""
                  id={index}
                  tag={item.associateId}
                  isSelectedReviewList={middlePaneSelectedValue === item.associateId}
                  status={item.associateStatus}
                  textOne={item.associateId}
                  textTwo={item.associateId}
                  isTooltipActive={false}
                  onClickEvent={null}
                />
              </div>
            );
            // }
          })}
      </Fragment>
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
export default AssesseeAssociateReviewList;
