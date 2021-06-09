import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { ADMIN_ROLE_ID, MANAGER_ROLE_ID } from '../endpoints';
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
            in: [
              'CONFIRMED',
              'DISAPPROVED',
              'SUSPENDED',
              'TERMINATED',
              'UNAPPROVED',
              'UNCONFIRMED',
              'ARCHIVED',
              'DELETED'
            ]
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
        'informationBasic.assesseeNameFirst, informationBasic.assesseeNameOther,  informationBasic.assesseeNameLast, informationBasic.assesseeNameSuffix',
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
        'informationBasic.assesseeNameFirst, informationBasic.assesseeNameOther,  informationBasic.assesseeNameLast, informationBasic.assesseeNameSuffix',
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
      columnName: 'informationBasic.associateName',
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
      columnName: 'informationBasic.associateName',
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
      columnName: 'informationBasic.assesseeRoleName',
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
            dataType: 'boolean',
            conditionColumn: 'informationSetup.assesseeRoleDefault',
            conditionValue: {
              condition: 'eq',
              value: {
                from: 'true'
              }
            }
          }
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
      columnName: 'informationBasic.assesseeRoleName',
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
      columnName: 'informationBasic.assesseeRoleName',
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    associateAscendantPrimary:
      localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
    numberPage: numberPage,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assesseeRoleName',
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associateAscendantPrimary:
      localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.associateRoleName',
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
      columnName: 'informationBasic.associateRoleName',
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
      columnName: 'informationBasic.assesseeRoleName',
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
      columnName: 'informationBasic.assesseeRoleName',
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assesseeGroupName',
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assesseeTypeName',
      order: 'asc'
    },
    associateAscendantPrimary:
      localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.associateTypeName',
      order: 'asc'
    },
    associateAscendantPrimary:
      localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.itemTypeName',
      order: 'asc'
    },
    associateAscendantPrimary:
      localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
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
      columnName: 'informationBasic.assesseeTypeName',
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
      columnName: 'informationBasic.associateTypeName',
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
      columnName: 'informationBasic.assesseeGroupName',
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.associateGroupName',
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
      }
    ]
  };
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
      columnName: 'informationBasic.itemName',
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
      columnName: 'informationBasic.itemName',
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.itemGroupName',
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
      columnName: 'informationBasic.itemGroupName',
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
      columnName: 'informationBasic.itemTypeName',
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
      columnName: 'informationBasic.associateGroupName',
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assessmentGroupName',
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
      columnName: 'informationBasic.assessmentGroupName',
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assignmentGroupName',
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
      columnName: 'informationBasic.assignmentGroupName',
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assessmentTypeName',
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
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.assignmentTypeName',
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
      columnName: 'informationBasic.assignmentName',
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
      columnName: 'informationBasic.assessmentName',
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
      columnName: 'informationBasic.assignmentTypeName',
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
      columnName: 'informationBasic.assignmentTypeName',
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
      columnName: 'informationBasic.assignmentName',
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
      columnName: 'informationBasic.assessmentName',
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
            'ARCHIVED',
            'DELETED'
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
            'ARCHIVED',
            'DELETED'
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
            'ARCHIVED',
            'DELETED'
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
            'ARCHIVED',
            'DELETED'
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
            'ARCHIVED',
            'DELETED'
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
            'ARCHIVED',
            'DELETED'
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
            conditionColumn: 'informationEngagement.itemGroupStatus',
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
            conditionColumn: 'informationEngagement.itemTypeStatus',
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
            conditionColumn: 'informationEngagement.assessmentGroupStatus',
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
            conditionColumn: 'informationEngagement.assessmentTypeStatus',
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
