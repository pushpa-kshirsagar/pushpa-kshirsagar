import React from 'react';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import { useSelector } from 'react-redux';
import './DisplayPaneTwo.css';
import AssesseeRelatedAssociateReviewList from '../../ReviewListComponent/AssesseeRelatedAssociateReviewList';
import AssesseeDistinctReviewList from '../../ReviewListComponent/AssesseeDistinctReviewList';
import AssociateDistinctReviewList from '../../ReviewListComponent/AssociateDistinctReviewList';
import AssesseeRoleDistinctReviewList from '../../ReviewListComponent/AssesseeRoleDistinctReviewList';

export const DisplayPaneTwo = (props) => {
  const { popupAllClose } = props;
  const {
    isAssociateSelected,
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    middlePaneHeaderBadgeThree,
    middlePaneHeaderBadgeFour,
    typeOfMiddlePaneList,
    scanCount,
    showMiddlePaneState
  } = useSelector((state) => state.DisplayPaneTwoReducer);

  return (
    <div>
      <div>
        <HeaderCard
          className=""
          displayPane="centre"
          headerOne={middlePaneHeader}
          headerOneBadgeOne={middlePaneHeaderBadgeOne}
          headerOneBadgeTwo={middlePaneHeaderBadgeTwo}
          headerOneBadgeThree={middlePaneHeaderBadgeThree}
          headerOneBadgeFour={middlePaneHeaderBadgeFour}
          headerPanelColour="green"
          scanCount={scanCount}
          isAssociateSelected={isAssociateSelected}
          showMiddlePaneState={showMiddlePaneState}
        />
      </div>
      <div
        style={{
          height: 'calc(100vh - 207px)',
          overflow: 'overlay'
        }}
        className="containerPadding"
        id={'middleComponentId'}
      >
        {typeOfMiddlePaneList === 'assesseeRelatedAssociate' && (
          <AssesseeRelatedAssociateReviewList />
        )}
        {typeOfMiddlePaneList === 'assesseeDistinctReviewList' && (
          <AssesseeDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'associateDistinctReviewList' && (
          <AssociateDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList' && (
          <AssesseeRoleDistinctReviewList popupAllClose={popupAllClose} />
        )}
        {/* {typeOfMiddlePaneList !== '' &&
          typeOfMiddlePaneList !== 'assesseeRelatedAssociate' &&
          tempAssociateList.map((associate, index) => {
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
          })} */}
        {/* <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div> */}

        {/* for middle pane review list popup */}

        {/* <PopUpMiddlePaneList isActive={isPopUpValue === 'middlePaneListPopup'} /> */}
      </div>
    </div>
  );
};

export default DisplayPaneTwo;
