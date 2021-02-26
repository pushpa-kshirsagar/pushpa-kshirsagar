import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MIDDLEPANE_STATE, SET_SELECTED_ASSOCIATE } from '../actionType';
import { GET_SIGNED_ASSESSEE_PERMISSION_SAGA } from '../actionType';
import ReviewList from '../Molecules/ReviewList/ReviewList';

const AssesseeRelatedAssociateReviewList = (props) => {
  const { userData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const onClickReviewList = (e) => {
    dispatch({
      type: SET_SELECTED_ASSOCIATE,
      payload: userData[e.currentTarget.getAttribute('data-value')]
    });
    dispatch({ type: GET_SIGNED_ASSESSEE_PERMISSION_SAGA });
    dispatch({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: '',
        middlePaneHeaderBadgeOne: '',
        middlePaneHeaderBadgeTwo: '',
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: '',
        scanCount: null
      }
    });
  };
  return (
    <>
      {userData &&
        userData.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={item.associateInformation.associateTag.associateTagPrimary}
                status={
                  item.associateInformation.associateStatus === 'VERIFIED' ? 'active' : 'inactive'
                }
                textOne={item.associateInformation.associateName}
                textTwo={item.associateInformation.associateDescription}
                isTooltipActive={false}
                onClickEvent={onClickReviewList}
              />
            </div>
          );
        })}
    </>
  );
};
export default AssesseeRelatedAssociateReviewList;
