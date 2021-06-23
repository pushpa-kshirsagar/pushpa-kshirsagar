import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import { makeAssociateNodeObj } from '../../Actions/GenericActions';
import {
  FILTERMODE,
  GET_ALLOCATE_ASSOCIATE,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';

const DisplayPaneThreeSectionTwoAssociateType = () => {
  // const [listExpand, setListExpand] = useState('');
  const dispatch = useDispatch();
  const { reviewMode, responseObject, relatedReviewListPaneThree } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, countPage } = useSelector((state) => state.DisplayPaneTwoReducer);
  // const { informationEngagement, informationSetup } = responseObject;
  // function capitalizeFirstLetter(string) {
  //   if (!string) return '';
  //   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  // }
  let associate = relatedReviewListPaneThree[0]?.associate || [];

  let associateArray = [];
  associate.forEach((ob) => {
    const { id, informationBasic } = ob;
    associateArray.push({
      id,
      textOne: informationBasic?.associateName || '',
      textTwo: informationBasic?.associateDescription || 'No Information',
      status: ''
    });
  });

  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'associate',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: associateArray
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];
  const onclickReviseAssociate = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    console.log('ASSESSEE CLICK :::::::>>>>>>>', labelName);
    if (labelName === 'associate' && selectedBadgeName === 'distinct') {
      let requestObect = makeAssociateNodeObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        associateTypeName: responseObject.informationBasic.associateTypeName,
        associateTypeDescription: responseObject.informationBasic.associateTypeDescription,
        associateTypeStatus: responseObject.informationEngagement.associateTypeStatus
      };
      let existingAssesseeId = [];
      if (relatedReviewListPaneThree && relatedReviewListPaneThree[0]?.associate) {
        existingAssesseeId =
          relatedReviewListPaneThree &&
          relatedReviewListPaneThree[0].associate.map((val) => {
            return val.id;
          });
      }
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'associateTypeAssociateRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_ASSOCIATE,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingAssesseeId: existingAssesseeId,
          typeOfMiddlePaneList: 'associatesTypeAssociateReviewList'
        }
      });
    }
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 355px)',
        overflow: 'overlay'
      }}
    >
      <>
        <div className={'containerPadding'}>
          <Paper className={'dossierContainerTop'}>
            {list2.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <AccordianListCard
                      onClickRevise={onclickReviseAssociate}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <AccordianInfoCard
                      onClickRevise={onclickReviseAssociate}
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  )}
                </div>
              );
            })}
          </Paper>
        </div>
      </>
      {isMobile && (
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      )}
    </div>
  );
};

export default DisplayPaneThreeSectionTwoAssociateType;
