import React from 'react';
import DisplayPanelAccordianHeader from './DisplayPanelAccordianHeader';
import DisplayPanelAccordianReviewListOne from './DisplayPanelAccordianReviewListOne';
import './DisplayPanelAccordian.css';
import DisplayPanelAccordianInformation from './DisplayPanelAccordianInformation';
import DisplayPanelAccordianReviewListTwo from './DisplayPanelAccordianReviewListTwo';

export const AllocationAccordian = (props) => {
  const {
    isDisplayCardExpanded,
    headerOne,
    setListExpand,
    list = [],
    mode = '',
    onClickRevise,
    onClickReview,
    getReviewList = null
  } = props;

  return (
    <DisplayPanelAccordianHeader
      isDisplayCardExpanded={isDisplayCardExpanded}
      headerOne={headerOne}
      setListExpand={setListExpand}
    >
      {list.map((ob) => {
        return (
          <div key={ob.id}>
            {ob.isListCard ? (
              <>
                {ob.isMultiList ? (
                  <DisplayPanelAccordianReviewListTwo
                    onClickRevise={onClickRevise}
                    accordianObject={ob}
                    mode={mode}
                    getReviewList={getReviewList}
                  />
                ) : (
                  <DisplayPanelAccordianReviewListOne
                    className=""
                    onClickRevise={onClickRevise}
                    accordianObject={ob}
                    mode={mode}
                    getReviewList={getReviewList}
                  />
                )}
              </>
            ) : (
              <DisplayPanelAccordianInformation
                onClickReview={onClickReview}
                onClickRevise={onClickRevise}
                accordianObject={ob}
                mode={mode}
                getReviewList={getReviewList}
              />
            )}
          </div>
        );
      })}
    </DisplayPanelAccordianHeader>
  );
};

export default AllocationAccordian;
