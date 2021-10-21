import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { ADMIN_ROLE_ID, MANAGER_ROLE_ID } from '../endpoints';
import S3 from 'react-aws-s3';
import config from '../config.json';
import UserPool from '../UserPool';
import { apiCallForItemDistinctPagination, getItemReviewApiCall } from './ItemModuleAction';
import {
  GET_ASSESSEE_ASSIGNMENT_SAGA,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_REQUEST_OBJECT
} from '../actionType';
import { useRef } from 'react';
const configObj = {
  bucketName: config.aws.BUCKET_NAME,
  dirName: config.aws.DIR_NAME /* optional */,
  region: config.aws.REGION,
  accessKeyId: config.aws.ACCESS_KEY,
  secretAccessKey: config.aws.SECRET_ACCESS_KEY
  // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
};
const ReactS3Client = new S3(configObj);

export const setAssesseeCardPermissionInJson = (popupValuArr, assesseePermission) => {
  let popupContentArrValue = popupValuArr.map(function (el) {
    var o = Object.assign({}, el);
    var sss = el.permissionArr;
    o.disabled =
      assesseePermission && assesseePermission[sss]
        ? !assesseePermission[sss].includes(el.permission)
        : true;
    return o;
  });
  return popupContentArrValue;
};
function splitCamelCaseToString(s) {
  return s
    .split(/(?=[A-Z])/)
    .map(function (p) {
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(' ');
}
export const imageUploadMethod = async (file) => {
  let imgUploadData = await ReactS3Client.uploadFile(file, file.name);
  console.log(imgUploadData);
  let res = { success: 1, file: { url: imgUploadData.location } };
  return res;
};

export const onClickFirst = (
  reviewListDistinctData,
  id,
  typeOfMiddlePaneList,
  selectedAssociateInfo,
  dispatch,
  information
) => {
  console.log('first Record');
  let firstIndex = 0;
  callApiFunction(
    selectedAssociateInfo,
    reviewListDistinctData,
    dispatch,
    firstIndex,
    typeOfMiddlePaneList
  );
};
export const onClickLast = (
  reviewListDistinctData,
  typeOfMiddlePaneList,
  selectedAssociateInfo,
  dispatch,
  scanCount,
  reviewListReqObj,
  numberPage,
  middlePaneHeader,
  middlePaneHeaderBadgeOne,
  middlePaneHeaderBadgeTwo
) => {
  console.log('last Record');
  let lastIndex = reviewListDistinctData.length - 1;
  if (scanCount > reviewListDistinctData.length) {
    if (typeOfMiddlePaneList === 'itemsDistinctReviewList') {
      apiCallForItemDistinctPagination(
        dispatch,
        reviewListReqObj,
        numberPage,
        middlePaneHeader,
        middlePaneHeaderBadgeOne,
        middlePaneHeaderBadgeTwo
      );
    }
  }
  callApiFunction(
    selectedAssociateInfo,
    reviewListDistinctData,
    dispatch,
    lastIndex,
    typeOfMiddlePaneList
  );
};
export const onClickNext = (
  reviewListDistinctData,
  id,
  typeOfMiddlePaneList,
  selectedAssociateInfo,
  dispatch,
  information,
  reviewListReqObj,
  numberPage,
  middlePaneHeader,
  middlePaneHeaderBadgeOne,
  middlePaneHeaderBadgeTwo
) => {
  if (reviewListDistinctData.length > 0 && dispatch) {
    let index = reviewListDistinctData.findIndex((data) => data.id === id);
    let nextIndex = index + 1;
    if (nextIndex < reviewListDistinctData.length) {
      callApiFunction(
        selectedAssociateInfo,
        reviewListDistinctData,
        dispatch,
        nextIndex,
        typeOfMiddlePaneList
      );
    } else {
      if (typeOfMiddlePaneList === 'itemsDistinctReviewList') {
        apiCallForItemDistinctPagination(
          dispatch,
          reviewListReqObj,
          numberPage,
          middlePaneHeader,
          middlePaneHeaderBadgeOne,
          middlePaneHeaderBadgeTwo
        );
      }
    }
  }
};
export const onClickPrevious = (
  reviewListDistinctData,
  id,
  typeOfMiddlePaneList,
  selectedAssociateInfo,
  dispatch,
  information
) => {
  console.log('prev Record');
  if (reviewListDistinctData.length > 0 && dispatch) {
    let index = reviewListDistinctData.findIndex((data) => data.id === id);
    let prevIndex = index - 1;
    if (prevIndex < reviewListDistinctData.length) {
      callApiFunction(
        selectedAssociateInfo,
        reviewListDistinctData,
        dispatch,
        prevIndex,
        typeOfMiddlePaneList
      );
    }
  }
};
const callApiFunction = (
  selectedAssociateInfo,
  reviewListDistinctData,
  dispatch,
  index,
  typeOfMiddlePaneList
) => {
  let nextId = reviewListDistinctData[index].id;
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'middlePaneSelectedValue', value: nextId }
  });
  if (
    typeOfMiddlePaneList === 'itemsDistinctReviewList' ||
    typeOfMiddlePaneList === 'assessmentItemReviewList' ||
    typeOfMiddlePaneList === 'itemGroupItemReviewList'
  ) {
    getItemReviewApiCall(selectedAssociateInfo, dispatch, 'all', false, nextId);
  }
};
export const audioUploadMethod = async (file) => {
  let imgUploadData = await ReactS3Client.uploadFile(file, file.name);
  console.log(imgUploadData);
  let res = {
    data: {
      url: imgUploadData.location,
      name: 'audio.webm',
      id: '123'
    }
  };
  return res;
};
export const getPermissionStr = (permissionObj) => {
  let per = '';
  if (permissionObj) {
    Object.keys(permissionObj).map(function (key, val) {
      if (typeof permissionObj[key] === 'boolean' && permissionObj[key] === true) {
        per = per !== '' ? per + ', ' + splitCamelCaseToString(key) : splitCamelCaseToString(key);
      }
    });
  }
  return per;
};
export const getEvaluationStr = (evalObj) => {
  let per = '';
  if (evalObj) {
    Object.keys(evalObj).map(function (key, val) {
      if (typeof evalObj[key] === 'boolean' && evalObj[key] === true) {
        if (key === 'assessmentEvaluationScoreCutoff') key = 'Cutoff';
        if (key === 'assessmentEvaluationScoreGeneric') key = 'Generic';
        if (key === 'assessmentEvaluationScoreGrade') key = 'Grade';
        if (key === 'assessmentEvaluationScoreMaximum') key = 'Maximum';
        if (key === 'assessmentEvaluationScoreMinimum') key = 'Minimum';
        if (key === 'assessmentEvaluationScorePercentage') key = 'Percentage';
        if (key === 'assessmentEvaluationScorePercentile') key = 'Percentile';
        if (key === 'assessmentEvaluationScoreRank') key = 'Rank';
        if (key === 'assessmentEvaluationScoreRaw') key = 'Raw';
        if (key === 'assessmentEvaluationScoreStandard') key = 'Standard';
        if (key === 'assessmentEvaluationScoreSten') key = 'Sten';
        if (key === 'assessmentEvaluationScoreT') key = 'T';
        if (key === 'assessmentEvaluationScoreZ') key = 'Z';
        per = per !== '' ? per + ', ' + splitCamelCaseToString(key) : splitCamelCaseToString(key);
      }
    });
  }
  return per;
};
export const setAssociateCardEnableInJson = (popupValuArr) => {
  var isDisabled = true;
  let popupContentArrValue = popupValuArr.map(function (el) {
    var o = Object.assign({}, el);
    o.disabled = isDisabled;
    return o;
  });
  console.log(popupContentArrValue);

  return popupContentArrValue;
};

export const setAssociateCardPermissionInJson = (popupValuArr, assesseePermission) => {
  var isDisabled = true;
  console.log(assesseePermission);

  let popupContentArrValue = popupValuArr.map(function (el) {
    var o = Object.assign({}, el);
    var sss = el.permissionArr;
    if (assesseePermission.associateHierarchy.includes('review')) {
      isDisabled =
        assesseePermission && assesseePermission[sss]
          ? !assesseePermission[sss].includes(el.permission)
          : true;
    }
    o.disabled = isDisabled;
    return o;
  });
  // return popupContentArrValue;
  return popupValuArr;
};

export const signUpForAwsCognito = (emailId, userName, password) => {
  console.log('emailId', emailId);
  console.log('userName', userName);
  console.log('password', password);
  let attributeList = [];
  const dataEmail = {
    Name: 'email',
    Value: emailId
  };
  const attributeEmail = new CognitoUserAttribute(dataEmail);
  attributeList.push(attributeEmail);
  UserPool.signUp(
    userName,
    password,
    attributeList, // required attribute list
    null,
    (error, data) => {
      console.log('SIGN-ON DATA===>', data);
      console.log('SIGN-ON ERROR===>', error);
    }
  );
};
export const makeAssesseeReviewListRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    dataType: 'string',
    conditionColumn: 'informationEngagement.assesseeStatus',
    conditionValue: {
      condition: 'eq',
      value: {
        from: filterKey.toUpperCase()
      }
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        dataType: 'string',
        conditionColumn: 'informationEngagement.assesseeStatus',
        conditionValue: {
          condition: 'in',
          value: {
            in: ['CONFIRMED', 'DISAPPROVED', 'SUSPENDED', 'TERMINATED', 'UNAPPROVED', 'UNCONFIRMED']
          }
        }
      };
    }
  }
  let regObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary, //'60520a349d66236bb84f8b1b',
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.assesseeNameFirst,informationBasic.assesseeNameOther,informationBasic.assesseeNameLast,informationBasic.assesseeAlias',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [searchObj]
      }
    ]
  };

  return regObj;
};
export const makeAdministratorsReviewListRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['CONFIRMED', 'DISAPPROVED', 'SUSPENDED', 'TERMINATED', 'UNAPPROVED', 'UNCONFIRMED']
        }
      };
    }
  }
  let regObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary, //'60520a349d66236bb84f8b1b',
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.assesseeNameFirst,informationBasic.assesseeNameOther,informationBasic.assesseeNameLast,informationBasic.assesseeAlias',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: searchObj
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeRole.assesseeRolePrimary',
            conditionValue: {
              condition: 'in',
              value: {
                in: ADMIN_ROLE_ID
              }
            }
          }
        ]
      }
    ]
  };

  return regObj;
};
export const makeManagersReviewListRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['CONFIRMED', 'DISAPPROVED', 'SUSPENDED', 'TERMINATED', 'UNAPPROVED', 'UNCONFIRMED']
        }
      };
    }
  }
  let regObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary, //'60520a349d66236bb84f8b1b',
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.assesseeNameFirst,informationBasic.assesseeNameOther,informationBasic.assesseeNameLast,informationBasic.assesseeAlias',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: searchObj
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeRole.assesseeRolePrimary',
            conditionValue: {
              condition: 'in',
              value: {
                in: MANAGER_ROLE_ID
              }
            }
          }
        ]
      }
    ]
  };

  return regObj;
};
export const makeAssesseeScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let regObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.assesseeNameFirst,informationBasic.assesseeNameOther,informationBasic.assesseeNameLast,informationBasic.assesseeAlias',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameFirst',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameOther',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameLast',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameAlias',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: {
              condition: 'eq',
              value: {
                from: filterKey.toUpperCase()
              }
            }
          }
        ]
      }
    ]
  };

  return regObj;
};

export const makeAssociateReviewListRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  // if(filterKey === 'active'){
  //   searchObj ={
  //     condition: 'eq',
  //   value: {
  //     from: 'CONFIRMED'
  //   }
  //   }
  // }
  // if(filterKey === 'inactive'){
  //   searchObj ={
  //     condition: 'in',
  //   value: {
  //     in: ['DISAPPROVED', 'SUSPENDED', 'TERMINATED', 'UNAPPROVED', 'UNCONFIRMED']
  //   }
  //   }
  // }
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['CONFIRMED', 'DISAPPROVED', 'SUSPENDED', 'TERMINATED', 'UNAPPROVED', 'UNCONFIRMED']
        }
      };
    }
  }
  let regObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.associateName,informationBasic.associateDescripton',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };

  return regObj;
};

export const makeAssociateScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  // if(filterKey === 'active'){
  //   searchObj ={
  //     condition: 'eq',
  //   value: {
  //     from: 'CONFIRMED'
  //   }
  //   }
  // }
  // if(filterKey === 'inactive'){
  //   searchObj ={
  //     condition: 'in',
  //   value: {
  //     in: ['DISAPPROVED', 'SUSPENDED', 'TERMINATED', 'UNAPPROVED', 'UNCONFIRMED']
  //   }
  //   }
  // }
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['CONFIRMED', 'DISAPPROVED', 'SUSPENDED', 'TERMINATED', 'UNAPPROVED', 'UNCONFIRMED']
        }
      };
    }
  }
  let regObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.associateName,informationBasic.associateDescription',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };

  return regObj;
};
export const makeAssesseeRoleCreateObj = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: 'ACTIVE'
    }
  };
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associateAscendantPrimary:
      localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assesseeRoleName,informationBasic.assesseeRoleDescription',
      order: 'asc'
    },
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeRoleStatus',
            conditionValue: searchObj
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeRoleName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: 'assessee'
              }
            }
          }
          // {
          //   dataType: 'boolean',
          //   conditionColumn: 'informationSetup.assesseeRoleDefault',
          //   conditionValue: {
          //     condition: 'eq',
          //     value: {
          //       from: 'true'
          //     }
          //   }
          // }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeManagerRoleCreateObj = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: 'ACTIVE'
    }
  };
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associateAscendantPrimary:
      localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assesseeRoleName,informationBasic.assesseeRoleDescription',
      order: 'asc'
    },
    searchCondition: 'and',
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeRoleStatus',
            conditionValue: searchObj
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeRoleName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: 'manager'
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAdministratorRoleCreateObj = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: 'ACTIVE'
    }
  };
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associateAscendantPrimary:
      localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assesseeRoleName,informationBasic.assesseeRoleDescription',
      order: 'asc'
    },
    searchCondition: 'and',
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeRoleStatus',
            conditionValue: searchObj
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeRoleName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: 'administrator'
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssesseeRoleObj = (selectedAssociateInfo, filterKey, numberPage, countPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      countPage: countPage,
      associateAscendantPrimary:
        localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
      numberPage: numberPage,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.assesseeRoleName,informationBasic.assesseeRoleDescription',
        order: 'asc'
      },
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assesseeRoleStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.assesseeRoleClassification.assesseeRoleClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      countPage: countPage,
      associateAscendantPrimary:
        localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
      numberPage: numberPage,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.assesseeRoleName,informationBasic.assesseeRoleDescription',
        order: 'asc'
      },
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assesseeRoleStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }
  return requestObj;
};
export const makeAssociateRoleObj = (selectedAssociateInfo, filterKey, numberPage, countPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.associateRoleName,informationBasic.associateRoleDescription',
        order: 'asc'
      },
      numberPage: 0,
      countPage: 25,
      searchCondition: 'AND',
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.associateRoleStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.associateRoleClassification.associateRoleClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.associateRoleName,informationBasic.associateRoleDescription',
        order: 'asc'
      },
      numberPage: 0,
      countPage: 25,
      searchCondition: 'AND',
      search: [
        {
          condition: 'or',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.associateRoleStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }

  return requestObj;
};
export const makeAssociateRoleScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.associateRoleName,informationBasic.associateRoleDescription',
      order: 'asc'
    },
    numberPage: 0,
    countPage: 25,
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateRoleStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateRoleName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateRoleDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssesseeRoleScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assesseeRoleName,informationBasic.assesseeRoleDescription',
      order: 'asc'
    },
    numberPage: 0,
    countPage: 25,
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeRoleStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeRoleName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeRoleDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAdminmManagerRoleScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage,
  searchStr,
  searchArr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assesseeRoleName,informationBasic.assesseeRoleDescription',
      order: 'asc'
    },
    numberPage: 0,
    countPage: 25,
    searchCondition: 'AND',
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeRoleStatus',
            conditionValue: searchObj
          },
          {
            dataType: 'string',
            conditionColumn: 'id',
            conditionValue: {
              condition: 'in',
              value: {
                in: searchArr
              }
            }
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeRoleName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeRoleDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssesseeGroupObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.assesseeGroupName,informationBasic.assesseeGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assesseeGroupStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.assesseeGroupClassification.assesseeGroupClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.assesseeGroupName,informationBasic.assesseeGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assesseeGroupStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }
  return requestObj;
};
export const makeAssesseeTypeObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.assesseeTypeName,informationBasic.assesseeTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assesseeTypeStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.assesseeTypeClassification.assesseeTypeClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.assesseeTypeName,informationBasic.assesseeTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assesseeTypeStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }
  return requestObj;
};
export const makeAssociateTypeObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.associateTypeName,informationBasic.associateTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.associateTypeStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.associateTypeClassification.associateTypeClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.associateTypeName,informationBasic.associateTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.associateTypeStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }
  return requestObj;
};
export const makeItemsTypeObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.itemTypeName,informationBasic.itemTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.itemTypeStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.itemTypeClassification.itemTypeClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.itemTypeName,informationBasic.itemTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.itemTypeStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }

  return requestObj;
};
export const makeAssesseeTypeScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assesseeTypeName,informationBasic.assesseeTypeDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeTypeStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssociateTypeScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.associateTypeName,informationBasic.associateTypeDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateTypeStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssesseeGroupScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assesseeGroupName,informationBasic.assesseeGroupDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeGroupStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssociateGroupObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.associateGroupName,informationBasic.associateGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.associateGroupStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.associateGroupClassification.associateGroupClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.associateGroupName,informationBasic.associateGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.associateGroupStatus',
              conditionValue: searchObj
            }
            // {
            //   dataType: 'string',
            //   conditionColumn: 'informationSetup.associateGroupClassification.associateGroupClassificationPrimary',
            //   conditionValue: searchObj
            // }
          ]
        }
      ]
    };
  }
  return requestObj;
};
export const makeItemObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'UNPUBLISHED', 'PUBLISHED']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.itemName,informationBasic.itemDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeItemScanObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.itemName,informationBasic.itemDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeItemGroupObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.itemGroupName,informationBasic.itemGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.itemGroupStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.itemGroupClassification.itemGroupClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName: 'informationBasic.itemGroupName,informationBasic.itemGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.itemGroupStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }
  return requestObj;
};
export const makeItemGroupScanObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.itemGroupName,informationBasic.itemGroupDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemGroupStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeItemTypeScanObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.itemTypeName,informationBasic.itemTypeDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemTypeStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};

export const makeAssociateGroupScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.associateGroupName,informationBasic.associateGroupDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateGroupStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssessmentGroupObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.assessmentGroupName,informationBasic.assessmentGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assessmentGroupStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.assessmentGroupClassification.assessmentGroupClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.assessmentGroupName,informationBasic.assessmentGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assessmentGroupStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }

  return requestObj;
};
export const makeAssessmentGroupScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assessmentGroupName,assessmentGroupDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentGroupStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssignmentGroupObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.assignmentGroupName,informationBasic.assignmentGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assignmentGroupStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.assignmentGroupClassification.assignmentGroupClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.assignmentGroupName,informationBasic.assignmentGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assignmentGroupStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }

  return requestObj;
};
export const makeAssignmentGroupScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.assignmentGroupName,informationBasic.assignmentGroupDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assignmentGroupStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssessmentTypeObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.assessmentTypeName,informationBasic.assessmentTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assessmentTypeStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.assessmentTypeClassification.assessmentTypeClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.assessmentTypeName,informationBasic.assessmentTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assessmentTypeStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }

  return requestObj;
};
export const makeAssignmentTypeObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.assignmentTypeName,informationBasic.assignmentTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assignmentTypeStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.assignmentTypeClassification.assignmentTypeClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.assignmentTypeName,informationBasic.assignmentTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.assignmentTypeStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }

  return requestObj;
};
export const makeAssignmentReviewListRequestObject = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assignmentName,informationBasic.assignmentDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assignmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssessmentReviewListRequestObject = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assessmentName,informationBasic.assessmentDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssignmentTypeScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assignmentTypeName,informationBasic.assignmentTypeDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assignmentTypeStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssessmentTypeScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assignmentTypeName,informationBasic.assignmentTypeDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentTypeStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeAssignmentScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let regObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assignmentName,informationBasic.assignmentDescription',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assignmentStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };

  return regObj;
};
export const makeAssessmentScanRequestObject = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let regObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assessmentName,informationBasic.assessmentDescription',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };

  return regObj;
};

export const makeInternalNodeObj = (selectedAssociateInfo, filterKey, numberPage, countPage) => {
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    status: 'ACTIVE'
  };
  return requestObj;
};
export const makeAssesseeGroupClassificationObj = (
  selectedAssociateInfo,
  filterKey,
  numberPage,
  countPage
) => {
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary
  };
  return requestObj;
};
export const makeAssociateNodeObj = (selectedAssociateInfo, filterKey, numberPage, countPage) => {
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    status: 'ACTIVE'
  };
  return requestObj;
};

export const getAssesseeTypeAssesseeReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: [
            'CONFIRMED',
            'DISAPPROVED',
            'SUSPENDED',
            'TERMINATED',
            'UNAPPROVED',
            'UNCONFIRMED',
            'ARCHIVED'
          ]
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeType.assesseeTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeType.assesseeTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssesseeTypeAssesseeScanReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: [
            'CONFIRMED',
            'DISAPPROVED',
            'SUSPENDED',
            'TERMINATED',
            'UNAPPROVED',
            'UNCONFIRMED',
            'ARCHIVED'
          ]
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeType.assesseeTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeType.assesseeTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameFirst',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameOther',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameLast',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeAlias',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getAssociateTypeAssociateReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: [
            'CONFIRMED',
            'DISAPPROVED',
            'SUSPENDED',
            'TERMINATED',
            'UNAPPROVED',
            'UNCONFIRMED',
            'ARCHIVED'
          ]
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateType.associateTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateType.associateTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssociateTypeAssociateScanReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: [
            'CONFIRMED',
            'DISAPPROVED',
            'SUSPENDED',
            'TERMINATED',
            'UNAPPROVED',
            'UNCONFIRMED',
            'ARCHIVED'
          ]
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateType.associateTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateType.associateTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeAssociatesReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: [
            'CONFIRMED',
            'DISAPPROVED',
            'SUSPENDED',
            'TERMINATED',
            'UNAPPROVED',
            'UNCONFIRMED',
            'ARCHIVED'
          ]
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateNode.associateNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateNode.associateNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeAssociatesScanReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: [
            'CONFIRMED',
            'DISAPPROVED',
            'SUSPENDED',
            'TERMINATED',
            'UNAPPROVED',
            'UNCONFIRMED',
            'ARCHIVED'
          ]
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateNode.associateNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateNode.associateNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getNodeAssessmentsReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentNode.assessmentNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentNode.assessmentNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeAssessmentsScanReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentNode.assessmentNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentNode.assessmentNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeAssignmentsReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentNode.assignmentNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentNode.assignmentNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assignmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeAssignmentsScanReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentNode.assignmentNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentNode.assignmentNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assignmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeItemsReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemNode.itemNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemNode.itemNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeItemsScanReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemNode.itemNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemNode.itemNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getItemGroupItemReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    orderBy: {
      columnName: 'informationBasic.itemName,informationBasic.itemDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    groupId: groupId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemGroup.itemGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemGroup.itemGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getItemGroupItemScanReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    groupId: groupId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemGroup.itemGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemGroup.itemGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemGroupStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getItemTypeItemReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemType.itemTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemType.itemTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getItemTypeItemScanReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemType.itemTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.itemType.itemTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.itemTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemTypeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssessmentGroupAssessmentReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    orderBy: {
      columnName: 'informationBasic.assessmentName,informationBasic.assessmentDescription',
      order: 'asc'
    },
    groupId: groupId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentGroup.assessmentGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentGroup.assessmentGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssessmentGroupAssessmentScanReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    groupId: groupId,
    orderBy: {
      columnName: 'informationBasic.assessmentName,informationBasic.assessmentDescription',
      order: 'asc'
    },
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentGroup.assessmentGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentGroup.assessmentGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentGroupStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssessmentItemReqObj = (
  selectedAssociateInfo,
  assessmentId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'UNPUBLISHED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    orderBy: {
      columnName: 'informationBasic.itemName,informationBasic.itemDescription',
      order: 'asc'
    },
    assessmentId: assessmentId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssessmentItemScanReqObj = (
  selectedAssociateInfo,
  assessmentId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    orderBy: {
      columnName: 'informationBasic.itemName,informationBasic.itemDescription',
      order: 'asc'
    },
    assessmentId: assessmentId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        dataType: 'string',
        conditionColumn: 'informationBasic.itemName',
        conditionValue: {
          condition: 'ct',
          value: {
            from: searchStr
          }
        }
      },
      {
        dataType: 'string',
        conditionColumn: 'informationBasic.itemDescription',
        conditionValue: {
          condition: 'ct',
          value: {
            from: searchStr
          }
        }
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.itemStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssignmentGroupAssignmentReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    orderBy: {
      columnName: 'informationBasic.assignmentName,informationBasic.assignmentDescription',
      order: 'asc'
    },
    groupId: groupId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentGroup.assignmentGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentGroup.assignmentGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assignmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getAssignmentGroupAssignmentScanReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    orderBy: {
      columnName: 'informationBasic.assignmentName,informationBasic.assignmentDescription',
      order: 'asc'
    },
    groupId: groupId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentGroup.assignmentGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentGroup.assignmentGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assignmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getAssessmentTypeAssessmentReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assessmentName,informationBasic.assessmentDescription',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentType.assessmentTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentType.assessmentTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssessmentTypeAssessmentScanReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assessmentName,informationBasic.assessmentDescription',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentType.assessmentTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assessmentType.assessmentTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentTypeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getAssignmentTypeAssignmentReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    orderBy: {
      columnName: 'informationBasic.assignmentName,informationBasic.assignmentDescription',
      order: 'asc'
    },
    typeId: typeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentType.assignmentTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentType.assignmentTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assignmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssignmentTypeAssignmentScanReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assignmentName,informationBasic.assignmentDescription',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentType.assignmentTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assignmentType.assignmentTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assignmentTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assessmentTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.assessmentStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const makeCultureProfileObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.cultureProfileName,informationBasic.cultureProfileDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeCultureProfileScanObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.cultureProfileName,informationBasic.cultureProfileDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeCultureProfileGroupObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }

  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.cultureProfileGroupName,informationBasic.cultureProfileGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.cultureProfileGroupStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.cultureProfileGroupClassification.cultureProfileGroupClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.cultureProfileGroupName,informationBasic.cultureProfileGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.cultureProfileGroupStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }

  return requestObj;
};
export const makeCultureProfileGroupScanObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.cultureProfileGroupName,informationBasic.cultureProfileGroupDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileGroupStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeCultureProfileTypeObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };

  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.cultureProfileTypeName,informationBasic.cultureProfileTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.cultureProfileTypeStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.cultureProfileTypeClassification.cultureProfileTypeClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.cultureProfileTypeName,informationBasic.cultureProfileTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.cultureProfileTypeStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }
  return requestObj;
};
export const makeCultureProfileTypeScanObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.cultureProfileTypeName,informationBasic.cultureProfileTypeDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileTypeStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeJobProfileObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.jobProfileName,informationBasic.jobProfileDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeJobProfileScanObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.jobProfileName,informationBasic.jobProfileDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeJobProfileGroupObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.jobProfileGroupName,informationBasic.jobProfileGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.jobProfileGroupStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.jobProfileGroupClassification.jobProfileGroupClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.jobProfileGroupName,informationBasic.jobProfileGroupDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.jobProfileGroupStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }

  return requestObj;
};
export const makeJobProfileGroupScanObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.jobProfileGroupName,informationBasic.jobProfileGroupDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileGroupStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const makeJobProfileTypeObj = (selectedAssociateInfo, filterKey, countPage, numberPage) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {};
  if (filterKey === 'bespoke' || filterKey === 'generic') {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.jobProfileTypeName,informationBasic.jobProfileTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.jobProfileTypeStatus',
              conditionValue: {
                condition: 'eq',
                value: {
                  from: 'ACTIVE'
                }
              }
            },
            {
              dataType: 'string',
              conditionColumn:
                'informationSetup.jobProfileTypeClassification.jobProfileTypeClassificationPrimary',
              conditionValue: {
                condition: 'in',
                value: {
                  in: [filterKey === 'bespoke' ? 'Bespoke' : 'Generic']
                }
              }
            }
          ]
        }
      ]
    };
  } else {
    requestObj = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      filter: 'true',
      orderBy: {
        columnName:
          'informationBasic.jobProfileTypeName,informationBasic.jobProfileTypeDescription',
        order: 'asc'
      },
      numberPage: numberPage,
      countPage: countPage,
      search: [
        {
          condition: 'and',
          searchBy: [
            {
              dataType: 'string',
              conditionColumn: 'informationEngagement.jobProfileTypeStatus',
              conditionValue: searchObj
            }
          ]
        }
      ]
    };
  }
  return requestObj;
};
export const makeJobProfileTypeScanObj = (
  selectedAssociateInfo,
  filterKey,
  countPage,
  numberPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
        }
      };
    }
  }
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.jobProfileTypeName,informationBasic.jobProfileTypeDescription',
      order: 'asc'
    },
    numberPage: numberPage,
    countPage: countPage,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileTypeStatus',
            conditionValue: searchObj
          }
        ]
      },
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      }
    ]
  };
  return requestObj;
};
export const getJobProfileTypeJobProfileReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    orderBy: {
      columnName: 'informationBasic.jobProfileName,informationBasic.jobProfileDescription',
      order: 'asc'
    },
    typeId: typeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileType.jobProfileTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileType.jobProfileTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getJobProfileTypeJobProfileScanReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.jobProfileName,informationBasic.jobProfileDescription',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileType.jobProfileTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileType.jobProfileTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileTypeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getJobProfileGroupJobProfileReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    groupId: groupId,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.jobProfileName,informationBasic.jobProfileDescription',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileGroup.jobProfileGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileGroup.jobProfileGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getJobProfileGroupJobProfileScanReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    groupId: groupId,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.jobProfileName,informationBasic.jobProfileDescription',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileGroup.jobProfileGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileGroup.jobProfileGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileGroupStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getJobGroupJobScanReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    groupId: groupId,
    orderBy: {
      columnName: 'informationBasic.jobProfileName,informationBasic.jobProfileDescription',
      order: 'asc'
    },
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileGroup.cultureProfileGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn:
              'informationAllocation.cultureProfileGroup.cultureProfileGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileGroupStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeJobProfileReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileNode.jobProfileNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileNode.jobProfileNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeJobProfileScanReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileNode.jobProfileNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.jobProfileNode.jobProfileNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.jobProfileDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getCultureTypeCultureReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileType.cultureProfileTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileType.cultureProfileTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getCultureTypeCultureScanReqObj = (
  selectedAssociateInfo,
  typeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    typeId: typeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileType.cultureProfileTypePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileType.cultureProfileTypeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: typeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileTypeName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileTypeDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileTypeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getCultureGroupCultureReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    groupId: groupId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileGroup.cultureProfileGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn:
              'informationAllocation.cultureProfileGroup.cultureProfileGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getCultureGroupCultureScanReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    groupId: groupId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileGroup.cultureProfileGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn:
              'informationAllocation.cultureProfileGroup.cultureProfileGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileGroupName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileGroupDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileGroupStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeCultureProfileReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileNode.cultureProfileNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileNode.cultureProfileNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getNodeCultureProfileScanReqObj = (
  selectedAssociateInfo,
  nodeId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: ['ACTIVE', 'SUSPENDED', 'TERMINATED']
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileNode.cultureProfileNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.cultureProfileNode.cultureProfileNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.cultureProfileDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.cultureProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getAssesseeSelfAssignmentList = (
  selectedAssociateInfo,
  countPage,
  statusArr,
  dispatch,
  secondaryOptionCheckValue,
  siftKey
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: 0,
    filter: true,
    orderBy: {
      columnName: '',
      order: 'asc'
    },
    searchCondition: 'AND',
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'assesseeAssignmentStatus',
            conditionValue: {
              condition: 'in',
              value: {
                in: statusArr
              }
            }
          }
        ]
      }
    ]
  };
  dispatch({ type: SET_REQUEST_OBJECT, payload: reqBody });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({ type: LOADER_START });
  dispatch({
    type: GET_ASSESSEE_ASSIGNMENT_SAGA,
    payload: {
      request: reqBody,
      BadgeOne: secondaryOptionCheckValue,
      BadgeTwo: siftKey,
      BadgeThree: ''
    }
  });
};

export function convertToLocalTime(milisec) {
  var dd = new Date(milisec);
  var h = dd.getHours(),
    m = dd.getMinutes();
  var _time =
    h > 12
      ? h - 12 + ':' + (m < 10 ? '0' + m : m) + ' PM'
      : h + ':' + (m < 10 ? '0' + m : m) + ' AM';
  var finalformat =
    ('0' + dd.getDate()).slice(-2) +
    '/' +
    ('0' + (dd.getMonth() + 1)).slice(-2) +
    '/' +
    dd.getFullYear() +
    ', ' +
    _time;

  // var dateconv = new Date(milisec);
  // let newDateFormat = dateconv.toLocaleDateString();
  // let finaltime =removeSecond(dateconv);
  // let finalformat = newDateFormat+', '+finaltime;
  return finalformat;
}

export function calculateTime(milisec) {
  var dd = new Date(milisec);
  var seconds = dd.getSeconds();
  var minutes = dd.getUTCMinutes();
  var hours = dd.getUTCHours();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  var duration = minutes + ' Mins, ' + seconds + ' Secs';
  return duration;
}

export function convertNumberToName(amount) {
  var words = new Array();
  words[0] = '';
  words[1] = 'one';
  words[2] = 'two';
  words[3] = 'three';
  words[4] = 'four';
  words[5] = 'five';
  words[6] = 'six';
  words[7] = 'seven';
  words[8] = 'eight';
  words[9] = 'nine';
  words[10] = 'ten';
  words[11] = 'eleven';
  words[12] = 'twelve';
  words[13] = 'thirteen';
  words[14] = 'fourteen';
  words[15] = 'fifteen';
  words[16] = 'sixteen';
  words[17] = 'seventeen';
  words[18] = 'eighteen';
  words[19] = 'nineteen';
  words[20] = 'twenty';
  words[30] = 'thirty';
  words[40] = 'forty';
  words[50] = 'fifty';
  words[60] = 'sixty';
  words[70] = 'seventy';
  words[80] = 'eighty';
  words[90] = 'ninety';
  amount = amount.toString();
  var atemp = amount.split('.');
  var number = atemp[0].split(',').join('');
  var n_length = number.length;
  var words_string = '';
  if (n_length <= 9) {
    var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    var received_n_array = new Array();
    for (var i = 0; i < n_length; i++) {
      received_n_array[i] = number.substr(i, 1);
    }
    for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
      n_array[i] = received_n_array[j];
    }
    for (var i = 0, j = 1; i < 9; i++, j++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        if (n_array[i] == 1) {
          n_array[j] = 10 + parseInt(n_array[j]);
          n_array[i] = 0;
        }
      }
    }
    var value = '';
    for (var i = 0; i < 9; i++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        value = n_array[i] * 10;
      } else {
        value = n_array[i];
      }
      if (value != 0) {
        words_string += words[value] + ' ';
      }
      if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
        words_string += 'Crores ';
      }
      if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
        words_string += 'Lakhs ';
      }
      if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
        words_string += 'Thousand ';
      }
      if (i == 6 && value != 0 && n_array[i + 1] != 0 && n_array[i + 2] != 0) {
        words_string += 'Hundred and ';
      } else if (i == 6 && value != 0) {
        words_string += 'Hundred ';
      }
    }
    words_string = words_string.split('  ').join(' ');
  }
  return words_string;
}
export const setItemTypeConfigState = (itemFrameworkOneType, dispatch) => {
  console.log('setItemTypeConfigState');
  console.log('itemFrameworkOneType', itemFrameworkOneType);
  let reviseSetting = {
    blankState: true,
    classificationState: true,
    levelState: true,
    polarityState: true,
    scaleState: true,
    scoreState: true,
    timeState: true,
    weightageState: true,
    noOfItemState: true,
    noOfResponseState: true
  };
  if (itemFrameworkOneType === '61090cace50cf61d5eb440c9') {
    // "Likert-Scale"
    reviseSetting = {
      blankState: false,
      classificationState: true,
      levelState: true,
      polarityState: true,
      scaleState: true,
      scoreState: false,
      timeState: true,
      weightState: true,
      noOfItemState: true,
      noOfResponseState: true
    };
  }
  if (itemFrameworkOneType === '61090cace50cf61d5eb440ce') {
    //"Response-Choice (Single-Select)"
    reviseSetting = {
      blankState: false,
      classificationState: false,
      levelState: true,
      polarityState: false,
      scaleState: false,
      scoreState: true,
      timeState: true,
      weightState: false,
      noOfItemState: false,
      noOfResponseState: true
    };
  }
  if (itemFrameworkOneType === '61090cace50cf61d5eb440c4') {
    //"Fill-in-the-Blank (Response-Choice)"
    reviseSetting = {
      blankState: true,
      classificationState: false,
      levelState: true,
      polarityState: false,
      scaleState: false,
      scoreState: true,
      timeState: true,
      weightState: false,
      noOfItemState: false,
      noOfResponseState: true
    };
  }
  if (
    itemFrameworkOneType === '61090cace50cf61d5eb440cc' ||
    itemFrameworkOneType === '61090cace50cf61d5eb440cd'
  ) {
    //"Response (Long)","Response (Short)"
    reviseSetting = {
      blankState: false,
      classificationState: false,
      levelState: true,
      polarityState: false,
      scaleState: false,
      scoreState: true,
      timeState: true,
      weightState: false,
      noOfItemState: false,
      noOfResponseState: false
    };
  }
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'itemConfigStates', value: reviseSetting }
  });
};
