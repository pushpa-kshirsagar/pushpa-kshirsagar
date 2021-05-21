import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTERMODE_ENABLE, LOADER_START } from '../actionType';
import FooterIconTwo from '../Molecules/FooterIconTwo/FooterIconTwo';
import { FilterList } from '@material-ui/icons';
import 'react-sortable-tree/style.css';
import Check from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import '../reactSortableTree.css';
import ReviewList from '../Molecules/ReviewList/ReviewList';
import { Fragment } from 'react';
import { ASSESSEE_ASSOCIATE_LINK_REVISE_SAGA } from '../actionType';
import { onClickCheckBoxSelection } from '../Actions/AssesseeModuleAction';
import { SIGN_IN_URL } from '../endpoints';
import { useHistory } from 'react-router-dom';
const AssesseeAssociateReviewList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    reviewListDistinctData,
    middlePaneSelectedValue,
    selectedTagsArray,
    isSelectActive,
    unselectedTagsArray,
    selectedAssociateInfo,
    errorResponse
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const onClickFooter = (e) => {
    let siftValue = e.currentTarget.getAttribute('data-value');
    if (siftValue === 'finish') {
      if (selectedTagsArray.length > 0) {
        let linkAssociateObj = [];
        selectedTagsArray.map((data) => {
          let splitData = data.split('_');
          let obj = {
            assesseeTagPrimary: splitData[0],
            associateTagPrimary: splitData[1],
            assesseeSignInCredentialSecondary: splitData[2]
          };
          linkAssociateObj.push(obj);
        });
        let requestObect = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          associate: linkAssociateObj
        };
        console.log('requestObect', requestObect);
        dispatch({ type: LOADER_START });
        dispatch({ type: ASSESSEE_ASSOCIATE_LINK_REVISE_SAGA, payload: { request: requestObect } });
      }
    }
    dispatch({ type: FILTERMODE_ENABLE });
  };

  useEffect(() => {
    if (errorResponse.responseCode === '000') {
      let path = SIGN_IN_URL;
      history.push(path);
    }
  }, [errorResponse]);

  /* for middle pane */
  const primaryIcon = [{ label: 'revise', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'cancel', onClick: onClickFooter, Icon: ClearIcon },
    { label: 'finish', onClick: onClickFooter, Icon: Check }
  ];

  return (
    <div>
      <Fragment>
        {reviewListDistinctData.length > 0 &&
          reviewListDistinctData.map((item, index) => {
            return (
              <div className="containerPadding" key={index}>
                <ReviewList
                  className=""
                  id={index}
                  tag={
                    item.assesseeId +
                    '_' +
                    item.associateId +
                    '_' +
                    item.assesseeSignInCredentialSecondary
                  }
                  isSelectedReviewList={middlePaneSelectedValue === item.associateId}
                  status={item.associateStatus}
                  textOne={item.associateName}
                  textTwo={item.associateDescription}
                  isTooltipActive={false}
                  onClickEvent={null}
                  isSelectActive={isSelectActive}
                  isSelected={selectedTagsArray.includes(
                    item.assesseeId +
                      '_' +
                      item.associateId +
                      '_' +
                      item.assesseeSignInCredentialSecondary
                  )}
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
