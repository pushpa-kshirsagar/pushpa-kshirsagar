import { SET_SECTION_REDUCER_STATE, CLEAR_SECTION_REDUCER_STATE } from '../actionType';
const initialState = {
  sectionInformation: {
    assessmentSectionName: null,
    assessmentSectionDescription: null,
    assessmentSectionAdministrationRepeat: false,
    assessmentSectionAdministrationReset: false,
    assessmentSectionAdministrationShuffle: false,
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
    assessmentSectionItemPractice: false,
    assessmentSectionItemTotal: 0,
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
    assessmentSectionTime: null
  }
};

const SectionCreateReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case SET_SECTION_REDUCER_STATE:
      return {
        ...istate,
        sectionInformation: action.payload
      };
    case CLEAR_SECTION_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default SectionCreateReducer;
