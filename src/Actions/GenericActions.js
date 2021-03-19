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
export const makeAssesseeReviewListRequestObject = (filterKey) => {
  let serachObjet = {};
  if (filterKey === 'all' || filterKey === 'active' || filterKey === 'inactive') {
    let serachObjet = {
      condition: 'or',
      searchBy: [
        {
          dataType: 'string',
          conditionColumn: 'informationEngagement.assesseeStatus',
          conditionValue: {
            condition: 'in',
            value: {
              from: ['UNCONFIRMED', 'CONFIRMED']
            }
          }
        }
      ]
    };
  }
  let regObj = {
    assesseeId: '0123456',
    associateId: '0654321',//'60520a349d66236bb84f8b1b',
    countPage: 25,
    numberPage: 0,
    filter: 'true',
    orderBy: {
      columnName:
        'informationBasic.assesseeNameFirst, informationBasic.assesseeNameOther,  informationBasic.assesseeNameLast, informationBasic.assesseeNameSuffix',
      order: 'asc'
    },
    search: {
      condition: "or",
      searchBy: [
        {
          dataType: "string",
          conditionColumn: "informationEngagement.assesseeStatus",
          conditionValue: {
            condition: "eq",
            value: {
              from: "INACTIVE"
            }
          }
        }
      ]
  
    }
  };

  return regObj;
};
