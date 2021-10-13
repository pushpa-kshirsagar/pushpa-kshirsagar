import {
  ASSESSMENT_POPUP_OPEN,
  CLEAR_ASSESSMENT_INFO,
  SET_ASSESSMENT_NEXT_POPUP,
  SET_ASSESSMENT_PREVIOUS_POPUP,
  SET_ASSESSMENT_SECONDARY_OPTION_VALUE,
  SET_DISPLAY_PANE_FOUR_SHOW,
  SET_ASSESSMENT_SECONDARY_POPUP,
  SET_ASSESSMENT_BASIC_REDUCER_STATE,
  SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
  SET_ASSESSMENT_FRAMEWORK_STATE,
  SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
  SET_ASSESSMENT_COMMUNIQUE_FRAMEWORK_STATE,
  SET_ASSESSMENT_SCORE_FRAMEWORK_STATE,
  SET_ASSESSMENT_MANUSCRIPT_FRAMEWORK_STATE,
  SET_ASSESSMENT_AID_FRAMEWORK_STATE,
  SET_ASSESSMENT_EVALUATION_FRAMEWORK_STATE,
  SET_ASSESSMENT_FRAMEWORK_INNER_SINGLE_STATE,
  SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_ASSESSMENT_REVISE_DYNAMIC_SINGLE_STATE
} from '../actionType';
import {
  MODULE_POPUP_OPTION,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_POPUP_OPTIONS,
  REVIEW_REVISE_POPUP
} from '../PopUpConfig';

const initialState = {
  isDisplayPaneSixShow: true,
  assessmentsHeaderOne: '',
  assessmentsPopUpType: 'primary',
  currentPopUpOption: '',
  assessmentsPopUpActive: false,
  isBackToSectionPopUp: false,
  primaryPopUpOptions: MODULE_POPUP_OPTION,
  secondaryPopUpOptions: {
    create: REVIEW_REVISE_POPUP,
    review: REVIEW_POPUP_OPTIONS,
    notifications: NOTIFICATION_REPORT_POPUP,
    reports: NOTIFICATION_REPORT_POPUP
  },
  secondaryOptionCheckValue: '',
  informationBasic: {
    assessmentName: '',
    assessmentNameVerification: false,
    assessmentDescription: '',
    assessmentPicture: '',
    assessmentPictureVerification: false,
    assessmentFlag: false
  },
  informationAlliance: {
    assessmentAuthor: {
      assessmentAuthorPrimary: [],
      assessmentAuthorSecondary: []
    }
  },
  informationAllocation: {
    assessmentGroup: {
      assessmentGroupPrimary: [],
      assessmentGroupSecondary: []
    },
    assessmentManager: {
      assessmentManagerPrimary: [],
      assessmentManagerSecondary: []
    },
    assessmentNode: {
      assessmentNodePrimary: [],
      assessmentNodeSecondary: []
    },
    assessmentType: {
      assessmentTypePrimary: [],
      assessmentTypeSecondary: []
    }
  },
  informationFramework: {
    // assessmentItem: [
    //   {
    //     id: '615acfba8016ac4135f125e4',
    //     informationFramework: {
    //       itemFrameworkOne: {
    //         itemFrameworkOneAlignment: '',
    //         itemFrameworkOneCluster: [
    //           {
    //             itemFrameworkOneClusterPrimary: '',
    //             itemFrameworkOneClusterPrimaryPolarity: ''
    //           }
    //         ],
    //         itemFrameworkOneExplanation: {
    //           itemFrameworkOneExplanationDisplay: false
    //         },
    //         itemFrameworkOneLabel: {
    //           itemFrameworkOneLabelDisplay: false,
    //           itemFrameworkOneLabelMedia: {
    //             time: '1633341545444',
    //             blocks: [
    //               {
    //                 id: '6ydeaRr2r4',
    //                 type: 'paragraph',
    //                 data: {
    //                   text:
    //                     'When set in motion, which pendulum can complete more swings in one minute?'
    //                 }
    //               }
    //             ],
    //             version: '2.22.2'
    //           }
    //         },
    //         itemFrameworkOnePassage: { itemFrameworkOnePassageDisplay: false },
    //         itemFrameworkOnePolarity: '',
    //         itemFrameworkOneResponse: '',
    //         itemFrameworkOneResponseAlignment: '',
    //         itemFrameworkOneResponseAttachment: false,
    //         itemFrameworkOneResponseCorrect: ['2'],
    //         itemFrameworkOneResponseChoice: [
    //           {
    //             itemFrameworkOneResponseChoiceAlignment: '',
    //             itemFrameworkOneResponseChoiceColumnMatch: '',
    //             itemFrameworkOneResponseChoiceExplanation: {
    //               itemFrameworkOneResponseChoiceExplanationDisplay: false,
    //               itemFrameworkOneResponseChoiceExplanationMedia: ''
    //             },
    //             itemFrameworkOneResponseChoiceMedia: {
    //               time: '1633341708657',
    //               blocks: [{ id: 'HaxlMyGdO', type: 'paragraph', data: { text: 'A' } }],
    //               version: '2.22.2'
    //             },
    //             itemFrameworkOneResponseChoiceNumber: '1',
    //             itemFrameworkOneResponseChoicePolarity: ''
    //           },
    //           {
    //             itemFrameworkOneResponseChoiceAlignment: '',
    //             itemFrameworkOneResponseChoiceColumnMatch: '',
    //             itemFrameworkOneResponseChoiceExplanation: {
    //               itemFrameworkOneResponseChoiceExplanationDisplay: false,
    //               itemFrameworkOneResponseChoiceExplanationMedia: ''
    //             },
    //             itemFrameworkOneResponseChoiceMedia: {
    //               time: '1633341716659',
    //               blocks: [
    //                 {
    //                   id: 'CG9cDuHDrI',
    //                   type: 'paragraph',
    //                   data: { text: 'B' }
    //                 }
    //               ],
    //               version: '2.22.2'
    //             },
    //             itemFrameworkOneResponseChoiceNumber: '2',
    //             itemFrameworkOneResponseChoicePolarity: ''
    //           },
    //           {
    //             itemFrameworkOneResponseChoiceAlignment: '',
    //             itemFrameworkOneResponseChoiceColumnMatch: '',
    //             itemFrameworkOneResponseChoiceExplanation: {
    //               itemFrameworkOneResponseChoiceExplanationDisplay: false,
    //               itemFrameworkOneResponseChoiceExplanationMedia: ''
    //             },
    //             itemFrameworkOneResponseChoiceMedia: {
    //               time: '1633341725179',
    //               blocks: [
    //                 {
    //                   id: 'OQPGehPekg',
    //                   type: 'paragraph',
    //                   data: { text: 'No difference' }
    //                 }
    //               ],
    //               version: '2.22.2'
    //             },
    //             itemFrameworkOneResponseChoiceNumber: '3',
    //             itemFrameworkOneResponseChoicePolarity: ''
    //           }
    //         ],
    //         itemFrameworkOneResponseExplanation: {
    //           itemFrameworkOneResponseExplanationDisplay: false
    //         },
    //         itemFrameworkOneResponseLabel: {
    //           itemFrameworkOneResponseLabelDisplay: false
    //         },
    //         itemFrameworkOneScale: [
    //           {
    //             itemFrameworkOneScale: null,
    //             itemFrameworkOneScaleScore: null,
    //             itemFrameworkOneScaleWeightage: null
    //           }
    //         ],
    //         itemFrameworkOneSection: [
    //           {
    //             itemFrameworkOneSectionSequence: 1,
    //             itemFrameworkOneSection: {
    //               itemFrameworkOneResponseAttachment: false,
    //               itemFrameworkOneResponseChoice: [
    //                 {
    //                   itemFrameworkOneResponseChoiceAlignment: '',
    //                   itemFrameworkOneResponseChoiceColumnMatch: '',
    //                   itemFrameworkOneResponseChoiceExplanation: {
    //                     itemFrameworkOneResponseChoiceExplanationDisplay: false
    //                   },
    //                   itemFrameworkOneResponseChoiceMedia: '',
    //                   itemFrameworkOneResponseChoiceNumber: '1',
    //                   itemFrameworkOneResponseChoicePolarity: ''
    //                 },
    //                 {
    //                   itemFrameworkOneResponseChoiceAlignment: '',
    //                   itemFrameworkOneResponseChoiceColumnMatch: '',
    //                   itemFrameworkOneResponseChoiceExplanation: {
    //                     itemFrameworkOneResponseChoiceExplanationDisplay: false
    //                   },
    //                   itemFrameworkOneResponseChoiceNumber: '2',
    //                   itemFrameworkOneResponseChoicePolarity: ''
    //                 },
    //                 {
    //                   itemFrameworkOneResponseChoiceAlignment: '',
    //                   itemFrameworkOneResponseChoiceColumnMatch: '',
    //                   itemFrameworkOneResponseChoiceExplanation: {
    //                     itemFrameworkOneResponseChoiceExplanationDisplay: false,
    //                     itemFrameworkOneResponseChoiceExplanationMedia: ''
    //                   },
    //                   itemFrameworkOneResponseChoiceNumber: '3',
    //                   itemFrameworkOneResponseChoicePolarity: ''
    //                 }
    //               ],
    //               itemFrameworkOneType: ''
    //             }
    //           }
    //         ],
    //         itemFrameworkOneType: '61090cace50cf61d5eb440ce',
    //         itemFrameworkOneWord: {
    //           itemFrameworkOneWordMaximum: '',
    //           itemFrameworkOneWordMinimum: ''
    //         },
    //         itemFrameworkOneMedia: {
    //           time: '1633341668315',
    //           blocks: [
    //             {
    //               id: 'QdOoWFw25x',
    //               type: 'image',
    //               data: {
    //                 file: {
    //                   url:
    //                     'https://iguru-serverless-test.s3-ap-south-1.amazonaws.com/media/Q-01.png'
    //                 },
    //                 caption: '',
    //                 withBorder: false,
    //                 stretched: false,
    //                 withBackground: false
    //               }
    //             }
    //           ],
    //           version: '2.22.2'
    //         },
    //         itemFrameworkOneScore: 1
    //       }
    //     }
    //   },
    //   {
    //     id: '615ae1c0e2646454fe4c5a3e',        
    //     informationFramework: {
    //       itemFrameworkOne: {
    //         itemFrameworkOneAlignment: '',
    //         itemFrameworkOneCluster: [
    //           {
    //             itemFrameworkOneClusterPrimary: '',
    //             itemFrameworkOneClusterPrimaryPolarity: ''
    //           }
    //         ],
    //         itemFrameworkOneExplanation: {
    //           itemFrameworkOneExplanationDisplay: false
    //         },
    //         itemFrameworkOneLabel: {
    //           itemFrameworkOneLabelDisplay: false,
    //           itemFrameworkOneLabelMedia: {
    //             time: '1633346401183',
    //             blocks: [
    //               {
    //                 id: 'i2s8donSri',
    //                 type: 'paragraph',
    //                 data: {
    //                   text: 'Which will create a smaller area of light?'
    //                 }
    //               }
    //             ],
    //             version: '2.22.2'
    //           }
    //         },
    //         itemFrameworkOnePassage: {
    //           itemFrameworkOnePassageDisplay: false
    //         },
    //         itemFrameworkOnePolarity: '',
    //         itemFrameworkOneResponse: '',
    //         itemFrameworkOneResponseAlignment: '',
    //         itemFrameworkOneResponseAttachment: false,
    //         itemFrameworkOneResponseCorrect: ['1'],
    //         itemFrameworkOneResponseChoice: [
    //           {
    //             itemFrameworkOneResponseChoiceAlignment: '',
    //             itemFrameworkOneResponseChoiceColumnMatch: '',
    //             itemFrameworkOneResponseChoiceExplanation: {
    //               itemFrameworkOneResponseChoiceExplanationDisplay: false,
    //               itemFrameworkOneResponseChoiceExplanationMedia: ''
    //             },
    //             itemFrameworkOneResponseChoiceMedia: {
    //               time: '1633346597394',
    //               blocks: [
    //                 {
    //                   id: 'blpInDuraP',
    //                   type: 'paragraph',
    //                   data: {
    //                     text: 'A'
    //                   }
    //                 }
    //               ],
    //               version: '2.22.2'
    //             },
    //             itemFrameworkOneResponseChoiceNumber: '1',
    //             itemFrameworkOneResponseChoicePolarity: ''
    //           },
    //           {
    //             itemFrameworkOneResponseChoiceAlignment: '',
    //             itemFrameworkOneResponseChoiceColumnMatch: '',
    //             itemFrameworkOneResponseChoiceExplanation: {
    //               itemFrameworkOneResponseChoiceExplanationDisplay: false,
    //               itemFrameworkOneResponseChoiceExplanationMedia: ''
    //             },
    //             itemFrameworkOneResponseChoiceMedia: {
    //               time: '1633346609797',
    //               blocks: [
    //                 {
    //                   id: '9fJ5OKjsJJ',
    //                   type: 'paragraph',
    //                   data: {
    //                     text: 'B'
    //                   }
    //                 }
    //               ],
    //               version: '2.22.2'
    //             },
    //             itemFrameworkOneResponseChoiceNumber: '2',
    //             itemFrameworkOneResponseChoicePolarity: ''
    //           },
    //           {
    //             itemFrameworkOneResponseChoiceAlignment: '',
    //             itemFrameworkOneResponseChoiceColumnMatch: '',
    //             itemFrameworkOneResponseChoiceExplanation: {
    //               itemFrameworkOneResponseChoiceExplanationDisplay: false,
    //               itemFrameworkOneResponseChoiceExplanationMedia: ''
    //             },
    //             itemFrameworkOneResponseChoiceMedia: {
    //               time: '1633346617938',
    //               blocks: [
    //                 {
    //                   id: '6NvGXKaOO5',
    //                   type: 'paragraph',
    //                   data: {
    //                     text: 'No difference'
    //                   }
    //                 }
    //               ],
    //               version: '2.22.2'
    //             },
    //             itemFrameworkOneResponseChoiceNumber: '3',
    //             itemFrameworkOneResponseChoicePolarity: ''
    //           }
    //         ],
    //         itemFrameworkOneResponseExplanation: {
    //           itemFrameworkOneResponseExplanationDisplay: false
    //         },
    //         itemFrameworkOneResponseLabel: {
    //           itemFrameworkOneResponseLabelDisplay: false
    //         },
    //         itemFrameworkOneScale: [
    //           {
    //             itemFrameworkOneScale: null,
    //             itemFrameworkOneScaleScore: null,
    //             itemFrameworkOneScaleWeightage: null
    //           }
    //         ],
    //         itemFrameworkOneSection: [
    //           {
    //             itemFrameworkOneSectionSequence: 1,
    //             itemFrameworkOneSection: {
    //               itemFrameworkOneResponseAttachment: false,
    //               itemFrameworkOneResponseChoice: [
    //                 {
    //                   itemFrameworkOneResponseChoiceAlignment: '',
    //                   itemFrameworkOneResponseChoiceColumnMatch: '',
    //                   itemFrameworkOneResponseChoiceExplanation: {
    //                     itemFrameworkOneResponseChoiceExplanationDisplay: false
    //                   },
    //                   itemFrameworkOneResponseChoiceMedia: '',
    //                   itemFrameworkOneResponseChoiceNumber: '1',
    //                   itemFrameworkOneResponseChoicePolarity: ''
    //                 },
    //                 {
    //                   itemFrameworkOneResponseChoiceAlignment: '',
    //                   itemFrameworkOneResponseChoiceColumnMatch: '',
    //                   itemFrameworkOneResponseChoiceExplanation: {
    //                     itemFrameworkOneResponseChoiceExplanationDisplay: false
    //                   },
    //                   itemFrameworkOneResponseChoiceNumber: '2',
    //                   itemFrameworkOneResponseChoicePolarity: ''
    //                 },
    //                 {
    //                   itemFrameworkOneResponseChoiceAlignment: '',
    //                   itemFrameworkOneResponseChoiceColumnMatch: '',
    //                   itemFrameworkOneResponseChoiceExplanation: {
    //                     itemFrameworkOneResponseChoiceExplanationDisplay: false,
    //                     itemFrameworkOneResponseChoiceExplanationMedia: ''
    //                   },
    //                   itemFrameworkOneResponseChoiceNumber: '3',
    //                   itemFrameworkOneResponseChoicePolarity: ''
    //                 }
    //               ],
    //               itemFrameworkOneType: ''
    //             }
    //           }
    //         ],
    //         itemFrameworkOneType: '61090cace50cf61d5eb440ce',
    //         itemFrameworkOneWord: {
    //           itemFrameworkOneWordMaximum: '',
    //           itemFrameworkOneWordMinimum: ''
    //         },
    //         itemFrameworkOneMedia: {
    //           time: '1633346556872',
    //           blocks: [
    //             {
    //               id: 'x8DqnC800v',
    //               type: 'image',
    //               data: {
    //                 file: {
    //                   url: 'https://iguru-serverless-test.s3-ap-south-1.amazonaws.com/media/Q1.png'
    //                 },
    //                 caption: '',
    //                 withBorder: false,
    //                 stretched: false,
    //                 withBackground: false
    //               }
    //             }
    //           ],
    //           version: '2.22.2'
    //         },
    //         itemFrameworkOneScore: 1
    //       }
    //     }
    //   }
    // ],
    assessmentSectionAdministrationProctor: false,
    assessmentSectionAdministrationSupervise: false,
    assessmentSectionAdministrationTemplate: false,
    assessmentSectionAdministrationVersion: false,
    assessmentSectionItemFrameworkOneLabel: '',
    assessmentSectionItemFrameworkOneTemplate: '',
    assessmentSectionItemFrameworkOneResponseLabel: '',
    assessmentEvaluation: {
      assessmentEvaluationScoreCutoff: false,
      assessmentEvaluationScoreGeneric: false,
      assessmentEvaluationScoreGrade: false,
      assessmentEvaluationScorePercentage: false,
      assessmentEvaluationScorePercentile: false,
      assessmentEvaluationScoreRank: false,
      assessmentEvaluationScoreRaw: false,
      assessmentEvaluationScoreStandard: false,
      assessmentEvaluationScoreSten: false,
      assessmentEvaluationScoreT: false,
      assessmentEvaluationScoreZ: false
    },
    assessmentCommunique: [],
    assessmentManuscript: [],
    assessmentScoreExtremum: {
      assessmentScoreExtremumMaximum: 0,
      assessmentScoreExtremumMinimum: 0
    },
    assessmentSynopsis: [],
    assessmentTime: 0,
    assessmentTemplate: [],
    assessmentSection: [
      {
        assessmentSectionSequence: 0,
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
        assessmentSectionItemCluster: [],
        assessmentSectionItemDistinct: [],
        assessmentNavigation: {
          assessmentSectionItemNavigationFirst: true,
          assessmentSectionItemNavigationLast: true,
          assessmentSectionItemNavigationNext: true,
          assessmentSectionItemNavigationPrevious: true,
          assessmentSectionItemNavigationSkip: true
        },
        assessmentSectionItemPractice: [],
        assessmentSectionItemTotal: 0,
        assessmentSectionManuscript: [],
        assessmentSectionItemFrameworkOneResponseExtremum: {
          assessmentSectionItemFrameworkOneResponseExtremumMaximum: 0,
          assessmentSectionItemFrameworkOneResponseExtremumMinimum: 0
        },
        assessmentSectionItemFrameworkOneResponseRevise: false,
        assessmentSectionScale: [],
        assessmentSectionScoreExtremum: {
          assessmentSectionScoreExtremumMaximum: '',
          assessmentSectionScoreExtremumMinimum: ''
        },
        assessmentSectionSynopsis: [],
        assessmentSectionTime: ''
      }
    ],
    assessmentSectionItemDistinctRevise:null
  },  
};

const AssessmentReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  // console.log(action.type);
  switch (action.type) {
    case ASSESSMENT_POPUP_OPEN:
      return {
        ...istate,
        assessmentsHeaderOne: 'assessments',
        assessmentsPopUpType: 'primary',
        currentPopUpOption: istate.primaryPopUpOptions,
        assessmentsPopUpActive: true
      };
    case SET_ASSESSMENT_NEXT_POPUP:
      if (istate.assessmentsPopUpType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: action.payload,
            assessmentsHeaderOneBadgeOne: 'review',
            assessmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread'
          };
        } else {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: 'assessments',
            assessmentsHeaderOneBadgeOne: action.payload,
            assessmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: action.payload === 'create' ? 'all' : 'active'
          };
        }
      } else {
        return istate;
      }
    case SET_ASSESSMENT_SECONDARY_POPUP:
      if (istate.assessmentsPopUpType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: action.payload,
            assessmentsHeaderOneBadgeOne: 'review',
            assessmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread',
            isBackToSectionPopUp: true
          };
        } else {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: 'assessments',
            assessmentsHeaderOneBadgeOne: action.payload,
            assessmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'active',
            isBackToSectionPopUp: true
          };
        }
      } else {
        return istate;
      }
    case SET_ASSESSMENT_BASIC_REDUCER_STATE:
      return {
        ...istate,
        informationBasic: action.payload
      };
    case SET_ASSESSMENT_PREVIOUS_POPUP:
      if (istate.assessmentsPopUpType === 'primary') {
        return {
          ...istate,
          currentPopUpOption: [],
          assessmentsPopUpActive: false
        };
      } else if (istate.assessmentsPopUpType === 'secondary') {
        return {
          ...istate,
          currentPopUpOption: istate.primaryPopUpOptions,
          assessmentsHeaderOne: 'assessments',
          assessmentsHeaderOneBadgeOne: '',
          assessmentsPopUpType: 'primary',
          secondaryOptionCheckValue: 'active'
        };
      } else {
        return istate;
      }
    case SET_ASSESSMENT_SECONDARY_OPTION_VALUE:
      return {
        ...istate,
        secondaryOptionCheckValue: action.payload
      };
    case SET_DISPLAY_PANE_FOUR_SHOW:
      return {
        isDisplayPaneSixShow: action.payload
      };
    case SET_ASSESSMENT_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        informationAllocation: {
          ...istate.informationAllocation,
          [action.payload.stateName]: {
            ...istate.informationAllocation[action.payload.stateName],
            [action.payload.actualStateName]: action.payload.value
          }
        }
      };
    case SET_ASSESSMENT_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: action.payload
      };
    case SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          [action.payload.stateName]: action.payload.value
        }
      };
    case SET_ASSESSMENT_COMMUNIQUE_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentCommunique: action.payload
        }
      };
    case SET_ASSESSMENT_MANUSCRIPT_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentManuscript: action.payload
        }
      };
    case SET_ASSESSMENT_SCORE_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentScore: action.payload
        }
      };

    case SET_ASSESSMENT_AID_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentAid: action.payload
        }
      };
    case SET_ASSESSMENT_EVALUATION_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentEvaluation: action.payload
        }
      };
      case SET_ASSESSMENT_FRAMEWORK_INNER_SINGLE_STATE:
        debugger;
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentSectionItemDistinctRevise: {
            ...istate.informationFramework.assessmentSectionItemDistinctRevise,
            itemFrameworkOne:{
              ...istate.informationFramework.assessmentSectionItemDistinctRevise.itemFrameworkOne,
              [action.payload.objectName]: {
                ...istate.informationFramework.assessmentSectionItemDistinctRevise.itemFrameworkOne[
                  action.payload.objectName
                ],
                [action.payload.actualStateName]: action.payload.value
              }
            }            
          }
        },
      };
      case SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentSectionItemDistinctRevise: {
            ...istate.informationFramework.assessmentSectionItemDistinctRevise,
            itemFrameworkOne: {
              ...istate.informationFramework.assessmentSectionItemDistinctRevise.itemFrameworkOne,
              [action.payload.stateName]: action.payload.value
            }
          }
        }
      };
      case SET_ASSESSMENT_REVISE_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          [action.payload.stateName]: {
            ...istate.informationFramework[action.payload.stateName],
            [action.payload.actualStateName]: action.payload.value
          }
        }
      };
    case CLEAR_ASSESSMENT_INFO:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default AssessmentReducer;
