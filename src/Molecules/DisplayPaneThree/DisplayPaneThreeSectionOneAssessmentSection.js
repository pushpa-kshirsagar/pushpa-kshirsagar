import React from 'react';
import { isMobile } from 'react-device-detect';
import Manuscript from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPanelAccordianReviewListOne from '../Accordian/DisplayPanelAccordianReviewListOne';
import DisplayPanelAccordianInformation from '../Accordian/DisplayPanelAccordianInformation';
import { Paper } from '@material-ui/core';
import { FILTERMODE, GET_ALLOCATE_ITEM, LOADER_START, SET_DISPLAY_TWO_SINGLE_STATE, SET_MOBILE_PANE_STATE, SET_PANE_THREE_ASSESSMENT_SECTION_PREVIEW_MODE, SET_POPUP_VALUE } from '../../actionType';
import { makeItemObj } from '../../Actions/GenericActions';

const DisplayPaneThreeSectionOneAssessmentSection = () => {
  const dispatch = useDispatch();
  const { responseObject, reviewMode,relatedReviewListPaneThree } = useSelector((state) => state.DisplayPaneThreeReducer);
  
  const { selectedAssociateInfo, countPage, reviewListDistinctData } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const { informationEngagement, informationAllocation, informationSetup } = responseObject;
  const assessmentSectionInfo=useSelector((state)=>state.SectionCreateReducer);
  const frameworkAll = [
    {
      id: 'administration',
      labelTextOneOne: 'administration',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'repeat',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'reset',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'shuffle',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false
      // IconOne: Manuscript
    },
    {
      id: 'aid',
      labelTextOneOne: 'aid',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'calculator',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'type',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'spredsheet',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'type',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'textsheet',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'permission',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'type',
              innerLabelBadgeList: 'No Information'
            }
          ]
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
      // IconOne: Manuscript
    },
    {
      id: 'a1',
      labelTextOneOne: 'communiqué',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a2',
      textOneOne: 'No Information',
      labelTextOneOne: 'evaluation',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    },
    {
      id: 'a4',
      labelTextOneOne: 'items',
      isListCard: false,
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'label',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'navigation',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'practice',
          textOne: 'No Information'
        },
        {
          labelTextOneOneBadge: 'total',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessment',
      IconOne: null
    },
    {
      id: 'm1',
      labelTextOneOne: 'manuscript',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          textOne: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'preview-assessment',
      labelTextOneOne: 'preview',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: '',
          textOne: ''
        },
        {
          labelTextOneOneBadge: '',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: null,
      isReviewLink: true
    },
    {
      id: 'response',
      labelTextOneOne: 'response',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'extremum',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'maximum',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'minimum',
              innerLabelBadgeList: 'No Information'
            }
          ]
        },
        {
          labelTextTwoBadge: 'label',
          innerLabelBadgeList: 'No Information'
        },
        {
          labelTextTwoBadge: 'revise',
          innerLabelBadgeList: 'No Information'
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'score',
      labelTextOneOne: 'score',
      labelTextOneOneBadges: [
        {
          labelTextTwoBadge: 'extremum',
          innerLabelBadgeList: [
            {
              labelTextTwoBadge: 'maximum',
              innerLabelBadgeList: 'No Information'
            },
            {
              labelTextTwoBadge: 'minimum',
              innerLabelBadgeList: 'No Information'
            }
          ]
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      isReviewLink: false,
      isMultiInfoCard: true
    },
    {
      id: 'a2',
      textOneOne: 'No Information',
      labelTextOneOne: 'sequence',
      innerAssociateList: [],
      innerInfo: 'No Information',
      isListCard: false
    },
    {
      id: 'synopsis',
      labelTextOneOne: 'synopsis',
      labelTextOneOneBadges: [
        {
          labelTextOneOneBadge: 'distinct',
          textOne: ''
        }
      ],
      innerAssociateList: [],
      innerInfo: 'assessees',
      isListCard: false,
      IconOne: Manuscript
    },
    {
      id: 'a6',
      labelTextOneOne: 'time',
      isListCard: false,
      textOneOne: responseObject?.assessmentTime || 'No Information',
      innerAssociateList: [],
      innerInfo: 'No Information',
      IconOne: null
    }
  ];
  const reviseFramework = (e, selectedBadgeArray) => {
    debugger;
    const labelName = e.currentTarget.getAttribute('data-value');
    const selectedBadgeName = e.currentTarget.getAttribute('data-key');

    //console.log(selectedBadgeArray);
    let badgeName = '';
    if (selectedBadgeArray) {
      if (selectedBadgeArray.length > 0) {
        selectedBadgeArray.forEach((element) => {
          badgeName = badgeName + element.labelTextTwoBadge;
        });
      }
    }
    if (labelName === 'items' && selectedBadgeName === 'distinct') {
      console.log('item CLICK :::::::>>>>>>>', relatedReviewListPaneThree);
      let requestObect = makeItemObj(selectedAssociateInfo, 'active', -1, -1);
      let revisedGroupObject = {
        id: responseObject.id,
        assessmentSectionName: responseObject.assessmentSectionName,
        assessmentSectionDescription: responseObject.assessmentSectionDescription,
        //itemGroupStatus: responseObject.informationEngagement.itemGroupStatus
      };
      let existingItemId =[]
        // relatedReviewListPaneThree &&
        // relatedReviewListPaneThree[0].item.map((val) => {
        //   return val.id;
        // });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assessmentSectionItemRevise' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ALLOCATE_ITEM,
        payload: {
          request: requestObect,
          revisedGroupObject: revisedGroupObject,
          existingItemId: existingItemId,
          typeOfMiddlePaneList: 'assessmentSectionItemDistinctReviewList'
        }
      });
    }
    if (labelName === 'preview') {
      dispatch({ type: SET_PANE_THREE_ASSESSMENT_SECTION_PREVIEW_MODE, payload: true });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
    }
  };
  
  const onClickReview = (e) => {
    const headerOne = e.currentTarget.getAttribute('data-value');
    const badgeOne = e.currentTarget.getAttribute('data-key');
    if (headerOne === 'preview') {
      dispatch({ type: SET_PANE_THREE_ASSESSMENT_SECTION_PREVIEW_MODE, payload: true });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneFive' });
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
            {frameworkAll.map((ob) => {
              return (
                <div key={ob.id}>
                  {ob.isListCard ? (
                    <DisplayPanelAccordianReviewListOne
                      className=""
                      accordianObject={ob}
                      mode={reviewMode}
                    />
                  ) : (
                    <DisplayPanelAccordianInformation
                     accordianObject={ob}
                      mode={reviewMode}
                      onClickReview={onClickReview}
                      onClickRevise={reviseFramework} />
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

export default DisplayPaneThreeSectionOneAssessmentSection;
