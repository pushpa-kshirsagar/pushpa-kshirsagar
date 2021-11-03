import {
  CLEAR_ASSESSEE_ASSESSMENT_REDUCER_STATE,
  SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
  SET_ASSESSEE_ASSESSMENT_ISASSESSMENTSTART_STATE,
  SET_ASSESSEE_ASSESSMENT_COMMUNIQUE_STATE,
  SET_ASSESSEE_ASSESSMENT_MENUSCRIPT_STATE,
  SET_ASSESSEE_ASSESSMENT_SYNOPSIS_STATE,
  SET_ASSESSEE_ASSESSMENT_SECTION_COMMUNIQUE_STATE,
  SET_ASSESSEE_ASSESSMENT_SECTION_MENUSCRIPT_STATE,
  SET_ASSESSEE_ASSESSMENT_SECTION_SYNOPSIS_STATE
} from '../actionType';

const initialState = {
  assesseeAssignmentAssessmentData: null,
  assesseeAssessmentStartData: null,
  isExamMode: false,
  isAssessmentStart: '',
  asssignmentStarted: '',
  currentSectionIndexValue: 0,
  currentSequenceIndex: 0,
  currentAssessmentSectionSequenceIndex: 0,
  assessmentsequenceObject: [],
  sectionMenuscript: [],
  sectionSynopsis: [],
  sectionCommunique: [],
  assessmentCommunique: [],
  assessmentMenuscript: [],
  assessmentSynopsis: [],
  assignmentsequenceObject:[],
  assignmentCommunique:[],
  assignmentManuscript:[],
  assignmentSynopsis:[]
  //indexPointer:0// for communique,menuscriptm
};

const AssesseeAssignmentAssessmentReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  console.log('action', action);
  switch (action.type) {
    case SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE:
      return {
        ...istate,
        [action.payload.stateName]: action.payload.value
      };
    case SET_ASSESSEE_ASSESSMENT_ISASSESSMENTSTART_STATE:
      return {
        ...istate,
        isAssessmentStart: action.payload
      };
    case SET_ASSESSEE_ASSESSMENT_COMMUNIQUE_STATE:
      return {
        ...istate,
        assessmentCommunique: [
          ...istate.assessmentCommunique,
          action.payload
        ]
      };
    case SET_ASSESSEE_ASSESSMENT_MENUSCRIPT_STATE:
      return {
        ...istate,
        assessmentMenuscript: [
          ...istate.assessmentMenuscript,
          action.payload
        ]
      };
    case SET_ASSESSEE_ASSESSMENT_SYNOPSIS_STATE:
      return {
        ...istate,
        assessmentSynopsis: [
          ...istate.assessmentSynopsis,
          action.payload
        ]
      };
    case SET_ASSESSEE_ASSESSMENT_SECTION_COMMUNIQUE_STATE:
      return {
        ...istate,
        sectionCommunique: [
          ...istate.sectionCommunique,
          action.payload
        ]
      };
    case SET_ASSESSEE_ASSESSMENT_SECTION_MENUSCRIPT_STATE:
      return {
        ...istate,
        sectionMenuscript: [
          ...istate.sectionMenuscript,
          action.payload
        ]
      };
    case SET_ASSESSEE_ASSESSMENT_SECTION_SYNOPSIS_STATE:
      return {
        ...istate,
        sectionSynopsis: [
          ...istate.sectionSynopsis,
          action.payload
        ]
      };

    case CLEAR_ASSESSEE_ASSESSMENT_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default AssesseeAssignmentAssessmentReducer;
