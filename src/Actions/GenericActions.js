import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';

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
  return popupContentArrValue;
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
export const makeAssesseeReviewListRequestObject = (filterKey, numberPage, countPage) => {
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
    assesseeId: '0123456',
    associateId: '0654321', //'60520a349d66236bb84f8b1b',
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.assesseeNameFirst, informationBasic.assesseeNameOther,  informationBasic.assesseeNameLast, informationBasic.assesseeNameSuffix',
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
export const makeAssesseeScanRequestObject = (filterKey, numberPage, countPage, searchStr) => {
  let regObj = {
    assesseeId: '0123456',
    associateId: '0654321',
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.assesseeNameFirst, informationBasic.assesseeNameOther,  informationBasic.assesseeNameLast, informationBasic.assesseeNameSuffix',
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

export const makeAssociateReviewListRequestObject = (filterKey, numberPage, countPage) => {
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
    assesseeId: '0123456',
    associateId: '605091f81edc573048fb467a',
    countPage: countPage,
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.associateName',
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
