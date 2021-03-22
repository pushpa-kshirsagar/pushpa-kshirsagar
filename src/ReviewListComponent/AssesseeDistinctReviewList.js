import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ASSESSEE_REVIEW_DISTINCT_SAGA, INCREMENT_PAGE, SET_PAGE_COUNT } from '../actionType';
import ReviewList from '../Molecules/ReviewList/ReviewList';
const AssesseeDistinctReviewList = (props) => {
  const dispatch = useDispatch();
  const { assesseeReviewListReqObj, assesseeReviewListDistinctData } = useSelector(
    (state) => state.AssesseeCreateReducer
  );
  const { numberPage, scanCount } = useSelector((state) => state.DisplayPaneReducer);
  const onClickReviewList = (e) => {};
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
    if (assesseeReviewListDistinctData.length < scanCount) {
      let obj = {
        ...assesseeReviewListReqObj,
        numberPage: numberPage
      };
      dispatch({ type: ASSESSEE_REVIEW_DISTINCT_SAGA, payload: obj });
      dispatch({ type: SET_PAGE_COUNT, payload: numberPage + 1 });
    }
  };
  useEffect(() => {
    console.log(assesseeReviewListDistinctData);

    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };
  return (
    <>
      {assesseeReviewListDistinctData &&
        assesseeReviewListDistinctData.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                tag={
                  item.informationEngagement.assesseeTag
                    ? item.informationEngagement.assesseeTag.assesseeTagPrimary
                    : item
                }
                status={
                  item.informationEngagement.assesseeStatus === 'CONFIRMED' ? 'active' : 'inactive'
                }
                textOne={
                  item.informationBasic.assesseeNameFirst +
                  ' ' +
                  item.informationBasic.assesseeNameOther +
                  ' ' +
                  item.informationBasic.assesseeNameLast +
                  ' ' +
                  item.informationBasic.assesseeNameSuffix
                }
                textTwo={item.informationBasic.assesseeAlias}
                isTooltipActive={false}
                onClickEvent={null}
              />
            </div>
          );
        })}
    </>
  );
};
export default AssesseeDistinctReviewList;
