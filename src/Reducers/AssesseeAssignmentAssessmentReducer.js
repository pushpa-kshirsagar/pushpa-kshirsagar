import {
  CLEAR_ASSESSEE_ASSESSMENT_REDUCER_STATE,
  SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE
} from '../actionType';

const initialState = {
  assesseeAssignmentAssessmentData: null,
  assesseeAssessmentStartData: null,
  isExamMode: false
};

const AssesseeAssignmentAssessmentReducer = (istate = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE:
      return {
        ...istate,
        [action.payload.stateName]: action.payload.value
      };
    case CLEAR_ASSESSEE_ASSESSMENT_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default AssesseeAssignmentAssessmentReducer;
