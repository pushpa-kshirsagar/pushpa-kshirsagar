import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MIDDLEPANE_STATE, SET_SELECTED_ASSOCIATE } from '../actionType';
import { GET_SIGNED_ASSESSEE_PERMISSION_SAGA } from '../actionType';
import ReviewList from '../Molecules/ReviewList/ReviewList';

const AssesseeDistinctReviewList = (props) => {
  const { userData } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const onClickReviewList = (e) => {
  };
  return (
    <>
      {props.tempAssociateList.map((associate, index) => {
            return (
              <div className="containerPadding" key={index}>
                <ReviewList
                  className=""
                  id={associate.id}
                  status={associate.status}
                  textOne={associate.textOne}
                  textTwo={associate.textTwo}
                  isTooltipActive={associate.isTooltipActive}
                />
              </div>
            );
          })}
    </>
  );
};
export default AssesseeDistinctReviewList;
