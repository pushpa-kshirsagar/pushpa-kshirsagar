import {
  SET_SECTION_REDUCER_STATE,
  CLEAR_SECTION_REDUCER_STATE,
  SET_ASSESSMENT_SECTION_AID_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_SCORE_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_RESPONCE_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_MANUSCRIPT_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_COMMUNIQUE_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_SYNOPSIS_FRAMEWORK_STATE,
  SET_ASSESSMENT_SECTION_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_ASSESSMENT_SECTION_DYNAMIC_FRAMEWORK_STATE
} from '../actionType';
const initialState = {
  sectionInformation: {
    assessmentSectionName: null,
    assessmentSectionDescription: null,
    assessmentSectionAdministrationRepeat: false,
    assessmentSectionAdministrationReset: false,
    assessmentSectionAdministrationShuffle: false,
    assessmentSectionAdministrationSequence:[],
    assessmentSectionAid: {
      assessmentSectionAidCalculatorPermission: false,
      assessmentSectionAidCalculatorType: '',
      assessmentSectionAidSpreadsheetPermission: false,
      assessmentSectionAidSpreadsheetType: '',
      assessmentSectionAidTextsheetPermission: false,
      assessmentSectionAidTextsheetType: ''
    },
    assessmentSectionCommunique: [],
    assessmentSectionEvaluation: false,
    assessmentSectionItemDistinct: [],
    assessmentSectionItemFrameworkOneLabel: '',
    assessmentSectionItemNavigation: {
      assessmentSectionItemNavigationFirst: true,
      assessmentSectionItemNavigationLast: true,
      assessmentSectionItemNavigationNext: true,
      assessmentSectionItemNavigationPrevious: true,
      assessmentSectionItemNavigationSkip: true
    },
    assessmentSectionItemTotal: 0,
    assessmentSectionItemTrial: [],
    assessmentSectionManuscript: [],
    assessmentSectionResponseExtremum: {
      assessmentSectionResponseExtremumMaximum: null,
      assessmentSectionResponseExtremumMinimum: null
    },
    assessmentSectionItemFrameworkOneResponseLabel: '',
    assessmentSectionItemFrameworkOneResponseRevise: false,
    assessmentSectionScoreExtremum: {
      assessmentSectionScoreExtremumMaximum: null,
      assessmentSectionScoreExtremumMinimum: null
    },
    assessmentSectionSequence: 0,
    assessmentSectionSynopsis: [],
    assessmentSectionTime: null,
    assessmentSectionItemGroup:[],
    assessmentSectionItemDistinctRevise: [],
    assessmentSectionItemDistinctReviseObject: null,
    assessmentSectionItemFrameworkOneDistinct:[]
  }
};

const SectionCreateReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case SET_SECTION_REDUCER_STATE:
      return {
        ...istate,
        sectionInformation: action.payload
      };
    case SET_ASSESSMENT_SECTION_AID_FRAMEWORK_STATE:
      return {
        ...istate,
        sectionInformation: {
          ...istate.sectionInformation,
          assessmentSectionAid: action.payload
        }
      };
    case SET_ASSESSMENT_SECTION_SCORE_FRAMEWORK_STATE:
      return {
        ...istate,
        sectionInformation: {
          ...istate.sectionInformation,
          assessmentSectionScoreExtremum: action.payload
        }
      };
    case SET_ASSESSMENT_SECTION_RESPONCE_FRAMEWORK_STATE:
      return {
        ...istate,
        sectionInformation: {
          ...istate.sectionInformation,
          assessmentSectionResponseExtremum: action.payload
        }
      };
    case SET_ASSESSMENT_SECTION_MANUSCRIPT_FRAMEWORK_STATE:
      return {
        ...istate,
        sectionInformation: {
          ...istate.sectionInformation,
          assessmentSectionManuscript: [
            ...istate.sectionInformation.assessmentSectionManuscript,
            action.payload
          ]
        }
      };
    case SET_ASSESSMENT_SECTION_COMMUNIQUE_FRAMEWORK_STATE:
      return {
        ...istate,
        sectionInformation: {
          ...istate.sectionInformation,
          assessmentSectionCommunique: [
            ...istate.sectionInformation.assessmentSectionCommunique,
            action.payload
          ]
        }
      };
    case SET_ASSESSMENT_SECTION_SYNOPSIS_FRAMEWORK_STATE:
      return {
        ...istate,
        sectionInformation: {
          ...istate.sectionInformation,
          assessmentSectionSynopsis: [
            ...istate.sectionInformation.assessmentSectionSynopsis,
            action.payload
          ]
        }
      };
      case SET_ASSESSMENT_SECTION_FRAMEWORK_DYNAMIC_SINGLE_STATE:
        return {
          ...istate,
          sectionInformation: {
            ...istate.sectionInformation,
            assessmentSectionItemDistinctReviseObject: {
              ...istate.sectionInformation.assessmentSectionItemDistinctReviseObject,
              itemFrameworkOne: {
                ...istate.sectionInformation.assessmentSectionItemDistinctReviseObject.itemFrameworkOne,
                [action.payload.stateName]: action.payload.value
              }
            }
          }
        };
        case SET_ASSESSMENT_SECTION_DYNAMIC_FRAMEWORK_STATE:
      return {
        ...istate,
        sectionInformation: {
          ...istate.sectionInformation,
          [action.payload.stateName]: action.payload.value
        }
      };
      case CLEAR_SECTION_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default SectionCreateReducer;
