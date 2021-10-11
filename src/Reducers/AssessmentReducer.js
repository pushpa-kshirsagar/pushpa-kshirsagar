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
} from "../actionType";
import {
  MODULE_POPUP_OPTION,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_POPUP_OPTIONS,
  REVIEW_REVISE_POPUP,
} from "../PopUpConfig";

const initialState = {
  isDisplayPaneSixShow: true,
  assessmentsHeaderOne: "",
  assessmentsPopUpType: "primary",
  currentPopUpOption: "",
  assessmentsPopUpActive: false,
  isBackToSectionPopUp: false,
  primaryPopUpOptions: MODULE_POPUP_OPTION,
  secondaryPopUpOptions: {
    create: REVIEW_REVISE_POPUP,
    review: REVIEW_POPUP_OPTIONS,
    notifications: NOTIFICATION_REPORT_POPUP,
    reports: NOTIFICATION_REPORT_POPUP,
  },
  secondaryOptionCheckValue: "",
  informationBasic: {
    assessmentName: "",
    assessmentNameVerification: false,
    assessmentDescription: "",
    assessmentPicture: "",
    assessmentPictureVerification: false,
    assessmentFlag: false,
  },
  informationAlliance: {
    assessmentAuthor: {
      assessmentAuthorPrimary: [],
      assessmentAuthorSecondary: [],
    },
  },
  informationAllocation: {
    assessmentGroup: {
      assessmentGroupPrimary: [],
      assessmentGroupSecondary: [],
    },
    assessmentManager: {
      assessmentManagerPrimary: [],
      assessmentManagerSecondary: [],
    },
    assessmentNode: {
      assessmentNodePrimary: [],
      assessmentNodeSecondary: [],
    },
    assessmentType: {
      assessmentTypePrimary: [],
      assessmentTypeSecondary: [],
    },
  },
  informationFramework: {
    assessmentAdministrationProctor: false,
    assessmentAdministrationRepeat: false,
    assessmentAdministrationReset: false,
    assessmentAdministrationShuffle: false,
    assessmentAdministrationSupervise: false,
    assessmentAdministrationTemplate: false,
    assessmentAdministrationVersion: false,
    assessmentAid: {
      assessmentAidCalculatorPermission: false,
      assessmentAidCalculatorType: "",
      assessmentAidSpreadsheetPermission: false,
      assessmentAidSpreadsheetType: "",
      assessmentAidTextsheetPermission: false,
      assessmentAidTextsheetType: "",
    },
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
      assessmentEvaluationScoreZ: false,
    },
    assessmentCommunique: {
      assessmentCommuniquePrimary: null,
      assessmentCommuniqueSecondary: null,
    },
    assessmentItem: [
      {
        id: "615acfba8016ac4135f125e4",
        associateId: "6153fe27dcd8030ace4550a6",
        informationBasic: {
          itemName: "Item-01",
          itemNameVerification: false,
          itemDescription: "",
          itemPicture: "",
          itemPictureVerification: false,
        },
        informationAllocation: {
          itemGroup: {
            itemGroupPrimary: ["615accbdb5af42484c351862"],
            itemGroupSecondary: [],
          },
          itemManager: { itemManagerPrimary: [], itemManagerSecondary: [] },
          itemNode: {
            itemNodePrimary: ["615ab7a29190622540eac730"],
            itemNodeSecondary: [],
          },
          itemType: { itemTypePrimary: [], itemTypeSecondary: [] },
        },
        informationEngagement: {
          itemTenure: { itemTenureDateTimeStart: "2021-10-04T09:56:10.189Z" },
          itemStatus: "PUBLISHED",
          itemTag: { itemTagPrimary: "615acfba8016ac4135f125e4" },
        },
        informationFramework: {
          itemFrameworkOne: {
            itemFrameworkOneAlignment: "",
            itemFrameworkOneCluster: [
              {
                itemFrameworkOneClusterPrimary: "",
                itemFrameworkOneClusterPrimaryPolarity: "",
              },
            ],
            itemFrameworkOneExplanation: {
              itemFrameworkOneExplanationDisplay: false,
            },
            itemFrameworkOneLabel: {
              itemFrameworkOneLabelDisplay: false,
              itemFrameworkOneLabelMedia: {
                time: "1633341545444",
                blocks: [
                  {
                    id: "6ydeaRr2r4",
                    type: "paragraph",
                    data: {
                      text:
                        "When set in motion, which pendulum can complete more swings in one minute?",
                    },
                  },
                ],
                version: "2.22.2",
              },
            },
            itemFrameworkOnePassage: { itemFrameworkOnePassageDisplay: false },
            itemFrameworkOnePolarity: "",
            itemFrameworkOneResponse: "",
            itemFrameworkOneResponseAlignment: "",
            itemFrameworkOneResponseAttachment: false,
            itemFrameworkOneResponseCorrect: ["2"],
            itemFrameworkOneResponseChoice: [
              {
                itemFrameworkOneResponseChoiceAlignment: "",
                itemFrameworkOneResponseChoiceColumnMatch: "",
                itemFrameworkOneResponseChoiceExplanation: {
                  itemFrameworkOneResponseChoiceExplanationDisplay: false,
                  itemFrameworkOneResponseChoiceExplanationMedia: "",
                },
                itemFrameworkOneResponseChoiceMedia: {
                  time: "1633341708657",
                  blocks: [
                    { id: "HaxlMyGdO", type: "paragraph", data: { text: "A" } },
                  ],
                  version: "2.22.2",
                },
                itemFrameworkOneResponseChoiceNumber: "1",
                itemFrameworkOneResponseChoicePolarity: "",
              },
              {
                itemFrameworkOneResponseChoiceAlignment: "",
                itemFrameworkOneResponseChoiceColumnMatch: "",
                itemFrameworkOneResponseChoiceExplanation: {
                  itemFrameworkOneResponseChoiceExplanationDisplay: false,
                  itemFrameworkOneResponseChoiceExplanationMedia: "",
                },
                itemFrameworkOneResponseChoiceMedia: {
                  time: "1633341716659",
                  blocks: [
                    {
                      id: "CG9cDuHDrI",
                      type: "paragraph",
                      data: { text: "B" },
                    },
                  ],
                  version: "2.22.2",
                },
                itemFrameworkOneResponseChoiceNumber: "2",
                itemFrameworkOneResponseChoicePolarity: "",
              },
              {
                itemFrameworkOneResponseChoiceAlignment: "",
                itemFrameworkOneResponseChoiceColumnMatch: "",
                itemFrameworkOneResponseChoiceExplanation: {
                  itemFrameworkOneResponseChoiceExplanationDisplay: false,
                  itemFrameworkOneResponseChoiceExplanationMedia: "",
                },
                itemFrameworkOneResponseChoiceMedia: {
                  time: "1633341725179",
                  blocks: [
                    {
                      id: "OQPGehPekg",
                      type: "paragraph",
                      data: { text: "No difference" },
                    },
                  ],
                  version: "2.22.2",
                },
                itemFrameworkOneResponseChoiceNumber: "3",
                itemFrameworkOneResponseChoicePolarity: "",
              },
            ],
            itemFrameworkOneResponseExplanation: {
              itemFrameworkOneResponseExplanationDisplay: false,
            },
            itemFrameworkOneResponseLabel: {
              itemFrameworkOneResponseLabelDisplay: false,
            },
            itemFrameworkOneScale: [
              {
                itemFrameworkOneScale: null,
                itemFrameworkOneScaleScore: null,
                itemFrameworkOneScaleWeightage: null,
              },
            ],
            itemFrameworkOneSection: [
              {
                itemFrameworkOneSectionSequence: 1,
                itemFrameworkOneSection: {
                  itemFrameworkOneResponseAttachment: false,
                  itemFrameworkOneResponseChoice: [
                    {
                      itemFrameworkOneResponseChoiceAlignment: "",
                      itemFrameworkOneResponseChoiceColumnMatch: "",
                      itemFrameworkOneResponseChoiceExplanation: {
                        itemFrameworkOneResponseChoiceExplanationDisplay: false,
                      },
                      itemFrameworkOneResponseChoiceMedia: "",
                      itemFrameworkOneResponseChoiceNumber: "1",
                      itemFrameworkOneResponseChoicePolarity: "",
                    },
                    {
                      itemFrameworkOneResponseChoiceAlignment: "",
                      itemFrameworkOneResponseChoiceColumnMatch: "",
                      itemFrameworkOneResponseChoiceExplanation: {
                        itemFrameworkOneResponseChoiceExplanationDisplay: false,
                      },
                      itemFrameworkOneResponseChoiceNumber: "2",
                      itemFrameworkOneResponseChoicePolarity: "",
                    },
                    {
                      itemFrameworkOneResponseChoiceAlignment: "",
                      itemFrameworkOneResponseChoiceColumnMatch: "",
                      itemFrameworkOneResponseChoiceExplanation: {
                        itemFrameworkOneResponseChoiceExplanationDisplay: false,
                        itemFrameworkOneResponseChoiceExplanationMedia: "",
                      },
                      itemFrameworkOneResponseChoiceNumber: "3",
                      itemFrameworkOneResponseChoicePolarity: "",
                    },
                  ],
                  itemFrameworkOneType: "",
                },
              },
            ],
            itemFrameworkOneType: "61090cace50cf61d5eb440ce",
            itemFrameworkOneWord: {
              itemFrameworkOneWordMaximum: "",
              itemFrameworkOneWordMinimum: "",
            },
            itemFrameworkOneMedia: {
              time: "1633341668315",
              blocks: [
                {
                  id: "QdOoWFw25x",
                  type: "image",
                  data: {
                    file: {
                      url:
                        "https://iguru-serverless-test.s3-ap-south-1.amazonaws.com/media/Q-01.png",
                    },
                    caption: "",
                    withBorder: false,
                    stretched: false,
                    withBackground: false,
                  },
                },
              ],
              version: "2.22.2",
            },
            itemFrameworkOneScore: 1,
          },
        },
      },
      {
        id: "615ae1c0e2646454fe4c5a3e",
        associateId: "6153fe27dcd8030ace4550a6",
        informationBasic: {
          itemName: "item-02",
          itemNameVerification: false,
          itemDescription: "",
          itemPicture: "",
          itemPictureVerification: false,
        },
        informationAllocation: {
          itemGroup: {
            itemGroupPrimary: ["615accbdb5af42484c351862"],
            itemGroupSecondary: [],
          },
          itemManager: {
            itemManagerPrimary: [],
            itemManagerSecondary: [],
          },
          itemNode: {
            itemNodePrimary: ["615ab7a29190622540eac730"],
            itemNodeSecondary: [],
          },
          itemType: {
            itemTypePrimary: [],
            itemTypeSecondary: [],
          },
        },
        informationEngagement: {
          itemTenure: {
            itemTenureDateTimeStart: "2021-10-04T11:13:04.714Z",
          },
          itemStatus: "PUBLISHED",
          itemTag: {
            itemTagPrimary: "615ae1c0e2646454fe4c5a3e",
          },
        },
        informationFramework: {
          itemFrameworkOne: {
            itemFrameworkOneAlignment: "",
            itemFrameworkOneCluster: [
              {
                itemFrameworkOneClusterPrimary: "",
                itemFrameworkOneClusterPrimaryPolarity: "",
              },
            ],
            itemFrameworkOneExplanation: {
              itemFrameworkOneExplanationDisplay: false,
            },
            itemFrameworkOneLabel: {
              itemFrameworkOneLabelDisplay: false,
              itemFrameworkOneLabelMedia: {
                time: "1633346401183",
                blocks: [
                  {
                    id: "i2s8donSri",
                    type: "paragraph",
                    data: {
                      text: "Which will create a smaller area of light?",
                    },
                  },
                ],
                version: "2.22.2",
              },
            },
            itemFrameworkOnePassage: {
              itemFrameworkOnePassageDisplay: false,
            },
            itemFrameworkOnePolarity: "",
            itemFrameworkOneResponse: "",
            itemFrameworkOneResponseAlignment: "",
            itemFrameworkOneResponseAttachment: false,
            itemFrameworkOneResponseCorrect: ["1"],
            itemFrameworkOneResponseChoice: [
              {
                itemFrameworkOneResponseChoiceAlignment: "",
                itemFrameworkOneResponseChoiceColumnMatch: "",
                itemFrameworkOneResponseChoiceExplanation: {
                  itemFrameworkOneResponseChoiceExplanationDisplay: false,
                  itemFrameworkOneResponseChoiceExplanationMedia: "",
                },
                itemFrameworkOneResponseChoiceMedia: {
                  time: "1633346597394",
                  blocks: [
                    {
                      id: "blpInDuraP",
                      type: "paragraph",
                      data: {
                        text: "A",
                      },
                    },
                  ],
                  version: "2.22.2",
                },
                itemFrameworkOneResponseChoiceNumber: "1",
                itemFrameworkOneResponseChoicePolarity: "",
              },
              {
                itemFrameworkOneResponseChoiceAlignment: "",
                itemFrameworkOneResponseChoiceColumnMatch: "",
                itemFrameworkOneResponseChoiceExplanation: {
                  itemFrameworkOneResponseChoiceExplanationDisplay: false,
                  itemFrameworkOneResponseChoiceExplanationMedia: "",
                },
                itemFrameworkOneResponseChoiceMedia: {
                  time: "1633346609797",
                  blocks: [
                    {
                      id: "9fJ5OKjsJJ",
                      type: "paragraph",
                      data: {
                        text: "B",
                      },
                    },
                  ],
                  version: "2.22.2",
                },
                itemFrameworkOneResponseChoiceNumber: "2",
                itemFrameworkOneResponseChoicePolarity: "",
              },
              {
                itemFrameworkOneResponseChoiceAlignment: "",
                itemFrameworkOneResponseChoiceColumnMatch: "",
                itemFrameworkOneResponseChoiceExplanation: {
                  itemFrameworkOneResponseChoiceExplanationDisplay: false,
                  itemFrameworkOneResponseChoiceExplanationMedia: "",
                },
                itemFrameworkOneResponseChoiceMedia: {
                  time: "1633346617938",
                  blocks: [
                    {
                      id: "6NvGXKaOO5",
                      type: "paragraph",
                      data: {
                        text: "No difference",
                      },
                    },
                  ],
                  version: "2.22.2",
                },
                itemFrameworkOneResponseChoiceNumber: "3",
                itemFrameworkOneResponseChoicePolarity: "",
              },
            ],
            itemFrameworkOneResponseExplanation: {
              itemFrameworkOneResponseExplanationDisplay: false,
            },
            itemFrameworkOneResponseLabel: {
              itemFrameworkOneResponseLabelDisplay: false,
            },
            itemFrameworkOneScale: [
              {
                itemFrameworkOneScale: null,
                itemFrameworkOneScaleScore: null,
                itemFrameworkOneScaleWeightage: null,
              },
            ],
            itemFrameworkOneSection: [
              {
                itemFrameworkOneSectionSequence: 1,
                itemFrameworkOneSection: {
                  itemFrameworkOneResponseAttachment: false,
                  itemFrameworkOneResponseChoice: [
                    {
                      itemFrameworkOneResponseChoiceAlignment: "",
                      itemFrameworkOneResponseChoiceColumnMatch: "",
                      itemFrameworkOneResponseChoiceExplanation: {
                        itemFrameworkOneResponseChoiceExplanationDisplay: false,
                      },
                      itemFrameworkOneResponseChoiceMedia: "",
                      itemFrameworkOneResponseChoiceNumber: "1",
                      itemFrameworkOneResponseChoicePolarity: "",
                    },
                    {
                      itemFrameworkOneResponseChoiceAlignment: "",
                      itemFrameworkOneResponseChoiceColumnMatch: "",
                      itemFrameworkOneResponseChoiceExplanation: {
                        itemFrameworkOneResponseChoiceExplanationDisplay: false,
                      },
                      itemFrameworkOneResponseChoiceNumber: "2",
                      itemFrameworkOneResponseChoicePolarity: "",
                    },
                    {
                      itemFrameworkOneResponseChoiceAlignment: "",
                      itemFrameworkOneResponseChoiceColumnMatch: "",
                      itemFrameworkOneResponseChoiceExplanation: {
                        itemFrameworkOneResponseChoiceExplanationDisplay: false,
                        itemFrameworkOneResponseChoiceExplanationMedia: "",
                      },
                      itemFrameworkOneResponseChoiceNumber: "3",
                      itemFrameworkOneResponseChoicePolarity: "",
                    },
                  ],
                  itemFrameworkOneType: "",
                },
              },
            ],
            itemFrameworkOneType: "61090cace50cf61d5eb440ce",
            itemFrameworkOneWord: {
              itemFrameworkOneWordMaximum: "",
              itemFrameworkOneWordMinimum: "",
            },
            itemFrameworkOneMedia: {
              time: "1633346556872",
              blocks: [
                {
                  id: "x8DqnC800v",
                  type: "image",
                  data: {
                    file: {
                      url:
                        "https://iguru-serverless-test.s3-ap-south-1.amazonaws.com/media/Q1.png",
                    },
                    caption: "",
                    withBorder: false,
                    stretched: false,
                    withBackground: false,
                  },
                },
              ],
              version: "2.22.2",
            },
            itemFrameworkOneScore: 1,
          },
        },
      },
    ],
    assessmentNavigation: {
      first: true,
      last: true,
      next: true,
      previous: true,
      skip: true,
    },
    assessmentManuscript: {
      assessmentManuscriptPrimary: null,
      assessmentManuscriptSecondary: null,
    },
    assessmentItemTotal: null,
    assessmentScore: {
      assessmentScoreMaximum: 0,
      assessmentScoreMinimum: 0,
    },
    assessmentTime: 0,
  },
};

const AssessmentReducer = (
  istate = JSON.parse(JSON.stringify(initialState)),
  action
) => {
  // console.log(action.type);
  switch (action.type) {
    case ASSESSMENT_POPUP_OPEN:
      return {
        ...istate,
        assessmentsHeaderOne: "assessments",
        assessmentsPopUpType: "primary",
        currentPopUpOption: istate.primaryPopUpOptions,
        assessmentsPopUpActive: true,
      };
    case SET_ASSESSMENT_NEXT_POPUP:
      if (istate.assessmentsPopUpType === "primary") {
        if (
          action.payload === "notifications" ||
          action.payload === "reports"
        ) {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: action.payload,
            assessmentsHeaderOneBadgeOne: "review",
            assessmentsPopUpType: "secondary",
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: "unread",
          };
        } else {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: "assessments",
            assessmentsHeaderOneBadgeOne: action.payload,
            assessmentsPopUpType: "secondary",
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue:
              action.payload === "create" ? "all" : "active",
          };
        }
      } else {
        return istate;
      }
    case SET_ASSESSMENT_SECONDARY_POPUP:
      if (istate.assessmentsPopUpType === "primary") {
        if (
          action.payload === "notifications" ||
          action.payload === "reports"
        ) {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: action.payload,
            assessmentsHeaderOneBadgeOne: "review",
            assessmentsPopUpType: "secondary",
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: "unread",
            isBackToSectionPopUp: true,
          };
        } else {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: "assessments",
            assessmentsHeaderOneBadgeOne: action.payload,
            assessmentsPopUpType: "secondary",
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: "active",
            isBackToSectionPopUp: true,
          };
        }
      } else {
        return istate;
      }
    case SET_ASSESSMENT_BASIC_REDUCER_STATE:
      return {
        ...istate,
        informationBasic: action.payload,
      };
    case SET_ASSESSMENT_PREVIOUS_POPUP:
      if (istate.assessmentsPopUpType === "primary") {
        return {
          ...istate,
          currentPopUpOption: [],
          assessmentsPopUpActive: false,
        };
      } else if (istate.assessmentsPopUpType === "secondary") {
        return {
          ...istate,
          currentPopUpOption: istate.primaryPopUpOptions,
          assessmentsHeaderOne: "assessments",
          assessmentsHeaderOneBadgeOne: "",
          assessmentsPopUpType: "primary",
          secondaryOptionCheckValue: "active",
        };
      } else {
        return istate;
      }
    case SET_ASSESSMENT_SECONDARY_OPTION_VALUE:
      return {
        ...istate,
        secondaryOptionCheckValue: action.payload,
      };
    case SET_DISPLAY_PANE_FOUR_SHOW:
      return {
        isDisplayPaneSixShow: action.payload,
      };
    case SET_ASSESSMENT_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        informationAllocation: {
          ...istate.informationAllocation,
          [action.payload.stateName]: {
            ...istate.informationAllocation[action.payload.stateName],
            [action.payload.actualStateName]: action.payload.value,
          },
        },
      };
    case SET_ASSESSMENT_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: action.payload,
      };
    case SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          [action.payload.stateName]: action.payload.value,
        },
      };
    case SET_ASSESSMENT_COMMUNIQUE_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentCommunique: action.payload,
        },
      };
    case SET_ASSESSMENT_MANUSCRIPT_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentManuscript: action.payload,
        },
      };
    case SET_ASSESSMENT_SCORE_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentScore: action.payload,
        },
      };

    case SET_ASSESSMENT_AID_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentAid: action.payload,
        },
      };
    case SET_ASSESSMENT_EVALUATION_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentEvaluation: action.payload,
        },
      };
    case CLEAR_ASSESSMENT_INFO:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default AssessmentReducer;
