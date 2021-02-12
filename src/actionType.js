export const POPUP_OPEN = 'POPUP_OPEN';
export const POPUP_CLOSE = 'POPUP_CLOSE';
export const GET_USER_SAGA = 'GET_USER_SAGA';
export const SET_USER = 'SET_USER';
export const GET_ASSESSES_SAGA = 'GET_ASSESSES_SAGA';
export const ASSESSEE_SIGN_ON = 'ASSESSEE_SIGN_ON';

export const ASSOCIATE_SIGN_ON = 'ASSOCIATE_SIGN_ON';
export const SET_NEXT_POPUP = 'SET_NEXT_POPUP';
export const PREVIOUS_POPUP = 'PREVIOUS_POPUP';
export const SET_POPUP_STATE = 'SET_POPUP_STATE';
// for assessee information
export const UPDATE_ASSESSEE_INFO = 'UPDATE_ASSESSEE_INFO';
export const UPDATE_ASSESSEE_BASIC_INFO = 'UPDATE_ASSESSEE_BASIC_INFO';
export const UPDATE_ASSESSEE_MOBILE_INFO = 'UPDATE_ASSESSEE_MOBILE_INFO';
export const UPDATE_ASSESSEE_PERSONAL_INFO = 'UPDATE_ASSESSEE_PERSONAL_INFO';
export const UPDATE_ASSESSEE_HOMEADDRESS_INFO = 'UPDATE_ASSESSEE_HOMEADDRESS_INFO';
export const CLEAR_ASSESSEE_INFO = 'CLEAR_ASSESSEE_INFO';
//for assocaite information
export const UPDATE_ASSOCIATE_INFO = 'UPDATE_ASSOCIATE_INFO';
export const UPDATE_ASSOCIATE_WORKADDRESS_INFO = 'UPDATE_ASSOCIATE_WORKADDRESS_INFO';
export const UPDATE_ASSOCIATE_WORKTELEPHONE_INFO = 'UPDATE_ASSOCIATE_WORKTELEPHONE_INFO';
export const UPDATE_ASSOCIATE_BASIC_INFO = 'UPDATE_ASSOCIATE_BASIC_INFO';
export const UPDATE_ASSOCIATE_ADMIN_BASIC_INFO = 'UPDATE_ASSOCIATE_ADMIN_BASIC_INFO';
export const UPDATE_ASSOCIATE_ADMIN_MOBILE_INFO = 'UPDATE_ASSOCIATE_ADMIN_MOBILE_INFO';
export const UPDATE_ASSOCIATE_ADMIN_PERSONAL_INFO = 'UPDATE_ASSOCIATE_ADMIN_PERSONAL_INFO';
export const CLEAR_ASSOCIATE_INFO = 'CLEAR_ASSOCIATE_INFO';
//VARIABLES FOR CORE POPUP
export const NAMEPOPUP = 'NAMEPOPUP';
export const NAMEALIASPOPUP = 'NAMEALIASPOPUP';
export const ALIASPOPUP = 'ALIASPOPUP';
export const PICTUREPOPUP = 'PICTUREPOPUP';
export const MOBILETELEPHONEPOPUP = 'MOBILETELEPHONEPOPUP';
export const ASSOCIATEPICTUREPOPUP = 'ASSOCIATEPICTUREPOPUP';
export const EMAILPOPUP = 'EMAILPOPUP';
export const SINGLEDROPDOWNPOPUP = 'SINGLEDROPDOWNPOPUP';
export const HOMEADDRESSPOPUP = 'HOMEADDRESSPOPUP';
export const WORKADDRESSPOPUP = 'WORKADDRESSPOPUP';
export const CONFIRMATIONPOPUP = 'CONFIRMATIONPOPUP';
export const ASSOCIATECONFIRMATIONPOPUP = 'ASSOCIATECONFIRMATIONPOPUP';
export const DESCRIPTIONPOPUP = 'DESCRIPTIONPOPUP';
export const WORKTELEPHONE = 'WORKTELEPHONE';
export const ROLEPOPUP = 'ROLEPOPUP';
//for footer icon in middle pane
export const FILTERMODE = 'FILTERMODE';
export const NAVIGATOR_MODE = 'NAVIGATOR_MODE';

export const ASSESSEE_CARD_POPUP_OPTIONS = [
  {
    data: 'assignments',
    dataValue: 'assesseeselfassignments',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    optionClass: 'optionPrimary'
  },
  {
    data: 'reports',
    dataValue: 'reports',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'password',
    dataValue: 'password',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary'
  },
  {
    data: 'revise',
    dataValue: 'revise',
    optionClass: 'optionPrimary',
    divider: 'light'
  },
  {
    data: 'sign-out',
    dataValue: 'sign-out',
    optionClass: 'optionPrimary'
  }
];
export const POPUP_OPTIONS = [
  {
    data: 'distinct',
    dataValue: 'distinct',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'groups',
    dataValue: 'groups',
    optionClass: 'optionPrimary'
  },
  {
    data: 'managers',
    dataValue: 'managers',
    optionClass: 'optionPrimary'
  },
  {
    data: 'nodes',
    dataValue: 'nodes',
    optionClass: 'optionPrimary'
  },
  {
    data: 'roles',
    dataValue: 'roles',
    optionClass: 'optionPrimary'
  },
  {
    data: 'types',
    dataValue: 'types',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'marketplace',
    dataValue: 'marketplace',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'active',
    dataValue: 'active',
    optionClass: 'optionSecondary'
  },
  {
    data: 'inactive',
    dataValue: 'inactive',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'all',
    dataValue: 'all',
    optionClass: 'optionSecondary',
    divider: 'light'
  },
  {
    data: 'archived',
    dataValue: 'archived',
    optionClass: 'optionSecondary'
  }
];
export const ASSOCIATE_CARD_POPUP_OPTION = [
  {
    data: 'administrators',
    dataValue: 'administrators',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'groups',
    dataValue: 'groups',
    optionClass: 'optionPrimary'
  },
  {
    data: 'managers',
    dataValue: 'managers',
    optionClass: 'optionPrimary'
  },
  {
    data: 'nodes',
    dataValue: 'nodes',
    optionClass: 'optionPrimary'
  },
  {
    data: 'roles',
    dataValue: 'roles',
    optionClass: 'optionPrimary'
  },
  {
    data: 'types',
    dataValue: 'types',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'marketplace',
    dataValue: 'marketplace',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'exchange',
    dataValue: 'exchange',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'notifications',
    dataValue: 'notifications',
    optionClass: 'optionPrimary'
  },
  {
    data: 'reports',
    dataValue: 'reports',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'review',
    dataValue: 'review',
    optionClass: 'optionPrimary'
  },
  {
    data: 'revise',
    dataValue: 'revise',
    optionClass: 'optionPrimary',
    divider: 'dark'
  },
  {
    data: 'switch',
    dataValue: 'switch',
    optionClass: 'optionPrimary'
  }
];
export const ASSESSEE_PERMISSION = {
  assessee: ['archive', 'create', 'delete', 'review', 'revise'],
  assessment: ['archive', 'create', 'delete', 'review', 'revise'],
  assessment_item: ['archive', 'create', 'delete', 'review', 'revise'],
  assignment: ['archive', 'create', 'delete', 'review', 'revise'],
  assignment_dictionary: ['archive', 'create', 'delete', 'review', 'revise'],
  associate_hierarchy: ['archive', 'create', 'delete', 'review', 'revise'],
  iGauge_culture_profile: ['archive', 'create', 'delete', 'review', 'revise'],
  iGauge_job_profile: ['archive', 'create', 'delete', 'review', 'revise']
};
