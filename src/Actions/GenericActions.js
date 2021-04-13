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
    assesseeId: '0123456',
    associateId: '605091f81edc573048fb467a',
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

export const makeAssociateScanRequestObject = (filterKey, numberPage, countPage, searchStr) => {
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
    assesseeId: '0123456',
    associateId: '605091f81edc573048fb467a',
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
export const makeAssesseeRoleObj = (filterKey) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssociateRoleObj = (filterKey) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssociateRoleScanRequestObject = (filterKey, numberPage, countPage, searchStr) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssesseeRoleScanRequestObject = (filterKey, numberPage, countPage, searchStr) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssesseeGroupObj = (filterKey, countPage, numberPage) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssesseeGroupScanRequestObject = (filterKey, countPage, numberPage, searchStr) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssociateGroupObj = (filterKey, countPage, numberPage) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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

export const makeAssociateGroupScanRequestObject = (
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssessmentGroupObj = (filterKey, countPage, numberPage) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssignmentGroupObj = (filterKey, countPage, numberPage) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssessmentTypeObj = (filterKey, countPage, numberPage) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssignmentTypeObj = (filterKey, countPage, numberPage) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssignmentReviewListRequestObject = (filterKey, countPage, numberPage) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssessmentReviewListRequestObject = (filterKey, countPage, numberPage) => {
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
    assesseeId: '0123456',
    associateId: '0654321',
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
export const makeAssignmentTypeScanRequestObject = (
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
    assesseeId: '0123456',
    associateId: '0654321',
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
    assesseeId: '0123456',
    associateId: '0654321',
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