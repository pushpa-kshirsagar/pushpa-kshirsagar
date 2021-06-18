import React from 'react';
import { isMobile } from 'react-device-detect';
// import AllocationAccordian from '../Accordian/AllocationAccordian';
// import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import AccordianListCard from '../Accordian/AccordianListCard';
import AccordianInfoCard from '../Accordian/AccordianInfoCard';
import { Paper } from '@material-ui/core';
import {
  makeAssessmentReviewListRequestObject,
  makeCultureProfileObj
} from '../../Actions/GenericActions';
import {
  FILTERMODE,
  GET_ALLOCATE_CULTURE,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';

const DisplayPaneThreeSectionTwoCultureProfileGroup = () => {
  // const [listExpand, setListExpand] = useState('');
  const { reviewMode, relatedReviewListPaneThree, responseObject } = useSelector(
    (state) => state.DisplayPaneThreeReducer
  );
  const { selectedAssociateInfo, countPage, reviewListDistinctData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const dispatch = useDispatch();
  const { informationEngagement, informationSetup } = responseObject;

  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  let cultureProfileList = [];
  if (relatedReviewListPaneThree) {
    cultureProfileList = relatedReviewListPaneThree.cultureProfile;
  }
  let cultureProfileArray = [];
  cultureProfileList.forEach((ob) => {
    const { id, informationBasic } = ob;
    cultureProfileArray.push({
      id,
      textOne: informationBasic?.cultureProfileName || '',
      textTwo: informationBasic?.cultureProfileDescription || '',
      status: ''
    });
  });

  const list2 = [
    {
      id: 'a1',
      labelTextOneOne: 'culture profile',
      labelTextOneOneBadgeOne: '',
      labelTextOneOneBadgeTwo: '',
      labelTextOneOneBadgeThree: '',
      labelTextOneOneBadgeFour: '',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          innerList: cultureProfileArray
        }
      ],
      innerInfo: 'No Information',
      isListCard: true
    }
  ];

  const onclickReviseCultureProfile = (e) => {
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');
    if (labelName === 'culture profile' && selectedBadgeName === 'distinct') {
      console.log('culture profile CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let requestObect = makeCultureProfileObj(selectedAssociateInfo, 'active', 0, countPage);
      let revisedGroupObject = {
        id: responseObject.id,
        cultureProfileGroupName: responseObject.informationBasic.cultureProfileGroupName,
        cultureProfileGroupDescription:
          responseObject.informationBasic.cultureProfileGroupDescription,
        cultureProfileGroupStatus: responseObject.informationEngagement.cultureProfileGroupStatus
      };
      let existingCultureProfileId =
        relatedReviewListPaneThree &&
        relatedReviewListPaneThree.cultureProfile.map((val) => {
          return val.id;
        });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'cultureProfileGroupCultureProfileRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      // dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: GET_ALLOCATE_CULTURE,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingCultureProfileId: existingCultureProfileId,
          typeOfMiddlePaneList: 'cultureProfileGroupCultureProfileReviewList'
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
                      onClickRevise={onclickReviseCultureProfile}
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <AccordianInfoCard
                      onClickRevise={onclickReviseCultureProfile}
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

export default DisplayPaneThreeSectionTwoCultureProfileGroup;
